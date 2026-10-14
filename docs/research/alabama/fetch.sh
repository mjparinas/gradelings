#!/usr/bin/env bash
# Downloads Alabama's official Courses of Study into a folder (default: source/) for build_outcomes.py, and makes the
# `pdftotext -layout` text beside each PDF. The files come from the Alabama State Department of Education
# (www.alabamaachieves.org), which allows scripted downloads.
set -euo pipefail
out="${1:-$(dirname "$0")/source}"
mkdir -p "$out"
base="https://www.alabamaachieves.org/wp-content/uploads"
get() { curl -fsSL -A "Mozilla/5.0" -o "$out/$1" "$base/$2"; command -v pdftotext >/dev/null && pdftotext -layout "$out/$1" "$out/${1%.pdf}.txt"; echo "$1"; }
# Mathematics: 2019 Alabama Course of Study: Mathematics.
get math.pdf 2022/09/AS_2022923_CAS-2019-Alabama-Mathematics-COS_V1.0.pdf
# English language arts: 2021 Alabama Course of Study: English Language Arts.
get ela.pdf 2023/06/CAS_202353_2021-Alabama-Course-of-Study-English-Language-Arts_V1.0.pdf
# Science: 2023 Alabama Course of Study: Science, version 1.1.
get science.pdf 2024/08/AS_20240816_2023-Alabama-Course-of-Study-Science_V1.1.pdf
# Social studies: 2024 Alabama Course of Study: Social Studies (adopted December 2024, in schools from 2026-27).
get social.pdf 2025/01/AS_20250110_2024-Alabama-Course-of-Study-Social-Studies_V1.0.pdf
echo "Saved to $out"
