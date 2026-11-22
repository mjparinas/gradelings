#!/bin/sh
# Downloads Prince Edward Island Kindergarten to Grade 9 curriculum PDFs from princeedwardisland.ca into <dir>/source/.
# Run this on your own computer with a normal browser User-Agent: the site blocks bare cloud/sandbox requests (HTML pages
# especially), and grade/topic pages are JS shells that list no PDF links. Known publication URLs are listed below.
# Usage: sh fetch.sh [dir]     (default: this folder). Needs curl.
# After a successful run: python3 -I build_outcomes.py > outcomes.json
set -e
OUT="${1:-$(dirname "$0")}/source"
BASE=https://www.princeedwardisland.ca
mkdir -p "$OUT"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Outcomes frameworks are the checking source for outcomes.json. Subject guides elaborate the same SCOs.
cat > "$OUT/known.txt" <<'L'
/sites/default/files/publications/eelc_outcomes_framework_k.pdf
/sites/default/files/publications/eelc_outcomes_framework_1.pdf
/sites/default/files/publications/eelc_outcomes_framework_2.pdf
/sites/default/files/publications/eelc_outcomes_framework_3.pdf
/sites/default/files/publications/eelc_outcomes_framework_4.pdf
/sites/default/files/publications/eelc_outcomes_framework_5.pdf
/sites/default/files/publications/eelc_outcomes_framework_6.pdf
/sites/default/files/publications/eelc_outcomes_framework_7-9.pdf
/sites/default/files/publications/eelc_program_of_studies_k-6.pdf
/sites/default/files/publications/intermediate_program_of_studies_and_authorized_materials.pdf
/sites/default/files/publications/eelc_math_1.pdf
/sites/default/files/publications/eelc_math_2.pdf
/sites/default/files/publications/eelc_math_3.pdf
/sites/default/files/publications/eelc_math_4.pdf
/sites/default/files/publications/eelc_math_5.pdf
/sites/default/files/publications/eelc_math_6.pdf
/sites/default/files/publications/eelc_math_7.pdf
/sites/default/files/publications/eelc_math_8.pdf
/sites/default/files/publications/eelc_math_9_5.pdf
/sites/default/files/publications/eelc_science_1.pdf
/sites/default/files/publications/eelc_science_2.pdf
/sites/default/files/publications/eelc_science_3.pdf
/sites/default/files/publications/eelc_science_5.pdf
/sites/default/files/publications/eelc_science_6.pdf
/sites/default/files/publications/eelc_science_9.pdf
/sites/default/files/publications/eelc_science_foundation_document.pdf
/sites/default/files/publications/eelc_socialstudies_1.pdf
/sites/default/files/publications/eelc_socialstudies_2.pdf
/sites/default/files/publications/eelc_socialstudies_3.pdf
/sites/default/files/publications/eelc_socialstudies_5.pdf
/sites/default/files/publications/eelc_socialstudies_6.pdf
/sites/default/files/publications/eelc_socialstudies_7.pdf
/sites/default/files/publications/eelc_socialstudies_8.pdf
/sites/default/files/publications/eelc_socialstudies_9.pdf
/sites/default/files/publications/eelc_english_4-6.pdf
/sites/default/files/publications/eecd_langart7-9.pdf.htm_.pdf
/sites/default/files/publications/eelc_corefrench_4-6.pdf
/sites/default/files/publications/eelc_frenchimmersion_1.pdf
/sites/default/files/c659/eelc_kindergarten.pdf
L

cp "$OUT/known.txt" "$OUT/links.txt"
sed "s#^/#$BASE/#" "$OUT/known.txt" | sort -u > "$OUT/urls.txt"
echo "$(wc -l < "$OUT/urls.txt") PDFs to download"
while read -r url; do
  f="$OUT/$(basename "$url")"
  [ -s "$f" ] && [ "$(head -c 4 "$f")" = "%PDF" ] && continue
  echo "get $url"
  curl -sSL -A "$UA" -o "$f" "$url" || echo "  failed: $url"
  if [ -f "$f" ] && [ "$(head -c 4 "$f")" != "%PDF" ]; then rm -f "$f"; echo "  not a PDF (skipped): $url"; fi
  sleep 1
done < "$OUT/urls.txt"
echo "Done. Check $OUT, then: python3 -I $(dirname "$0")/build_outcomes.py > $(dirname "$0")/outcomes.json"
