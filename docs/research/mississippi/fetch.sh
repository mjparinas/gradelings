#!/usr/bin/env bash
# Downloads the Mississippi College- and Career-Readiness Standards (math 2025, English language arts 2025, science
# 2026 and social studies 2022), the Social-Emotional Learning standards, and the MAAP page and performance level table
# used by build_outcomes.py and the guides, with a plain-text copy of each PDF (pdftotext -layout).
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
#
# mdek12.org answers curl only with a browser user agent, and its firewall now and then refuses a request (403), so
# each download is retried.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="${1:-$here/source}"
mkdir -p "$out"
ua="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
up=https://www.mdek12.org/wp-content/uploads/sites
old=https://www.mdek12.org/sites/default/files

get() {
  for _ in 1 2 3 4 5; do
    if curl -sSfL -A "$ua" -o "$out/$1" "$2"; then return 0; fi
    sleep 3
  done
  echo "could not download $2" >&2
  return 1
}

get math-2025.pdf "$up/38/2025/07/CCRS-MATH-2025-ADA-Version-FINAL-July-14-2025.pdf"
get ela-2025.pdf "$up/38/2025/07/2025_MS_CCRS_for_ELA.pdf"
get science-2026.pdf "$up/38/2026/07/2026-MS-CCRS-Science_SBE-Approved-07.23.2026_3.pdf"
get social-2022.pdf "$old/Offices/Secondary%20Ed/Social%20Studies/mde_ccrs_social_studies_standards_final_filing_jan_25_2023.pdf"
get sel.pdf "$old/Offices/Secondary%20Ed/sel_standards_final_updated.pdf"
get maap-scale-scores.pdf "$up/41/2025/09/maap_scale_score_tables-updated_9.11.2025.pdf"
get maap.html "https://mdek12.org/studentassessment/maap/"

for f in "$out"/*.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
(cd "$out" && sha256sum -- *.pdf *.html > SHA256SUMS)
echo "Downloaded to $out"
