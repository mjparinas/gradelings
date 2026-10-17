#!/usr/bin/env bash
# Downloads the Florida standards used by build_outcomes.py into a folder (default: source/) and makes the plain
# `pdftotext` text beside each PDF. The three PDF books come from CPALMS (cpalms.org, the Florida Department of
# Education's standards site; www.fldoe.org blocks scripted downloads), which publishes them under "Standards Books".
# CPALMS has no science book, so fetch_cpalms.py walks its standards tree and saves the benchmarks (with the math,
# English language arts and social studies ones, as the clean code-and-words files build_outcomes.py reads).
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="${1:-$here/source}"
mkdir -p "$out"

base="https://cpalmsmediaprod.blob.core.windows.net/uploads/docs/standards/best"
get() {
  curl -fsSL -A "Mozilla/5.0" -o "$out/$1" "$base/$2"
  command -v pdftotext >/dev/null && pdftotext "$out/$1" "${out}/${1%.pdf}.txt"
  echo "$1"
}

# Florida's B.E.S.T. Standards for Mathematics (last revised 07/2026).
get bestmath202607.pdf ma/bestmath202607.pdf
# Florida's B.E.S.T. Standards for English Language Arts (last revised 11/2025).
get bestela202511.pdf la/bestela202511.pdf
# Florida's State Academic Standards for Social Studies (last revised 07/2026).
get ssstandards202607.pdf ss/ssstandards202607.pdf
# Benchmarks as code and words for all four subjects, including the Next Generation Sunshine State Standards for Science.
python3 -I "$here/fetch_cpalms.py" "$out"
echo "Saved to $out"
