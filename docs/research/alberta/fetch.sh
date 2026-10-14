#!/usr/bin/env bash
# Downloads the official Alberta curriculum documents that outcomes.json was read from
# (open.alberta.ca and aplc.ca), and writes a `pdftotext -layout` .txt next to each PDF.
# Usage: ./fetch.sh [dir]   (default: ./source next to this script; needs curl and pdftotext)
# Then:  python3 -I build_outcomes.py [dir]   to rebuild the extractable parts of outcomes.json.
set -euo pipefail
OUT="${1:-$(dirname "$0")/source}"
mkdir -p "$OUT"
OA=https://open.alberta.ca/dataset
get() { # name, url
  curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$OUT/$1.pdf" "$2"
  pdftotext -layout "$OUT/$1.pdf" "$OUT/$1.txt"
}

# New K-6 curriculum overviews (open.alberta.ca dataset da982352-b50d-49a2-8805-c9073a7ecebd),
# each with a "snapshot by grade" per subject.
K6=$OA/da982352-b50d-49a2-8805-c9073a7ecebd/resource
# English language arts and literature (2022)
get k6-language "$K6/583f6a69-3190-4714-83a3-2e284c93c0bd/download/edc-new-curr-k6-english-language-arts-literature.pdf"
# Mathematics (April 2022)
get k6-math "$K6/ce28459e-b9ba-40bc-a96f-c03b71df31e0/download/edc-new-curr-k6-mathematics.pdf"
# Science (March 2023)
get k6-science "$K6/8322b928-cdfa-43c4-92bd-9e0a7f5c5a63/download/educ-new-curr-k6-science.pdf"
# Social studies (May 2025)
get k6-social "$K6/ff7b0bfd-cd6d-416f-a63e-169d847583f1/download/ec-new-curr-k6-social-studies-2025.pdf"
# French immersion language arts and literature (2023)
get k6-immersion "$K6/99d2f2dc-2f06-48e6-971c-b1fb80fc1000/download/educ-new-curr-k6-french-immersion-language-arts-literature.pdf"

# Alberta Regional Professional Development Consortia (aplc.ca), numbered outcomes of the new K-6 curriculum.
# Alberta Mathematics K-6 Scope and Sequence, 2022 curriculum (codes such as 4N1.1)
get k6-math-scope-sequence "https://aplc.ca/wp-content/uploads/2024/12/Alberta-Mathematics-K-6-Scope-and-Sequence-Curriculum-2022.pdf"
# Science K-6 numbered outcomes, 2023-2024 (revised May 17, 2024; codes such as 3ES 1.2)
get k6-science-numbered "https://aplc.ca/wp-content/uploads/2023/04/2023-2024-science-numbered-outcomes-provincial.pdf"

# The Alberta K-9 Mathematics Program of Studies with Achievement Indicators (2007; ISBN 9780778561811).
# Grades 7-9 specific outcomes by strand and number (N5, PR2, SS3, SP1).
get math-k9-2007 "$OA/903fef63-be4e-460c-98c5-907b7cdf41d5/resource/fe208d51-ddc3-4894-acb0-da7b3e1aeedd/download/3951812-2007-alberta-k-9-mathematics-achivement-indicators.pdf"

# Science Grades 7-8-9 Program of Studies (2003, updated 2009 and 2014): the five units in each grade.
get science-7-9 "$OA/ad1119ce-9052-4885-93b3-fe2d1c6ee007/resource/7b95e3da-731f-4f70-886c-1367d006cae4/download/sci7to9.pdf"

# English Language Arts (K-9) Program of Studies (2000): the five general outcomes.
get ela-k9-2000 "$OA/30a25027-e8b9-4599-93ff-4035130b393a/resource/aef19d44-a551-4f85-85a6-217e22c9ccfb/download/ela-pos-k-9.pdf"

# Social Studies K-12 Program of Studies (2005), Social Studies 10-1 edition (2007). The Grade 7-9
# program booklets are not on open.alberta.ca; this edition carries the K-12 overview with the
# Grade 7-9 issue headings (7.1 to 9.2).
get social-k12-10-1 "$OA/39b03fa1-d4cf-497f-b4b9-5496b49d7329/resource/70de3f71-7303-4eb1-aceb-04ea3b0f6a14/download/zz-3448581-2007-social-studies-k-12-10-1-10-2.pdf"

# French as a Second Language Nine-Year Program of Studies, Grade 4 to Grade 12 (2004; ISBN 0778537722).
# (open.alberta.ca also holds an 11 MB rescan of the same program, 0163310319229; not downloaded.)
get fsl-9y-2004 "$OA/2db9d30d-7ad8-43f6-b7ce-4d44b02a5159/resource/1946ee2c-d401-4677-bfea-09a465b5fde8/download/2004-french-as-second-language-nine-year-program-studies-grade-4-to-grade-12.pdf"

# Programme d'études par année scolaire, Français langue seconde - immersion, septième année
# (Alberta Learning, 2000; ISBN 0-7785-0804-8): the general outcomes V1, CO1-CO5, CÉ1-CÉ5, PO1-PO5, PÉ1-PÉ5.
get immersion-7-2000 "$OA/a4b0442e-df30-4a9d-ac7b-2d87efc617d5/resource/79d5eb42-7223-4f11-ad2b-d838b74d3e26/download/2398090-2000-7imm.pdf"

echo "Saved to $OUT"
