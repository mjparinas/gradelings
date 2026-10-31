#!/usr/bin/env bash
# Downloads the official documents the shared Spanish course (Grades 3 to 9) cites, and a `pdftotext -layout` copy of
# each PDF. build_outcomes.py reads them into outcomes.json.
# Usage: ./fetch.sh [dir]   (default: source/ next to this script; needs curl and pdftotext)
set -euo pipefail
OUT="${1:-"$(dirname "$0")/source"}"
mkdir -p "$OUT/pdf" "$OUT/txt" "$OUT/html"
UA="Mozilla/5.0"
get() { # name, url: a PDF, kept with its text
  curl -fsSL --retry 3 -A "$UA" -o "$OUT/pdf/$1.pdf" "$2"
  pdftotext -layout "$OUT/pdf/$1.pdf" "$OUT/txt/$1.txt"
}

# British Columbia: Second Languages, Spanish 5 to 10 (March 2018). We cite the Content of Grades 5 to 9.
get bc-spanish_5-10 https://curriculum.gov.bc.ca/sites/curriculum.gov.bc.ca/files/curriculum/languages/en_languages_5-10_spanish.pdf
# Alberta: Spanish Language and Culture Nine-Year Program (Grade 4 to Grade 12). education.alberta.ca now redirects to
# the new LearnAlberta site, which has no PDF of it; this is the University of Alberta Library's scan on archive.org
# (April 2004 field validation draft, the outcome clusters A-1 to A-6, LC-1 to LC-4, GC-1 to GC-3 and S-1 to S-3).
get ab-spanish-9y_4-12 https://archive.org/download/spanlangcult9y4to1204albe/spanlangcult9y4to1204albe.pdf
# Manitoba: Grade 7 to Senior 4 Spanish Language and Culture, Manitoba Curriculum Framework of Outcomes (2004).
# Senior 1 is Grade 9. Its strands are numbered (1.1.1 Share Factual Information, 2.1.3 Lexicon, ...).
get mb-spanish_7-s4 https://www.edu.gov.mb.ca/k12/cur/languages/spanish/framework/gr7-s4.pdf
# Everywhere else: the World-Readiness Standards for Learning Languages (National Standards Collaborative Board, 2015),
# whose eleven standards ACTFL lists on its summary page, and the proficiency sublevels (Novice Low to Intermediate Low)
# of the NCSSFL-ACTFL Can-Do Statements.
curl -fsSL --retry 3 -A "$UA" -o "$OUT/html/wrs-summary.html" https://www.actfl.org/educator-resources/world-readiness-standards-for-learning-languages/standards-summary
get actfl-can-do-novice https://www.actfl.org/uploads/files/general/Resources-Publications/Can-Do-Novice.pdf
