#!/usr/bin/env bash
set -euo pipefail
root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
node "$root_dir/hw06/scripts/generate_artifacts.js"
mkdir -p "$root_dir/hw06/results"
newman_bin="$root_dir/hw06/node_modules/.bin/newman"
if [[ ! -x "$newman_bin" ]]; then
  newman_bin="npx newman"
fi
exec $newman_bin run "$root_dir/hw06/collections/23127001_HW06_API.postman_collection.json" \
  --environment "$root_dir/hw06/environments/local.postman_environment.json" \
  --reporters cli,json,htmlextra \
  --reporter-json-export "$root_dir/hw06/results/newman-report.json" \
  --reporter-htmlextra-export "$root_dir/hw06/results/newman-report.html"
