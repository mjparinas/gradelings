"""Builds outcomes.json from the Utah Core Standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Reads the pdftotext -layout copies (.txt) that fetch.sh saves beside each PDF; needs nothing outside the standard library.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Grade 9 lists the high school courses the app teaches.

Codes, as the documents print them after the word "Standard":
  math      the Utah Core Standards for Mathematics: grade, domain and number, "K.CC.1", "4.NBT.5", "8.EE.7".
            Grade 9 is Secondary Mathematics I (its section of the high school document only): "A.CED.1", "F.LE.2".
  language  the 2023 Utah State Standards for English Language Arts: grade, strand and number, "4.R.5", "2.W.3",
            "K.SL.2". Grades 7 and 8 share the band "7-8.R.5" (printed with an en dash) and Grade 9 cites "9-10.R.5".
            Standards printed only as "Mastered in ...", "Begins in ..." or "Not applicable ..." are left out.
  science   the Utah Science with Engineering Education (SEEd) standards: grade, strand and number, "4.2.1".
            Grade 9 cites Biology, "BIO.1.2", and Earth and Space Science, "ESS.2.3".
  social    the Utah Core Standards for Social Studies: Kindergarten to Grade 6 by grade, strand and number, "4.3.2";
            Grade 7 is Utah Studies, "UT.2.1"; Grade 8 is United States History I, "USI.3.4"; Grade 9 is World
            Geography, "WG.1.2".

Each code's text is what follows it on the line where it is printed (a standard that runs on to the next line keeps its
first line only); the contract checks only the codes.
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def add(grade, subject, code, text):
    text = re.sub(r"\s+", " ", text).strip()
    if re.match(r"(Mastered in|Begins in|Not applicable)", text):
        return
    OUT[f"{grade}/{subject}"].setdefault(code, text)


def lines(src, name):
    path = src / name
    if not path.exists():
        fail(f"missing {path}; run fetch.sh first")
    return path.read_text(encoding="utf-8").splitlines()


def grade_of(head):
    return "k" if head == "K" else head


def build(src):
    # Mathematics, Kindergarten to Grade 8.
    for name in ["math-elementary.txt", "math-middle.txt"]:
        for line in lines(src, name):
            for m in re.finditer(r"Standard ((K|[1-8])\.[A-Z]+\.\d+)\s+(.*)", line):
                add(grade_of(m.group(2)), "math", m.group(1), m.group(3))
    # Secondary Mathematics I, from its heading to the honors standards.
    inside = False
    for line in lines(src, "math-high.txt"):
        if line.strip() == "SECONDARY MATHEMATICS I":
            inside = True
        elif line.strip().startswith("SECONDARY MATHEMATICS I—HONORS"):
            inside = False
        if inside:
            for m in re.finditer(r"Standard ((?:SI\.MP|N\.Q|N\.RN|A\.[A-Z]+|F\.[A-Z]+|G\.[A-Z]+|S\.[A-Z]+)\.\d+)\s+(.*)", line):
                add("9", "math", m.group(1), m.group(2))
    # English language arts.
    for line in lines(src, "ela.txt"):
        for m in re.finditer(r"Standard (K|[1-6]|7–8|9–10)\.(R|W|SL)\.(\d+):?\s+(.*)", line):
            head, strand, num, text = m.groups()
            if head == "7–8":
                for g in ["7", "8"]:
                    add(g, "language", f"7-8.{strand}.{num}", text)
            elif head == "9–10":
                add("9", "language", f"9-10.{strand}.{num}", text)
            else:
                add(grade_of(head), "language", f"{head}.{strand}.{num}", text)
    # Science (SEEd).
    for line in lines(src, "science-seed.txt"):
        for m in re.finditer(r"Standard ((K|[1-8]|BIO|ESS)\.\d+\.\d+)\s+(.*)", line):
            head = m.group(2)
            add("9" if head in ("BIO", "ESS") else grade_of(head), "science", m.group(1), m.group(3))
    # Social studies, Kindergarten to Grade 6.
    for line in lines(src, "social-elementary.txt"):
        for m in re.finditer(r"Standard ((K|[1-6])\.\d+\.\d+):?\s+(.*)", line):
            add(grade_of(m.group(2)), "social", m.group(1), m.group(3))
    # Social studies, Grades 7 to 12: Utah Studies (7), United States History I (8) and World Geography (9).
    for line in lines(src, "social-7-12.txt"):
        for m in re.finditer(r"(UT|U\.S\. I|WG) Standard (\d+\.\d+):?\s+(.*)", line):
            course, num, text = m.groups()
            prefix, grade = {"UT": ("UT", "7"), "U.S. I": ("USI", "8"), "WG": ("WG", "9")}[course]
            add(grade, "social", f"{prefix}.{num}", text)


def main():
    here = Path(__file__).resolve().parent
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else here / "source"
    build(src)
    data = OrderedDict()
    for key, codes in OUT.items():
        if not codes:
            fail(f"no standards for {key}")
        data[key] = [{"idx": code, "kind": "standard", "content": text} for code, text in codes.items()]
    out = here / "outcomes.json"
    out.write_text(json.dumps(data, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {out} ({sum(len(v) for v in data.values())} standards)")
    for key, items in data.items():
        print(f"  {key}: {len(items)}")


if __name__ == "__main__":
    main()
