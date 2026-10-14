#!/usr/bin/env python3
"""Builds outcomes.json from Minnesota's official standards documents in source/.

The four documents are the Minnesota Department of Education's official standards as put into rule (Minnesota Rules
3501.0660, 3501.0750, 3501.0960 and 3501.1350), in the copies the Legislative Reference Library keeps (fetch.sh):

  math.pdf     2022 Minnesota K-12 Academic Standards in Mathematics (benchmarks "4.1.1.1": grade, strand, standard,
               benchmark; Kindergarten is grade 0; "9.x.x.x" are the Grades 9-11 benchmarks)
  ela.pdf      2020 Minnesota K-12 Academic Standards in English Language Arts ("4.1.1.2"; Kindergarten is 0)
  science.pdf  2019 Minnesota Academic Standards in Science ("4P.1.1.1.1": grade, content area, strand, substrand,
               standard, benchmark; Kindergarten is 0; 9C, 9E, 9L and 9P are the high school benchmarks)
  social.pdf   2021 Minnesota K-12 Academic Standards in Social Studies ("4.1.1.1"; Kindergarten is K; "9.x.x.x.x" are
               the Grades 9-12 benchmarks)

Each benchmark becomes {"idx": code, "content": text} under "<grade>/<subject>" (grade k, 1 ... 9; the high school
benchmarks are listed under grade 9). Run with --write to rewrite outcomes.json; without it, the script checks that
outcomes.json matches the sources exactly.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SOURCE = HERE / "source"

CODES = {
    "math": re.compile(r"(?<![\w.])([0-9])\.([1-3])\.([0-9]{1,2})\.([0-9]{1,2})(?![\w.])"),
    "language": re.compile(r"(?<![\w.])([0-9]|1[0-2])\.([1-3])\.([0-9]{1,2})\.([0-9]{1,2})(?![\w.])"),
    "science": re.compile(r"(?<![\w.])([0-9])([CELP])\.([1-4])\.([1-4])\.([1-4])\.([0-9]{1,2})(?![\w.])"),
    "social": re.compile(r"(?<![\w.])([K0-9])\.([1-5])\.([0-9]{1,2})\.([0-9]{1,2})(\.[0-9]{1,2})?(?![\w.])"),
}
FILES = {"math": "math.pdf", "language": "ela.pdf", "science": "science.pdf", "social": "social.pdf"}
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


def text_of(pdf: Path) -> list[str]:
    out = subprocess.run(["pdftotext", "-layout", str(pdf), "-"], check=True, capture_output=True, text=True).stdout
    return out.replace("\f", "\n").split("\n")


def blocks(lines: list[str]):
    block: list[str] = []
    for line in lines:
        if line.strip():
            block.append(line)
        elif block:
            yield block
            block = []
    if block:
        yield block


def clean(text: str) -> str:
    text = re.sub(r"\((MP\d[^)]*|P: [^)]*)\)", "", text)
    text = re.sub(r"[☼✜#$μ]|\*+", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text.replace("’", "'").replace("“", '"').replace("”", '"')


def grade_of(subject: str, g: str) -> str | None:
    if g in ("0", "K"):
        return "k"
    if subject == "language" and int(g) > 9:
        return None
    return g


def rows(lines: list[str], pattern: re.Pattern):
    """Rows that start at a line holding a code (ELA and social studies tables have no gap between rows)."""
    row: list[str] = []
    for line in lines:
        if pattern.search(line):
            if row:
                yield row
            row = [line]
        elif row and line.strip() and not HEADER.search(line):
            row.append(line)
        elif row:
            yield row
            row = []
    if row:
        yield row


HEADER = re.compile(r"Minnesota K.12|^\s*Grade\s+Strand")
# Math and science benchmark text can sit above its code, so a benchmark is a block between blank lines.
BLOCKS = {"math", "science"}


def parse(subject: str) -> dict[str, list[dict]]:
    pattern = CODES[subject]
    found: dict[str, dict[str, str]] = {}
    lines = text_of(SOURCE / FILES[subject])
    for block in blocks(lines) if subject in BLOCKS else rows(lines, pattern):
        hits = [(i, m) for i, line in enumerate(block) for m in pattern.finditer(line)]
        if len(hits) != 1:
            continue
        _, m = hits[0]
        col = m.start()
        code = m.group(0)
        parts = [line[col:] if len(line) > col else "" for line in block]
        text = clean(" ".join(parts).replace(code, " ", 1))
        # "Benchmarks begin in grade 3." holds a code's place in the table where the grade has no benchmark.
        if not text or len(text) < 12 or re.fullmatch(r"Benchmarks? (begins?|ends?) in (grade \d+|kindergarten)\.|No benchmark at this grade level\.", text, re.I):
            continue
        # The introductions show a sample benchmark; the grade tables come later, so the last reading wins.
        found[code] = {"idx": code, "content": text}
    out: dict[str, list[dict]] = {}
    for code, row in found.items():
        grade = grade_of(subject, re.match(r"[K0-9]+", code).group(0) if subject != "language" else code.split(".")[0])
        if grade is None:
            continue
        out.setdefault(f"{grade}/{subject}", []).append(row)
    return out


def build() -> dict[str, list[dict]]:
    parsed: dict[str, list[dict]] = {}
    for subject in FILES:
        parsed.update(parse(subject))
    key = lambda r: [int(x) if x.isdigit() else x for x in re.split(r"[.]", re.sub(r"^K", "0", r["idx"]))]
    return {f"{g}/{s}": sorted(parsed.get(f"{g}/{s}", []), key=key) for g in GRADES for s in FILES}


if __name__ == "__main__":
    data = build()
    target = HERE / "outcomes.json"
    text = json.dumps(data, indent=1, ensure_ascii=False) + "\n"
    if "--write" in sys.argv:
        target.write_text(text)
        print({k: len(v) for k, v in data.items()})
    elif not target.exists() or target.read_text() != text:
        sys.exit("outcomes.json does not match the sources; run with --write")
    else:
        print("outcomes.json matches the sources")
