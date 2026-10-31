#!/usr/bin/env bash
# Downloads Michigan's Early Childhood Standards of Quality for Birth to Kindergarten (2022, Michigan Department of Lifelong Education, Advancement, and Potential) into source/, which is committed. michigan.gov refuses scripted downloads (403), so the files are the Common Standards Project's copies
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
get math 6F733A5CDE024381B7B75FB57445C8EF
get language 44362765EB314ED9A95E40282C6ACEE1
get science 24667A655C3A44DEB035C1B43A70D91F
get social D8049D064BE24176ABF8A4F2557BBC2F
get social-emotional F4DFE1BC7B804B31AE4C216FC3BE9D88
echo "Saved to $out"
