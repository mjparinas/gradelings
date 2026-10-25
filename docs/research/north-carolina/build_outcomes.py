#!/usr/bin/env python3
"""Builds outcomes.json from the North Carolina Standard Course of Study documents in source/ (see fetch.sh).

The result maps "<grade>/<subject>" (grades k to 9; subjects math, language, science and social) to the standards a
unit may cite, each {"idx": code, "content": text}:

- math: the K-12 Mathematics Standard Course of Study, "NC.4.NBT.1" (sub-parts such as "NC.4.NF.1" are cited by the
  standard). Grade 9 is NC Math 1 ("NC.M1.A-SSE.1"), the course most students take in Grade 9.
- language: the 2017 English Language Arts Standard Course of Study, in place through 2026-27 ("RL.4.1", "RF.2.3",
  "L.4.4"); Grade 9 cites the 9-10 band ("RL.9-10.1"). The 2026 standards begin in 2027-28.
- science: the 2023 K-12 Science Standards, by objective ("PS.4.1.2", "LS.7.2.1", "ESS.6.3.1"). Grade 9 cites the
  high school courses: Biology ("LS.Bio.1.1"), Physical Science ("PS.PSc.2.1"), Earth/Environmental Science
  ("ESS.EES.1.2"), Chemistry ("PS.Chm.1.1") and Physics ("PS.Phy.1.1").
- social: the Social Studies Standards (2021), by objective ("4.H.1.2", "8.C&G.1.3"). Grade 9 cites The Founding
  Principles of the United States of America and North Carolina: Civic Literacy ("CL.C&G.2.1") and Economics and
  Personal Finance ("EPF.FP.1.2").

Usage: python3 -I build_outcomes.py [source dir]   (writes outcomes.json beside this script)
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "source")
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
out = {f"{g}/{s}": {} for g in GRADES for s in ("math", "language", "science", "social")}


def text(name):
    return open(os.path.join(SRC, name), encoding="utf-8-sig").read().replace(" ", " ")


def add(key, code, content):
    content = re.sub(r"\s+", " ", content).strip().strip('"').strip()
    if key in out and code not in out[key]:
        out[key][code] = content


def lines(name):
    # A few social studies objectives run on from the one before without a line break ("...community.K.C&G.1.3
    # Identify..."), so start a new line wherever a code follows the end of a sentence there.
    body = text(name) if not name.startswith("social") else re.sub(r"(?<=[.;:)])(?=(?:[K1-8]|CL|EPF)\.(?:[A-Z&]+\.)?\d+\.\d+ )", "\n", text(name))
    for raw in body.split("\n"):
        line = re.sub(r"^[\s*\-•\t]+", "", raw).strip()
        if line:
            yield line


# Mathematics.
for line in lines("math.txt"):
    m = re.match(r"^NC\.(K|[1-8])\.([A-Z]+)\.(\d+)[a-z]?\s+(.*)$", line)
    if m:
        add(f"{m.group(1).lower()}/math", f"NC.{m.group(1)}.{m.group(2)}.{m.group(3)}", m.group(4))
        continue
    m = re.match(r"^NC\.M1\.([A-Z]-[A-Z]+)\.(\d+)[a-z]?\s+(.*)$", line)
    if m:
        add("9/math", f"NC.M1.{m.group(1)}.{m.group(2)}", m.group(3))

# English language arts (2017).
for line in lines("ela-2017.txt"):
    m = re.match(r"^(RL|RI|RF|W|SL|L)\.(K|[1-8]|9-10)\.(\d+)\s+(.*)$", line)
    if m:
        g = "9" if m.group(2) == "9-10" else m.group(2).lower()
        add(f"{g}/language", f"{m.group(1)}.{m.group(2)}.{m.group(3)}", m.group(4))

# Science (2023).
for line in lines("science.txt"):
    m = re.match(r"^(PS|LS|ESS)\.(K|[1-8])\.(\d+)(\.\d+)?\s+(.*)$", line)
    if m:
        add(f"{m.group(2).lower()}/science", f"{m.group(1)}.{m.group(2)}.{m.group(3)}{m.group(4) or ''}", m.group(5))
        continue
    m = re.match(r"^((?:LS\.Bio|PS\.PSc|ESS\.EES|PS\.Chm|PS\.Phy)\.\d+(?:\.\d+)?)\s+(.*)$", line)
    if m:
        add("9/science", m.group(1), m.group(2))

# Social studies (2021).
for g in ["k", "1", "2", "3", "4", "5", "6", "7", "8"]:
    G = g.upper()
    for line in lines(f"social-{g}.txt"):
        # A few codes in the documents are mistyped ("5.G1.1", "5 G 1.4", "6.C&G. 1.2"); they are read as written
        # and cited in the regular form.
        m = re.match(r"^%s[ .]\s?(B|C&G|E|G|H)[ .]?\s?(\d+)(?:[ .]\s?(\d+))?\s+(.*)$" % G, line)
        if m:
            code = f"{G}.{m.group(1)}.{m.group(2)}" + (f".{m.group(3)}" if m.group(3) else "")
            add(f"{g}/social", code, m.group(4))
for name, prefix in (("social-civic-literacy.txt", "CL"), ("social-economics-personal-finance.txt", "EPF")):
    for line in lines(name):
        m = re.match(r"^(%s\.[A-Z&]+\.\d+(?:\.\d+)?)\s+(.*)$" % prefix, line)
        if m:
            add("9/social", m.group(1), m.group(2))

result = {k: [{"idx": c, "content": t} for c, t in v.items()] for k, v in out.items()}
with open(os.path.join(HERE, "outcomes.json"), "w", encoding="utf-8") as f:
    json.dump(result, f, indent=1, ensure_ascii=False)
    f.write("\n")
for k, v in result.items():
    print(k, len(v))
