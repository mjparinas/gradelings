#!/usr/bin/env python3
"""Builds outcomes.json for New Jersey from the text extracts in source/ (made by fetch.sh).

Usage: python3 -I build_outcomes.py [source-dir]   (writes outcomes.json beside this script)

Every coded statement becomes {"idx": code, "kind": label, "content": text} under "<grade>/<subject>":
- mathematics (NJSLS-M 2023): grade, domain, cluster and number, "4.NBT.A.1"; Grade 9 lists the high school
  standards, "A.SSE.A.1";
- English language arts (NJSLS-ELA 2023): strand, sub-strand, grade and number, "RL.CR.4.1"; Grade 9 lists the
  grades 9-10 standards, "RL.CR.9–10.1" (with an en dash, as NJDOE prints it);
- science (NJSLS-S 2026): the performance expectations, "4-PS3-2"; the K-2 and 3-5 engineering ones are listed in
  each grade of their band, middle school ("MS-") in Grades 6 to 8 and high school ("HS-") in Grade 9;
- social studies (NJSLS-SS 2020): "6.1.5.CivicsPI.3", "6.1.8.HistoryCC.3.a"; the K-2 band is listed in K to 2, 3-5
  in 3 to 5, 6-8 in 6 to 8 and 9-12 in Grade 9. The personal financial literacy standards (NJSLS-CLKS 9.1, 2020,
  "9.1.5.FP.1") are listed with social studies in the same bands.
Only "idx" is checked by src/content/new-jersey/contract.ts.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "source")
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]

out = {f"{g}/{s}": [] for g in GRADES for s in SUBJECTS}


def read(name):
    with open(os.path.join(SRC, name), encoding="utf-8") as f:
        return f.read()


def add(grade, subject, idx, kind, content):
    items = out[f"{grade}/{subject}"]
    if any(o["idx"] == idx for o in items):
        return
    content = re.sub(r"\s*\[icon of[^\]]*\]", "", content)
    content = re.sub(r"\s+", " ", content).strip()
    items.append({"idx": idx, "kind": kind, "content": content})


def gid(g):
    return "k" if g == "K" else g


# Mathematics -------------------------------------------------------------------------------------------------------
domain = None
cluster = None
domain_re = re.compile(r"^[A-Z][A-Za-z ,()—-]+?(?:\[[^\]]*\]|\^\(★\))? +((?:K|[1-8])\.[A-Z]{1,3}|[NAFGS]\.[A-Z]{1,3})\s*$")
for line in read("2023_NJSLS_Mathematics.txt").split("\n"):
    s = line.strip()
    m = domain_re.match(s)
    if m:
        domain, cluster = m.group(1), None
        continue
    if s == "Glossary":
        break
    if re.search(r"Overview$|^Standards for Mathematical Practice|^Mathematics Standards for High School", s) or s.startswith("High School—"):
        domain = cluster = None
        continue
    if domain is None:
        continue
    m = re.match(r"^([A-H])\.\s+(\S.*)$", s)
    if m and not line.startswith("    "):
        cluster = m.group(1)
        continue
    m = re.match(r"^(\d+)\.\s+(\S.*)$", s)
    if m and cluster and not line.startswith("    "):
        code = f"{domain[:domain.index('.')]}.{domain.split('.', 1)[1]}.{cluster}.{m.group(1)}"
        grade = domain.split(".")[0]
        grade = gid(grade) if re.match(r"^(K|[1-8])$", grade) else "9"
        add(grade, "math", code, "Standard", m.group(2))

# English language arts ---------------------------------------------------------------------------------------------
ela_re = re.compile(r"^((?:RL|RI|W|SL|L)\. ?[A-Z]{2}\. ?(?:K|[1-8]|9–10)\.\d+)\.?\s*(.*)$")
for line in read("2023_NJSLS_ELA.txt").split("\n"):
    m = ela_re.match(line.strip())
    if not m:
        continue
    code = m.group(1).replace(" ", "")
    g = code.split(".")[2]
    if g == "11–12":
        continue
    add("9" if g == "9–10" else gid(g), "language", code, "Standard", m.group(2))

# Science -----------------------------------------------------------------------------------------------------------
pe_re = re.compile(r"\b((K|[1-5]|MS|HS|K-2|3-5)-(PS|LS|ESS|ETS)\d-\d+)\b\.?\s*(.*)")
BANDS = {"K-2": ["k", "1", "2"], "3-5": ["3", "4", "5"], "MS": ["6", "7", "8"], "HS": ["9"]}
for line in read("2026_NJSLS_Science.txt").split("\n"):
    for m in pe_re.finditer(line):
        code, band = m.group(1), m.group(2)
        for g in BANDS.get(band, [gid(band)]):
            add(g, "science", code, "Performance expectation", m.group(4))

# Social studies and personal financial literacy --------------------------------------------------------------------
SS_BANDS = {"2": ["k", "1", "2"], "5": ["3", "4", "5"], "8": ["6", "7", "8"], "12": ["9"]}
# NJDOE prints the K-2 geography codes with an extra dot ("6.1.2.Geo.SV.1"); they are kept as printed.
ss_re = re.compile(r"\b(6\.[1-3]\.(2|5|8|12)\.[A-Za-z]+(?:\.[A-Z]{2})?\.\d+(?:\.[a-z])?)(?:\s*:\s*|\s+(?=[A-Z]))(.*)")


def continued(lines, i, col, text):
    """Joins the wrapped lines of a statement printed in the right-hand column of a two-column page."""
    for nxt in lines[i + 1 : i + 6]:
        if len(nxt) <= col or nxt[max(col - 4, 0) : col].strip() or "•" in nxt:
            break
        more = nxt[col:].strip()
        if not more or re.match(r"^(6|9)\.\d", more):
            break
        text += " " + more
    return text


ss_lines = read("2020NJSLS-SS_by_GradeBand.txt").split("\n")
for i, line in enumerate(ss_lines):
    for m in ss_re.finditer(line):
        text = continued(ss_lines, i, m.start(1), m.group(3))
        for g in SS_BANDS[m.group(2)]:
            add(g, "social", m.group(1), "Performance expectation", text)
fl_re = re.compile(r"\b(9\.1\.(2|5|8|12)\.[A-Z]+\.\d+)\s*:\s*(.*)")
fl_lines = read("2020NJSLS-9.1FinancialLiteracy.txt").split("\n")
for i, line in enumerate(fl_lines):
    for m in fl_re.finditer(line):
        text = continued(fl_lines, i, m.start(1), m.group(3))
        for g in SS_BANDS[m.group(2)]:
            add(g, "social", m.group(1), "Personal financial literacy", text)

with open(os.path.join(HERE, "outcomes.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
    f.write("\n")
for key, items in out.items():
    print(key, len(items))
