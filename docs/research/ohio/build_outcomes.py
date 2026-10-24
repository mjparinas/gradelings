"""Builds outcomes.json from Ohio's Learning Standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs pdfplumber and openpyxl.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. High school standards are listed under Grade 9.

Codes:
  math      the codes printed with each standard: "4.NBT.1", "K.CC.3"; high school "A.SSE.1", "F.IF.4", "G.CO.1",
            "S.ID.6", "N.RN.2" (Ohio writes the high school domain with a dot, not the Common Core's dash).
  language  the codes printed with each standard of the 2026 K-8 standards: "RL.4.1", "RI.4.2", "RF.4.3",
            "WF.4.3" (writing foundations: handwriting, spelling and conventions, new in 2026), "W.4.1", "SL.4.1",
            "L.4.4"; Grade 9 cites the 2017 Grades 9-10 standards as the standards document prints them,
            "RL.9-10.1" (the Department's spreadsheet lists them under Ninth Grade as "RL.9.1").
  science   the content statement codes printed in the 2018 standards: "4.PS.2", "6.LS.1"; Grade 9 cites the high
            school courses: Physical Science "PS.M.1", Biology "B.DI.1", Chemistry "C.PM.1", Physics "P.F.1",
            Physical Geology "PG.ER.1" and Environmental Science "ENV.ER.1".
  social    the content statements, which Ohio numbers within each grade and print without a code: Kindergarten to
            Grade 8 from the July 2026 standards as "Statement 6"; Grade 9 the 2018 high school courses as
            "American Government 5" and "Economics and Financial Literacy 3".
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

import openpyxl
import pdfplumber

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    text = text.replace(" ", " ").replace(" ", " ").replace("‐", "-").replace("–", "-").replace("­", "")
    return re.sub(r"\s+", " ", text).strip()


def add(grade, subject, idx, content):
    entries = OUT[f"{grade}/{subject}"]
    if idx not in entries:
        entries[idx] = {"idx": idx, "kind": "standard", "content": clean(content)[:600]}


def half_lines(page, lo, hi):
    text = page.crop((page.width * lo, 0, page.width * hi, page.height)).extract_text() or ""
    return [line.strip() for line in text.splitlines()]


# ---------------------------------------------------------------- math
MATH_CODE = re.compile(r"^(?:\(\+\)\s*)?((?:K|[1-8])\.(?:CC|OA|NBT|NF|MD|G|RP|NS|EE|F|SP)\.\d+|[NAFGS]\.[A-Z]{1,3}\.\d+)\.?\s*(.*)$")


def math(src):
    with pdfplumber.open(src / "math-2017.pdf") as pdf:
        for page in pdf.pages:
            for lo, hi in ((0, 0.5), (0.5, 1)):
                code, words = None, []
                for line in half_lines(page, lo, hi) + [""]:
                    m = MATH_CODE.match(line)
                    end = not line or line.isupper() or line.startswith("OHIO")
                    if m or end:
                        if code:
                            grade = "9" if code[0] in "NAFGS" and code[1] == "." and not code[0].isdigit() else code.split(".")[0].lower()
                            add(grade, "math", code, " ".join(words))
                        code, words = (m.group(1), [m.group(2)]) if m else (None, [])
                    elif code:
                        words.append(line)


# ---------------------------------------------------------------- language
SHEETS = {
    "Kindergarten": "k", "First Grade": "1", "Second Grade": "2", "Third Grade": "3", "Fourth Grade": "4",
    "Fifth Grade": "5", "Sixth Grade": "6", "Seventh Grade": "7", "Eighth Grade": "8", "Ninth Grade": "9",
}
ELA_CODE = re.compile(r"^(RL|RI|RF|WF|W|SL|L)\.(K|\d+)\.(\d+)(?!\d)\.?\s*(.*)$")


def language(src):
    book = openpyxl.load_workbook(src / "ela-2026-by-grade.xlsx", read_only=True)
    for sheet, grade in SHEETS.items():
        code, words = None, []
        for row in list(book[sheet].iter_rows(values_only=True)) + [(None, None, "")]:
            # One code has a stray space in the spreadsheet ("RF. 5.3").
            cell = re.sub(r"^([A-Z]{1,2})\.\s+(?=[K\d])", r"\1.", clean(str(row[2] or "")))
            m = ELA_CODE.match(cell)
            if m or not cell:
                if code:
                    add(grade, "language", code, " ".join(words))
                code, words = None, []
            if m:
                strand, g, n, rest = m.groups()
                if (g == "K" and grade != "k") or (g != "K" and g != grade):
                    fail(f"{sheet}: {cell[:40]}")
                # Grades 9-10 are printed as one band in the standards document.
                code, words = f"{strand}.{'9-10' if grade == '9' else g}.{n}", [rest]
            elif cell and code:
                words.append(cell)


# ---------------------------------------------------------------- science
SCI_K8 = re.compile(r"^((?:K|[1-8])\.(?:ESS|PS|LS)\.\d+):?\s*(.*)$")
SCI_HS = re.compile(r"^((?:PS|B|C|P|PG|ENV)\.[A-Z]{1,3}\.\d+):\s*(.+)$")


def statement_column(page):
    """The left column of a statement's own page, as text lines; [] on other pages. The column ends where the
    statement's own line breaks off into the next column (the first gap of more than 25 points after the code)."""
    words = page.extract_words(x_tolerance=1.5)
    heads = [w for w in words if SCI_K8.match(w["text"]) and w["x0"] < page.width * 0.2]
    # An overview page lists several statements in a table; a statement's own page starts with one.
    if len({w["text"] for w in heads}) != 1:
        return []
    head = heads[0]
    row = sorted((w for w in words if abs(w["top"] - head["top"]) < 3), key=lambda w: w["x0"])
    edge = next((b["x0"] for a, b in zip(row, row[1:]) if b["x0"] - a["x1"] > 25), page.width * 0.4)
    lines = []
    for w in sorted((w for w in words if w["x1"] < edge - 2), key=lambda w: (round(w["top"]), w["x0"])):
        if lines and abs(lines[-1][0] - w["top"]) < 3:
            lines[-1][1].append(w["text"])
        else:
            lines.append((w["top"], [w["text"]]))
    return [" ".join(t) for _, t in lines]


def science(src):
    # Each Grades K-8 statement has its own page, whose left column holds the statement.
    with pdfplumber.open(src / "science-2018.pdf") as pdf:
        for page in pdf.pages:
            lines = statement_column(page)
            for i, line in enumerate(lines):
                m = SCI_K8.match(line)
                if m:
                    code, words = m.group(1), [m.group(2)]
                    j = i + 1
                    while not words[-1].endswith(".") and j < len(lines) and not SCI_K8.match(lines[j]):
                        words.append(lines[j])
                        j += 1
                    add(code.split(".")[0].lower(), "science", code, " ".join(words))
            for line in half_lines(page, 0, 0.5) + half_lines(page, 0.5, 1):
                m = SCI_HS.match(line)
                if m:
                    add("9", "science", m.group(1), m.group(2))


# ---------------------------------------------------------------- social
GRADE_HEAD = re.compile(r"^(Kindergarten|Grade ([1-8]))$")
STATEMENT = re.compile(r"^(\d{1,2})\.\s+(\S.*)$")
COURSES = {"American Government": "American Government", "Economics and Financial Literacy": "Economics and Financial Literacy"}


def social(src):
    grade, number, words = None, None, []

    def flush():
        if grade and number:
            add(grade, "social", f"Statement {number}", " ".join(words))

    for line in (src / "social-k8-2026.txt").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        head = GRADE_HEAD.match(line)
        if head:
            flush()
            grade, number, words = ("k" if head.group(1) == "Kindergarten" else head.group(2)), None, []
            continue
        m = STATEMENT.match(line)
        if m and grade:
            flush()
            number, words = m.group(1), [m.group(2)]
        elif number and line and not line.startswith(("Strand:", "TOPIC:")) and "|" not in line:
            words.append(line)
        elif number and (line.startswith(("Strand:", "TOPIC:")) or "|" in line):
            flush()
            number, words = None, []
    flush()
    # The 2018 high school courses: two columns, content statements numbered within each course.
    with pdfplumber.open(src / "social-2019.pdf") as pdf:
        course = None
        for page in pdf.pages:
            for lo, hi in ((0, 0.5), (0.5, 1)):
                number, words = None, []
                for line in half_lines(page, lo, hi) + [""]:
                    for name in ("American Government", "Economics and Financial Literacy", "Modern World History",
                                 "American History", "Contemporary World Issues", "World Geography"):
                        if line == name:
                            course = name
                    m = STATEMENT.match(line)
                    stop = not line or line.startswith(("TOPIC", "CONTENT STATEMENTS", "OHIO")) or line.isupper()
                    if (m or stop) and number and course in COURSES:
                        add("9", "social", f"{COURSES[course]} {number}", " ".join(words))
                        number, words = None, []
                    if m:
                        number, words = m.group(1), [m.group(2)]
                    elif stop:
                        number, words = None, []
                    elif number:
                        words.append(line)


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "source")
    math(src)
    language(src)
    science(src)
    social(src)
    out = OrderedDict((key, list(entries.values())) for key, entries in OUT.items())
    for key, entries in out.items():
        if not entries:
            fail(f"no standards for {key}")
    path = Path(__file__).parent / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {path}: {sum(len(v) for v in out.values())} standards")
    for key, entries in out.items():
        print(f"  {key}: {len(entries)}")


if __name__ == "__main__":
    main()
