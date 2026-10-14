"""Rebuilds expectations.json from the API responses saved by fetch.sh.

Usage: python3 -I build_outcomes.py [source-dir] [out-file]
Defaults: source/ and expectations.json next to this script.

Each saved course holds the course item and, in "modular_content", the items it links to.
Walking sections -> strands -> overall expectations -> specific expectations in order gives
every strand (l3), overall (l4) and specific (l5) expectation as published. Other linked items
(notes, SEL supports, tables) are skipped. Text is the rich text with tags removed and spaces
collapsed; nothing in the downloads is executed.
"""
import html
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent

SOURCE = (
    "Ontario Ministry of Education, Curriculum and Resources (https://www.dcp.edu.gov.on.ca/en/curriculum), "
    "read from the site's public content API on 2026-10-09. Mathematics (2020, Grades 1-8), Language (2023, "
    "Grades 1-8), Kindergarten Curriculum (2026). French as a Second Language (2013, Grades 4-8 Core, 1-8 "
    "Immersion; FSF1D and FIF1D, Grade 9), Mathematics MTH1W (2021) and English ENL1W (2023), Grade 9. Science "
    "and Technology (2022, Grades 1-8), SNC1W (Grade 9); Social Studies (2023, Grades 1-6), Geography (Grades "
    "7-8), History (2018, Grades 7-8) and CGC1W (Grade 9)."
)
FORMAT = (
    "Keys are 'grade/subject' (grade k, 1-9). Each entry has idx (e.g. B1.1), kind (strand, overall or "
    "specific), title and content as published."
)

# Output key -> saved files (fetch.sh names), in the committed order.
PLAN = {}
for g in range(1, 9):
    PLAN[f"{g}/math"] = [f"math-2020-g{g}"]
for g in range(1, 9):
    PLAN[f"{g}/language"] = [f"language-2023-g{g}"]
PLAN["k/all"] = ["kindergarten-2026"]
for g in range(4, 9):
    PLAN[f"{g}/core-french"] = [f"fsl-core-2013-g{g}"]
PLAN["9/core-french"] = ["g9-fsf1d"]
for g in range(1, 9):
    PLAN[f"{g}/immersion"] = [f"fsl-immersion-2013-g{g}"]
PLAN["9/immersion"] = ["g9-fif1d"]
PLAN["9/math"] = ["g9-mth1w-2021"]
PLAN["9/language"] = ["g9-enl1w-2023"]
for g in range(1, 9):
    PLAN[f"{g}/science"] = [f"science-2022-g{g}"]
PLAN["9/science"] = ["g9-snc1w-2022"]
for g, ed in [(1, 2023), (2, 2023), (3, 2023), (4, 2018), (5, 2018), (6, 2023)]:
    PLAN[f"{g}/social"] = [f"social-studies-{ed}-g{g}"]
for g in (7, 8):
    # Geography then History; their strand letters repeat, so the app names the subject.
    PLAN[f"{g}/social"] = [f"geography-2018-g{g}", f"history-g{g}"]
PLAN["9/social"] = ["g9-cgc1w-2024"]

KINDS = {
    "l3___strand": "strand",
    "l4___overall_expectation": "overall",
    "l5___specific_expectation": "specific",
}
FOLLOW = ("sections", "overall_expectations", "specific_expectations")


def text(rich):
    rich = re.sub(r"<object[^>]*>.*?</object>", "", rich, flags=re.S)
    rich = re.sub(r"<[^>]+>", "", rich)
    return re.sub(r"\s+", " ", html.unescape(rich)).strip()


def expectations(path):
    data = json.loads(path.read_text(encoding="utf-8"))
    linked = data["modular_content"]
    out, seen = [], set()

    def visit(item):
        kind = KINDS.get(item["system"]["type"])
        el = item["elements"]
        if kind:
            name = item["system"]["codename"]
            if name in seen:
                return
            seen.add(name)
            out.append({
                "idx": el["title_index"]["value"].strip(),
                "kind": kind,
                "title": text(el["title"]["value"]),
                "content": "" if kind == "strand" else text(el["content"]["value"]),
            })
        for field in FOLLOW:
            if field in el and el[field]["type"] == "modular_content":
                for ref in el[field]["value"]:
                    if ref in linked:
                        visit(linked[ref])

    visit(data["item"])
    if not out:
        sys.exit(f"{path.name}: no expectations found")
    return out


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "source"
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else HERE / "expectations.json"
    result = {"_source": SOURCE, "_format": FORMAT}
    for key, files in PLAN.items():
        result[key] = [e for f in files for e in expectations(src / f"{f}.json")]
    dst.write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Wrote {dst} ({len(PLAN)} grade/subject keys)")


if __name__ == "__main__":
    main()
