#!/usr/bin/env bash
# Downloads the California Preschool/Transitional Kindergarten Learning Foundations (2024), At-a-Glance edition, into
# source/, which is committed. It lists every foundation with its code and both age ranges.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$out/ptklf-at-a-glance.pdf" "https://www.cde.ca.gov/sp/cd/re/documents/ptklfataglance.pdf"
pdftotext -layout "$out/ptklf-at-a-glance.pdf" "$out/ptklf-at-a-glance.txt"
echo "Saved to $out"
