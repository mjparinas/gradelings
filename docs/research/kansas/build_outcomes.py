"""Builds outcomes.json from the Kansas standards (Kansas State Department of Education; see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Reads the plain-text copies fetch.sh makes with `pdftotext -layout`; needs nothing beyond the standard library.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Spans are listed under every grade they cover: middle school science (MS) under 6, 7
and 8; high school science (HS), high school mathematics and English language arts Grades 9-10 under 9.

Codes, as the documents print them:
  math      Kansas Mathematics Standards (adopted 2017, reviewed 2024), by their 2017 codes: "4.NBT.1", "4.NF.3a"; high
            school "A.SSE.1", "F.IF.4", "F.LQE.2" (Kansas writes the high school domains with a dot, not the Common
            Core's dash). The bracketed 2010 Common Core tags after each standard are not codes of their own.
  language  Kansas Standards for English Language Arts (2023): "RF.4.3", "RL.4.2", "RI.4.11.a", "W.4.10", "SL.4.8";
            Grade 9 "RL.9-10.2". Kansas has no separate Language strand: grammar, conventions and vocabulary are the
            "Language in" standards inside reading (RL/RI .10 to .12), writing (W .10 and .11) and speaking and
            listening. Sub-standards are kept as printed ("RF.4.4a", "RL.4.11.a", "SL.4.1a"). "Not applicable" lines
            are left out.
  science   the Next Generation Science Standards performance expectations ("4-PS3-2", "MS-LS1-1", "HS-ESS2-4"),
            which Kansas adopted in 2013; engineering design ("3-5-ETS1-1") under each grade of its band.
  social    the Kansas History, Government, and Social Studies Standards (2020) have five standards with four
            benchmarks each ("1.1" to "5.4"), the same in every grade. Each grade lists the standards it teaches and
            reinforces (the Suggested Scope and Sequence): Kindergarten standard 1; Grade 1 standards 1 and 2; Grade 2
            standards 1, 2 and 4; Grade 3 standards 1 to 4; Grades 4 to 12 all five. The benchmarks are listed under
            exactly those grades, so a Kindergarten unit can only cite 1.1 to 1.4.
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    text = text.replace("‐", "-").replace("­", "").replace("–", "-").replace("ﬃ", "ffi").replace("ﬁ", "fi")
    return re.sub(r"\s+", " ", text).strip()


OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


def add(grade, subject, idx, kind, content):
    entries = OUT[f"{grade}/{subject}"]
    if idx not in entries:
        entries[idx] = {"idx": idx, "kind": kind, "content": clean(content)}


def grade_of(label):
    return "k" if label == "K" else label


def coded_lines(text, code_re):
    """Yields (code, description) for every line that starts with a code, joining the indented lines that follow."""
    lines = text.split("\n")
    i = 0
    while i < len(lines):
        m = code_re.match(lines[i])
        if not m:
            i += 1
            continue
        code, rest = m.group(1), m.group(2)
        desc = [rest]
        col = m.start(2)
        i += 1
        while i < len(lines):
            line = lines[i]
            if not line.strip() or code_re.match(line):
                break
            indent = len(line) - len(line.lstrip())
            if indent < col - 2:
                break
            desc.append(line.strip())
            i += 1
        yield code, " ".join(desc)


# ---------------------------------------------------------------- math
# Each standard carries two tags: its 2017 code, printed at the start of the line ("4.NBT.1", "8.G.1b."), and the
# 2010 Common Core code in brackets at the end ("[4.MD.5a]"), kept to find older resources. Kansas moved some standards
# in 2017 (angle measure from Grade 4 to Grade 8 Geometry, systems of equations from Grade 8 to high school algebra),
# so the 2017 code is the one cited.
MATH_CODE = re.compile(
    r"^\s{0,4}((?:K|[1-8])\.[A-Z]{1,3}\.\d{1,2}[a-e]?|[NAFGS]\.[A-Z]{1,3}\.\d{1,2}[a-e]?)\.?(?:\s*\([^)]*\))?\s+([A-Z][a-z].*)$"
)


def build_math(src):
    lines = (src / "math.txt").read_text(encoding="utf-8").split("\n")
    count = 0
    i = 0
    while i < len(lines):
        m = MATH_CODE.match(lines[i])
        if not m:
            i += 1
            continue
        code, col = m.group(1), m.start(2)
        desc = [m.group(2)]
        i += 1
        # The description runs on (past the blank lines that drawn fractions leave) to the bracketed 2010 tag, the next
        # code, a heading or the page footer.
        while "[" not in desc[-1] and i < len(lines):
            line = lines[i]
            indent = len(line) - len(line.lstrip())
            if MATH_CODE.match(line) or "ksde.gov" in line or (line.strip() and indent < col - 2):
                break
            desc.append(line.strip())
            i += 1
        text = re.split(r"\s*[\[(](?:[KNAFGS1-8]\.[A-Z]{1,3}\.\d|2017\))", " ".join(desc))[0]
        text = text.replace("★", "").strip()
        head = code.split(".")[0]
        grade = "9" if head in "NAFGS" else grade_of(head)
        add(grade, "math", code, "standard", text)
        count += 1
    if count < 400:
        fail(f"math: only {count} standards read")


# ---------------------------------------------------------------- language
ELA_CODE = re.compile(r"^\s{0,4}((?:RF|RL|RI|W|SL)\.(?:K|[1-8]|9-10|11-12)\.\d{1,2}(?:\.?[a-j])?)\s{2,}(\S.*)$")


def build_language(src):
    text = (src / "ela.txt").read_text(encoding="utf-8")
    count = 0
    for code, desc in coded_lines(text, ELA_CODE):
        if re.match(r"not applicable|begins in", desc, re.I):
            continue
        label = code.split(".")[1]
        if label == "11-12":
            continue
        grade = "9" if label == "9-10" else grade_of(label)
        add(grade, "language", code, "standard", desc)
        count += 1
    if count < 900:
        fail(f"language: only {count} standards read")


# ---------------------------------------------------------------- science
SCI_CODE = re.compile(r"^\s{0,4}((?:K|[1-5]|K-2|3-5|MS|HS)-(?:PS|LS|ESS|ETS)\d-\d{1,2})\.\s+(\S.*)$")


def science_grades(head):
    return {"MS": ["6", "7", "8"], "HS": ["9"], "K-2": ["k", "1", "2"], "3-5": ["3", "4", "5"]}.get(head, [grade_of(head)])


def build_science(src):
    text = (src / "science.txt").read_text(encoding="utf-8")
    codes = set()
    for code, desc in coded_lines(text, SCI_CODE):
        desc = re.split(r"\s*\[(?:Clarification|Assessment)", desc)[0].rstrip("*").strip()
        head = code.rsplit("-", 2)[0]
        for grade in science_grades(head):
            add(grade, "science", code, "performance expectation", desc)
        codes.add(code)
    if len(codes) < 200:
        fail(f"science: only {len(codes)} performance expectations read")


# ---------------------------------------------------------------- social
SOCIAL_BENCH = re.compile(r"^\s{0,4}([1-5]\.[1-4])\s{2,}(The student will.*)$")
SOCIAL_STANDARD = re.compile(r"^STANDARD ([1-5]) (.*)$")
# The Suggested Scope and Sequence: the standards each grade teaches and reinforces.
SOCIAL_SCOPE = {"k": [1], "1": [1, 2], "2": [1, 2, 4], "3": [1, 2, 3, 4]}


def build_social(src):
    text = (src / "social.txt").read_text(encoding="utf-8")
    start = text.index("STANDARD 1 CHOICES HAVE CONSEQUENCES")
    end = text.index("Best Practices", start)
    part = text[start:end]
    titles = {}
    for line in part.split("\n"):
        m = SOCIAL_STANDARD.match(line.strip())
        if m:
            titles[m.group(1)] = m.group(2)
    benchmarks = list(coded_lines(part, SOCIAL_BENCH))
    if len(benchmarks) != 20 or len(titles) != 5:
        fail(f"social: read {len(benchmarks)} benchmarks and {len(titles)} standards")
    for grade in GRADES:
        for code, desc in benchmarks:
            if int(code[0]) in SOCIAL_SCOPE.get(grade, [1, 2, 3, 4, 5]):
                add(grade, "social", code, "benchmark", desc)


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "source")
    build_math(src)
    build_language(src)
    build_science(src)
    build_social(src)
    out = OrderedDict((key, list(entries.values())) for key, entries in OUT.items())
    for key, entries in out.items():
        if not entries:
            fail(f"{key}: no standards")
    target = Path(__file__).parent / "outcomes.json"
    target.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {target} with {sum(len(v) for v in out.values())} entries")


main()
