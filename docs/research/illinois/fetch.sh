#!/usr/bin/env bash
# Downloads the Illinois Learning Standards (Illinois State Board of Education) used by Gradelings into a folder.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
# The committed copies are in source/ (checksums in source/SHA256SUMS), each PDF with a pdftotext -layout extract.
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
base="https://www.isbe.net/Documents"
get() {
  curl -fsSL --retry 3 -A "Mozilla/5.0 (X11; Linux x86_64)" -o "$out/$1" "$base/$2"
  sleep 1
}
# Mathematics: the Common Core State Standards, adopted by Illinois in 2010 (isbe.net/Pages/Standards-Courses.aspx).
get math.pdf math-standards.pdf
# English language arts: the Common Core State Standards, adopted by Illinois in 2010.
get ela.pdf ela-standards.pdf
# Science: the Next Generation Science Standards, adopted by Illinois in 2014 (isbe.net/Pages/Science-Standards.aspx).
get science.pdf Il-Learning-Standards-Science.pdf
# Social science (2016, in schools from 2017-18; isbe.net/Pages/Social-Science-Standards.aspx).
get social.pdf IL-Social-Science-Standards.pdf
# Social and emotional learning standards (isbe.net/Pages/Social-Emotional-Learning.aspx).
get sel.pdf Illinois-Social-Emotional-Learning-Standards.pdf
# State assessment dates, 2026-27 (isbe.net/Pages/Assessment.aspx).
get assessment-dates-2026-27.pdf State-Assessment-Dates-2026-27.pdf
# Mandated units of study in the School Code (isbe.net/Pages/Learning-Standards.aspx).
get mandated-units.pdf IL-Mandated-Units-of-Study.pdf
for f in "$out"/*.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
(cd "$out" && sha256sum *.pdf > SHA256SUMS)
echo "Saved to $out"
