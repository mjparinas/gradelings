#!/usr/bin/env bash
# Downloads Rhode Island's content standards and related documents used by build_outcomes.py and the parent guides:
# the Rhode Island Social Studies Standards (2023), the Common Core State Standards for mathematics and English language
# arts (Rhode Island's Core Standards, adopted 2010), the Next Generation Science Standards (adopted 2013), the minutes of
# the Council on Elementary and Secondary Education meeting that took up the social studies standards, RIDE's family
# guides to RICAS and the NGSA, and R.I. Gen. Laws § 16-104-1 (student data and cloud computing). Writes a plain-text
# copy of each PDF (pdftotext -layout) and SHA256SUMS.
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
#
# ride.ri.gov puts its pages and its /media/ downloads behind a browser check, but the files under /sites/g/files/ answer
# plain curl, so only those are fetched. Older RIDE links under /Portals/ redirect there.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$(mkdir -p "${1:-$here/source}" && cd "${1:-$here/source}" && pwd)"
get() {
  curl -fsSL --retry 3 -o "$out/$1" "$2"
  sleep 1
}
ride="https://ride.ri.gov/sites/g/files/xkgbur806/files"
# Social studies: the Rhode Island Social Studies Standards, Kindergarten through High School (anchor and content
# standards), posted by RIDE in March 2023 after the Council's February 21, 2023 meeting.
get social.pdf "$ride/2023-03/RhodeIsland_SocialStudiesStandards_FULL.pdf"
get council-minutes-2023-02-21.pdf "$ride/2023-05/Minutes_0221_Meeting.pdf"
# Mathematics and English language arts: Rhode Island's Core Standards are the Common Core State Standards as published.
get math.pdf "https://corestandards.org/wp-content/uploads/2023/09/Math_Standards1.pdf"
get ela.pdf "https://corestandards.org/wp-content/uploads/2023/09/ELA_Standards1.pdf"
# Science: the Next Generation Science Standards (adopted by the Board of Education in 2013), arranged by core idea.
# nextgenscience.org refuses curl with a browser user agent, so plain curl is used.
get science.pdf "https://www.nextgenscience.org/sites/default/files/AllDCI.pdf"
# State tests: RIDE's family guides to RICAS (English language arts and math, grades 3-8) and the NGSA (science, grades 5, 8, 11).
get ricas-family-guide-2021.pdf "$ride/Portals/0/Uploads/Documents/Instruction-and-Assessment-World-Class-Standards/Assessment/Results/RICAS/RICAS-For-Families-2021-Guide.pdf"
get ngsa-family-guide-2022.pdf "$ride/Portals/0/Uploads/Documents/Instruction-and-Assessment-World-Class-Standards/Assessment/Results/NGSA-For-Families-2022-Guide.pdf"
# Student data privacy: R.I. Gen. Laws § 16-104-1, Student Data-Cloud Computing.
get statute-16-104-1.htm "https://webserver.rilegislature.gov/Statutes/TITLE16/16-104/16-104-1.htm"
# Civics education: R.I. Gen. Laws § 16-22-2 (civics proficiency and a student-led civics project in middle or high school).
get statute-16-22-2.htm "https://webserver.rilegislature.gov/Statutes/TITLE16/16-22/16-22-2.htm"

cd "$out"
for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
sha256sum *.pdf *.txt *.htm > SHA256SUMS
echo "Saved to $out"
