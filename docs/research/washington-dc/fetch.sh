#!/usr/bin/env bash
# Downloads Washington, DC's standards used by build_outcomes.py, and the documents the parent guides and the schools
# notice rely on:
#   Achievement Standards Network (ASN, run by D2L) copies, statement by statement with codes and grade levels:
#     D2472998  Common Core State Standards for Mathematics (2010), DC's mathematics standards
#     D2473702  Common Core State Standards for English Language Arts & Literacy (2010), DC's ELA standards
#     D2599182  Next Generation Science Standards (2013), which the DC State Board of Education adopted in December 2013
#   Office of the State Superintendent of Education (osse.dc.gov):
#     the DC Social Studies Standards (June 2023), in English and in Spanish, and the State Board's resolution SR23-7
#     approving them; the standards of learning, social studies and NGSS pages; the DC CAPE page (DC ELA and DC Math
#     in grades 3-8 and high school courses, DC Science in grades 5 and 8 and high school biology, five performance
#     levels), its introduction for families and the performance level ranges by grade
#   DC Code (code.dccouncil.gov): chapter 8B of title 38, the Protecting Students Digital Privacy Act (§ 38-831.01 ff.)
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$(mkdir -p "${1:-$here/source}" && cd "${1:-$here/source}" && pwd)"
ua="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

get() {
  curl -fsSL --retry 3 -A "$ua" -o "$out/$1" "$2"
  sleep 1
}

asn="https://asn.desire2learn.com/resources"
for pair in math:D2472998 ela:D2473702 science:D2599182; do
  name="${pair%%:*}"
  id="${pair##*:}"
  get "asn-$name-$id.json" "$asn/${id}_full.json"
  get "asn-$name-$id-document.json" "$asn/$id.json"
done

osse="https://osse.dc.gov/sites/default/files/dc/sites/osse/page_content/attachments"
get osse-dc-social-studies-standards.pdf "$osse/Standards%20in%20English.pdf"
get osse-dc-social-studies-standards-spanish.pdf "$osse/TAL_SSStandards_SinglePageLayout_BW.pdf"
get osse-sboe-sr23-7-approve-social-studies-standards.pdf "$osse/To%20Approve%20DC%20Social%20Studies%20Standards%20SR23-7.pdf"
get osse-dc-cape-introduction-for-families.pdf "$osse/DC%20CAPE%20Introduction%20for%20Families%20%28English%29.pdf"
get osse-dc-cape-ela-performance-levels.pdf "$osse/DC%20CAPE%20ELA%20Performance%20Level%20Ranges%20by%20Grade%20Level.pdf"
get osse-dc-cape-math-performance-levels.pdf "$osse/DC%20CAPE%20Mathematics%20Performance%20Level%20Ranges%20by%20Grade%20Level.pdf"
get osse-standards-of-learning.html "https://osse.dc.gov/service/dc-standards-learning"
get osse-social-studies.html "https://osse.dc.gov/page/social-studies-0"
get osse-ngss.html "https://osse.dc.gov/service/next-generation-science-standards-ngss-page"
get osse-dc-cape.html "https://osse.dc.gov/page/dc-cape"

get dc-code-38-chapter-8b-student-digital-privacy.html "https://code.dccouncil.gov/us/dc/council/code/titles/38/chapters/8B"
for s in 01 02 03 04 05 06; do get "dc-code-38-831.$s.html" "https://code.dccouncil.gov/us/dc/council/code/sections/38-831.$s"; done

cd "$out"
for pdf in *.pdf; do pdftotext -layout "$pdf" "${pdf%.pdf}.txt"; done
sha256sum *.json *.html *.pdf *.txt > SHA256SUMS
echo "Saved to $out"
