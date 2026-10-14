#!/usr/bin/env bash
# Downloads Alaska's content standards (Alaska Department of Education and Early Development), the Cultural Standards for
# Students (Alaska Native Knowledge Network) and the quick guide to statewide assessments into a folder.
# Usage: ./fetch.sh <dir>   then   python3 -I build_outcomes.py <dir>
# The committed copies are in source/ (checksums in source/SHA256SUMS). education.alaska.gov resets connections that
# don't send a browser user agent, so curl sends one.
set -euo pipefail
out="${1:?usage: fetch.sh <dir>}"
mkdir -p "$out"
base="https://education.alaska.gov"
get() {
  curl -fsSL --retry 3 -A "Mozilla/5.0 (X11; Linux x86_64)" -o "$out/$1" "$2"
  sleep 1
}
# Mathematics (adopted June 2012), from education.alaska.gov/standards.
get math.pdf "$base/akstandards/math/adopted_math.pdf"
# English language arts (adopted June 2012).
get ela.pdf "$base/akstandards/ela/Adopted_ELA.pdf"
# Science Standards for Alaska (adopted June 2019; NGSS performance expectations).
get science.pdf "$base/akstandards/science/science-standards-for-alaska.pdf"
# Social studies (adopted December 2024).
get social.pdf "$base/akstandards/Adopted-AK-SS-Standards-2024.pdf"
# Quick Guide to Required Statewide Assessments (AK STAR and the Alaska Science Assessment, 2026-27).
get assessments-quick-guide.pdf "$base/assessments/Quick_Guide_to_Required_Statewide_Assessments.pdf"
# Alaska Standards for Culturally-Responsive Schools (1998), from the Alaska Native Knowledge Network.
get cultural-standards.html "https://www.uaf.edu/ankn/publications/guides/alaska-standards-for-cult/"
echo "Saved to $out"
