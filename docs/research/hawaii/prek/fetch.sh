#!/usr/bin/env bash
# Downloads the Hawaiʻi Early Learning and Development Standards (HELDS) continuum (Executive Office on Early Learning,
# April 2014) into source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/hawaii-early-learning-development-standards.pdf" "https://earlylearning.hawaii.gov/pdfs/HELDS-continuum-2014_04_011.pdf"
# The continuum is a table of age columns, so build_outcomes.py reads line positions (-bbox-layout); the .txt is for reading.
pdftotext -bbox-layout "$out/hawaii-early-learning-development-standards.pdf" "$out/hawaii-early-learning-development-standards.html"
pdftotext -layout "$out/hawaii-early-learning-development-standards.pdf" "$out/hawaii-early-learning-development-standards.txt"
echo "Saved to $out"
