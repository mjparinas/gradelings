#!/usr/bin/env bash
# Downloads the Georgia standards used by Gradelings into a folder, from the Georgia Department of Education's own
# standards server (case.georgiastandards.org, an IMS CASE 1.0 API). GaDOE retired the georgiastandards.org pages in
# 2025 (gadoe.org/georgiastandards-sunset/); the CASE server is where GaDOE now publishes each standards document
# with its codes. Each file is one CFPackage: the document, every coded item and the links between them.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
api="https://case.georgiastandards.org/ims/case/v1p0/CFPackages"
get() {
  curl -fsSL --retry 3 --max-time 600 -A "Mozilla/5.0" -o "$out/$1.json" "$api/$2"
  sleep 1
}
# Georgia's K-12 Mathematics Standards (adopted 2021, in schools from 2023-24).
get math e9dd7229-3558-4df2-85c6-57b8938f6180
# Georgia's K-12 English Language Arts Standards (in schools from 2025-26).
get ela 391c3abe-c1ec-4a4a-a942-c9e152b35102
# Science, Georgia Standards of Excellence (approved June 2016, in schools from 2017-18).
get science 27a08dc6-416e-11e7-ba71-02bd89fdd987
# Social Studies, Georgia Standards of Excellence (K-12, last updated January 2023).
get social a446e74c-463e-11e7-94f5-b49cee8b2d8c
(cd "$out" && for f in *.json; do python3 -I -c "import json,sys; d=json.load(open(sys.argv[1])); json.dump(d, open(sys.argv[1],'w'), indent=1, sort_keys=True, ensure_ascii=False)" "$f"; done && sha256sum *.json > SHA256SUMS)
echo "Saved to $out"
