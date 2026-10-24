#!/usr/bin/env bash
# Downloads the Colorado Academic Standards used by Gradelings into a folder, as published by the Common Standards
# Project (api.commonstandardsproject.com, a public copy of each state's standards documents with their codes).
# cde.state.co.us refuses scripted connections (the connection is reset before TLS completes), so the sources are the
# Common Standards Project's copies of CDE's documents; each file names the CDE page it was taken from (sourceURL).
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
api="https://api.commonstandardsproject.com/api/v1/standard_sets"
co="83F29380C23C4AEB843733B243CB2243"
get() {
  curl -fsSL --retry 3 -o "$out/$1.json" "$api/${co}_$2"
  sleep 1
}
grades="k 01 02 03 04 05 06 07 08"
for g in $grades; do
  n="${g#0}"
  # Mathematics, adopted 2018, in schools from 2020-21 (cde.state.co.us/comath/2020cas-ma-p12).
  get "math-$n" "D2980651_grade-$g"
  # Reading, Writing, and Communicating, adopted 2018 (cde.state.co.us/coreadingwriting/2020cas-rw-p12).
  get "rwc-$n" "D21132944_grade-$g"
  # Social Studies, adopted 2022, in schools from 2023-24 (cde.state.co.us/cosocialstudies/cas-ss-p12-2022).
  get "social-$n" "D21428307_grade-$g"
done
for g in k 01 02 03 04 05; do
  # Science, adopted 2018, in schools from 2020-21 (cde.state.co.us/coscience/2020cas-sc-p12).
  get "science-${g#0}" "D2980644_grade-$g"
done
get science-ms D2980644_grades-06-07-08
get science-hs D2980644_grades-09-10-11-12
get math-hs D2980651_grades-09-10-11-12
get rwc-9-10 D21132944_grades-09-10
get social-hs D21428307_grades-09-10-11-12
# Holocaust and genocide standards (HB20-1336), Grades 6 to 8 and high school.
for g in 06 07 08; do get "holocaust-${g#0}" "D21371896_grade-$g"; done
get holocaust-hs D21371896_grades-09-10-11-12
(cd "$out" && for f in *.json; do python3 -c "import json,sys; d=json.load(open(sys.argv[1])); json.dump(d, open(sys.argv[1],'w'), indent=1, sort_keys=True, ensure_ascii=False)" "$f"; done && sha256sum *.json > SHA256SUMS)
echo "Saved to $out"
