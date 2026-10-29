"""Builds outcomes.json from the California Preschool/Transitional Kindergarten Learning Foundations, At-a-Glance
(source/ptklf-at-a-glance.txt).

Each domain lists numbered foundations ("Foundation 1.3 Cardinality"). A Transitional Kindergarten unit cites
"<domain> <number>", for example "Mathematics 1.3". This script reads every foundation under each domain heading and
lists them under the subjects whose units may cite them.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

DOMAINS = [
    "Approaches to Learning",
    "Social and Emotional Development",
    "Foundational Language Development",
    "English Language Development",
    "Mathematics",
    "Science",
    "Physical Development",
    "Health",
    "History–Social Science",
    "Visual and Performing Arts",
]

# Which domains each Pre-K subject draws on.
SUBJECTS = {
    "math": ["Mathematics"],
    "language": ["Foundational Language Development"],
    "science": ["Science", "Health"],
    "social": ["History–Social Science", "Social and Emotional Development", "Health"],
}


def main(source: str) -> None:
    text = (Path(source) / "ptklf-at-a-glance.txt").read_text(encoding="utf-8")
    found: dict[str, list[tuple[str, str]]] = {}
    domain = None
    for line in text.splitlines():
        if line.strip() in DOMAINS and not line.startswith(" "):
            domain = line.strip()
            found.setdefault(domain, [])
            continue
        m = re.match(r"\s*Foundation (\d+\.\d+) (.+)", line)
        if m and domain:
            found[domain].append((m.group(1), m.group(2).rstrip("* ").strip()))
    for d in DOMAINS:
        assert found.get(d), f"no foundations found for {d}"
    out = {f"pk/{s}": [{"idx": f"{d} {code}", "text": title} for d in ds for code, title in found[d]] for s, ds in SUBJECTS.items()}
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} foundation citations to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
