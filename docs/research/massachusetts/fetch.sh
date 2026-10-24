#!/usr/bin/env bash
# Downloads the Massachusetts Curriculum Frameworks used by Gradelings from the Massachusetts Department of Elementary
# and Secondary Education (doe.mass.edu), with a plain-text copy of each PDF (pdftotext -layout), plus the state rules
# on student records and data security that /privacy/ refers to.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
ua="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
get() {
  curl -fsSL -A "$ua" --retry 3 -o "$out/$1" "$2"
  sleep 1
}
fw="https://www.doe.mass.edu/frameworks"
# Mathematics, Pre-Kindergarten to Grade 12 (March 2017).
get math-2017.pdf "$fw/math/2017-06.pdf"
# English Language Arts and Literacy, Pre-Kindergarten to Grade 12 (March 2017).
get ela-2017.pdf "$fw/ela/2017-06.pdf"
# Science and Technology/Engineering, Pre-Kindergarten to Grade 12 (April 2016).
get scitech-2016.pdf "$fw/scitech/2016-04.pdf"
# History and Social Science, Pre-Kindergarten to Grade 12 (June 2018).
get hss-2018.pdf "$fw/hss/2018-12.pdf"
# Student records regulations (603 CMR 23.00), the data security law (M.G.L. chapter 93H), saved as web
# pages. mass.gov refuses scripts (HTTP 403), so 201 CMR 17.00 (the data security regulations) is not saved here.
get 603cmr23.html "https://www.doe.mass.edu/lawsregs/603cmr23.html"
for s in 1 2 3 4 5 6; do
  get "mgl-93h-$s.html" "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter93H/Section$s"
done
(cd "$out" && for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt"; done && sha256sum *.pdf *.html *.txt > SHA256SUMS)
echo "Saved to $out"
