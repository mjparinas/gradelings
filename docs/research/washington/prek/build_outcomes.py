"""Builds outcomes.json from the Washington State Early Learning and Development Guidelines
(source/early-learning-and-development-guidelines.txt).

The guidelines have no codes. For each age they describe six areas of development, each split into topics with
"Children may . . ." lists. A Pre-K unit cites "Area: Topic" from the Ages 4 to 5 Years section, for example
"Learning about my world: Math". This script checks every area and topic heading is in that section of the source text
and lists them under the subjects whose units may cite them.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

AREAS = {
    "About me and my family and culture": ["Family and culture", "Self concept", "Self management", "Learning to learn"],
    "Building relationships": ["Interactions with adults", "Interactions with peers", "Social behaviors"],
    "Touching, seeing, hearing and moving around": ["Using the senses (sensorimotor skills)"],
    "Growing up healthy": ["Daily living skills (personal health and hygiene)", "Nutrition and health", "Safety"],
    "Communicating (literacy)": ["Speaking and listening (language development)", "Reading", "Writing"],
    "Learning about my world": ["Knowledge (cognition)", "Math", "Science", "Social Studies"],
}

# Which areas each Pre-K subject draws on.
SUBJECTS = {
    "math": ["Learning about my world"],
    "language": ["Communicating (literacy)"],
    "science": ["Learning about my world", "Touching, seeing, hearing and moving around", "Growing up healthy"],
    "social": ["About me and my family and culture", "Building relationships", "Growing up healthy", "Learning about my world"],
}


def flat(text: str) -> str:
    return re.sub(r"\s+", " ", text).lower()


def main(source: str) -> None:
    text = (Path(source) / "early-learning-and-development-guidelines.txt").read_text(encoding="utf-8")
    # The Ages 4 to 5 Years section runs from its "About me" heading to the "Age 5 and Kindergarten" section.
    start = re.search(r"^Ages 4 to 5\s*$", text, re.M).start()
    end = text.index("WASHINGTON KINDERGARTEN", start)
    section = flat(text[start:end])
    out = {}
    for subject, areas in SUBJECTS.items():
        rows = []
        for area in areas:
            assert flat(area.split(" (")[0]) in section, f"area not in the Ages 4 to 5 section: {area}"
            for topic in AREAS[area]:
                assert flat(topic) in section, f"topic not in the Ages 4 to 5 section: {topic}"
                rows.append({"idx": f"{area}: {topic}", "text": topic})
        out[f"pk/{subject}"] = rows
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} topic citations to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
