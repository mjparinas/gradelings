#!/usr/bin/env bash
# Downloads the New Jersey Student Learning Standards used by Gradelings from the New Jersey Department of Education
# (nj.gov/education/standards, which allows scripted downloads) and makes the text extracts build_outcomes.py reads:
# pandoc for the Word documents, pdftotext -layout for the PDFs.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
base="https://www.nj.gov/education/standards"
get() {
  curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$out/$(basename "$1")" "$base/$1"
  sleep 1
}
# Mathematics (adopted 2023, in schools from 2024-25) and the 2016-to-2023 crosswalk.
get math/Docs/2023_NJSLS_Mathematics.docx
get math/Docs/NJSLS_Mathematics_Crosswalk_2016_to_2023.docx
# English language arts (adopted 2023, in schools from 2024-25) and the 2016-to-2023 crosswalk.
get ela/Docs/2023_NJSLS_ELA.docx
get ela/Docs/NJSLS_ELA_Crosswalk_2016_to_2023.docx
# Science (readopted June 3, 2026), and the earlier K-12 edition for comparison.
get science/Docs/2026_NJSLS_Science.docx
get science/Docs/NJSLS-Science_K-12.pdf
# Social studies (2020), by grade band and by standard, and the diversity and inclusion law (P.L. 2021, c.32).
get socst/docs/2020NJSLS-SS_by_GradeBand.pdf
get socst/docs/2020NJSLS-SS_by_Standard.pdf
get socst/docs/DiversityInclusionLaw.PDF
# Career Readiness, Life Literacies, and Key Skills (2020), and its personal financial literacy standard (9.1).
get clicks/Docs/2020NJSLS-CLKS.pdf
get clicks/Docs/2020NJSLS-9.1FinancialLiteracy.pdf
# The student online privacy law, P.L. 2019, c.494 (N.J.S.A. 56:8-215 to 56:8-221), as text.
curl -fsSL --retry 3 -A "Mozilla/5.0" https://pub.njleg.gov/bills/2018/PL19/494_.HTM |
  python3 -I -c 'import sys,re,html; t=sys.stdin.buffer.read().decode("latin-1"); t=re.sub(r"<[^>]+>"," ",t); t=html.unescape(t); t=re.sub(r"[ \t\r]+"," ",t); print(re.sub(r"\n\s*\n+","\n",t))' > "$out/PL2019-c494.txt"
cd "$out"
for f in *.docx; do pandoc -t plain --wrap=none "$f" -o "${f%.docx}.txt" 2>/dev/null; done
for f in *.pdf *.PDF; do pdftotext -layout "$f" "${f%.*}.txt"; done
sha256sum ./*.docx ./*.pdf ./*.PDF > SHA256SUMS
