#!/usr/bin/env bash
# Downloads the Illinois Early Learning and Development Standards for children three years old to kindergarten
# enrollment age (IELDS, Illinois State Board of Education, 2013) into source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/illinois-early-learning-development-standards.pdf" "https://www.isbe.net/Documents/early_learning_standards.pdf"
pdftotext -layout "$out/illinois-early-learning-development-standards.pdf" "$out/illinois-early-learning-development-standards.txt"
echo "Saved to $out"
