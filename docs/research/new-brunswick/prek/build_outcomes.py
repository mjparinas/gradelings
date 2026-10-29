"""Builds outcomes.json from the New Brunswick Curriculum Framework for Early Learning and Child Care, English (2008) (source/nb-curriculum-framework.txt).

The framework has four holistic play-based goals (Well-Being; Play and Playfulness; Communication and Literacies;
Diversity and Social Responsibility), each expanded into three facets with descriptors. It has no numbered outcomes, so
a Pre-K unit cites "Goal: Facet", for example "Play and Playfulness: Playful Exploration and Problem Solving". This
script checks every goal and facet is in the source text and lists them under the subjects whose units may cite them.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

GOALS = {
    "Well-Being": ["Emotional Health and Positive Identities", "Belonging", "Physical Health"],
    "Play and Playfulness": ["Imagination and Creativity", "Playful Exploration and Problem Solving", "Dizzy Play"],
    "Communication and Literacies": ["Communicative Practices", "Multimodal Literacies", "Literate Identities With/In Communities"],
    "Diversity and Social Responsibility": ["Inclusiveness and Equity", "Democratic Practices", "Sustainable Futures"],
}

# Which goals each Pre-K subject draws on.
SUBJECTS = {
    "math": ["Play and Playfulness", "Communication and Literacies"],
    "language": ["Communication and Literacies"],
    "science": ["Play and Playfulness", "Diversity and Social Responsibility", "Well-Being"],
    "social": ["Well-Being", "Diversity and Social Responsibility", "Communication and Literacies"],
}


def flat(text: str) -> str:
    return re.sub(r"\s+", " ", text).lower()


def main(source: str) -> None:
    text = flat((Path(source) / "nb-curriculum-framework.txt").read_text(encoding="utf-8"))
    out = {}
    for subject, goals in SUBJECTS.items():
        rows = []
        for goal in goals:
            assert flat(goal) in text, f"goal not in the source: {goal}"
            for facet in GOALS[goal]:
                assert flat(facet) in text, f"facet not in the source: {facet}"
                rows.append({"idx": f"{goal}: {facet}", "text": facet})
        out[f"pk/{subject}"] = rows
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} facet citations to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
