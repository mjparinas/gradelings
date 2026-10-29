"""Builds outcomes.json from Early Returns: Manitoba's Early Learning and Child Care Curriculum Framework for Preschool
Centres and Nursery Schools (source/early-returns.txt).

Early Returns has no outcomes. It bases curriculum on goals for children's social, emotional, physical and cognitive
development, and requires play choices in set areas ("dramatic; fine motor; large muscle; block and construction;
science, water and sand; and opportunities to explore music, art, literacy and numeracy"). A Pre-K unit cites the area
of development and the play area it practises, joined by "; ", for example "Cognitive development; Numeracy". This
script checks every one is in the source text and lists them under the subjects whose units may cite them.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

DEVELOPMENT = ["Social development", "Emotional development", "Physical development", "Cognitive development"]
PLAY = ["Dramatic", "Fine motor", "Large muscle", "Block and construction", "Science, water and sand", "Music", "Art", "Literacy", "Numeracy"]

# Which play areas each Pre-K subject draws on; every subject may cite every area of development.
SUBJECTS = {
    "math": ["Numeracy", "Block and construction"],
    "language": ["Literacy"],
    "science": ["Science, water and sand"],
    "social": ["Dramatic", "Science, water and sand"],
}


def flat(text: str) -> str:
    return re.sub(r"\s+", " ", text).lower()


def main(source: str) -> None:
    text = flat((Path(source) / "early-returns.txt").read_text(encoding="utf-8"))
    assert "goals for children’s social, emotional, physical and cognitive development" in text
    areas = "dramatic; fine motor; large muscle; block and construction; science, water and sand; and opportunities to explore music, art, literacy and numeracy"
    assert areas in text, "the list of play areas is not in the source"
    out = {}
    for subject, play in SUBJECTS.items():
        assert all(p in PLAY for p in play)
        out[f"pk/{subject}"] = [{"idx": d, "text": d} for d in DEVELOPMENT] + [{"idx": p, "text": f"play area: {p.lower()}"} for p in play]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} citations to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
