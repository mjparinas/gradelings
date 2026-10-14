#!/usr/bin/env python3
"""Rebuilds the core-subject entries of outcomes.json (Kindergarten to Grade 9 math, language, science, social)
from the Ministry's "Outcomes & Indicators" pages saved by fetch.sh.

Run: python3 -I build_outcomes.py [dir]           compare with outcomes.json and list any differences (default)
     python3 -I build_outcomes.py [dir] --write   rewrite those entries in outcomes.json
dir defaults to ./source next to this script. The French entries ("immersion", "core-french") are left alone;
build_french_outcomes.py rebuilds them.

Each page (html/<subject>_<grade>.html) lists strands, each followed by "Outcomes:" and then the outcome codes with
their text. The text is the outcome statement with its list items run together, as the page shows it, without the
math processes ("([C, CN, V])") or the topic links that follow them. Science keeps the trailing goals in
parentheses ("(CP, SI)"), as the committed record does. Kindergarten math strands are named by their code (NK, PK,
SSK), as in the committed record and src/content/saskatchewan/outcomes.ts. Language pages also list units and the
scope and sequence after the three strands; only the strands are kept.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build_french_outcomes import lines  # noqa: E402  (same page-to-lines reading as the French builder)

FILES = {"math": "math", "language": "ela", "science": "science", "social": "social"}
CODE = re.compile(r"^[A-Z]{1,4}(?:K|\d)\.\d+[a-z]?$")
STRANDS = {"language": 3}  # language pages carry extra non-outcome sections after the strands


def parse(h, subject, grade):
    L = lines(h)
    start = next(k for k, l in enumerate(L) if l.startswith("Outcomes:")) - 1
    groups, cur, code, txt, prev = [], None, None, [], ""

    def flush():
        nonlocal code, txt
        if code and cur is not None:
            t = " ".join(txt).strip()
            if subject == "math":
                t = t.split(" ([", 1)[0]
            else:
                t = re.sub(r"(\s*\[[A-Z]+\])+\s*$", "", t)
                if subject != "science":
                    t = re.sub(r"\s*\(\[?[A-Z, \[\]]+\]?\)\s*$", "", t)
            cur["outcomes"].append({"code": code, "text": t.strip()})
        code, txt = None, []

    for l in L[start:]:
        if l.startswith("STaNS@"):
            break
        if l.startswith("Outcomes:"):
            if code and txt and txt[-1] == prev:
                txt.pop()
            flush()
            cur = {"name": prev, "outcomes": []}
            groups.append(cur)
            continue
        if len(l) < 14 and CODE.match(l):
            flush()
            code, prev = l, l
            continue
        if code and (subject == "science" or not re.fullmatch(r"\([A-Z]+(, ?[A-Z]+)*\)", l)):
            txt.append(l)
        prev = l
    flush()
    groups = [g for g in groups if g["outcomes"]][: STRANDS.get(subject)]
    if subject == "math" and grade == "k":
        for g in groups:
            g["name"] = g["outcomes"][0]["code"].split(".")[0]
    return groups


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    src = args[0] if args else os.path.join(HERE, "source")
    path = os.path.join(HERE, "outcomes.json")
    data = json.load(open(path, encoding="utf-8"))
    built = {}
    for g in "k123456789":
        for subject, f in FILES.items():
            with open(os.path.join(src, "html", f"{f}_{g}.html"), encoding="utf-8") as fh:
                built[(g, subject)] = parse(fh.read(), subject, g)
    if "--write" in sys.argv:
        for (g, subject), groups in built.items():
            data[g][subject] = groups
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=1, ensure_ascii=False)
        print("Wrote", path)
        return
    diffs = 0
    for (g, subject), groups in built.items():
        old = data[g][subject]
        if [x["name"] for x in groups] != [x["name"] for x in old]:
            diffs += 1
            print(f"{g} {subject}: strands differ: {[x['name'] for x in groups]} vs {[x['name'] for x in old]}")
        for a, b in zip(groups, old):
            if [o["code"] for o in a["outcomes"]] != [o["code"] for o in b["outcomes"]]:
                diffs += 1
                print(f"{g} {subject} {a['name']}: codes differ")
                continue
            for x, y in zip(a["outcomes"], b["outcomes"]):
                if x["text"] != y["text"]:
                    diffs += 1
                    print(f"{g} {subject} {x['code']}:\n  source:    {x['text']}\n  committed: {y['text']}")
    print(f"{diffs} difference(s) from outcomes.json")
    sys.exit(1 if diffs else 0)


if __name__ == "__main__":
    main()
