"""Builds outcomes.json from Connecticut's standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs pdfplumber.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Spans are listed under every grade they cover: the science K-2 and 3-5 engineering
expectations under their grades, middle school (MS) under 6, 7 and 8, high school (HS) under 9; English language arts
Grades 9-10 under 9; high school mathematics and the high school social studies courses under 9.

Codes:
  math      the Connecticut Core Standards' codes as the CSDE's pages print them, without the "CCSS.Math.Content."
            prefix: "4.NBT.A.1"; high school without the "HS": "A-SSE.A.1", "F-IF.B.4".
  language  "RL.4.1", "RI.4.2", "RF.4.3", "W.4.1", "SL.4.1", "L.4.4"; Grade 9 "RL.9-10.1". The document numbers the
            standards inside each strand and grade column ("1.", "2."); the code adds the strand and grade, the way the
            Common Core's own codes do (and the way Connecticut's social studies standards cite them).
  science   the Next Generation Science Standards performance expectation codes ("4-PS3-2", "MS-LS1-1",
            "HS-ESS2-4"), printed.
  social    the 2023 social studies standards' codes, printed without the final full stop: "K.Civ.1.a", "3.His.3.a",
            "8.Eco.2.b"; the high school courses "CG.Civ.1.a" (Civics and Government), "MW.His.1.a" (Modern World
            History) and "US.His.1.a" (United States History III).
"""

import html
import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

import pdfplumber

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    text = text.replace("‐", "-").replace("\u00ad", "").replace("–", "-").replace("\u200b", "")
    return re.sub(r"\s+", " ", text).strip()


OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


def add(grade, subject, idx, kind, content):
    entries = OUT[f"{grade}/{subject}"]
    if idx not in entries:
        entries[idx] = {"idx": idx, "kind": kind, "content": clean(content)}


def page_lines(page):
    """The page's text lines, top to bottom: [(top, [words])]."""
    lines = []
    for w in sorted(page.extract_words(keep_blank_chars=False, x_tolerance=1.5), key=lambda w: (round(w["top"]), w["x0"])):
        if lines and abs(lines[-1][0] - w["top"]) < 3:
            lines[-1][1].append(w)
        else:
            lines.append((w["top"], [w]))
    return lines


# ---------------------------------------------------------------- math
MATH_OBJECT = re.compile(r"\{[^{}]*\"StandardCode\":[^{}]*\}")
MATH_FIELD = r'"%s":\s*"((?:[^"\\]|\\.)*)"'


def math(src):
    """Connecticut Core Standards for Mathematics: the standards listed on the CSDE's K-8 and high school pages."""
    for name in ("math-k8.html", "math-hs.html"):
        text = (src / name).read_text(encoding="utf-8")
        items = []
        for obj in MATH_OBJECT.findall(text):
            code = re.search(MATH_FIELD % "StandardCode", obj).group(1)
            content = re.search(MATH_FIELD % "Standard", obj).group(1)
            items.append((code.removeprefix("CCSS.Math.Content."), content))
        if not items:
            fail(f"{name}: no standards found")
        for code, content in items:
            content = re.sub(r"<[^>]+>", "", html.unescape(json.loads(f'"{content}"')))
            if code.startswith("HS"):
                add("9", "math", code[2:], "high school standard", content)
            else:
                grade = code.split(".")[0]
                add("k" if grade == "K" else grade, "math", code, "standard", content)


# ---------------------------------------------------------------- English language arts
STRANDS = [
    ("Reading Standards for Literature", "RL"),
    ("Reading Standards for Informational Text", "RI"),
    ("Reading Standards: Foundational Skills", "RF"),
    ("Writing Standards", "W"),
    ("Speaking and Listening Standards", "SL"),
    ("Language Standards", "L"),
]
SKIP_PAGE = re.compile(r"Literacy in History|Science and Technical Subjects \d|Anchor Standards|Progressive Skills")


def ela_columns(lines):
    """The grade columns from a page's header line: [(grade, x0)], left to right."""
    cols = []
    for top, words in lines:
        texts = [w["text"] for w in words]
        for i, w in enumerate(words):
            t = w["text"]
            if t.startswith("Kindergartners"):
                cols.append(("k", w["x0"]))
            elif t in ("Grade", "Grades") and i + 2 < len(words) and texts[i + 2].startswith("students"):
                label = clean(texts[i + 1])
                cols.append(("9" if label == "9-10" else "11-12" if label == "11-12" else label, w["x0"]))
        if cols:
            return top, sorted(cols, key=lambda c: c[1])
    return None, []


def language(src):
    """Common Core State Standards for English Language Arts, as Connecticut adopted them (2010) as the Connecticut Core Standards."""
    with pdfplumber.open(src / "ela.pdf") as pdf:
        for number, page in enumerate(pdf.pages):
            head = clean(page.crop((0, 0, page.width, min(page.height, 75))).extract_text() or "")
            if SKIP_PAGE.search(head):
                continue
            strand = next((code for title, code in STRANDS if title in head and "Literacy in" not in head.split("SUbjeCtS")[-1]), None)
            if not strand:
                continue
            lines = page_lines(page)
            top, cols = ela_columns(lines)
            if not cols:
                continue
            # Each column's standards start with "1.", "2." at its left edge; the grade headings are centred above.
            numbers = [w for _, words in lines for w in words if re.match(r"^\d{1,2}\.$", w["text"]) and w["top"] > top]
            clusters = []
            for x in sorted(round(w["x0"]) for w in numbers):
                if clusters and x - clusters[-1][-1] <= 6:
                    clusters[-1].append(x)
                else:
                    clusters.append([x])
            # A "1." inside a sentence ("for grade 1.") makes a stray cluster of one; the columns are the biggest ones.
            edges = sorted(c[0] for c in sorted(clusters, key=len, reverse=True)[: len(cols)])
            if len(edges) != len(cols):
                fail(f"ela.pdf page {number + 1}: {len(cols)} grade columns but {len(edges)} number columns")
            for (grade, _), left, right in zip(cols, edges, edges[1:] + [page.width]):
                if grade == "11-12":
                    continue
                current = None
                for line_top, words in lines:
                    if line_top <= top:
                        continue
                    inside = [w for w in words if left - 4 <= w["x0"] < right - 4]
                    if not inside:
                        continue
                    m = re.match(r"^(\d{1,2})\.$", inside[0]["text"])
                    if m and inside[0]["x0"] < left + 6:
                        rest = " ".join(w["text"] for w in inside[1:])
                        g = "9-10" if grade == "9" else grade.upper()
                        current = f"{strand}.{g}.{int(m.group(1))}"
                        if rest.startswith(("(Not applicable", "(Begins in grade")):
                            current = None
                        else:
                            add(grade, "language", current, "standard", rest)
                        continue
                    if current and inside[0]["x0"] > left + 6:
                        entry = OUT[f"{grade}/language"][current]
                        if len(entry["content"]) < 500:
                            entry["content"] = clean(entry["content"] + " " + " ".join(w["text"] for w in inside))
                    elif current:
                        current = None


# ---------------------------------------------------------------- science
PE = re.compile(r"^\s*((?:K|[1-5]|MS|HS|K-2|3-5)-(?:PS|LS|ESS|ETS)\d-\d+)\.\s+(.*)$")


def science(src):
    """The Next Generation Science Standards (adopted by Connecticut in 2015): the performance expectations."""
    with pdfplumber.open(src / "science.pdf") as pdf:
        text = "\n".join(page.extract_text(layout=True) or "" for page in pdf.pages)
    lines = text.split("\n")
    for i, line in enumerate(lines):
        m = PE.match(line)
        if not m:
            continue
        content = m.group(2)
        for more in lines[i + 1 : i + 6]:
            if "[" in content or not more.strip() or PE.match(more):
                break
            content += " " + more.strip()
        idx, content = m.group(1), re.split(r"\s*\[(?:Clarification|Assessment)", content)[0]
        band = idx.split("-")[0]
        if idx.startswith("K-2-"):
            grades = ["k", "1", "2"]
        elif idx.startswith("3-5-"):
            grades = ["3", "4", "5"]
        elif band == "MS":
            grades = ["6", "7", "8"]
        elif band == "HS":
            grades = ["9"]
        else:
            grades = ["k" if band == "K" else band]
        for g in grades:
            add(g, "science", idx, "performance expectation", content)


# ---------------------------------------------------------------- social studies
SS_CODE = re.compile(r"^((?:K|[1-8]|CG|MW|US)\.(?:Inq|Civ|Eco|Geo|His)\.\d+\.[a-z])\.?\s*(.*)$")
SS_STOP = re.compile(r"^(•|CT Core Standards:|Key academic vocabulary|Connecticut Elementary and Secondary Social Studies Standards$|\d{1,3}$|Grade \d|High School:|Kindergarten:)")


def social_grade(code):
    band = code.split(".")[0]
    return "k" if band == "K" else "9" if band in ("CG", "MW", "US") else band


def social(src):
    """Connecticut Elementary and Secondary Social Studies Standards (2023): inquiry and content standards."""
    with pdfplumber.open(src / "social.pdf") as pdf:
        text = "\n".join(page.extract_text() or "" for page in pdf.pages)
    lines = text.split("\n")
    # The standards start with Kindergarten; the organization pages before it print example codes.
    start = max(i for i, line in enumerate(lines) if line.strip() == "Kindergarten: Understanding My Communities")
    current = None
    for line in lines[start:]:
        line = line.strip()
        m = SS_CODE.match(line)
        if m:
            current = m.group(1)
            add(social_grade(current), "social", current, "standard", m.group(2))
            continue
        if not line or SS_STOP.match(line):
            current = None
            continue
        if current:
            entry = OUT[f"{social_grade(current)}/social"][current]
            if len(entry["content"]) < 700:
                # Lines are hyphenated where the PDF broke a word ("environ-" / "mental").
                joined = entry["content"][:-1] + line if re.search(r"[a-z]-$", entry["content"]) else entry["content"] + " " + line
                entry["content"] = clean(joined)
    # Drop caps leave a space after the first letter ("U se maps", "M ake inferences").
    for key in OUT:
        if key.endswith("/social"):
            for entry in OUT[key].values():
                entry["content"] = re.sub(r"^([A-Z]) ([a-z])", r"\1\2", entry["content"])


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
