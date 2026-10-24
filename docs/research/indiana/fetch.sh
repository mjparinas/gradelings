#!/usr/bin/env bash
# Downloads the Indiana Academic Standards used by Gradelings into a folder, from the Indiana Department of Education
# (IDOE, in.gov/doe/students/indiana-academic-standards/). These are the 2023 standards, the ones schools teach until
# the 2026 math and social studies revisions start in 2027-28. Plain curl works with a browser user agent.
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
ua="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
get() {
  curl -fsSL --retry 3 --max-time 300 -A "$ua" -o "$out/$1.pdf" "$2"
  sleep 1
}
m="https://media.doe.in.gov/standards/indiana-academic-standards"
w="https://www.in.gov/doe/files"
for g in kindergarten grade-1 grade-2 grade-3 grade-4 grade-5 grade-6 grade-7 grade-8; do
  get "math-$g" "$m-$g-mathematics.pdf"
  get "science-$g" "$m-$g-science.pdf"
done
get math-algebra-1 "$w/Indiana-Academic-Standards-Algebra-I-.pdf"
get math-geometry "$m-geometry.pdf"
get ela-kindergarten "$m-kindergarten-english_language-arts.pdf"
get ela-grade-1 "$w/Indiana-Academic-Standards-Grade-1-English_Language-Arts.pdf"
for g in grade-2 grade-3 grade-4 grade-5 grade-6 grade-7 grade-8 grade-9-10; do
  get "ela-$g" "$m-$g-english_language-arts.pdf"
done
get science-biology "$m-biology.pdf"
get science-icp "$m-integrated-chemistry-and-physics.pdf"
get social-kindergarten "$m-kindergarten-social-studies.pdf"
get social-grade-1 "$m-grade-1-social-studies.pdf"
for g in 2 3 4 5; do get "social-grade-$g" "$w/Indiana-Academic-Standards-Grade-$g-Social-Studies.pdf"; done
get social-grade-6 "$w/Indiana-Academic-Standards-Grade-6-Social-Studies_.pdf"
get social-grade-6-civics "$w/Indiana-Academic-Standards-Grade-6-Middle-School-Civics.pdf"
get social-grade-7 "$m-grade-7-social-studies.pdf"
get social-grade-8 "$m-grade-8-social-studies.pdf"
get social-us-government "$w/Indiana-Academic-Standards-U.S.-Government.pdf"
get social-economics "$m-economics.pdf"
# The IDOE correlation guides between the 2023 standards and the Common Core, used to match units to Indiana codes.
c="$w"
get corr-math-kindergarten "$c/Kindergarten-Math-2023-IAS-CCSS-Correlation-Guide.pdf"
for g in 1 2 3 4 5 6 7 8; do get "corr-math-grade-$g" "$c/Grade-$g-Math-2023-IAS-CCSS-Correlation-Guide.pdf"; done
get corr-math-algebra-1 "$c/Algebra-I-2023-IAS-CCSS-Correlation-Guide.pdf"
get corr-math-geometry "$c/Geometry-2023-IAS-CCSS-Correlation-Guide.pdf"
get corr-ela-kindergarten "$c/Kindergarten-ELA-2023-IAS-CCSS-Correlation-Guide-1.pdf"
get corr-ela-grade-1 "$c/Grade-1-ELA-2023-IAS-CCSS-Correlation-Guide-2.pdf"
get corr-ela-grade-2 "$c/Grade-2-ELA-2023-IAS-CCSS-Correlation-Guide.pdf"
get corr-ela-grade-3 "$c/Grade-3-ELA-2023-IAS-CCSS-Correlation-Guide-final.pdf"
for g in 4 5 6 7 8; do get "corr-ela-grade-$g" "$c/Grade-$g-ELA-2023-IAS-CCSS-Correlation-Guide.pdf"; done
get corr-ela-grade-9-10 "$c/Grades-9-10-ELA-2023-IAS-CCSS-Correlation-Guide.pdf"
(cd "$out" && for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt"; done && sha256sum *.pdf > SHA256SUMS)
echo "Saved to $out"
