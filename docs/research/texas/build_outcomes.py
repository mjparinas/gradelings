#!/usr/bin/env python3
"""Builds outcomes.json from the Texas Essential Knowledge and Skills (TEKS) in source/.

Usage: python3 -I build_outcomes.py [source-dir]   (default: the source/ folder beside this script)

Reads the TEA chapter PDFs of 19 TAC Chapters 110 (English language arts and reading), 111 (mathematics),
112 (science) and 113 (social studies) with `pdftotext -layout` (poppler-utils), and writes
{"<grade>/<subject>": [{idx, kind, strand, content}]} for Kindergarten (`k`) to Grade 9.

A TEKS student expectation is cited by its grade (or course) prefix, the knowledge and skills statement and the
letter: `3.4(A)` is 19 TAC §111.5(b)(4)(A). Kindergarten is `K.`, and Grade 9 uses the course prefixes TEA uses:
`A.` (Algebra I), `E1.` (English I), `B.` (Biology) and `GOV.` (United States Government). Each knowledge and
skills statement is recorded too (kind `knowledge`, `3.4`), and each lettered student expectation (kind
`expectation`, `3.4(A)`), with its roman-numeral parts folded into its text.

The script stops with an error when a check fails: a section missing, numbers or letters out of order, or a
section with too few expectations.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "source"

# grade -> (file, section, prefix), per subject.
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SECTIONS = {
    "math": [("ch111a", f"111.{n}") for n in range(2, 8)] + [("ch111b", "111.26"), ("ch111b", "111.27"), ("ch111b", "111.28"), ("ch111c", "111.39")],
    "language": [("ch110a", f"110.{n}") for n in range(2, 8)] + [("ch110b", "110.22"), ("ch110b", "110.23"), ("ch110b", "110.24"), ("ch110c", "110.36")],
    "science": [("ch112a", f"112.{n}") for n in range(2, 8)] + [("ch112b", "112.26"), ("ch112b", "112.27"), ("ch112b", "112.28"), ("ch112c", "112.42")],
    "social": [("ch113a", f"113.{n}") for n in range(11, 17)] + [("ch113b", "113.18"), ("ch113b", "113.19"), ("ch113b", "113.20"), ("ch113c", "113.44")],
}
PREFIX = {"math": "A", "language": "E1", "science": "B", "social": "GOV"}

text_cache: dict[str, list[str]] = {}


def lines_of(name: str) -> list[str]:
    if name not in text_cache:
        out = subprocess.run(["pdftotext", "-layout", str(SRC / f"{name}.pdf"), "-"], check=True, capture_output=True, text=True).stdout
        text_cache[name] = out.split("\n")
    return text_cache[name]


# Running heads and feet: "Page 12   December 2014 Update", "§111.A.   Elementary", form feeds.
NOISE = re.compile(r"^\s*(\f)?\s*(Page \d+( of \d+)?\s+.*Update|.*Update\s+Page \d+( of \d+)?|§1\d\d\.[A-D]\.\s+\S.*|\S.*\s+§1\d\d\.[A-D]\.)\s*$")
KS = re.compile(r"^\s*\((\d+)\)\s+(.*)$")
SE = re.compile(r"^\s*\(([A-Z])\)\s+(.*)$")
SUB = re.compile(r"^\s*\(((?:i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii))\)\s+(.*)$")


def section_lines(name: str, section: str) -> list[str]:
    lines = lines_of(name)
    start = next((i for i, l in enumerate(lines) if l.lstrip("\f").startswith(f"§{section}. ")), None)
    if start is None:
        sys.exit(f"§{section} not found in {name}")
    ks = next(i for i in range(start, len(lines)) if re.match(r"^\([b-d]\)\s+Knowledge and skills", lines[i].lstrip("\f")))
    end = next(i for i in range(ks, len(lines)) if lines[i].lstrip("\f").startswith("Source:"))
    return [l.lstrip("\f") for l in lines[ks + 1 : end] if l.strip() and not NOISE.match(l)]


def clean(s: str) -> str:
    s = re.sub(r"\s+", " ", s).strip()
    return s.replace("- ", "-") if False else s


def parse(name: str, section: str, prefix: str) -> list[dict]:
    out: list[dict] = []
    ks_num = 0
    letter = ""
    cur: dict | None = None
    strand = ""
    roman_ok = 0
    for line in section_lines(name, section):
        m = KS.match(line)
        if m and int(m.group(1)) == ks_num + 1:
            ks_num += 1
            letter = ""
            roman_ok = 0
            cur = {"idx": f"{prefix}.{ks_num}", "kind": "knowledge", "strand": "", "content": m.group(2)}
            out.append(cur)
            continue
        m = SE.match(line)
        if m and ks_num and ord(m.group(1)) == (ord(letter) + 1 if letter else ord("A")):
            letter = m.group(1)
            roman_ok = 0
            cur = {"idx": f"{prefix}.{ks_num}({letter})", "kind": "expectation", "strand": "", "content": m.group(2)}
            out.append(cur)
            continue
        m = SUB.match(line)
        if m and cur and cur["kind"] == "expectation":
            roman_ok += 1
            cur["content"] += f" ({m.group(1)}) {m.group(2)}"
            continue
        if KS.match(line) or SE.match(line):
            sys.exit(f"§{section}: marker out of order after {cur['idx'] if cur else 'start'}: {line.strip()[:80]}")
        if cur is None:
            sys.exit(f"§{section}: text before the first statement: {line.strip()[:80]}")
        cur["content"] += " " + line.strip()
    # The strand is the statement's opening phrase ("Number and operations."), carried to its expectations.
    for e in out:
        e["content"] = clean(e["content"])
        if e["kind"] == "knowledge":
            strand = re.split(r"\.\s", e["content"], maxsplit=1)[0].rstrip(".")
        e["strand"] = strand
    return out


def main() -> None:
    result: dict[str, list[dict]] = {}
    for gi, grade in enumerate(GRADES):
        for subject, secs in SECTIONS.items():
            name, section = secs[gi]
            prefix = "K" if grade == "k" else PREFIX[subject] if grade == "9" else grade
            entries = parse(name, section, prefix)
            n = sum(1 for e in entries if e["kind"] == "expectation")
            if n < 15:
                sys.exit(f"{grade}/{subject} (§{section}): only {n} expectations")
            seen = set()
            for e in entries:
                if e["idx"] in seen:
                    sys.exit(f"{grade}/{subject}: duplicate {e['idx']}")
                seen.add(e["idx"])
                e["section"] = f"19 TAC §{section}"
            result[f"{grade}/{subject}"] = entries
    (HERE / "outcomes.json").write_text(json.dumps(result, indent=1, ensure_ascii=False) + "\n")
    for key, entries in result.items():
        print(key, sum(1 for e in entries if e["kind"] == "knowledge"), sum(1 for e in entries if e["kind"] == "expectation"))


if __name__ == "__main__":
    main()
