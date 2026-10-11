"""Extract specific curriculum outcomes from PEI's "Specific Curriculum Outcomes Framework" PDFs (Kindergarten to Grade 6).

Usage: python3 -I extract_frameworks.py <dir with eelc_outcomes_framework_<grade>.txt from pdftotext -layout> > framework_outcomes.json
Result: {"<grade>/<subject>": [{"code": "N1", "text": "...", "group": "Number (N)"}]}
Subjects: math, language, science, social, core-french. Every page of the PDF starts with its subject in capitals.
"""
import json, os, re, sys

SUBJECT = {"MATHEMATICS": "math", "ENGLISH LANGUAGE ARTS": "language", "SCIENCE": "science", "SOCIAL STUDIES": "social", "CORE FRENCH": "core-french"}
MATH_CODE = re.compile(r"^(\s+)?(.{0,60}?\s{2,})?((?:N|PR|SS|SP)\d+)\s{2,}(\S.*)$|^(\s*)((?:N|PR|SS|SP)\d+)\s{2,}(\S.*)$")
GENERIC_CODE = re.compile(r"^(?P<left>.*?)\s{2,}(?P<code>\d+(?:\.\d+){1,2})\s{1,}(?P<text>\S.*)$")
FOOT = re.compile(r"PEI SPECIFIC CURRICULUM OUTCOMES FRAMEWORK|^\s*\d+\s*$|^\s*[ivx]+\s*$")


def pages(text):
    for p in text.split("\f"):
        lines = [l for l in p.split("\n") if l.strip()]
        if not lines:
            continue
        head = None
        for l in lines[:3]:
            s = l.strip()
            if s in SUBJECT:
                head = SUBJECT[s]
                break
        yield head, p.split("\n")


def clean(s):
    s = re.sub(r"\s+", " ", s).strip()
    return re.sub(r"(\w)- (\w)", r"\1\2", s)


def parse_math(lines):
    out, cur, textcol = [], None, 0
    group = ""
    for l in lines:
        if FOOT.search(l):
            continue
        m = re.match(r"^(.*?)\s{2,}((?:N|PR|SS|SP)\d+)\s{2,}(\S.*)$", l)
        if m and not l.lstrip().startswith("•"):
            left = m.group(1).strip()
            if left and re.search(r"\((N|PR|SS|SP)\)", left):
                group = left
            cur = {"code": m.group(2), "text": m.group(3).strip(), "group": group}
            textcol = l.index(m.group(3), l.index(m.group(2)) + len(m.group(2)))
            out.append(cur)
            continue
        # a group label with no outcome on the same line, or a left-column line
        m2 = re.match(r"^(\S.*?\((?:N|PR|SS|SP)\))\s*$", l)
        if m2:
            group = m2.group(1)
            continue
        if cur and len(l) - len(l.lstrip()) >= textcol - 2 and l.strip():
            cur["text"] += " " + l.strip()
    return out


def parse_generic(lines):
    out, cur, textcol = [], None, 0
    for l in lines:
        if FOOT.search(l):
            continue
        m = GENERIC_CODE.match(l)
        if m and re.match(r"^\d", m.group("code")):
            cur = {"code": m.group("code"), "text": m.group("text").strip(), "group": ""}
            textcol = l.index(m.group("text"), l.index(m.group("code")) + len(m.group("code")))
            out.append(cur)
            continue
        if cur and len(l) - len(l.lstrip()) >= textcol - 2 and l.strip():
            cur["text"] += " " + l.strip()
    return out


def main(folder):
    result = {}
    for grade in ["k", "1", "2", "3", "4", "5", "6"]:
        path = os.path.join(folder, f"eelc_outcomes_framework_{grade}.txt")
        text = open(path, encoding="utf8").read()
        by_subject = {}
        for head, lines in pages(text):
            if head:
                by_subject.setdefault(head, []).extend(lines)
        for subject, lines in by_subject.items():
            items = parse_math(lines) if subject == "math" else parse_generic(lines)
            for it in items:
                it["text"] = clean(it["text"])
            result[f"{grade}/{subject}"] = items
    json.dump(result, sys.stdout, indent=1, ensure_ascii=False)


main(sys.argv[1])
