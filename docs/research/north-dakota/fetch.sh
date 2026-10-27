#!/usr/bin/env bash
# Downloads the North Dakota standards and related documents used by Gradelings into a folder.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
# The PDFs' plain-text extracts (.txt beside each) are made with `pdftotext -layout`. www.nd.gov, the Department of
# Public Instruction's CASE server (case.nd.gov) and the Century Code pages on www.legis.nd.gov answer plain curl with a
# browser user agent.
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
ua="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
get() {
  curl -fsSL --retry 3 -A "$ua" -o "$out/$1" "$2"
  sleep 1
}
case_pkg="https://case.nd.gov/ims/case/v1p0/CFPackages"
docs="https://www.nd.gov/dpi/sites/www/files/documents"

# The machine-readable standards (IMS CASE packages) the outcomes are built from. The list of every package is at
# https://case.nd.gov/ims/case/v1p0/CFDocuments?limit=1000.
# North Dakota Mathematics Content Standards (2023).
get case-math-2023.json "$case_pkg/35e500e6-1f49-11ee-8722-0242ac1f0003"
# North Dakota English Language Arts and Literacy Content Standards (2023).
get case-ela-2023.json "$case_pkg/6cb49550-0f81-11ee-bc59-0242ac160002"
# North Dakota Science Content Standards (2019).
get case-science-2019.json "$case_pkg/dad9ab80-cc25-11ea-9c1f-0242c0a84003"
# North Dakota Social Studies Content Standards (2019).
get case-social-2019.json "$case_pkg/e3cc2a48-bfc2-11ea-8eed-0242c0a84003"

# The same standards as the Department prints them, and its crosswalks from the 2017 math and ELA standards.
get math-2023.pdf "$docs/Academic%20Support/REV2.2024.06.27%20Math%20Content%20Standards%20Final.pdf"
get math-crosswalk-2017-2023.pdf "$docs/Academic%20Support/2017%20and%202023%20Mathematics%20Standards%20Crosswalk%207.27.23.pdf"
get ela-2023.pdf "$docs/Academic%20Support/ELA%20Content%20Standards%202023%20FINAL10.21.24.pdf"
get ela-crosswalk-2017-2023.pdf "$docs/Academic%20Support/Crosswalk%20between%20the%202017%20and%202023%20ELA%20Standards.pdf"
get science-2019.pdf "$docs/Academic%20Support/FINAL%20ND%20Science%20Content%20Standards_rev2.12.10.19.pdf"
get social-2019.pdf "$docs/Academic%20Support/Rev7_2023.11.30_Social_Studies_Content%20Standards.pdf"
# The first draft of the next social studies standards (April 24, 2026), kept to watch for changes; not used yet.
get social-draft-2026-04-24.pdf "https://www.nd.gov/dpi/sites/default/files/documents/Academic%20Support/ND%20Social%20Studies%20Standards%20Standards-Draft%201%204.24.26.pdf"
# The North Dakota Native American Essential Understandings.
get essential-understandings.pdf "$docs/Indian%20Education/NDEssentialUnderstandingslg.pdf"
# How to read the CASE server's standards.
get case-directions.pdf "$docs/Academic%20Support/CASE%20Directions.pdf"

# North Dakota Century Code: chapter 15.1-21 (curriculum and testing: North Dakota studies in grades 4 and 8, the civics
# test) and chapter 15.1-07 (school districts: the student data policy in 15.1-07-25.3).
get ndcc-15.1-21.pdf "https://www.legis.nd.gov/cencode/t15-1c21.pdf"
get ndcc-15.1-07.pdf "https://www.legis.nd.gov/cencode/t15-1c07.pdf"

for f in "$out"/*.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt"; done
