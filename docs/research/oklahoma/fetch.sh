#!/usr/bin/env bash
# Downloads the Oklahoma Academic Standards used by build_outcomes.py, with a plain-text copy of each PDF
# (pdftotext -layout), from the Oklahoma State Department of Education (oklahoma.gov/education), which allows scripted
# downloads.
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="${1:-$here/source}"
mkdir -p "$out"
base=https://oklahoma.gov/content/dam/ok/en/osde/documents/services/standards-learning

get() { curl -sSfL --retry 3 -o "$out/$1" "$2"; echo "ok   $1"; }

# Mathematics: the 2022 Oklahoma Academic Standards for Mathematics (approved 2022, in classrooms from fall 2023).
get math-2022.pdf "$base/mathematics/2022%20OAS%20Math.pdf"
# English language arts: the 2021 Oklahoma Academic Standards for English Language Arts.
get ela-2021.pdf "$base/english-language-arts/ela-standards/2021%20Oklahoma%20Academic%20Standards%20for%20English%20Language%20Arts.pdf"
# Science: the 2026 Oklahoma Academic Standards for Science (cited), and the 2020 standards they replace, which the
# Department still links from Google Drive (the codes the app cites are the same in both for Kindergarten to Grade 8).
get science-2026.pdf "$base/science-engineering/Final%202026%20OAS-S%201-26.pdf"
get science-2020.pdf "https://drive.usercontent.google.com/download?id=1qdJWH1nGAyRYd3l3F6xCi7MFRxzHWj2q&export=download&confirm=t"
# Social studies: the 2026 Oklahoma Academic Standards for Social Studies (State Board, March 26, 2026; the posted
# file is dated July 10, 2026).
get social-2026.pdf "$base/social-studies/OAS%20Social%20Studies%207.10.26.pdf"

(cd "$out" && for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt"; done && sha256sum *.pdf *.txt > SHA256SUMS)
echo "Saved to $out. Rebuild with: python3 -I build_outcomes.py \"$out\""
