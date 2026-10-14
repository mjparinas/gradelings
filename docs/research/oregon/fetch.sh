#!/usr/bin/env bash
# Downloads Oregon's K-12 content standards from the Oregon Department of Education (ODE) into a cache folder.
# Usage: ./fetch.sh [dir]   then   python3 -I build_outcomes.py source   (dir defaults to source/ in this folder, which is committed)
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
base="https://www.oregon.gov/ode/educator-resources/standards"
# oregon.gov answers some clients without a browser user agent with an error page.
get() { curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$out/$1" "$base/$2"; }
# Mathematics: 2021 standards (version 2021.3). The workbook is the source; the PDF is used to check every code.
get math.xlsx mathematics/Documents/2021OregonMathStandards.xlsx
get math.pdf "mathematics/Documents/2021%20Oregon%20Math%20Standards_new%20template%20version.pdf"
# English language arts and literacy: 2026 standards (version 2026.1), the full K-12 file.
get ela.pdf "ELA/Documents/ODE_2026_ELA_Standards%20-%20Grade%20(K12)_Final.pdf"
# Science: 2022 standards (version 2022.1), standards only (grade-placed middle school codes).
get science.pdf "science/Documents/K-12%20Science%20Standards_vf.pdf"
# Science crosswalk 2014 (NGSS) to 2022, kept for reference.
get science-crosswalk.pdf "science/Documents/2022%20K-12%20Science%20Standards_Crosswalk%20vfinal.pdf"
# Social science: 2024 standards (version 2024.1), in force from 2026-27.
get social.pdf "socialsciences/Documents/2024_Social_Science_Standards_2024_PDF_Version.pdf"
echo "Saved to $out"
