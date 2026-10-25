"""Builds outcomes.json, the Virginia Standards of Learning codes and text that src/content/virginia/contract.ts checks
citations against, from the documents in source/ (see fetch.sh and README.md).

Run with `python3 -I build_outcomes.py` from this folder. It reads source/*.txt (the pdftotext -layout extracts and the
text of the Word document fetch.sh writes) and must reproduce the committed outcomes.json exactly.

Keys are "<grade>/<subject>" like the other frameworks'. Placement:
- math: Kindergarten to Grade 8 by grade (K.NS.1, 4.CE.2); Grade 9 is Algebra 1 (A.EO.1, A.F.2).
- language: Kindergarten to Grade 9 by grade, standards (4.RL.1, 4.FFR.3) and strands (4.DSR, 4.RL).
- science: Kindergarten to Grade 6 by grade (4.3); Life Science (LS.*) in Grade 7, Physical Science (PS.*) in Grade 8,
  Earth Science (ES.*) and Biology (BIO.*) in Grade 9, the courses Virginia schools usually teach in those grades.
- social: Kindergarten to Grade 3 by grade (K.4); Virginia Studies (VS.*) in Grade 4, United States History to 1865
  (USI.*) in 5, United States History: 1865 to the Present (USII.*) in 6, Civics and Economics (CE.*) in 7, World
  Geography (WG.*) in 8 and World History and Geography to 1500 A.D. (WHI.*) in 9, the 2023 standards' grade sequence.
"""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "source")
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


def read(name):
    with open(os.path.join(SRC, name), encoding="utf-8") as f:
        return f.read()


def clean(text):
    # Drop page footers and squash the layout's spacing.
    text = re.sub(r"Virginia Department of Education[^\n]*Page \d+", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def grade_of(prefix):
    return "k" if prefix == "K" else prefix


def stems(text, code_re, stop_re):
    """Each code's first appearance followed by text, with the text up to `stop_re` (the stem of the standard)."""
    out = {}
    matches = list(re.finditer(code_re, text))
    for i, m in enumerate(matches):
        code = m.group(1)
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        body = text[m.end():end]
        stop = re.search(stop_re, body)
        if stop:
            body = body[: stop.start()]
        body = clean(body)
        if code not in out and body:
            out[code] = body[:400]
    return out


def add(outcomes, key, idx, content):
    outcomes.setdefault(key, [])
    if all(o["idx"] != idx for o in outcomes[key]):
        outcomes[key].append({"idx": idx, "content": content})


def math(outcomes):
    text = read("math-2023.txt")
    # Algebra 1 starts the high school courses; Grade 8 ends before it.
    found = stems(
        text,
        r"(?<![\w.])((?:K|[1-8])\.(?:NS|CE|MG|PS|PFA)\.\d+|A\.(?:EO|EI|F|ST)\.\d+) (?=The student will)",
        r"Students will demonstrate|\n\s*\n\s*\n",
    )
    for code, body in found.items():
        prefix = code.split(".")[0]
        grade = "9" if prefix == "A" else grade_of(prefix)
        add(outcomes, f"{grade}/math", code, body)


def language(outcomes):
    text = read("english-2024.txt")
    # The document sometimes spaces or dots a code oddly ("K. FFR.2", "8.R. The student", "2.RL.1Key Ideas").
    text = re.sub(r"\b(K|\d+)\. (FFR|DSR)", r"\1.\2", text)
    text = re.sub(r"\b((?:K|\d+)\.[A-Z]+)\. (?=The)", r"\1 ", text)
    strands = "FFR|DSR|RV|RL|RI|FFW|W|LU|C|R"
    found = stems(text, rf"(?<![\w.])((?:K|[1-9]|1[0-2])\.(?:{strands})(?:\.\d+)?) ?(?=[A-Z])", r"\n\s*(?:[a-z]\.|[A-Z]?\d*\.?[A-Z]+\.\d|\s*\n)")
    for code, body in found.items():
        prefix = code.split(".")[0]
        if prefix not in ("K",) and not (prefix.isdigit() and 1 <= int(prefix) <= 9):
            continue
        if body.startswith(("See ", "**")):
            continue
        add(outcomes, f"{grade_of(prefix)}/language", code, body)


def science(outcomes):
    text = read("science-2018.txt")
    found = stems(text, r"(?<![\w.])((?:K|[1-6]|LS|PS|ES|BIO)\.\d+) +(?=The student will)", r"Key ideas include|\n\s*[a-z]\)|\n\s*\n")
    place = {"LS": "7", "PS": "8", "ES": "9", "BIO": "9"}
    for code, body in found.items():
        prefix = code.split(".")[0]
        grade = place.get(prefix) or grade_of(prefix)
        add(outcomes, f"{grade}/science", code, body)


def social(outcomes):
    text = read("social-2023.txt")
    place = {"VS": "4", "USI": "5", "USII": "6", "CE": "7", "WG": "8", "WHI": "9"}
    for line in text.split("\n"):
        m = re.match(r"((?:K|[1-3]|VS|USI|USII|CE|WG|WHI)\.\d+)\s*(The students? (?:will|use).*)", line.strip())
        if not m:
            continue
        code, body = m.group(1), clean(m.group(2))
        prefix = code.split(".")[0]
        grade = place.get(prefix) or grade_of(prefix)
        add(outcomes, f"{grade}/social", code, body[:400])


def main():
    outcomes = {}
    math(outcomes)
    language(outcomes)
    science(outcomes)
    social(outcomes)
    ordered = {f"{g}/{s}": outcomes.get(f"{g}/{s}", []) for g in GRADES for s in ["math", "language", "science", "social"]}
    with open(os.path.join(HERE, "outcomes.json"), "w", encoding="utf-8") as f:
        json.dump(ordered, f, ensure_ascii=False, indent=1)
        f.write("\n")
    for key, items in ordered.items():
        print(key, len(items))


if __name__ == "__main__":
    main()
