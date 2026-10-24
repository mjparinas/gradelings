"""Builds outcomes.json, the Colorado Academic Standards that Gradelings cites, from the files in source/.

Usage: python3 -I build_outcomes.py [source-dir]

Each source file is a Common Standards Project copy of one CDE standards document for one grade or band (see fetch.sh).
Every coded statement becomes {"idx": code, "kind": label, "content": text} under "<grade>/<subject>", where grade is
k, 1 to 9 and subject is math, language, science or social. Grade 9 lists the high school standards (mathematics, the
Grades 9-10 reading, writing and communicating standards, science and social studies); middle school science is one
Grades 6-8 band, listed under Grades 6, 7 and 8. The Holocaust and genocide standards are listed with social studies.
"""

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "source")
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8"]

# (source file, subject, grades it is listed under)
FILES = []
for g in GRADES:
    FILES += [(f"math-{g}", "math", [g]), (f"rwc-{g}", "language", [g]), (f"social-{g}", "social", [g])]
for g in ["k", "1", "2", "3", "4", "5"]:
    FILES.append((f"science-{g}", "science", [g]))
FILES += [
    ("science-ms", "science", ["6", "7", "8"]),
    ("science-hs", "science", ["9"]),
    ("math-hs", "math", ["9"]),
    ("rwc-9-10", "language", ["9"]),
    ("social-hs", "social", ["9"]),
    ("holocaust-6", "social", ["6"]),
    ("holocaust-7", "social", ["7"]),
    ("holocaust-8", "social", ["8"]),
    ("holocaust-hs", "social", ["9"]),
]


def main() -> None:
    out: dict[str, list[dict[str, str]]] = {f"{g}/{s}": [] for g in GRADES + ["9"] for s in ("math", "language", "science", "social")}
    for name, subject, grades in FILES:
        with open(os.path.join(SRC, f"{name}.json"), encoding="utf-8") as f:
            data = json.load(f)["data"]
        items = sorted(data["standards"].values(), key=lambda x: x.get("position", 0))
        for item in items:
            code = (item.get("statementNotation") or "").strip()
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
