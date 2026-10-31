#!/usr/bin/env bash
# Downloads the Nevada Pre-Kindergarten Standards (Revised 2023, Nevada Department of Education) into source/, which is committed. The state publishes them only as a PDF, so the files are the Common Standards Project's copies
# (api.commonstandardsproject.com); each names the page it was taken from (document.sourceURL).
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
api="https://api.commonstandardsproject.com/api/v1/standard_sets"
get() {
  curl -fsSL --retry 3 -o "$out/$1.json" "$api/$2"
  python3 -c "import json,sys; d=json.load(open(sys.argv[1])); json.dump(d, open(sys.argv[1],'w'), indent=1, sort_keys=True, ensure_ascii=False)" "$out/$1.json"
  sleep 1
}
get language 1E2CFDC70DF446598955CDC60D2D0FC5
get math D0FD8647B4D44D0AAABCDF10670BF587
get science 981F19E8900B432A937814D966576258
get social 8EFAFE8D7F5140078F8E7D4CCA728994
get approaches A741F7A83BF043BA903A33BA85BA37D3
echo "Saved to $out"
