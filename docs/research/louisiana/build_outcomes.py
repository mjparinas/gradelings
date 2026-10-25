"""Builds outcomes.json from the Louisiana Student Standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Reads the plain-text copies (pdftotext -layout) that fetch.sh writes beside each PDF.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. High school courses are listed under Grade 9.

Codes, as the documents print them:
  math      the K-12 Louisiana Student Standards for Mathematics (2016): the grade, the domain, the cluster letter and the
            number, "K.CC.A.1", "4.NBT.A.1". The document prints the domain code beside each domain heading and the cluster
            letter and standard number in front of each line. Grade 9 cites Algebra I, "A1: A-SSE.A.1".
  language  the 2026 K-12 Louisiana Student Standards for English Language Arts: strand, grade and number, "RL.4.1",
            "RF.2.3", "L.5.4", with a letter for a part ("L.2.1c"). Grade 9 cites the Grades 9-10 standards ("RI.9-10.2").
  science   the K-12 Louisiana Student Standards for Science (2017): the performance expectation code printed at the top of
            each page, "4-PS3-1"; middle school codes carry their grade, "6-MS-PS1-1". Grade 9 cites the high school Biology
            ("Life Science") and Physical Science courses, "HS-LS1-1", "HS-PS1-1". The Kindergarten page prints "K-LS-1-1"
            for K-LS1-1; it is read as K-LS1-1.
  social    the 2022 K-12 Louisiana Student Standards for Social Studies (updated July 10, 2026): grade and number, "K.5",
            "6.10". Grade 9 cites High School Civics, "C.9".
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


def clean(text):
    text = text.replace("\u200b", " ").replace(" ", " ")
    return re.sub(r"\s+", " ", text).strip()


def add(grade, subject, code, text, kind="standard"):
    bucket = OUT[f"{grade}/{subject}"]
    text = clean(text)
    if code not in bucket and text:
        bucket[code] = {"idx": code, "kind": kind, "content": text}


def flush(item):
    if item:
        add(*item[:3], " ".join(item[3]))


# ---------------------------------------------------------------------------------------------------------------------
# Math: domain headings end with the domain code ("K.CC", "4.NBT", "A1: A-SSE"); cluster lines start "A. ", standards
# "1. " and parts "a. ".

def math(src):
    lines = (src / "math-2016.txt").read_text(encoding="utf-8").split("\n")
    head = re.compile(r"^\S.*?\s{2,}((K|[1-8])\.([A-Z]+)|A1: ?([A-Z]-[A-Z]+))\s*$")
    stop = re.compile(r"^\s*(Algebra II \(A2\)|Geometry \(GM\))")
    domain = grade = None
    cluster = None
    item = None
    started = False
    for line in lines:
        m = head.match(line)
        if m:
            flush(item)
            item = None
            started = True
            if m.group(2):
                grade = m.group(2).lower()
                domain = f"{m.group(2)}.{m.group(3)}"
            else:
                grade = "9"
                domain = f"A1: {m.group(4)}"
            cluster = None
            continue
        if not started:
            continue
        if re.match(r"^\s*Algebra II\b|^\s*K-12 Louisiana Student Standards for Mathematics:\s*Algebra II", line):
            if grade == "9":
                flush(item)
                item = None
                domain = None
            continue
        if stop.match(line) or "Remediation Guide" in line or "Modeling Standards" in line:
            flush(item)
            item = None
            domain = None
            continue
        if domain is None:
            continue
        c = re.match(r"^\s{0,6}([A-H])\.\s+\S", line)
        s = re.match(r"^\s{0,8}(\d{1,2})\.\s+(\S.*)$", line)
        p = re.match(r"^\s{4,}([a-g])\.\s+\S", line)
        if c and not s:
            flush(item)
            item = None
            cluster = c.group(1)
        elif s and cluster:
            flush(item)
            item = [grade, "math", f"{domain}.{cluster}.{s.group(1)}", [s.group(2)]]
        elif p:
            if item:
                item[3].append(line)
        elif item and line.strip() and not re.match(r"^\s*(\d+|K-12 Louisiana|Student Content Standards|Mathematics \||Louisiana Department|Algebra I \(A1\))", line):
            if len(item[3]) < 6:
                item[3].append(line)
        elif not line.strip() and item and len(item[3]) > 1:
            pass
    flush(item)


# ---------------------------------------------------------------------------------------------------------------------
# English language arts: grade headings, strand headings, then numbered standards with lettered parts.

STRANDS = [
    ("Reading Standards for Literature", "RL"),
    ("Reading Standards for Informational Text", "RI"),
    ("Reading Standards for Foundational Skills", "RF"),
    ("Writing Standards", "W"),
    ("Speaking and Listening Standards", "SL"),
    ("Language Standards", "L"),
]


def ela(src):
    text = (src / "ela-2026.txt").read_text(encoding="utf-8").replace("\u200b", " ").replace("\f", "\n")
    body = text[text.find("\nKindergarten\nReading Standards for Literature") :]
    body = body[: body.find("\nVertical Progression")]
    if len(body) < 1000:
        fail("ELA: could not find the grade sections")
    level = grade = strand = None
    item = None
    for line in body.split("\n"):
        g = re.match(r"^(Kindergarten|Grade (\d)|Grades 9-10|Grades 11-12)\s*$", line)
        if g:
            flush(item)
            item = None
            if g.group(1) == "Kindergarten":
                level, grade = "K", "k"
            elif g.group(2):
                level = grade = g.group(2)
            elif g.group(1) == "Grades 9-10":
                level, grade = "9-10", "9"
            else:
                level = grade = None
            strand = None
            continue
        if level is None:
            continue
        hit = next((code for name, code in STRANDS if line.strip().startswith(name)), None)
        if hit:
            flush(item)
            item = None
            strand = hit
            continue
        if not strand:
            continue
        s = re.match(r"^\s{1,6}(\d{1,2})\.\s+(\S.*)$", line)
        p = re.match(r"^\s{6,}([a-h])\.\s+(\S.*)$", line)
        if s:
            flush(item)
            n = s.group(1)
            body_text = s.group(2)
            item = None
            if re.match(r"^\((Begins|Prerequisite)|^Not applicable|^\(Not applicable", body_text):
                continue
            item = [grade, "language", f"{strand}.{level}.{n}", [body_text]]
            base = item
        elif p and item is not None:
            letter = p.group(1)
            base_code = item[2].rstrip("abcdefgh") if re.search(r"\.\d+[a-h]$", item[2]) else item[2]
            flush(item)
            item = [grade, "language", f"{base_code}{letter}", [p.group(2)]]
        elif item and line.strip() and not re.match(r"^\s*\d+\s*$", line) and line.startswith(" "):
            item[3].append(line)
        elif item and line.strip() and not line.startswith(" "):
            flush(item)
            item = None
    flush(item)


# ---------------------------------------------------------------------------------------------------------------------
# Science: one performance expectation per page; the code is printed at the top right, then the text beside
# "Performance Expectation", up to "Clarification Statement" (or the practices table when a page has none).

SCIENCE_FILES = [("k", "science-k"), *[(str(g), f"science-{g}") for g in range(1, 9)], ("9", "science-life"), ("9", "science-physical")]
SCI_CODE = re.compile(r"^\s{30,}((?:K|[1-8]|HS)(?:-MS)?-[A-Z]+-?\d-\d+)\s*$")


def science(src):
    for grade, name in SCIENCE_FILES:
        pages = (src / f"{name}.txt").read_text(encoding="utf-8").split("\f")
        for page in pages:
            lines = page.split("\n")
            code = None
            start = 0
            for i, line in enumerate(lines[:8]):
                m = SCI_CODE.match(line)
                if m:
                    code, start = m.group(1), i + 1
                    break
            if not code:
                continue
            code = re.sub(r"^(K|[1-8])-LS-1-1$", r"\1-LS1-1", code)
            parts = []
            for line in lines[start:]:
                if "Clarification Statement" in line or "Science & Engineering Practices" in line:
                    break
                line = line.replace("Performance Expectation", " ")
                if re.match(r"^\s*[A-Z][A-Z ,:&'’-]+$", line) and line.strip() == line.strip().upper():
                    continue
                parts.append(line)
            add(grade, "science", code, " ".join(parts))


# ---------------------------------------------------------------------------------------------------------------------
# Social studies: "● K.5 Identify ..." with lettered parts below; High School Civics is "C.9". The other high school
# courses are not read.

def social(src):
    text = (src / "social-2022.txt").read_text(encoding="utf-8").replace("\u200b", " ")
    end = text.find("HIGH SCHOOL   United States History")
    if end < 0:
        end = text.find("United States History", text.find("HIGH SCHOOL"))
    rx = re.compile(r"^\s*●\s*((K|[1-8]|C)\.(\d{1,2}))\s+(\S.*)$")
    item = None
    for line in text[:end].split("\n"):
        m = rx.match(line)
        if m:
            flush(item)
            head = m.group(2)
            grade = "k" if head == "K" else ("9" if head == "C" else head)
            item = [grade, "social", m.group(1), [m.group(4)]]
        elif item is not None:
            if re.match(r"^\s*(Louisiana Department|doe\.louisiana|\d+\s*$|[A-Z]{4,}|GRADE|HIGH SCHOOL)", line):
                flush(item)
                item = None
            elif line.strip() and len(item[3]) < 3:
                item[3].append(line)
    flush(item)


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "source"
    math(src)
    ela(src)
    science(src)
    social(src)
    for key, bucket in OUT.items():
        if not bucket:
            fail(f"no standards for {key}")
    out = OrderedDict((k, list(v.values())) for k, v in OUT.items())
    path = Path(__file__).parent / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(" ".join(f"{k}:{len(v)}" for k, v in out.items()))


if __name__ == "__main__":
    main()
