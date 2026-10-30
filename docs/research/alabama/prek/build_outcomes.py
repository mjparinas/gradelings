"""Builds outcomes.json from the Alabama Standards for Early Learning and Development
(source/alabama-standards-early-learning-development.txt).

Each ASELD standard has a domain code and number ("MAT1b: Counting and Number Sense") and indicators for each age
group, numbered within the standard ("1bOP-3", where OP is older preschoolers, 48 to 60 months). Indicator numbers repeat
from domain to domain, so a Pre-K unit cites the domain and the older-preschooler indicator together, for example
"MAT.1bOP-3" (one-to-one correspondence when counting). This script reads every OP indicator in the standards section
(the text runs to the next blank line), places it under the nearest heading of its standard, and lists it under the
subjects whose units may cite it.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

# Domains: SED Social-Emotional Development, SST Social Studies, APL Approaches to Play and Learning, SEK Science,
# Engineering and Knowledge of Technology, MAT Mathematical Thinking, LLT Language and Literacy, CRA Creative Arts,
# PDH Physical Development and Health.
SUBJECTS = {
    "math": ["MAT"],
    "language": ["LLT"],
    "science": ["SEK"],
    "social": ["SED", "SST", "APL", "SEK"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}
HEADING = re.compile(r"^(SED|SST|APL|SEK|MAT|LLT|CRA|PDH)(\d[a-z]?): [^:]+: ")
INDICATOR = re.compile(r"^(\d[a-z]?)OP-(\d+) (.*)")


def main(source: str) -> None:
    lines = (Path(source) / "alabama-standards-early-learning-development.txt").read_text(encoding="utf-8").splitlines()
    headings = [(i, m.group(1), m.group(2)) for i, line in enumerate(lines) if (m := HEADING.match(line))]
    start = headings[0][0]
    rows: dict[str, str] = {}
    for i, line in enumerate(lines):
        m = INDICATOR.match(line)
        if not m or i < start:
            continue
        near = [h for h in headings if h[2] == m.group(1) and abs(h[0] - i) < 400]
        if not near:
            continue
        domain = min(near, key=lambda h: abs(h[0] - i))[1]
        parts = [m.group(3)]
        for nxt in lines[i + 1 :]:
            if not nxt.strip() or INDICATOR.match(nxt):
                break
            parts.append(nxt.strip())
        text = re.sub(r"\s+", " ", " ".join(parts)).strip()
        if domain in DOMAINS:
            rows.setdefault(f"{domain}.{m.group(1)}OP-{m.group(2)}", text)
    assert len(rows) > 80, f"only {len(rows)} indicators found"
    out = {}
    for subject, domains in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": t} for code, t in rows.items() if code.split(".")[0] in domains]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} indicator citations ({len(rows)} indicators) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
