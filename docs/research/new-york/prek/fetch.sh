#!/usr/bin/env bash
# Downloads the New York State Prekindergarten Learning Standards (2019) into source/, which is committed. NYSED's
# Office of Early Learning publishes them; this is the copy the NYS Council on Children and Families hosts.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$out/2019-prek-learning-standards.pdf" "https://www.ccf.ny.gov/application/files/7116/5764/3212/2019-prek-learning-standards.pdf"
pdftotext -layout "$out/2019-prek-learning-standards.pdf" "$out/2019-prek-learning-standards.txt"
echo "Saved to $out"
