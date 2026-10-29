#!/usr/bin/env bash
# Downloads Yukon's Early Kindergarten Policy (Department of Education, effective August 20, 2021) into source/, which
# is committed. Pre-K citations are checked against BC's list (docs/research/bc/prek/outcomes.json).
# Usage: ./fetch.sh [dir]
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/early-kindergarten-policy-2021.pdf" "https://open.yukon.ca/information/d29fd0f4-dd63-4444-94ca-7a1476b76583/resource/df2ddc79-8f5d-35b7-ba4c-353c6ddea537/download/early-kindergarten-policy-2021.pdf"
pdftotext -layout "$out/early-kindergarten-policy-2021.pdf" "$out/early-kindergarten-policy-2021.txt"
echo "Saved to $out"
