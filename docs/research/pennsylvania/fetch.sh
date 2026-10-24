#!/usr/bin/env bash
# Downloads the Pennsylvania Department of Education's academic standards into source/ again (run from anywhere; the
# default folder is source/ beside this script). Pennsylvania publishes them on the Standards Aligned System (SAS):
#   https://www.pdesas.org/Standard/StandardsDownloads   (math, ELA, civics, economics, geography, history, personal finance)
#   https://pdesas.org/Page/Viewer/ViewPage/58/?SectionPageItemId=12998   (STEELS, the science standards)
# SAS gives every file a changing link (files5.pdesas.org/<token>/Download.ashx), so this script reads each page and
# picks the links by their visible titles. Editions as downloaded on 2026-10-23:
#   pacore-math.pdf              PA Core Standards, Mathematics, Grades PreK-12 (March 1, 2014)
#   pacore-ela-prek-5.pdf        PA Core Standards, English Language Arts, Grades PreK-5
#   pacore-ela-6-12.pdf          PA Core Standards, English Language Arts, Grades 6-12
#   steels-2023.pdf              Science, Technology & Engineering, and Environmental Literacy & Sustainability (STEELS) Standards, K-12 (revised May 2023)
#   civics-{primary,elementary,secondary}.pdf      Academic Standards for Civics and Government (Pre-K to 3, Grades 3 to 8, Grades 9 to 12)
#   geography-{primary,elementary,secondary}.pdf   Academic Standards for Geography
#   history-{primary,elementary,secondary}.pdf     Academic Standards for History
#   economics-2026.pdf           Academic Standards for Economics (takes effect July 1, 2026)
#   personal-finance-2026.pdf    Academic Standards for Personal Finance (takes effect July 1, 2026)
# After downloading, run `python3 -I build_outcomes.py --write` and commit the new files with the rebuilt outcomes.json.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
out="${1:-$here/source}"
mkdir -p "$out"

python3 -I - "$out" <<'PY'
import html
import re
import subprocess
import sys
from pathlib import Path

out = Path(sys.argv[1])
DOWNLOADS = "https://www.pdesas.org/Standard/StandardsDownloads"
STEELS = "https://pdesas.org/Page/Viewer/ViewPage/58/?SectionPageItemId=12998"

# file name -> (page, the link title it starts with)
WANT = {
    "pacore-math": (DOWNLOADS, "PA Core - Mathematics, Grades PreK-12"),
    "pacore-ela-prek-5": (DOWNLOADS, "PA Core- English Language Arts, Grades PreK-5"),
    "pacore-ela-6-12": (DOWNLOADS, "PA Core- English Language Arts, Grades 6-12"),
    "steels-2023": (STEELS, "STEELS Standards Revised"),
    "civics-primary": (DOWNLOADS, "Academic Standards for Civics and Government (Primary)"),
    "civics-elementary": (DOWNLOADS, "Academic Standards for Civics and Government (Elementary)"),
    "civics-secondary": (DOWNLOADS, "Academic Standards for Civics and Government (Secondary)"),
    "geography-primary": (DOWNLOADS, "Academic Standards for Geography (Primary)"),
    "geography-elementary": (DOWNLOADS, "Academic Standards for Geography (Elementary)"),
    "geography-secondary": (DOWNLOADS, "Academic Standards for Geography (Secondary)"),
    "history-primary": (DOWNLOADS, "Academic Standards for History (Primary)"),
    "history-elementary": (DOWNLOADS, "Academic Standards for History (Elementary)"),
    "history-secondary": (DOWNLOADS, "Academic Standards for History (Secondary)"),
    "economics-2026": (DOWNLOADS, "Academic Standards for Economics (Takes"),
    "personal-finance-2026": (DOWNLOADS, "Academic Standards for Personal Finance"),
}


def get(url: str) -> bytes:
    return subprocess.run(["curl", "-sS", "-m", "300", "-L", url], check=True, capture_output=True).stdout


pages = {}
for name, (page, title) in WANT.items():
    if page not in pages:
        pages[page] = get(page).decode("utf-8", "ignore")
    for m in re.finditer(r'<a[^>]+href="(https://files5\.pdesas\.org/[^"]+)"[^>]*>(.*?)</a>', pages[page], flags=re.S):
        text = html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", m.group(2)))).strip()
        if text.startswith(title):
            pdf = out / f"{name}.pdf"
            pdf.write_bytes(get(html.unescape(m.group(1))))
            subprocess.run(["pdftotext", "-layout", str(pdf), str(out / f"{name}.txt")], check=True)
            print(f"{name}: {pdf.stat().st_size} bytes")
            break
    else:
        sys.exit(f"no link titled '{title}' on {page}")
PY
