"""Builds outcomes.json from the 2022 Texas Prekindergarten Guidelines, PK4 (source/2022-texas-prekindergarten-guidelines-pk4.txt).

Every child behavior has a code such as "PK4.V.A.3" (age, domain, skill, behavior). A Pre-K unit cites those codes.
This script reads every coded behavior, joins its wrapped lines, and lists them under the subjects whose units may
cite them, by domain.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

# Domains: I Social and Emotional, II Language and Communication, III Reading, IV Writing, V Mathematics, VI Science,
# VII Social Studies, VIII Fine Arts, IX Physical Development and Health, X Technology.
SUBJECTS = {
    "math": ["V"],
    "language": ["II", "III"],
    "science": ["VI", "IX"],
    "social": ["I", "VII", "IX", "VI"],
}


def main(source: str) -> None:
    text = (Path(source) / "2022-texas-prekindergarten-guidelines-pk4.txt").read_text(encoding="utf-8")
    rows: dict[str, str] = {}
    current = None
    for line in text.splitlines():
        m = re.match(r"\s*•\s+(PK4\.[IVX]+\.[A-Z]\. ?\d+(?:\.[a-z])?)\s+(.+)", line)
        if m:
            current = m.group(1).replace(" ", "")  # the source has one stray space, "PK4.III.D. 1"
            rows.setdefault(current, m.group(2).strip())
            continue
        if current and re.match(r"\s{10,}\S", line) and not line.strip().startswith("•"):
            rows[current] += " " + line.strip()
        else:
            current = None
    assert len(rows) > 100, f"only {len(rows)} behaviors found"
    out = {}
    for subject, domains in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": t} for code, t in rows.items() if code.split(".")[1] in domains]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} behavior citations ({len(rows)} behaviors) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
