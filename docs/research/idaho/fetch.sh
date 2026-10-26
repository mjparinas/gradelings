#!/usr/bin/env bash
# Downloads the Idaho Content Standards used by Gradelings from the Idaho Department of Education (sde.idaho.gov):
# mathematics (2022) and its 9-12 course planning guide, English language arts/literacy (2022), science (2022) and
# social studies (2024, revised November 2025), the Department's notes on the 2022 revisions, two essential standards
# guides that show how the codes are written, the Department's pages and family guides on the ISAT and the Idaho
# Reading Indicator the parent guides cite, and Idaho Code 33-133 (student data) from the Idaho Legislature, with a
# plain-text copy of each file.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
up="https://www.sde.idaho.gov/wp-content/uploads"
get() {
  curl -fsSL -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36" --retry 3 -o "$out/$1" "$2"
  sleep 1
}
# The standards, as linked from https://www.sde.idaho.gov/about-us/departments/content-and-curriculum/idaho-content-standards/
get math.pdf "$up/2025/09/Idaho-K-12-State-Standards-for-Mathematics.pdf"
get math-9-12.pdf "$up/2025/09/9-12-Math-Standards-by-Grade.pdf"            # 9-12 course planning guide (2024)
get ela.pdf "$up/2025/09/Idaho-K-12-State-Standards-for-ELA-Literacy.pdf"
get science.pdf "$up/2025/09/Idaho-K-12-State-Standards-for-Science.pdf"
get social.pdf "$up/2026/05/K-12-Social-Studies-Standards.pdf"
get math-highlights.pdf "$up/2025/09/Math-Revised-Standards-Highlights-04-2022.pdf"
get ela-highlights.pdf "$up/2025/09/ELA-Revised-Standards-Highlights-04-2022.pdf"
get science-highlights.pdf "$up/2025/09/Science-Revised-Standards-Highlights-04-2022.pdf"
# Essential standards guides: the Department writes codes as 4.RC.L.5a, 4-PS-1.2 and 4.SS.1.3, and 9-10 for Grades 9/10.
get essential-standards-g4.pdf "$up/2025/08/Fourth-Grade-Essential-Standards-Quick-Guide.pdf"
get essential-standards-ela-9-10.pdf "$up/2025/08/Essential-Standards-Quick-Guide-ELA-9-10.pdf"
# State tests: the ISAT (grades 3-8 and 11; science in 5, 8 and 11) and the Idaho Reading Indicator (K-3).
aa="https://www.sde.idaho.gov/about-us/departments/assessment-accountability"
get isat.html "$aa/idaho-standards-achievement-test-isat/"
get iri.html "$aa/idaho-reading-indicator/"
get isat-parent-ela-math.pdf "$up/2025/10/ISR-Parent-ISAT-ELA-Math-2025-ENG.pdf"
get isat-parent-science.pdf "$up/2025/10/ISR-Parent-ISAT-Science-2025-ENG.pdf"
# Idaho Code 33-133: student data, use and limitations (the Student Data Accessibility, Transparency and
# Accountability Act).
get code-33-133.html "https://legislature.idaho.gov/statutesrules/idstat/Title33/T33CH1/SECT33-133/"
(
  cd "$out"
  for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
  # The pages are HTML; the text copy keeps the page's main text.
  for f in *.html; do
    python3 -I -c '
import html, re, sys
t = open(sys.argv[1], encoding="utf-8", errors="replace").read()
t = re.sub(r"(?s)<(script|style|nav|header|footer).*?</\1>", "", t)
m = re.search(r"(?s)<main.*?</main>", t)
t = m.group(0) if m else t
t = re.sub(r"</p>|<br\s*/?>|</h[1-6]>|</li>|</div>", "\n", t, flags=re.I)
t = html.unescape(re.sub(r"<[^>]+>", "", t))
lines = [re.sub(r"[ \t\xa0]+", " ", line).strip() for line in t.split("\n")]
print("\n".join(line for line in lines if line))
' "$f" > "${f%.html}.txt"
  done
  sha256sum *.pdf *.html *.txt > SHA256SUMS
)
