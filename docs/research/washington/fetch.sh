#!/usr/bin/env bash
# Downloads Washington's K-12 learning standards from OSPI into a cache folder.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source   (dir defaults to source/ in this folder, which is committed)
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
base="https://ospi.k12.wa.us/sites/default/files"
get() { curl -fsSL --retry 3 -o "$out/$1" "$base/$2"; }
get math.xlsx 2026-08/math26-final-adoption-spreadsheet.xlsx
get ela.pdf 2026-08/wa-learning-standards-ela.pdf
get science-dci.pdf 2023-08/dci-arrangements-next-generation-science-standards.pdf
for band in k-5 6-8 9-12; do
  for strand in ss-skills civics economics geography history; do
    get "social-$band-$strand.pdf" "2023-02/ss-standards-2019_grades-${band}_${strand}.pdf"
  done
done
get social-scope-and-sequence.pdf 2022-12/SocialStudiesScopeandSequence2020Web.pdf
echo "Saved to $out"
