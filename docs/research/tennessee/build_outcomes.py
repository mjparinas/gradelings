"""Builds outcomes.json from the Tennessee Academic Standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs pdfplumber.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. High school courses are listed under Grade 9.

Codes, as the documents print them:
  math      the 2021 standards (State Board, final reading February 5, 2021; the document is the attachment as revised
            November 6, 2020): "K.CC.A.1", "4.NBT.A.1", with the cluster letter. Grade 9 cites Algebra I, "A1.A.SSE.A.1".
  language  the 2019 English language arts standards (State Board, February 8, 2019): "4.RL.KID.1", "4.RI.CS.5",
            "4.W.TTP.2", "4.SL.CC.1"; the foundational literacy standards, which hold phonics, fluency, grammar and
            vocabulary in Kindergarten to Grade 5, "4.FL.PWR.3", "4.FL.SC.6", "4.FL.VA.7a"; Grades 6 to 8 have a Language
            strand, "6.L.CSE.1", "6.L.VAU.4". Grade 9 cites the Grades 9-10 band, "9-10.RL.KID.1" (and "9.RL.RRTC.10",
            which the document prints per grade).
  science   the 2022 science standards (State Board, October 28, 2022): the grade, the disciplinary core idea and the
            number of the standard under it, "4.PS3.1", "6.ESS2.4", "K.ETS1.2". Grade 9 cites Biology I, "BIO1.LS1.1",
            and Physical Science, "PSCI.PS2.3".
  social    the 2024 social studies standards (State Board, final reading February 2024, in classrooms from 2027-28):
            "4.01", "K.12". Grade 9 cites United States Government and Civics, "GC.01", and Economics, "E.01".
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

import pdfplumber

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    return re.sub(r"\s+", " ", text).strip()


def grade_of(code):
    head = code.split(".")[0]
    if head in ("K",):
        return "k"
    if head.isdigit() and 1 <= int(head) <= 8:
        return head
    return "9"


def add(subject, code, text, kind="standard"):
    bucket = OUT[f"{grade_of(code)}/{subject}"]
    if code not in bucket and text:
        bucket[code] = {"idx": code, "kind": kind, "content": clean(text)}


# Math and English language arts print each standard as a table cell starting with its code.
MATH = r"(?:K|[1-8])\.[A-Z]+\.[A-Z]\.\d+|A1\.[A-Z]+\.[A-Z]+\.[A-Z]\.\d+"
ELA = r"(?:K|[1-8]|9|9-10)\.(?:RL|RI|W|SL|FL|L)\.[A-Z]+\.\d+[a-z]?"


def coded_cells(path, pattern, subject, keep=lambda code: True):
    rx = re.compile(r"(?:^|\n)(" + pattern + r")\s+(.*?)(?=\n(?:" + pattern + r")\s|\Z)", re.S)
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for table in page.extract_tables():
                for row in table:
                    for cell in row:
                        for m in rx.finditer(cell or ""):
                            if keep(m.group(1)):
                                add(subject, m.group(1), m.group(2))
    # A few standards sit in a cell the table finder splits: read them from the text extract beside the PDF
    # (pdftotext, see fetch.sh), up to the end of their first sentence. A standard read from a table keeps that text.
    text = path.with_suffix(".txt").read_text(encoding="utf-8")
    # The Kindergarten print concepts standard is misprinted "2.F.L.PC.1" in the Kindergarten row.
    text = text.replace("2.F.L.PC.1 ", "K.FL.PC.1 ")
    # Grade 2's sentence composition standard is printed "2. FL.SC.6", and Grade 4's phonics standard repeats Grade 5's
    # code, "5.FL.PWR.3", in the Grade 4 row (the second of the two).
    text = text.replace("2. FL.SC.6 ", "2.FL.SC.6 ")
    first = text.find("5.FL.PWR.3 Know")
    second = text.find("5.FL.PWR.3 Know", first + 1)
    if path.name.startswith("ela") and second > 0:
        text = text[:second] + "4" + text[second + 1 :]
    for m in re.finditer(r"(?:^|\s)(" + pattern + r")\.? ([A-Z][^\n]*(?:\n(?!\n)[^\n]*){0,3})", text):
        if keep(m.group(1)) and " is the grade level" not in m.group(2):
            add(subject, m.group(1), m.group(2).split(". ")[0].rstrip(".") + ".")


def ela_grade(code):
    # The 9-10 band and the Grade 9 reading range standards are Grade 9; 11-12 and 12 are left out.
    return code.split(".")[0] in ("K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "9-10")


# Science prints a heading per core idea ("4.PS3: Energy"), then its standards numbered "1)", "2)" and so on.
SCI_HEAD = re.compile(r"^((?:K|[1-8]|BIO1|PSCI)\.(?:PS|LS|ESS|ETS)\d):\s")
SCI_ITEM = re.compile(r"^\s*(\d+)\)\s*(.*)")


def science(path):
    current, number, text = None, None, []

    def flush():
        if current and number:
            add("science", f"{current}.{number}", " ".join(text))

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for line in (page.extract_text() or "").split("\n"):
                head = SCI_HEAD.match(line)
                item = SCI_ITEM.match(line)
                if head:
                    flush()
                    current, number, text = head.group(1), None, []
                elif item and current:
                    flush()
                    number, text = item.group(1), [item.group(2)]
                elif number and line.strip() and not re.fullmatch(r"\s*\d+\s*", line):
                    if re.match(r"^[A-Z][a-z]+ Grade$|^Biology|^Physical Science|^Chemistry|^Kindergarten", line.strip()):
                        flush()
                        current, number, text = None, None, []
                    else:
                        text.append(line)
            # A page break ends nothing: standards run on across pages.
        flush()


# Social studies prints a table per grade or course: the standard number in the first column, its text beside it.
SOC_CODE = re.compile(r"^(K|[1-8]|GC|E)\.\d{2}$")


def social(path):
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            words = page.extract_words()
            for table in page.find_tables():
                for row in table.rows:
                    cells = [c for c in row.cells if c]
                    if not cells:
                        continue
                    x0 = min(c[0] for c in cells)
                    x1 = max(c[2] for c in cells)
                    top = min(c[1] for c in cells)
                    bottom = max(c[3] for c in cells)
                    codes = [
                        w["text"]
                        for w in words
                        if SOC_CODE.match(w["text"]) and w["top"] >= top - 1 and w["bottom"] <= bottom + 1 and w["x0"] < x0 + (x1 - x0) * 0.2
                    ]
                    if len(codes) != 1:
                        continue
                    texts = []
                    for c in cells:
                        inset = (c[0], min(c[1] + 1.5, c[3]), c[2], max(c[3] - 1.5, c[1]))
                        t = page.crop(inset).extract_text() or ""
                        if t.strip() and not SOC_CODE.match(t.strip()) and not re.fullmatch(r"[A-Z, ]+|TCA.*", t.strip()):
                            texts.append(t)
                    if texts:
                        code = codes[0]
                        add("social", "E." + code[2:] if code.startswith("E.") else code, max(texts, key=len))


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "source")
    coded_cells(src / "math-2021.pdf", MATH, "math")
    coded_cells(src / "ela-2019.pdf", ELA, "language", ela_grade)
    science(src / "science-2022.pdf")
    social(src / "social-2024.pdf")
    for key, bucket in OUT.items():
        if not bucket:
            fail(f"no standards for {key}")
    out = OrderedDict((k, list(v.values())) for k, v in OUT.items())
    path = Path(__file__).parent / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print({k: len(v) for k, v in out.items()})


if __name__ == "__main__":
    main()
