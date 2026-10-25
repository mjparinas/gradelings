"""Builds outcomes.json from the Oklahoma Academic Standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Reads the pdftotext -layout copies (.txt) that fetch.sh saves beside each PDF; needs nothing outside the standard library.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. High school courses are listed under Grade 9.

Codes, as the documents print them:
  math      the 2022 standards: grade, strand, standard and objective, "K.N.1.1", "4.GM.2.3". Grade 8 is Pre-Algebra,
            "PA.A.1.1", and Grade 9 is Algebra 1, "A1.F.1.2".
  language  the 2021 standards: grade, standard, strand and objective, "4.2.R.1", "4.5.W.2", "K.2.PA.3"; a few are
            printed without an objective number, "3.2.PA", "4.7.R".
  science   the 2026 standards: grade, core idea and number, "4.PS3.2", "K.ESS2.1". Grade 9 cites Physical Science,
            "PS.PS1.1", and Biology, "B.LS1.1". The engineering standards are printed once per grade band
            ("K2.ETS1.1" for Kindergarten to Grade 2, "G35", "MS" and "HS") and listed under each grade of the band.
  social    the 2026 standards: grade (or course), strand, standard and objective, "3.C.2.4", "8.P.1.1". Grade 9 cites
            Oklahoma History and Government, "OKH.C.3.2", and United States Government, "USG.C.1.4".

Each code's text is what follows it in its column on the line where it is printed (a standard that runs on to the next
line keeps its first line only); the contract checks only the codes.
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)

PATTERNS = {
    "math": r"(?:K|[1-7]|PA|A1)\.(?:N|A|GM|D|F)\.\d+\.\d+",
    "language": r"(?:K|[1-9])\.[1-8]\.(?:PWS|PA|PC|SE|R|W|F|L|S)(?:\.\d+)?",
    "science": r"(?:K|[1-8]|PS|B)\.(?:PS|LS|ESS|ETS)\d\.\d+|(?:K2|G35|MS|HS)\.ETS1\.\d+",
    "social": r"(?:K|[1-8]|OKH|USG)\.(?:C|P)\.\d+\.\d+",
}

FILES = {"math": "math-2022.txt", "language": "ela-2021.txt", "science": "science-2026.txt", "social": "social-2026.txt"}


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


# The engineering standards are printed once per grade band; each grade in the band lists them.
BANDS = {"K2": ["k", "1", "2"], "G35": ["3", "4", "5"], "MS": ["6", "7", "8"], "HS": ["9"]}


def grades_of(code):
    head = code.split(".")[0]
    if head in BANDS:
        return BANDS[head]
    if head == "K":
        return ["k"]
    if head.isdigit():
        return [head]
    if head == "PA":
        return ["8"]
    return ["9"]


def read(path):
    text = path.read_text(encoding="utf-8")
    # The documents put zero-width spaces between words and around codes.
    return text.replace("​", "").replace(" ", " ")


def collect(subject, text):
    rx = re.compile(r"(?<![\w.])(" + PATTERNS[subject] + r")(?![\w.]*\d)")
    for line in text.split("\n"):
        hits = list(rx.finditer(line))
        for i, m in enumerate(hits):
            end = hits[i + 1].start() if i + 1 < len(hits) else len(line)
            rest = line[m.end() : end]
            rest = re.split(r"\s{4,}", rest.strip())[0] if rest.strip() else ""
            code = m.group(1)
            for grade in grades_of(code):
                bucket = OUT[f"{grade}/{subject}"]
                if code not in bucket:
                    bucket[code] = {"idx": code, "kind": "standard", "content": re.sub(r"\s+", " ", rest).strip()}
                elif not bucket[code]["content"] and rest:
                    bucket[code]["content"] = re.sub(r"\s+", " ", rest).strip()


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "source")
    for subject, name in FILES.items():
        collect(subject, read(src / name))
    for key, bucket in OUT.items():
        if not bucket:
            fail(f"no standards for {key}")
    out = OrderedDict((k, sorted(v.values(), key=lambda o: [(0, int(p), "") if p.isdigit() else (1, 0, p) for p in o["idx"].split(".")])) for k, v in OUT.items())
    path = Path(__file__).parent / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print({k: len(v) for k, v in out.items()})


if __name__ == "__main__":
    main()
