#!/usr/bin/env bash
# Downloads the official Saskatchewan curriculum sources (Ministry of Education, curriculum.gov.sk.ca and its
# French twin progetudes.gov.sk.ca) that outcomes.json was built from, Kindergarten to Grade 9.
# Usage: ./fetch.sh [dir]   (default: ./source next to this script; needs curl and pdftotext)
# Then:  python3 -I build_outcomes.py [dir]   and   python3 -I build_french_outcomes.py [dir]
#
# For each course it saves:
#   html/<name>.html  the course's "Outcomes & Indicators" page (CurriculumOutcomeContent?id=N), the page every
#                     outcome code and text in outcomes.json is read from;
#   txt/<name>.txt    `pdftotext -layout` of the course's curriculum PDF (CurriculumFile?id=N), for re-checking
#                     wording, indicators and context by hand.
# The PDFs themselves are about 2 MB each (about 110 MB for all 55 courses) and say the same as the pages, so
# they are not kept unless KEEP_PDF=1 is set (then they go in pdf/<name>.pdf).
set -euo pipefail
OUT="${1:-$(dirname "$0")/source}"
mkdir -p "$OUT/html" "$OUT/txt"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
EN=https://curriculum.gov.sk.ca
FR=https://progetudes.gov.sk.ca

curl_() { curl -fsSL --retry 3 -A "Mozilla/5.0" "$@"; }

# get <site> <name> <outcome page id> [pdf id]: the outcomes page, plus the PDF's text when a PDF id is given.
# The PDF link redirects through edonline.sk.ca (Blackboard) to a signed download, so curl follows redirects.
get() {
  local site="$1" name="$2" id="$3" pdf="${4:-}"
  curl_ -o "$OUT/html/$name.html" "$site/CurriculumOutcomeContent?id=$id"
  if [ -n "$pdf" ]; then
    curl_ -o "$TMP/$name.pdf" "$site/CurriculumFile?id=$pdf"
    pdftotext -layout "$TMP/$name.pdf" "$OUT/txt/$name.txt"
    if [ "${KEEP_PDF:-0}" = 1 ]; then mkdir -p "$OUT/pdf"; mv "$TMP/$name.pdf" "$OUT/pdf/$name.pdf"; fi
  fi
}

# Kindergarten: the four areas of learning have their own outcome pages (ids from CurriculumHome?id=405); the
# Kindergarten curriculum is one combined PDF (CurriculumFile?id=405), saved once as kindergarten.txt.
get "$EN" ela_k 36
get "$EN" math_k 154
get "$EN" science_k 66
get "$EN" social_k 176
curl_ -o "$TMP/kindergarten.pdf" "$EN/CurriculumFile?id=405"
pdftotext -layout "$TMP/kindergarten.pdf" "$OUT/txt/kindergarten.txt"
if [ "${KEEP_PDF:-0}" = 1 ]; then mkdir -p "$OUT/pdf"; mv "$TMP/kindergarten.pdf" "$OUT/pdf/kindergarten.pdf"; fi

# Grades 1 to 9: one course per grade and subject; the page id and PDF id are the same number.
# English Language Arts 1-9 = 27-35, Mathematics 1-9 = 145-153, Science 1-9 = 54-62, Social Studies 1-9 = 164-172.
for g in 1 2 3 4 5 6 7 8 9; do
  get "$EN" "ela_$g" $((26 + g)) $((26 + g))
  get "$EN" "math_$g" $((144 + g)) $((144 + g))
  get "$EN" "science_$g" $((53 + g)) $((53 + g))
  get "$EN" "social_$g" $((163 + g)) $((163 + g))
done

# Core French Levels 1 to 9 (ids 395-403); read by build_french_outcomes.py as the grade with the same number.
for l in 1 2 3 4 5 6 7 8 9; do get "$EN" "core-french_$l" $((394 + l)) $((394 + l)); done

# Français en immersion 3 to 9 (ids 268-274) and the Programme d'études interdisciplinaire for immersion
# Kindergarten, Grade 1 and Grade 2 (ids 407-409), on the French site.
for g in 3 4 5 6 7 8 9; do get "$FR" "immersion_$g" $((265 + g)) $((265 + g)); done
get "$FR" immersion_k 407 407
get "$FR" immersion_1 408 408
get "$FR" immersion_2 409 409

echo "Saved to $OUT"
