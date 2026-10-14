#!/usr/bin/env python3
"""Builds docs/research/alabama/outcomes.json from the Alabama Course of Study PDFs in source/.

Run with --write to rewrite outcomes.json; without it, the script checks that the file matches what the PDFs give.
It reads `pdftotext -layout` text (the .txt files beside each PDF, made again from the PDF when pdftotext is
installed). Each content standard is {"idx": code, "content": text} under "<grade>/<subject>":

- Math (2019): "4.12" (grade, standard), Kindergarten "K.3". Grade 9 lists Geometry with Data Analysis ("GDA.5"),
  the course Alabama's standard pathway teaches in Grade 9, and Algebra I with Probability ("AIP.5").
- English language arts (2021): "4.15", plus the grade band's recurring standards ("4.R2").
- Science (2023): "4.3". Grade 6 is Earth and Space Science, Grade 7 Life Science, Grade 8 Physical Science; Grade 9
  lists Biology ("BIO.3").
- Social studies (2024): "4.7". Grade 9 is World History and Geography: Age of Revolution to Present.

Sub-standards (4a, 15.b) are part of their standard and are not listed apart.
"""
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "source"
OUT = HERE / "outcomes.json"
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


def text(name: str) -> list[str]:
    pdf, txt = SRC / f"{name}.pdf", SRC / f"{name}.txt"
    if shutil.which("pdftotext") and pdf.exists():
        subprocess.run(["pdftotext", "-layout", str(pdf), str(txt)], check=True)
    return txt.read_text(encoding="utf-8").split("\n")


def clean(s: str) -> str:
    s = s.replace("’", "'").replace("“", '"').replace("”", '"').replace("–", "-").replace("—", "-")
    s = s.replace("ﬁ", "fi").replace("ﬂ", "fl").replace(" ", " ")
    return re.sub(r"\s+", " ", s).strip()


def cut(s: str) -> str:
    """The text of one column: up to the first wide gap (right-hand labels such as "Cause and Effect" are dropped)."""
    return re.split(r"\s{4,}", s.strip())[0]


PAGE = re.compile(r"Alabama Course of Study|^\s{30,}\S.{0,40}$|^\s*\d+\s*$")


def standards(lines: list[str], start: int, end: int, number: re.Pattern, stop: re.Pattern, prefix: str) -> list[dict]:
    """Numbered standards between two lines, accepted only in order (1, 2, 3...), so stray numbers are skipped."""
    out: list[dict] = []
    want = 1
    i = start
    while i < end:
        m = number.match(lines[i])
        if not m or int(m.group(1)) != want:
            i += 1
            continue
        col = m.start(2)
        parts = [cut(m.group(2))]
        j = i + 1
        while j < end:
            line = lines[j]
            if not line.strip():
                # A blank line ends the standard, unless a page break splits it.
                break
            if number.match(line) or stop.match(line) or PAGE.search(line):
                break
            piece = line[max(0, col - 1):] if len(line) > col - 1 else ""
            if not piece.strip() or line[: max(0, col - 2)].strip() and not piece[:1].strip():
                piece = piece
            piece = cut(piece)
            if not piece or re.match(r"(Examples?|Clarification|Note|NOTE)\b", piece):
                break
            parts.append(piece)
            j += 1
        out.append({"idx": f"{prefix}{want}", "content": clean(" ".join(parts))})
        want += 1
        i = j
    return out


DOTTED = re.compile(r"^(?:.{0,60}?\s)?(\d{1,2})\.\s+([A-Z].*)$")
SUB = re.compile(r"^\s*(?:[a-h]\.|\d{1,2}[a-h]\b|Examples?:|Clarification)")


def heading_lines(lines: list[str], pattern: str) -> list[int]:
    return [i for i, l in enumerate(lines) if re.match(pattern, l)]


def math() -> dict[str, list[dict]]:
    lines = text("math")
    heads = heading_lines(lines, r"^\s{10,}(Kindergarten|Grade \d|Geometry with Data Analysis|Algebra I with Probability|Algebra II with Statistics|Grade \d Accelerated|Mathematical Modeling|Applications of Finite|Precalculus)\b.*Content Standards\s*$")
    names = [re.sub(r"\s+Content Standards$", "", lines[i].strip()) for i in heads]
    bounds = dict(zip(names, zip(heads, heads[1:] + [len(lines)])))
    out: dict[str, list[dict]] = {}
    for g in GRADES[:-1]:
        name = "Kindergarten" if g == "k" else "Grade 8 Mathematics" if g == "8" else f"Grade {g}"
        a, b = bounds[name]
        out[f"{g}/math"] = standards(lines, a, b, DOTTED, SUB, f"{g.upper()}.")
    a, b = bounds["Geometry with Data Analysis"]
    out["9/math"] = standards(lines, a, b, DOTTED, SUB, "GDA.")
    a, b = bounds["Algebra I with Probability"]
    out["9/math"] += standards(lines, a, b, DOTTED, SUB, "AIP.")
    return out


def ela() -> dict[str, list[dict]]:
    lines = text("ela")
    heads = heading_lines(lines, r"^\s{10,}(KINDERGARTEN|GRADE \d+) CONTENT STANDARDS\s*$")
    recur = heading_lines(lines, r"^\s{10,}RECURRING STANDARDS FOR")
    rnum = re.compile(r"^\s*R(\d)\.\s+(\S.*)$")
    out: dict[str, list[dict]] = {}
    for n, h in enumerate(heads):
        name = lines[h].strip().split()[:2]
        g = "k" if name[0] == "KINDERGARTEN" else name[1]
        if g not in GRADES:
            continue
        end = heads[n + 1] if n + 1 < len(heads) else len(lines)
        # The grade's recurring standards are listed just before its content standards.
        r = max(i for i in recur if i < h)
        items = []
        for i in range(r, h):
            m = rnum.match(lines[i])
            if m:
                parts = [cut(m.group(2))]
                j = i + 1
                while j < h and lines[j].strip() and not rnum.match(lines[j]) and not PAGE.search(lines[j]):
                    parts.append(cut(lines[j]))
                    j += 1
                items.append({"idx": f"{g.upper()}.R{m.group(1)}", "content": clean(" ".join(parts))})
        out[f"{g}/language"] = items + standards(lines, h, end, DOTTED, SUB, f"{g.upper()}.")
    return out


def science() -> dict[str, list[dict]]:
    lines = text("science")
    stems = [i for i, l in enumerate(lines) if "completes the stem" in l]
    # In order: Kindergarten to Grade 8, then Biology, Chemistry, Earth and Space Science, Environmental Science,
    # Human Anatomy and Physiology, Physical Science and Physics.
    order = GRADES[:-1] + ["BIO"]
    out: dict[str, list[dict]] = {}
    for n, key in enumerate(order):
        a, b = stems[n], stems[n + 1]
        if key == "BIO":
            out["9/science"] = standards(lines, a, b, DOTTED, SUB, "BIO.")
        else:
            out[f"{key}/science"] = standards(lines, a, b, DOTTED, SUB, f"{key.upper()}.")
    return out


def social() -> dict[str, list[dict]]:
    lines = text("social")
    heads = heading_lines(lines, r"^\s{10,}CONTENT STANDARDS\s*$")
    num = re.compile(r"^\s{0,3}(\d{1,2})\s{2,}(\S.*)$")
    sub = re.compile(r"^\s*\d{1,2}[a-h]\s|^\s*Examples?:")
    out: dict[str, list[dict]] = {}
    # In order: Kindergarten to Grade 12, then the electives.
    for n, g in enumerate(GRADES):
        out[f"{g}/social"] = standards(lines, heads[n], heads[n + 1], num, sub, f"{g.upper()}.")
    return out


def build() -> dict[str, list[dict]]:
    out = {**math(), **ela(), **science(), **social()}
    return {k: out[k] for k in sorted(out, key=lambda k: (GRADES.index(k.split("/")[0]), k.split("/")[1]))}


if __name__ == "__main__":
    data = build()
    body = json.dumps(data, indent=1, ensure_ascii=False) + "\n"
    if "--write" in sys.argv:
        OUT.write_text(body, encoding="utf-8")
        print(f"wrote {OUT}: " + ", ".join(f"{k} {len(v)}" for k, v in data.items()))
    elif OUT.read_text(encoding="utf-8") != body:
        sys.exit("outcomes.json does not match the sources; run with --write")
    else:
        print("outcomes.json matches the sources")
