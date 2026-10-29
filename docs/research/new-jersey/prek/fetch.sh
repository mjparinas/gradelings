#!/usr/bin/env bash
# Downloads the New Jersey Preschool Teaching and Learning Standards (New Jersey Department of Education, 2014) into
# source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/preschool-teaching-learning-standards.pdf" "https://www.nj.gov/education/earlychildhood/preschool/docs/PreschoolTeachingandLearningStandards.pdf"
pdftotext -layout "$out/preschool-teaching-learning-standards.pdf" "$out/preschool-teaching-learning-standards.txt"
echo "Saved to $out"
