"""Builds outcomes.json from the Nevada Academic Content Standards (Nevada Department of Education; see fetch.sh and
README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs pdfplumber.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Spans are listed under every grade they cover: middle school science (MS) and the Grades
6-8 social studies courses under 6, 7 and 8, high school science (HS) under 9; English language arts Grades 9-10 under
9; high school mathematics and the Grades 9-12 social studies courses under 9.

Codes:
  math      the Common Core codes the document prints with each domain ("4.NBT") and the standard's number:
            "4.NBT.1"; high school "A-SSE.1", "F-IF.4". Nevada adopted the Common Core as its standards in 2010. The
            document misprints N-RN as "N-M" once; it is read as N-RN.
  language  "RL.4.1", "RI.4.2", "RF.4.3", "W.4.1", "SL.4.1", "L.4.4"; Grade 9 "RL.9-10.1". The document numbers the
            standards inside each strand and grade column ("1.", "2."); the code adds the strand and grade, the way the
            Common Core's own codes do.
  science   the performance expectation codes the DCI arrangements print ("4-PS3-2", "MS-LS1-1", "HS-ESS2-4"), the same
            as the Next Generation Science Standards, which Nevada adopted in 2014.
  social    the codes as printed: "SS.K.9", "SS.4.11"; the Grades 6-8 courses "SS.6-8.EWC.12" (Early World
            Civilizations), "SS.6-8.WGGS.18" (World Geography and Global Studies) and "SS.6-8.EUSH.20" (Early U.S.
            History and Civic Ideals), with financial literacy "SS.6-8.FL.1"; Grades 9-12 "SS.9-12.CE.27" (Civics and
            Economics), ".US.", ".WH." and ".FL.". The few misprints "SS.6.8." and "SS.912." are read as "SS.6-8." and
            "SS.9-12.".
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
    # A number set a point lower than its words ("3." beside "Know and apply") joins their line, left to right.
    return [(top, sorted(words, key=lambda w: w["x0"])) for top, words in lines]


# ---------------------------------------------------------------- math
MATH_DOMAIN = re.compile(
    r"^\s*(\S.*?\s+)?((?:K|[1-8])\.(?:CC|OA|NBT|NF|MD|G|RP|NS|EE|F|SP)|[NAFGS]-(?:RN|M|Q|CN|VM|SSE|APR|CED|REI|IF|BF|LE|TF|CO|SRT|C|GPE|GMD|MG|ID|IC|CP|MD))\s*$",
    re.I,
)
MATH_STD = re.compile(r"^(\s{0,16})(\d{1,2})\.\s+(\S.*?)\s*$")


def math_grade(domain):
    return "9" if "-" in domain else ("k" if domain.startswith("K") else domain.split(".")[0])


def math(src):
    """Common Core State Standards for Mathematics, as Nevada adopted them (2010)."""
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
            # The document prints The Real Number System's code as "N-M"; it is N-RN.
            domain, last, current = m.group(2).upper().replace("N-M", "N-RN"), 0, None
            continue
        if re.search(r"overview|Mathematical Practices|Standards for Mathematical Practice", line, re.I):
            domain, current = None, None
            continue
        if not domain:
            continue
        s = MATH_STD.match(line)
        # A footnote ("4Students do not need to learn formal names...") is not a standard.
        if s and int(s.group(2)) == last + 1 and not s.group(3)[0].isdigit():
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
            if t.startswith(("Kindergartners", "Kindergarteners")):
                cols.append(("k", w["x0"]))
            elif t in ("Grade", "Grades") and i + 2 < len(words) and texts[i + 2].lower().startswith("students"):
                label = clean(texts[i + 1])
                cols.append(("9" if label == "9-10" else "11-12" if label == "11-12" else label, w["x0"]))
        if cols:
            return top, sorted(cols, key=lambda c: c[1])
    return None, []


def language(src):
    """Common Core State Standards for English Language Arts, as Nevada adopted them (2010)."""
    last_cols = None
    with pdfplumber.open(src / "ela.pdf") as pdf:
        for number, page in enumerate(pdf.pages):
            # One page prints its heading twice over (a bold effect), which reads "RReeaaddiinngg" without this.
            page = page.dedupe_chars()
            head = clean(page.crop((0, 0, page.width, min(page.height, 75))).extract_text() or "")
            if SKIP_PAGE.search(head):
                continue
            strand = next((code for title, code in STRANDS if title in head and "Literacy in" not in head.split("SUbjeCtS")[-1]), None)
            if not strand:
                continue
            lines = page_lines(page)
            top, cols = ela_columns(lines)
            if cols:
                last_cols = (strand, cols)
            elif last_cols and last_cols[0] == strand:
                # A strand's second page often repeats only the strand heading, not the grade headings.
                top, cols = 75, last_cols[1]
            else:
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
PE = re.compile(r"^\s*((?:K|[1-5]|MS|HS|K-2|3-5)-(?:PS|LS|ESS|ETS)\d-\d+)\.?\s+([A-Z].*)$")


def science(src):
    """Nevada Academic Content Standards for Science (2014), the Next Generation Science Standards' performance expectations."""
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
SS_CODE = re.compile(r"SS\.(K|[1-5]|6[.-]8|9-12|912)\.(?:([A-Z]{1,4})\.)?(\d+)\.?\s+(\S.*)$")
SS_STOP = re.compile(r"^\s*(?:\d{1,3}|Content Themes.*|Disciplinary Skills.*|Grades? .*:.*)\s*$")


def social(src):
    """Nevada Academic Content Standards for Social Studies (revised September 2018). Kindergarten to Grade 5 are
    grade-specific ("SS.4.11"); Grades 6-8 ("SS.6-8.EWC.1") and 9-12 ("SS.9-12.CE.1") are banded by course. Two codes
    are misprinted in the document, "SS.6.8.EWC.3" and "SS.912.FL.7"; they are read as SS.6-8.EWC.3 and SS.9-12.FL.7."""
    lines = (src / "social.txt").read_text().split("\n")
    current, col = None, 0
    for line in lines:
        m = SS_CODE.search(line)
        if m:
            band, strand, n, text = m.groups()
            band = {"6.8": "6-8", "912": "9-12"}.get(band, band)
            idx = f"SS.{band}.{strand + '.' if strand else ''}{n}"
            grades = ["6", "7", "8"] if band == "6-8" else ["9"] if band == "9-12" else [band.lower()]
            current, col = (grades, idx), m.start()
            for g in grades:
                add(g, "social", idx, "standard", text)
            continue
        rest = line[col - 2 :].strip() if len(line) > col - 2 else ""
        if current and rest and not SS_STOP.match(line) and line[: col - 2].strip() == "" or (current and rest and len(line) - len(line.lstrip()) >= col - 2 and not SS_STOP.match(line)):
            for g in current[0]:
                entry = OUT[f"{g}/social"][current[1]]
                if len(entry["content"]) < 500:
                    entry["content"] = clean(entry["content"] + " " + rest)
        elif not rest:
            continue
        else:
            current = None


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
