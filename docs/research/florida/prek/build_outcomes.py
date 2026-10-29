"""Builds outcomes.json from the Florida Early Learning and Developmental Standards for Four-Year-Olds to Kindergarten
(source/florida-early-learning-standards-4-to-k.txt).

The standards are grouped by domain (I to VIII), component (A, B, ...) and numbered standard. A Pre-K unit cites a
standard as "domain.component.standard", for example "V.A.1" (Mathematical Thinking, Number Sense, subitizing). This
script reads every numbered standard in the domains Pre-K units use (they have no sub-components) and lists them under
the subjects whose units may cite them.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

# Domains: II Approaches to Learning, III Social and Emotional Development, IV Language and Literacy, V Mathematical
# Thinking, VI Scientific Inquiry, VII Social Studies.
SUBJECTS = {
    "math": ["V"],
    "language": ["IV"],
    "science": ["VI"],
    "social": ["III", "VII", "VI"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}


def main(source: str) -> None:
    text = (Path(source) / "florida-early-learning-standards-4-to-k.txt").read_text(encoding="utf-8")
    rows: dict[str, str] = {}
    domain = component = None
    for line in text.splitlines():
        m = re.match(r"\s*([IVX]+)\. [A-Z ]+ DOMAIN", line)
        if m:
            domain, component = m.group(1), None
            continue
        m = re.match(r"\s{10,}([A-H])\. ([A-Z][A-Z ,]+)$", line)
        if m:
            component = m.group(1)
            continue
        m = re.match(r"\s?(\d+)\. (.+)", line)
        if m and domain in DOMAINS and component:
            rows.setdefault(f"{domain}.{component}.{m.group(1)}", re.sub(r"\s+", " ", m.group(2)).strip())
    assert len(rows) > 80, f"only {len(rows)} standards found"
    out = {}
    for subject, domains in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": t} for code, t in rows.items() if code.split(".")[0] in domains]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} standard citations ({len(rows)} standards) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
