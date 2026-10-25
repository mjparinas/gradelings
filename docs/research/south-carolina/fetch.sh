#!/usr/bin/env bash
# Downloads the South Carolina College- and Career-Ready Standards used by build_outcomes.py into a folder (default:
# source/) and makes the `pdftotext -layout` text beside each PDF. The files come from the South Carolina Department of
# Education at ed.sc.gov, which allows scripted downloads: each document's page URL answers with the PDF itself.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="${1:-$here/source}"
mkdir -p "$out"

base="https://ed.sc.gov/instruction/standards"
get() {
  curl -fsSL -A "Mozilla/5.0" -o "$out/$1" "$base/$2/"
  command -v pdftotext >/dev/null && pdftotext -layout "$out/$1" "$out/${1%.pdf}.txt"
  echo "$1"
}

# Mathematics: 2025 SC College- and Career-Ready Mathematics Standards (approved December 2023, emended July 2026),
# Kindergarten to Grade 8 and the high school courses, with SCDE's list of corrective edits and the Algebra 1 page.
get math.pdf mathematics/standards/2025-south-carolina-college-and-career-ready-mathematics-standards
get math-corrective-edits.pdf mathematics/standards/corrective-edits-to-the-2025-sc-ccr-mathematics-standards
get math-algebra-1.pdf mathematics/standards/printable-algebra-1-standards-for-eocep
# English language arts: 2023 SC College- and Career-Ready ELA Standards (approved January 2023, emended August 2025).
get ela.pdf english-language-arts/standards/2023-sc-ccr-ela-standards-approved
# Science: SC College- and Career-Ready Science Standards 2021, Kindergarten to Grade 8 and the high school courses,
# and the printable Biology 1 page (the end-of-course test).
get science.pdf science/standards/south-carolina-college-and-career-ready-science-standards-2021-approved
get science-biology-1.pdf science/standards/printable-biology-1-standards
# Social studies: 2019 SC Social Studies College- and Career-Ready Standards, with SCDE's corrective edits (November 2023).
get social.pdf social-studies/standards/2019-south-carolina-social-studies-college-and-career-ready-standards
get social-corrective-edits.pdf social-studies/standards/corrective-edits-to-the-2019-south-carolina-social-studies-college-and-career-ready-standards
(cd "$out" && sha256sum *.pdf > SHA256SUMS)
echo "Saved to $out"
