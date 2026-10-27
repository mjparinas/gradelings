#!/usr/bin/env bash
# Downloads South Dakota's content standards and related documents used by build_outcomes.py and the parent guides:
# the South Dakota State Standards for Mathematics (2018, taught in 2026-27) and the 2026 mathematics standards that
# replace them (adopted May 4, 2026, kept for the switch), the English Language Arts Standards (adopted April 14, 2025,
# taught from 2026-27), the Science Standards (adopted April 22, 2024) with Appendix C (engineering design), the Social
# Studies Standards (adopted April 17, 2023), the Department of Education's 2026-27 assessment milestones and test
# administration guide, its sample individual student report, and SDCL 13-3-51.1 to 13-3-51.6 (privacy of student
# records). Writes a plain-text copy of each PDF (pdftotext -layout) and SHA256SUMS.
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
#
# doe.sd.gov and sdlegislature.gov answer plain curl with a browser user agent. The Legislature's statute pages are
# UTF-16 HTML.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$(mkdir -p "${1:-$here/source}" && cd "${1:-$here/source}" && pwd)"
ua="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
get() {
  curl -fsSL --retry 3 -A "$ua" -o "$out/$1" "$2"
  sleep 1
}
std="https://doe.sd.gov/contentstandards/documents"
# Mathematics: the 2018 standards (in classrooms until the 2026 standards take over) and the 2026 standards.
get math-2018.pdf "$std/0521-Math-Standards.pdf"
get math-2026.pdf "$std/0526-MathStandards.pdf"
# English language arts: adopted April 14, 2025 (transition year 2025-26, taught 2026-27, assessed spring 2027).
get ela-2025.pdf "$std/ELAStandards-25.pdf"
# Science: adopted April 22, 2024, and Appendix C, the engineering design standards.
get science-2024.pdf "$std/24-SciStandards.pdf"
get science-appendix-c.pdf "$std/ApxCengin.pdf"
# Social studies: adopted April 17, 2023.
get social-2023.pdf "$std/SS-Standards-2023.pdf"
# State tests: 2026-27 assessment milestones, the test administration guide and the sample individual student report.
asm="https://doe.sd.gov/assessment/documents"
get assessment-milestones-2026-27.pdf "$asm/Milestones-26.pdf"
get test-administration-guide-2026.pdf "$asm/SDTSAGuide-26.pdf"
get individual-student-report-sample.pdf "$asm/ISR-des.pdf"
# Student records privacy: SDCL 13-3-51.1 to 13-3-51.6 (SL 2014, ch 76).
for s in 13-3-51.1 13-3-51.2 13-3-51.3 13-3-51.4 13-3-51.5 13-3-51.6; do
  get "sdcl-$s.htm" "https://sdlegislature.gov/api/Statutes/$s.html?all=true"
done

cd "$out"
for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
sha256sum *.pdf *.txt *.htm > SHA256SUMS
echo "Saved to $out"
