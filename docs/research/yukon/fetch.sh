#!/usr/bin/env bash
# Downloads the documents README.md cites for Yukon: the CMEC Student Transfer Guide for Yukon (how Yukon
# adapts the BC curriculum and reports on the Provincial Proficiency Scale) and Yukon Education's curriculum
# pages. Saves each PDF with a `pdftotext -layout` copy and each HTML page with a plain-text copy (when
# pandoc is installed). The BC curriculum itself is fetched by ../bc/fetch.sh.
# Usage: ./fetch.sh [dir]   (default: source/ next to this script; needs curl and pdftotext, pandoc optional)
set -euo pipefail
OUT="${1:-"$(dirname "$0")/source"}"
mkdir -p "$OUT/pdf" "$OUT/txt"
UA="Mozilla/5.0"

get() { # name, url: a PDF, kept with its text
  curl -fsSL --retry 3 -A "$UA" -o "$OUT/pdf/$1.pdf" "$2"
  pdftotext -layout "$OUT/pdf/$1.pdf" "$OUT/txt/$1.txt"
}
page() { # name, url: an HTML page. yukon.ca answers automated requests with 403 (bot protection), so a
  # failure here only warns; save the page from a browser into html/ by hand if it is needed.
  mkdir -p "$OUT/html"
  if curl -fsSL --retry 2 -A "$UA" -o "$OUT/html/$1.html" "$2"; then
    if command -v pandoc >/dev/null; then pandoc -f html -t plain --wrap=none "$OUT/html/$1.html" -o "$OUT/txt/$1.txt"; fi
  else
    rm -f "$OUT/html/$1.html"; rmdir "$OUT/html" 2>/dev/null || true
    echo "warning: could not fetch $2 (save it from a browser)" >&2
  fi
}

# --- CMEC Student Transfer Guide, Yukon (2023 edition, published 2024): sections 1.6 (curriculum) and 1.8 (reporting).
get cmec-transfer-guide_2023 https://cmec.ca/docs/transferguide/2024/Yukon-2023_Student-Transfer-Guide_EN.pdf
# --- Yukon Education: "Learn about the Yukon's school curriculum".
page school-curriculum https://yukon.ca/en/school-curriculum

echo "Saved to $OUT"
