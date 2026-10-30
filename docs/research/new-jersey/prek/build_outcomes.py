"""Builds outcomes.json from the New Jersey Preschool Teaching and Learning Standards (2014)
(source/preschool-teaching-learning-standards.txt).

Each domain's preschool learning outcomes are numbered "domain.standard.outcome", for example "4.1.2" (Mathematics,
number and counting) or "0.5.4" (Social/Emotional Development, take turns). Language Arts Literacy follows the Common
Core's preschool codes, "RF.PK.2" with lettered parts cited as "RF.PK.2a" (rhyming words). A Pre-K unit cites the
outcome. This script reads each outcome (the text runs on below it to the next blank line, without the kindergarten
or K-12 code printed at the right) and lists it under the subjects whose units may cite it.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

# Domains: 0 Social/Emotional Development, 1 Visual and Performing Arts, 2 Health, Safety and Physical Education,
# 3 Language Arts Literacy (RL, RI, RF, W, SL, L), 4 Mathematics, 5 Science, 6 Social Studies, Family and Life Skills,
# 7 World Languages, 8 Technology, 9 21st Century Life and Careers.
SUBJECTS = {
    "math": ["4"],
    "language": ["RL", "RI", "RF", "W", "SL", "L"],
    "science": ["5"],
    "social": ["0", "6", "5"],
}
CODE = re.compile(r"^\s*((?:RL|RI|RF|W|SL|L)\.PK\.\d+|\d\.\d+\.\d+)(?:[.,][a-z,]+)?\s+(.*)")
PART = re.compile(r"^\s*([a-h])\)\s+(.*)")
RIGHT = re.compile(r"\s{3,}\S+$")  # the kindergarten or K-12 code in the right-hand column
ALIGNED = re.compile(r"\b(?:[A-Z]{1,2}\.)?K\.[A-Z]{0,3}\.?\d+[a-z,]*")  # the same code when it lands inside the text
SKIP = ("(Begins", "(Not applicable")


def clean(parts: list[str]) -> str:
    return re.sub(r"\s+", " ", ALIGNED.sub("", " ".join(parts))).strip()


def main(source: str) -> None:
    lines = (Path(source) / "preschool-teaching-learning-standards.txt").read_text(encoding="utf-8").splitlines()
    rows: dict[str, str] = {}
    for i, line in enumerate(lines):
        m = CODE.match(line)
        if not m:
            continue
        code, parts, part, part_text = m.group(1), [RIGHT.sub("", m.group(2))], None, []
        # A long outcome sometimes starts on the line above its code; the code's line then starts mid-sentence.
        above = lines[i - 1].strip()
        if not clean(parts)[:1].isupper() and above[:1].isupper() and not CODE.match(lines[i - 1]):
            parts.insert(0, RIGHT.sub("", above))
        rest = lines[i + 1 :]
        for j, nxt in enumerate(rest):
            if not nxt.strip() and j + 1 < len(rest) and PART.match(rest[j + 1]):
                continue  # a blank line before the lettered parts
            if not nxt.strip() or CODE.match(nxt):
                break
            p = PART.match(nxt)
            if p:
                if part and part_text and not part_text[0].startswith(SKIP):
                    rows.setdefault(code + part, clean(part_text))
                part, part_text = p.group(1), [RIGHT.sub("", p.group(2))]
            elif part:
                part_text.append(RIGHT.sub("", nxt.strip()))
            else:
                parts.append(RIGHT.sub("", nxt.strip()))
        if part and part_text and not part_text[0].startswith(SKIP):
            rows.setdefault(code + part, clean(part_text))
        text = clean(parts)
        if text and not text.startswith(SKIP):
            rows.setdefault(code, text)
    assert len(rows) > 150, f"only {len(rows)} outcomes found"
    out = {}
    for subject, domains in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": t} for code, t in rows.items() if code.split(".")[0] in domains]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} outcome citations ({len(rows)} outcomes) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
