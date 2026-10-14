#!/usr/bin/env bash
# Downloads the Ontario curriculum (Ministry of Education, https://www.dcp.edu.gov.on.ca/en/curriculum)
# from the public content API the site itself reads (https://ws.api.dcp.edu.gov.on.ca/content/api).
# Each course is saved as the raw API response: the course item plus, in "modular_content", every
# strand, overall expectation and specific expectation it links to (depth=6).
# Usage: ./fetch.sh [dir]   (default: source/ next to this script)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
OUT="${1:-$(dirname "$0")/source}"
mkdir -p "$OUT"
API=https://ws.api.dcp.edu.gov.on.ca/content/api
# Only the fields the expectations live in (and the links between them), so the files stay small.
FIELDS=name,code,year_issued,course_slug,site___grade,sections,overall_expectations,specific_expectations,title_index,title,content
get() { # file, query (path after /content/api/)
  curl -fsS --retry 3 -A "Mozilla/5.0" -o "$OUT/$1" "$API/$2"
}
course() { # file, item codename
  get "$1.json" "items/$2?language=en-CA&depth=6&elements=$FIELDS"
}

# Index of every curriculum document (L1) and every course or grade (L2), for provenance.
get curricula.json "items?system.type=l1___curriculum&language=en-CA&depth=0"
get courses.json "items?system.type=l2___course&language=en-CA&elements=code,name,year_issued,course_slug,site___grade&depth=0&limit=2000"

# The Kindergarten Program (2026), Junior and Senior Kindergarten.
course kindergarten-2026 kindergarten

# Mathematics (2020), Grades 1 to 8. The Grade 7 item's codename is "grade_6__copy_".
for g in 1 2 3 4 5 6 8; do course "math-2020-g$g" "ele___math___grade_$g"; done
course math-2020-g7 ele___math___grade_6__copy_

# Language (2023), Grades 1 to 8. The en-CA version of these items is English Language;
# fr-CA is Français, which this app doesn't use.
for g in 1 2 3 4 5 6 7 8; do course "language-2023-g$g" "lang___fra___grade_$g"; done

# Science and Technology (2022), Grades 1 to 8.
for g in 1 2 3 4 5 6 7 8; do course "science-2022-g$g" "sci___tech___grade_$g"; done

# Social Studies (Grades 1 to 6; Grades 1-3 and 6 are the 2023 edition, Grades 4-5 the 2018 edition),
# Geography (2018) and History (Grades 7 and 8; the site labels the current History items 2026).
course social-studies-2023-g1 sshg___grade_1
course social-studies-2023-g2 sshg___grade_1__copy_
course social-studies-2023-g3 sshg___grade_2__copy_
course social-studies-2018-g4 sshg___grade_3__copy_
course social-studies-2018-g5 sshg___grade_4__copy_
course social-studies-2023-g6 sshg___grade_5__copy_
course geography-2018-g7 sshg___grade_6__copy_
course geography-2018-g8 geography___grade_7__copy_
course history-g7 hist___grade_7__2025_
course history-g8 hist___grade_7__2025___copy_

# French as a Second Language (2013): Core French Grades 4 to 8, French Immersion Grades 1 to 8.
course fsl-core-2013-g4 fsl___core___grade_4
course fsl-core-2013-g5 fsl___core___grade_4__copy_
course fsl-core-2013-g6 fsl___core___grade_5__copy_
course fsl-core-2013-g7 fsl___core___grade_6__copy_
course fsl-core-2013-g8 fsl___core___grade_7__copy_
course fsl-immersion-2013-g1 fsl___immersion___grade_1
course fsl-immersion-2013-g2 fsl___immersion___grade_1__copy_
course fsl-immersion-2013-g3 fsl___immersion___grade_2__copy_
course fsl-immersion-2013-g4 fsl___extended___grade_4__copy__bb04c0f
course fsl-immersion-2013-g5 fsl___immersion___grade_4__copy_
course fsl-immersion-2013-g6 fsl___immersion___grade_5__copy_
course fsl-immersion-2013-g7 fsl___immersion___grade_6__copy_
course fsl-immersion-2013-g8 fsl___immersion___grade_7__copy_

# Grade 9 courses: MTH1W (2021), ENL1W (2023), SNC1W (2022), CGC1W (2024),
# Core French FSF1D and French Immersion FIF1D (French as a Second Language, 2014).
course g9-mth1w-2021 math___grade_9_course
course g9-enl1w-2023 eng1d___fra1d
course g9-snc1w-2022 snc1w
course g9-cgc1w-2024 cgd3m__copy_
course g9-fsf1d fsf1d__copy__e4b4a9b
course g9-fif1d fif1d__copy__66a3c72

echo "Saved to $OUT"
