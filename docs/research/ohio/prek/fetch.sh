#!/usr/bin/env bash
# Downloads Ohio's Early Learning and Development Standards (2022, Ohio Department of Education and Workforce and Ohio Department of Children and Youth) into source/, which is committed. the state's sites refuse scripted downloads, so the files are the Common Standards Project's copies
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
get math 0B5F16D42738487EB1E49A48F418987F
get language DB24A17A4E0244E48FE7A36320EC9BA5
get science 5494C08DFC2D46A0B0B7873421D35D2B
get social 579410478ACB43D1999723C3E2EB8179
get social-emotional 2184B5A6A8C54420A67F1C852239F59E
get cognitive ABB40366F7424469A83FDC2194B9DFD2
echo "Saved to $out"
