#!/usr/bin/env bash
# Downloads the Kentucky Early Childhood Standards (Kentucky Governor's Office of Early Childhood, 2013) into source/,
# which is committed.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/kentucky-early-childhood-standards.pdf" "https://kyecac.ky.gov/professionals/Early-Childhood-Standards/Resources/Documents/Standards%20for%20pdf%20Online%20Printable.pdf"
pdftotext -layout "$out/kentucky-early-childhood-standards.pdf" "$out/kentucky-early-childhood-standards.txt"
echo "Saved to $out"
