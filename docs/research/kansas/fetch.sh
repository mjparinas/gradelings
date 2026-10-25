#!/usr/bin/env bash
# Downloads the Kansas standards used by Gradelings from the Kansas State Department of Education (ksde.gov): the
# Kansas Mathematics Standards (adopted 2017, reviewed 2024), the Kansas Standards for English Language Arts (2023,
# updated February 2025), the Kansas science standards (the Next Generation Science Standards, adopted 2013; topic
# arrangement) and the Kansas History, Government, and Social Studies Standards (2020, with appendices); the Kansas
# Assessment Program (KAP) overview and parent guide to reports; and the Kansas Student Data Privacy Act (K.S.A. 72-6312
# to 72-6320) from the Kansas Legislature, with a plain-text copy of each file.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
ksde="https://www.ksde.gov/docs/default-source/csas"
get() {
  curl -fsSL -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/130 Safari/537.36" --retry 3 -o "$out/$1" "$2"
  sleep 1
}
# The standards, as linked from https://www.ksde.gov/student-success/standards (Resources by Subject Area).
get math.pdf "$ksde/kansasmathematicsstandardsgradesk-12-2025.pdf?Status=Master&sfvrsn=ab73a196_6"
get ela.pdf "$ksde/ela-standards-horizontal-document.pdf?sfvrsn=8ae00a73_11"
get science.pdf "$ksde/topic-arrangement-of-ngss.pdf?Status=Master&sfvrsn=5083bccd_4"
get social.pdf "$ksde/hgss-standards-benchmarks-and-appendices.pdf?sfvrsn=2405e235_2"
# Assessments: https://www.ksde.gov/student-success/assessments/kansas-assessment-program and https://ksassessments.org/families.
get assessments.pdf "$ksde/2026-27-kansas-assessments-overview.pdf?Status=Master&sfvrsn=ea1f1ca0_2"
get kap-parent-guide.pdf "https://ksassessments.org/sites/default/files/documents/families/KAP_Parent_Guide_to_Reports.pdf"
# Kansas Student Data Privacy Act, K.S.A. 72-6312 to 72-6320.
for n in 12 13 14 15 16 17 18 19 20; do
  get "ksa-72-63$n.html" "https://www.kslegislature.gov/b2025_26/laws/072_000_0000_chapter/072_063_0000_article/072_063_00${n}_section/072_063_00${n}_k/"
done
(
  cd "$out"
  for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
  # The text copy of a statute keeps only the section itself.
  for f in ksa-*.html; do
    python3 -I -c '
import html, re, sys
t = open(sys.argv[1], encoding="utf-8", errors="replace").read()
t = re.sub(r"<(script|style).*?</\1>", "", t, flags=re.S)
t = html.unescape(re.sub(r"<[^>]+>", " ", t))
t = re.sub(r"\s+", " ", t)
m = re.search(r"72-63\d\d\. .*?History: .*?(?= Prev Article|$)", t)
print(m.group(0) if m else t)
' "$f" > "${f%.html}.txt"
  done
  sha256sum *.pdf *.html *.txt > SHA256SUMS
)
echo "Saved to $out"
