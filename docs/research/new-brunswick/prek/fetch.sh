#!/usr/bin/env bash
# Downloads the New Brunswick Curriculum Framework for Early Learning and Child Care, English (2008) into source/,
# which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/nb-curriculum-framework.pdf" "https://www2.gnb.ca/content/dam/gnb/Departments/ed/pdf/ELCC/ECHDPE/nb-curriculum-framework.pdf"
pdftotext -layout "$out/nb-curriculum-framework.pdf" "$out/nb-curriculum-framework.txt"
echo "Saved to $out"
