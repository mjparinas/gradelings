#!/usr/bin/env bash
# Downloads the Nevada Academic Content Standards (NVACS) used by Gradelings from the Nevada Department of Education
# (doe.nv.gov, whose files are served from its Strapi upload store), the NDE assessment guides the parent guides cite,
# and the Nevada Revised Statutes chapters on student data privacy and 3rd grade reading from the Nevada Legislature,
# with a plain-text copy of each file.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
nde="https://webapp-strapi-paas-prod-nde-001.azurewebsites.net/uploads"
get() {
  curl -fsSL -A "Mozilla/5.0 (X11; Linux x86_64) Chrome/120" --retry 3 -o "$out/$1" "$2"
  sleep 1
}
# The four content standards, as linked from the subject pages under https://doe.nv.gov/offices/office-of-teaching-and-learning/.
get math.pdf "$nde/mathstandards_4308440da3.pdf"                          # Mathematics (adopted 2010, the Common Core)
get ela.pdf "$nde/K_12_ELA_Standards_ADA_Accessible_ee73596bc7.pdf"       # English language arts (2010, the Common Core; version 1.3)
get science.pdf "$nde/nvacss_dci_arrangements_226290ea15.pdf"             # Science (adopted 2014, the NGSS; DCI arrangements)
get social.pdf "$nde/NVAC_Sfor_Social_Studies_ea0a1df6ac.pdf"              # Social studies (revised September 2018)
# Assessments, from https://doe.nv.gov/offices/office-of-assessment-data-and-accountability-management-adam/office-of-assessments/.
get assessment-calendar.pdf "$nde/calendar_be727bc5ff.pdf"                                     # 2026-2027 assessment calendar
get sbac-report-guide.pdf "$nde/Summative_Report_Interp_Guide_English_NV_9583200973.pdf"       # Smarter Balanced score report guide
get science-report-guide.pdf "$nde/science_report_interpretive_guide_6ef3c7e7ef.pdf"           # Science score report guide
# Nevada Revised Statutes: chapter 388 (NRS 388.281 to 388.296, school service providers and pupil data) and chapter 392
# (NRS 392.760 to 392.785, reading intervention and, from July 1, 2028, 3rd grade retention).
get nrs-388.html "https://www.leg.state.nv.us/NRS/NRS-388.html"
get nrs-392.html "https://www.leg.state.nv.us/NRS/NRS-392.html"
(
  cd "$out"
  for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
  # The statutes are Windows-1252 HTML; the text copy keeps one paragraph per line.
  for f in nrs-*.html; do
    python3 -I -c '
import html, re, sys
t = open(sys.argv[1], "rb").read().decode("cp1252", errors="replace")
t = re.sub(r"<(script|style).*?</\1>", "", t, flags=re.S)
t = re.sub(r"</p>|<br\s*/?>", "\n", t, flags=re.I)
t = html.unescape(re.sub(r"<[^>]+>", "", t))
lines = [re.sub(r"[ \t\xa0]+", " ", line).strip() for line in t.split("\n")]
print("\n".join(line for line in lines if line))
' "$f" > "${f%.html}.txt"
  done
  sha256sum *.pdf *.html *.txt > SHA256SUMS
)
echo "Saved to $out"
