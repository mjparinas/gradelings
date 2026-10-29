#!/usr/bin/env bash
# Downloads the 2022 Texas Prekindergarten Guidelines for four-year-olds (PK4) into source/, which is committed.
# If curl reports "unable to get local issuer certificate", point CURL_CA_BUNDLE at a bundle that holds TEA's chain.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
f=2022-texas-prekindergarten-guidelines-pk4
curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$out/$f.pdf" "https://tea.texas.gov/curriculum-and-instruction/curriculum-standards/$f.pdf"
pdftotext -layout "$out/$f.pdf" "$out/$f.txt"
echo "Saved to $out"
