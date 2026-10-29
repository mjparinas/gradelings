#!/usr/bin/env bash
# Downloads Navigating the Early Years: An Early Childhood Learning Framework (Department of Education and Early
# Childhood Development, 2019) into source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/early-learning-framework.pdf" "https://www.gov.nl.ca/eecd/files/Early-Learning-Framework.pdf"
pdftotext "$out/early-learning-framework.pdf" "$out/early-learning-framework.txt"
echo "Saved to $out"
