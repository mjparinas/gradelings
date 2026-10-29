"""Builds outcomes.json from Nova Scotia's Early Learning Curriculum Framework (source/early-learning-curriculum-framework.txt).

The framework has four learning goals, each with numbered learning objectives ("Learning objectives supporting the
goal of ... include:"). A Pre-primary unit cites "Goal N", for example "Discovery and Invention 2". This script reads
every objective from the text and lists them under the subjects whose units may cite them.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

GOALS = ["Well-being", "Discovery and Invention", "Language and Communication", "Personal and Social Responsibility"]

# Which learning goals each Pre-K subject draws on. The framework is holistic, so a goal can serve several.
SUBJECTS = {
    "math": ["Discovery and Invention", "Language and Communication"],
    "language": ["Language and Communication"],
    "science": ["Discovery and Invention", "Personal and Social Responsibility", "Well-being"],
    "social": ["Well-being", "Personal and Social Responsibility"],
}


def objectives(text: str, goal: str) -> list[str]:
    start = text.index(f"Learning objectives supporting the goal of {goal.lower()} include:")
    block = text[start:].split("include:", 1)[1]
    items: list[str] = []
    for line in block.splitlines():
        m = re.match(r"\s+(\d)\. (.+)", line)
        if m:
            assert int(m.group(1)) == len(items) + 1, f"{goal}: objectives out of order"
            items.append(m.group(2).strip())
        elif items and re.match(r"\s{5,}\S", line):
            items[-1] += " " + line.strip()
        elif items and not line.strip():
            break
    assert items, f"no objectives found for {goal}"
    return items


def main(source: str) -> None:
    text = (Path(source) / "early-learning-curriculum-framework.txt").read_text(encoding="utf-8")
    found = {goal: objectives(text, goal) for goal in GOALS}
    out = {}
    for subject, goals in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": f"{goal} {i}", "text": t} for goal in goals for i, t in enumerate(found[goal], 1)]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} objective citations to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
