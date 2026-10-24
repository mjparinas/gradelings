"""Builds outcomes.json, the Wisconsin standards that Gradelings cites, from the files in source/.

Usage: python3 -I build_outcomes.py [source-dir]

Each source file is one CASE package from DPI's standards server (see fetch.sh). Coded items become
{"idx": code, "kind": type, "content": text} under "<grade>/<subject>", where grade is k, 1 to 9 and subject is math,
language, science or social:

- Mathematics (2021): each standard ("M.4.NBT.A.1") under its grade; the high school standards ("M.9-12.A.SSE.A.1")
  under Grade 9; the Standards for Mathematical Practice ("M.SMP.1") under every grade.
- English language arts (2020): each standard ("ELA.4.R.2", "ELA.2.RF.3.b") under its grade; the 9-10 band under
  Grade 9. Standards the server leaves out are added from DPI's published document (ela-2020.docx).
- Science (2017): DPI's grade-level documents list every disciplinary core idea in every grade, but only some carry
  a content statement for that grade (the Next Generation Science Standards placement). A learning priority
  ("SCI.4.PS.3.B") is listed under its grade only when it has a content statement there, and a standard ("SCI.4.PS.3")
  only when one of its priorities does. The practices and crosscutting concepts (SEP, CC) are listed in every grade
  that prints them. Middle school ("SCI.m.") is listed under Grades 6, 7 and 8, high school ("SCI.h.") under Grade 9.
- Social studies (2018) and personal financial literacy (2020): performance indicators carry their grade band as
  the last part of the code: "e" (K-2), "i" (3-5), "m" (6-8), "h" (9-12, listed under Grade 9), or a grade or span
  ("SS.Geog2.a.K-1", "SS.Geog2.d.4-5"). Social studies standards ("SS.Hist1") are listed under every grade.
"""

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "source")
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
BAND = {"e": ["k", "1", "2"], "i": ["3", "4", "5"], "m": ["6", "7", "8"], "h": ["9"]}


def clean(text: str) -> str:
    text = re.sub(r"<br\s*/?>|</div>|</p>|</li>", " ", text or "")
    text = re.sub(r"<[^>]+>", "", text)
    text = text.replace("&nbsp;", " ").replace("&amp;", "&").replace("​", "")
    return " ".join(text.split())


def span(token: str) -> list[str]:
    """Grades named by a band letter, a grade ("4") or a span ("K-1", "4-5")."""
    if token in BAND:
        return BAND[token]
    parts = token.lower().split("-")
    order = GRADES[:9]
    if all(p in order for p in parts):
        a, b = order.index(parts[0]), order.index(parts[-1])
        return order[a : b + 1]
    return []


def load(name: str):
    with open(os.path.join(SRC, f"{name}.json"), encoding="utf-8") as f:
        pkg = json.load(f)
    items = sorted(pkg["CFItems"], key=lambda i: (i.get("humanCodingScheme") or "", i["identifier"]))
    kids: dict[str, list[str]] = {}
    for a in pkg.get("CFAssociations", []):
        if a["associationType"] == "isChildOf":
            kids.setdefault(a["destinationNodeURI"]["identifier"], []).append(a["originNodeURI"]["identifier"])
    return items, kids


def main() -> None:
    out: dict[str, list[dict[str, str]]] = {f"{g}/{s}": [] for g in GRADES for s in ("math", "language", "science", "social")}
    seen: dict[str, set[str]] = {k: set() for k in out}

    def add(grade: str, subject: str, code: str, kind: str, content: str) -> None:
        key = f"{grade}/{subject}"
        if code in seen[key]:
            return
        seen[key].add(code)
        out[key].append({"idx": code, "kind": kind, "content": content})

    # Mathematics.
    items, _ = load("math")
    for i in items:
        code = (i.get("humanCodingScheme") or "").strip()
        if i.get("CFItemType") != "Standard" or not code:
            continue
        text = clean(i["fullStatement"])
        if code.startswith("M.SMP."):
            for g in GRADES:
                add(g, "math", code, "practice", text)
        elif code.startswith("M.9-12."):
            add("9", "math", code, "standard", text)
        else:
            m = re.match(r"^M\.(K|[1-8])\.", code)
            if m:
                add(m.group(1).lower(), "math", code, "standard", text)

    # English language arts.
    items, _ = load("ela")
    for i in items:
        code = (i.get("humanCodingScheme") or "").strip()
        if i.get("CFItemType") != "Standard" or not code:
            continue
        m = re.match(r"^ELA\.(K|[1-8]|9-10)\.[A-Z]+\.\d", code)
        if m:
            add("9" if m.group(1) == "9-10" else m.group(1).lower(), "language", code, "standard", clean(i["fullStatement"]))
    # DPI's standards server leaves out a few standards the published document has (Grade 7 reading 7 to 9 and the
    # whole Grade 7 language strand, Grade 3 phonics). The document (ela-2020.docx, its text in ela-2020.txt) prints
    # them as "R.7.9", strand, grade and number; those missing from the server are added with the server's coding.
    with open(os.path.join(SRC, "ela-2020.txt"), encoding="utf-8") as f:
        for line in f:
            m = re.match(r"^(R|RF|W|SL|L)\.(K|[1-8]|9-10)\.(\d+)\s*(.*)$", line.strip())
            if m:
                strand, grade, n, text = m.groups()
                add("9" if grade == "9-10" else grade.lower(), "language", f"ELA.{grade}.{strand}.{n}", "standard (document)", clean(text))

    # Science.
    items, kids = load("science")
    by_id = {i["identifier"]: i for i in items}

    def statements(item) -> list[str]:
        return [clean(by_id[k]["fullStatement"]) for k in kids.get(item["identifier"], []) if by_id.get(k, {}).get("CFItemType") == "Default"]

    for kind in ("Learning Priority", "Standard"):
        for i in items:
            code = (i.get("humanCodingScheme") or "").strip()
            if i.get("CFItemType") != kind:
                continue
            m = re.match(r"^SCI\.(K|[1-5]|m|h)\.(PS|LS|ESS|ETS|SEP|CC)\.\d+(\.[A-Z])?$", code)
            if not m:
                continue
            band, area = m.group(1), m.group(2)
            grades = {"m": BAND["m"], "h": BAND["h"]}.get(band, [band.lower()])
            title = clean(i["fullStatement"])
            if kind == "Learning Priority":
                says = statements(i)
                if area not in ("SEP", "CC") and not says:
                    continue
                text = f"{title}: {' '.join(says)}" if says else title
                for g in grades:
                    add(g, "science", code, "priority", text)
            else:
                # A standard counts in a grade when one of its learning priorities has a content statement there.
                if area not in ("SEP", "CC"):
                    grades = [g for g in grades if any(o["idx"].startswith(code + ".") for o in out[f"{g}/science"])]
                for g in grades:
                    add(g, "science", code, "standard", title)

    # Social studies and personal financial literacy.
    for name in ("social", "pfl"):
        items, _ = load(name)
        for i in items:
            code = (i.get("humanCodingScheme") or "").strip()
            kind = i.get("CFItemType")
            text = clean(i["fullStatement"])
            if kind == "Performance Indicator" and code:
                for g in span(code.split(".")[-1] if name == "social" else code.split(".")[1]):
                    add(g, "social", code, "indicator", text)
            elif kind == "Standard" and name == "social" and re.match(r"^SS\.[A-Za-z]+\d$", code):
                for g in GRADES:
                    add(g, "social", code, "standard", text)

    for key in out:
        out[key].sort(key=lambda o: o["idx"])
    with open(os.path.join(HERE, "outcomes.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
        f.write("\n")
    print({k: len(v) for k, v in out.items()})


if __name__ == "__main__":
    main()
