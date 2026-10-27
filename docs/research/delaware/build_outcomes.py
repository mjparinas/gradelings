"""Builds outcomes.json from Delaware's content standards as the Achievement Standards Network publishes them for the
Delaware jurisdiction (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs only the standard library.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. A statement is listed under every grade from Kindergarten to Grade 9 that its grade levels
cover: high school statements under 9, the science K-2 and 3-5 engineering expectations under their grades, middle
school science under 6, 7 and 8, and the social studies grade clusters (K-3, 4-5, 6-8, 9-12) under each grade in them.

Codes:
  math      the Common Core codes as the standards print them: "4.NBT.1"; high school "A-SSE.1", "F-IF.4" (ASN writes
            "A.SSE.1", so the first full stop of a high school code becomes a hyphen). Standards only, not their lettered
            parts. Delaware adopted the Common Core as its mathematics standards in 2010 (14 DE Admin. Code 501).
  language  "RL.4.2", "RI.5.3", "RF.2.3", "W.4.1", "SL.4.1", "L.4.4"; Grade 9 "RL.9-10.1" (ASN writes "CC4RL2" and
            "CC9-10RL1"). Standards only; the literacy standards for history, science and technical subjects are left
            out.
  science   the Next Generation Science Standards performance expectations: "4-PS3-2", "MS-LS1-1", "HS-ESS2-4".
  social    the Delaware Standards for Civics, Economics, Geography and History (2018), written for grade clusters:
            "C.1.4-5.a" is Civics standard 1, the 4-5 cluster, benchmark a (C Civics, E Economics, G Geography,
            H History). ASN prints two codes out of pattern, "G.14-5.a" and "G.1.9-12b"; they are read as "G.1.4-5.a"
            and "G.1.9-12.b".
"""

import html
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
    "math": ["asn-math-D2547470.json"],
    "language": ["asn-ela-D2548174.json"],
    "science": ["asn-science-D2603111.json"],
    "social": [
        "asn-civics-D21189430.json",
        "asn-economics-D21189461.json",
        "asn-geography-D21189484.json",
        "asn-history-D21189378.json",
    ],
}

CLUSTERS = {
    "K-3": ["k", "1", "2", "3"],
    "4-5": ["4", "5"],
    "6-8": ["6", "7", "8"],
    "9-12": ["9"],
}


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    text = html.unescape(re.sub(r"<li>", " ", text))
    text = re.sub(r"<[^>]+>", " ", text)
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
    out = []
    for name in FILES[subject]:
        data = json.loads((src / name).read_text())
        # Statements in document order: ASN lists them in the order of the original document.
        out += [s for s in data.values() if value(s, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") == CORE + "Statement"]
    return out


MATH = re.compile(r"^(?:K|[1-8])\.(?:CC|OA|NBT|NF|MD|G|RP|NS|EE|F|SP)\.\d+$|^[NAFGS]\.[A-Z]{1,3}\.\d+$")
ELA = re.compile(r"^CC(K|[1-8]|9-10)(RL|RI|RF|W|SL|L)(\d+)$")
SCIENCE = re.compile(r"^(?:K|[1-5]|MS|HS|K-2|3-5)-(?:PS|LS|ESS|ETS)\d-\d+$")
SOCIAL = re.compile(r"^([CEGH])\.(\d)\.(K-3|4-5|6-8|9-12)\.([a-z])$")


def math(src):
    """Common Core State Standards for Mathematics (2010)."""
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
        m = ELA.match(value(s, CORE + "statementNotation") or "")
        if value(s, CORE + "statementLabel") != "Standard" or not m:
            continue
        band, strand, number = m.groups()
        code = f"{strand}.{band}.{number}"
        for g in ["9"] if band == "9-10" else grades_of(s):
            add(g, "language", code, "standard", value(s, TERMS + "description") or "")


def science(src):
    """Next Generation Science Standards (2013), Delaware's science standards from 2013-14."""
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


def social_code(code):
    """The benchmark code as the standards write it, fixing ASN's two codes out of pattern."""
    code = {"G.14-5.a": "G.1.4-5.a", "G.1.9-12b": "G.1.9-12.b"}.get(code, code)
    return code if SOCIAL.match(code) else None


def social(src):
    """Delaware Standards for Civics, Economics, Geography and History (2018): the grade-cluster benchmarks."""
    for s in statements(src, "social"):
        code = social_code(value(s, CORE + "statementNotation") or "")
        if not code:
            continue
        for g in CLUSTERS[SOCIAL.match(code).group(3)]:
            add(g, "social", code, "benchmark", value(s, TERMS + "description") or "")


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
