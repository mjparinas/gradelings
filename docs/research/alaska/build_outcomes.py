"""Builds outcomes.json from the Alaska Department of Education and Early Development's standards (see fetch.sh and
README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs pdfplumber.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Spans are listed under every grade they cover: the science standards' K-2 and 3-5
engineering expectations under their grades, middle school (MS) under 6, 7 and 8, high school (HS) under 9; the social
studies grade bands (K-2, 3-5, 6-8) under their grades and Grades 9-12 (with Alaska History, U.S. History and World
History) under 9; English language arts Grades 9-10 under 9; high school mathematics under 9.

Codes:
  math      "4.NBT.1" (Kindergarten to Grade 8, printed in the PDF); high school "A-SSE.1", "F-IF.4" (printed).
  language  "RL.4.1", "RI.4.2", "RF.4.3", "W.4.1", "SL.4.1", "L.4.4"; Grade 9 "RL.9-10.1". The PDF numbers the
            standards inside each strand and grade column ("1.", "2."); the code adds the strand and grade the way the
            document's own progressive-skills table does ("L.4.1f").
  science   the performance expectation codes ("4-PS3-2", "MS-LS1-1", "HS-ESS2-4"), printed.
  social    "SS.4.1.18.1" (grade, standard, anchor, number), "SS.3-5.18.1" (grade band), "SS.6.2.21.1" (grade, theme,
            anchor, number), "SS.9-12.6.1", "SS.AKH.5.9.1", printed (the PDF's hyphen U+2010 becomes "-").
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
    text = text.replace("‐", "-").replace("­", "")
    return re.sub(r"\s+", " ", text).strip()


OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


# Page footers and running heads that the column crops pick up ("Alaska English/Language Arts and Mathematics Standards
# June 2012", "Grade 8 Grade 8").
FOOTER = re.compile(r"\s*(?:\d+\s+)?(?:Al ?a ?ska English/Language Arts a ?nd Ma ?thematics S\w*|\w*rds June 2012|Standards June 2012)"
                    r"(?:\s+June 2012)?|(?:\s+Grade \d+)+\s*$|\s+\d+\s*$")


def add(grade, subject, idx, kind, content):
    content = FOOTER.sub(" ", content)
    content = re.split(r"\s*(?:Content Standard Therefore|9-12 Content Standard|Leveled Content Standard|Standard the student is able to)", content)[0]
    if clean(content).startswith("(Begins in grade"):
        return  # a placeholder: the standard starts in a later grade
    entries = OUT[f"{grade}/{subject}"]
    if idx not in entries:
        entries[idx] = {"idx": idx, "kind": kind, "content": clean(content)}


def grade_of(label):
    """'K' / 'Kindergartners:' / '4' -> grade id."""
    return "k" if label.lower().startswith("k") else label


# ---------------------------------------------------------------- columns
def columns(page, top_limit=200):
    """The grade columns on a page, from its header words: [(label, x0)] left to right."""
    words = page.extract_words()
    found = []
    for i, w in enumerate(words):
        if w["top"] > top_limit:
            continue
        if w["text"].startswith("Kindergartners"):
            found.append(("k", w["x0"], w["top"]))
        elif w["text"] in ("Grade", "Grades") and i + 1 < len(words):
            nxt = words[i + 1]["text"].rstrip(":")
            if re.fullmatch(r"K|\d|\d-\d+|\d+-\d+", nxt) and abs(words[i + 1]["top"] - w["top"]) < 3:
                found.append((grade_of(nxt), w["x0"], w["top"]))
    if not found:
        return None
    # The header row is the lowest row that has two or more grade labels.
    rows = {}
    for label, x0, top in found:
        rows.setdefault(round(top), []).append((label, x0))
    row_top = max((t for t, r in rows.items() if len(r) >= 2), default=None)
    if row_top is None:
        return None
    return row_top, sorted(rows[row_top], key=lambda c: c[1])


def column_texts(page, cols, header_top):
    """Text of each column below the header row."""
    out = []
    xs = [x for _, x in cols]
    for i, (label, x0) in enumerate(cols):
        left = max(0, x0 - 6)
        right = xs[i + 1] - 6 if i + 1 < len(xs) else page.width
        crop = page.crop((left, header_top + 8, right, page.height - 30))
        out.append((label, crop.extract_text() or ""))
    return out


# ---------------------------------------------------------------- math
MATH_DOMAIN = r"CC|OA|NBT|MD|NF|G|RP|NS|EE|F|SP"


def build_math(path):
    with pdfplumber.open(path) as pdf:
        streams = OrderedDict((g, []) for g in GRADES[:9])
        hs = []
        for page in pdf.pages:
            text = page.extract_text() or ""
            if re.search(rf"^\s*(N|A|F|G|S)-[A-Z]{{1,4}}\.\d+\.", text, re.M):
                hs.append(text)
                continue
            if not re.search(rf"\b[K1-8]\.({MATH_DOMAIN})\.\d+\.", text):
                continue
            head = columns(page, 90)
            if not head or len(head[1]) != 3:
                continue  # the one-column reading guide, not the standards
            for label, col in column_texts(page, head[1], head[0]):
                streams[label].append(col)
    for grade, parts in streams.items():
        code = "K" if grade == "k" else grade
        text = "\n".join(parts)
        pattern = re.compile(rf"^({code}\.(?:{MATH_DOMAIN})\.\d+)\.?\s", re.M)
        hits = list(pattern.finditer(text))
        if not hits:
            fail(f"no math standards for grade {grade}")
        for i, m in enumerate(hits):
            end = hits[i + 1].start() if i + 1 < len(hits) else len(text)
            body = text[m.end():end]
            # Stop at the next domain heading ("Geometry 4.G") so headings don't run into the standard.
            body = re.split(rf"\n[A-Z][^\n]*\s{code}\.(?:{MATH_DOMAIN})\s*\n", body)[0]
            add(grade, "math", m.group(1), "standard", body)
    text = "\n".join(hs)
    hits = list(re.finditer(r"^\s*((?:N|A|F|G|S)-[A-Z]{1,4}\.\d+)\.\s*", text, re.M))
    for i, m in enumerate(hits):
        end = hits[i + 1].start() if i + 1 < len(hits) else len(text)
        add("9", "math", m.group(1), "high school standard", text[m.end():end].split("\n\n")[0])


# ---------------------------------------------------------------- language
STRANDS = [
    ("Reading Standards for Literature", "RL"),
    ("Reading Standards for Informational Text", "RI"),
    ("Reading Standards: Foundational Skills", "RF"),
    ("Writing Standards for Literacy", None),
    ("Reading Standards for Literacy", None),
    ("Writing Standards", "W"),
    ("Speaking and Listening Standards", "SL"),
    ("Language Standards", "L"),
]


def build_language(path):
    streams = OrderedDict()
    with pdfplumber.open(path) as pdf:
        strand = None
        layout = None
        for page in pdf.pages:
            text = page.extract_text() or ""
            first = text.split("\n", 1)[0]
            if "Progressive Skills" in first or "Anchor Standards" in first or "Glossary" in first:
                layout = None
                continue
            for title, code in STRANDS:
                if first.startswith(title):
                    strand = code
                    break
            head = columns(page)
            if head:
                layout = head
                top = head[0]
            elif layout:
                top = 40
            else:
                continue
            if strand is None:
                continue
            for label, col in column_texts(page, layout[1], top):
                if label in ("11-12", "6-8"):
                    continue
                streams.setdefault((strand, label), []).append(col)
    for (strand, label), parts in streams.items():
        grade = "9" if label == "9-10" else label
        if grade not in GRADES:
            continue
        text = "\n".join(parts)
        hits = list(re.finditer(r"^(\d{1,2})\.\s", text, re.M))
        seen = 0
        for i, m in enumerate(hits):
            n = int(m.group(1))
            if n != seen + 1 and not (seen == 0 and strand == "RF"):
                continue  # a number inside a standard's text, not the next standard
            seen = n
            end = next((h.start() for h in hits[i + 1:] if int(h.group(1)) == n + 1), len(text))
            body = re.sub(r"\n(Key Ideas and Details|Craft and Structure|Integration of Knowledge and Ideas|Range of Reading and"
                          r"(?: Level of)? Text Complexity|Print Concepts|Phonological Awareness|Phonics and Word Recognition|"
                          r"Fluency|Text Types and Purposes|Production and Distribution of Writing|Research to Build and Present"
                          r" Knowledge|Range of Writing|Comprehension and Collaboration|Presentation of Knowledge and Ideas|"
                          r"Conventions of Standard English|Knowledge of Language|Vocabulary Acquisition and Use)\s*(?=\n|$)",
                          "\n", text[m.end():end])
            band = "9-10" if grade == "9" else ("K" if grade == "k" else grade)
            add(grade, "language", f"{strand}.{band}.{n}", "standard", body)


# ---------------------------------------------------------------- science
def build_science(path):
    """Each performance expectation is a code on its own line, then its text up to the clarification statement."""
    code_line = re.compile(r"^\s*((K|[1-5]|K-2|3-5|MS|HS)-(PS|LS|ESS|ETS)\d-\d+)\s*$")
    with pdfplumber.open(path) as pdf:
        lines = []
        for page in pdf.pages:
            lines += (page.extract_text() or "").split("\n")
    for i, line in enumerate(lines):
        m = code_line.match(line)
        if not m:
            continue
        body = []
        for nxt in lines[i + 1:i + 8]:
            if code_line.match(nxt) or not nxt.strip() or re.fullmatch(r"\s*\d+\s*", nxt):
                break
            body.append(nxt)
        content = " ".join(body).replace("Students who demonstrate mastery can:", "")
        content = re.split(r"\s?\[?(Clarification Statement|Assessment Boundary|The performance expectations above)", content)[0]
        if not content.strip():
            continue
        code, band = m.group(1), m.group(2)
        grades = {"K": ["k"], "K-2": ["k", "1", "2"], "3-5": ["3", "4", "5"], "MS": ["6", "7", "8"], "HS": ["9"]}.get(band, [band])
        for g in grades:
            add(g, "science", code, "performance expectation", content)


# ---------------------------------------------------------------- social
SS_CODE = re.compile(r"^SS\.(K|\d|K-2|3-5|6-8|9-12|AKH|USH|WH)\.[\d.]*\d$")


def social_grades(band):
    return {"K": ["k"], "K-2": ["k", "1", "2"], "3-5": ["3", "4", "5"], "6-8": ["6", "7", "8"],
            "9-12": ["9"], "AKH": ["9"], "USH": ["9"], "WH": ["9"]}.get(band, [band])


def build_social(path):
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages[20:]:
            words = page.extract_words(keep_blank_chars=False, use_text_flow=False)
            for w in words:
                w["text"] = w["text"].replace("‐", "-")
            codes = [w for w in words if SS_CODE.match(w["text"].rstrip("."))]
            for c in codes:
                left = c["x0"] - 2
                nxt_codes = [o for o in codes if o is not c and abs(o["x0"] - c["x0"]) < 30 and o["top"] > c["top"] + 1]
                bottom = min([o["top"] for o in nxt_codes], default=page.height - 40)
                # A grade-band standard sits left of its leveled standards ("By the end of K:"); its column ends there.
                beside = [w["x0"] for w in words if abs(w["top"] - c["top"]) < 3 and w["x0"] > c["x1"] + 20
                          and (w["text"] == "By" or SS_CODE.match(w["text"].rstrip(".")))]
                right = min(beside, default=page.width) - 2
                body = [w for w in words if w["x0"] >= left - 14 and w["x1"] <= right
                        and (c["top"] - 2 <= w["top"] < bottom) and w is not c
                        and not (abs(w["top"] - c["top"]) < 2 and w["x0"] < c["x0"])]
                body.sort(key=lambda w: (round(w["top"]), w["x0"]))
                text = " ".join(w["text"] for w in body)
                text = re.split(r"\s(?:•|By the end of\b|\d+ \| P a g e\b|Anchor Standard\b)", " " + text)[0]
                code = c["text"].rstrip(".")
                band = code.split(".")[1]
                for g in social_grades(band):
                    add(g, "social", code, "standard", text)


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "source")
    build_math(src / "math.pdf")
    build_language(src / "ela.pdf")
    build_science(src / "science.pdf")
    build_social(src / "social.pdf")
    result = OrderedDict((k, list(v.values())) for k, v in OUT.items())
    for key, entries in result.items():
        if not entries:
            fail(f"nothing for {key}")
    out = Path(__file__).parent / "outcomes.json"
    out.write_text(json.dumps(result, indent=1, ensure_ascii=False) + "\n")
    print({k: len(v) for k, v in result.items()})


if __name__ == "__main__":
    main()
