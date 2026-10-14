#!/usr/bin/env bash
# Downloads the NWT Education, Culture and Employment (ECE) pages and fact sheets on JK-12 Curriculum
# Renewal, the move to the BC curriculum adapted for the NWT, that README.md cites. Saves each PDF with a
# `pdftotext -layout` copy and each HTML page with a plain-text copy (when pandoc is installed).
# The BC curriculum itself is fetched by ../bc/fetch.sh.
# Usage: ./fetch.sh [dir]   (default: source/ next to this script; needs curl and pdftotext, pandoc optional)
set -euo pipefail
OUT="${1:-"$(dirname "$0")/source"}"
mkdir -p "$OUT/pdf" "$OUT/txt" "$OUT/html"
UA="Mozilla/5.0"
E=https://www.ece.gov.nt.ca
F=$E/sites/ece/files
# ece.gov.nt.ca is slow and sometimes times out, so allow long transfers and retry.
fetch() { curl -fsSL --retry 4 --retry-delay 5 --connect-timeout 30 --max-time 180 -A "$UA" -o "$1" "$2"; }

get() { # name, url: a PDF, kept with its text
  fetch "$OUT/pdf/$1.pdf" "$2"
  pdftotext -layout "$OUT/pdf/$1.pdf" "$OUT/txt/$1.txt"
}
page() { # name, url: an HTML page
  fetch "$OUT/html/$1.html" "$2"
  if command -v pandoc >/dev/null; then pandoc -f html -t plain --wrap=none "$OUT/html/$1.html" -o "$OUT/txt/$1.txt"; fi
}

# --- JK-12 Curriculum Renewal: the main page (timeline by grade division, reporting, assessment).
page curriculum-renewal "$E/en/curriculumrenewal"
# --- Fact sheets and FAQs linked from it.
get implementation-plan_2022-10 "$F/resources/2022-10_-_fact_sheet_-_curriculum_renewal_implementation_plan_-_english.pdf" # Curriculum Renewal Implementation Plan fact sheet (October 2022)
get timeline_2025-05 "$F/2025-05_-_timeline_-_curriculum_renewal.pdf"                    # current implementation timeline (May 2025)
get timeline-fact-sheet "$E/en/content/fact-sheet-timeline-implement-bcs-curriculum"      # fact sheet: timeline to implement BC's curriculum
get faq-adopting-bc_2021-11 "$F/resources/2021-11_-_faq_-_nwt_to_adopt_bcs_jk-12_curriculum_-_english_-_final_0.pdf" # FAQ: NWT to adopt BC's JK-12 curriculum (also served at /en/content/faq-nwt-adopting-bcs-jk-12-school-curriculum, same file)
get report-cards-bulletin "$E/en/content/education-bulletin-jk-12-curriculum-renewal-report-cards" # education bulletin: report cards and the proficiency scale
get indigenous-perspectives "$E/en/content/fact-sheet-indigenous-perspectives-curriculum" # fact sheet: Indigenous perspectives in the curriculum
get bc-nwt-sharing-agreement "$F/resources/bc-nwt_education_sharing_agreement_1.pdf"     # BC-NWT education sharing agreement
# --- NWT curricula that stay alongside the adapted BC curriculum, and assessment.
page dene-kede-and-inuuqatigiit "$E/en/services/jk-12-school-curriculum/dene-kede-and-inuuqatigiit"
page student-assessment-tools "$E/en/services/jk-12-school-curriculum/student-assessment-tools"
page key-competencies "$E/en/services/jk-12-school-curriculum/key-competencies"

echo "Saved to $OUT"
