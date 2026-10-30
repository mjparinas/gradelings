#!/usr/bin/env bash
# Downloads the Alabama Standards for Early Learning and Development (ASELD, revised 2023, Alabama Department of Early
# Childhood Education with the Department of Human Resources) into source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/alabama-standards-early-learning-development.pdf" "https://children.alabama.gov/wp-content/uploads/2023/10/ASELD-Document-Revised-4-28-2023.pdf"
# Without -layout: the age columns are narrow, and plain extraction keeps each indicator together.
pdftotext "$out/alabama-standards-early-learning-development.pdf" "$out/alabama-standards-early-learning-development.txt"
echo "Saved to $out"
