#!/usr/bin/env bash
# Downloads the Washington State Early Learning and Development Guidelines, Birth through 3rd Grade (DCYF publication
# EL_0015, 2012, revised April 2021) into source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/early-learning-and-development-guidelines.pdf" "https://www.dcyf.wa.gov/sites/default/files/pubs/EL_0015.pdf"
pdftotext -layout "$out/early-learning-and-development-guidelines.pdf" "$out/early-learning-and-development-guidelines.txt"
echo "Saved to $out"
