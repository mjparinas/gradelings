#!/usr/bin/env bash
# Downloads the Montana standards and related documents used by Gradelings into a folder.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
# The PDFs' plain-text extracts (.txt beside each) are made with `pdftotext -layout`. opi.mt.gov, opifiles.mt.gov, the
# OPI's CASE server (mt-satchel.commongoodlt.com) and archive.legmt.gov's committee files answer plain curl with a browser
# user agent. leg.mt.gov and the Montana Code Annotated pages answer scripts with a bot check, so the statutes are cited
# by section in README.md and not downloaded.
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
ua="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
get() {
  curl -fsSL --retry 3 -A "$ua" -o "$out/$1" "$2"
  sleep 1
}
case_pkg="https://mt-satchel.commongoodlt.com/ims/case/v1p0/CFPackages"
files="https://opifiles.mt.gov/Portals/182/Page%20Files/K-12%20Content%20Standards%20%26%20Revision"

# The machine-readable standards (IMS CASE packages) the outcomes are built from.
# Montana Mathematics Content Standards (2026): adopted January 2025, in schools from July 1, 2026 (ARM 10.53).
get case-math-2026.json "$case_pkg/75445e31-3965-40c2-9e6d-465c3324dc87"
# Montana Content Standards for English Language Arts and Literacy (2011), in schools until June 30, 2027.
get case-ela-2011.json "$case_pkg/c648c5d7-d7cb-11e8-824f-0242ac160002"
# Montana English Language Arts Content Standards (2027), adopted September 2025, in schools from July 1, 2027.
get case-ela-2027.json "$case_pkg/f0b3a994-ab3d-43a2-abd9-421484bbec86"
# Montana Science Content Standards (2016), adopted September 16, 2016.
get case-science-2016.json "$case_pkg/4b2018e0-d61b-11e9-a4e7-0242c0a82003"
# Montana Content Standards for Social Studies (2021), adopted November 5, 2020, in schools from July 1, 2021.
get case-social-2021.json "$case_pkg/392f064e-22d4-11eb-938e-0242c0a85003"

# The same standards as the OPI prints them.
get math-pk12-2026.pdf "$files/Math/PK-12%20Montana%20Math%20Standards_PUBLIC.pdf"
get math-practices-poster.pdf "$files/Math/2026%20Math%20Standards_Mathematical%20Practices%20Poster_Public.pdf"
get math-appendix-a.pdf "$files/Appendix%20A%20Corresponding%20Standards_2025.07.02.pdf"
get math-hs-pathways.pdf "$files/Math/Recommended%20Pathways%20for%20HS%20Math_Public_20250702.pdf"
for g in Kindergarten 1st 2nd 3rd 4th 5th 6th 7th 8th 9-10th; do
  get "ela-$g.pdf" "$files/ELA/MCS-ELA-$g.pdf"
done
get ela-2027.pdf "$files/ELA/Final%20-%20Montana%20K-12%20ELA%20Standards.pdf"
get science-2016.pdf "$files/Science/Montana-Science-Content-Standards-2016.pdf"
get social-2021.xlsx "$files/Social%20Studies/2021%20SS%20for%20Web.xlsx"
get social-2021.pdf "$files/Social%20Studies/SIPL_CSI_Standards%20Revision_Social%20Studies_Montana%20K-12%20Content%20Standards%20for%20Social%20Studies_2021.04.05.pdf"
# The OPI's table of standards revisions (July 2025): which standards are current and when the next ones take effect.
get revisions-2025.pdf "$files/Montana%20Content%20Standards%20Revisions%20-%20Updated%20July%202025.pdf"
# Indian Education for All: the Essential Understandings Regarding Montana Indians.
get essential-understandings.pdf "https://opifiles.mt.gov/Portals/182/Page%20Files/Indian%20Education/Indian%20Education%20101/essentialunderstandings.pdf"
# Statewide tests: the OPI's 2024-25 results overview to the Education Interim Committee (MAST levels, MSA science in
# Grades 5 and 8, ACT in Grade 11) and its talking points for the results.
get opi-assessment-overview-2026.pdf "https://archive.legmt.gov/content/Committees/Interim/2025-2026/EDIC/Nov-2026/OPI-assessment-overview.pdf"
get data-release-talking-points.pdf "https://opi.mt.gov/Portals/182/Page%20Files/Statewide%20Testing/Landing%20Page/Statewide%20Data%20Release%20Talking%20Points.pdf"

for f in "$out"/*.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt"; done
