"""Builds outcomes.json from the Illinois State Board of Education's learning standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs pdfplumber.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Spans are listed under every grade they cover: the science K-2 and 3-5 engineering
expectations under their grades, middle school (MS) under 6, 7 and 8, high school (HS) under 9; the social science
inquiry skills (K-2, 3-5), the Grades 6-8 standards under 6, 7 and 8, and Grades 9-12 under 9; English language arts
Grades 9-10 under 9; high school mathematics under 9.

Codes:
  math      the Common Core codes the document prints with each domain ("4.NBT") and the standard's number:
            "4.NBT.1"; high school "A-SSE.1", "F-IF.4".
  language  "RL.4.1", "RI.4.2", "RF.4.3", "W.4.1", "SL.4.1", "L.4.4"; Grade 9 "RL.9-10.1". The document numbers the
            standards inside each strand and grade column ("1.", "2."); the code adds the strand and grade, the way the
            Common Core's own codes do.
  science   the Next Generation Science Standards performance expectation codes ("4-PS3-2", "MS-LS1-1",
            "HS-ESS2-4"), printed.
  social    "SS.4.H.1", "SS.K-2.IS.3", "SS.3.EC.FL.1", "SS.6-8.CV.1.LC", "SS.9-12.EC.FL.2", printed. A few printed codes
            have typing slips, normalized here: "SS.1 H.2" (SS.1.H.2), "SS.3.EC.FL1" (SS.3.EC.FL.1), "SS.3-5 IS.7",
            "S.9-12.IS.12", "S.9-12.EC.FL.2", "SS. 9-12.G.8". The Grades 6-8 standards come at three levels of
            complexity (LC less, MdC moderately, MC more), each its own code.
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
    """Common Core State Standards for Mathematics, as Illinois adopted them (2010)."""
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
    """Common Core State Standards for English Language Arts, as Illinois adopted them (2010)."""
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
    """Illinois Learning Standards for Science (2014): the Next Generation Science Standards' performance expectations."""
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


# ---------------------------------------------------------------- social science
SS_CODE = re.compile(
    r"^S{1,2}\.\s?(K-2|3-5|6-8|9-12|K|[1-5])[ .](IS|CV|EC|G|H|ANTH|PSY|SOC|REL)\.(?:(FL)\.?)?(\d+)\.?(LC|MdC|MCa|MCb|MC)?\.?$"
)


def social_code(text):
    m = SS_CODE.match(text)
    if not m:
        return None
    band, strand, fl, number, level = m.groups()
    parts = ["SS", band, strand] + (["FL"] if fl else []) + [number] + ([level] if level else [])
    return ".".join(parts)


def social_grades(code):
    band = code.split(".")[1]
    return {"K": ["k"], "K-2": ["k", "1", "2"], "3-5": ["3", "4", "5"], "6-8": ["6", "7", "8"], "9-12": ["9"]}.get(band, [band])


def social(src):
    """Illinois Learning Standards for Social Science (2016; inquiry skills and the disciplinary concepts)."""
    with pdfplumber.open(src / "social.pdf") as pdf:
        for number, page in enumerate(pdf.pages):
            if number < 4:
                continue  # the introduction's example table (page 4) prints an older code form
            words = page.extract_words(x_tolerance=1.5)
            # Join a code that the PDF split in two ("SS." "9-12.G.8.", "SS.1" "H.2.", "SS.3-5" "IS.7.").
            starts = []
            for i, w in enumerate(words):
                t = w["text"]
                nxt = words[i + 1]["text"] if i + 1 < len(words) else ""
                code = social_code(t) or (social_code(t + nxt) if t in ("SS.", "S.") else None) or (
                    social_code(f"{t} {nxt}") if re.match(r"^SS\.(K|[1-5]|3-5)$", t) else None
                )
                if code:
                    starts.append((code, w))
            if not starts:
                continue
            xs = sorted({round(w["x0"]) for _, w in starts})
            bands = []
            for x in xs:
                if not bands or x - bands[-1] > 20:
                    bands.append(x)
            for code, w in starts:
                left = max(b for b in bands if b <= round(w["x0"]) + 1) - 2
                later = [b for b in bands if b > left + 4]
                right = (later[0] - 2) if later else page.width
                below = [s for s in starts if left <= s[1]["x0"] < right and s[1]["top"] > w["top"] + 2]
                bottom = min((s[1]["top"] for s in below), default=page.height)
                cell = page.crop((left, w["top"] - 1, right, bottom - 1)).extract_text() or ""
                content = re.sub(r"^\s*S{1,2}\.\s?\S+(?:\s+\S+\.)?\s*", "", cell, count=1)
                content = re.split(r"\s*(?:No standard\.|Begins in Grade|None in Grade|\bS{1,2}\.\s?(?:K|\d)\S*)", content)[0]
                for g in social_grades(code):
                    add(g, "social", code, "standard", content)


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
