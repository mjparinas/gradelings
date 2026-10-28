#!/usr/bin/env bash
# Downloads Wyoming's content standards and related documents used by build_outcomes.py and the parent guides: the
# Wyoming Department of Education's "All Currently-Adopted Standards" compilations for Kindergarten to Grade 8 and high
# school (as of July 2025; Grade 8 reposted December 2025), which hold every adopted set in force (English language arts
# 2012, mathematics 2023, science 2023, social studies 2014+2018); the 2012 English language arts standards on their own;
# the State Board's Chapter 10 rules (July 2025), which adopt the standards; the Department's adoption timeline
# (September 2025); the WY-TOPP cut-score FAQ; and Title 21 (Education) of the Wyoming Statutes from wyoleg.gov. Writes a
# plain-text copy of each PDF (pdftotext -layout) and SHA256SUMS.
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
#
# edu.wyoming.gov puts its pages behind a browser check, but the files under /wp-content/uploads/ and /downloads/
# answer plain curl (no user agent), so only those are fetched.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$(mkdir -p "${1:-$here/source}" && cd "${1:-$here/source}" && pwd)"
get() {
  curl -fsSL --retry 3 -o "$out/$1" "$2"
  sleep 1
}
wde="https://edu.wyoming.gov/wp-content/uploads"
get k.pdf "$wde/2024/07/2025-Kindergarten-Comprehensive-WYCPS_no-PLDs_public.pdf"
for g in 1 2 3 4 5 6 7; do get "g$g.pdf" "$wde/2024/07/2025-Grade-$g-Comprehensive-WYCPS_no-PLDs_public.pdf"; done
get g8.pdf "$wde/2025/12/2025-Grade-8-Comprehensive-WYCPS_no-PLDs_public.pdf"
get hs.pdf "$wde/2024/08/2025-High-School-Comprehensive-WYCPS_no-PLDs_public.pdf"
get ela-2012.pdf "https://edu.wyoming.gov/downloads/standards/final-2012-ela-standards.pdf"
get chapter-10-rules-2025.pdf "$wde/2025/08/WDE-Ch-10-Rules-7.16.25_24898.pdf"
get adoption-timeline-2025.pdf "$wde/2024/10/State-Standards-Adoption-and-Implementation-Timeline-2010-2025.pdf"
get wy-topp-cut-scores-faq.pdf "$wde/2019/05/WY-TOPP-Cut-Scores-FAQ.pdf"
# Wyoming Statutes, Title 21 (Education): 21-2-202 and 21-3-110 (student data guidelines and district policies),
# 21-4-602 (American Indian educational program) and 21-9-102 (United States and Wyoming constitutions).
get statutes-title-21.pdf "https://wyoleg.gov/statutes/compress/title21.pdf"

cd "$out"
for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
sha256sum *.pdf *.txt > SHA256SUMS
echo "Saved to $out"
