#!/usr/bin/env bash
# Downloads Minnesota's official standards documents into a folder (default: source/) for build_outcomes.py.
# education.mn.gov sits behind a bot check (a captcha page) that blocks scripts, so these are the copies of the same
# official documents that the Minnesota Legislative Reference Library keeps (www.lrl.mn.gov, 2025 mandated reports).
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
base="https://www.lrl.mn.gov/docs/2025/mandated"
get() { curl -fsSL -A "Mozilla/5.0" -o "$out/$1" "$base/$2"; echo "$1"; }
# Math: 2022 Minnesota K-12 Academic Standards in Mathematics (Minnesota Rules 3501.0750, in schools by 2027-28).
get math.pdf 251891.pdf
# English language arts: 2020 Minnesota K-12 Academic Standards in ELA, February 2024 corrected (Rules 3501.0660).
get ela.pdf 251889.pdf
# Science: Minnesota Academic Standards in Science, 2019, final with October 2022 edits (Rules 3501.0960).
get science.pdf 251893.pdf
# Social studies: 2021 Minnesota K-12 Academic Standards in Social Studies (Rules 3501.1350, in schools from 2026-27).
get social.pdf 251895.pdf
echo "Saved to $out"
