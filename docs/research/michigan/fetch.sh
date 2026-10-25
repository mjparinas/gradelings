#!/usr/bin/env bash
# Downloads the Michigan K-12 standards used by Gradelings from the Michigan Department of Education (michigan.gov/mde),
# the MDE guidance the parent guides cite, and the student privacy laws from the Michigan Legislature, with a plain-text
# copy of each PDF (pdftotext -layout).
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
mde="https://www.michigan.gov/mde/-/media/Project/Websites/mde"
get() {
  curl -fsSL -A "Mozilla/5.0 (X11; Linux x86_64)" --retry 3 -o "$out/$1" "$2"
  sleep 1
}
# The four content standards, as linked from https://www.michigan.gov/mde/services/academic-standards.
get math.pdf "$mde/Literacy/Content-Standards/Math_Standards.pdf"                 # Mathematics (adopted 2010)
get ela.pdf "$mde/Literacy/Content-Standards/ELA_Standards.pdf"                   # English language arts (adopted 2010)
get science.pdf "$mde/Literacy/Content-Standards/Science_Standards.pdf"           # Science (adopted November 2015)
get social.pdf "$mde/Academic-Standards/Social_Studies_Standards.pdf"             # Social studies (adopted June 2019)
# Guidance for the parent guides.
get sel.pdf "https://www.michigan.gov/documents/mde/SEL_Competencies-_ADA_Compliant_FINAL_605109_7.pdf"
get assessments.pdf "https://www.michigan.gov/-/media/Project/Websites/mde/OEAA/General/Guide_to_State_Assessments.pdf"
# Student privacy: the Student Online Personal Protection Act (Act 368 of 2016, MCL 388.1291 to 388.1295) and the
# Protection of Pupil Privacy section of the Revised School Code (MCL 380.1136).
get act-368-of-2016.pdf "https://www.legislature.mi.gov/documents/mcl/pdf/mcl-Act-368-of-2016.pdf"
get mcl-380-1136.pdf "https://www.legislature.mi.gov/documents/mcl/pdf/mcl-380-1136.pdf"
(cd "$out" && for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done && sha256sum *.pdf *.txt > SHA256SUMS)
echo "Saved to $out"
