#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HW05_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
BUILD_DIR="${HW05_DIR}/build/pdf-html"
CSS_FILE="${HW05_DIR}/report/style.css"

EDGE_CANDIDATES=(
  "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
  "/mnt/c/Program Files/Microsoft/Edge/Application/msedge.exe"
)

EDGE_EXECUTABLE=""
for candidate in "${EDGE_CANDIDATES[@]}"; do
  if [[ -x "${candidate}" ]]; then
    EDGE_EXECUTABLE="${candidate}"
    break
  fi
done

if [[ -z "${EDGE_EXECUTABLE}" ]]; then
  echo "Microsoft Edge was not found. Save the Markdown/HTML files as PDF manually." >&2
  exit 2
fi

DOCUMENTS=(
  "${HW05_DIR}/report/23127001_HW05_AI_Performance_Report.md"
  "${HW05_DIR}/ai-reports/23127001_HW05_AI_Audit_Report.md"
  "${HW05_DIR}/ai-reports/23127001_HW05_AI_Disclosure_Form.md"
  "${HW05_DIR}/ai-reports/23127001_HW05_AI_Privacy_Checklist.md"
)

mkdir -p "${BUILD_DIR}"

for markdown in "${DOCUMENTS[@]}"; do
  stem="$(basename "${markdown}" .md)"
  html="${BUILD_DIR}/${stem}.html"
  pdf="$(dirname "${markdown}")/${stem}.pdf"

  pandoc "${markdown}" \
    --from gfm \
    --to html5 \
    --standalone \
    --toc \
    --css "${CSS_FILE}" \
    --metadata title="${stem}" \
    --output "${html}"

  windows_html="$(wslpath -w "${html}")"
  windows_pdf="$(wslpath -w "${pdf}")"
  file_url="file:///${windows_html//\\//}"

  "${EDGE_EXECUTABLE}" \
    --headless=new \
    --disable-gpu \
    --no-pdf-header-footer \
    "--print-to-pdf=${windows_pdf}" \
    "${file_url}"

  [[ -s "${pdf}" ]] || { echo "PDF generation failed: ${pdf}" >&2; exit 3; }
  echo "Wrote ${pdf}"
done

