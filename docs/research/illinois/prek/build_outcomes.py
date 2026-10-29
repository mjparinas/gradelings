"""Builds outcomes.json from the Illinois Early Learning and Development Standards
(source/illinois-early-learning-development-standards.txt).

The IELDS follow the K-12 Illinois Learning Standards' goals (1 to 32) and lettered standards, with preschool
benchmarks coded "goal.standard.EC" plus a letter, for example "6.A.ECb" (subitizing) or "30.A.ECa". A Pre-K unit cites
the benchmark. This script reads every preschool benchmark (the text runs on at the same indent to the next blank line)
and lists it under the subjects whose units may cite it.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

# Goals: 1 to 5 Language Arts, 6 to 10 Mathematics, 11 to 13 Science, 14 to 18 Social Science, 19 to 24 Physical
# Development and Health, 25 and 26 Fine Arts, 27 to 29 English Language Learners, 30 to 32 Social/Emotional Development.
SUBJECTS = {
    "math": range(6, 11),
    "language": range(1, 6),
    "science": range(11, 14),
    "social": [*range(14, 19), 30, 31, 32, 12],
}
CODE = re.compile(r"^(\s*)((\d+)\.[A-Z]\.EC[a-z])\s+(.*)")
PAGE = re.compile(r"\s{3,}\d+$")  # a page number at the end of a line


def main(source: str) -> None:
    lines = (Path(source) / "illinois-early-learning-development-standards.txt").read_text(encoding="utf-8").splitlines()
    rows: dict[str, tuple[int, str]] = {}
    for i, line in enumerate(lines):
        m = CODE.match(line)
        if not m:
            continue
        indent = len(line) - len(m.group(4))
        parts = [PAGE.sub("", m.group(4))]
        for nxt in lines[i + 1 :]:
            if not nxt.strip() or CODE.match(nxt) or len(nxt) - len(nxt.lstrip()) != indent:
                break
            parts.append(PAGE.sub("", nxt.strip()))
        rows.setdefault(m.group(2), (int(m.group(3)), re.sub(r"\s+", " ", " ".join(parts)).strip()))
    assert len(rows) > 150, f"only {len(rows)} benchmarks found"
    out = {}
    for subject, goals in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": t} for code, (goal, t) in rows.items() if goal in goals]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} benchmark citations ({len(rows)} benchmarks) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
