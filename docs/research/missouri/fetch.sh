#!/usr/bin/env bash
# Downloads the Missouri Learning Standards documents this framework was built from (Missouri Department of
# Elementary and Secondary Education, dese.mo.gov) into source/ (or the folder given), with a text extract of each PDF.
# Each dese.mo.gov/media/pdf/<name> address is a viewer page; the PDF itself is the address in its src="…".
# Plain curl with a browser user agent works (checked 2026-10-24).
set -euo pipefail
cd "$(dirname "$0")"
OUT="${1:-source}"
mkdir -p "$OUT"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"

NAMES=(
  # The standards as the State Board adopted them (2016), one grid per subject.
  curr-mls-standards-math-k-5-sboe-2016 curr-mls-standards-math-6-12-sboe-2016
  curr-mls-standards-ela-k-5-sboe-2016 curr-mls-standards-ela-6-12-sboe-2016
  curr-mls-standards-sci-k-5-sboe-2016 curr-mls-standards-sci-6-12-sboe-2016
  curr-mls-standards-ss-k-5-sboe-2016 curr-mls-standards-ss-6-12-sboe-2016
  curr-mls-personal-finance-cle-sboe curr-mls-coding-sheet
  # Mathematics: the expanded expectations print each expectation with its code.
  "curr-math-mls%20expanded-expectaions-kindergarten"
  "curr-math-mls%20expanded-expectaions-grade-1" "curr-math-mls%20expanded-expectaions-grade-2"
  "curr-math-mls%20expanded-expectaions-grade-3" "curr-math-mls%20expanded-expectaions-grade-4"
  "curr-math-mls%20expanded-expectaions-grade-5" "curr-math-mls%20expanded-expectaions-grade-6"
  "curr-math-mls%20expanded-expectaions-grade-7" "curr-math-mls%20expanded-expectaions-grade-8"
  "curr-math-mls%20expanded-expectaions-algebra-1" "curr-math-mls%20expanded-expectaions-geometry"
  # English language arts: the standards with examples print each expectation with its code.
  curr-mls-ela-k-5-standards-with-examples curr-mls-ela-6-standards-with-examples
  curr-mls-ela-7-standards-with-examples curr-mls-ela-8-standards-with-examples
  curr-mls-ela-9-10-standards-with-examples
  # Crosswalks from the 2010 standards (the Common Core) to the 2016 expectations: each 2016 code with its text.
  cur-mls-crosswalk-ma-grk cur-mls-crosswalk-ma-gr1 cur-mls-crosswalk-ma-gr2 cur-mls-crosswalk-ma-gr3
  cur-mls-crosswalk-ma-gr4 cur-mls-crosswalk-ma-gr5 cur-mls-crosswalk-ma-gr6 cur-mls-crosswalk-ma-gr7
  cur-mls-crosswalk-ma-gr8 cur-mls-crosswalk-ma-alg1 cur-mls-crosswalk-ma-geo
  cur-mls-crosswalk-ss-k-5 cur-mls-crosswalk-ss-ms-am-hist cur-mls-crosswalk-ss-ms-world-hist
  cur-mls-crosswalk-ss-ms-world-geog cur-mls-crosswalk-ss-govt
)
# Social studies: the teacher views print each expectation with its code (these are /media/file/ pages).
FILES=(
  curr-mls-standards-teacher-view-ss-k-5-2016 curr-mls-standards-teacher-view-ss-msah-k-5-042516
  curr-mls-standards-teacher-view-ss-msgeo-k-5-04.25.16 curr-mls-standards-teacher-view-ss-mswh-k-5-04.25.16
  curr-mls-standards-teacher-view-ss-hsgov-k-5-04.25.16 curr-mls-standards-teacher-view-ss-hsah-k-5-04.25.16
  curr-mls-standards-teacher-view-ss-hswh-k-5-04.25.16
  k-5-ela-mls-crosswalk 6-12-ela-mls-crosswalk
)

fetch() { # $1 = viewer page URL, $2 = local name
  local page src
  page="$(curl -sSL -A "$UA" "$1")"
  src="$(grep -oE '(src|href)="(https://dese\.mo\.gov)?/sites/g/files/[a-z0-9]+/files/media/(pdf|file)/[^"]+\.(pdf|docx|xlsx)"' <<<"$page" | head -1 | sed -E 's/^(src|href)="//; s/"$//' || true)"
  case "$src" in /*) src="https://dese.mo.gov$src" ;; esac
  if [ -z "$src" ]; then
    # Some /media/file/ pages answer with the file itself.
    curl -sSL -A "$UA" -o "$OUT/$2.pdf" "$1"
  else
    curl -sSL -A "$UA" -o "$OUT/$2.${src##*.}" "$src"
  fi
}

for n in "${NAMES[@]}"; do fetch "https://dese.mo.gov/media/pdf/$n" "${n//%20/-}"; done
for n in "${FILES[@]}"; do fetch "https://dese.mo.gov/media/file/$n" "$n"; done

# Missouri statutes the parent guides and privacy page rely on (Revisor of Statutes): constitution and civics
# courses (170.011, 170.345), reading success plans (167.268, 167.645), the student data rule (161.096) and breach
# notice (407.1500).
for s in 170.011 170.345 167.268 167.645 161.096 407.1500; do
  curl -sSL -A "$UA" -o "$OUT/rsmo-$s.html" "https://revisor.mo.gov/main/OneSection.aspx?section=$s"
  python3 -I -c 'import html, re, sys
t = open(sys.argv[1], errors="ignore").read()
t = re.sub(r"<script.*?</script>|<style.*?</style>", "", t, flags=re.S)
t = html.unescape(re.sub(r"<[^>]+>", " ", t))
t = re.sub(r"\n\s*\n+", "\n", re.sub(r"[ \t]+", " ", t))
open(sys.argv[2], "w").write(t.strip() + "\n")' "$OUT/rsmo-$s.html" "$OUT/rsmo-$s.txt"
done

for f in "$OUT"/*.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt"; done
# Word files: a plain text extract, one paragraph or table cell per line.
for f in "$OUT"/*.docx; do python3 -I "$(pwd)/docx_text.py" "$f" > "${f%.docx}.txt"; done
(cd "$OUT" && sha256sum -- *.pdf *.docx *.xlsx *.html 2>/dev/null > SHA256SUMS || true)
