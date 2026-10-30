#!/usr/bin/env bash
# Downloads the Missouri Early Learning Standards (2021, Missouri Department of Elementary and Secondary Education) into
# source/, which is committed, and makes the `pdftotext -layout` text beside the PDF.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
dir="${1:-source}"
mkdir -p "$dir"
curl -fsSL -o "$dir/mels-2021.pdf" \
  "https://dese.mo.gov/sites/g/files/zuston521/files/media/pdf/2021/03/qs-el-2021-Missouri-Early-Learning-Standards.pdf"
pdftotext -layout "$dir/mels-2021.pdf" "$dir/mels-2021.txt"
