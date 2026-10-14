#!/usr/bin/env bash
# Downloads the Maine Learning Results (Maine Department of Education) into a cache folder.
# Usage: ./fetch.sh <cache-dir>   then   python3 -I build_outcomes.py <cache-dir>
# The files are public and download without a login, so they are not committed.
set -euo pipefail
out="${1:?usage: fetch.sh <cache-dir>}"
mkdir -p "$out"
base="https://www.maine.gov/doe/sites/maine.gov.doe/files/inline-files"
get() {
  curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$out/$1" "$base/$2"
  sleep 1
}
# Mathematics (adopted 18 July 2020), from maine.gov/doe/learning/standards/mathematics: one PDF per grade span.
get math-childhood.pdf "Standards%20%26%20Instruction%20-%20Childhood%20Math%20Standards%20-%202.18.2020.pdf"
get math-early-adolescence.pdf "Standards%20%26%20Instruction%20-%20Early%20Adolescence%20Standards%20-%202.18.2020.pdf"
get math-adolescence.pdf "Standards%20%26%20Instruction%20-%20Adolescence%20Math%20Standards%20-%202.18.2020.pdf"
# English language arts (adopted 2020), the whole document as Word, from maine.gov/doe/learning/standardsreview/ela.
get ela.docx "2020%20Maine%20ELA%20Standards_3.docx"
# Science and Engineering (2019, LD 283), from maine.gov/doe/learning/standardsreview/science.
get science.pdf "Content%20%26%20Standards%20-%202019%20MLR%20Science%20and%20Engineering%20-%204.1.2026.pdf"
# Social studies (2019 revision, posted October 2025), the whole document as Word, from
# maine.gov/doe/learning/standards/socialstudies. The History and Geography strand PDFs are the same text.
get social.docx "MLR%20-%20Social%20Studies%202019%20revised%20standards%20-%2010.2025.docx"
echo "Saved to $out"
