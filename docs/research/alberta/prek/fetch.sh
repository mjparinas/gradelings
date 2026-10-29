#!/usr/bin/env bash
# Downloads Flight: Alberta's Early Learning and Care Framework (English) from flightframework.ca into source/, which is
# committed. The text is extracted without -layout: the PDF's two-column pages split facet names across columns otherwise.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/flight-framework.pdf" "https://cdn.prod.website-files.com/6238b139a5a3027d035ca6a3/6243589f979c467c82a2f63d_Flight%20Framework%20Document%20English.pdf"
pdftotext "$out/flight-framework.pdf" "$out/flight-framework.txt"
echo "Saved to $out"
