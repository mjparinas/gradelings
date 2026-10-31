#!/usr/bin/env bash
# Downloads the Rhode Island Early Learning and Development Standards (2023 edition, Rhode Island Department of
# Education and partners) into source/, which is committed, and makes the text of its outline pages (12 and 13).
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
dir="${1:-source}"
mkdir -p "$dir"
curl -fsSL -o "$dir/rields-2023.pdf" "https://rields.com/wp-content/uploads/2023/04/RIELDS_standards_2023_0329.pdf"
pdftotext -f 12 -l 13 "$dir/rields-2023.pdf" "$dir/rields-2023-outline.txt"
