#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HW05_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
REPO_DIR="$(cd "${HW05_DIR}/.." && pwd)"

SCENARIO="${1:-}"
OVERWRITE="${2:-}"

if [[ ! "${SCENARIO}" =~ ^(load|stress|spike|endurance)$ ]]; then
  echo "Usage: $0 {load|stress|spike|endurance} [--overwrite]" >&2
  exit 2
fi

if command -v jmeter >/dev/null 2>&1; then
  JMETER_EXECUTABLE="$(command -v jmeter)"
elif [[ -x "${REPO_DIR}/../.tools/apache-jmeter-5.6.3/bin/jmeter" ]]; then
  JMETER_EXECUTABLE="${REPO_DIR}/../.tools/apache-jmeter-5.6.3/bin/jmeter"
else
  echo "JMeter not found. Set PATH or install Apache JMeter 5.6.3." >&2
  exit 3
fi

AUTH_PROPERTIES="${HW05_DIR}/data/runtime-auth.properties"
if [[ ! -f "${AUTH_PROPERTIES}" ]]; then
  echo "Missing ${AUTH_PROPERTIES}. Run: node scripts/prepare_test_data.js" >&2
  exit 4
fi

if ! curl -fsS "${SUT_BASE_URL:-http://localhost:3000}/api/products" >/dev/null; then
  echo "SUT is not reachable at ${SUT_BASE_URL:-http://localhost:3000}." >&2
  exit 5
fi

case "${SCENARIO}" in
  load)
    PLAN_NAME="23127001_Load_20260816"
    PLAN_FILE="${HW05_DIR}/test-plans/${PLAN_NAME}.jmx"
    ;;
  stress)
    PLAN_NAME="23127001_Stress_20260816"
    PLAN_FILE="${HW05_DIR}/test-plans/${PLAN_NAME}.jmx"
    ;;
  spike)
    PLAN_NAME="23127001_Spike_20260816"
    PLAN_FILE="${HW05_DIR}/test-plans/${PLAN_NAME}.jmx"
    ;;
  endurance)
    PLAN_NAME="23127001_Endurance_20260816"
    PLAN_FILE="${HW05_DIR}/test-plans/23127001_Load_20260816.jmx"
    ;;
esac

JTL_FILE="${HW05_DIR}/results/jtl/${PLAN_NAME}.jtl"
HTML_DIR="${HW05_DIR}/results/html/${PLAN_NAME}"

if [[ -e "${JTL_FILE}" || -e "${HTML_DIR}" ]]; then
  if [[ "${OVERWRITE}" != "--overwrite" ]]; then
    echo "Result already exists. Preserve it or rerun with --overwrite:" >&2
    echo "  ${JTL_FILE}" >&2
    echo "  ${HTML_DIR}" >&2
    exit 6
  fi
  [[ -f "${JTL_FILE}" ]] && rm "${JTL_FILE}"
  [[ -d "${HTML_DIR}" ]] && rm -rf -- "${HTML_DIR}"
fi

mkdir -p "$(dirname "${JTL_FILE}")" "$(dirname "${HTML_DIR}")"

HOST_PORT_ARGS=(
  "-Jhost=${SUT_HOST:-localhost}"
  "-Jport=${SUT_PORT:-3000}"
  "-Jdata_dir=${HW05_DIR}/data"
)

SCENARIO_ARGS=()
if [[ "${SCENARIO}" == "endurance" ]]; then
  SCENARIO_ARGS=(
    "-Jload_threads=${ENDURANCE_THREADS:-20}"
    "-Jload_ramp=${ENDURANCE_RAMP:-60}"
    "-Jload_duration=${ENDURANCE_DURATION:-900}"
    "-Jthink_time_ms=${ENDURANCE_THINK_MS:-1000}"
  )
fi

read -r -a USER_ARGS <<< "${EXTRA_JMETER_ARGS:-}"

echo "Scenario: ${SCENARIO}"
echo "Plan: ${PLAN_FILE}"
echo "JTL: ${JTL_FILE}"
echo "HTML: ${HTML_DIR}"
echo "Start htop or Windows Task Manager now and keep it in the same frame."

"${JMETER_EXECUTABLE}" -n \
  -t "${PLAN_FILE}" \
  -q "${AUTH_PROPERTIES}" \
  -l "${JTL_FILE}" \
  -e -o "${HTML_DIR}" \
  "${HOST_PORT_ARGS[@]}" \
  "${SCENARIO_ARGS[@]}" \
  "${USER_ARGS[@]}"

echo "Completed ${SCENARIO}. Preserve the terminal/resource screenshot."

