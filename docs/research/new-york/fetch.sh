#!/usr/bin/env bash
# Downloads NYSED's standards documents into a cache folder for build_outcomes.py. They are public, so they are not
# committed. www.nysed.gov leaves out its intermediate certificate (GlobalSign RSA OV SSL CA 2018), so pass a CA bundle
# that holds it with CURL_CA_BUNDLE if curl reports "unable to get local issuer certificate".
set -euo pipefail
out="${1:?usage: fetch.sh <cache folder>}"
mkdir -p "$out"
base="https://www.nysed.gov/sites/default/files/programs/standards-instruction"
get() { curl -fsSL -A "Mozilla/5.0" -o "$out/$1" "$base/$2"; echo "$1"; }
# Math: NYS Next Generation Mathematics Learning Standards (2017), Pre-K to Grade 8 and Algebra I.
get math.pdf nys-next-generation-mathematics-p-12-standards.pdf
# English language arts: NYS Next Generation English Language Arts Learning Standards (2017).
get ela.pdf nys-next-generation-ela-standards.pdf
# Science: NYS P-12 Science Learning Standards (adopted December 2016), by band.
get science-p-2.pdf p-2-science-learning-standards.pdf
get science-3-5.pdf 3-5-science-learning-standards.pdf
get science-ms.pdf ms-science-learning-standards.pdf
get science-hs.pdf hs-science-learning-standards.pdf
# Social studies: NYS K-12 Social Studies Framework, K-8 (with the 2016 revisions) and 9-12 (with the 2017 updates),
# plus its introduction (reference only).
get social-k-8.pdf ss-framework-k-8a2.pdf
get social-9-12.pdf framework-9-12-with-2017-updates.pdf
get social-intro.pdf ss-framework-k-12-intro.pdf
echo "Saved to $out"
