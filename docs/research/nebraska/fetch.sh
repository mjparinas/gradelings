#!/usr/bin/env bash
# Downloads Nebraska's College and Career Ready Standards used by Gradelings from the Nebraska Department of Education
# (education.ne.gov): mathematics (2022), English language arts (2021), science (updated December 2024) and social
# studies (2019, kept by the State Board in 2026), the Department's standards revision timeline and its page on the
# social studies revision, the 2025-26 statewide assessment plan and the NSCAS parent guide to reports, and the
# Nebraska statutes the guides and /privacy/ cite (the Student Online Personal Protection Act, 79-2,153 to 79-2,155,
# with LB 512 of 2017, and the Nebraska Reading Improvement Act, 79-2601 to 79-2607), with a plain-text copy of each.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
nde="https://www.education.ne.gov/wp-content/uploads"
leg="https://nebraskalegislature.gov/laws/statutes.php?statute="
get() {
  curl -fsSL -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36" --retry 3 -o "$out/$1" "$2"
  sleep 1
}
# The standards, as linked from https://www.education.ne.gov/contentareastandards/.
get math.pdf "$nde/2023/05/Nebraskas-College-and-Career-Ready-Standards-for-Mathematics-Final-062723.pdf"  # approved September 2, 2022
get ela.pdf "$nde/2022/08/ELA-Standards-2021-8-25-22.pdf"                                                   # approved September 2, 2021
get science.pdf "$nde/2025/09/Nebraska-Science-Standards_12-17-24-Update-003.pdf"                           # 2017 standards, December 2024 update
get social.pdf "$nde/2019/11/Nebraska-Social-Studies-Standards-Final-11-2019.pdf"                           # approved November 8, 2019
get timeline.pdf "$nde/2026/04/Standards-Revision-Timeline.pdf"
get social-revision.html "https://www.education.ne.gov/socialstudies/social-studies-standards-revision-2/"
# Statewide tests: the Department's 2025-26 assessment plan (filed with the Legislature) and NWEA's parent guide to NSCAS reports.
get assessment-plan-2025.pdf "https://www.nebraskalegislature.gov/FloorDocs/109/PDF/Agencies/Education__Department_of/167_20251205-112832.pdf"
get nscas-parent-guide.pdf "https://www.nwea.org/uploads/NSCASReportsIntParentGuideEnglish_NWEA_Guide.pdf"
# Nebraska Revised Statutes.
get lb512.pdf "https://www.nebraskalegislature.gov/FloorDocs/105/PDF/Slip/LB512.pdf"
for s in 79-2,153 79-2,154 79-2,155 79-2601 79-2602 79-2603 79-2604 79-2605 79-2606 79-2607; do
  get "statute-${s/,/}.html" "$leg$s"
done
(
  cd "$out"
  for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
  # The statute and revision pages are HTML; the text copy keeps the page's main text.
  for f in *.html; do
    python3 -I -c '
import html, re, sys
t = open(sys.argv[1], encoding="utf-8", errors="replace").read()
t = re.sub(r"(?s)<(script|style).*?</\1>", "", t)
m = re.search(r"(?s)<div class=\"statute\">.*?</div>\s*</div>", t) or re.search(r"(?s)<main.*?</main>", t)
t = m.group(0) if m else t
t = re.sub(r"</p>|<br\s*/?>|</h[1-6]>|</li>", "\n", t, flags=re.I)
t = html.unescape(re.sub(r"<[^>]+>", "", t))
lines = [re.sub(r"[ \t\xa0]+", " ", line).strip() for line in t.split("\n")]
print("\n".join(line for line in lines if line))
' "$f" > "${f%.html}.txt"
  done
  sha256sum *.pdf *.html *.txt > SHA256SUMS
)
