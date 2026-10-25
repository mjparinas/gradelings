#!/usr/bin/env bash
# Downloads the Louisiana Student Standards, the grading-scale and early literacy laws, the LEAP parent guide and the
# student privacy law used by build_outcomes.py and the guides, with a plain-text copy of each (pdftotext -layout).
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
#
# doe.louisiana.gov and legis.la.gov answer plain curl. The science standards come as one zip of per-grade PDFs; the
# grade files and the two high school courses cited (Life Science, which is Biology, and Physical Science) are kept
# under short names.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="${1:-$here/source}"
mkdir -p "$out"
doe=https://doe.louisiana.gov/docs/default-source
legis=https://www.legis.la.gov/legis

get() { curl -sSfL --retry 3 -o "$out/$1" "$2"; }

get math-2016.pdf "$doe/teacher-toolbox-resources/louisiana-student-standards-for-k-12-math.pdf"
get ela-2026.pdf "$doe/teacher-toolbox-resources/2026-k-12-louisiana-student-standards-for-english-language-arts.pdf"
get social-2022.pdf "$doe/academic-curriculum/k-12-louisiana-student-standards-for-social-studies.pdf"
get leap-parent-guide.pdf "$doe/assessment/parent-guide-to-the-leap-tests.pdf"
get act428-2024.pdf "$legis/ViewDocument.aspx?d=1381906"
get act422-2023.pdf "$legis/ViewDocument.aspx?d=1333198"
get rs17-3914.html "$legis/LawPrint.aspx?d=920124"

zip="$(mktemp -d)"
trap 'rm -rf "$zip"' EXIT
curl -sSfL --retry 3 -o "$zip/science.zip" "$doe/teacher-toolbox-resources/k-12-louisiana-student-standards-for-science.zip"
unzip -q "$zip/science.zip" -d "$zip"
sci="$zip/k-12-louisiana-student-standards-for-science"
cp "$sci/00 Science Standards - Kindergarten.pdf" "$out/science-k.pdf"
for g in 1 2 3 4 5 6 7 8; do cp "$sci/0$g Science Standards - Grade $g.pdf" "$out/science-$g.pdf"; done
cp "$sci/Science Standards - Life Science.pdf" "$out/science-life.pdf"
cp "$sci/Science Standards - Physical Science.pdf" "$out/science-physical.pdf"

for f in "$out"/*.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
python3 -I - "$out/rs17-3914.html" "$out/rs17-3914.txt" <<'PY'
import html, re, sys
t = open(sys.argv[1], encoding="utf-8", errors="ignore").read()
t = re.sub(r"<script.*?</script>|<style.*?</style>", "", t, flags=re.S)
t = html.unescape(re.sub(r"<[^>]+>", "\n", t))
open(sys.argv[2], "w").write(re.sub(r"\n\s*\n+", "\n", t))
PY
(cd "$out" && sha256sum -- *.pdf *.html > SHA256SUMS)
echo "Downloaded to $out"
