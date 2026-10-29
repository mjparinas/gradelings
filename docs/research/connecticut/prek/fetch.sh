#!/usr/bin/env bash
# Downloads the Connecticut Early Learning and Development Standards (CT ELDS, Connecticut Office of Early Childhood)
# into source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/ct-early-learning-development-standards.pdf" "https://www.ctoec.org/wp-content/uploads/2019/12/ctelds-11.20.24.pdf"
# Without -layout: the standards sit in narrow age columns, and plain extraction keeps each one together.
pdftotext "$out/ct-early-learning-development-standards.pdf" "$out/ct-early-learning-development-standards.txt"
echo "Saved to $out"
