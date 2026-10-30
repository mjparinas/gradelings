#!/usr/bin/env bash
# Downloads the Arizona Early Learning Standards, 4th edition (Arizona Department of Education, 2018) into source/, which is committed. azed.gov refuses scripted downloads, so the files are the Common Standards Project's copies
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
get math 081D4E23CBB247018B2580AAAE07F5D0
get language C87CFC0159CF4FDFAE1E566AA63B75F5
get science A3E8F1D81A7E40D3A4FCC6ECCAC22757
get social AB936142CBDD40F6B9A3115A760CDB5A
get social-emotional 0AEB6C371661402A9B48FCAEEEA2CFDD
echo "Saved to $out"
