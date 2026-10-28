"""Builds outcomes.json from Washington, DC's standards: the Common Core and the NGSS as the Achievement Standards Network
publishes them (DC adopted the Common Core in 2010 and the NGSS in December 2013), and the DC Social Studies Standards
(2023), approved by the DC State Board of Education on June 21, 2023 (SR23-7), read from OSSE's English PDF (see fetch.sh
and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs only the standard library and pdftotext (poppler), which fetch.sh also uses; the .txt files it writes are read.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. A statement is listed under every grade from Kindergarten to Grade 9 that its grade levels
cover: high school statements under 9, the science K-2 and 3-5 engineering expectations under their grades, and middle
school science under 6, 7 and 8.

Codes:
  math      the Common Core codes as the standards print them: "4.NBT.1"; high school "A-SSE.1", "F-IF.4" (ASN writes
            "A.SSE.1", so the first full stop of a high school code becomes a hyphen). Standards only, not their lettered
            parts.
  language  "RL.4.2", "RI.5.3", "RF.2.3", "W.4.1", "SL.4.1", "L.4.4"; Grade 9 "RL.9-10.1". Standards only.
  science   the Next Generation Science Standards performance expectations: "4-PS3-2", "MS-LS1-1", "HS-ESS2-4".
  social    the DC Social Studies Standards as they print them: "K.1", "3.20", numbered through each grade; Grade 9 is
            the high school course World History I ("WH1.12"), which DC students usually take in 9th grade. The other
            high school courses (World History II "WH2", US History II "US2", Government and Civics "GC", and DC History
            and Government "DC") are not listed, because they come after 9th grade.
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
CORE = "http://purl.org/ASN/schema/core/"
TERMS = "http://purl.org/dc/terms/"

FILES = {
    "math": "asn-math-D2472998.json",
    "language": "asn-ela-D2473702.json",
    "science": "asn-science-D2599182.json",
}
SOCIAL_TXT = "osse-dc-social-studies-standards.txt"
# Numbers the English edition skips: Grade 5 goes from 5.26 (the Underground Railroad) to 5.28, so there is no 5.27.
# (The Spanish edition skips 5.22 instead and numbers the Underground Railroad standard 5.27.) Codes are cited as the
# English edition prints them. US History II prints its 56th standard as "US.56" (Vietnam), so US2.56 is left out.
NUMBERING_GAPS = {"5": [27], "US2": [56]}


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    text = text.replace("‐", "-").replace("­", "").replace("–", "-")
    return re.sub(r"\s+", " ", text).strip()


def value(statement, key):
    found = statement.get(key) or [{}]
    return found[0].get("value")


def grades_of(statement):
    """The app's grades (k to 9) the statement's education levels cover."""
    levels = [v["value"].rsplit("/", 1)[-1] for v in statement.get(TERMS + "educationLevel", [])]
    out = []
    for level in levels:
        g = "k" if level == "K" else level
        if g in GRADES and g not in out:
            out.append(g)
    return out


OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


def add(grade, subject, idx, kind, content):
    entries = OUT[f"{grade}/{subject}"]
    if idx not in entries:
        entries[idx] = {"idx": idx, "kind": kind, "content": clean(content)}


def statements(src, subject):
    data = json.loads((src / FILES[subject]).read_text())
    # Statements in document order: ASN lists them in the order of the original document.
    return [s for s in data.values() if value(s, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") == CORE + "Statement"]


MATH = re.compile(r"^(?:K|[1-8])\.(?:CC|OA|NBT|NF|MD|G|RP|NS|EE|F|SP)\.\d+$|^[NAFGS]\.[A-Z]{1,3}\.\d+$")
ELA = re.compile(r"^(?:RL|RI|RF|W|SL|L)\.(?:K|[1-8]|9-10)\.\d+$")
SCIENCE = re.compile(r"^(?:K|[1-5]|MS|HS|K-2|3-5)-(?:PS|LS|ESS|ETS)\d-\d+$")
# A standard starts a line with its code and a space: "3.20 Explain the reasons for ...".
SOCIAL = re.compile(r"^(K|[1-8]|WH1|WH2|US2|GC|DC)\.(\d+) (.*)$")
# Lines that end a standard's text: the running page header, a driving concept, or a heading.
SOCIAL_STOP = re.compile(r"^(?:Washington, DC \||Driving Concept|STANDARD:|Grade \d|Kindergarten|World History|U\.S\. History|US History|Government and Civics|DC History|Historia)")


def math(src):
    """Common Core State Standards for Mathematics (2010), DC's mathematics standards since 2010."""
    for s in statements(src, "math"):
        code = value(s, CORE + "altStatementNotation") or ""
        if value(s, CORE + "statementLabel") != "Standard" or not MATH.match(code):
            continue
        high = code[0] in "NAFGS" and code.split(".")[1].isalpha()
        if high:
            code = code.replace(".", "-", 1)
        for g in ["9"] if high else grades_of(s):
            add(g, "math", code, "high school standard" if high else "standard", value(s, TERMS + "description") or "")


def language(src):
    """Common Core State Standards for English Language Arts & Literacy (2010)."""
    for s in statements(src, "language"):
        code = value(s, CORE + "altStatementNotation") or ""
        if value(s, CORE + "statementLabel") != "Standard" or not ELA.match(code):
            continue
        for g in grades_of(s):
            add(g, "language", code, "standard", value(s, TERMS + "description") or "")


def science(src):
    """Next Generation Science Standards (2013), DC's science standards since December 2013."""
    for s in statements(src, "science"):
        code = value(s, CORE + "statementNotation") or ""
        if value(s, CORE + "statementLabel") != "Performance Expectation" or not SCIENCE.match(code):
            continue
        band = code.split("-")[0]
        if code.startswith("K-2-"):
            grades = ["k", "1", "2"]
        elif code.startswith("3-5-"):
            grades = ["3", "4", "5"]
        elif band == "MS":
            grades = ["6", "7", "8"]
        elif band == "HS":
            grades = ["9"]
        else:
            grades = ["k" if band == "K" else band]
        for g in grades:
            add(g, "science", code, "performance expectation", value(s, TERMS + "description") or "")


def social(src):
    """The DC Social Studies Standards (2023), from OSSE's English PDF as pdftotext -layout writes it."""
    lines = (src / SOCIAL_TXT).read_text().splitlines()
    found = OrderedDict()
    current = None
    for raw in lines:
        line = raw.strip()
        # Standards sit in one column per page (some pages are indented for a sidebar); the running header and the
        # sidebar title sit far to the right. A standard's text goes on at its own indent.
        indent = len(raw) - len(raw.lstrip())
        m = SOCIAL.match(line) if indent < 60 else None
        if m:
            course, n, text = m.groups()
            current = f"{course}.{n}"
            at = indent
            if current in found:
                fail(f"{current} printed twice")
            found[current] = text
        elif current and line and abs(indent - at) <= 2 and not SOCIAL_STOP.match(line):
            found[current] += " " + line
        else:
            current = None
    # Each grade or course is numbered 1, 2, 3 ... with no gaps, so a missed or misread code shows up here.
    by_course = OrderedDict()
    for code in found:
        course, n = code.split(".")
        by_course.setdefault(course, []).append(int(n))
    for course, numbers in by_course.items():
        gaps = NUMBERING_GAPS.get(course, [])
        if sorted(numbers + gaps) != list(range(1, len(numbers) + len(gaps) + 1)):
            fail(f"{course} standards are not numbered 1 to {len(numbers)}: {numbers}")
    for code, text in found.items():
        course = code.split(".")[0]
        grade = "k" if course == "K" else "9" if course == "WH1" else course
        if grade in GRADES:
            add(grade, "social", code, "standard", text)
    return by_course


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "source"
    math(src)
    language(src)
    science(src)
    courses = social(src)
    out = OrderedDict((key, list(entries.values())) for key, entries in OUT.items())
    for key, entries in out.items():
        if not entries:
            fail(f"no standards for {key}")
    path = Path(__file__).parent / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print(f"Wrote {sum(len(e) for e in out.values())} entries to {path}")
    print("Social studies standards per grade or course:", ", ".join(f"{c} {len(n)}" for c, n in courses.items()))


if __name__ == "__main__":
    main()
