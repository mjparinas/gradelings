#!/usr/bin/env python3
"""Rebuilds outcomes.json from the Alberta documents that fetch.sh saves.

Usage:  ./fetch.sh [dir]
        python3 -I build_outcomes.py [dir]            # compare with the committed outcomes.json
        python3 -I build_outcomes.py [dir] --write    # overwrite outcomes.json

dir defaults to ./source next to this script. Only the .txt files (pdftotext -layout) are read.
Two parts cannot be read from those documents and are kept by hand below (HAND_KEPT): see the
README ("Sources in this folder").
"""
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
args = [a for a in sys.argv[1:] if not a.startswith("--")]
SRC = Path(args[0]) if args else HERE / "source"
WRITE = "--write" in sys.argv

NOTE = ("Codes and snapshot lines extracted from Alberta Education publications (Open Government "
        "Licence - Alberta). See README.md for sources and dates.")

# Not in any document fetch.sh can download:
# - K-6 math Statistics outcomes (nST1, nST1.1, nST1.2): the aplc.ca scope and sequence has no
#   Statistics strand, and where these codes were read is not recorded (likely New LearnAlberta,
#   which can't be read automatically). Confirm them there.
# - Core French headings: the 2004 FSL nine-year program names its general outcomes Communication,
#   Language, Culture and Language Learning Strategies; these four headings were kept as committed.
HAND_KEPT = {
    "math-k6-statistics": [f"{g}ST1{s}" for g in "123456" for s in ("", ".1", ".2")],
    "core-french": ["A Applications", "LC Language competence", "GC Global citizenship", "S Strategies"],
}


def text(name):
    return (SRC / f"{name}.txt").read_text(encoding="utf-8")


def tidy(s):
    s = s.replace("\u00a0", " ")
    return re.sub(r"\s+", " ", s).strip()


def num_key(code):
    m = re.match(r"([A-Z]+)(\d+)", code)
    return (m.group(1), int(m.group(2)))


# --- K-6 math and science codes (aplc.ca numbered documents) --------------------------------------
def math_k6():
    found = set(re.findall(r"(?<![A-Za-z0-9])([K1-6](?:N|A|G|M|P|T)\d(?:\.\d)?)(?![0-9])",
                           text("k6-math-scope-sequence")))
    return sorted(found) + HAND_KEPT["math-k6-statistics"]


def science_k6():
    found = re.findall(r"(?<![A-Za-z0-9])([K1-6](?:CS|ES|LS|SM|E|M|S) ?\d(?:\.\d)?)(?![0-9])",
                       text("k6-science-numbered"))
    return sorted({c.replace(" ", "") for c in found})


# --- Grades 7-9 math: strand and number (2007 program with achievement indicators) ---------------
STRANDS = {"Number": "N", "Patterns and Relations": "PR", "Shape and Space": "SS",
           "Statistics and Probability": "SP"}


def math_7_9():
    out = {g: set() for g in "789"}
    grade = strand = None
    for line in text("math-k9-2007").splitlines():
        if m := re.match(r"^Grade (\d)\s*$", line):
            grade = m.group(1)
            continue
        if m := re.match(r"^Strand: ([A-Za-z ]+?)\s*(?:\(|\s{2,}|$)", line):
            strand = STRANDS.get(m.group(1).strip())
            continue
        if grade in out and strand and (m := re.match(r"^(\d{1,2})\.\s+[A-Z]", line)):
            out[grade].add(f"{strand}{m.group(1)}")
    return {g: sorted(v, key=num_key) for g, v in out.items()}


# --- Grades 7-9 science units ------------------------------------------------------------------
def science_units():
    # Each odd page header reads "Unit A: Interactions and Ecosystems      Grade 7 Science /11".
    found = set(re.findall(r"^Unit ([A-E]): (.+?)\s{2,}Grade ([789]) Science /\d+",
                           text("science-7-9"), re.M))
    out = {}
    for letter, title, grade in sorted(found, key=lambda x: (x[2], x[0])):
        out.setdefault(grade, []).append(f"{letter} {tidy(title)}")
    return out


# --- K-6 snapshot lines (open.alberta.ca overviews) -----------------------------------------------
GRADE = re.compile(r"^\s*(Kindergarten|Grade (\d))(?::\s*(.+?))?\s*$")
BULLET = re.compile(r"^(\s*)(?:|•)\s*(.+?)\s*$")


def snapshot_lines(name):
    lines = text(name).splitlines()
    start = next(i for i, l in enumerate(lines) if re.search(r"Snapshots? by grade", l))
    out, grade, focus, indent = {}, None, None, None
    for line in lines[start + 1:]:
        if re.match(r"^\s*(Find out more|©|Classification)", line):
            continue
        if m := GRADE.match(line):
            grade = "k" if m.group(1) == "Kindergarten" else m.group(2)
            out[grade] = {"focus": tidy(m.group(3)) if m.group(3) else None, "items": []}
            indent = None
            continue
        if grade is None or not line.strip():
            continue
        if m := BULLET.match(line):
            out[grade]["items"].append(m.group(2))
            indent = len(m.group(1))
        elif out[grade]["items"] and indent is not None and len(line) - len(line.lstrip()) <= indent + 6:
            out[grade]["items"][-1] += " " + line.strip()  # wrapped bullet
    for v in out.values():
        v["items"] = [tidy(i) for i in v["items"]]
    return out


def snapshots():
    res = {}
    for key, name in (("language", "k6-language"), ("social", "k6-social"),
                      ("science", "k6-science"), ("immersion", "k6-immersion")):
        got = snapshot_lines(name)
        if key == "social":
            res[key] = {g: {"focus": v["focus"], "topics": v["items"]} for g, v in got.items()}
        else:
            res[key] = {g: v["items"] for g, v in got.items()}
    return res


# --- Older Grades 7-9 programs -------------------------------------------------------------------
def language_7_9():
    # The overview (pages 3-4) sets the five general outcomes in two columns; read each column
    # as its own stream, then take "Students will listen, ... view and represent to <outcome>."
    lines = text("ela-k9-2000").splitlines()
    start = next(i for i, l in enumerate(lines) if re.search(r"\s{3,}General Outcome 3\s*$", l))
    end = next(i for i, l in enumerate(lines) if i > start and "1.1 Discover and explore" in l)
    region = lines[start - 30:end + 15]
    left = " ".join(l[:54] for l in region)
    right = " ".join(l[54:] for l in region)
    out = {}
    for stream in (left, right):
        for n, stmt in re.findall(r"General Outcome ([1-5]) Students will listen, speak, read, write, "
                                  r"view and represent to ([^.]+)\.", tidy(stream)):
            out[n] = stmt
    # The committed headings stop General Outcome 2 before "to oral, print and other media texts".
    out["2"] = out["2"].split(" to oral,")[0]
    return [f"{n} {out[n][0].upper()}{out[n][1:]}" for n in "12345"]


def social_7_9():
    t = text("social-k12-10-1")
    seg = t[t.index("Grade Title and General Outcomes"):t.index("Senior High School Course Titles")]
    col, cur = {}, None
    for line in seg.splitlines():
        part = line[16:62] if len(line) > 16 else ""
        if m := re.match(r"^\s*([789]\.\d) (.+)$", part):
            cur = m.group(1)
            col[cur] = m.group(2)
        elif cur and part.strip() and re.match(r"^\s{4,}\S", part):
            col[cur] += " " + part.strip()
        elif not part.strip():
            pass
        else:
            cur = None
    return {k: tidy(v) for k, v in sorted(col.items())}


def immersion_7_9():
    t = text("immersion-7-2000")
    out = {}
    pat = re.compile(r"^.{0,40}?\b(V1|CO[1-5]|CÉ[1-5]|PO[1-5]|PÉ[1-5])\. L’élève sera capable (?:de |d’)(.+)$")
    lines = t.splitlines()
    for i, line in enumerate(lines):
        m = pat.match(line)
        if not m or m.group(1) in out:
            continue
        stmt, col = m.group(2), line.index(m.group(1))
        j = i + 1
        while not stmt.rstrip().endswith(".") and j < len(lines):
            stmt += " " + lines[j][col - 2:].strip()
            j += 1
        # The committed statements use straight apostrophes and drop the repeated "de" before
        # "décoder" ("comprendre des discours oraux et décoder ...").
        s = tidy(stmt).replace("\u2019", "'").replace(" et de décoder", " et décoder")
        out[m.group(1)] = s[0].upper() + s[1:]
    order = ["V1"] + [f"{p}{n}" for p in ("CO", "CÉ", "PO", "PÉ") for n in range(1, 6)]
    return {k: out[k] for k in order if k in out}


def build():
    return {
        "_note": NOTE,
        "math": {"k-6": math_k6(), **math_7_9()},
        "science": {"k-6": science_k6(), "7-9-units": science_units()},
        "snapshots": snapshots(),
        "language-7-9": language_7_9(),
        "social-7-9": social_7_9(),
        "core-french": HAND_KEPT["core-french"],
        "immersion-7-9": immersion_7_9(),
    }


def diff(a, b, path=""):
    if isinstance(a, dict) and isinstance(b, dict):
        for k in sorted(set(a) | set(b), key=str):
            if k not in a:
                print(f"  only committed: {path}/{k}")
            elif k not in b:
                print(f"  only rebuilt: {path}/{k}")
            else:
                diff(a[k], b[k], f"{path}/{k}")
    elif a != b:
        print(f"  differs: {path}\n    rebuilt:   {json.dumps(a, ensure_ascii=False)[:300]}\n"
              f"    committed: {json.dumps(b, ensure_ascii=False)[:300]}")


def main():
    data = build()
    target = HERE / "outcomes.json"
    out = json.dumps(data, ensure_ascii=False, indent=1)  # the committed file has no final newline
    if WRITE:
        target.write_text(out, encoding="utf-8")
        print(f"Wrote {target}")
        return
    committed = json.loads(target.read_text(encoding="utf-8"))
    if data == committed:
        print("outcomes.json matches the rebuild.")
    else:
        print("outcomes.json differs from the rebuild:")
        diff(data, committed)
        sys.exit(1)


if __name__ == "__main__":
    main()
