"""Builds outcomes.json from New Hampshire's standards as the Achievement Standards Network publishes them for the New
Hampshire jurisdiction (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs only the standard library.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. A statement is listed under every grade from Kindergarten to Grade 9 that its grade levels
cover: high school statements under 9, the science K-2 and 3-5 engineering expectations under their grades, middle
school science under 6, 7 and 8, and the social studies grade spans (K-2, 3-4, 5-6, 7-8, 9-12) under each grade in them.

Codes:
  math      the Common Core codes as the standards print them: "4.NBT.1"; high school "A-SSE.1", "F-IF.4" (ASN writes
            "A.SSE.1", so the first full stop of a high school code becomes a hyphen). Standards only, not their lettered
            parts.
  language  "RL.4.2", "RI.5.3", "RF.2.3", "W.4.1", "SL.4.1", "L.4.4"; Grade 9 "RL.9-10.1". Standards only.
  science   the Next Generation Science Standards performance expectations: "4-PS3-2", "MS-LS1-1", "HS-ESS2-4".
  social    the 2006 framework's grade span expectations: "SS:CV:4:2.1" is strand (CV Civics and Governments, EC
            Economics, GE Geography, HI US / NH History, WH World History and Contemporary Issues), the last grade of
            the span (2, 4, 6, 8 or 12), then standard and expectation.
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
    "math": "asn-math-D2522215.json",
    "language": "asn-ela-D2522919.json",
    "science": "asn-science-D2777191.json",
    "social": "asn-social-D10002B7.json",
}


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
SOCIAL = re.compile(r"^SS:(?:CV|EC|GE|HI|WH):(?:2|4|6|8|12):\d+\.\d+$")


def math(src):
    """NH Common Core State Standards for Mathematics (2010)."""
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
    """NH Common Core State Standards for English Language Arts & Literacy (2010)."""
    for s in statements(src, "language"):
        code = value(s, CORE + "altStatementNotation") or ""
        if value(s, CORE + "statementLabel") != "Standard" or not ELA.match(code):
            continue
        for g in grades_of(s):
            add(g, "language", code, "standard", value(s, TERMS + "description") or "")


def science(src):
    """NH Career & College-Ready Science Standards (the Next Generation Science Standards, 2016)."""
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
    """K-12 Social Studies New Hampshire Curriculum Framework (2006): the grade span expectations."""
    for s in statements(src, "social"):
        code = value(s, CORE + "statementNotation") or ""
        if not SOCIAL.match(code):
            continue
        text = re.sub(r"\s*\(Themes?:.*$", "", value(s, TERMS + "description") or "")
        for g in grades_of(s):
            add(g, "social", code, "grade span expectation", text)


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "source"
    math(src)
    language(src)
    science(src)
    social(src)
    out = OrderedDict((key, list(entries.values())) for key, entries in OUT.items())
    for key, entries in out.items():
        if not entries:
            fail(f"no standards for {key}")
    path = Path(__file__).parent / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print(f"Wrote {sum(len(e) for e in out.values())} entries to {path}")


if __name__ == "__main__":
    main()
