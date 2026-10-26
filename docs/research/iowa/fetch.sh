#!/usr/bin/env bash
# Downloads the Iowa Academic Standards used by Gradelings from the Iowa Department of Education (educate.iowa.gov):
# mathematics (April 2024), English language arts and literacy (June 2024), science (May 2025) and social studies
# (January 2026), each subject's spreadsheet where the Department publishes one, the Department's notices about the
# state summative assessment the parent guides cite, and the Iowa Code sections on early reading (279.68) and student
# online privacy (279.71) from the Iowa Legislature, with a plain-text copy of each file.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
ed="https://educate.iowa.gov"
get() {
  curl -fsSL -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36" --retry 3 -o "$out/$1" "$2"
  sleep 1
}
# The standards, as linked from the subject pages under https://educate.iowa.gov/pk-12/standards/academics.
get math.pdf "$ed/media/9845/download?inline"                 # Mathematics (adopted April 29, 2024)
get math-pathways.pdf "$ed/media/12216/download?inline"       # Model high school course pathways (SCED codes)
get ela.pdf "$ed/media/8158/download?inline"                  # English language arts and literacy (adopted June 20, 2024)
get science.pdf "$ed/media/8211/download?inline"              # Science (adopted May 8, 2025)
get science.xlsx "$ed/media/12050/download?inline"            # Science, as a spreadsheet (one sheet per grade)
get science-changes.pdf "$ed/media/12178/download?inline"     # Changes and highlights to the 2025 science standards
get science-pathways.pdf "$ed/media/12179/download?inline"    # Model course pathways for science
get social.pdf "$ed/media/5527/download?inline"               # Social studies (adopted January 15, 2026)
get social.xlsx "$ed/media/13062/download?inline"             # Social studies, as a spreadsheet (one sheet per grade)
# The state summative assessment: the Department's notices on the new test and its four proposed achievement levels.
get assessment-levels-2026-04.html "$ed/headline-story/2026-04-29/department-seeks-public-input-proposed-new-statewide-student-assessment-achievement-levels"
get assessment-levels-2026-09.html "$ed/headline-story/2026-09-03/public-comment-community-engagement-sessions-announced-seeking-feedback-new-proposed-achievement"
# Iowa Code (2026): 279.68 (early reading, intensive instruction and retention on a parent's request) and 279.71
# (student online personal information protection).
get code-279.68.pdf "https://www.legis.iowa.gov/docs/code/279.68.pdf"
get code-279.71.pdf "https://www.legis.iowa.gov/docs/code/279.71.pdf"
(
  cd "$out"
  for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
  # The notices are HTML; the text copy keeps the page's main text.
  for f in *.html; do
    python3 -I -c '
import html, re, sys
t = open(sys.argv[1], encoding="utf-8", errors="replace").read()
t = re.sub(r"(?s)<(script|style).*?</\1>", "", t)
m = re.search(r"(?s)<main.*?</main>", t)
t = m.group(0) if m else t
t = re.sub(r"</p>|<br\s*/?>|</h[1-6]>|</li>", "\n", t, flags=re.I)
t = html.unescape(re.sub(r"<[^>]+>", "", t))
lines = [re.sub(r"[ \t\xa0]+", " ", line).strip() for line in t.split("\n")]
print("\n".join(line for line in lines if line))
' "$f" > "${f%.html}.txt"
  done
  sha256sum *.pdf *.xlsx *.html *.txt > SHA256SUMS
)
echo "Saved to $out"
