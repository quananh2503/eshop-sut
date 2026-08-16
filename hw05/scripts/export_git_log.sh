#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"
OUTPUT="${REPO_DIR}/hw05/git_commit_log.txt"

git -C "${REPO_DIR}" log \
  --date=iso-strict \
  --pretty=format:'%H | %ad | %an | %s' \
  -- hw05 > "${OUTPUT}"

printf '\n' >> "${OUTPUT}"
echo "Wrote ${OUTPUT}"

