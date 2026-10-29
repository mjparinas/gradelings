#!/usr/bin/env bash
# Downloads the Florida Early Learning and Developmental Standards for Four-Year-Olds to Kindergarten (Form OEL-VPK 15,
# October 2017, adopted by Rule 6M-8.602, F.A.C.) into source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/florida-early-learning-standards-4-to-k.pdf" "http://flbt5.floridaearlylearning.com/docs/OEL-VPK154yo.pdf"
pdftotext -layout "$out/florida-early-learning-standards-4-to-k.pdf" "$out/florida-early-learning-standards-4-to-k.txt"
echo "Saved to $out"
