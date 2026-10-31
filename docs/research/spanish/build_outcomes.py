#!/usr/bin/env python3
"""Builds outcomes.json from the documents fetch.sh saves in source/.

Usage: python3 build_outcomes.py [source dir]
outcomes.json holds what the shared Spanish course may cite (checked by spanishCite in src/content/contract.ts):
  "wrs":    the eleven World-Readiness Standards for Learning Languages, by name;
  "levels": the NCSSFL-ACTFL proficiency sublevels named in the Can-Do Statements (Novice Low to Intermediate Low);
  "bc":     British Columbia's Spanish Content for Grades 5 to 9, one string per grade (the right-hand column);
  "ab":     Alberta's Nine-Year Program outcome clusters (A-1 to A-6, LC-1 to LC-4, GC-1 to GC-3, S-1 to S-3) with names;
  "mb":     Manitoba's numbered strands (1.1.1 Share Factual Information, ...) with names.
"""
import html, json, re, sys
from pathlib import Path

here = Path(__file__).resolve().parent
src = Path(sys.argv[1]) if len(sys.argv) > 1 else here / "source"
clean = lambda s: re.sub(r"\s+", " ", s).strip()

# World-Readiness Standards: each standard is a heading ending in a colon on ACTFL's summary page.
page = (src / "html/wrs-summary.html").read_text(encoding="utf8")
text = html.unescape(re.sub(r"<[^>]+>", "\n", re.sub(r"<script.*?</script>|<style.*?</style>", "", page, flags=re.S)))
lines = [clean(l) for l in text.split("\n") if clean(l)]
start = lines.index("COMMUNICATION")
wrs = [l[:-1] for l in lines[start:] if l.endswith(":") and l[0].isupper() and len(l) < 60]
assert len(wrs) == 11, wrs

cando = (src / "txt/actfl-can-do-novice.txt").read_text(encoding="utf8")
levels = [l for l in ["Novice Low", "Novice Mid", "Novice High", "Intermediate Low"] if l.upper() in clean(cando)]
assert len(levels) == 4, levels

# British Columbia: one page per grade; the Content column starts where its heading does.
bc = {}
for pg in (src / "txt/bc-spanish_5-10.txt").read_text(encoding="utf8").split("\f"):
    m = re.search(r"SECOND LANGUAGES — Spanish\s+Grade (\d+)", pg)
    if not m or m.group(1) not in "56789":
        continue
    rows = pg.split("\n")
    head = next(i for i, r in enumerate(rows) if "Curricular Competencies" in r and "Content" in r)
    col = rows[head].index("Content") - 4
    content = []
    for r in rows[head + 1:]:
        if r.strip().startswith("March 2018"):
            break
        content.append(r[col:].replace("•", " ").replace("—", " "))
    bc[m.group(1)] = clean(" ".join(content)).replace("Students are expected to know the following: ", "")

# Alberta: cluster headings such as "A-l   to impart and receive information" (the scan reads 1 as l).
ab = {}
for r in (src / "txt/ab-spanish-9y_4-12.txt").read_text(encoding="utf8").split("\n"):
    m = re.match(r"^\s*(A|LC|GC|S)-([1-6l])\s{1,}([a-z][A-Za-z ,-]+[a-z])\s*$", r)
    if m:
        ab.setdefault(f"{m.group(1)}-{m.group(2).replace('l', '1')}", clean(m.group(3)))
assert {"A-1", "A-6", "LC-1", "LC-4", "GC-1", "GC-3", "S-1", "S-3"} <= set(ab), sorted(ab)

# Manitoba: strand names followed by their number, "Share Factual Information (1.1.1)".
mb = {}
for m in re.finditer(r"([A-Z][A-Za-z ,/-]*?)\s*\(([1-4]\.\d\.\d)\)", (src / "txt/mb-spanish_7-s4.txt").read_text(encoding="utf8")):
    mb.setdefault(m.group(2), clean(m.group(1)))

out = {"wrs": wrs, "levels": levels, "bc": bc, "ab": dict(sorted(ab.items())), "mb": dict(sorted(mb.items()))}
(here / "outcomes.json").write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf8")
print(f"{len(wrs)} standards, {len(levels)} levels, BC grades {sorted(bc)}, {len(ab)} Alberta clusters, {len(mb)} Manitoba strands")
