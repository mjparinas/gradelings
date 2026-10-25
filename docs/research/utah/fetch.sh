#!/usr/bin/env bash
# Downloads the Utah Core Standards used by build_outcomes.py, with a plain-text copy of each PDF (pdftotext -layout),
# from the Utah State Board of Education (schools.utah.gov), which allows scripted downloads.
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="${1:-$here/source}"
mkdir -p "$out"
base=https://www.schools.utah.gov/curr

get() { curl -sSfL --retry 3 -A "Mozilla/5.0 (X11; Linux x86_64) Chrome/120 Safari/537.36" -o "$out/$1" "$2"; echo "ok   $1"; }

# Mathematics: the Utah Core Standards for Mathematics, Kindergarten to Grade 5, Grades 6 to 8 and high school
# (Secondary Mathematics I to III).
get math-elementary.pdf "$base/mathematics/_mathematics_/_core/_utah_core_standards_tab_/CoreStandardsElementaryLevels.pdf"
get math-middle.pdf "$base/mathematics/_mathematics_/_core/_utah_core_standards_tab_/CoreStandardsMiddleSchool.pdf"
get math-high.pdf "$base/mathematics/_mathematics_/_core/_utah_core_standards_tab_/CoreStandardsHighSchool.pdf"
# English language arts: the Utah State Standards for P-12 English Language Arts (May 2023).
get ela.pdf "$base/englishlanguagearts/_elaresources_/-English%20Language%20Arts%20Standards.pdf"
# Science: the Utah Science with Engineering Education (SEEd) Standards, Kindergarten to Grade 12 (June 2023 edition).
get science-seed.pdf "$base/science/_science_/UtahSEEdStandards.pdf"
# Social studies: Kindergarten to Grade 6 (adopted December 2022) and Grades 7 to 12 (Utah Studies, United States
# History I and II, World Geography, World History, and United States Government and Citizenship).
get social-elementary.pdf "$base/socialstudies/utah_core_standards/UtahCoreStandardsElementarySocialStudies.pdf"
get social-7-12.pdf "$base/socialstudies/utah_core_standards/UtahCoreStandardsforSocialStudiesGrades712.pdf"
# RISE, Utah's statewide tests: the family guide and the guide to score reports (June 2026), for the state-tests guide.
assess=https://www.schools.utah.gov/assessment/_assessment_/_parent_resources_
get 26RISEFamilyGuide.pdf "$assess/26RISEFamilyGuide.pdf"
get 25MakingSenseofRISEScores.pdf "$assess/25MakingSenseofRISEScores.pdf"

(cd "$out" && for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt"; done && sha256sum *.pdf *.txt > SHA256SUMS)
echo "Saved to $out. Rebuild with: python3 -I build_outcomes.py \"$out\""
