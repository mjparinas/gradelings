#!/usr/bin/env bash
# Downloads the pre-kindergarten standards in the Oklahoma Academic Standards (mathematics 2022, English language arts 2021, science 2020, social studies 2025, Oklahoma State Department of Education) into source/, which is committed. the standards are published as PDFs laid out in tables, so the files are the Common Standards Project's copies
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
get math 39FE6BDC03A5471F877A3A0048638B13_D21321191_grade-pre-k
get ela 39FE6BDC03A5471F877A3A0048638B13_D21211786_grade-pre-k
get science 39FE6BDC03A5471F877A3A0048638B13_D21131374_grade-pre-k
get social-studies C08DAD19E17C44059FB362224C0CDB02
echo "Saved to $out"
