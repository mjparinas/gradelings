"""Builds outcomes.json from South Dakota's content standards (South Dakota Department of Education; see fetch.sh and
README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)

Reads the plain-text copies fetch.sh makes of each PDF (pdftotext -layout), so it needs no PDF library.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Spans are listed under every grade they cover: science K-2 and 3-5 engineering standards
under their grades, middle school (MS) under 6, 7 and 8, high school (HS) under 9; English language arts Grades 9-10
under 9; the high school mathematics courses and the five high school social studies courses under 9.

Codes:
  math      the South Dakota State Standards for Mathematics (2018): domain and number, "K.CC.4", "4.NBT.1",
            "8.F.4"; the high school courses (Algebra I, Geometry, Algebra II, 4th Year) "A.SSE.1", "F.IF.4". The
            document prints the domain code beside each domain heading and numbers the standards inside it.
  language  the English Language Arts Standards (2025), as printed: "K.RL.1", "4.RI.2", "1.RF.3", "5.L.4";
            Grade 9 cites the Grades 9-10 band, "9-10.RL.1".
  science   the Science Standards (2024), as printed: "K-PS2-1", "4-PS3-2", "MS-LS1-1", "HS-ESS2-4", and the
            engineering standards "K-2-ETS1-1", "3-5-ETS1-2", "MS-ETS1-1", "HS-ETS1-3".
  social    the Social Studies Standards (2023), as printed: "K.SS.2", "4.SS.5"; high school "9-12.USH.3" (United
            States History), "9-12.C.4" (United States Government/American Civics), "9-12.WH.2" (World History),
            "9-12.WG.1" (World Geography) and "9-12.E.3" (Economics). Subpoints ("4.SS.5.A") are not listed.
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


def clean(text):
    text = text.replace("‐", "-").replace("­", "").replace("–", "-").replace("ﬁ", "fi").replace("ﬀ", "ff")
    return re.sub(r"\s+", " ", text).strip()


def add(grades, subject, idx, kind, content):
    for grade in grades:
        entries = OUT[f"{grade}/{subject}"]
        if idx not in entries:
            entries[idx] = {"idx": idx, "kind": kind, "content": clean(content)}
        elif len(entries[idx]["content"]) < 12 and content:
            entries[idx]["content"] = clean(content)


def lines_of(path):
    return path.read_text(encoding="utf-8").split("\n")


PAGE_FOOTER = re.compile(r"South Dakota (State Standards for Mathematics|English Language Arts Standards|Science Standards|Social Studies Standards)|^\s*Adopted \w+ \d+, \d{4}\s*$")


# ---------------------------------------------------------------- math
MATH_DOMAIN = re.compile(
    r"^\s*(\S.*?)\s{3,}((?:K|[1-8])\.(?:CC|OA|NBT|NF|MD|G|RP|NS|EE|F|SP)|[NAFGS]\.(?:RN|Q|CN|VM|SSE|APR|CED|REI|IF|BF|LE|TF|CO|SRT|C|GPE|GMD|MG|ID|IC|CP|MD))\s*$"
)
MATH_STD = re.compile(r"^(\s{0,8})(\d{1,2})\.\s+(\S.*?)\s*$")
MATH_CLUSTER = re.compile(r"^\s{0,4}[A-H]\.\s+\S")


def math(src):
    """South Dakota State Standards for Mathematics (2018)."""
    lines = lines_of(src / "math-2018.txt")
    start = next(i for i, line in enumerate(lines) if re.match(r"^Grade K Standards\s*$", line))
    domain, seen, current, indent, grades = None, set(), None, 0, []
    for line in lines[start:]:
        if not line.strip() or PAGE_FOOTER.search(line):
            continue
        m = MATH_DOMAIN.match(line)
        if m:
            domain, seen, current = m.group(2), set(), None
            grades = ["9"] if domain[0] in "NAFGS" and domain[1] == "." else ["k" if domain[0] == "K" else domain[0]]
            continue
        if re.match(r"^\s*(Mathematics\s*\||Grade \d Overview|.* Overview\s*$|.* Introduction\s*$)", line):
            domain, current = None, None
            continue
        if not domain:
            continue
        if MATH_CLUSTER.match(line):
            current = None
            continue
        s = MATH_STD.match(line)
        # Standards are numbered inside each domain, mostly in order (1st grade lists 1.MD.5 before 1.MD.4, and the high
        # school courses skip numbers another course teaches).
        if s and int(s.group(2)) not in seen and int(s.group(2)) <= max(seen, default=0) + 6:
            number = int(s.group(2))
            seen.add(number)
            current, indent = f"{domain}.{number}", len(s.group(1))
            add(grades, "math", current, "high school standard" if grades == ["9"] else "standard", s.group(3))
            continue
        lead = len(line) - len(line.lstrip())
        if current and lead > indent:
            entry = OUT[f"{grades[0]}/math"][current]
            if len(entry["content"]) < 600:
                entry["content"] = clean(entry["content"] + " " + line)
        else:
            current = None


# ---------------------------------------------------------------- English language arts
ELA_CODE = re.compile(r"^\s*((K|[1-8]|9-10|11-12|6-8)\.(RL|RI|RF|W|SL|L|RH|RST|WHST)\.(\d+))\b\s*(.*)$")


def ela_grades(band):
    return {"K": ["k"], "9-10": ["9"], "11-12": [], "6-8": ["6", "7", "8"]}.get(band, [band])


# Misprints in the document, keyed by the code printed before them: Grade 6's fifth informational text standard is
# printed "5.RI.5".
ELA_TYPOS = {("6.RI.4", "5.RI.5"): ("6.RI.5", "6")}


def language(src):
    """English Language Arts Standards (2025). Each standard is a block of lines between blank lines, with its code in
    the left column: on the block's first line in Kindergarten to Grade 5, and beside the middle of the block from
    Grade 6 on. A block without a code that follows a standard (its later subpoints) belongs to it."""
    lines = [line for line in lines_of(src / "ela-2025.txt") if not PAGE_FOOTER.search(line)]
    start = next(i for i, line in enumerate(lines) if re.match(r"^\s*Kindergarten\s*$", line) and i > 150)
    blocks, block = [], []
    for line in lines[start:] + [""]:
        if line.strip():
            block.append(line)
        elif block:
            blocks.append(block)
            block = []
    current, previous = None, None
    for block in blocks:
        hits = [(i, ELA_CODE.match(line)) for i, line in enumerate(block)]
        hits = [(i, m) for i, m in hits if m]
        if len(hits) != 1:
            current = None if hits else current
            for _, m in hits:
                code, band = ELA_TYPOS.get((previous, m.group(1)), (m.group(1), m.group(2)))
                previous = code
                add(ela_grades(band), "language", code, "standard", m.group(5))
            if not hits and current and all(line.startswith(" " * 10) for line in block):
                for grade in current[1]:
                    entry = OUT[f"{grade}/language"][current[0]]
                    if len(entry["content"]) < 600:
                        entry["content"] = clean(entry["content"] + " " + " ".join(block))
            continue
        i, m = hits[0]
        code, band = ELA_TYPOS.get((previous, m.group(1)), (m.group(1), m.group(2)))
        previous = code
        text = " ".join(block[:i] + [m.group(5)] + block[i + 1 :])
        kind = "literacy standard" if m.group(3) in ("RH", "RST", "WHST") else "standard"
        current = (code, ela_grades(band))
        add(current[1], "language", code, kind, text[:600])


# ---------------------------------------------------------------- science
SCI_CODE = re.compile(r"^\s*((K|[1-5]|MS|HS)-(PS|LS|ESS|ETS)\d-\d+|(K-2|3-5)-ETS1-\d)\s+([A-Z].*)$")
SCI_BAND = {"K-2": ["k", "1", "2"], "3-5": ["3", "4", "5"], "MS": ["6", "7", "8"], "HS": ["9"], "K": ["k"]}


def science(src):
    """Science Standards (2024)."""
    lines = lines_of(src / "science-2024.txt")
    # The "How to read" example (K-PS2-2) comes before the standards, which start with Kindergarten.
    start = next(i for i, line in enumerate(lines) if re.match(r"^\s*Kindergarten\s*$", line) and i > 200)
    current = None
    for line in lines[start:]:
        if PAGE_FOOTER.search(line):
            continue
        m = SCI_CODE.match(line)
        if m:
            code = m.group(1)
            band = m.group(4) or m.group(2)
            grades = SCI_BAND.get(band, [band])
            current = (code, grades)
            kind = "engineering standard" if "ETS" in code else "performance expectation"
            add(grades, "science", code, kind, m.group(5))
            continue
        if current and line.startswith(" " * 12) and line.strip():
            for grade in current[1]:
                entry = OUT[f"{grade}/science"][current[0]]
                if len(entry["content"]) < 600 and not re.search(r"\(SEP:|Alignment may include", entry["content"]):
                    entry["content"] = clean(entry["content"] + " " + line)
        else:
            current = None


# ---------------------------------------------------------------- social studies
SS_CODE = re.compile(r"^\s*((K|[1-8])\.SS\.(\d+)|9-12\.(WH|WG|E|USH|C)\.(\d+))\.?\s+(\S.*)$")


def social(src):
    """Social Studies Standards (2023)."""
    lines = lines_of(src / "social-2023.txt")
    # Skip the "Streamlined Identification" examples (K.SS.1 and 9-12.WH.1) before the Kindergarten standards.
    start = next(i for i, line in enumerate(lines) if re.match(r"^\s*Kindergarten\s*$", line) and i > 280)
    current = None
    for line in lines[start:]:
        if PAGE_FOOTER.search(line):
            continue
        m = SS_CODE.match(line)
        if m:
            code = m.group(1)
            grade = "9" if code.startswith("9-12") else ("k" if code[0] == "K" else code[0])
            current = (code, grade)
            add([grade], "social", code, "high school standard" if grade == "9" else "standard", m.group(6))
            continue
        if current and line.strip() and not re.match(r"^\s*[A-Z]\.\s", line) and not line.strip().startswith("̵"):
            entry = OUT[f"{current[1]}/social"][current[0]]
            if len(entry["content"]) < 400:
                entry["content"] = clean(entry["content"] + " " + line)
        elif line.strip():
            current = None


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "source"
    math(src)
    language(src)
    science(src)
    social(src)
    # "Not applicable to literature" (RL.8) holds a number in each grade's list but is no standard.
    out = OrderedDict((key, [e for e in entries.values() if not e["content"].startswith("Not applicable")]) for key, entries in OUT.items())
    for key, entries in out.items():
        if not entries:
            fail(f"no standards for {key}")
    path = Path(__file__).parent / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(e) for e in out.values())} entries to {path}")


if __name__ == "__main__":
    main()
