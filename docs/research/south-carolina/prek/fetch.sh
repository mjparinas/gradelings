#!/usr/bin/env bash
# Downloads the South Carolina Early Learning Standards (2017, South Carolina Department of Education and partners) into source/, which is committed. The state publishes them as a PDF, so the files are the Common Standards Project's copies
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
get math DDF12B3E104C4FA9AAB92CCC8F8E5DC3
get language 6CB84E14D35D4EF9A9B8381B19830387
get cognitive E8673576BC6E4B2EB54ACC6288039452
get emotional-social 95FB726CF69049A7B93964DC02FA5597
echo "Saved to $out"
