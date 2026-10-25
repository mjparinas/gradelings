"""Builds outcomes.json from the Kentucky Academic Standards (Kentucky Department of Education; see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
       python3 -I build_outcomes.py --check           (exit 1 when outcomes.json differs from a fresh build)

It reads the plain-text copies (pdftotext -layout) committed beside each PDF, so it needs nothing beyond Python.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Spans are listed under every grade they cover: the science K-2 and 3-5 engineering
expectations under their grades, middle school engineering (MS-ETS1) under 6, 7 and 8, and high school (HS) science,
mathematics and social studies and the reading and writing Grades 9-10 standards under 9.

Codes, as the documents print them:
  math      "KY.4.NBT.1", "KY.K.CC.3"; high school "KY.HS.A.3", "KY.HS.F.5" (Mathematics, 2019).
  language  "RL.4.2", "RI.4.6", "C.4.1", "L.4.4", "RF.2.3", "HW.1.1"; Grade 9 "RL.9-10.2" (Reading and Writing,
            October 2025). Standards the document marks "Not applicable" (RL.n.8) or "No ... Standard for grade n"
            (some RF) are left out.
  science   "4-PS3-1", "6-LS1-1", "K-2-ETS1-1", "MS-ETS1-1", "HS-LS1-1" (Science, December 2022). Kentucky places each
            middle school performance expectation in one grade, 6, 7 or 8, so its code starts with that grade.
  social    "4.H.CH.1", "1.C.KGO.2", "5.I.Q.1"; high school "HS.C.CV.1", "HS.E.MI.2", "HS.UH.CE.3" (Social Studies,
            December 2022). The "K" codes in each discipline (KGO, KGE, KE, KH) are Kentucky's own standards.
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
HERE = Path(__file__).resolve().parent

OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    text = text.replace("‐", "-").replace("­", "").replace("–", "-").replace("’", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", text).strip()


def add(grades, subject, idx, kind, content):
    content = clean(content)
    if not content:
        fail(f"{idx}: no text")
    for grade in grades:
        entries = OUT[f"{grade}/{subject}"]
        if idx not in entries:
            entries[idx] = {"idx": idx, "kind": kind, "content": content}


def grade_of(label):
    """'K' or 'Kindergarten' -> ['k'], '4' -> ['4'], spans and high school -> every grade they cover."""
    label = label.strip()
    if label in ("K", "Kindergarten"):
        return ["k"]
    if label in ("HS", "9-10"):
        return ["9"]
    if label == "K-2":
        return ["k", "1", "2"]
    if label == "3-5":
        return ["3", "4", "5"]
    if label in ("MS", "6-8"):
        return ["6", "7", "8"]
    if label.isdigit() and 1 <= int(label) <= 8:
        return [label]
    return []


def read(src, name):
    path = src / name
    if not path.exists():
        fail(f"missing {path}")
    return path.read_text(encoding="utf-8").split("\n")


def left(line, width):
    """The left column of a two-column table line: text before a run of 3+ spaces, if it starts within `width`."""
    stripped = line.rstrip()
    if not stripped.strip():
        return ""
    lead = len(stripped) - len(stripped.lstrip())
    if lead >= width:
        return ""
    return re.split(r"\s{3,}", stripped.strip())[0]


# --------------------------------------------------------------------------------------------------------------------
# Mathematics (2019): "KY.4.NBT.1 Recognize in a multi-digit whole number, ..." in the left column, until "MP." or a gap.

def build_math(src):
    lines = read(src, "math-2019.txt")
    code_re = re.compile(r"^\s{0,3}(KY\.(K|\d|HS)\.[A-Z]+\.\d+)\b\s*(.*)$")
    for i, line in enumerate(lines):
        m = code_re.match(line)
        if not m:
            continue
        idx, grade, rest = m.group(1), m.group(2), m.group(3)
        parts = [re.split(r"\s{3,}", rest.strip())[0]] if rest.strip() else []
        blank = 0
        for nxt in lines[i + 1 : i + 40]:
            if code_re.match(nxt) or nxt.strip().startswith(("MP.", "Coherence")):
                break
            if not nxt.strip():
                blank += 1
                if blank >= 3:
                    break
                continue
            blank = 0
            # Bulleted parts of a standard are indented a little; text far to the right is the clarification, and the
            # fractions' numerators and denominators sit on lines of their own.
            chunk = left(nxt, 20)
            if chunk:
                parts.append(chunk)
        add(grade_of(grade), "math", idx, "standard", math_text(" ".join(parts)))


def math_text(text):
    """The PDF prints italic letters in fractions as doubled mathematical italics ("𝑏𝑏"); read them as letters."""
    text = re.sub(r"([\U0001D44E-\U0001D467])\1", lambda m: chr(ord(m.group(1)) - 0x1D44E + ord("a")), text)
    return text.replace("●", "").replace("…", "...")


# --------------------------------------------------------------------------------------------------------------------
# Reading and Writing (October 2025): one page per standard, "Reading Literature, Grade 4, Standard 2", whose
# "Multidimensionality" paragraph states the grade's standard. Foundational skills and handwriting are tables.

STRANDS = {
    "Reading Literature": "RL",
    "Reading Informational Text": "RI",
    "Composition": "C",
    "Language": "L",
}
TAGS = re.compile(r"\s*\((?:comprehension|analysis|content|application|knowledge|evaluation|synthesis|recall|creation)\)", re.I)


def tidy_standard(text):
    text = TAGS.sub("", text)
    # The document writes the content words in capitals; read them as ordinary words.
    text = re.sub(r"\bE\.G\.", "e.g.", text)
    text = re.sub(r"\b([A-Z][A-Z'\-]+)\b", lambda m: m.group(1) if m.group(1) in KEEP else m.group(1).lower(), text)
    # The article "A" printed in capitals ("elements of A STORY").
    text = re.sub(r"(?<=[a-z,;] )A(?= [a-z])", "a", text)
    return text[:1].upper() + text[1:]


KEEP = {"I", "US", "U", "S"}


def build_language(src):
    lines = read(src, "reading-writing-2025.txt")
    head = re.compile(r"^(Reading Literature|Reading Informational Text|Composition|Language), (Kindergarten|Grade (\d)|Grades (9-10|11-12)), Standard (\d+)\s*$")
    for i, line in enumerate(lines):
        m = head.match(line.strip())
        if not m:
            continue
        label = "K" if m.group(2) == "Kindergarten" else (m.group(3) or m.group(4))
        grades = grade_of(label)
        if not grades:
            continue
        idx = f"{STRANDS[m.group(1)]}.{label}.{m.group(5)}"
        text = ""
        for j in range(i + 1, min(i + 120, len(lines))):
            if head.match(lines[j].strip()):
                break
            if lines[j].strip() == "Multidimensionality":
                parts = []
                for nxt in lines[j + 1 : j + 12]:
                    s = nxt.strip()
                    if not s or re.match(r"^[a-z]\.\s", s) or re.match(r"^\d+ \|", s) or head.match(s):
                        break
                    parts.append(s)
                text = tidy_standard(" ".join(parts))
                break
        if not text:
            fail(f"{idx}: no Multidimensionality paragraph")
        if text.lower().startswith(("not applicable", "begins in grade")):
            continue
        add(grades, "language", idx, "standard", text)

    # Reading Foundational Skills (K-5): the code sits beside its stem under a centred heading.
    rf = re.compile(r"^\s{2,8}(RF\.(K|\d)\.(\d))\b\s*(.*)$")
    for i, line in enumerate(lines):
        m = rf.match(line)
        if not m:
            continue
        idx, grade, rest = m.group(1), m.group(2), m.group(4).strip()
        if rest.startswith("No "):
            continue
        heading, stem = "", ""
        for back in range(i - 1, max(i - 12, 0), -1):
            s = lines[back]
            if not s.strip():
                continue
            lead = len(s) - len(s.lstrip())
            if lead >= 30 and not heading:
                heading = s.strip()
                break
            if 10 <= lead < 30 and not re.match(r"^[a-z]\.\s", s.strip()):
                stem = s.strip()
        if not stem:
            # The stem can also follow the code line when the table wraps.
            for nxt in lines[i + 1 : i + 4]:
                if nxt.strip() and not re.match(r"^[a-z]\.\s", nxt.strip()):
                    stem = nxt.strip()
                    break
        add(grade_of(grade), "language", idx, "standard", f"{heading}: {stem}" if heading else stem)

    # Handwriting (K-3): "HW.1.1            Legibly print all upper- and lowercase letters ..."
    hw = re.compile(r"^\s{0,4}(HW\.(K|\d)\.(\d+))\s{2,}(\S.*)$")
    for line in lines:
        m = hw.match(line)
        if m:
            add(grade_of(m.group(2)), "language", m.group(1), "standard", m.group(4))


# --------------------------------------------------------------------------------------------------------------------
# Science (December 2022): "4-PS3-1.      Use evidence to construct ..." with indented continuation lines.

def build_science(src):
    lines = read(src, "science-2022.txt")
    code_re = re.compile(r"^\s{0,3}((K-2|3-5|K|\d|MS|HS)-[A-Z]{2,4}\d-\d+)\.\s+(.*)$")
    for i, line in enumerate(lines):
        m = code_re.match(line)
        if not m:
            continue
        idx, grade, first = m.group(1), m.group(2), m.group(3)
        parts = [first.strip()]
        for nxt in lines[i + 1 : i + 6]:
            if not nxt.strip() or code_re.match(nxt):
                break
            lead = len(nxt) - len(nxt.lstrip())
            if lead < 8:
                break
            parts.append(nxt.strip())
        add(grade_of(grade), "science", idx, "performance expectation", " ".join(parts))


# --------------------------------------------------------------------------------------------------------------------
# Social Studies (December 2022): "4.H.CH.1 Describe how migration and ..." in a narrow left column beside the
# clarification, which wraps independently, so continuation lines are the left column's text only.

def build_social(src):
    lines = read(src, "social-studies-2022.txt")
    code_re = re.compile(r"(?<![\w.])((K|\d|HS)\.[A-Z]{1,2}\.[A-Z]{1,3}\.\d+)\s+(\S.*)$")
    seen = set()
    # The introduction's "how to read the coding" example comes before the first grade.
    first = next(i for i, line in enumerate(lines) if line.strip() == "Kindergarten: Introduction")
    # Each grade first prints its standards beside the clarifications, flush left, where the two columns run into each
    # other; the grade's standards table then prints each one indented, beside its discipline. Read the table, and
    # fall back to the flush-left copy only for a code the table leaves out.
    tabled = {m.group(1) for line in lines[first:] if (m := code_re.search(line)) and m.start(1) > 0}
    for i, line in enumerate(lines):
        if i < first:
            continue
        m = code_re.search(line)
        if not m or m.group(1) in seen or (m.start(1) == 0 and m.group(1) in tabled):
            continue
        # The standard is the first time the code is printed with its text beside it; the tables of the grades'
        # progressions repeat it later.
        idx, grade = m.group(1), m.group(2)
        col = m.start(3)
        parts = [re.split(r"\s{3,}", m.group(3).strip())[0]]
        gap = 0
        for nxt in lines[i + 1 : i + 14]:
            if parts[-1].endswith(".") or code_re.search(nxt):
                break
            seg = nxt[col:] if len(nxt) > col and nxt[col - 1] == " " else ""
            chunk = re.split(r"\s{3,}", seg)[0].strip() if seg[:1].strip() else ""
            if not chunk:
                gap += 1
                if gap > 3:
                    break
                continue
            gap = 0
            parts.append(chunk)
        seen.add(idx)
        # A standard that goes on to a bulleted list keeps its stem; the bullets sit in a list below.
        add(grade_of(grade), "social", idx, "standard", re.sub(r"(\s*•)+\s*$", "", " ".join(parts)))


def build(src):
    build_math(src)
    build_language(src)
    build_science(src)
    build_social(src)
    for key, entries in OUT.items():
        if not entries:
            fail(f"nothing for {key}")
    return {key: list(entries.values()) for key, entries in OUT.items()}


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    src = Path(args[0]) if args else HERE / "source"
    data = json.dumps(build(src), indent=1, ensure_ascii=False) + "\n"
    target = HERE / "outcomes.json"
    if "--check" in sys.argv:
        if not target.exists() or target.read_text(encoding="utf-8") != data:
            fail("outcomes.json differs from a fresh build; run python3 -I build_outcomes.py")
        print("outcomes.json is up to date")
        return
    target.write_text(data, encoding="utf-8")
    counts = {k: len(v) for k, v in json.loads(data).items()}
    print(json.dumps(counts))


if __name__ == "__main__":
    main()
