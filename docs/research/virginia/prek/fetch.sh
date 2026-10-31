#!/usr/bin/env bash
# Downloads Virginia's Early Learning and Development Standards (ELDS, 2021, Virginia Department of Education) into source/, which is committed. doe.virginia.gov refuses scripted downloads (403), so the files are the Common Standards Project's copies
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
get language B55DA8CD6B6344FAB6A95D4F1BD9C1CB
get cognitive 29CEDCCC0AD44F32B4E344B1315C95D0
get approaches 0B5899F4ED58452D9F353FE47AA53A4B
get social-emotional 19EA2AED0B844B0481B48B51754A13FC
echo "Saved to $out"
