#!/usr/bin/env bash
# Downloads Ohio's Learning Standards used by Gradelings from the Ohio Department of Education and Workforce
# (education.ohio.gov), with a plain-text copy of each PDF (pdftotext -layout).
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
base="https://education.ohio.gov/getattachment/Topics/Learning-in-Ohio"
get() {
  curl -fsSL -A "Mozilla/5.0" --retry 3 -o "$out/$1" "$base/$2"
  sleep 1
}
# Mathematics (adopted 2017), Kindergarten to high school, one PDF.
get math-2017.pdf "Mathematics/Ohio-s-Learning-Standards-in-Mathematics/MATH-Standards-2017.pdf.aspx?lang=en-US"
# English language arts: the K-8 standards adopted 2026 (first taught 2027-28) and the 9-12 standards of 2017, in one
# PDF, and the Department's spreadsheet of the same standards by grade.
get ela-2026-k12.pdf "English-Language-Art/English-Language-Arts-Standards/2026-Revised-ELA-Standards-K-12.pdf.aspx?lang=en-US"
get ela-2026-by-grade.xlsx "English-Language-Art/English-Language-Arts-Standards/2026-Ohio-s-Learning-Standards-for-English-Language-Arts-by-Grade-Level.xlsx.aspx?lang=en-US"
# Science standards and model curriculum (adopted 2018).
get science-2018.pdf "Science/Ohios-Learning-Standards-and-MC/SciFinalStandardsMC060719.pdf.aspx?lang=en-US"
# Social studies: the K-8 standards updated July 2026 (taught from 2027-28) and the 2018 standards (adopted 2018,
# published January 2019), whose high school courses did not change.
get social-k8-2026.pdf "Social-Studies/Ohio-s-Learning-Standards-for-Social-Studies/Ohio-s-Learning-Standards-for-Social-Studies_K-8-7-2026.pdf.aspx?lang=en-US"
get social-2019.pdf "Social-Studies/Ohio-s-Learning-Standards-for-Social-Studies/Ohio-s-Learning-Standards-for-Social-Studies_01-2019.pdf.aspx?lang=en-US"
# The student data privacy sections of the Ohio Revised Code (Senate Bill 29, as amended), from codes.ohio.gov.
for n in 325 326 327; do
  curl -fsSL -A "Mozilla/5.0" --retry 3 -o "$out/orc-3319.$n.pdf" "https://codes.ohio.gov/assets/laws/revised-code/authenticated/33/3319/3319.$n/12-9-2024/3319.$n-12-9-2024.pdf"
  sleep 1
done
(cd "$out" && for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt"; done && sha256sum *.pdf *.xlsx *.txt > SHA256SUMS)
echo "Saved to $out"
