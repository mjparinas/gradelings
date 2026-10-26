#!/usr/bin/env python3
"""Builds outcomes.json from the Idaho Content Standards in source/ (the text copies fetch.sh makes).

Usage: python3 -I build_outcomes.py [dir]   (default: source; prints a summary, writes outcomes.json beside this file)

Keys are "<grade>/<subject>" for Kindergarten ("k") to Grade 9. Each entry is {"idx", "kind", "content"}:
- math: K-8 standards with their cluster letter ("4.NBT.A.1"), as the Idaho State Department of Education's
  essential standards guides print them; Grade 9 holds the high school standards ("A.SSE.A.1", "F.IF.B.4"), which
  Idaho leaves to districts to place in courses.
- language: "<grade>.<strand>.<substrand>.<n>" ("4.RC.L.5a", "4.GC.M.3"); a standard with lettered parts is listed
  both whole ("4.RC.L.5") and by part. Grade 9 holds the Grades 9/10 band, written "9-10.RC.TE.3".
- science: the grade's performance expectations ("4-PS-1.1"); Grades 6 to 8 each hold the middle school band
  ("MS-LS-2.1") and Grade 9 the high school one ("HS-LS-1.1", "HS-PSC-2.1", "HS-PSP-1.1").
- social: "4.SS.1.3"; Grades 6 to 9 hold World Geography and World History and Civilizations (6-9.WG, 6-9.WH),
  United States History I and its historical thinking skills (6-12.US1, 6-12.HT1); Grade 9 also holds United States
  History II (9-12.US2, 6-12.HT2), American Government (9-12.GOV), Economics (9-12.EC) and Foundations of Western
  Civilization (9-12.WC).
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, sys.argv[1] if len(sys.argv) > 1 else "source")
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


def read(name):
    with open(os.path.join(SRC, name), encoding="utf-8") as f:
        # The PDFs mark clusters with private-use icons; drop them.
        return re.sub(r"[\ue000-\uf8ff\f]", "", f.read())


def clean(text):
    return re.sub(r"\s+", " ", text).strip()


FOOTER = re.compile(r"Idaho Content Standards|Idaho Social Studies Content Standards|^\s*\d+\s*$|Content and Curriculum")


def add(out, key, idx, content, kind="standard"):
    lst = out.setdefault(key, [])
    if any(o["idx"] == idx for o in lst):
        return
    lst.append({"idx": idx, "kind": kind, "content": clean(content)})


# --------------------------------------------------------------------------------------------------------------
# Mathematics: domains ("Number and Operations in Base Ten – 4.NBT"), clusters ("4.NBT.A. Generalize ...") and
# numbered standards, numbered through each domain.

def math(out):
    lines = read("math.txt").split("\n")
    start = next(i for i, l in enumerate(lines) if l.strip() == "PREAMBLE")
    cluster = None
    current = None  # [code, text]

    def flush():
        nonlocal current
        if current:
            grade = current[0].split(".")[0].lower()
            key = (grade if grade in GRADES else "9") + "/math"
            add(out, key, current[0], current[1])
        current = None

    for line in lines[start:]:
        s = line.strip()
        if FOOTER.search(line) and not re.match(r"^\d+\.\s", s):
            continue
        m = re.match(r"^((?:K|[1-8])\.[A-Z]{1,4}|[NAFGST]\.[A-Z]{1,4})\.([A-Z])\.\s+(.*)", s)
        if m:
            flush()
            cluster = f"{m.group(1)}.{m.group(2)}"
            continue
        m = re.match(r"^(\d{1,2})\.\s+(?:\(\+\)\s*)?(.*)", s)
        if m and cluster and line.startswith(("1", "2", "3", "4", "5", "6", "7", "8", "9", " ")) and len(line) - len(line.lstrip()) <= 4:
            flush()
            if m.group(2).startswith("Students"):  # the next grade's overview
                cluster = None
                continue
            current = [f"{cluster}.{m.group(1)}", m.group(2)]
            continue
        if re.match(r"^(Example|Clarification|Grades 9 – 12|Grade|Kindergarten|First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth)", s) or re.search(r" – [K1-8NAFGST]\.[A-Z]+$", s):
            flush()
            if re.search(r" – [K1-8]?\.?[A-Z]+$", s):
                cluster = None
            continue
        if current and s and not s.startswith(("Example", "Clarification")):
            current[1] += " " + s
    flush()


# --------------------------------------------------------------------------------------------------------------
# English language arts: grade headings ("Grade 4", "Grades 9/10"), strand markers ("4.RC-"), substrand headings
# ("Literature (L)"), numbered standards ("5.") and their lettered parts ("5a.").

def language(out):
    lines = read("ela.txt").split("\n")
    grade = None
    strand = sub = None
    current = None

    def flush():
        nonlocal current
        if current and grade:
            add(out, f"{grade}/language", current[0], current[1])
        current = None

    for line in lines:
        s = line.strip()
        m = re.match(r"^(Kindergarten|Grade (\d)|Grades (9)/10|Grades 11/12)$", s)
        if m:
            flush()
            if s == "Grades 11/12":
                break
            grade = "k" if s == "Kindergarten" else (m.group(2) or m.group(3))
            strand = sub = None
            continue
        if grade is None:
            continue
        m = re.match(r"^(?:K|\d|9/10)\.([A-Z]+)-$", s)
        if m:
            flush()
            strand = m.group(1)
            continue
        m = re.match(r"^[A-Z][A-Za-z ,]+\(([A-Z]{1,3})\)$", s)
        if m:
            flush()
            sub = m.group(1)
            continue
        if re.search(r"Strand$", s) or s.startswith("*Note"):
            flush()
            continue
        prefix = "9-10" if grade == "9" else grade.upper()
        m = re.match(r"^(\d{1,2})([a-z]?)\.\s+(.*)", s)
        if m and strand and sub:
            flush()
            current = [f"{prefix}.{strand}.{sub}.{m.group(1)}{m.group(2)}", m.group(3)]
            continue
        if re.match(r"^\d+$", s) or not s:
            continue
        if current:
            current[1] += " " + s
    flush()


# --------------------------------------------------------------------------------------------------------------
# Science: "4-PS-1.1 Students who demonstrate understanding can:" then the expectation, up to its supporting content.

def science(out):
    lines = read("science.txt").split("\n")
    current = None

    def flush():
        nonlocal current
        if current:
            band = current[0].split("-")[0]
            keys = {"K": ["k"], "MS": ["6", "7", "8"], "HS": ["9"]}.get(band, [band])
            for g in keys:
                add(out, f"{g}/science", current[0], current[1])
        current = None

    for line in lines:
        s = line.strip()
        m = re.match(r"^((?:K|[1-5]|MS|HS)-[A-Z]+-\d+\.\d+) Students who demonstrate understanding can:?(.*)", s)
        if m:
            flush()
            current = [m.group(1), m.group(2)]
            continue
        if current is None:
            continue
        if s.startswith(("Supporting Content", "Assessment", "Clarification")) or re.match(r"^(?:K|[1-5]|MS|HS)-[A-Z]+-\d+ ", s):
            flush()
            continue
        if s and not re.match(r"^\d+$", s):
            current[1] += " " + s
    flush()


# --------------------------------------------------------------------------------------------------------------
# Social studies: "Code  Standard" tables.

SOCIAL_CODE = re.compile(r"^((?:K|[1-5])\.SS\.\d+\.\d+|6-9\.W[GH]\.\d+\.\d+|6-12\.(?:US1|HT1|HT2)\.\d+|9-12\.(?:US2|GOV|EC|WC)\.\d+)\s+(.*)")


def social_keys(code):
    if code.startswith(("6-9.", "6-12.US1", "6-12.HT1")):
        return ["6", "7", "8", "9"]
    if code.startswith(("9-12.", "6-12.HT2")):
        return ["9"]
    return [code.split(".")[0].lower()]


def social(out):
    lines = read("social.txt").split("\n")
    start = next(i for i, l in enumerate(lines) if l.strip() == "K-5 SOCIAL STUDIES")
    current = None

    def flush():
        nonlocal current
        if current:
            for g in social_keys(current[0]):
                add(out, f"{g}/social", current[0], current[1])
        current = None

    for line in lines[start:]:
        s = line.strip()
        m = SOCIAL_CODE.match(s)
        if m:
            flush()
            current = [m.group(1), m.group(2)]
            continue
        if FOOTER.search(line) or s == "Code Standard" or re.match(r"^Code\s+Standard$", s):
            continue
        if current and s and line.startswith(" " * 8):
            current[1] += " " + s
        elif current and s:
            flush()
    flush()


def main():
    out = {}
    math(out)
    language(out)
    science(out)
    social(out)
    ordered = {f"{g}/{s}": out.get(f"{g}/{s}", []) for g in GRADES for s in ["math", "language", "science", "social"]}
    for key, lst in ordered.items():
        print(f"{key:12} {len(lst):4}")
    with open(os.path.join(HERE, "outcomes.json"), "w", encoding="utf-8") as f:
        json.dump(ordered, f, ensure_ascii=False, indent=1)
        f.write("\n")


if __name__ == "__main__":
    main()
