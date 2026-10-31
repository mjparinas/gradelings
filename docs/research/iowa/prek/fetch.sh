#!/usr/bin/env bash
# Downloads the Iowa Early Learning Standards (4th edition, June 2026, Iowa Department of Education and Iowa Department of Health and Human Services) into source/, which is committed. educate.iowa.gov refuses scripted downloads, so the files are the Common Standards Project's copies
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
get math 1BE8D2F3B43444D585BC7927E2BEF739
get language 1C7EC0ED01184BF3BAD613F3A24F3B94
get science E96347271F8B4895A4F3905303D08EF0
get social 8AED3EF00F9C4043B76B0340696A226D
get emotional 8A6BBE2B8D6143FFAF2E9EA0B1A9EF78
echo "Saved to $out"
