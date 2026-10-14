#!/usr/bin/env python3
"""Builds docs/research/arkansas/outcomes.json from the Arkansas Academic Standards PDFs in source/.

Run with --write to rewrite outcomes.json; without it, the script checks that the file matches what the PDFs give.
It reads `pdftotext -layout` text (the .txt files beside each PDF, made again from the PDF when pdftotext is
installed). Each standard is {"idx": code, "kind": "standard", "content": text} under "<grade>/<subject>":

- Math (2023): "4.NPV.1" (grade, strand, number; strands NPV number and place value, CAR computation and algebraic
  reasoning, GM geometry and measurement, DA data analysis, and from Grade 6 NCC, PR, ALG, GM, SP, FN). Grade 9 is
  Algebra I ("A1.LFE.3").
- English language arts (2023): "4.RC.8.RL" (grade, strand, number, sub-strand; strands FR foundational reading, RC
  reading comprehension, V vocabulary, W writing, L language, CC communication and collaboration). Vocabulary has
  no sub-strand ("4.V.2").
- Science (Arkansas K-12 Science Standards, NGSS-based): "4-PS3-1", "4-LS1-1AR" (an Arkansas clarification).
  Middle school is by grade ("7-PS1-1"). Grade 9 lists the integrated high school courses a ninth grader may take:
  Physical Science ("PSI-PS2-1"), Biology ("BI-LS1-1"), Chemistry ("CI-PS1-1") and Physics ("P-PS2-1").
- Social studies (2022): "C.1.4.2" (strand and standard, grade, number). Grade 7 and Grade 8 also list the
  Grades 7-8 Arkansas History course ("H.1.ARH.4"); Grade 9 is Civics ("C.3.CIV.5").

The `content` is the standard's text as laid out in the PDF, cut to about 300 characters; read the PDF for the full
wording.
"""
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "source"
OUT = HERE / "outcomes.json"
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


def text(name: str) -> list[str]:
    pdf, txt = SRC / f"{name}.pdf", SRC / f"{name}.txt"
    if shutil.which("pdftotext") and pdf.exists():
        subprocess.run(["pdftotext", "-layout", str(pdf), str(txt)], check=True)
    return txt.read_text(encoding="utf-8").split("\n")


def clean(s: str) -> str:
    s = s.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"').replace("–", "-").replace("—", "-")
    s = s.replace("ﬁ", "fi").replace("ﬂ", "fl").replace(" ", " ").replace("●", "-")
    s = re.sub(r"\s+", " ", s).strip()
    return s if len(s) <= 300 else s[:297].rsplit(" ", 1)[0] + "..."


FOOTER = re.compile(r"Arkansas (Division|Department) of|Academic Standards - Revised|Page \d+ of \d+|^\s*\d+\s*$|"
                    r"Mathematics Standards\s*$|Language Arts Standards\s*$|^\s{20,}\S.{0,60}$")

# ---- Math --------------------------------------------------------------------------------------------------------

MATH = re.compile(r"^\s*(K|[1-8]|A1)\.([A-Z]+)\.(\d+)\.?:\s*(.*)$")


def math(out: dict) -> None:
    lines = text("math-k-8")
    cur = None
    for line in lines:
        m = MATH.match(line)
        if m:
            g = {"K": "k", "A1": "9"}.get(m.group(1), m.group(1))
            cur = {"idx": f"{m.group(1)}.{m.group(2)}.{m.group(3)}", "kind": "standard", "content": m.group(4)}
            out[f"{g}/math"].append(cur)
        elif cur and line.startswith(" " * 8) and line.strip() and not FOOTER.search(line):
            cur["content"] += " " + line.strip()
        elif not line.strip() or FOOTER.search(line):
            cur = None


# ---- English language arts ---------------------------------------------------------------------------------------

ELA = re.compile(r"^\s*(K|[1-9])\.(FR|RC|V|W|L|CC)\.(\d+)(?:\.([A-Z]+))?:?\s+(.*)$")


def ela(out: dict) -> None:
    cur = None
    for line in text("ela-k-12"):
        m = ELA.match(line)
        if m:
            code = f"{m.group(1)}.{m.group(2)}.{m.group(3)}" + (f".{m.group(4)}" if m.group(4) else "")
            key = f"{m.group(1).lower()}/language"
            if any(o["idx"] == code for o in out[key]):
                cur = None
                continue
            cur = {"idx": code, "kind": "standard", "content": m.group(5)}
            out[key].append(cur)
        elif cur and line.startswith(" " * 8) and line.strip() and not FOOTER.search(line):
            cur["content"] += " " + line.strip()
        else:
            cur = None


# ---- Science -----------------------------------------------------------------------------------------------------

WORDS = re.compile(r"\b(the|and|of|to|that|in|a|is|for|with|how)\b")


def decoded(line: str) -> str:
    """Some pages use a font whose characters sit 29 code points low; shift a line back when that reads better."""
    shifted = "".join(chr(ord(c) + 29) if 3 <= ord(c) <= 0x5D and c != " " else c for c in line)
    return shifted if len(WORDS.findall(shifted)) > len(WORDS.findall(line)) else line


def science_file(name: str, prefix: str) -> list[dict]:
    code = re.compile(rf"^[\s\x0c]*({prefix}[A-Z]{{2,3}}\s?\d-\d+(?:AR)?)\s+([A-Z][a-z]+ .*)$")
    lines = [decoded(l) for l in text(name)]
    found: dict[str, dict] = {}
    cur = None
    for line in lines:
        m = code.match(line)
        if m:
            idx = m.group(1).replace(" ", "")
            if idx in found:
                cur = None
                continue
            cur = {"idx": idx, "kind": "standard", "content": re.split(r"\s{4,}", m.group(2).strip())[0]}
            found[idx] = cur
        elif cur and line.strip() and not FOOTER.search(line) and len(cur["content"]) < 300 and line.startswith(" "):
            cur["content"] += " " + re.split(r"\s{4,}", line.strip())[0]
        else:
            cur = None
    return sorted(found.values(), key=lambda o: [int(p) if p.isdigit() else p for p in re.split(r"(\d+)", o["idx"])])


def science(out: dict) -> None:
    for g in GRADES[:-1]:
        name = "k" if g == "k" else g
        out[f"{g}/science"] += science_file(f"science-{name}", f"{g.upper()}-")
    for course, prefix in (("physical", "PSI-"), ("biology", "BI-"), ("chemistry", "CI-"), ("physics", "P-")):
        out["9/science"] += science_file(f"science-{course}", prefix)


# ---- Social studies ----------------------------------------------------------------------------------------------

SS = r"[CEGH]\.\d\.(?:K|\d|ARH|CIV)\.\d+"
SS_ALONE = re.compile(rf"^\s*({SS})\s*$")
SS_ROW = re.compile(rf"^\s*{SS}(\S*\s+{SS})*\S*\s*$")


def social_rows(lines: list[str]) -> dict[str, str]:
    """Kindergarten to Grade 4: one row of codes (K to 4) above five columns of text."""
    found: dict[str, str] = {}
    i = 0
    while i < len(lines):
        if not SS_ROW.match(lines[i]):
            i += 1
            continue
        starts = [(m.start(), m.group(0)) for m in re.finditer(SS, lines[i])]
        # A code printed against its first words ("E.1.3.7e.g.,") keeps those words.
        glued = {m.group(1): m.group(2) for m in re.finditer(rf"({SS})(\S+)", lines[i])}
        cols = {c: [glued[c]] if c in glued else [] for _, c in starts}
        i += 1
        while i < len(lines) and not SS_ROW.match(lines[i]) and not FOOTER.search(lines[i]):
            row = lines[i]
            # Each piece of text (split at wide gaps) goes to the column whose code starts nearest to its left.
            for m in re.finditer(r"\S+(?: \S+)*", row):
                s, col = min(starts, key=lambda sc: abs(sc[0] - m.start()))
                if abs(s - m.start()) < 20:
                    cols[col].append(m.group(0))
            i += 1
        for c, parts in cols.items():
            words = clean(" ".join(parts))
            words = words.split(" Teacher Note")[0]
            found.setdefault(c, words)
    return found


def social_list(lines: list[str]) -> dict[str, str]:
    """Grades 5 to 9: each code on its own line, its text below until the next code."""
    found: dict[str, str] = {}
    cur = None
    for line in lines:
        m = SS_ALONE.match(line)
        if m:
            cur = m.group(1)
            if cur in found:
                cur = None
            else:
                found[cur] = ""
            continue
        if cur is None or FOOTER.search(line):
            continue
        if line.strip().startswith("Teacher Note") or (not line.strip() and found[cur]) and len(found[cur]) > 300:
            cur = None
            continue
        found[cur] += " " + line.strip()
    return {c: clean(t) for c, t in found.items()}


def social(out: dict) -> None:
    for c, t in social_rows(text("social-k-4")).items():
        g = c.split(".")[2].lower()
        out[f"{g}/social"].append({"idx": c, "kind": "standard", "content": t})
    for name, grade in (("social-5-6", None), ("social-7", "7"), ("social-8", "8")):
        for c, t in social_list(text(name)).items():
            # The Grade 7 document numbers its geography standards G.1.5.x; they are Grade 7 standards.
            g = grade or c.split(".")[2]
            out[f"{g}/social"].append({"idx": c, "kind": "standard", "content": t})
    arh = social_list(text("social-arkansas-history-7-8"))
    for g in ("7", "8"):
        for c, t in arh.items():
            out[f"{g}/social"].append({"idx": c, "kind": "standard", "content": t})
    for c, t in social_list(text("social-civics")).items():
        out["9/social"].append({"idx": c, "kind": "standard", "content": t})


def key(o: dict) -> list:
    return [int(p) if p.isdigit() else p for p in re.split(r"(\d+)", o["idx"])]


def build() -> dict:
    out = {f"{g}/{s}": [] for g in GRADES for s in ("math", "language", "science", "social")}
    math(out)
    ela(out)
    science(out)
    social(out)
    for k, v in out.items():
        for o in v:
            o["content"] = clean(o["content"])
        if k.endswith("/social") or k.endswith("/math"):
            v.sort(key=key)
    return out


def main() -> None:
    data = build()
    body = json.dumps(data, indent=1, ensure_ascii=False) + "\n"
    if "--write" in sys.argv:
        OUT.write_text(body, encoding="utf-8")
        print(f"wrote {OUT} ({sum(len(v) for v in data.values())} standards)")
        return
    if not OUT.exists() or OUT.read_text(encoding="utf-8") != body:
        sys.exit(f"{OUT} does not match the sources; run with --write")
    print("outcomes.json matches the sources")


if __name__ == "__main__":
    main()
