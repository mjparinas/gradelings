#!/usr/bin/env bash
# Downloads Essential Learning Experiences for Three-, Four- and Five-Year-Olds (Saskatchewan Ministry of Education,
# Early Years Branch, a supplement to Play and Exploration: Early Learning Program Guide) from the Saskatchewan
# Publications Centre into source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/essential-learning-experiences.pdf" "https://publications.saskatchewan.ca/api/v1/products/79287/formats/89611/download"
pdftotext -layout "$out/essential-learning-experiences.pdf" "$out/essential-learning-experiences.txt"
echo "Saved to $out"
