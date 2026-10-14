#!/usr/bin/env bash
# Downloads the official BC curriculum documents (curriculum.gov.bc.ca, www2.gov.bc.ca) that the ca-bc
# standards and Big Ideas are copied from, plus the K-12 Student Reporting Policy documents behind the
# Provincial Proficiency Scale. Saves each PDF and a `pdftotext -layout` copy.
# Usage: ./fetch.sh [dir]   (default: source/ next to this script; needs curl and pdftotext, pandoc optional)
# Yukon and the Northwest Territories follow this curriculum; their own fetch.sh files fetch only what they add.
set -euo pipefail
OUT="${1:-"$(dirname "$0")/source"}"
mkdir -p "$OUT/pdf" "$OUT/txt" "$OUT/html"
UA="Mozilla/5.0"
CUR=https://curriculum.gov.bc.ca/sites/curriculum.gov.bc.ca/files
GOV=https://www2.gov.bc.ca/assets/gov/education/administration

get() { # name, url: a PDF, kept with its text
  curl -fsSL --retry 3 -A "$UA" -o "$OUT/pdf/$1.pdf" "$2"
  pdftotext -layout "$OUT/pdf/$1.pdf" "$OUT/txt/$1.txt"
}
page() { # name, url: an HTML page, kept with a plain-text copy when pandoc is installed
  curl -fsSL --retry 3 -A "$UA" -o "$OUT/html/$1.html" "$2"
  if command -v pandoc >/dev/null; then pandoc -f html -t plain --wrap=none "$OUT/html/$1.html" -o "$OUT/txt/$1.txt"; fi
}

# --- Curriculum, Kindergarten to Grade 9. The "elab" PDFs hold every grade's Big Ideas, Curricular
# Competencies and Content with their elaborations, so the plain k-9 PDFs (the same text without
# elaborations) are not downloaded.
get math_k-9 "$CUR/curriculum/mathematics/en_mathematics_k-9_elab.pdf"                       # Mathematics K-9
get ela_k-9 "$CUR/curriculum/english-language-arts/en_english-language-arts_k-9_elab.pdf"    # English Language Arts K-9
get science_k-9 "$CUR/curriculum/science/en_science_k-9_elab.pdf"                            # Science K-9
get social_k-9 "$CUR/curriculum/social-studies/en_social-studies_k-9_elab.pdf"               # Social Studies K-9
get immersion_k-9 "$CUR/curriculum/fral/en_fral_k-9_elab.pdf"   # Français langue seconde – immersion K-9 (English edition)
# The English edition's fonts have no text mapping, so its .txt is mostly symbols; read the PDF itself.
# The French edition below extracts cleanly and is the text to search.
get immersion_k-9_fr "$CUR/curriculum/fral/fr_fral_k-9_elab.pdf" # Français langue seconde – immersion M-9 (French edition)
get core-french_5-10 "$CUR/curriculum/languages/en_languages_5-10_core-french.pdf"          # Core French 5-10 (we use 5-9)

# --- Supports cited in our copy and guides.
get indigenous-social_k-12 "$CUR/curriculum/indigenous-knowledge-and-perspectives/social-studies-K-12-indigenous-knowledge-and-perspectives.pdf" # Indigenous knowledge and perspectives, social studies
get glossary "$CUR/pdf/supports/glossary.pdf"                                                 # Curriculum glossary
page competencies https://curriculum.gov.bc.ca/competencies                                   # Core Competencies overview

# --- Reporting: the K-12 Student Reporting Policy (in force since 2023-24) and the four-point
# Provincial Proficiency Scale (Emerging, Developing, Proficient, Extending) used Kindergarten to Grade 9.
page reporting-policy https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/student-reporting # the policy itself
get reporting-guidelines "$GOV/kindergarten-to-grade-12/k-12-student-reporting-policy-communicating-student-learning-guidelines.pdf" # Communicating Student Learning guidelines
get student-reporting-order "$GOV/legislation-policy/legislation/schoollaw/e/m184-23.pdf"     # Ministerial Order M184/23, Student Reporting Order
get proficiency-scale "$GOV/kindergarten-to-grade-12/unpacking-the-proficency-scale-support-for-educators.pdf" # Unpacking the Proficiency Scale (sic: "proficency" in the URL)
get reporting-one-pager "$CUR/pdf/reporting/K-12-student-reporting-one-pager-for-parents-and-caregivers.pdf" # parent and caregiver one-pager
get reporting-k-9 "$CUR/pdf/reporting/k-12-reporting-policy-the-f-letter-grade-and-k-9-reporting.pdf" # K-9 reporting and the F letter grade
get reporting-faq "$CUR/pdf/reporting/faq-on-k-12-reporting-for-educators-and-school-leaders.pdf" # FAQ for educators and school leaders
page reporting https://curriculum.gov.bc.ca/reporting                                         # curriculum site's reporting page (links to all of the above)

echo "Saved to $OUT"
