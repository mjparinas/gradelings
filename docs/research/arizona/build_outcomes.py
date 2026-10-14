"""Builds outcomes.json from the Arizona Department of Education's standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
       python3 -I build_outcomes.py --text [source-dir]   also writes a .txt extract next to every PDF
Needs pdfplumber.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Grade 9 lists the high school standards: Algebra 1 in math ("A1.A-SSE.A.1"), the Grades
9-10 English language arts standards ("9-10.RL.1"), the high school science standards ("HS.L2U1.20") and the high
school history and social science standards ("HS.C2.1").

Codes, all printed in the documents:
  math      Arizona Mathematics Standards (adopted December 2016): "4.NBT.A.1" (grade, domain, cluster, number); Algebra 1
            "A1.F-IF.B.4". Grade 1 splits one standard in two ("1.MD.B.3a" time, "1.MD.B.3b" coins). The Kindergarten document prints "K.0A" with a zero for Operations and Algebraic Thinking; the
            code is read as "K.OA".
  language  Arizona English Language Arts Standards (adopted 2016): "4.RL.1", "4.RI.2", "4.RF.3", "4.W.1", "4.SL.1",
            "4.L.4"; "9-10.RL.1". Placeholders ("(Begins in grade 2)", "(Not applicable to literature)") are left out.
  science   Arizona Science Standards (adopted October 2018, modified 2021-22): "4.P4U1.1" (grade, core idea, use or
            understand, number), "HS.E1U1.4". A few high school standards are printed with a "+" (for advanced study,
            "HS+C.P1U1.1"); they are kept as printed.
  social    Arizona History and Social Science Standards (adopted October 2018, modified 8/23/19): "4.H1.1" (grade, strand
            and anchor standard, number), strands SP (disciplinary skills and processes), C (civics), E (economics), G
            (geography) and H (history); high school "HS.C1.1".
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
    text = text.replace("‐", "-").replace("­", "").replace("‑", "-")
    return re.sub(r"\s+", " ", text).strip()


def grade_of(label):
    label = label.upper()
    if label == "K":
        return "k"
    if label in ("HS", "A1", "9-10") or label.startswith("HS"):
        return "9"
    return label


def add(grade, subject, idx, kind, content):
    content = clean(content)
    if not content or re.match(r"\((Begins|Not applicable)", content):
        return
    entries = OUT[f"{grade}/{subject}"]
    if idx in entries:
        if content not in entries[idx]["content"]:
            entries[idx]["content"] = clean(entries[idx]["content"] + " " + content)
        return
    entries[idx] = {"idx": idx, "kind": kind, "content": content}


# ---------------------------------------------------------------- math and English language arts (tables)
MATH_CODE = re.compile(r"^\*?((?:K|[1-8])\.[A-Z0]{1,3}\.[A-Z]\.\d+[a-z]?|A1\.[A-Z]-[A-Z]{2,4}\.[A-Z]\.\d+)$")
ELA_CODE = re.compile(r"^\*?((?:K|[1-8]|9-10)\.(?:RL|RI|RF|W|SL|L)\.\d+)$")


def tables(path, code_re, subject):
    """Reads the standards tables: a row whose cell is a code starts a standard, and the cells after it are its text.
    A row with no code and an empty first cell continues the standard above; any other row (a cluster heading) ends it.
    Where a code's cell is merged across several rows, the PDF can put the first lines of a long standard in the rows
    above its code, so a few long standards' text starts in the one before; outcomes.json is checked on codes, and the
    PDFs in source/ are the record for wording."""
    found = 0
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for table in page.extract_tables():
                current = None
                for row in table:
                    cells = [clean(c or "") for c in row]
                    # "7. NS.A.1": a stray space inside a printed code.
                    cells = [re.sub(r"^(\*?[0-9K]+)\. ", r"\1.", c) for c in cells]
                    hit = next((i for i, c in enumerate(cells) if code_re.match(c)), None)
                    if hit is not None:
                        # The Kindergarten document prints "K.0A.A.1" (a zero) for K.OA.A.1.
                        current = code_re.match(cells[hit]).group(1).replace(".0A.", ".OA.")
                        add(grade_of(current.split(".")[0]), subject, current, "standard", " ".join(c for c in cells[hit + 1:] if c))
                        found += 1
                    elif current and not cells[0] and any(cells):
                        add(grade_of(current.split(".")[0]), subject, current, "standard", " ".join(c for c in cells if c))
                    else:
                        current = None
    if not found:
        fail(f"no standards found in {path}")


# ---------------------------------------------------------------- science (left column of each standards page)
SCI_CODE = re.compile(r"^(?:Essential |Plus )?((?:K|[1-8]|HS(?:\+[A-Za-z]+)?)\.[PLE]\dU\d\.\d+)$")


def left_column(page):
    """The text of a standards page's left column: whole words that start left of the middle, grouped into lines."""
    words = page.extract_words()
    # The right column ("Crosscutting Concepts & Background Information") starts at a different place on some pages.
    right = [w["x0"] for w in words if w["text"].startswith("Crosscutting") and w["x0"] > 250]
    edge = min(right) - 2 if right else page.width * 0.44
    words = sorted((w for w in words if w["x0"] < edge), key=lambda w: (round(w["top"]), w["x0"]))
    lines, last = [], None
    for w in words:
        if last is not None and abs(w["top"] - last) < 3:
            lines[-1].append(w["text"])
        else:
            lines.append([w["text"]])
            last = w["top"]
    return "\n".join(" ".join(l) for l in lines)


SCI_ANY = re.compile(r"(?:^|Essential |Plus )((?:K|[1-8]|HS(?:\+[A-Za-z]+)?)\.[PLE]\dU\d\.\d+)\b")
SCI_STOP = re.compile(r"\b[PLE]\d: |Essential |Plus |Background|Crosscutting|(Physics|Chemistry|Biology|Earth and Space) [–-]|"
                      r"Arizona Department of Education|Page\s*\||Arizona 2018 Science|Essential standards are|Sciences: Students|Standards$")


def science(path):
    """The standards are in the left column of each grade's pages: a code on its own line ("4.P4U1.1"; high school
    "Essential HS.P1U1.2", "Plus HS+C.P1U1.4"), then its text. Overview tables on some high school pages put several codes
    on one line; their text is taken up to the next heading."""
    with pdfplumber.open(path) as pdf:
        started = False
        for page in pdf.pages:
            left = left_column(page)
            if not started:
                # The standards start at Kindergarten's physical science page; earlier pages list changes and examples.
                if re.search(r"^K\.P2U1\.1$", left, re.M) and "Investigate how senses" in left:
                    started = True
                else:
                    continue
            current, buf = None, []

            def flush():
                if current:
                    add(grade_of(current.split(".")[0]), "science", current, "standard", " ".join(buf))

            for line in left.split("\n"):
                line = line.strip()
                m = SCI_CODE.match(line)
                if m:
                    flush()
                    current, buf = m.group(1), []
                    continue
                hits = SCI_ANY.findall(line)
                if hits or SCI_STOP.search(line):
                    flush()
                    current, buf = None, []
                    for code in hits:
                        OUT[f"{grade_of(code.split('.')[0])}/science"].setdefault(code, {"idx": code, "kind": "standard", "content": ""})
                elif current:
                    buf.append(line)
            flush()
    for key in OUT:
        if key.endswith("/science"):
            for code, entry in list(OUT[key].items()):
                if not entry["content"]:
                    del OUT[key][code]
                    print("warning: no text for", code, file=sys.stderr)


# ---------------------------------------------------------------- history and social science (bulleted lists)
SOC_CODE = re.compile(r"^[●•]\s*((?:K|[1-8]|HS)\.(?:SP|C|E|G|H)\d\.\d+)\s*(.*)$")


def social(path):
    """A standard is a bullet with a code ("● 4.H1.1 ...", "• HS.C1.1 ..."). Its text runs on while a line is clearly
    part of the same sentence (the text so far doesn't end a sentence, or the line starts in lower case); examples
    ("• Such as ...") and anchor statements end it."""
    with pdfplumber.open(path) as pdf:
        current, buf = None, []

        def flush():
            if current:
                add(grade_of(current.split(".")[0]), "social", current, "standard", " ".join(buf))

        for page in pdf.pages:
            for line in (page.extract_text() or "").split("\n"):
                line = line.strip()
                m = SOC_CODE.match(line)
                if m:
                    flush()
                    current, buf = m.group(1), [m.group(2)] if m.group(2) else []
                elif current and line and not line.startswith(("•", "●")) and not re.match(r"^(Arizona History and Social Science|Page \d)", line) and (
                    not buf or not buf[-1].rstrip().endswith((".", "?")) or line[0].islower()
                ):
                    buf.append(line)
                else:
                    flush()
                    current, buf = None, []
        flush()


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    src = Path(args[0]) if args else Path(__file__).parent / "source"
    if "--text" in sys.argv:
        for pdf in sorted(src.glob("*.pdf")):
            with pdfplumber.open(pdf) as doc:
                pdf.with_suffix(".txt").write_text("\n\n".join(p.extract_text() or "" for p in doc.pages) + "\n")
    for g in ["k", "1", "2", "3", "4", "5", "6", "7", "8"]:
        tables(src / f"math-{g}.pdf", MATH_CODE, "math")
        tables(src / f"ela-{g}.pdf", ELA_CODE, "language")
    tables(src / "math-algebra-1.pdf", MATH_CODE, "math")
    tables(src / "ela-9-10.pdf", ELA_CODE, "language")
    science(src / "science.pdf")
    social(src / "social.pdf")
    out = OrderedDict((k, list(v.values())) for k, v in OUT.items())
    for k, v in out.items():
        if not v:
            fail(f"no standards for {k}")
    (Path(__file__).parent / "outcomes.json").write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print({k: len(v) for k, v in out.items()})


main()
