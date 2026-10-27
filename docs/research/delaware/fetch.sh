#!/usr/bin/env bash
# Downloads Delaware's standards used by build_outcomes.py, as the Achievement Standards Network (ASN, run by D2L)
# publishes them for the Delaware jurisdiction, and the Delaware laws and regulations the parent guides and the
# schools notice rely on:
#   D2547470  Common Core State Standards for Mathematics (2010), Delaware's mathematics standards
#   D2548174  Common Core State Standards for English Language Arts & Literacy (2010)
#   D2603111  Next Generation Science Standards (2013), Delaware's science standards
#   D21189430 Delaware Standards for Civics (2018)
#   D21189461 Delaware Standards for Economics (2018)
#   D21189484 Delaware Standards for Geography (2018)
#   D21189378 Delaware Standards for History (2018)
# Each ASN document is the "_full.json" export (every statement with its code, text and grade levels) plus the
# document record (".json"), which names the Department of Education's own file it was built from.
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
#
# education.delaware.gov answers automated downloads with a Cloudflare challenge (HTTP 403), and
# regulations.delaware.gov is a JavaScript app, so the Department's files are not fetched here; the administrative
# code sections come from Cornell's Legal Information Institute copy instead. See README.md.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$(mkdir -p "${1:-$here/source}" && cd "${1:-$here/source}" && pwd)"

asn="https://asn.desire2learn.com/resources"
get() {
  curl -fsSL --retry 3 -o "$out/$1" "$2"
  sleep 1
}
for pair in math:D2547470 ela:D2548174 science:D2603111 civics:D21189430 economics:D21189461 geography:D21189484 history:D21189378; do
  name="${pair%%:*}"
  id="${pair##*:}"
  get "asn-$name-$id.json" "$asn/${id}_full.json"
  get "asn-$name-$id-document.json" "$asn/$id.json"
done
get asn-de.html "$asn/ASNJurisdiction/DE"   # ASN's list of Delaware documents, with their status

# The Delaware Code: student data privacy (Title 14, chapter 81A) and required instruction (chapter 41, subchapter I).
get delcode-14-c081a-student-data-privacy.html "https://delcode.delaware.gov/title14/c081a/index.html"
get delcode-14-c041-sc01-regulatory-provisions.html "https://delcode.delaware.gov/title14/c041/sc01/index.html"

# The Delaware Administrative Code, Title 14: who takes the state tests (101-3.0), the four performance levels
# (101-5.0) and the content standards schools must follow (501-1.0).
lii="https://www.law.cornell.edu/regulations/delaware"
get admin-code-14-101-3.0-assessments.html "$lii/14-Del-Admin-Code-SS-101-3.0"
get admin-code-14-101-5.0-levels.html "$lii/14-Del-Admin-Code-SS-101-5.0"
get admin-code-14-501-1.0-content-standards.html "$lii/14-Del-Admin-Code-SS-501-1.0"

cd "$out"
sha256sum *.json *.html > SHA256SUMS
echo "Saved to $out"
