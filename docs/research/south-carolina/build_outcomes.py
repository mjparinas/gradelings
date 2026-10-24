#!/usr/bin/env python3
"""Builds outcomes.json, the South Carolina standards the app may cite, from the `pdftotext -layout` extracts in source/.

Run `python3 -I build_outcomes.py --write` to rewrite outcomes.json; without --write it checks the file matches.

Each standard is {"idx": code, "kind": "standard", "content": text} under "<grade>/<subject>", with the text cut to about
300 characters, enough to recognize it. Codes are kept as the documents print them:

- math (2025 SC CCR Mathematics Standards): "4.NR.1.2", "K.PAFR.2.1"; Grade 9 is Algebra 1, "A1.PAFR.2.3";
- English language arts (2023 SC CCR ELA Standards): "ELA.4.AOR.1.2", "ELA.2.F.3.4"; Grade 9 is English 1, "ELA.E1.AOR.2.1";
- science (SC CCR Science Standards 2021): "4-PS3-1", middle school by grade, "6-ESS2-1"; Grade 9 cites the high school
  courses Biology 1 ("B-LS1-1"), Chemistry ("C-PS1-1") and Physics ("P-PS2-1");
- social studies (2019 SC Social Studies CCR Standards): "K.H.1", "3.1.2.AG", "4.1.CO", "7.2.3.HS"; Grade 9 cites United
  States Government ("USG.2.CC") and Economics and Personal Finance ("EPF.3.IP").
"""
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "source"
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
LIMIT = 300

FOOTER = re.compile(r"^\s*(SC CCR|South Carolina (College|Social)|Approved:|Page \d+|Emended|Indicator #|Corrective)")


def clean(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    text = text.replace("’", "'").replace("“", '"').replace("”", '"')
    if len(text) > LIMIT:
        text = text[:LIMIT].rsplit(" ", 1)[0] + "…"
    return text


def grade_of(prefix: str) -> str:
    return {"K": "k", "A1": "9", "E1": "9", "USG": "9", "EPF": "9", "B": "9", "C": "9", "P": "9"}.get(prefix, prefix)


def add(out: dict, grade: str, subject: str, code: str, text: str) -> None:
    items = out.setdefault(f"{grade}/{subject}", {})
    text = clean(text)
    if code not in items or (not items[code] and text):
        items[code] = text


# --------------------------------------------------------------------------------------------------------------------
# Math: three columns (indicator number, indicator, indicator insight). The indicator is the middle column.

MATH_CODE = re.compile(r"^(\s*)((K|[1-8]|A1)\.(NR|PAFR|MGSR|DPSR)\.\d+\.\d+)\s+(\S.*)$")


def math(out: dict) -> None:
    lines = (SRC / "math.txt").read_text().splitlines()
    i = 0
    while i < len(lines):
        m = MATH_CODE.match(lines[i])
        if not m:
            i += 1
            continue
        code, grade = m.group(2), grade_of(m.group(3))
        rest_at = m.start(5)
        rest = lines[i][rest_at:]
        parts = re.split(r"\s{3,}", rest, maxsplit=1)
        text = [parts[0]]
        insight_at = rest_at + rest.find(parts[1]) if len(parts) > 1 else rest_at + 46
        j = i + 1
        while j < len(lines):
            line = lines[j]
            if MATH_CODE.match(line) or FOOTER.match(line) or (line[:1].strip() and not line.startswith(" ")):
                break
            chunk = line[max(0, rest_at - 2) : insight_at - 1].strip()
            if not chunk:
                break
            text.append(chunk)
            j += 1
        add(out, grade, "math", code, " ".join(text))
        i = j


# --------------------------------------------------------------------------------------------------------------------
# English language arts: "ELA.4.AOR.1.2   text", continued on indented lines.

ELA_CODE = re.compile(r"^\s*(ELA\.(K|[1-8]|E1)\.[A-Z]+\.\d+\.\d+)\s+(\S.*)$")
ELA_STOP = re.compile(r"^(ELA\.|Indicator Insight|SC CCR|Approved:)")


def ela(out: dict) -> None:
    lines = (SRC / "ela.txt").read_text().splitlines()
    i = 0
    while i < len(lines):
        m = ELA_CODE.match(lines[i])
        if not m:
            i += 1
            continue
        code, grade, text = m.group(1), grade_of(m.group(2)), [m.group(3)]
        j = i + 1
        while j < len(lines) and lines[j].startswith(" " * 10) and lines[j].strip():
            if ELA_STOP.match(lines[j].strip()):
                break
            text.append(lines[j].strip())
            j += 1
        body = " ".join(text)
        if not re.match(r"(There is not an indicator|Instruction of this indicator begins|This standard is not directly addressed)", body):
            add(out, grade, "language", code, body)
        i = j


# --------------------------------------------------------------------------------------------------------------------
# Science: "4-PS3-1. text", continued until a blank line or the clarification statement.

SCI_CODE = re.compile(r"^\s*((K|[1-8]|B|C|P)-(PS|LS|ESS)\d-\d+)\.?\s+(\S.*)$")


def science(out: dict) -> None:
    for name in ("science.txt", "science-biology-1.txt"):
        lines = (SRC / name).read_text().splitlines()
        for i, line in enumerate(lines):
            m = SCI_CODE.match(line)
            if not m:
                continue
            text = [m.group(4)]
            for nxt in lines[i + 1 :]:
                if not nxt.strip() or re.match(r"\s*(Clarification|State Assessment|Science and Engineering)", nxt):
                    break
                text.append(nxt.strip())
            add(out, grade_of(m.group(2)), "science", m.group(1), " ".join(text))


# --------------------------------------------------------------------------------------------------------------------
# Social studies: the code sits in the standards column, after the key concept; its text follows on the same line and
# continues at the same column until a blank line (the "This indicator was developed…" note comes after the blank).

SOC_CODE = re.compile(
    r"(?<![\w.])((K|[12])\.(H|G|E|CG)\.\d|([37])\.\d\.\d\.(AG|PR|ER|HS)|([4568])\.\d\.(CO|CE|P|E|CC|CX)|(USG|EPF)\.\d\.(CC|ER|IP|IN))(?![\w.])\s+(\S.*)$"
)


def social(out: dict) -> None:
    lines = (SRC / "social.txt").read_text().splitlines()
    for i, line in enumerate(lines):
        m = SOC_CODE.search(line)
        if not m:
            continue
        code = m.group(1)
        prefix = code.split(".")[0]
        text_at = m.start(10)
        text = [m.group(10)]
        for nxt in lines[i + 1 :]:
            chunk = nxt[text_at - 2 :].strip() if len(nxt) > text_at - 2 else ""
            if not chunk or SOC_CODE.search(nxt) or FOOTER.match(nxt):
                break
            text.append(chunk)
        body = re.sub(r"\s{3,}.*$", "", " ".join(text))
        if len(body.split()) < 3:
            continue
        add(out, grade_of(prefix), "social", code, body)


def build() -> dict:
    out: dict = {}
    math(out)
    ela(out)
    science(out)
    social(out)
    result = {}
    for g in GRADES:
        for s in ("math", "language", "science", "social"):
            items = out.get(f"{g}/{s}", {})
            result[f"{g}/{s}"] = [{"idx": k, "kind": "standard", "content": v} for k, v in items.items()]
    return result


if __name__ == "__main__":
    data = build()
    text = json.dumps(data, indent=2, ensure_ascii=False) + "\n"
    target = HERE / "outcomes.json"
    if "--write" in sys.argv:
        target.write_text(text)
        print({k: len(v) for k, v in data.items()})
    elif not target.exists() or target.read_text() != text:
        sys.exit("outcomes.json is out of date: run python3 -I build_outcomes.py --write")
    else:
        print("outcomes.json matches")
