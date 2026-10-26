#!/usr/bin/env bash
# Downloads the Connecticut standards and related documents used by Gradelings into a folder.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
# The committed copies are in source/ (checksums in source/SHA256SUMS), each PDF with a pdftotext -layout extract.
# portal.ct.gov and prdext3.cga.ct.gov answer plain curl with a browser user agent.
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
ua="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
get() {
  curl -fsSL --retry 3 -A "$ua" -o "$out/$1" "$2"
  sleep 1
}
# Mathematics: the Connecticut Core Standards (the Common Core, adopted July 7, 2010). The Connecticut State Department of
# Education's searchable pages carry the text of every K-8 and high school standard with its code.
get math-k8.html "https://portal.ct.gov/PriorityStandards_Mathematics_K-8_beta_v1.8.html"
get math-hs.html "https://portal.ct.gov/PriorityStandards_Mathematics_HS_beta_v1.8.html"
# English language arts: the Connecticut Core Standards are the Common Core State Standards as published (the CSDE links
# to them; portal.ct.gov/SDE/Language-Arts/Literacy-English-Language-Arts).
get ela.pdf "https://corestandards.org/wp-content/uploads/2023/09/ELA_Standards1.pdf"
# Science: the Next Generation Science Standards, adopted by the State Board of Education on November 4, 2015. The CSDE
# links to nextgenscience.org for the text (portal.ct.gov/SDE/Science/Science-Standards-and-Resources).
get science.pdf "https://www.nextgenscience.org/sites/default/files/AllDCI.pdf"
get science-adoption.pdf "https://portal.ct.gov/-/media/sde/ct-core-standards/2016/03/nextgensciencestandards.pdf"
get science-assessment.pdf "https://portal.ct.gov/-/media/sde/student-assessment/ngss-science/ngss-assessment-overview-2022-23.pdf"
# Social studies: the Connecticut Elementary and Secondary Social Studies Standards, adopted October 4, 2023.
get social.pdf "https://portal.ct.gov/-/media/sde/social-studies/socialstudiesstandards.pdf"
get social-adoption.pdf "https://portal.ct.gov/-/media/SDE/Board/BoardMaterials100423/Adoption_of_the_Connecticut_Elementary_and_Secondary_Social_Studies_Standards.pdf"
# Smarter Balanced: the CSDE's parent guide to the Individual Student Report.
get sbac-parent-guide.pdf "https://portal.ct.gov/-/media/sde/student-assessment/smarter-balanced/parents-guide-to-the-isr-2024.pdf"
# Student data privacy: Connecticut General Statutes, chapter 170 (sections 10-234aa to 10-234dd). www.cga.ct.gov leaves out an intermediate certificate, so the
# legislature's other host, prdext3.cga.ct.gov, which serves the same pages, is used.
get chap170.htm "https://prdext3.cga.ct.gov/current/pub/chap_170.htm"
python3 -I "$(dirname "$0")/extract_law.py" "$out"
for f in "$out"/*.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
(cd "$out" && sha256sum *.pdf *.html *.htm > SHA256SUMS)
echo "Saved to $out"
