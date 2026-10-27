"""Builds outcomes.json from New Mexico's content standards (New Mexico Public Education Department; see fetch.sh and
README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs pdfplumber.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Spans are listed under every grade they cover: the science K-2 and 3-5 engineering
expectations under their grades, middle school (MS) under 6, 7 and 8, high school (HS) under 9; English language arts
Grades 9-10 under 9; high school mathematics and the high school social studies courses under 9.

Codes:
  math      the Common Core codes (6.29.14 NMAC adopts the Common Core State Standards for Mathematics by reference):
            "4.NBT.1"; high school "A-SSE.1", "F-IF.4".
  language  "RL.4.1", "RI.4.2", "RF.4.3", "W.4.1", "SL.4.1", "L.4.4"; Grade 9 "RL.9-10.1" (6.29.13 NMAC adopts the Common
            Core State Standards for English Language Arts by reference). The document numbers the standards inside each
            strand and grade column ("1.", "2."); the code adds the strand and grade, the way the Common Core's own codes
            do. The additional New Mexico English language arts standards in 6.29.13 NMAC have no codes and are not cited.
  science   the NM STEM Ready! Science Standards (6.29.10 NMAC): the Next Generation Science Standards performance
            expectation codes ("4-PS3-2", "MS-LS1-1", "HS-ESS2-4"), plus the six New Mexico specific standards as the PED
            prints them ("1-SS-1 NM", "5-SS-1 NM", "MS-ESS3-3 NM", "HS-LS2-7 NM", "HS-SS-1 NM", "HS-SS-2 NM").
  social    the New Mexico Social Studies Standards (6.29.11 NMAC, 2022), printed without the final full stop: "K.6",
            "4.12", "7.41"; the high school courses "9-12.Civ.23" (Civics), "9-12.Econ.5" (Economics), "9-12.Geo.10"
            (Geography), "9-12.NMH.20" (New Mexico History), "9-12.US.40" (U.S. History), "9-12.WH.12" (World History)
            and "9-12.ECI.5" (Ethnic, Cultural, and Identity Studies). Two codes printed with a space ("9-12 Civ.23",
            "9-12 US.") are read with a full stop, and "8.26", printed without its final full stop, is read too.
"""

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
    text = text.replace("‐", "-").replace("­", "").replace("–", "-")
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
MATH_DOMAIN = re.compile(
    r"^\s*(\S.*?)\s+((?:K|[1-8])\.(?:CC|OA|NBT|NF|MD|G|RP|NS|EE|F|SP)|[NAFGS]-(?:RN|Q|CN|VM|SSE|APR|CED|REI|IF|BF|LE|TF|CO|SRT|C|GPE|GMD|MG|ID|IC|CP|MD))\s*$",
    re.I,
)
MATH_STD = re.compile(r"^(\s{0,16})(\d{1,2})\.\s+(\S.*?)\s*$")


def math_grade(domain):
    return "9" if "-" in domain else ("k" if domain.startswith("K") else domain.split(".")[0])


def math(src):
    """Common Core State Standards for Mathematics, as New Mexico adopted them (6.29.14 NMAC, 2010)."""
    with pdfplumber.open(src / "math.pdf") as pdf:
        text = "\n".join(page.extract_text(layout=True) or "" for page in pdf.pages)
    lines = [line for line in text.split("\n") if line.strip()]
    # The domains start after the Standards for Mathematical Practice; the "How to read" example (3.NBT) comes first.
    # The PDF sets domain codes in small capitals, so they read "4.oa" or "n-rn".
    start = next(i for i, line in enumerate(lines) if re.search(r"\bK\.CC\s*$", line, re.I))
    domain, last, current, indent = None, 0, None, 0
    for line in lines[start:]:
        if re.match(r"^\s*Glossary\s*$", line, re.I):
            break
        m = MATH_DOMAIN.match(line)
        if m:
            domain, last, current = m.group(2).upper(), 0, None
            continue
        if re.search(r"overview|Mathematical Practices|Standards for Mathematical Practice", line, re.I):
            domain, current = None, None
            continue
        if not domain:
            continue
        s = MATH_STD.match(line)
        if s and int(s.group(2)) == last + 1:
            last = int(s.group(2))
            current, indent = f"{domain}.{last}", len(s.group(1))
            add(math_grade(domain), "math", current, "high school standard" if "-" in domain else "standard", s.group(3))
            continue
        lead = len(line) - len(line.lstrip())
        if current and lead > indent:
            entry = OUT[f"{math_grade(domain)}/math"][current]
            if len(entry["content"]) < 600:
                entry["content"] = clean(entry["content"] + " " + line)
        else:
            current = None


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
    """Common Core State Standards for English Language Arts, as New Mexico adopted them (6.29.13 NMAC, 2010)."""
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
    """The Next Generation Science Standards (New Mexico adopted them with six New Mexico specific standards as the NM STEM Ready! Science Standards, 6.29.10 NMAC, 2018): the performance expectations."""
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




NM_PE = re.compile(r"^\s*((?:1|5|MS|HS)-(?:SS|ESS3|LS2)-\d+ NM)\.\s+(.*)$")


def science_nm(src):
    """The six New Mexico specific standards in the NM STEM Ready! Science Standards."""
    with pdfplumber.open(src / "science-nm-specific.pdf") as pdf:
        text = "\n".join(page.extract_text(layout=True) or "" for page in pdf.pages)
    for line in text.split("\n"):
        m = NM_PE.match(line)
        if m:
            idx, content = m.group(1), re.split(r"\s*\[(?:Clarification|Assessment)", m.group(2))[0]
            band = idx.split("-")[0]
            for g in ["6", "7", "8"] if band == "MS" else ["9"] if band == "HS" else [band]:
                add(g, "science", idx, "New Mexico specific standard", content)
    found = sum(1 for key in OUT if key.endswith("/science") for idx in OUT[key] if idx.endswith(" NM"))
    if found < 6:
        fail(f"science-nm-specific.pdf: found only {found} New Mexico specific standard entries")


# ---------------------------------------------------------------- social studies
SS_CODE = re.compile(r"^\s*(?:.*?\s)?[●•]\s+((?:K|[1-8])\.\d+|9-12[ .](?:Civ|Econ|Geo|NMH|US|WH|ECI)\.\d+)(?:\.\s+|\s+(?=[A-Z]))(.*?)\s*$")


def social(src):
    """New Mexico Social Studies Standards (6.29.11 NMAC, adopted 2022): the performance standards."""
    with pdfplumber.open(src / "social.pdf") as pdf:
        text = "\n".join(page.extract_text(layout=True) or "" for page in pdf.pages)
    lines = text.split("\n")
    # The standards start with the Kindergarten pages; the table of contents and introduction come first.
    start = next(i for i, line in enumerate(lines) if re.search(r"[●•]\s+K\.1\.", line))
    current, column = None, 0
    for line in lines[start:]:
        m = SS_CODE.match(line)
        if m:
            current = m.group(1).replace("9-12 ", "9-12.")
            column = line.index(m.group(1))
            grade = "9" if current.startswith("9-12") else current.split(".")[0].lower()
            add(grade, "social", current, "performance standard", m.group(2))
            continue
        # A standard's next lines start under its text, to the right of the anchor standard column.
        if current and line.strip() and len(line) - len(line.lstrip()) >= column - 2 and not re.match(r"^\s*\d{1,3}\s*$", line):
            grade = "9" if current.startswith("9-12") else current.split(".")[0].lower()
            entry = OUT[f"{grade}/social"][current]
            if len(entry["content"]) < 700:
                entry["content"] = clean(entry["content"] + " " + line[column - 2 :])
        else:
            current = None


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "source"
    math(src)
    language(src)
    science(src)
    science_nm(src)
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
