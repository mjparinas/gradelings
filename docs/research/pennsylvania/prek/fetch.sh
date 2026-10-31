#!/usr/bin/env bash
# Downloads the Pennsylvania Learning Standards for Early Childhood, Pre-Kindergarten (2024, Pennsylvania Office of Child Development and Early Learning) into source/, which is committed. the standards are published as a long PDF laid out in tables, so the files are the Common Standards Project's copies
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
get math B844DB2DA33F49938F2EC9A590322CDC
get language DA2CC4ADD0744F6E905D08D992D524FE
get science E89F133B347242E4921BB952C0BA6AAE
get social-studies 5736F5B28A8442BAA3154D14CB8CA401
get social-emotional B8CC96FDA40847ACB859CC153B5D3E00
echo "Saved to $out"
