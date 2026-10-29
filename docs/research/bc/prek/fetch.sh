#!/usr/bin/env bash
# Downloads the British Columbia Early Learning Framework (2019) into source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/early-learning-framework.pdf" "https://www2.gov.bc.ca/assets/gov/education/early-learning/teach/earlylearning/early_learning_framework.pdf"
pdftotext -layout "$out/early-learning-framework.pdf" "$out/early-learning-framework.txt"
echo "Saved to $out"
