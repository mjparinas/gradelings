#!/usr/bin/env bash
# Downloads the NWT Junior Kindergarten / Kindergarten Curriculum, A Holistic Approach to Children's Early Learning
# (Education, Culture and Employment, January 2017) into source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/jk-kindergarten-curriculum.pdf" "https://www.ece.gov.nt.ca/sites/ece/files/resources/jk_-_kindergarten_curriculum_english.pdf"
pdftotext -layout "$out/jk-kindergarten-curriculum.pdf" "$out/jk-kindergarten-curriculum.txt"
echo "Saved to $out"
