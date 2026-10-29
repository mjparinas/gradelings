#!/usr/bin/env bash
# Downloads the Georgia Early Learning and Development Standards (GELDS) indicators for 48 to 60 months (Bright from the
# Start, Georgia Department of Early Care and Learning) into source/, which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/gelds-48-60-months.pdf" "https://gelds.decal.ga.gov/pdf/indicators/48-60_Indicators.pdf"
# The indicators are a two-column table, so build_outcomes.py reads word positions (-bbox-layout); the .txt is for reading.
pdftotext -bbox-layout "$out/gelds-48-60-months.pdf" "$out/gelds-48-60-months.html"
pdftotext -layout "$out/gelds-48-60-months.pdf" "$out/gelds-48-60-months.txt"
echo "Saved to $out"
