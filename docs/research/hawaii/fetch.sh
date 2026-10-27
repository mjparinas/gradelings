#!/usr/bin/env bash
# Downloads Hawaiʻi's content standards used by build_outcomes.py and the parent guides, from the Hawaiʻi State
# Department of Education (HIDOE): the Hawaiʻi Common Core Standards for Mathematics (HCCS-M, approved by the Board of
# Education in 2026, dated July 17, 2026), the Hawaiʻi Common Core Standards for English Language Arts (approved April
# 2024, reprinted May 2026; a Google Doc, saved as plain text because its PDF export stops after the anchor standards),
# the Next Generation Science Standards (HIDOE's science standards) and the Hawaiʻi Core Standards for Social Studies
# (HCSSS, one file per grade or course); HIDOE's pages on standards, testing, the General Learner Outcomes and
# graduation requirements; and the Student Online Personal Information Protection law (HRS 302A-499 to 302A-500, Act 40
# of 2016). Writes a plain-text copy of each PDF (pdftotext -layout) and SHA256SUMS.
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
#
# hawaiipublicschools.org, Google Docs and Google Drive answer plain curl with a browser user agent.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$(mkdir -p "${1:-$here/source}" && cd "${1:-$here/source}" && pwd)"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

get() {
  curl -fsSL --retry 3 -A "$UA" -o "$out/$1" "$2"
  sleep 1
}
hidoe="https://hawaiipublicschools.org"
up="$hidoe/wp-content/uploads"

# Standards, as linked from https://hawaiipublicschools.org/academics/subject-matter-standards/
get math.pdf "https://drive.google.com/uc?export=download&id=18_9XgmoviYigqbGxCfjLxGQYkCmF_K-G"   # HCCS-M (2026), from https://sites.google.com/k12.hi.us/mathematics/standards
get ela.txt "https://docs.google.com/document/d/1IJBp5DMmlPSO2ftfvgPQ8dLJMMfq71XR1LLH4HIrtnQ/export?format=txt"   # HCCS for ELA (April 2024)
get science.pdf "https://www.nextgenscience.org/sites/default/files/AllDCI.pdf"   # NGSS, arranged by core idea
for f in HCSSSgrK HCSSSgr1 HCSSSgr2 HCSSSgr3 HCSSSgr4 HCSSSgr5 HCSSSgr6WorldHist HCSSSHawaiianKingdom \
  HCSSSPacificIslandStudies HCSSSgr8USHist HCSSSModernHistoryHawaii HCSSSDemocracy HCSSSUSHistoryGovernment \
  HCSSSWorldHistoryCulture; do
  get "$f.pdf" "$up/$f.pdf"   # Hawaiʻi Core Standards for Social Studies (2018)
done

# HIDOE pages for the parent guides and the report-card page
get subject-matter-standards.html "$hidoe/academics/subject-matter-standards/"
get types-of-testing.html "$hidoe/academics/types-of-testing/"
get general-learner-outcomes.html "$hidoe/academics/general-learner-outcomes-glos/"
get graduation-requirements.html "$hidoe/academics/graduation-requirements/"
get elementary.html "$hidoe/academics/elementary-pre-k-elementary/"
get math-standards-page.html "https://sites.google.com/k12.hi.us/mathematics/standards"

# Student Online Personal Information Protection (HRS chapter 302A, part II, subpart H)
hrs="https://data.capitol.hawaii.gov/hrscurrent/Vol05_Ch0261-0319/HRS0302A"
get hrs-302A-0499.htm "$hrs/HRS_0302A-0499.htm"
get hrs-302A-0500.htm "$hrs/HRS_0302A-0500.htm"
get act40-2016.pdf "https://data.capitol.hawaii.gov/sessions/sessionlaws/Years/SLH2016/SLH2016_Act40.pdf"

cd "$out"
for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
sha256sum *.pdf *.txt *.htm* > SHA256SUMS
echo "Saved to $out"
