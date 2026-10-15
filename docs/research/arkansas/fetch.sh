#!/usr/bin/env bash
# Downloads the Arkansas Academic Standards used by build_outcomes.py into a folder (default: source/) and makes the
# `pdftotext -layout` text beside each PDF. The files come from the Arkansas Department of Education, Division of
# Elementary and Secondary Education (DESE), at dese.ade.arkansas.gov, which allows scripted downloads.
#
# dese.ade.arkansas.gov leaves out its intermediate certificate (Sectigo Public Server Authentication CA OV R36), so
# curl reports "unable to get local issuer certificate". This script fetches that intermediate from Sectigo (the address
# in the site certificate's Authority Information Access field) and adds it to the CA bundle curl already trusts.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="${1:-$here/source}"
mkdir -p "$out"

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
system_bundle="${CURL_CA_BUNDLE:-${SSL_CERT_FILE:-/etc/ssl/certs/ca-certificates.crt}}"
curl -fsSL -o "$work/r36.crt" http://crt.sectigo.com/SectigoPublicServerAuthenticationCAOVR36.crt
openssl x509 -inform der -in "$work/r36.crt" -out "$work/r36.pem"
cat "$system_bundle" "$work/r36.pem" > "$work/bundle.pem"

base="https://dese.ade.arkansas.gov/Files"
get() {
  curl -fsSL --cacert "$work/bundle.pem" -A "Mozilla/5.0" -o "$out/$1" "$base/$2"
  command -v pdftotext >/dev/null && pdftotext -layout "$out/$1" "$out/${1%.pdf}.txt"
  echo "$1"
}

# Mathematics: Arkansas Mathematics Standards (2023), Kindergarten to Grade 8, Algebra I and Geometry.
get math-k-8.pdf "AR_2023_K-8,_Alg,_Geo_Math_Standards_LS_6.21.23_LS.pdf"
# English language arts: Arkansas English Language Arts Standards (2023), Kindergarten to Grade 12.
get ela-k-12.pdf AR_2023_K-12_ELA_Standards_LS_7.2023_LS.pdf
# Science: Arkansas K-12 Science Standards (2016, NGSS-based, with Arkansas clarifications), one document per grade, and
# the high school courses a ninth grader takes (Physical Science, Biology, Chemistry and Physics).
get science-k.pdf Kindergarten-general_science_LS.pdf
get science-1.pdf First_Grade_general_science_LS.pdf
get science-2.pdf Second_Grade_general_science_LS.pdf
get science-3.pdf Third_Grade_general_science_LS.pdf
get science-4.pdf Fourth_Grade_general_science_LS.pdf
get science-5.pdf Fifth_Grade_general_science_LS.pdf
get science-6.pdf Sixth_Grade_general_science_LS.pdf
get science-7.pdf Seventh_Grade_general_science_LS.pdf
get science-8.pdf Eighth_Grade_general_science_LS.pdf
get science-physical.pdf Physical_Science_Integrated_Standards_LS.pdf
get science-biology.pdf Biology_Integrated_Science_Standards_LS.pdf
get science-chemistry.pdf Chemistry_Integrated_Science_Standards_LS.pdf
get science-physics.pdf Physics_Science_Standards_LS.pdf
# Social studies: Arkansas Social Studies Academic Standards (2022): Grades K-4, 5-6, 7 and 8, the Grades 7-8 Arkansas
# History course, and Civics (the high school course this app teaches in Grade 9).
get social-k-4.pdf AR_Grades_K-4_Social_Studies_Standards_2022_LS.pdf
get social-5-6.pdf AR_Grades_5-6_Social_Studies_Standards_2022_LS.pdf
get social-7.pdf AR_Grade_7_Social_Studies_Standards_2022_LS.pdf
get social-8.pdf AR_Grade_8_Social_Studies_Standards_2022_LS.pdf
get social-arkansas-history-7-8.pdf AR_Grades_7-8_Arkansas_History_Standards_2022_LS.pdf
get social-civics.pdf AR_Civics_Standards_2022_LS.pdf
echo "Saved to $out"
