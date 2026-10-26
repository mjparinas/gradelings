"""Builds outcomes.json from Nebraska's College and Career Ready Standards (Nebraska Department of Education; see
fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Reads the pdftotext copies (math.txt, ela.txt, science.txt, social.txt) that fetch.sh saves.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Grade 9 lists the high school standards (math, science, social studies) and the
Grades 9-10 band of English language arts, which the document codes with a 10 ("LA.10.RP.1").

Codes, as the documents print them (each standard and each lettered indicator is listed):
  math      "MA." then grade, strand and number, with an indicator letter: "MA.K.N.1.a", "MA.4.N.2.b", "MA.6.R.1.a"
            (ratios and proportions, Grades 6 and 7 only), "MA.HS.A.3.c". The document prints the codes without the
            "MA." in its tables and with it in its coding example, which the citations follow. The Advanced Topics
            standards ("AT.") are left out.
  language  "LA.4.F.3.a" (foundations of reading), "LA.4.RP.1" (reading prose and poetry), "LA.4.RI.6" (reading
            informational text), "LA.4.V.1.b" (vocabulary), "LA.4.W.1.c" (writing), "LA.1.FW.1.a" (foundations of
            writing), "LA.4.SL.1.a" (speaking and listening). Indicators are printed as "a." under their standard.
  science   "SC.4.2.1.a": grade, topic number, standard number and indicator letter; high school "SC.HS.1.1.a".
  social    "SS 4.1.1.a" with a space after SS, as printed: grade, strand (1 civics, 2 economics, 3 geography,
            4 history), standard and indicator; high school "SS HS.1.1.a". Standards marked "Not addressed at this
            level" are left out. High school history prints a course after the code ("SS HS.4.1.a (US)", "(World)"),
            which the code drops.
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


def clean(text):
    for a, b in (("‐", "-"), ("–", "-"), ("—", "-"), ("’", "'"), ("‘", "'"), ("“", '"'), ("”", '"'), (" ", " ")):
        text = text.replace(a, b)
    return re.sub(r"\s+", " ", text).strip()


def grade_of(label):
    label = label.strip().upper()
    if label == "K":
        return "k"
    if label in ("HS", "10"):
        return "9"
    return label if label in GRADES else None


def add(grade, subject, idx, content):
    entries = OUT[f"{grade}/{subject}"]
    if idx not in entries:
        entries[idx] = {"idx": idx, "kind": "standard", "content": clean(content)}
        return True
    return False


def extend(grade, subject, idx, more):
    entry = OUT[f"{grade}/{subject}"][idx]
    if len(entry["content"]) < 500:
        entry["content"] = clean(entry["content"] + " " + more)


# Lines that end a running standard: page furniture, headings and side notes.
FURNITURE = re.compile(
    r"^(Page \d+|\d+ \| P a g e|\d+|Approved by the Nebraska State Board.*|Nebraska Social Studies Standards|"
    r"Grade \d+|Kindergarten|High School.*|.*Standards$|█.*|NE .*)$"
)


# Printing slips in the documents, put right before matching: "HS. N.1.e" and "HS.G1.i" (math), "SC.HS11.1." (science), "3.G.1.1" for 3.G.1.a (math),
# "SS. 3.4.1", "SS 2.2.1.a." and high school standards printed without "SS " ("HS.2.5", "HS.4.1 (US)") in social studies.
TYPOS = [
    (re.compile(r"^3\.G\.1\.1 "), "3.G.1.a "),
    (re.compile(r"^HS\. ([NAGD])\."), r"HS.\1."),
    (re.compile(r"^HS\.([NAGD])(\d)"), r"HS.\1.\2"),
    (re.compile(r"^SC\.HS(\d)"), r"SC.HS.\1"),
    (re.compile(r"^((?:SC\.|SS )\S+?)\.(\s)"), r"\1\2"),
    (re.compile(r"^SS\. "), "SS "),
    (re.compile(r"^(HS\.\d\.\d)"), r"SS \1"),
    (re.compile(r"^(SS HS\.\S+) \((US|World)\)"), r"\1"),
]


TWO_CODES = re.compile(r"\s(?:SS|SC|LA|MA)[ .](?:K|\d|HS)\.")


def fix(line):
    for pattern, repl in TYPOS:
        line = pattern.sub(repl, line)
    return line


def parse(text, subject, code_re, to_code, skip=None, indicator_re=None):
    """Walks the text: a code line starts an entry; indented lines continue it until a blank line or furniture."""
    current = None  # (grade, idx)
    parent = None  # the standard that "a." indicators belong to (English language arts)
    for raw in text.split("\n"):
        line = fix(raw.strip())
        m = code_re.match(line)
        if m and TWO_CODES.search(line[12:]):
            # A row of a side-by-side table (the Grades 6-8 social studies overview): the grade sections list each
            # standard on its own.
            current = parent = None
            continue
        if m:
            grade, idx, body = to_code(m)
            body = body[len(idx) + 1:] if body.startswith(idx + " ") else body  # "SC.3.7.2.b SC.3.7.2.b Analyze ..."
            if grade is None or (skip and skip.search(body)):
                current = None
                continue
            current = (grade, idx) if add(grade, subject, idx, body) else None
            parent = current
            continue
        if indicator_re and parent:
            i = indicator_re.match(raw)
            if i:
                grade, idx = parent
                code = f"{idx}.{i.group(1)}"
                current = (grade, code) if add(grade, subject, code, i.group(2)) else None
                continue
        if not line or FURNITURE.match(line):
            current = None
            if not line:
                continue
            parent = None if line.startswith("█") else parent
            continue
        if current:
            extend(current[0], subject, current[1], line)


def math(src):
    code = re.compile(r"^((K|[1-8]|HS)\.([NRAGD])\.(\d+)(?:\.([a-z]))?)\s+(\S.*)$")

    def to_code(m):
        return grade_of(m.group(2)), "MA." + m.group(1), m.group(6)

    parse((src / "math.txt").read_text(encoding="utf-8"), "math", code, to_code)


def ela(src):
    code = re.compile(r"^LA\.(K|[1-8]|10)\.(F|FW|RP|RI|V|W|SL)\.(\d+)\s+(\S.*)$")

    def to_code(m):
        return grade_of(m.group(1)), f"LA.{m.group(1)}.{m.group(2)}.{m.group(3)}", m.group(4)

    parse((src / "ela.txt").read_text(encoding="utf-8"), "language", code, to_code,
          indicator_re=re.compile(r"^\s{1,8}([a-z])\.\s+(\S.*)$"))


def science(src):
    code = re.compile(r"^SC\.(K|[1-8]|HS)\.(\d+\.\d+(?:\.[a-z])?)\s+(\S.*)$")

    def to_code(m):
        return grade_of(m.group(1)), f"SC.{m.group(1)}.{m.group(2)}", m.group(3)

    # The optional High School Plus standards (SC.HSP), and the crosswalk tables after them, are left out.
    text = (src / "science.txt").read_text(encoding="utf-8").split("PLUS STANDARDS (OPTIONAL)")[0]
    parse(text, "science", code, to_code)


def social(src):
    code = re.compile(r"^SS (K|[1-8]|HS)\.(\d\.\d+(?:\.[a-z])?)\s+(\S.*)$")

    def to_code(m):
        return grade_of(m.group(1)), f"SS {m.group(1)}.{m.group(2)}", m.group(3)

    parse((src / "social.txt").read_text(encoding="utf-8"), "social", code, to_code,
          skip=re.compile(r"^Not addressed at this level"))


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "source")
    math(src)
    ela(src)
    science(src)
    social(src)
    out = OrderedDict((k, list(v.values())) for k, v in OUT.items())
    (Path(__file__).parent / "outcomes.json").write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(sum(len(v) for v in out.values()), "standards")


if __name__ == "__main__":
    main()
