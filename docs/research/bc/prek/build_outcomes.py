"""Builds outcomes.json from the BC Early Learning Framework (source/early-learning-framework.txt).

The framework has no numbered outcomes. It describes four living inquiries, each with pathways (Table 1, p. 65).
A Pre-K unit cites "Living inquiry: Pathway". This script checks every living inquiry and pathway is in the source
text, word for word apart from line breaks, and lists them under the subjects whose units may cite them.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

INQUIRIES = {
    "Well-being and belonging": [
        "Joy in relationships with people, place, materials, and ideas",
        "Culture and worldviews",
        "Indigenous voices and perspectives",
        "Diversity and difference",
        "Family composition and gender orientation",
        "Safety and respect",
        "Nourishment, sleep, and physical activity",
        "Emotions, thoughts, and views",
        "Every child is a gift",
        "Interests and inquiries",
    ],
    "Engagement with others, materials, and the world": [
        "Knowledge and theories",
        "Spaces, objects, and materials",
        "Reconnection to land and place",
        "Time for engagement",
        "Local community connections",
    ],
    "Communication and literacies": [
        "Multiple modes of communication",
        "Culture, family, traditions, and knowledge",
        "Language and communication",
        "Vocabulary, symbols, and written language",
        "Sound and word play",
        "Technology",
    ],
    "Identities, social responsibility, and diversity": [
        "Family origins, cultural background, place of origin, allegiance and affiliation, citizenship, and other identities",
        "Democratic practices",
        "Individual differences",
        "Social responsibility and justice",
        "Reconciliation with Indigenous peoples",
        "Interrelationship of humans and their natural environments",
    ],
}

# Which living inquiries each Pre-K subject draws on. The framework is holistic, so a pathway can serve several.
SUBJECTS = {
    "math": ["Engagement with others, materials, and the world", "Communication and literacies"],
    "language": ["Communication and literacies"],
    "science": ["Engagement with others, materials, and the world", "Identities, social responsibility, and diversity"],
    "social": ["Well-being and belonging", "Engagement with others, materials, and the world", "Identities, social responsibility, and diversity"],
}


def flat(text: str) -> str:
    return re.sub(r"\s+", " ", text).lower()


def main(source: str) -> None:
    text = flat((Path(source) / "early-learning-framework.txt").read_text(encoding="utf-8"))
    out = {}
    for subject, inquiries in SUBJECTS.items():
        rows = []
        for inquiry in inquiries:
            assert flat(inquiry) in text, f"living inquiry not in the source: {inquiry}"
            for pathway in INQUIRIES[inquiry]:
                assert flat(pathway) in text, f"pathway not in the source: {pathway}"
                rows.append({"idx": f"{inquiry}: {pathway}", "text": pathway})
        out[f"pk/{subject}"] = rows
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} pathway citations to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
