#!/usr/bin/env bash
# Downloads the Indiana Early Learning Standards (2023, Indiana Department of Education) into source/, which is committed. in.gov refuses scripted downloads, so the files are the Common Standards Project's copies
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
get math 7CA4337314D54982A04C08ED0E799693
get language B3ECF766F3D149AFB83668494EE78486
get science 7F4BEEF07E1343E588260A4738236AD8
get social DEBC7A4B5E1148C1899CF62775B6EC29
get wellbeing F7EE5EC52AB54CA4A96628466B9D7998
echo "Saved to $out"
