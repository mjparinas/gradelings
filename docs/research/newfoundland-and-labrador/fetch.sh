#!/bin/sh
# Downloads the five Atlantic Canada foundation documents from the Newfoundland and Labrador Department of Education
# (gov.nl.ca/education/k12/curriculum/documents/foundation/ and .../corefrench/) and rebuilds outcomes.json.
# Needs curl and pdftotext. Usage: sh fetch.sh <work-dir>
set -e
W=${1:?usage: fetch.sh <work-dir>}
mkdir -p "$W"
B=https://www.gov.nl.ca/education/files
get() { # name url
  curl -sSL -A "Mozilla/5.0" -o "$W/$1.pdf" "$2"
  pdftotext -layout "$W/$1.pdf" "$W/$1.txt"
  pdftotext "$W/$1.pdf" "$W/$1.plain.txt"
}
get math          $B/k12_curriculum_documents_mathematics_math.pdf
get english       $B/k12_curriculum_documents_english_english.pdf
get science       $B/k12_curriculum_documents_science_sci.pdf
get socialstudies $B/k12_curriculum_documents_socialstudies_social.pdf
get corefrench    $B/k12_curriculum_documents_corefrench_orientation.pdf
cd "$(dirname "$0")"
python3 -I build_outcomes.py "$W" ../../../src/content/newfoundland-and-labrador/overall.ts > outcomes.json
