"""Builds outcomes.json from West Virginia's content standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]          (default: ./source) writes outcomes.json beside this script
       python3 -I build_outcomes.py --text [source-dir]   writes a plain-text extract beside each Word file
Needs only the Python standard library.

The West Virginia Board of Education's policy page serves each standards policy as a scanned PDF with no text layer and as
a Word file; the Word files are read here. Each standard is a code in a paragraph of its own (often a table cell)
followed by its text.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Grade 9 lists the high school courses a ninth grader takes: Algebra I in math; Grade 9 in
English language arts; Earth and Space Science, Biology and Physical Science in science; and World Studies, United
States Studies, United States Studies - Comprehensive, Contemporary Studies, Civics, Economics and Geography in social
studies.

Codes, as the policies print them:
  math      Policy 2520.2B (2024): "M.4.1"; Algebra I "M.A1HS.1".
  language  Policy 2520.1A (2021): "ELA.4.1"; the literacy foundations (fluency, phonics, handwriting and, in the
            early grades, print concepts and phonological awareness) carry Roman numerals: "ELA.4.I".
  science   Policy 2520.3C (2022): "S.4.1"; high school courses "S.ESS.1", "S.B.1", "S.PS.1".
  social    Policy 2520.4 (2024): "SS.4.1"; high school courses "SS.W.1", "SS.US.1", "SS.USC.1", "SS.CS.1",
            "SS.C.1", "SS.E.1", "SS.G.1".
"""

import html
import json
import re
import sys
import zipfile
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]

FILES = {
    "math": "math-2520.2B.docx",
    "language": "ela-2520.1A.docx",
    "science": "science-2520.3C.docx",
    "social": "social-2520.4.docx",
}
PREFIX = {"math": "M", "language": "ELA", "science": "S", "social": "SS"}
# The code's middle part (grade or course) for each grade of the app.
GRADE_PARTS = {g: ["K" if g == "k" else g] for g in GRADES}
NINE = {
    "math": ["A1HS"],
    "language": ["9"],
    "science": ["ESS", "B", "PS"],
    "social": ["W", "US", "USC", "CS", "C", "E", "G"],
}


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    text = text.replace("‐", "-").replace("­", "").replace("–", "-").replace("​", "").replace(" ", " ")
    return re.sub(r"\s+", " ", text).strip()


def paragraphs(path):
    """The Word file's paragraphs in document order, table cells included, as plain text."""
    xml = zipfile.ZipFile(path).read("word/document.xml").decode("utf-8")
    out = []
    for p in re.findall(r"<w:p[ >].*?</w:p>|<w:p/>", xml, re.S):
        parts = re.findall(r"<w:t(?: [^>]*)?>([^<]*)</w:t>|<w:(tab|br)/>", p)
        text = "".join(t if t else ("\t" if kind == "tab" else "\n") for t, kind in parts)
        out.append(html.unescape(text))
    return out


CODE = re.compile(r"^(M|ELA|S|SS)\.([A-Z0-9]+)\.([0-9]+|[IVX]+)$")
STOP = re.compile(r"^(Cluster|Topic|Standards? \d)")


def standards(path):
    """[(prefix, part, number, text)] for every standard in the file, in order."""
    paras = [clean(p) for p in paragraphs(path)]
    found = []
    for i, p in enumerate(paras):
        m = CODE.match(p)
        if not m:
            continue
        body = []
        for q in paras[i + 1 :]:
            if not q and not body:
                continue
            if not q or CODE.match(q) or STOP.match(q):
                break
            body.append(q)
        if body:
            found.append((m.group(1), m.group(2), m.group(3), " ".join(body)))
        elif not any(f[:3] == m.groups() for f in found):
            # A code with no text is only allowed as a repeat (the appendix tables list some codes again).
            fail(f"{path.name}: {p} has no text")
    return found


def build(src):
    out = OrderedDict((f"{g}/{s}", []) for g in GRADES for s in SUBJECTS)
    for subject, name in FILES.items():
        items = standards(src / name)
        for grade in GRADES:
            parts = NINE[subject] if grade == "9" else GRADE_PARTS[grade]
            seen = set()
            for prefix, part, number, text in items:
                if prefix != PREFIX[subject] or part not in parts:
                    continue
                idx = f"{prefix}.{part}.{number}"
                if idx in seen:
                    continue
                seen.add(idx)
                kind = "foundation" if re.fullmatch(r"[IVX]+", number) else "standard"
                out[f"{grade}/{subject}"].append({"idx": idx, "kind": kind, "content": text})
            if not out[f"{grade}/{subject}"]:
                fail(f"no {subject} standards for grade {grade}")
    return out


def main(argv):
    if argv and argv[0] == "--text":
        src = Path(argv[1] if len(argv) > 1 else Path(__file__).parent / "source")
        for path in sorted(src.glob("*.docx")):
            path.with_suffix(".txt").write_text("\n".join(paragraphs(path)) + "\n", encoding="utf-8")
        return
    src = Path(argv[0]) if argv else Path(__file__).parent / "source"
    out = build(src)
    target = Path(__file__).parent / "outcomes.json"
    target.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {target} ({sum(len(v) for v in out.values())} standards)")


if __name__ == "__main__":
    main(sys.argv[1:])
