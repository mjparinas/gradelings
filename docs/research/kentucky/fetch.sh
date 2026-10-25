#!/usr/bin/env bash
# Downloads the Kentucky Academic Standards used by Gradelings from the Kentucky Department of Education
# (education.ky.gov), the Kentucky Summative Assessments page and two of its performance level descriptors, and the
# student privacy law from the Kentucky Legislature, with a plain-text copy of each PDF (pdftotext -layout).
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
kas="https://www.education.ky.gov/curriculum/standards/kyacadstand/Documents"
aa="https://education.ky.gov/AA/Assessments"
get() {
  curl -fsSL -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36" --retry 3 -o "$out/$1" "$2"
  sleep 1
}
# The four content standards, as linked from https://kystandards.org/home/ky-acad-standards/.
get math-2019.pdf "$kas/Kentucky_Academic_Standards_Mathematics.pdf"                         # Mathematics (2019)
get reading-writing-2025.pdf "$kas/Kentucky_Academic_Standards_for_Reading_and_Writing_2025.pdf" # Reading and writing (2025)
get science-2022.pdf "$kas/Kentucky_Academic_Standards_for_Science_2022.pdf"                 # Science (2022)
get social-studies-2022.pdf "$kas/Kentucky_Academic_Standards_for_Social_Studies.pdf"        # Social studies (2022)
# The state tests, for the parent guide.
get ksa.html "$aa/Pages/KentuckySummativeAssessment-.aspx"
get ksa-pld-grade4.pdf "$aa/Documents/KSA_Performance_Level_Descriptor-Grade4_Full_Descriptor.pdf"
get ksa-pld-grade11.pdf "$aa/Documents/KSA_Performance_Level_Descriptor-Grade11_Full_Descriptor.pdf"
# Student privacy: KRS 365.734, personally identifiable student information and cloud computing service providers.
get krs-365-734.pdf "https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=43327"
(cd "$out" && for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done && sha256sum *.pdf *.txt *.html > SHA256SUMS)
echo "Saved to $out"
