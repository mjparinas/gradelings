#!/bin/sh
# Downloads Prince Edward Island's Kindergarten to Grade 9 curriculum PDFs from princeedwardisland.ca into <dir>/source/.
# Run this on your own computer: the site blocks automated requests from the cloud sandbox this repo is developed in.
# NOT TESTED against the live site; if a page layout has changed, open the Programs of Study page in a browser and save the PDFs by hand.
# Usage: sh fetch.sh [dir]     (default: this folder). Needs curl, grep and sed.
set -e
OUT="${1:-$(dirname "$0")}/source"
BASE=https://www.princeedwardisland.ca
mkdir -p "$OUT"
UA="Mozilla/5.0 (compatible; gradelings-research; one-off download of public curriculum documents)"

pages="
/en/information/education-and-early-years/programs-of-study
/en/information/education-and-early-years/kindergarten-curriculum
/en/information/education-and-early-years/grade-1-curriculum
/en/information/education-and-early-years/grade-2-curriculum
/en/information/education-and-early-years/grade-3-curriculum
/en/information/education-and-early-years/grade-4-curriculum
/en/information/education-and-early-years/grade-5-curriculum
/en/information/education-and-early-years/grade-6-curriculum
/en/information/education-and-early-years/grade-7-curriculum
/en/information/education-and-early-years/grade-8-curriculum
/en/information/education-and-early-years/grade-9-curriculum
/en/topic/core-french
/en/information/education-and-early-years/french-immersion-curriculum
"

# Known direct links (from search results; the grade pages above should list the rest).
cat > "$OUT/known.txt" <<'L'
/sites/default/files/publications/eelc_program_of_studies_k-6.pdf
/sites/default/files/publications/intermediate_program_of_studies_and_authorized_materials.pdf
/sites/default/files/publications/eelc_math_9_5.pdf
/sites/default/files/publications/eelc_socialstudies_9.pdf
/sites/default/files/publications/eelc_outcomes_framework_4.pdf
L

: > "$OUT/links.txt"
for p in $pages; do
  curl -sSL -A "$UA" "$BASE$p" -o "$OUT/page.html" || continue
  grep -o 'href="[^"]*\.pdf"' "$OUT/page.html" | sed 's/href="//; s/"$//' >> "$OUT/links.txt" || true
done
cat "$OUT/known.txt" >> "$OUT/links.txt"
# Keep curriculum documents only, make links absolute, drop duplicates.
sed "s#^/#$BASE/#" "$OUT/links.txt" | grep -i 'eelc_\|program_of_studies\|curriculum' | sort -u > "$OUT/urls.txt"
echo "$(wc -l < "$OUT/urls.txt") PDFs to download"
while read -r url; do
  f="$OUT/$(basename "$url")"
  [ -s "$f" ] && continue
  echo "get $url"
  curl -sSL -A "$UA" -o "$f" "$url" || echo "  failed: $url"
  sleep 2
done < "$OUT/urls.txt"
rm -f "$OUT/page.html"
echo "Done. Check $OUT, then commit the PDFs you want kept."
