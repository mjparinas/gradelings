"""Builds outcomes.json from North Dakota's content standards, as the North Dakota Department of Public Instruction
(NDDPI) publishes them on its CASE server (case.nd.gov; see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Needs only the Python standard library.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Spans are listed under every grade they cover: the science K-2 and 3-5 engineering
expectations under their grades, middle school (MS) under 6, 7 and 8 and high school (HS) under 9; mathematics and
English language arts Grades 9-10 under 9; social studies K-2, 3-5 and 6-12 under each of their grades (6-12 under
6 to 9).

Codes (the CASE packages' humanCodingScheme, as the standards documents print them):
  math      2023 North Dakota Mathematics Content Standards: "4.NO.NBT.1" (grade, category, sub-category, number),
            "K-2.MA.P" (math attributes), high school "9-10.AR.F.3", "9-10.GM.12". The "*" (modeling) and "(+)" marks
            are left off.
  language  2023 North Dakota English Language Arts Content Standards: "4.F.3" (Foundations of Literacy), "4.R.2"
            (Reading), "4.IR.1" (Integrated Reading), "4.W.4" (Writing), "4.C.2" (Communication), "4.L.1b"
            (Language); high school "9-10.R.4".
  science   2019 North Dakota Science Content Standards: performance expectations "4-PS3-2", "MS-LS1-1", "HS-ESS2-4"
            and the engineering and technology expectations "K-2-ET1-1", "3-5-ET1-2", "MS-ET1-3", "HS-ET1-4".
  social    2019 North Dakota Social Studies Content Standards: standards "C.K_2.3", "H.3_5.10", "ND.6_12.4" and
            benchmarks "ND.6_12.4.1", "US.6_12.1-6.E2.4", "WH.6_12.1-6.E1.2". Two coding slips on the CASE server are
            fixed ("E.K._2.5" is E.K_2.5 and "US 6-12.1-6.E3.3" is US.6_12.1-6.E3.3).
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
FILES = {
    "math": "case-math-2023.json",
    "language": "case-ela-2023.json",
    "science": "case-science-2019.json",
    "social": "case-social-2019.json",
}
FIXES = {"E.K._2.5": "E.K_2.5", "US 6-12.1-6.E3.3": "US.6_12.1-6.E3.3"}


def clean(text):
    text = text.replace("‐", "-").replace("­", "").replace("–", "-")
    text = re.sub(r"[*_]+", "", text)
    return re.sub(r"\s+", " ", text).strip()


def code_of(item):
    code = (item.get("humanCodingScheme") or "").strip()
    code = FIXES.get(code, code)
    code = re.sub(r"^\(\+\)\s*", "", code).rstrip("*").strip()
    return code


def grades_of(subject, code):
    """The grades a code belongs to, or [] for codes that are not a K-9 standard."""
    if subject == "science":
        m = re.match(r"^(K|[1-5]|MS|HS|K-2|3-5)-(?:PS|LS|ESS|ET)\d-\d+$", code)
        if not m:
            return []
        band = m.group(1)
        return {"K": ["k"], "MS": ["6", "7", "8"], "HS": ["9"], "K-2": ["k", "1", "2"], "3-5": ["3", "4", "5"]}.get(band, [band])
    if subject == "social":
        m = re.match(r"^(?:C|E|G|H|ND|US|WH)\.(K_2|3_5|6_12)\.\d", code)
        if not m:
            return []
        return {"K_2": ["k", "1", "2"], "3_5": ["3", "4", "5"], "6_12": ["6", "7", "8", "9"]}[m.group(1)]
    m = re.match(r"^(K|[1-8]|9-10|K-2|3-5|6-8|9-12)\.", code)
    if not m:
        return []
    band = m.group(1)
    return {"K": ["k"], "9-10": ["9"], "K-2": ["k", "1", "2"], "3-5": ["3", "4", "5"], "6-8": ["6", "7", "8"], "9-12": ["9"]}.get(band, [band])


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    src = Path(args[0]) if args else Path(__file__).parent / "source"
    out = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)
    for subject, name in FILES.items():
        package = json.loads((src / name).read_text(encoding="utf8"))
        for item in package["CFItems"]:
            code = code_of(item)
            statement = clean(item.get("fullStatement") or "")
            if not code or not statement:
                continue
            kind = (item.get("CFItemType") or "standard").lower()
            for grade in grades_of(subject, code):
                entries = out[f"{grade}/{subject}"]
                if code not in entries:
                    entries[code] = {"idx": code, "kind": kind, "content": statement}
    result = OrderedDict()
    for key, entries in out.items():
        if not entries:
            sys.exit(f"error: no standards for {key}")
        result[key] = list(entries.values())
    text = json.dumps(result, indent=1, ensure_ascii=False) + "\n"
    target = Path(__file__).parent / "outcomes.json"
    if "--check" in sys.argv:
        if target.read_text(encoding="utf8") != text:
            sys.exit("error: outcomes.json differs from what the sources build")
        print("outcomes.json matches the sources")
        return
    target.write_text(text, encoding="utf8")
    print("wrote", target, {k: len(v) for k, v in result.items()})


if __name__ == "__main__":
    main()
