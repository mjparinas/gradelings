#!/usr/bin/env bash
# Downloads the West Virginia standards and related documents used by Gradelings into a folder.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
# The committed copies are in source/ (checksums in source/SHA256SUMS), each Word file with a plain-text extract made by
# build_outcomes.py --text. wveis.k12.wv.us, wvde.us and code.wvlegislature.gov answer plain curl with a browser user agent.
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
ua="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
get() {
  curl -fsSL --retry 3 -A "$ua" -o "$out/$1" "$2"
  sleep 1
}
policy="https://wveis.k12.wv.us/wvboe/policies/policy.php"
# The content standards are West Virginia Board of Education policies, legislative rules in Title 126 of the Code of State
# Rules. The board's policy page serves each as a scanned PDF (no text) and as a Word file; the Word file is the source here
# (add "&alt=1" for Word; without it the PDF comes back).
# English language arts: Policy 2520.1A, 126CSR44A, filed July 9, 2020, effective July 1, 2021.
get ela-2520.1A.docx "$policy?p=2520.1A&alt=1"
# Mathematics: Policy 2520.2B, 126CSR44BB, filed August 29, 2023, effective July 1, 2024.
get math-2520.2B.docx "$policy?p=2520.2B&alt=1"
# Science: Policy 2520.3C, 126CSR44CC, filed August 16, 2021, effective July 1, 2022.
get science-2520.3C.docx "$policy?p=2520.3C&alt=1"
# Social studies: Policy 2520.4, 126CSR44D, filed July 8, 2024.
get social-2520.4.docx "$policy?p=2520.4&alt=1"
# Policy 2510 (programs of study by grade, high school credits and the uniform grading scale) and Policy 2512 (the tiered
# system of support for early literacy and numeracy).
get policy-2510.docx "$policy?p=2510&alt=1"
get policy-2512.docx "$policy?p=2512&alt=1"
# The West Virginia General Summative Assessment: the WVDE's pages on the test, its achievement levels and its FAQ.
get wvgsa.html "https://wvde.us/academics/assessment/general-summative-assessment"
get wvgsa-scale-scores.html "https://wvde.us/academics/assessment/scaled-scored-information/scale-score-west-virginia-general-summative-assessment"
get wvgsa-faq.html "https://wvde.us/academics/assessment/general-summative-assessment/general-summative-assessment-frequently-asked-questions"
# Laws: the Student Data Accessibility, Transparency and Accountability Act (W. Va. Code §18-2-5h) and the Third Grade
# Success Act (§18-2E-10).
get code-18-2-5h.html "https://code.wvlegislature.gov/18-2-5H/"
get code-18-2e-10.html "https://code.wvlegislature.gov/18-2E-10/"
python3 -I "$(dirname "$0")/build_outcomes.py" --text "$out"
(cd "$out" && sha256sum *.docx *.html > SHA256SUMS)
echo "Saved to $out"
