"""Builds outcomes.json, the Georgia standards that Gradelings cites, from the files in source/.

Usage: python3 -I build_outcomes.py [source-dir]

Each source file is one CASE package from GaDOE's standards server (see fetch.sh). Every coded item that is not
deprecated becomes {"idx": code, "kind": type, "content": text} under "<grade>/<subject>", where grade is k, 1 to 9 and
subject is math, language, science or social. An item is listed under the grades its educationLevel names (KG, 01 to
08, and 09 for Grade 9 English language arts). High school items (09 to 12) are listed under Grade 9 only for the
courses Gradelings teaches there: Algebra and Geometry: Concepts and Connections (A., G.); Biology, Physical Science,
Chemistry, Physics, Earth Systems and Environmental Science (SB, SPS, SC, SP, SES, SEV); and American
Government/Civics and Personal Financial Literacy (SSCG, SSPFL). The K-12 map and globe skills (SSMGS) and information
processing skills (SSIPS) are listed under every grade. Statements that only say a standard belongs to another grade
band ("This standard only applies to the K-2 grade band", "This progression begins in 3rd grade") are left out.
"""

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "source")
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
LEVEL = {"KG": "k", "01": "1", "02": "2", "03": "3", "04": "4", "05": "5", "06": "6", "07": "7", "08": "8", "09": "9"}
HIGH_SCHOOL = {
    "math": re.compile(r"^(A|G)\."),
    "language": None,
    "science": re.compile(r"^(SB|SPS|SC|SP|SES|SEV)\d"),
    "social": re.compile(r"^(SSCG|SSPFL)\d"),
}
EVERY_GRADE = re.compile(r"^(SSMGS|SSIPS)\d")
NOT_HERE = re.compile(r"only applies to the|progression (ends|begins) in|This big idea only|Not applicable as a separate", re.I)
FILES = [("math", "math"), ("ela", "language"), ("science", "science"), ("social", "social")]


def clean(text: str) -> str:
    return " ".join(text.replace("**", "").replace("​", "").split())


def main() -> None:
    out: dict[str, list[dict[str, str]]] = {f"{g}/{s}": [] for g in GRADES for s in ("math", "language", "science", "social")}
    seen: dict[str, set[str]] = {k: set() for k in out}
    for name, subject in FILES:
        with open(os.path.join(SRC, f"{name}.json"), encoding="utf-8") as f:
            items = json.load(f)["CFItems"]
        items.sort(key=lambda i: (i.get("humanCodingScheme") or "", i["identifier"]))
        for item in items:
            code = (item.get("humanCodingScheme") or "").strip()
            kind = item.get("CFItemType") or ""
            if not code or kind in ("Deprecated", "Course", "Grade Band", "Grade Level") or re.match(r"^\d+\.\d{5}$", code):
                continue
            text = clean(item.get("fullStatement") or "")
            if NOT_HERE.search(text):
                continue
            levels = item.get("educationLevel") or []
            if EVERY_GRADE.match(code):
                grades = GRADES
            elif levels and all(l in ("09", "10", "11", "12") for l in levels) and subject != "language":
                hs = HIGH_SCHOOL[subject]
                grades = ["9"] if hs and hs.match(code) else []
            else:
                grades = [LEVEL[l] for l in levels if l in LEVEL]
            for g in grades:
                key = f"{g}/{subject}"
                if code in seen[key]:
                    continue
                seen[key].add(code)
                out[key].append({"idx": code, "kind": kind, "content": text})
    with open(os.path.join(HERE, "outcomes.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
        f.write("\n")
    print({k: len(v) for k, v in out.items()})


if __name__ == "__main__":
    main()
