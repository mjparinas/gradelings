#!/usr/bin/env bash
# Downloads the North Carolina Standard Course of Study documents used by Gradelings into a folder. NCDPI publishes
# each standards document as a public Google Doc linked from its "Standard Course of Study & Supporting Resources"
# pages (dpi.nc.gov/districts-schools/classroom-resources/office-teaching-and-learning/standard-course-study/<subject>/
# standard-course-study-supporting-resources). Each document is saved twice: as a PDF (the published layout) and as
# plain text, which build_outcomes.py reads.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
get() {
  for fmt in txt pdf; do
    curl -fsSL --retry 3 --max-time 300 -A "Mozilla/5.0" -o "$out/$1.$fmt" "https://docs.google.com/document/d/$2/export?format=$fmt"
    sleep 1
  done
}
# K-12 Mathematics Standard Course of Study (adopted 2023, in schools from 2024-25).
get math 1ZCt83aTtuev58rHlZkakK989vziGI3eLk2xNXi8u_4o
# 2026 English Language Arts Standard Course of Study.
get ela-2026 19-aiblQPGXNt4ZDzucJ9Ajseh29TDG8xIfqQoJRKAng
# 2017 English Language Arts Standard Course of Study (in schools until the 2026 standards take over).
get ela-2017 1Kk3iJDWkjS8noQVUfDiN8IjH8dpPfscc2h40_emDieg
# 2023 K-12 Science Standards.
get science 1zdEt2pw3-au5PYoM2svrNfx7ibsxrJpAUwxUpRoK-fA
# Social Studies Standards (adopted 2021), one document per grade, plus the two high school courses Grade 9 uses.
get social-k 1JLvf2jiT07OBWCb4rOKCK-YRUS66FWqTyD_J71kV0lk
get social-1 1NIPRgOAywgOSoBThlZXhOyGAI-e66Xx49YUmDrLOy8k
get social-2 1LL0DBlj7Dws8gntoYdrhuQULweEcVrAdNpZWHnQ5pIc
get social-3 1czRPx2zsIoXZkGPfyWOkKPzOPSzm0JDt_XP4pn_SDmw
get social-4 1MOh9iSc-PaTY5Sq9p5qkJ-jNsba-LBa_bkpVNHJCwjs
get social-5 1FT109PrHIgA9erGpL1YPNoY4ZZTDfWYUTJ1R4auJPis
get social-6 1SZ-y8aq5uO1PkLl19AmRHSkRmaJJjAn3naOTWSQCo4Y
get social-7 1j1obTvTxvPV6TI9WcWSNZN7j_Oy3ce45xAtqr2CjHe0
get social-8 1vFQYnicddNAgxi1mm2IHnbIP36-DcMgfo-oy3jBJkGE
get social-civic-literacy 1ceI2tvuJ1By-KFf0N1ENKHOSxtrFxZSLwLnSO1if3yg
get social-economics-personal-finance 1kyJEzK65V2vlaJyoOBWAYLzTUUSOk16f7Z955thcKy0
# The student data privacy statute for operators (G.S. 115C-401.2), for /privacy/ and docs/school/.
mkdir -p "$out/law"
curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$out/law/GS_115C-401.2.html" "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_115C/GS_115C-401.2.html"
python3 -I -c 'import html,re,sys; t=open(sys.argv[1],encoding="utf-8").read(); t=re.sub(r"(?s)<(script|style).*?</\1>","",t); print(re.sub(r"\s+"," ",html.unescape(re.sub(r"<[^>]+>"," ",t))).strip())' "$out/law/GS_115C-401.2.html" > "$out/law/GS_115C-401.2.txt"
(cd "$out" && sha256sum *.txt *.pdf > SHA256SUMS)
echo "Saved to $out"
