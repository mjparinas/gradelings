"""Builds outcomes.json from Montana's content standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]   (default: ./source) writes outcomes.json beside this script
Needs only the Python standard library.

The Montana Office of Public Instruction publishes every content standard in its IMS CASE server (Satchel, by Common
Good Learning Tools). Each CFPackage lists the items of one document with the code the OPI gives it
("humanCodingScheme"), its grade ("educationLevel") and its words ("fullStatement"). The packages read here:

  math      Montana Mathematics Content Standards (2026), adopted 2025, in schools from July 1, 2026: "MT.4.NBT.1",
            parts "MT.4.NF.3.a"; high school "MT.HS.CORE.ALG.LIN.2" (Grade 9).
  language  Montana Content Standards for English Language Arts and Literacy (2011), in schools until the 2027
            standards take effect on July 1, 2027: "RL.4.2", parts "L.4.1.a"; Grades 6 to 8 add the literacy
            standards for history and science ("RH.6-8.2", "RST.6-8.4", "WHST.6-8.1"); Grade 9 cites the 9-10 band.
  science   Montana Science Content Standards (2016): the OPI codes each standard with the Next Generation Science
            Standards performance expectation it was written from ("4-PS3-2"); Grades 6 to 8 share one band ("MS-"),
            and Grade 9 cites the high school band ("HS-").
  social    Montana Content Standards for Social Studies (2021): "SS.CG.4.4" (civics and government), "SS.E.4.2"
            (economics), "SS.G.4.3" (geography) and "SS.H.4.1" (history); Grades 6 to 8 share "SS.H.6-8.5" and Grade 9
            cites "SS.CG.9-12.7". Kindergarten has one geography and one history standard, coded "SS.G.K" and "SS.H.K".
            The inquiry skills for every grade ("SS.K12.1" to "SS.K12.6") are listed under each grade.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social, sorted in natural order of the code.
"""

import json
import re
import sys
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
FILES = {
    "math": "case-math-2026.json",
    "language": "case-ela-2011.json",
    "science": "case-science-2016.json",
    "social": "case-social-2021.json",
}
LEVEL = {"KG": "k", "01": "1", "02": "2", "03": "3", "04": "4", "05": "5", "06": "6", "07": "7", "08": "8", "09": "9"}


def clean(text):
    text = re.sub(r"\s+", " ", text.replace("*", "")).strip()
    return text


def natural(code):
    return [int(p) if p.isdigit() else p for p in re.split(r"(\d+)", code)]


def items(src, subject):
    data = json.loads((src / FILES[subject]).read_text(encoding="utf-8"))
    return [x for x in data["CFItems"] if x.get("humanCodingScheme")]


def math(src):
    out = {}
    for x in items(src, "math"):
        code = x["humanCodingScheme"].strip()
        kind = (x.get("CFItemType") or "").lower()
        if kind not in ("standard", "component", "sub-component"):
            continue
        m = re.match(r"MT\.(K|[1-8]|HS)\.", code)
        if not m:
            continue
        grade = {"K": "k", "HS": "9"}.get(m.group(1), m.group(1))
        out.setdefault(grade, []).append((code, "high school standard" if grade == "9" else kind, x["fullStatement"]))
    return out


def language(src):
    out = {}
    for x in items(src, "language"):
        code = x["humanCodingScheme"].strip()
        m = re.match(r"(RL|RI|RF|W|SL|L|RH|RST|WHST)\.(K|[1-8]|6-8|9-10)\.\d+(\.[a-z])?$", code)
        if not m:
            continue
        band = m.group(2)
        grades = ["6", "7", "8"] if band == "6-8" else ["9"] if band == "9-10" else ["k" if band == "K" else band]
        for g in grades:
            out.setdefault(g, []).append((code, "standard", x["fullStatement"]))
    return out


def science(src):
    out = {}
    for x in items(src, "science"):
        code = x["humanCodingScheme"].strip()
        if not re.match(r"(K|[1-5]|MS|HS)-(PS|LS|ESS|ETS)\d+-\d+$", code):
            continue
        for level in x.get("educationLevel", []):
            g = LEVEL.get(level)
            if g:
                out.setdefault(g, []).append((code, "performance expectation", x["fullStatement"]))
    return out


def social(src):
    out = {}
    found = items(src, "social")
    codes = {x["humanCodingScheme"].strip() for x in found}
    skills = []
    for x in found:
        code = x["humanCodingScheme"].strip()
        if re.match(r"SS\.K12\.\d+$", code):
            skills.append((code, "inquiry skill", x["fullStatement"]))
            continue
        m = re.match(r"SS\.(CG|E|G|H)\.(K|[1-5]|6-8|9-12)(\.\d+)?$", code)
        if not m:
            continue
        if not m.group(3) and any(c.startswith(code + ".") for c in codes):
            continue  # a heading over numbered standards
        band = m.group(2)
        grades = ["6", "7", "8"] if band == "6-8" else ["9"] if band == "9-12" else ["k" if band == "K" else band]
        for g in grades:
            out.setdefault(g, []).append((code, "standard", x["fullStatement"]))
    for g in GRADES:
        out.setdefault(g, []).extend(skills)
    return out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    here = Path(__file__).resolve().parent
    src = Path(args[0]) if args else here / "source"
    built = {"math": math(src), "language": language(src), "science": science(src), "social": social(src)}
    result = {}
    for g in GRADES:
        for s in SUBJECTS:
            seen = {}
            for code, kind, text in built[s].get(g, []):
                seen.setdefault(code, {"idx": code, "kind": kind, "content": clean(text)})
            result[f"{g}/{s}"] = sorted(seen.values(), key=lambda o: natural(o["idx"]))
    (here / "outcomes.json").write_text(json.dumps(result, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print("outcomes.json:", sum(len(v) for v in result.values()), "entries")


if __name__ == "__main__":
    main()
