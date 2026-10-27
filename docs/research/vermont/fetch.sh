#!/usr/bin/env bash
# Downloads Vermont's standards used by build_outcomes.py, and the documents the parent guides and the schools notice
# rely on:
#   Achievement Standards Network (ASN, run by D2L) copies, statement by statement with codes and grade levels:
#     D2472998  Common Core State Standards for Mathematics (2010), Vermont's mathematics standards
#     D2473702  Common Core State Standards for English Language Arts & Literacy (2010)
#     D2599182  Next Generation Science Standards (2013), Vermont's science standards
#     D2607350  College, Career, and Civic Life (C3) Framework for Social Studies State Standards (NCSS), which the
#               Vermont State Board of Education adopted as Vermont's social studies standards on September 20, 2017
#   Vermont Agency of Education (education.vermont.gov):
#     the State Board's agenda item adopting the C3 Framework (September 20, 2017), the Vermont Framework for K-8
#     Social Studies and its grade documents (Kindergarten to Grade 8), and the sample scope and sequence
#     the statewide assessments page (VTCAP: ELA and math in grades 3-9, science in grades 5, 8 and 11)
#   National Council for the Social Studies: the C3 Framework itself (rev. 2017)
#   Cognia, the VTCAP contractor: the Spring 2026 Score Interpretation Guide (the four performance levels)
#   Vermont Statutes (legislature.vermont.gov): 9 V.S.A. chapter 62 (subchapter 3A, student privacy), 16 V.S.A. § 164
#     (the State Board's standards duty) and 1 V.S.A. chapter 23 (Native American affairs and state recognition)
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
for pair in math:D2472998 ela:D2473702 science:D2599182 social-c3:D2607350; do
  name="${pair%%:*}"
  id="${pair##*:}"
  get "asn-$name-$id.json" "$asn/${id}_full.json"
  get "asn-$name-$id-document.json" "$asn/$id.json"
done
get asn-vermont.html "$asn/ASNJurisdiction/VT"   # ASN's list of Vermont documents, with their status

aoe="https://education.vermont.gov/sites/aoe/files/documents"
get aoe-state-board-item-092017-d2.pdf "$aoe/edu-state-board-item-092017-d2.pdf"
get aoe-vermont-framework-for-k-8-social-studies.pdf "$aoe/edu-vermont-framework-for-k-8-social-studies.pdf"
get aoe-k-8-sample-scope-and-sequence.pdf "$aoe/edu-c3-teaching-and-learning-k-8-framework-sample-scope-and-sequence.pdf"
get aoe-grade-k-me-and-my-community.pdf "$aoe/edu-kindergarten-me-and-my-community.pdf"
get aoe-grade-1-people-places-and-the-environment.pdf "$aoe/edu-grade-1-people-places-and-the-environment%20.pdf"
get aoe-grade-2-the-americas.pdf "$aoe/edu-grade-2-the-americas.pdf"
get aoe-grade-3-global-interactions.pdf "$aoe/edu-grade-3-global-interactions.pdf"
get aoe-grade-4-vermont-early-republic-to-civil-war.pdf "$aoe/edu-grade-4-vermont-the-early-republic-and-the-us-precolonial-times-to-the-civil-war.pdf"
get aoe-grade-5-world-geography-ancient-civilizations-1.pdf "$aoe/edu-grade-5-world-geography-and-ancient-civilizations-I-western-asia-the-middle-east-north-africa-sub-saharan-africa.pdf"
get aoe-grade-6-world-geography-ancient-civilizations-2.pdf "$aoe/edu-grade-6-world-geography-and-ancient-civilization-II-latin-america-south-and-east-asia-oceania-europe.pdf"
get aoe-grade-7-us-and-vermont-reconstruction-to-civil-rights.pdf "$aoe/edu-grade-7-the-us-and-vermont-from-reconstruction-to-the-civil-rights-movement.pdf"
get aoe-grade-8-civics-and-economics-in-action.pdf "$aoe/edu-grade-8-civics-and-economics-in-action.pdf"
get aoe-statewide-assessments.html "https://education.vermont.gov/learning/assessments/statewide-assessments"

get ncss-c3-framework-rev0617.pdf "https://www.socialstudies.org/sites/default/files/c3/c3-framework-for-social-studies-rev0617.pdf"
get vtcap-2026-score-interpretation-guide.pdf "https://vermont.onlinehelp.cognia.org/wp-content/uploads/sites/28/2026/06/VTCAP_2026_SIG_ADA.pdf"

leg="https://legislature.vermont.gov/statutes"
get vsa-09-chapter-062-personal-information.html "$leg/fullchapter/09/062"
get vsa-16-section-164-state-board.html "$leg/section/16/003/00164"
get vsa-01-chapter-023-native-american-affairs.html "$leg/fullchapter/01/023"

cd "$out"
for pdf in *.pdf; do pdftotext -layout "$pdf" "${pdf%.pdf}.txt"; done
sha256sum *.json *.html *.pdf *.txt > SHA256SUMS
echo "Saved to $out"
