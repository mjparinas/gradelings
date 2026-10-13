#!/usr/bin/env python3
"""Build outcomes.json from the ODE files that fetch.sh downloads.

Usage: python3 -I build_outcomes.py <cache-dir>

Writes outcomes.json beside this script:
  {"<grade>/<subject>": [{"idx": code, "kind": "standard", "content": text}]}
Science entries also carry "ngss", the matching NGSS performance expectation code
(4.ESS1.1 -> 4-ESS1-1, 6.LS1.1 -> MS-LS1-1, K.ETS1.1 -> K-2-ETS1-1), so units that cite NGSS for
Washington can be matched to Oregon's codes.
Grades are "k" and "1".."9". Band standards are listed under every grade of the band: the
social science 6/7 band under Grades 6 and 7, middle school engineering (MS.ETS1) under Grades 6
to 8, and the high school standards (math, science, social science) and the ELA 9-10 band under
Grade 9.
Needs openpyxl, pypdf and pdfplumber.
"""
import json
import re
import sys
from pathlib import Path

import openpyxl
import pdfplumber
from pypdf import PdfReader

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


def pdf_text(path: Path) -> str:
    return "\n".join(page.extract_text() or "" for page in PdfReader(path).pages)


def clean(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    # Rejoin compounds the PDFs break after a hyphen ("decision- making"), but keep suspended hyphens
    # ("one- and two-step").
    return re.sub(r"(\w)- (?!(?:and|or|to)\b)(\w)", r"\1-\2", text)


def grade_id(g: str) -> str:
    return "k" if g.upper() == "K" else g


def add(out: dict, grade: str, subject: str, idx: str, content: str, **extra) -> None:
    items = out.setdefault(f"{grade}/{subject}", [])
    if any(i["idx"] == idx for i in items):
        return
    items.append({"idx": idx, "kind": "standard", "content": content, **extra})


# ---------- Mathematics (2021, version 2021.3) ----------

MATH_CODE = re.compile(r"^(K|[1-8]|HS)\.[A-Z]{1,4}\.[A-Z]\.\d+$")


def math(cache: Path, out: dict) -> None:
    wb = openpyxl.load_workbook(cache / "math.xlsx", read_only=True)
    rows = list(wb["K12 text only"].iter_rows(values_only=True))
    pdf_codes = set(re.findall(r"(?m)^((?:K|[1-8]|HS)\.[A-Z]{1,4}\.[A-Z]\.\d+)\s", pdf_text(cache / "math.pdf")))
    for row in rows[1:]:
        kind, code, text = row[0], row[4], row[5]
        if str(kind).strip() != "Standard" or not code or not text:
            continue
        code = str(code).strip()
        if not MATH_CODE.match(code):
            raise SystemExit(f"math: unexpected code {code!r}")
        if code not in pdf_codes:
            raise SystemExit(f"math: {code} is in the workbook but not in the PDF")
        band = code.split(".")[0]
        add(out, "9" if band == "HS" else grade_id(band), "math", code, clean(str(text)))


# ---------- English language arts and literacy (2026, version 2026.1) ----------

ELA_CODE = re.compile(r"^ELA\.(K|\d|9-10|11-12)\.(RF|RL|RI|W|L|SL)\.(\d+)\b")
ELA_HEADINGS = {
    "Print Concepts", "Phonological Awareness", "Phonics and Word Recognition", "Fluency",
    "Key Ideas and Details", "Craft and Structure", "Integration of Knowledge and Ideas",
    "Range of Reading and Level of Text Complexity", "Reading Literature Reading Informational",
    "Text Types and Purposes", "Production and Distribution of Writing", "Research to Build and Present Knowledge",
    "Range of Writing", "Conventions of Standard English", "Knowledge of Language", "Vocabulary Acquisition and Use",
    "Comprehension and Collaboration", "Presentation of Knowledge and Ideas", "Adopted June 2026", "KINDERGARTEN",
}
# Placeholders where a standard has no content in a grade: "(Begins in grade 3)", "(Not applicable to literature)".
ELA_SKIP = re.compile(r"^\((Please see|Not applicable|See |Begins)", re.I)


def ela_heading(line: str) -> bool:
    if line in ELA_HEADINGS or re.fullmatch(r"\d+", line) or line.startswith("(ELA."):
        return True
    # Section titles: "Grade 4 Writing (ELA.4.W)", "Kindergarten Reading Literature / Informational Text".
    return bool(re.match(r"^(Kindergarten|Grade \d+(-\d+)?)\b", line)) and not line.endswith(".")


def ela(cache: Path, out: dict) -> None:
    lines = [l.strip() for l in pdf_text(cache / "ela.pdf").split("\n")]
    # The standards start after the table of contents and introduction. The introduction explains the codes with
    # "ELA.5.RL.1 = Content Area ..." lines, which are not standards.
    start = next(i for i, l in enumerate(lines) if ELA_CODE.match(l) and "=" not in l)
    current = None
    body: list[str] = []

    def flush() -> None:
        if not current:
            return
        text = clean(" ".join(body))
        grade, code = current
        if not text or ELA_SKIP.match(text):
            return
        if grade in ("9-10",):
            add(out, "9", "language", code, text)
        elif grade != "11-12":
            add(out, grade_id(grade), "language", code, text)

    stop = False
    for line in lines[start:]:
        m = ELA_CODE.match(line)
        if m:
            flush()
            current = (m.group(1), m.group(0))
            body = [line[m.end():].strip()]
            stop = False
            continue
        if not current or stop or not line:
            continue
        # The main statement runs until its first lettered sub-item ("a. ...").
        if re.match(r"^[a-z]\.\s", line):
            stop = True
            continue
        if ela_heading(line):
            continue
        body.append(line)
    flush()


# ---------- Science (2022, version 2022.1) ----------

SCI_CODE = re.compile(r"^(K|[1-8]|MS|HS)[.-]([A-Z]{2,4}\d)[.-](\d+)\.?[\^*†]*\s+(.*)$")
SCI_STOP = re.compile(
    r"^((K|[1-8]|MS|HS)\.[A-Z]{2,4}\d\s|Earth & Space Science|Life Science|"
    r"Physical Science|Engineering, Technology|Grade \d|Kindergarten|Middle School|High School)"
)
# Page footers, which can fall in the middle of a standard.
SCI_FOOTER = re.compile(r"^(Oregon Department of Education|K-12 Science Standards|Adopted 2022|\d+)$")


def ngss(band: str, dci: str, n: str) -> str:
    if dci == "ETS1":
        if band in ("K", "1", "2"):
            return f"K-2-ETS1-{n}"
        if band in ("3", "4", "5"):
            return f"3-5-ETS1-{n}"
    if band in ("6", "7", "8", "MS"):
        return f"MS-{dci}-{n}"
    return f"{band}-{dci}-{n}"


def science(cache: Path, out: dict) -> None:
    text = pdf_text(cache / "science.pdf")
    lines = [l.strip() for l in text.split("\n")]
    start = next(i for i, l in enumerate(lines) if l.startswith("Kindergarten Science Standards") and "..." not in l)
    current = None
    body: list[str] = []
    done = False

    def flush() -> None:
        if not current:
            return
        band, dci, n = current
        content = clean(" ".join(body))
        content = re.split(r"\[\s*Clarification|\[\s*Assessment", content)[0]
        content = re.sub(r"\s*[\^*†]+\s*$", "", content.strip()).strip()
        code = f"{band}.{dci}.{n}"
        grades = ["6", "7", "8"] if band == "MS" else ["9"] if band == "HS" else [grade_id(band)]
        for g in grades:
            add(out, g, "science", code, content, ngss=ngss(band, dci, n))

    for line in lines[start:]:
        m = SCI_CODE.match(line)
        if m:
            flush()
            # The 2022.1 PDF prints a few codes untidily ("3-LS4-4", "7.PS1.4.", "6.LS1.3†"); normalise them.
            current = (m.group(1), m.group(2), m.group(3))
            body = [m.group(4)]
            done = False
            continue
        if not current or done or not line or SCI_FOOTER.match(line):
            continue
        if "[" in line or SCI_STOP.match(line):
            if "[" in line:
                body.append(line.split("[")[0])
            done = True
            continue
        body.append(line)
    flush()


# ---------- Social science (2024, version 2024.1) ----------

SS_CODE = re.compile(r"^(K|[1-8]|6/7|HS)\.(C|G|E|H|US|WR)\.[A-Z]{1,4}\.\d+$")


def social(cache: Path, out: dict) -> None:
    # Each table row is Concept | Code | Standard | Examples. A long standard continues in the rows below it (and
    # over a page break), with an empty code cell; the concept label's own lines sit in other columns.
    last = None  # (code, column of the code, row width) of the last code row read
    found: dict[str, list[str]] = {}
    with pdfplumber.open(cache / "social.pdf") as pdf:
        for page in pdf.pages:
            for table in page.extract_tables():
                for row in table:
                    cells = [(c or "").strip() for c in row]
                    if cells and cells[0] == "Concept":
                        continue
                    code_col = next((i for i, c in enumerate(cells) if SS_CODE.match(c)), None)
                    if code_col is not None and code_col + 1 < len(cells):
                        code = cells[code_col]
                        found.setdefault(code, []).append(cells[code_col + 1])
                        last = (code, code_col, len(cells))
                    elif last and len(cells) == last[2] and not cells[last[1]] and cells[last[1] + 1]:
                        found[last[0]].append(cells[last[1] + 1])
    # Every code printed in the PDF text must have been read from a table.
    # The text layer prints some codes with a stray space ("K.C.DP .4").
    text = pdf_text(cache / "social.pdf")
    printed = {re.sub(r"\s", "", c) for c in re.findall(r"\b((?:K|[1-8]|6/7|HS)\.(?:C|G|E|H|US|WR)\.[A-Z]{1,4}\s?\.\d+)\b", text)}
    missing = printed - set(found)
    if missing:
        raise SystemExit(f"social: codes not read from tables: {sorted(missing)}")
    for code, parts in found.items():
        text = clean(" ".join(parts))
        text = re.split(r"\s*\bNote\s*[:\-–]", text)[0].strip()
        band = code.split(".")[0]
        grades = ["6", "7"] if band == "6/7" else ["9"] if band == "HS" else [grade_id(band)]
        for g in grades:
            add(out, g, "social", code, text)


def sort_key(item: dict) -> list:
    return [int(p) if p.isdigit() else p for p in re.split(r"[.\-]", item["idx"])]


def main() -> None:
    cache = Path(sys.argv[1])
    out: dict = {}
    math(cache, out)
    ela(cache, out)
    science(cache, out)
    social(cache, out)
    ordered = {f"{g}/{s}": out.get(f"{g}/{s}", []) for g in GRADES for s in ("math", "language", "science", "social")}
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(ordered, indent=1, ensure_ascii=False) + "\n")
    for key, items in ordered.items():
        print(key, len(items))
    print("total", sum(len(v) for v in ordered.values()))


if __name__ == "__main__":
    main()
