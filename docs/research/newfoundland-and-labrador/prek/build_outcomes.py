"""Builds outcomes.json from Navigating the Early Years: An Early Childhood Learning Framework (Newfoundland and
Labrador, 2019) (source/early-learning-framework.txt).

The framework has four goals for early childhood learning, each split into three numbered categories ("2.1 Language
Development"). It has no outcomes, so a Pre-K unit cites the category's number, for example "2.1". This script checks
every numbered category heading is in the source text and lists the categories under the subjects whose units may cite
them.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

CATEGORIES = {
    "1.1": "Physical Well-Being", "1.2": "Emotional Well-Being", "1.3": "Belonging",
    "2.1": "Language Development", "2.2": "Creative Expression", "2.3": "Cultural Connection",
    "3.1": "Investigation and Thinking", "3.2": "Creativity", "3.3": "A Positive Attitude Towards Learning",
    "4.1": "Equality", "4.2": "Diversity", "4.3": "Social Responsibility",
}

# Which goals (by number) each Pre-K subject draws on.
SUBJECTS = {"math": ["2", "3"], "language": ["2"], "science": ["3", "1"], "social": ["1", "4", "2"]}


def main(source: str) -> None:
    text = (Path(source) / "early-learning-framework.txt").read_text(encoding="utf-8")
    for number, name in CATEGORIES.items():
        assert re.search(rf"^\f?{re.escape(number)}\s+{re.escape(name)}\s*$", text, re.M | re.I), f"heading not in the source: {number} {name}"
    out = {}
    for subject, goals in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": n, "text": name} for n, name in CATEGORIES.items() if n.split(".")[0] in goals]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} category citations to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
