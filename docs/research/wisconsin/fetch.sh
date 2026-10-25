#!/usr/bin/env bash
# Downloads the Wisconsin standards used by Gradelings into a folder, from the Wisconsin Department of Public
# Instruction's own standards server (wisestandards.dpi.wi.gov, "Standards Satchel", an IMS CASE 1.0 API). DPI's
# subject pages (dpi.wi.gov/math/standards and so on) link to it as the official copy of each standards document with
# its codes. Each JSON file is one CFPackage: the document, every coded item and the links between them. The 2018 social
# studies standards are also saved as DPI's PDF.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
api="https://wisestandards.dpi.wi.gov/ims/case/v1p0/CFPackages"
get() {
  curl -fsSL --retry 3 --max-time 600 -A "Mozilla/5.0" -o "$out/$1.json" "$api/$2"
  sleep 1
}
# Wisconsin Standards for Mathematics (adopted 2021).
get math 6bab37e8-30b5-4079-8cc5-4d0be1dce66e
# Wisconsin Standards for English Language Arts (adopted 2020).
get ela 1adaac54-1b08-4e9c-ac44-57a55707827d
# Wisconsin Standards for Science (adopted 2017).
get science 093f9f92-c3bf-4336-808a-6104d031ec74
# Wisconsin Standards for Social Studies (adopted 2018).
get social 3455e53c-c691-4ddc-8528-cb82b3f3c987
# Wisconsin Standards for Personal Financial Literacy (adopted 2020).
get pfl e2c0891b-5413-4e1f-977e-57bcf50cdfa9
# The published English language arts document (Word, updated September 2025): the server leaves out a few standards.
curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$out/ela-2020.docx" "https://dpi.wi.gov/media/54346/download?inline"
(cd "$out" && python3 -I -c "
import html, re, zipfile
x = zipfile.ZipFile('ela-2020.docx').read('word/document.xml').decode()
lines = [html.unescape(''.join(re.findall(r'<w:t[^>]*>([^<]*)</w:t>', p))) for p in re.findall(r'<w:p[ >].*?</w:p>', x, flags=re.S)]
open('ela-2020.txt', 'w').write('\\n'.join(l for l in lines if l.strip()) + '\\n')
")
curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$out/social-2018.pdf" \
  "https://dpi.wi.gov/sites/default/files/imce/standards/New%20pdfs/2018_WI_Social_Studies_Standards.pdf"
(cd "$out" && pdftotext -layout social-2018.pdf social-2018.txt)
(cd "$out" && for f in *.json; do python3 -I -c "import json,sys; d=json.load(open(sys.argv[1])); json.dump(d, open(sys.argv[1],'w'), indent=1, sort_keys=True, ensure_ascii=False)" "$f"; done && sha256sum *.json *.pdf *.docx > SHA256SUMS)
echo "Saved to $out"
