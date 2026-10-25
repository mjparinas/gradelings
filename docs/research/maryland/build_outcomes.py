"""Builds outcomes.json, the Maryland standards that Gradelings cites, from the files in source/.

Usage: python3 -I build_outcomes.py [source-dir]

Each source file is a Common Standards Project copy of one MSDE standards document for one grade, band or course (see
fetch.sh). Every coded statement becomes {"idx": code, "kind": label, "content": text} under "<grade>/<subject>", where
grade is k, 1 to 9 and subject is math, language, science or social. Grade 9 lists Algebra I and Geometry, the Grades
9-10 English language arts standards, the high school science standards and American Government. Middle school science
is one Grades 6-8 band, listed under Grades 6, 7 and 8; the Grades 6 and 7 social studies framework is listed under both
grades. Section headings without a code are skipped. In the Grade 3 and Grade 6 mathematics copies a few codes carry
the previous standard's number in front (3.GR.C.6.7 for 3.GR.C.7, 6.NOS.C.8.9 for 6.NOS.C.9); FIXES drops it.
"""

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "source")
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8"]
HS_SCIENCE = ["ets", "ls1", "ls2", "ls3", "ls4", "ps1", "ps2", "ps3", "ps4", "ess1", "ess2", "ess3"]

# A standard number printed after the previous one ("3.GR.C.6.7") is that standard ("3.GR.C.7").
FIXES = re.compile(r"^(\d\.[A-Z]+\.[A-Z])\.\d+\.(\d+)")

# (source file, subject, grades it is listed under)
FILES = []
for g in GRADES:
    FILES += [(f"math-{g}", "math", [g]), (f"ela-{g}", "language", [g])]
for g in ["k", "1", "2", "3", "4", "5"]:
    FILES += [(f"science-{g}", "science", [g]), (f"social-{g}", "social", [g])]
FILES += [
    ("science-ms", "science", ["6", "7", "8"]),
    ("social-6-7", "social", ["6", "7"]),
    ("social-8", "social", ["8"]),
    ("math-algebra-1", "math", ["9"]),
    ("math-geometry", "math", ["9"]),
    ("ela-9-10", "language", ["9"]),
    ("social-government", "social", ["9"]),
]
FILES += [(f"science-hs-{s}", "science", ["9"]) for s in HS_SCIENCE]


def main() -> None:
    out: dict[str, list[dict[str, str]]] = {f"{g}/{s}": [] for g in GRADES + ["9"] for s in ("math", "language", "science", "social")}
    for name, subject, grades in FILES:
        with open(os.path.join(SRC, f"{name}.json"), encoding="utf-8") as f:
            data = json.load(f)["data"]
        items = sorted(data["standards"].values(), key=lambda x: x.get("position", 0))
        for item in items:
            code = FIXES.sub(r"\1.\2", (item.get("statementNotation") or "").strip().rstrip("."))
            if not code:
                continue
            row = {"idx": code, "kind": item.get("statementLabel") or "", "content": " ".join(item["description"].split())}
            for g in grades:
                key = f"{g}/{subject}"
                if all(r["idx"] != code for r in out[key]):
                    out[key].append(row)
    with open(os.path.join(HERE, "outcomes.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
        f.write("\n")
    print({k: len(v) for k, v in out.items()})


if __name__ == "__main__":
    main()
