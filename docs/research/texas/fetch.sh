#!/usr/bin/env bash
# Downloads the Texas Essential Knowledge and Skills (TEKS) chapter files from the Texas Education Agency (TEA).
# Usage: ./fetch.sh [dir]   (default: the source/ folder beside this script), then   python3 -I build_outcomes.py
# The files are public and download without a login. They are committed in source/ anyway (owner, October 2026), so
# the record survives if TEA moves or replaces them; run this to check for a newer edition and commit any change.
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
base="https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect"
# 19 TAC Chapter 110 (English language arts and reading), 111 (mathematics), 112 (science) and 113 (social studies).
# Subchapter A is elementary (Kindergarten to Grade 5), B middle school (Grades 6 to 8) and C high school (English I,
# Algebra I, Biology and United States Government are this app's Grade 9).
for ch in 110 111 112 113; do
  for sub in a b c; do
    f="ch${ch}${sub}.pdf"
    curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$out/$f" "$base/$f"
    if [ "$(head -c 5 "$out/$f")" != "%PDF-" ]; then
      echo "$f: not a PDF; TEA may have moved the file (see tea.texas.gov, Laws and Rules, 19 TAC Chapter $ch)" >&2
      exit 1
    fi
    sleep 1
  done
done
echo "Saved to $out"
