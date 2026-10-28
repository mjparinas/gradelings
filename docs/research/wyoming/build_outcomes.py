"""Builds outcomes.json (Wyoming's standards by grade and subject) from the text copies in source/.

Wyoming's standards come from the Wyoming Department of Education's "All Currently-Adopted Standards" compilation for each
grade (Kindergarten to Grade 8) and for high school, which hold every set in force: English language arts (2012, the
Common Core), mathematics (2023), science (2023) and social studies (2014+2018). Mathematics and science were audited in
2023 to a smaller set of priority standards, so many Common Core and NGSS codes are not Wyoming standards. Middle school
science is one Grade 6-8 band and social studies is written for the bands K-2 (SS2), 3-5 (SS5), 6-8 (SS8) and 9-12
(SS12); a band's standards are listed for each of its grades. Grade 9 takes the Grade 9-10 English language arts
standards and the high school mathematics, science and social studies standards.

Usage: python3 -I build_outcomes.py [source-dir]
"""
import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
FILES = {"k": "k", "1": "g1", "2": "g2", "3": "g3", "4": "g4", "5": "g5", "6": "g6", "7": "g7", "8": "g8", "9": "hs"}
SUBJECTS = ["math", "language", "science", "social"]

# Where each subject's standards start and stop in a compilation. Sections end at the next subject's heading.
START = {
    "language": re.compile(r"^(Kindergarten|Grade \d+|Grade 9-10) English Language Arts \(ELA\) \(2012\)\s*$"),
    "science": re.compile(r"^(Kindergarten|Grade \d|Middle School|High School) Science( Science)?\s+\(2023\)\s*$"),
    "math": re.compile(r"^(Kindergarten|Grade \d|High School) Math \(2023\)\s*$"),
    "social": re.compile(r"^Grade (K-2|3-5|6-8|9-12) Social Studies\s+\(2014\+2018\)\s*$"),
}
STOP = re.compile(
    r"^((Kindergarten|Grade [\d-]+|Middle School|High School) (Science|Math|Social Studies|Career and Vocational)"
    r"( Education \(CTE\))?( Standards| Practices)\s*$|Grade 11-12 English Language Arts)"
)
CODE = {
    "language": r"(?:RL|RI|RF|W|SL|L)\.(?:K|\d|9-10)\.\d+(?:\.[a-z])?",
    "math": r"(?:K|\d)\.[A-Z]{1,3}\.\d+[a-z]?|[NAFGS]\.[A-Z]{1,3}\.\d+[a-z]?",
    "science": r"(?:K|\d|MS|HS|K-2|3-5)-(?:ETS|PS|LS|ESS)\d-\d+",
    "social": r"SS(?:2|5|8|12)\.\d+\.\d+(?:\.[a-z](?:\.[ivx]+)?)?",
}
KIND = {"language": "standard", "math": "standard", "science": "performance expectation", "social": "benchmark"}
FOOTER = re.compile(r"All Currently-Adopted .* Standards - Wyoming \| \d+\s*$")


def fail(msg):
    sys.exit(f"build_outcomes.py: {msg}")


def section(lines, subject):
    """The lines of one subject's standards in a compilation."""
    start = next((i for i, l in enumerate(lines) if START[subject].match(l.strip())), None)
    if start is None:
        return []
    end = next((i for i in range(start + 1, len(lines)) if STOP.match(lines[i].strip())), len(lines))
    return lines[start + 1 : end]


def entries(lines, subject):
    """(code, text) pairs: a code at the start of an indented line, its text running on in more-indented lines."""
    code_re = re.compile(rf"^(\s+)({CODE[subject]})\s+(\S.*)$")
    out = []
    current = None
    for raw in lines:
        if FOOTER.search(raw):
            continue
        m = code_re.match(raw)
        if m:
            current = [len(m.group(1)), m.group(2), m.group(3).strip()]
            out.append(current)
            continue
        if current and raw.strip() and len(raw) - len(raw.lstrip()) > current[0]:
            current[2] += " " + raw.strip()
        else:
            current = None
    return [(code, re.sub(r"\s+", " ", text)) for _, code, text in out]


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "source"
    out = OrderedDict()
    for g in GRADES:
        lines = (src / f"{FILES[g]}.txt").read_text().splitlines()
        for s in SUBJECTS:
            found = OrderedDict()
            for code, text in entries(section(lines, s), s):
                if code in found and found[code]["content"] != text:
                    fail(f"{g}/{s}: {code} has two texts")
                found[code] = {"idx": code, "kind": KIND[s], "content": text}
            if not found:
                fail(f"no standards for {g}/{s}")
            out[f"{g}/{s}"] = list(found.values())
    path = Path(__file__).parent / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print(f"Wrote {sum(len(e) for e in out.values())} entries to {path}")


if __name__ == "__main__":
    main()
