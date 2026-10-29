#!/usr/bin/env bash
# Downloads Capable, Confident, and Curious: Nova Scotia's Early Learning Curriculum Framework into source/, which is
# committed. Pre-primary follows it. Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
curl -fsSL --retry 3 -o "$out/early-learning-curriculum-framework.pdf" "https://www.ednet.ns.ca/docs/nselcurriculumframework.pdf"
pdftotext -layout "$out/early-learning-curriculum-framework.pdf" "$out/early-learning-curriculum-framework.txt"
echo "Saved to $out"
