#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HW05_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
OUTPUT="${HW05_DIR}/evidence/hardware/wsl_environment.txt"

mkdir -p "$(dirname "${OUTPUT}")"

{
  echo "HW05 environment evidence"
  date --iso-8601=seconds
  echo
  echo "Identity"
  whoami
  hostname
  echo
  echo "Kernel"
  uname -a
  echo
  echo "CPU"
  lscpu
  echo
  echo "Memory"
  free -h
  echo
  echo "Storage"
  df -h "${HW05_DIR}"
  echo
  echo "Tools"
  node --version
  npm --version
  java -version 2>&1
  htop --version
} > "${OUTPUT}"

echo "Wrote ${OUTPUT}"
echo "This text does not replace the required dxdiag/resource screenshot."

