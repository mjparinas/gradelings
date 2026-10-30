#!/usr/bin/env bash
# Downloads the preschool expectations of the Colorado Academic Standards (the same documents as ../fetch.sh: Mathematics
# and Reading, Writing, and Communicating and Science adopted 2018, Social Studies adopted 2022) into source/, which is
# committed. cde.state.co.us refuses scripted connections, so like ../fetch.sh this uses the Common Standards Project's
# copies of CDE's documents; each file names the CDE page it was taken from (sourceURL).
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
api="https://api.commonstandardsproject.com/api/v1/standard_sets"
co="83F29380C23C4AEB843733B243CB2243"
for pair in "math D2980651" "rwc D21132944" "science D2980644" "social D21428307"; do
  set -- $pair
  curl -fsSL --retry 3 -o "$out/$1-pk.json" "$api/${co}_$2_grade-pre-k"
  python3 -c "import json,sys; d=json.load(open(sys.argv[1])); json.dump(d, open(sys.argv[1],'w'), indent=1, sort_keys=True, ensure_ascii=False)" "$out/$1-pk.json"
  sleep 1
done
echo "Saved to $out"
