#!/usr/bin/env bash
# Downloads the Wisconsin Model Early Learning Standards (4th edition, 2013, Wisconsin Department of Public Instruction
# and partners) into source/, which is committed, and makes the `pdftotext -layout` text beside the PDF.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
dir="${1:-source}"
mkdir -p "$dir"
curl -fsSL -o "$dir/wmels-2013.pdf" "https://dpi.wi.gov/sites/default/files/imce/fscp/pdf/ec-wmels-rev2013.pdf"
pdftotext -layout "$dir/wmels-2013.pdf" "$dir/wmels-2013.txt"
