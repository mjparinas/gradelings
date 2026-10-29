"""Builds outcomes.json from Essential Learning Experiences for Three-, Four- and Five-Year-Olds (Saskatchewan Ministry
of Education, Early Years Branch) (source/essential-learning-experiences.txt).

The booklet sets out essential learning experiences in four domains of holistic learning (social emotional, physical,
spiritual and intellectual, with language and emerging literacy inside intellectual). A Pre-K unit cites
"Domain: Experience", for example "Intellectual: Exploring Numeracy". This script checks every experience is in the
source text and lists them under the subjects whose units may cite them.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

DOMAINS = {
    "Social Emotional": [
        "Developing Self-Awareness", "Developing Self-Worth", "Developing a Sense of Belonging", "Separating from Family Without Distress",
        "Identifying and Regulating Emotions", "Interacting with Others", "Taking the Perspective of Others and Showing Empathy", "Resolving Conflicts",
    ],
    "Physical": [
        "Developing Loco-motor Skills", "Developing Fine Motor Skills", "Developing Stability/Balance", "Developing Manipulative Skills",
        "Developing Space and Body Awareness", "Developing Healthy Habits",
    ],
    "Spiritual": [
        "Experiencing a Sense of Wonder, Awe, and Joy", "Experiencing Heightened Sensory Awareness",
        "Developing an Appreciation of Beauty and Connection to the Natural and Man-Made World",
    ],
    "Intellectual": [
        "Solving Problems", "Creating and Imagining", "Recognizing Attributes and Characteristics", "Exploring Numeracy", "Exploring Time",
        "Exploring Position and Direction",
    ],
    "Language and Emerging Literacy": [
        "Listening with Interest and Engagement During Brief Experiences with Spoken Language", "Engaging in Conversation", "Exploring Words",
        "Gaining Meaning From a Variety of Visual Formats and Text Materials", "Representing Ideas Using Expressive Forms", "Exploring How Print Works",
    ],
}

# Which domains each Pre-K subject draws on.
SUBJECTS = {
    "math": ["Intellectual"],
    "language": ["Language and Emerging Literacy"],
    "science": ["Intellectual", "Spiritual"],
    "social": ["Social Emotional", "Physical", "Intellectual", "Spiritual"],
}


def flat(text: str) -> str:
    return re.sub(r"\s+", " ", text).lower()


def main(source: str) -> None:
    text = flat((Path(source) / "essential-learning-experiences.txt").read_text(encoding="utf-8"))
    out = {}
    for subject, domains in SUBJECTS.items():
        rows = []
        for domain in domains:
            assert flat(domain) in text, f"domain not in the source: {domain}"
            for experience in DOMAINS[domain]:
                assert flat(experience) in text, f"experience not in the source: {experience}"
                rows.append({"idx": f"{domain}: {experience}", "text": experience})
        out[f"pk/{subject}"] = rows
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} experience citations to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
