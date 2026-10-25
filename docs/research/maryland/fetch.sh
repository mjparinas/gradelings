#!/usr/bin/env bash
# Downloads the Maryland standards used by Gradelings into a folder, as published by the Common Standards Project
# (api.commonstandardsproject.com, a public copy of each state's standards documents with their codes).
# marylandpublicschools.org answers scripted requests with HTTP 403 (Cloudflare), so the sources are the Common
# Standards Project's copies of MSDE's documents; each file names the MSDE page it was taken from (sourceURL).
# Usage: ./fetch.sh [dir]   (default: source)   then   python3 -I build_outcomes.py [dir]
set -euo pipefail
out="${1:-source}"
mkdir -p "$out"
api="https://api.commonstandardsproject.com/api/v1/standard_sets"
md="49FCDFBD2CF04033A9C347BFA0584DF0"
get() {
  curl -fsSL --retry 3 -o "$out/$1.json" "$api/$2"
  sleep 1
}
# Maryland College and Career Ready Standards for Mathematics, revised 2025 (the MCCRS math crosswalks).
get math-k 0AE75876489948439FC3E6F667FFAE7E
get math-1 E5DAAB6E8CA24B3EBA431FDD93B0A8D9
get math-2 585CBCE5361F4C919C5E2A80082BF3F3
get math-3 19F6BF48B5834FE2B738D60E6A79C3F4
get math-4 CA1D73F270174D65B2262BCC82463BF9
get math-5 E1E9B83938E24E4E81F851E8F2B66295
get math-6 FE5FBDB2728B4CB9B65B420A533582AA
get math-7 C5071DFCC5084F59800EED65C2205CFF
get math-8 F365C392F37149C8B0AE5E2647ABF5D8
get math-algebra-1 BF1E3F0FBC4346EDADD41938FC09182B
get math-geometry CFE3E70D315E40E8BC9386DE6E32B194
# Maryland College and Career Ready Standards for English Language Arts (2022).
get ela-k 413F8CEC944C4A7084B4A4BEF1A743CB
get ela-1 3FC2D02A6B4B469D9800867F326B8734
get ela-2 864804F631AD445F903B0AF3B519EDCA
get ela-3 04C44A104B1D42309CC2BD3557DDCAC6
get ela-4 7B5B2E9572F0415F9BFFE6B47A4D97C4
get ela-5 4C29F7293DA0420EBF98A486EDC35544
get ela-6 F1AC506DD69F4A9CB4312F5615CDFD86
get ela-7 584BAB1E84FD414A97C60A0B3072D063
get ela-8 40C759583A9C4194BA8E9138E72B3442
get ela-9-10 869D03A402C24965AA76E12B1A46DFBC
# Maryland adopted the Next Generation Science Standards in 2013.
for g in k 01 02 03 04 05; do get "science-${g#0}" "${md}_D2599722_grade-$g"; done
get science-ms "${md}_D2599722_grades-06-07-08"
get science-hs-ets "${md}_D2599722_grades-09-10-11-12"
get science-hs-ls1 C331C4EC70704B16B9CD18E84C6881F6
get science-hs-ls2 80A1D6921B50440A9E89C73B855DCB54
get science-hs-ls3 1B05CF0826AD4F4FBC59F7C98DEC292D
get science-hs-ls4 37F9098501E3486F80554E1D96E3F00A
get science-hs-ps1 CF687287BBC84B4CAE1A5EF73F6E587C
get science-hs-ps2 53356BFE4C0E453A89C6D218BD2002C0
get science-hs-ps3 9A08F7DE100B42648289A7E2E3A73005
get science-hs-ps4 9A01230C1C92430585FE225AD49EA3DA
get science-hs-ess1 FDCE412A10A740B1A6D3179CC36B67BB
get science-hs-ess2 5ED2368E08E24F7FA15AE718EA769C42
get science-hs-ess3 99191641B29E4344B45F9EA3041912C3
# Maryland Social Studies Framework (2021), with the revised Grades 6-7 framework (2025).
get social-k "${md}_D21255207_grade-k"
get social-1 "${md}_D21254783_grade-01"
get social-2 "${md}_D21254984_grade-02"
get social-3 "${md}_D21255056_grade-03"
get social-4 "${md}_D21255106_grade-04"
get social-5 "${md}_D21255160_grade-05"
get social-6-7 C8252EFCD488477BA678E73F7F05DE50
get social-8 "${md}_D21254682_grade-08"
get social-government "${md}_D21255317_grades-09-10-11-12"
get social-core "${md}_D21255450_grades-01-02-03-04-05-06-07-08-09-10-11-12-k-pre-k"
(cd "$out" && for f in *.json; do python3 -c "import json,sys; d=json.load(open(sys.argv[1])); json.dump(d, open(sys.argv[1],'w'), indent=1, sort_keys=True, ensure_ascii=False)" "$f"; done && sha256sum *.json > SHA256SUMS)
echo "Saved to $out"
