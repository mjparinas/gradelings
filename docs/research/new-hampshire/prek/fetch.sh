#!/usr/bin/env bash
# Downloads New Hampshire's Early Learning Standards, Birth through Age Five (2016, New Hampshire Department of Health and Human Services and Department of Education) into source/, which is committed. nh-connections.org refuses scripted downloads (406), so the files are the Common Standards Project's copies
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
get language 1229C4DA77BC46A3B207F991E76356FD
get numeracy 8DED4E7BE05D4196A6C4475518CCB803
get general-knowledge 13285EF7811D4DE5A262BDE1ACFC215E
get approaches E27F1B5030604671956CFA196AF90924
get social-emotional CDF904691C6742038866B1A193707F10
echo "Saved to $out"
