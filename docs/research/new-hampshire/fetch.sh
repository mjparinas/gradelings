#!/usr/bin/env bash
# Downloads New Hampshire's standards used by build_outcomes.py and the parent guides, as the Achievement Standards
# Network (ASN, run by D2L) publishes them for the New Hampshire jurisdiction:
#   D2522215  NH Common Core State Standards for Mathematics (2010; the New Hampshire College and Career Ready Standards)
#   D2522919  NH Common Core State Standards for English Language Arts & Literacy (2010)
#   D2777191  NH Career & College-Ready Science Standards (NGSS), adopted 2016
#   D10002B7  K-12 Social Studies New Hampshire Curriculum Framework (2006, the framework still in force)
# Each is the "_full.json" export (every statement with its code, text and grade levels) plus the document record
# (".json"), which names the Department of Education's own file it was built from.
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
#
# www.education.nh.gov and the General Court's statutes site (gc.nh.gov) answer automated downloads with
# "Access Denied" (HTTP 403), so the Department's PDFs are not fetched here; see README.md.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$(mkdir -p "${1:-$here/source}" && cd "${1:-$here/source}" && pwd)"

asn="https://asn.desire2learn.com/resources"
get() {
  curl -fsSL --retry 3 -o "$out/$1" "$2"
  sleep 1
}
for pair in math:D2522215 ela:D2522919 science:D2777191 social:D10002B7; do
  name="${pair%%:*}"
  id="${pair##*:}"
  get "asn-$name-$id.json" "$asn/${id}_full.json"
  get "asn-$name-$id-document.json" "$asn/$id.json"
done
get asn-new-hampshire.html "$asn/ASNJurisdiction/NH"   # ASN's list of New Hampshire documents, with their status

cd "$out"
sha256sum *.json *.html > SHA256SUMS
echo "Saved to $out"
