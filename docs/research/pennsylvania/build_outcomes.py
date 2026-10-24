#!/usr/bin/env python3
"""Builds docs/research/pennsylvania/outcomes.json from Pennsylvania's academic standards in source/.

Run with --write to rewrite outcomes.json; without it, the script checks that the committed file is exactly what the
sources give (exit status 1 with a summary of the differences when it is not). Each standard is
{"idx": code, "kind": "standard", "content": text} under "<grade>/<subject>": grades k, 1 to 9 and subjects math,
language, science, social. Codes are as the Department of Education (PDE) prints them, with the few changes listed under
"Code clean-up" below. Output is sorted (natural order of the code inside each key), so it does not depend on the order
a PDF happens to be read in.

The PDFs print every standard in a table with one column per grade (or per grade band): a code, then the standard's
words beneath it. `pdftotext -layout` mixes the columns when a cell wraps, so this script reads each page's words with
their coordinates (pdfplumber) and gives every word under a code to that code, taking the column as the words between
that code's left edge and the next column's, down to the next code or the "eligible content" codes (M04.A-T.1.1.1,
A1.1.1.1.1, E04.D.1.2.3, L.N.1.3.1) that PDE lists beneath some cells. Text rotated 90 degrees (the row labels at the
left of each table) and "Intentionally blank" cells are left out. Only the committed source/*.pdf files are read.

Documents and the grades they feed (the README has the reasons):
- Math, PA Core Standards for Mathematics (pacore-math): CC.2.<domain>.<grade>.<strand>.<n>. Kindergarten to Grade 8:
  every standard for that grade. Grade 9 is Algebra I: the high school standards CC.2.1.HS.F.*, CC.2.2.HS.C.*,
  CC.2.2.HS.D.* and CC.2.4.HS.B.* only. PreK, the Eligible Content codes and the Mathematical Practices are left out.
- Language, PA Core Standards for English Language Arts (pacore-ela-prek-5, pacore-ela-6-12): CC.1.1 (foundational
  skills, Pre-K to 5), CC.1.2 (informational text), CC.1.3 (literature), CC.1.4 (writing), CC.1.5 (speaking and
  listening). Kindergarten to Grade 8 by grade; Grade 9 is the 9-10 band (CC.1.2.9-10.A). PreK and 11-12 are left out,
  and so are the literacy standards for history, science and technical subjects.
- Science, STEELS (steels-2023): 3.1 life, 3.2 physical, 3.3 Earth and space, 3.4 environmental literacy and
  sustainability, 3.5 technology and engineering (the ETS standards are in 3.5). Codes naming one grade (3.1.4.A,
  3.2.K.A) belong to that grade; bands belong to every grade in them (3.4.K-2.A and 3.5.K-2.A to K, 1 and 2;
  3.4.3-5.A and 3.5.3-5.A to 3, 4 and 5; 3.1.6-8.A to 6, 7 and 8); 9-12 codes belong to Grade 9.
- Social studies: civics and government 5.x, economics 6.x (the 2024 text, Appendix C-1), geography 7.x, history 8.x,
  personal finance 17.x (Appendix F). The Pre-K to 3 documents give Kindergarten to Grade 3, the 3 to 8 documents
  Grades 3 to 8 (where both print Grade 3 the 3 to 8 document's words are kept), the 9-12 documents (columns 9, 12,
  U, W and C) all belong to Grade 9. Economics and personal finance are banded (K-2, 3-5, 6-8, 9-12) like STEELS.

Code clean-up: PDE's tables repeat a code's trailing period in civics, geography and history ("5.1.K.A."), which the
script drops; en dashes in banded codes become hyphens (CC.1.2.9-10.A); and the typing slips below are put right
(the PDF prints the code in the left column, this file the code its column and neighbours show):
  C.2.3.4.A.2 -> CC.2.3.4.A.2 (math), CC.1.4.5G -> CC.1.4.5.G (ELA), 3.5.6-8LL -> 3.5.6-8.LL and 3.5.9-12PP ->
  3.5.9-12.PP (STEELS), 7.1.1A. -> 7.1.2.A, 7.1.71B. -> 7.1.2.B and 7.4.4.PK.A. -> 7.4.PK.A (geography Pre-K to 3),
  8.3.3PK.C. -> 8.3.PK.C and 8.2.8.B. (in the Grade 3 column) -> 8.2.3.B (history Pre-K to 3).
Cells printed with a wrong code that hold no words ("Intentionally blank") are not standards and are skipped.

The text is cut to about 300 characters; read the document for the full wording.
"""
import difflib
import json
import re
import sys
from pathlib import Path

import pdfplumber

HERE = Path(__file__).resolve().parent
SRC = HERE / "source"
OUT = HERE / "outcomes.json"
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]

BLANK = {"Intentionally", "Blank", "blank", "Blank.", "blank."}


def cells(name: str, code_re: re.Pattern, stop_re: re.Pattern, width: int = 150, wide: re.Pattern | None = None,
          top_min: int = 60, top_max: int = 560, tol: int = 8, merge: int = 8, first_page: int = 0,
          max_size: float = 99) -> list[tuple[str, str]]:
    """(printed code, words beneath it) for every code in the tables of source/<name>.pdf."""
    out: list[tuple[str, str]] = []
    with pdfplumber.open(SRC / f"{name}.pdf") as pdf:
        for page in pdf.pages[first_page:]:
            words = page.extract_words(extra_attrs=["upright", "size"])
            codes = [w for w in words if code_re.match(w["text"])]
            if not codes:
                continue
            edges: list[float] = []
            for x in sorted(c["x0"] for c in codes):
                if not edges or x - edges[-1] > merge:
                    edges.append(x)

            def column(x: float) -> int | None:
                k = None
                for j, e in enumerate(edges):
                    if x >= e - tol:
                        k = j
                return k

            wide_cols = {column(c["x0"]) for c in codes if wide and wide.search(c["text"])}

            def owner(w: dict) -> int | None:
                k = column(w["x0"])
                if k is None:
                    return None
                nxt = edges[k + 1] - 2 if k + 1 < len(edges) else 1e9
                limit = min(nxt, edges[k] + (400 if k in wide_cols else width))
                return k if w["x0"] < limit else None

            body = [(w, owner(w)) for w in words if top_min < w["top"] < top_max and w["upright"] and w["size"] <= max_size and w["text"] not in BLANK]
            for c in codes:
                k = owner(c)
                below = [w for w, kk in body if kk == k and w["top"] > c["top"] + 3]
                ends = [w["top"] for w in below if stop_re.match(w["text"]) or code_re.match(w["text"])]
                end = min(ends) if ends else 1e9
                mine = sorted((w for w in below if w["top"] < end - 1), key=lambda w: w["top"])
                lines: list[list] = []
                for w in mine:
                    if lines and w["top"] - lines[-1][0] <= 4:
                        lines[-1][1].append(w)
                    else:
                        lines.append([w["top"], [w]])
                text = ""
                for _, ws in lines:
                    line = " ".join(x["text"] for x in sorted(ws, key=lambda x: x["x0"]))
                    text = line if not text else (text + line if text.endswith("-") else text + " " + line)
                out.append((c["text"], text))
    return out


def clean(s: str) -> str:
    """Plain ASCII text on one line, without bullets or the "(Reference ...)" notes, cut to about 300 characters."""
    for old, new in (("\u2019", "'"), ("\u2018", "'"), ("\u201c", '"'), ("\u201d", '"'), ("\u2013", "-"), ("\u2014", "-"),
                     ("\ufb01", "fi"), ("\ufb02", "fl"), ("\u00a0", " ")):
        s = s.replace(old, new)
    s = re.sub(r"\s*\(Reference[^)]*\)?", "", s)
    s = re.sub("[\uf0b7\uf0a7\uf0d8\u2022\u25ca\u25aa]", " ", s)  # bullet glyphs
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"\s+([.,;:?!])", r"\1", s)  # the civics, geography and history PDFs set a space before some punctuation
    s = re.sub(r"(\w) ' ", r"\1' ", s)
    s = s.replace("government s.", "governments.")
    return s if len(s) <= 300 else s[:297].rsplit(" ", 1)[0] + "..."


def natural(code: str) -> list:
    """Sort key: numbers as numbers, K before 1, A to Z before AA to ZZ."""
    key = []
    for part in re.findall(r"\d+|[A-Za-z]+|[^\w]", code):
        if part.isdigit():
            key.append((0, int(part), ""))
        elif part == "K":
            key.append((0, -1, ""))
        elif part.isalpha():
            key.append((1, len(part), part))
        else:
            key.append((2, 0, part))
    return key


Standards = dict[str, dict[str, str]]  # "<grade>/<subject>" -> {code: text}


def add(out: Standards, grade: str, subject: str, code: str, text: str, replace: bool = True) -> None:
    box = out.setdefault(f"{grade}/{subject}", {})
    if replace or code not in box:
        box[code] = clean(text)


def grade_of(token: str) -> str | None:
    if token == "K":
        return "k"
    return token if token in {str(i) for i in range(1, 10)} else None


# --- Mathematics ---------------------------------------------------------------------------------------------------

MATH_CODE = re.compile(r"^C?C\.2\.\d\.(?:PreK|K|\d|HS)\.[A-Z]\.\d+$")
MATH_STOP = re.compile(r"^(M\d\d|[AG]\d?\.\d+\.\d|\|P$)")
MATH_ALGEBRA_I = ("CC.2.1.HS.F.", "CC.2.2.HS.C.", "CC.2.2.HS.D.", "CC.2.4.HS.B.")


def math(out: Standards) -> None:
    for printed, text in cells("pacore-math", MATH_CODE, MATH_STOP, width=110, wide=re.compile(r"\.HS\.")):
        code = "C" + printed if printed.startswith("C.") else printed
        token = code.split(".")[3]
        if token == "HS":
            if code.startswith(MATH_ALGEBRA_I):
                add(out, "9", "math", code, text)
        elif grade_of(token):
            add(out, grade_of(token), "math", code, text)


# --- English language arts -----------------------------------------------------------------------------------------

ELA_CODE = re.compile(r"^CC\.1\.\d\.(?:PK|K|\d|\d+[\u2013-]\d+)\.?[A-Z]$|^CC\.1\.\d\.\d+[\u2013-]\d+[A-Z]$")
ELA_STOP = re.compile(r"^([A-Z]\d\d[A-Z.]|[A-Z]\.[A-Z]\.\d\.\d)")


def language(out: Standards) -> None:
    for name in ("pacore-ela-prek-5", "pacore-ela-6-12"):
        for printed, text in cells(name, ELA_CODE, ELA_STOP, width=150):
            code = printed.replace("\u2013", "-")
            code = re.sub(r"^(CC\.1\.\d\.[^.]+?)\.?([A-Z])$", r"\1.\2", code)
            token = code.split(".")[3]
            g = grade_of(token) or ("9" if token == "9-10" else None)
            if g:
                add(out, g, "language", code, text)


# --- Science (STEELS) ----------------------------------------------------------------------------------------------

STEELS_CODE = re.compile(r"^3\.[1-5]\.(?:K|\d|K-2|3-5|6-8|9-12)\.?[A-Z]{1,2}$")
STEELS_STOP = re.compile(r"^\(ETS\)$")
STEELS_TABLES_FROM_PAGE = 6  # page index of the first table; earlier pages are the introduction, a worked example and an excerpt
BANDS = {"K-2": ["k", "1", "2"], "3-5": ["3", "4", "5"], "6-8": ["6", "7", "8"], "9-12": ["9"]}


def science(out: Standards) -> None:
    for printed, text in cells("steels-2023", STEELS_CODE, STEELS_STOP, width=300, first_page=STEELS_TABLES_FROM_PAGE):
        code = re.sub(r"^(3\.\d\.[^.]+)\.?([A-Z]{1,2})$", r"\1.\2", printed)
        text = re.sub(r"(\s*Refer to other standards in this document to build a learning progression\.)+", "", text)
        token = code.split(".")[2]
        for g in BANDS.get(token) or ([grade_of(token)] if grade_of(token) else []):
            add(out, g, "science", code, text)


# --- Social studies ------------------------------------------------------------------------------------------------

SOCIAL_CODE = re.compile(
    r"^(?:5|6|7|8|17)\.\d{1,2}\.(?:PK|K|\d{1,2}|U|W|C|K-2|3-5|6-8|9-12)\.[A-Z]{1,2}\.?$"
    r"|^(?:7\.1\.1A\.|7\.1\.71B\.|7\.4\.4\.PK\.A\.|8\.3\.3PK\.C\.)$"
)
SOCIAL_FIXES = {  # (document, printed code) -> the code its column and neighbours show
    ("geography-primary", "7.1.1A."): "7.1.2.A",
    ("geography-primary", "7.1.71B."): "7.1.2.B",
    ("geography-primary", "7.4.4.PK.A."): "7.4.PK.A",
    ("history-primary", "8.3.3PK.C."): "8.3.PK.C",
    ("history-primary", "8.2.8.B."): "8.2.3.B",  # printed in the Grade 3 column
}
SOCIAL_TOKENS = {"primary": {"PK", "K", "1", "2", "3"}, "elementary": {"3", "4", "5", "6", "7", "8"},
                 "secondary": {"9", "12", "U", "W", "C"}}
NONE = re.compile(r"^$")
BANDED_DOCS = {"economics-2026", "personal-finance-2026"}  # their section headings are 11 pt, standards 10 pt


def social(out: Standards) -> None:
    # (documents in the order they are read, so a later one's Grade 3 words win)
    for subject_docs in (
        ["civics-primary", "civics-elementary", "civics-secondary"],
        ["economics-2026"],
        ["geography-primary", "geography-elementary", "geography-secondary"],
        ["history-primary", "history-elementary", "history-secondary"],
        ["personal-finance-2026"],
    ):
        for name in subject_docs:
            level = name.rsplit("-", 1)[-1]
            for printed, text in cells(name, SOCIAL_CODE, NONE, width=190, merge=40,
                                       max_size=10.5 if name in BANDED_DOCS else 99):
                if not clean(text):
                    continue  # an "Intentionally blank" cell (a few carry a wrong code)
                code = SOCIAL_FIXES.get((name, printed), printed.rstrip("."))
                token = code.split(".")[2]
                if level in SOCIAL_TOKENS:
                    if token not in SOCIAL_TOKENS[level]:
                        raise SystemExit(f"{name}: code {printed} is not a {level} grade; add it to SOCIAL_FIXES")
                    grades = ["9"] if level == "secondary" else [grade_of(token)] if grade_of(token) else []
                else:
                    grades = BANDS[token]
                for g in grades:
                    add(out, g, "social", code, text)


def build() -> dict:
    out: Standards = {}
    math(out)
    language(out)
    science(out)
    social(out)
    result = {}
    for g in GRADES:
        for s in SUBJECTS:
            box = out.get(f"{g}/{s}")
            if box:
                result[f"{g}/{s}"] = [
                    {"idx": code, "kind": "standard", "content": box[code]} for code in sorted(box, key=natural)
                ]
    return result


def report(built: dict) -> None:
    for key, items in built.items():
        print(f"{key}: {len(items)}")
    print("total", sum(len(v) for v in built.values()), "in", len(built), "keys")


if __name__ == "__main__":
    data = build()
    text = json.dumps(data, ensure_ascii=False, indent=1) + "\n"
    if "--write" in sys.argv:
        OUT.write_text(text, encoding="utf-8")
        print("wrote", OUT)
        report(data)
    else:
        committed = OUT.read_text(encoding="utf-8") if OUT.exists() else ""
        if committed != text:
            old = json.loads(committed) if committed else {}
            for key in sorted(set(old) | set(data), key=lambda k: list(data).index(k) if k in data else 999):
                a = {x["idx"]: x["content"] for x in old.get(key, [])}
                b = {x["idx"]: x["content"] for x in data.get(key, [])}
                if a != b:
                    print(f"{key}: +{len(set(b) - set(a))} -{len(set(a) - set(b))} changed {sum(1 for i in a if i in b and a[i] != b[i])}", file=sys.stderr)
            diff = list(difflib.unified_diff(committed.splitlines(), text.splitlines(), "committed", "built", n=0, lineterm=""))
            print("\n".join(diff[:40]), file=sys.stderr)
            sys.exit("outcomes.json does not match the sources; run with --write")
        print("outcomes.json matches the sources")
        report(data)
