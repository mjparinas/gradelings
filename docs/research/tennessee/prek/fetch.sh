#!/usr/bin/env bash
# Downloads the Tennessee Early Learning Developmental Standards for four-year-olds (2018, Tennessee Department of Education) into source/, which is committed. the standards are published as PDFs laid out in tables, so the files are the Common Standards Project's copies
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
get math EF3D17EDD43D42069E152F75EC370DE3
get science DDD7D47970944CDABA9A7FA6F1B52614
get social EB56198E89BD4171A7B46F811D852C2B
get language D3FF6AB007414485AC8B337CD8903D19
get approaches 998E3CBB928241FD9FC585706096CCF5
echo "Saved to $out"
