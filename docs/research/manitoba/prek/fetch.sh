#!/usr/bin/env bash
# Downloads Early Returns: Manitoba's Early Learning and Child Care Curriculum Framework for Preschool Centres and
# Nursery Schools into source/, which is committed. The text is extracted without -layout: the two-column pages split
# sentences across columns otherwise.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/early-returns.pdf" "https://www.gov.mb.ca/education/childcare/resources/pubs/early_returns.pdf"
pdftotext "$out/early-returns.pdf" "$out/early-returns.txt"
echo "Saved to $out"
