"""Builds outcomes.json, the Indiana Academic Standards that Gradelings cites, from the files in source/.

Usage: python3 -I build_outcomes.py [source-dir]

Reads the text extracts (pdftotext -layout, made by fetch.sh) of the 2023 Indiana Academic Standards. Every coded
standard becomes {"idx": code, "kind": domain, "content": text} under "<grade>/<subject>", where grade is k, 1 to 9 and
subject is math, language, science or social.

- Mathematics: "4.NS.1" (grade, domain, number). Grade 9 lists Algebra I ("AI.L.1") and Geometry ("G.T.1"). The
  Process Standards (PS.1 to PS.8) are listed under every grade.
- English/language arts: "4.RC.1" (grade, domain, number); Grade 9 lists the Grades 9-10 standards ("9-10.RC.1").
- Science: the performance expectations each grade's document lists, written as in the Next Generation Science
  Standards ("4-PS3-1", "MS-LS1-1", "3-5-ETS1-1"). Grade 9 lists Biology and Integrated Chemistry and Physics
  ("HS-LS1-1", "HS-PS1-1", "HS-ICP1-1").
- Social studies: "4.H.1" (grade, domain, number). Grade 6 adds the Middle School Civics course ("6.CIV.1"); Grade 9
  lists United States Government ("USG.1.1") and Economics ("E.1.1").
"""

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "source")
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
NAME = {"k": "kindergarten", **{g: f"grade-{g}" for g in GRADES[1:9]}}

# (subject, file stem, grades it is listed under, code pattern)
G = r"(?:K|[1-8])"
FILES: list[tuple[str, str, list[str], str]] = []
for g in GRADES[:9]:
    FILES.append(("math", f"math-{NAME[g]}", [g], rf"{G}\.[A-Z]{{1,3}}\.\d+|PS\.\d"))
    FILES.append(("language", f"ela-{NAME[g]}", [g], rf"{G}\.(?:RF|RC|W|CC)\.\d+"))
    FILES.append(("science", f"science-{NAME[g]}", [g], r"(?:K|[1-5]|MS|K-2|3-5)-(?:PS|LS|ESS|ETS)\d-\d+"))
    FILES.append(("social", f"social-{NAME[g]}", [g], rf"{G}\.(?:H|C|G|E)\.\d+"))
FILES += [
    ("math", "math-algebra-1", ["9"], r"AI\.[A-Z]+\.\d+|PS\.\d"),
    ("math", "math-geometry", ["9"], r"G\.[A-Z]+\.\d+"),
    ("language", "ela-grade-9-10", ["9"], r"9-10\.(?:RF|RC|W|CC)\.\d+"),
    ("science", "science-biology", ["9"], r"HS-(?:LS|ETS)\d-\d+"),
    ("science", "science-icp", ["9"], r"HS-(?:PS|ICP|ETS)\d-\d+"),
    ("social", "social-grade-6-civics", ["6"], r"6\.CIV\.\d+"),
    ("social", "social-us-government", ["9"], r"USG\.\d+\.\d+"),
    ("social", "social-economics", ["9"], r"E\.\d+\.\d+"),
]
DOMAIN = {
    "NS": "Number Sense", "CA": "Computation and Algebraic Thinking", "G": "Geometry", "M": "Measurement",
    "DA": "Data Analysis", "AF": "Algebra and Functions", "RP": "Ratio and Proportional Reasoning", "NF": "Number Sense",
    "EE": "Expressions and Equations", "GM": "Geometry and Measurement", "C": "Civics and Government", "PS": "Process Standard",
    "RF": "Reading Foundations", "RC": "Reading Comprehension", "W": "Writing", "CC": "Communication and Collaboration",
    "H": "History", "E": "Economics", "CIV": "Middle School Civics", "USG": "United States Government",
}


def clean(text: str) -> str:
    return " ".join(text.replace("●", " ").replace("​", "").split())


def kind_of(subject: str, code: str) -> str:
    if subject == "science":
        return "Performance Expectation"
    if code.startswith("USG."):
        return DOMAIN["USG"]
    if re.match(r"E\.\d", code):
        return "Economics"
    parts = code.split(".")
    key = parts[1] if len(parts) > 2 else parts[0]
    if subject == "math" and key == "G":
        return "Geometry"
    if subject == "social" and key == "G":
        return "Geography"
    return DOMAIN.get(key, key)


def blocks(lines: list[str]) -> list[list[str]]:
    out: list[list[str]] = []
    cur: list[str] = []
    for line in lines:
        if line.strip():
            cur.append(line)
        elif cur:
            out.append(cur)
            cur = []
    if cur:
        out.append(cur)
    return out


def parse(path: str, pattern: str, subject: str) -> list[tuple[str, str]]:
    with open(path, encoding="utf-8") as f:
        lines = f.read().split("\n")
    found: dict[str, str] = {}
    order: list[str] = []
    code_at = re.compile(rf"^\s{{0,16}}({pattern})(?![\w.-])(.*)$")
    if subject == "science":
        # "4-PS3-1           Use evidence to construct..." followed by indented lines; the line above it, the same code
        # with the topic ("4-PS3-1 Energy"), is followed by "Students who demonstrate understanding can:".
        for i, line in enumerate(lines):
            m = re.match(rf"^\s{{0,4}}({pattern})\.?\s+(\S.*)$", line)
            if not m or m.group(1) in found or lines[i + 1].startswith("Students who demonstrate"):
                continue
            text = [m.group(2)]
            for nxt in lines[i + 1 :]:
                nxt = re.sub(r"^Essential(?=\s{3,})", "", nxt)
                if re.match(r"^\s{10,}\S", nxt):
                    text.append(nxt)
                else:
                    break
            found[m.group(1)] = clean(" ".join(text))
            order.append(m.group(1))
        return [(c, found[c]) for c in order]
    bs = blocks(lines)
    for bi, b in enumerate(bs):
        for li, line in enumerate(b):
            m = code_at.match(line)
            if not m:
                continue
            code = m.group(1)
            if code in found:
                continue
            if code.startswith("PS."):
                found[code] = clean(m.group(2).lstrip(": "))
                order.append(code)
                continue
            others = [code_at.match(x) for x in b]
            text = [re.sub(rf"^\s{{0,16}}{re.escape(code)}", "", x) for x, o in zip(b, others) if not o or o.group(1) == code]
            joined = clean(" ".join(text))
            # The code sits beside the middle of its text, so a block that starts at the code line may have its first
            # lines in the block above (layout text puts a blank line where the code column is empty).
            if (not joined or joined.startswith("Examples") or li == 0) and bi > 0:
                prev = bs[bi - 1]
                if not any(code_at.match(x) for x in prev) and not re.search(r"Indiana Academic Standards|Learning Outcome|^\s*\d+\s*$", " ".join(prev)):
                    joined = clean(" ".join(prev) + " " + joined)
            found[code] = re.sub(r"\s*\(E\)", "", joined)
            order.append(code)
    return [(c, found[c]) for c in order]


def main() -> None:
    out: dict[str, list[dict[str, str]]] = {f"{g}/{s}": [] for g in GRADES for s in ("math", "language", "science", "social")}
    seen: dict[str, set[str]] = {k: set() for k in out}
    for subject, stem, grades, pattern in FILES:
        for code, text in parse(os.path.join(SRC, f"{stem}.txt"), pattern, subject):
            if code.startswith("PS.") and not text:
                continue
            for g in grades:
                key = f"{g}/{subject}"
                if code in seen[key]:
                    continue
                seen[key].add(code)
                out[key].append({"idx": code, "kind": kind_of(subject, code), "content": text})
    with open(os.path.join(HERE, "outcomes.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
        f.write("\n")
    print({k: len(v) for k, v in out.items()})


if __name__ == "__main__":
    main()
