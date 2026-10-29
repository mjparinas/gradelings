#!/usr/bin/env bash
# Junior Kindergarten uses the Kindergarten Curriculum (2026), which ../fetch.sh downloads into ../source/
# (kindergarten-2026.json) and ../build_outcomes.py turns into ../expectations.json. Refresh those, then rebuild here.
set -euo pipefail
here="$(dirname "$0")"
"$here/../fetch.sh"
(cd "$here/.." && python3 -I build_outcomes.py source expectations.json)
python3 -I "$here/build_outcomes.py"
