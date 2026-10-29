"""Builds outcomes.json from the NWT Junior Kindergarten / Kindergarten Curriculum: A Holistic Approach to Children's
Early Learning (2017) (source/jk-kindergarten-curriculum.txt).

The curriculum has eleven General Competencies, each with numbered Integrated Curricular Outcomes ("11.4 Relate a
numeral, 1 to 10, to its respective quantity."). A Pre-K unit cites those numbers. This script reads every numbered
outcome, joins its wrapped lines, drops the source reference in brackets, and lists the outcomes under the subjects
whose units may cite them, by competency.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

# Competencies: 1 Sense of Identity, 2 Healthy Living, 3 Relationship with the Land, 4 Citizenship, 5 Self-Regulation,
# 6 Conversation and Communication, 7 Collaboration and Teamwork, 8 Creativity and Innovation, 9 Problem Solving and
# Decision-Making, 10 Applied Literacies: Reading and Writing, 11 Applied Literacies: Mathematics.
SUBJECTS = {
    "math": [9, 11],
    "language": [6, 10],
    "science": [2, 3, 5, 9],
    "social": [1, 2, 3, 4, 5, 7],
}


def main(source: str) -> None:
    text = (Path(source) / "jk-kindergarten-curriculum.txt").read_text(encoding="utf-8")
    start = re.search(r"^\s*1\.1\s+Understand that every person", text, re.M).start()
    rows: dict[str, str] = {}
    current = None
    for line in text[start:].splitlines():
        m = re.match(r"\s*(\d{1,2}\.\d{1,2})\s+(\S.*)", line)
        if m and 1 <= int(m.group(1).split(".")[0]) <= 11:
            current = m.group(1)
            rows.setdefault(current, m.group(2).strip())
            continue
        if current and re.match(r"\s+\S", line) and not line.strip().startswith("··"):
            rows[current] += " " + line.strip()
        else:
            current = None
    clean = {k: re.sub(r"\s*\([^()]*\)\s*$", "", re.sub(r"\s+", " ", v)).strip() for k, v in rows.items()}
    assert len(clean) > 150, f"only {len(clean)} outcomes found"
    out = {}
    for subject, competencies in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": k, "text": t} for k, t in clean.items() if int(k.split(".")[0]) in competencies]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} outcome citations ({len(clean)} outcomes) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
