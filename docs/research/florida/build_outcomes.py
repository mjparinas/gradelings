#!/usr/bin/env python3
"""Builds docs/research/florida/outcomes.json from Florida's state academic standards in source/.

Run with --write to rewrite outcomes.json; without it, the script checks that the file matches what the sources give.
Each standard (Florida calls it a benchmark) is {"idx": code, "kind": "standard", "content": text} under
"<grade>/<subject>", grades k, 1 to 9 and subjects math, language, science, social. Codes are as the Department of
Education prints them. The words come from the CPALMS files fetch_cpalms.py saved (math.tsv, ela.tsv, science.tsv,
social.tsv, one benchmark per line: code, text, date), because a PDF page prints a benchmark's words above, beside or
below its code. The PDF books (bestmath*.pdf, bestela*.pdf, ssstandards*.pdf, with a plain `pdftotext` text beside each)
are the Department's own documents: the script checks that every code in the CPALMS files is printed in its book and
lists the ones that aren't, and it reads the books for the one thing CPALMS doesn't say, which benchmarks make up the
Algebra 1 and Geometry courses.

- Mathematics (B.E.S.T.): "MA.4.NSO.1.1" (grade, strand, standard, benchmark; strands NSO number sense and operations,
  AR algebraic reasoning, M measurement, GR geometric reasoning, DP data analysis and probability, FR fractions, and F
  functions in Grade 8). Grade 9 is the Algebra 1 and Geometry courses ("MA.912.AR.3.1"): the benchmarks the book's
  course section prints, not the whole 9-12 list.
- English language arts (B.E.S.T.): "ELA.4.R.1.1" (R reading, C communication, V vocabulary, F foundations, and
  ELA.612.F for Grades 6 to 12). "ELA.K12.EE.1.1" (the K-12 expectations) counts in every grade.
- Science (Next Generation Sunshine State Standards): "SC.4.L.16.1" (N nature of science, E Earth and space, P physical,
  L life). Grade 9 is the 9-12 benchmarks ("SC.912.L.14.1"), the ones Biology 1, Earth and Space Science and Physical
  Science draw on.
- Social studies: "SS.4.A.1.1" (A American history, AA African American history, CG civics and government, E economics,
  FL financial literacy, G geography, W world history, HC history of communism, HE Holocaust education).
  "SS.68.AA.1.1" counts in Grades 6 to 8. Grade 9 is World History, with the 9-12 strands it draws on ("SS.912.W.1.1",
  AA, HE, HC, G, E, FL, CG); psychology, sociology, humanities and 9-12 American history are left out.

The text is cut to about 300 characters; read the book for the full wording and the clarifications.
"""
import json
import re
import shutil
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "source"
OUT = HERE / "outcomes.json"
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
BOOKS = {"math": "bestmath202607", "language": "bestela202511", "social": "ssstandards202607"}
FILES = {"math": "math", "language": "ela", "science": "science", "social": "social"}


def book(name: str) -> str:
    pdf, txt = SRC / f"{name}.pdf", SRC / f"{name}.txt"
    if shutil.which("pdftotext") and pdf.exists():
        subprocess.run(["pdftotext", str(pdf), str(txt)], check=True)
    return txt.read_text(encoding="utf-8").replace("\x0c", "")


def clean(s: str) -> str:
    s = s.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"').replace("–", "-").replace("—", "-")
    s = s.replace("ﬁ", "fi").replace("ﬂ", "fl").replace(" ", " ")
    s = re.sub(r"\s+", " ", s).strip()
    return s if len(s) <= 300 else s[:297].rsplit(" ", 1)[0] + "..."


def grade_of(token: str) -> str | None:
    if token == "K":
        return "k"
    if token == "912":
        return "9"
    return token if token in {str(i) for i in range(1, 10)} else None


def rows(subject: str) -> list[tuple[str, str]]:
    out, seen = [], set()
    for line in (SRC / f"{FILES[subject]}.tsv").read_text(encoding="utf-8").splitlines():
        code, text, *_ = line.split("\t")
        if code not in seen:
            seen.add(code)
            out.append((code, text))
    return out


def algebra_geometry_codes() -> set[str]:
    """The MA.912 benchmarks the book's Algebra 1 and Geometry course section prints."""
    lines = book(BOOKS["math"]).split("\n")
    start = next(i for i, l in enumerate(lines) if l.strip() == "9-12 Course Overview" and i > 200)
    end = next(i for i, l in enumerate(lines) if l.strip() == "Mathematics 9-12" and i > start)
    code = re.compile(r"^(MA\.912\.[A-Z]+\.\d+\.\d+)\b")
    return {m.group(1) for l in lines[start:end] if (m := code.match(l))}


NINTH_SOCIAL = {"W", "AA", "HE", "HC", "G", "E", "FL", "CG"}


def targets(subject: str, code: str, course_codes: set[str]) -> list[str]:
    parts = code.split(".")
    token = parts[1]
    if subject == "language" and token == "K12":
        return GRADES
    if subject == "language" and token == "612":
        return ["6", "7", "8", "9"]
    if subject == "social" and token == "68":
        return ["6", "7", "8"]
    if subject == "social" and token == "912":
        return ["9"] if parts[2] in NINTH_SOCIAL else []
    if subject == "math" and token == "912":
        return ["9"] if code in course_codes else []
    g = grade_of(token)
    return [g] if g else []


def build() -> dict:
    out: dict = defaultdict(list)
    course = algebra_geometry_codes()
    for subject in FILES:
        for code, text in rows(subject):
            for g in targets(subject, code, course):
                out[f"{g}/{subject}"].append({"idx": code, "kind": "standard", "content": clean(text)})
    return {f"{g}/{s}": out[f"{g}/{s}"] for g in GRADES for s in FILES if out[f"{g}/{s}"]}


def check_books() -> None:
    """Every code in the CPALMS files should be printed in the matching book; report the ones that aren't."""
    for subject, name in BOOKS.items():
        text = book(name)
        missing = [c for c, _ in rows(subject) if c not in text]
        if missing:
            print(f"note: {len(missing)} {subject} codes are on CPALMS but not in {name}: {missing[:12]}", file=sys.stderr)


if __name__ == "__main__":
    built = json.dumps(build(), ensure_ascii=False, indent=1) + "\n"
    check_books()
    if "--write" in sys.argv:
        OUT.write_text(built, encoding="utf-8")
        print("wrote", OUT, {k: len(v) for k, v in json.loads(built).items()})
    elif OUT.read_text(encoding="utf-8") != built:
        sys.exit("outcomes.json does not match the sources; run with --write")
    else:
        print("outcomes.json matches the sources")
