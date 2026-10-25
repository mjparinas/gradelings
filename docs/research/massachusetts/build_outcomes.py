"""Builds outcomes.json from the Massachusetts Curriculum Frameworks (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]   (default: source, next to this file)
Reads the pdftotext -layout copies (.txt) that fetch.sh saves beside each PDF; needs only the standard library.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Grade 9 holds the high school standards Gradelings uses: the Model Algebra I course
(math), the Grades 9-10 standards (English language arts), every high school science and technology/engineering
standard, and United States History I (history and social science).
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
FOOTER = re.compile(r"^\s*Massachusetts Curriculum Framework for ")


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    return re.sub(r"\s+", " ", text).strip()


def lines_of(path):
    return [line.replace("\f", "") for line in path.read_text(encoding="utf-8").split("\n") if not FOOTER.match(line)]


def add(out, grade, code, kind, content):
    if code in out[grade]:
        fail(f"{code} twice in grade {grade}")
    out[grade][code] = {"idx": code, "kind": kind, "content": clean(content)}


# ---------------------------------------------------------------- mathematics
# Standards are numbered within each domain and grouped in lettered clusters; DESE cites them grade.domain.cluster.number
# ("4.NBT.A.1"). Lettered parts ("4.NF.B.3a") belong to their standard and are not recorded on their own. Grade 9 cites the
# Model Algebra I course, whose domains read "AI.A-SSE", giving "AI.A-SSE.A.1".
MATH_DOMAIN = re.compile(r"^\S.*?\s{3,}((?:K|[1-8])\.(?:CC|OA|NBT|NF|MD|G|RP|NS|EE|F|SP)|AI\.[NAFS]-[A-Z]{1,3})\s*$")
CLUSTER = re.compile(r"^([A-H])\. (.*)")
NUMBERED = re.compile(r"^ {2,8}(\d+)\. (.*)")
# English language arts standards sit four spaces in; lists inside their notes sit deeper.
# History and social science standards sit one to eight spaces in.
HSS_NUMBERED = re.compile(r"^ {1,8}(\d+)\. (.*)")
ELA_NUMBERED = re.compile(r"^ {3,5}(\d+)\. (.*)")


def open_line(body):
    """Whether a standard's words run on to the next line (its last line so far does not end a sentence)."""
    return bool(body) and not re.search(r"[.:?)]\s*$", body[-1])


def math(source):
    lines = lines_of(source / "math-2017.txt")
    out = {g: OrderedDict() for g in GRADES}
    starts = {}
    for i, line in enumerate(lines):
        m = re.fullmatch(r"(Kindergarten|Grade [1-8]) Content Standards", line.strip())
        if m:
            g = "k" if m.group(1) == "Kindergarten" else m.group(1)[-1]
            starts[g] = i  # the last heading wins: the table of contents and introduction come first
        if line.startswith("Model Traditional Pathway: Model Algebra I Content"):
            starts["9"] = i
    for g in GRADES:
        if g not in starts:
            fail(f"no math section for grade {g}")
        domain = cluster = code = None
        body = []

        def flush():
            if code:
                add(out, g, code, "standard", " ".join(body))

        for line in lines[starts[g] + 1 :]:
            if g != "9" and re.fullmatch(r"Grade [1-8]|I\. High School Content Standards organized by:", line.strip()):
                break
            if g == "9" and line.startswith("Model Traditional Pathway: Model Geometry"):
                break
            m = MATH_DOMAIN.match(line)
            if m:
                flush()
                domain, cluster, code, body = m.group(1), None, None, []
                continue
            m = CLUSTER.match(line)
            if m and domain:
                flush()
                cluster, code, body = m.group(1), None, []
                continue
            m = NUMBERED.match(line)
            if m and domain and cluster:
                flush()
                code, body = f"{domain}.{cluster}.{m.group(1)}", [m.group(2)]
                continue
            # A standard's own words continue on lines indented like it; examples, parts and footnotes are left out.
            if code and open_line(body) and re.match(r"^ {6,10}\S", line) and not re.match(r"^\s*(For example|[a-z]\. |Example)", line):
                body.append(line)
            elif code and not line.strip():
                body = body[:1] if len(body) > 1 and not body[-1].strip() else body
        flush()
    for g in GRADES:
        if len(out[g]) < 20:
            fail(f"only {len(out[g])} math standards in grade {g}")
    return out


# ---------------------------------------------------------------- English language arts and literacy
# Standards are numbered within each strand and cited strand.grade.number ("RL.4.2", "W.4.1", "L.4.4"); Grade 9 cites the
# Grades 9-10 band ("RL.9-10.1"). Lettered parts are left out, as in math.
ELA_HEAD = re.compile(
    r"^(Kindergarten|Grade [1-8]|Grades 9–10|Grades 11–12|Pre-K) (Reading Standards for (Literature|Informational Text|Foundational Skills)|Writing Standards|Speaking and Listening Standards|Language Standards)\b"
)
STRAND = {"Literature": "RL", "Informational Text": "RI", "Foundational Skills": "RF", "Writing Standards": "W", "Speaking and Listening Standards": "SL", "Language Standards": "L"}


def ela(source):
    lines = lines_of(source / "ela-2017.txt")
    out = {g: OrderedDict() for g in GRADES}
    grade = strand = code = None
    body = []
    last = 0

    def flush():
        if code and grade:
            add(out, grade, code, "standard", " ".join(body))

    for i, line in enumerate(lines):
        if re.search(r"\.{5,}", line):
            continue  # table of contents
        m = ELA_HEAD.match(line)
        if m and "Content Area" in line + lines[i + 1]:
            flush()
            grade = strand = code = None
            continue
        if m:
            flush()
            label = m.group(1)
            grade = {"Kindergarten": "k", "Grades 9–10": "9", "Grades 11–12": None, "Pre-K": None}.get(label, label[-1])
            strand = STRAND[m.group(3) or m.group(2)]
            code, body, last = None, [], 0
            continue
        if re.match(r"^(Grades? 6–8|Grades 9–10|Grades 11–12) .*Literacy in the", line) or line.startswith("Standards for Literacy in the Content Areas"):
            flush()
            grade = strand = code = None
            continue
        m = ELA_NUMBERED.match(line)
        if m and grade and strand and int(m.group(1)) > last:
            flush()
            last = int(m.group(1))
            band = "9-10" if grade == "9" else grade.upper()
            code, body = f"{strand}.{band}.{m.group(1)}", [m.group(2)]
            continue
        if code and open_line(body) and re.match(r"^ {6,8}\S", line) and not re.match(r"^\s*(For example|Connections|See |[a-z]\. |\d+\. )", line):
            body.append(line)
        elif code and (not line.strip() or re.match(r"^\s+([a-z]\. |Connections|For example)", line)):
            body = body + [""] if body[-1] != "" else body
    flush()
    for g in GRADES:
        for s in ["RL", "RI", "W", "SL", "L"]:
            if not any(c.startswith(s + ".") for c in out[g]):
                fail(f"no {s} standards in grade {g}")
        for e in out[g].values():
            e["content"] = clean(e["content"])
    return out


# ---------------------------------------------------------------- science and technology/engineering
# Codes are printed before each standard: Kindergarten to Grade 5 as "4-PS3-1", Grades 6 to 8 with their grade
# ("6.MS-LS1-1", since Massachusetts places each middle school standard in one grade), high school as "HS-LS1-1".
# Massachusetts's own standards end in "(MA)" ("2-ESS2-4(MA)"), which is part of the code. Engineering standards for a
# band carry the grade that teaches them ("3.3-5-ETS1-1", "1.K-2-ETS1-1").
SCI_CODE = re.compile(r"^\s*([1-5]\.(?:K-2|3-5)-ETS\d-\d+(?:\(MA\))?|(?:K|[1-5])-[A-Z]+\d-\d+[a-z]?(?:\(MA\))?|[678]\.MS-[A-Z]+\d-\d+[a-z]?(?:\(MA\))?|HS-[A-Z]+\d-\d+[a-z]?(?:\(MA\))?)\. (.*)")


def science(source):
    lines = lines_of(source / "scitech-2016.txt")
    out = {g: OrderedDict() for g in GRADES}
    for i, line in enumerate(lines):
        m = SCI_CODE.match(line)
        if not m:
            continue
        code = m.group(1)
        grade = "9" if code.startswith("HS") else code[0].lower()
        if code in out[grade]:
            continue  # the same standard is printed again in the course and progression tables
        body = [m.group(2)]
        for nxt in lines[i + 1 : i + 5]:
            if not nxt.strip() or SCI_CODE.match(nxt) or re.match(r"^\s*(Clarification|State Assessment|•|\*)", nxt):
                break
            body.append(nxt)
        add(out, grade, code, "standard", " ".join(body))
    for g in GRADES:
        if len(out[g]) < 8:
            fail(f"only {len(out[g])} science standards in grade {g}")
    return out


# ---------------------------------------------------------------- history and social science
# Each grade's content standards are grouped in topics the framework codes "[3.T4]" (Grade 3, Topic 4) and numbered
# within the topic, so a standard is cited "3.T4.1". Lettered parts are left out. Grade 9 cites United States History I
# ("USI.T1.1").
TOPIC = re.compile(r"\[(K|[1-8]|USI)\.T(\d+)([a-h]?)\]")
HSS_STOP = re.compile(r"^(Grade \d\b|Kindergarten\b|Pre-K|High School|United States History II|World History|History and Social Science and the Standards|Standards for)|^\s*(Key Primary Source|Suggested Primary Source)")


def social(source):
    lines = lines_of(source / "hss-2018.txt")
    out = {g: OrderedDict() for g in GRADES}
    grade = topic = code = None
    expect = 1
    restart = False
    body = []

    def flush():
        if code:
            add(out, grade, code, "standard", " ".join(body))

    for line in lines:
        if re.search(r"\.{5,}", line):
            continue
        m = TOPIC.search(line)
        if m and not re.search(r"\s{6,}\S", line.strip()):
            flush()
            grade = "9" if m.group(1) == "USI" else m.group(1).lower()
            # A lettered subtopic ([7.T1b]) keeps its letter in the code: "7.T1b.1". Some topics number on across
            # their subtopics (6.T3b starts at 4), others start again at 1.
            same = topic and topic.rstrip("abcdefgh") == f"{m.group(1)}.T{m.group(2)}"
            topic, code, body = f"{m.group(1)}.T{m.group(2)}{m.group(3)}", None, []
            restart, expect = (True, expect) if same else (False, 1)
            continue
        if topic and HSS_STOP.match(line):
            flush()
            topic, code, body = None, None, []
            continue
        m = HSS_NUMBERED.match(line)
        if m and topic and (int(m.group(1)) == expect or (restart and m.group(1) == "1")) and not re.search(r"\s{8,}\S", m.group(2)):
            flush()
            code, body, expect, restart = f"{topic}.{m.group(1)}", [m.group(2)], int(m.group(1)) + 1, False
            continue
        if code and open_line(body) and re.match(r"^ {5,10}\S", line) and not re.match(r"^\s*(Clarification|[a-z]\. |\d+\. )", line):
            body.append(line)
        elif code and (not line.strip() or re.match(r"^\s+([a-z]\. |Clarification)", line)):
            body = body + [""] if body and body[-1] != "" else body
    flush()
    for g in GRADES:
        if len(out[g]) < 8:
            fail(f"only {len(out[g])} history and social science standards in grade {g}")
        for e in out[g].values():
            e["content"] = clean(e["content"])
    return out


def trim(out):
    """Keeps a standard's first sentence block: the words before its examples and lettered parts."""
    for entries in out.values():
        for e in entries.values():
            text = clean(e["content"])
            # A sentence ended and the next "sentence" starts in lower case: the rest is a sidebar's text.
            text = re.split(r"(?<=[.?)]) (?=[a-z0-9])", text)[0]
            # Words picked up from a side column after the standard's last sentence are dropped.
            m = re.match(r"(.*[.?)])\s+[^.?)]*$", text)
            e["content"] = m.group(1) if m else text
    return out


def main():
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "source"
    subjects = {"math": trim(math(source)), "language": trim(ela(source)), "science": trim(science(source)), "social": trim(social(source))}
    result = OrderedDict()
    for g in GRADES:
        for s, by_grade in subjects.items():
            result[f"{g}/{s}"] = list(by_grade[g].values())
    target = Path(__file__).parent / "outcomes.json"
    target.write_text(json.dumps(result, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print({k: len(v) for k, v in result.items()})


if __name__ == "__main__":
    main()
