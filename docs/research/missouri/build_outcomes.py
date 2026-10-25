"""Builds outcomes.json from the Missouri Learning Standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs pdfplumber, pypdf and pdftotext (poppler).

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Math and language entries also carry "ccss": the 2010 Missouri (Common Core) codes the
Department's crosswalks line up with each 2016 expectation, as a help for placing units; nothing checks it.

Codes (the Missouri Learning Standards: Grade-Level Expectations, adopted by the State Board in April 2016; the coding
sheet, curr-mls-coding-sheet.pdf, explains them):
  math      grade, domain, cluster and expectation: "4.NBT.A.1", "K.NS.B.3", "5.GM.C.6" (domains NS, NBT, NF, RA,
            GM, DS, RP, EEI, F). Grade 9 cites the high school courses Algebra 1 ("A1.LQE.A.3") and Geometry
            ("G.CO.A.1"). Clusters ("4.NBT.A") are listed too. Read from the Department's crosswalks.
  language  grade, strand, big idea, concept and expectation: Kindergarten to Grade 5 "4.R.1.A.a", "2.RF.3.A.c",
            "3.W.2.A.b", "5.L.1.B.d", "1.SL.1.A.a" (each concept, "4.R.1.A", is listed too); Grades 6 to 8
            "6.RL.1.A", "7.RI.2.C", "8.W.3.A", "6.SL.1.B"; Grade 9 cites the Grades 9-10 expectations, "9-10.RL.1.A".
            Read from the Department's crosswalks.
  science   grade, strand and core idea, component idea and expectation, printed in the standards: "4.PS3.A.1",
            "K.ESS2.D.1", "3.ETS1.A.1". Middle school is one band, "6-8.LS1.A.1", listed under Grades 6, 7 and 8 (each
            district decides which grade teaches what); Grade 9 cites the high school band, "9-12.LS1.A.1". The
            standards grid prints its words twice, offset; pdftotext -raw (poppler) reads each cell once.
  social    Kindergarten to Grade 5: grade, strand, strand number, concept and part, "4.H.3.B.a", "K.PC.1.F.b", read
            from the teacher view and the crosswalk (which adds ".a" to an expectation with one part, "K.PC.1.B.a"). Grades 6 to 8: grade band, course, theme, strand and expectation, "6-8.AH.2.CC.A"
            (American History), "6-8.WH.3.GS.B" (World History), "6-8.GEO.2.G.A" (Geography), listed under Grades 6,
            7 and 8 (districts choose the order). Grade 9 cites high school Government, "9-12.GV.3.GS.A", which
            Missouri requires for graduation. Read from the Department's crosswalks.
"""

import json
import re
import subprocess
import sys
import zipfile
from collections import OrderedDict
from pathlib import Path
from xml.etree import ElementTree as ET

import pdfplumber
import pypdf

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    text = text.replace(" ", " ").replace(" ", " ").replace("‐", "-").replace("–", "-").replace("­", "")
    text = text.replace("’", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", text).strip()


def add(grade, subject, idx, content, **extra):
    entries = OUT[f"{grade}/{subject}"]
    if idx not in entries:
        entries[idx] = {"idx": idx, "kind": "standard", "content": clean(content)[:600], **extra}
    else:
        if not entries[idx]["content"] and content:
            entries[idx]["content"] = clean(content)[:600]
        for k, v in extra.items():
            for item in v:
                if item not in entries[idx].setdefault(k, []):
                    entries[idx][k].append(item)


def grade_of(code_grade):
    return "k" if code_grade == "K" else code_grade


def docx_lines(path):
    with zipfile.ZipFile(path) as z:
        root = ET.fromstring(z.read("word/document.xml"))
    for p in root.iter(W + "p"):
        line = clean("".join(t.text or "" for t in p.iter(W + "t")))
        if line:
            yield line


def page_lines(page, x0, x1):
    """Lines of words whose left edge is between x0 and x1, as (top, text) in reading order."""
    rows = OrderedDict()
    for w in page.extract_words(keep_blank_chars=False, use_text_flow=False):
        if x0 <= w["x0"] < x1:
            rows.setdefault(round(w["top"] / 3), []).append(w)
    out = []
    for key in sorted(rows):
        words = sorted(rows[key], key=lambda w: w["x0"])
        out.append((words[0]["top"], words[0]["x0"], " ".join(w["text"] for w in words)))
    return out


# ---------------------------------------------------------------- math
MATH_FILES = [("k", "grk"), ("1", "gr1"), ("2", "gr2"), ("3", "gr3"), ("4", "gr4"), ("5", "gr5"), ("6", "gr6"),
              ("7", "gr7"), ("8", "gr8"), ("9", "alg1"), ("9", "geo")]
MATH_CODE = re.compile(r"^((?:K|[1-8]|A1|G)\.[A-Z]{1,4}\.[A-Z](?:\.\d+)?)\b\s*(.*)$")
OLD_CODE = re.compile(r"^((?:K|[1-8])\.[A-Z]{1,3}\.[A-Z]\.\d+[a-z]?|HS[A-Z]-[A-Z]{1,3}\.[A-Z]\.\d+[a-z]?)\b")


def math(src):
    for grade, name in MATH_FILES:
        path = src / f"cur-mls-crosswalk-ma-{name}.pdf"
        with pdfplumber.open(path) as pdf:
            code, words, old = None, [], []
            for page in pdf.pages:
                mid = page.width / 2
                left = page_lines(page, 0, mid)
                right = [(top, text) for top, _, text in page_lines(page, mid, page.width)]
                for top, x, text in left + [(10**6, 0, "")]:
                    m = MATH_CODE.match(text)
                    if (m or text in ("", "Code Adopted Standards") or text.startswith(("Missouri Learning", "Grade-Level", "(Adopted", "beginning in"))) and code:
                        add(grade, "math", code, " ".join(words), ccss=old)
                        code, words, old = None, [], []
                    if m and x < 60:
                        code, words = m.group(1), [m.group(2)]
                        old = [o.group(1) for t, line in right if abs(t - top) < 4 and (o := OLD_CODE.match(line))]
                    elif code and not text.startswith(("Missouri Learning", "Grade-Level", "(Adopted", "beginning in", "Code ")):
                        words.append(text)
                if code:
                    add(grade, "math", code, " ".join(words), ccss=old)
                    code, words, old = None, [], []


# ---------------------------------------------------------------- language
ELA_CODE = re.compile(r"^(K|[1-8]|9-10)\.(R|RF|RL|RI|W|SL|L)\.(\d)\.([A-Z])(?:\.([a-z]))?$")
CCSS_ELA = re.compile(r"^(RL|RI|RF|W|SL|L)\.(K|\d+|9-10|11-12)\.\d+[a-z]?$")


def language(src):
    for name in ("k-5-ela-mls-crosswalk", "6-12-ela-mls-crosswalk"):
        lines = list(docx_lines(src / f"{name}.docx"))
        for i, line in enumerate(lines):
            m = ELA_CODE.match(line)
            if not m:
                continue
            grade = "9" if m.group(1) == "9-10" else grade_of(m.group(1))
            text = lines[i + 1] if i + 1 < len(lines) and not ELA_CODE.match(lines[i + 1]) else ""
            old = []
            for nxt in lines[i + 1 : i + 12]:
                if ELA_CODE.match(nxt):
                    break
                if CCSS_ELA.match(nxt):
                    old.append(nxt)
            add(grade, "language", line, text, ccss=old)
            if m.group(5):
                add(grade, "language", line[: -2], "", ccss=old)


# ---------------------------------------------------------------- science
SCI_CODE = re.compile(r"\b(K|[1-5]|6-8|9-12)\.\s?((?:PS|LS|ESS|ETS)\d\.[A-Z]\.\d+)\b")


def science(src):
    # pdftotext -raw reads the grid's text one cell at a time, so each code is followed by its expectation.
    stop = re.compile(r"^(\d+|[A-Z]|(?:PS|LS|ESS|ETS)\d.*| ?Grade.*|Definitions|Concept.*|\[.*)$")
    for name in ("curr-mls-standards-sci-k-5-sboe-2016", "curr-mls-standards-sci-6-12-sboe-2016"):
        raw = subprocess.run(["pdftotext", "-raw", str(src / f"{name}.pdf"), "-"], capture_output=True, text=True, check=True).stdout
        lines = [clean(line) for line in raw.splitlines()]
        for i, line in enumerate(lines):
            for m in SCI_CODE.finditer(line):
                band, rest = m.group(1), m.group(2)
                code = f"{band}.{rest}"
                words = []
                if line.startswith(m.group(0)) or line.split(" ", 1)[-1].startswith(m.group(0)):
                    first = line[line.index(m.group(0)) + len(m.group(0)) :].strip()
                    words = [first] if first and not SCI_CODE.search(first) else []
                    for nxt in lines[i + 1 : i + 30]:
                        if not nxt or stop.match(nxt) or SCI_CODE.search(nxt):
                            break
                        words.append(nxt)
                grades = ["6", "7", "8"] if band == "6-8" else ["9"] if band == "9-12" else [grade_of(band)]
                for g in grades:
                    add(g, "science", code, " ".join(words))


# ---------------------------------------------------------------- social
SS_K5 = re.compile(r"^(K|[1-5])\.(PC|GS|H|E|EG|RI|TS)\.(\d)\.([A-Z])(?:\.(?:K|[1-5]))?(?:\.([a-z]))?$")
SS_CODE = re.compile(r"(6-8|9-12)\.(AH|WH|GEO|GV)\.(\d)\.(CC|GS|G|EC|PC)\.([A-Z])\b")


def social(src):
    lines = list(docx_lines(src / "curr-mls-standards-teacher-view-ss-k-5-2016.docx"))
    for i, line in enumerate(lines):
        # Grades 3 and 5 print governance without its strand number ("3.GS.A"), and one code as "3.E.G.5.F.a".
        line = re.sub(r"^(\d)\.GS\.([A-Z])", r"\1.GS.2.\2", line).replace("3.E.G.5.", "3.EG.5.")
        m = SS_K5.match(line)
        if m:
            text = lines[i + 1] if i + 1 < len(lines) and not SS_K5.match(lines[i + 1]) else ""
            # A few expectations repeat the grade before the item ("3.E.4.A.3.a"); the crosswalk leaves it out.
            code = ".".join(g for g in m.groups()[:4]) + (f".{m.group(5)}" if m.group(5) else "")
            add(grade_of(m.group(1)), "social", code, text)
    # The crosswalk prints the same codes, with ".a" on an expectation that has only one part ("K.PC.1.B.a"), and a few
    # the teacher view runs into the text before them; both forms are listed.
    for page in pypdf.PdfReader(src / "cur-mls-crosswalk-ss-k-5.pdf").pages:
        for m in re.finditer(r"\b(K|[1-5])\.(?:PC|GS|H|E|EG|RI|TS)\.\d\.[A-Z](?:\.[a-z])?\b", page.extract_text() or ""):
            add(grade_of(m.group(1)), "social", m.group(0), "")
    # An expectation with one part is "K.PC.1.B" in the teacher view and "K.PC.1.B.a" in the crosswalk: same text.
    for key in [k for k in OUT if k.endswith("/social")]:
        entries = OUT[key]
        for idx, entry in entries.items():
            if not entry["content"] and idx.endswith(".a") and idx[:-2] in entries:
                entry["content"] = entries[idx[:-2]]["content"]
    for name in ("cur-mls-crosswalk-ss-ms-am-hist", "cur-mls-crosswalk-ss-ms-world-hist", "cur-mls-crosswalk-ss-ms-world-geog",
                 "cur-mls-crosswalk-ss-govt"):
        for page in pypdf.PdfReader(src / f"{name}.pdf").pages:
            raw = (page.extract_text() or "").replace("6-8. ", "6-8.").replace("9-12. ", "9-12.")
            text = clean(raw).replace(" .", ".")
            found = {m.group(0) for m in SS_CODE.finditer(text)}
            for code in found:
                grades = ["6", "7", "8"] if code.startswith("6-8") else ["9"]
                content = ss_text(raw, code)
                for g in grades:
                    add(g, "social", code, content)


def ss_text(raw, code):
    """The expectation's own words after its code on a crosswalk page ("C. Analyze ..."), up to the 2010 code beside it.
    Each page prints its table twice; the copy that ends at the 2010 code is the shorter one, so the shortest wins."""
    lines = raw.split("\n")
    best = ""
    for i, line in enumerate(lines):
        if line.strip() != code:
            continue
        out = []
        for nxt in lines[i + 1:]:
            s = nxt.strip()
            if not s:
                if out:
                    break
                continue
            if re.match(r"^([A-Z]{2,4}[ .]?\d|Key Concepts|Theme|Grade Levels|Understandings|Disciplinary|\d-\d)", s):
                break
            if not out and not re.match(r"^[A-Z]\.\s*\S", s):
                break
            out.append(s)
        text = re.sub(r"^[A-Z]\.\s*", "", " ".join(out))
        if text and (not best or len(text) < len(best)):
            best = text
    return best


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "source")
    math(src)
    language(src)
    science(src)
    social(src)
    # A concept heading ("4.R.1.A") has no words of its own: it is described by its items ("4.R.1.A.a", ...).
    for key, entries in OUT.items():
        for idx, entry in entries.items():
            if not entry["content"]:
                parts = [e["content"] for i, e in entries.items() if i.startswith(idx + ".") and e["content"]]
                entry["content"] = clean("; ".join(parts))[:600]
    out = OrderedDict((key, list(entries.values())) for key, entries in OUT.items())
    for key, entries in out.items():
        if not entries:
            fail(f"no standards for {key}")
    path = Path(__file__).parent / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {path}: {sum(len(v) for v in out.values())} standards")
    for key, entries in out.items():
        print(f"  {key}: {len(entries)}")


if __name__ == "__main__":
    main()
