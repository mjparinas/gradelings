#!/usr/bin/env bash
# Downloads the pre-K standards in the Massachusetts Curriculum Frameworks (mathematics and English language arts 2017, science and technology/engineering 2016, history and social science 2018) and the social-emotional guidelines in the Massachusetts Guidelines for Preschool and Kindergarten Learning Experiences (2019) into source/, which is committed. the frameworks are long PDFs laid out for print, so the files are the Common Standards Project's copies
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
get math 95C543B18A1B473B894ED35ECA322576_D2802330_grade-pre-k
get ela 95C543B18A1B473B894ED35ECA322576_D2800677_grade-pre-k
get ste 95C543B18A1B473B894ED35ECA322576_D2730523_grade-pre-k
get hss 95C543B18A1B473B894ED35ECA322576_D21253178_grade-pre-k
get sel 340F2DA39F92485FAC17B25D077EEC89
echo "Saved to $out"
