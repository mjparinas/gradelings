#!/usr/bin/env bash
# Downloads California's K-12 content standards from the California Department of Education (CDE) into a cache folder.
# Usage: ./fetch.sh <cache-dir>   then   python3 -I build_outcomes.py <cache-dir>
# The files are public and download without a login, so they are not committed.
set -euo pipefail
out="${1:?usage: fetch.sh <cache-dir>}"
mkdir -p "$out"
base="https://www.cde.ca.gov"
# cde.ca.gov sits behind a Radware bot filter. The PDFs download with a browser user agent, but HTML pages
# (and, after a burst of requests, sometimes PDFs) come back as a "Radware Captcha Page" with HTTP 200.
# So every file is checked to be a real PDF, and the script pauses between downloads.
get() {
  curl -fsSL --retry 3 -A "Mozilla/5.0" -o "$out/$1" "$base/$2"
  if [ "$(head -c 5 "$out/$1")" != "%PDF-" ]; then
    echo "$1: not a PDF (probably the Radware captcha page); wait a few minutes and run again" >&2
    rm -f "$out/$1"
    exit 1
  fi
  sleep 2
}
# Mathematics: California Common Core State Standards for Mathematics (CA CCSSM), adopted August 2010,
# modified January 2013 (April 2014 electronic version). K-8 by grade and the higher mathematics courses.
get math.pdf be/st/ss/documents/ccssmathstandardaug2013.pdf
# English language arts: California Common Core State Standards for English Language Arts and Literacy in
# History/Social Studies, Science, and Technical Subjects, adopted August 2010, modified March 2013.
get ela.pdf be/st/ss/documents/finalelaccssstandards.pdf
# History-social science: History-Social Science Content Standards for California Public Schools, adopted
# October 1998.
get hss.pdf be/st/ss/documents/histsocscistnd.pdf
# The 2016 History-Social Science Framework (whole document), for the grade themes. Reference only.
get hss-framework.pdf ci/hs/cf/documents/hssframeworkwhole.pdf
# Science: Next Generation Science Standards for California Public Schools (CA NGSS), adopted September 2013.
# K-5 by grade, Grades 6-8 in the Preferred Integrated Model, high school by discipline.
sci="pd/ca/sc/documents"
get science-k.pdf "$sci/cangsskinder-topicdci.pdf"
get science-1.pdf "$sci/cangssgr1-dci.pdf"
get science-2.pdf "$sci/cangssgr2-dci.pdf"
get science-3.pdf "$sci/cangssgr3-dci.pdf"
get science-4.pdf "$sci/cangssgr4-dci.pdf"
get science-5.pdf "$sci/cangss-disccoreideasgr5.pdf"
get science-6.pdf "$sci/cangsspfintegrgr6.pdf"
get science-7.pdf "$sci/preferredintegratedgr7.pdf"
get science-8.pdf "$sci/preferredintegratedgr8.pdf"
get science-hs-ps.pdf "$sci/ngsshsphyicalscidci.pdf"
get science-hs-ls.pdf "$sci/cangsshs-dcilifesci.pdf"
get science-hs-ess.pdf "$sci/cangsshsearthspsci-dci.pdf"
get science-hs-ets.pdf "$sci/cangsshsengdesign-dci.pdf"
# The middle school progressions (integrated and discipline-specific models), used to check the grade placement.
get science-ms-progressions.pdf "$sci/middleschprogressions.pdf"
# 2016 Science Framework, chapter 5 (Grades 6-8, the Preferred Integrated Model) and chapter 7 (high school
# course models). Reference only.
get science-framework-ch5.pdf ci/sc/cf/documents/scifwchapter5.pdf
get science-framework-ch7.pdf ci/sc/cf/documents/scifwchapter7.pdf
echo "Saved to $out"
