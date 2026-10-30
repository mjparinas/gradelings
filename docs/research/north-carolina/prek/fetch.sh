#!/usr/bin/env bash
# Downloads North Carolina Foundations for Early Learning and Development (2013, North Carolina Foundations Task Force) into source/, which is committed. the state's sites refuse scripted downloads, so the files are the Common Standards Project's copies
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
get cognitive E3C9402103F74D6C81E62ECAE9421E3D
get language F687FAB94F1849C496F3760815F1BAB0
get emotional-social 60FC76F539F04B58B9784031946D36F4
echo "Saved to $out"
