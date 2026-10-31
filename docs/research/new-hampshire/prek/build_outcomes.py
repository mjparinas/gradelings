"""Builds outcomes.json from New Hampshire's Early Learning Standards, Birth through Age Five (2016)
(source/*.json, the Common Standards Project's copies of the five domains).

Each domain numbers its indicators the same way (standard, then the age band 7 for four- and five-year-olds, then a
letter), so the same number appears in every domain; Pre-K units cite them with the domain, for example
"Numeracy 1.1.7b" (subitizing) or "Cognition 3.2.7d" (community occupations).

Social studies also takes in Time and Sequence (yesterday, today and tomorrow) for the first-next-last unit.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

FILES = ["language", "numeracy", "general-knowledge", "approaches", "social-emotional"]
BY = "top"  # what names a statement's domain: the set's title, its top heading or the heading under that (sub)
SUBJECTS = {
    "math": ["Number Operations", "Geometry and Spatial Sense", "Measurements", "Patterns and Relationships", "Data Collection and Analysis", "Time and Sequence"],
    "language": ["Listening Comprehension", "Non-verbal communication", "Communication Concepts", "Verbal Expressions", "Emergent Reading", "Emergent Writing"],
    "science": ["Exploring the Physical World", "Inquiry and Exploration", "Reasoning and Problem Solving"],
    "social": ["Exploring the Social World", "Exploring the Physical World", "Self-Concept and Social Identity", "Attachment", "Social Competence", "Emotional Competence", "Cooperative Learning", "Time and Sequence"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}
PREFIX = {"Number Operations": "Numeracy ", "Geometry and Spatial Sense": "Numeracy ", "Measurements": "Numeracy ", "Patterns and Relationships": "Numeracy ", "Data Collection and Analysis": "Numeracy ", "Time and Sequence": "Numeracy ", "Listening Comprehension": "Language ", "Non-verbal communication": "Language ", "Communication Concepts": "Language ", "Verbal Expressions": "Language ", "Emergent Reading": "Language ", "Emergent Writing": "Language ", "Key Concepts": "Cognition ", "Exploring the Physical World": "Cognition ", "Exploring the Social World": "Cognition ", "Inquiry and Exploration": "Approaches ", "Reasoning and Problem Solving": "Approaches ", "Cooperative Learning": "Approaches ", "Self-Concept and Social Identity": "Social-Emotional ", "Attachment": "Social-Emotional ", "Social Competence": "Social-Emotional ", "Emotional Competence": "Social-Emotional "}  # added to codes that repeat from domain to domain
KEEP = re.compile(r"\.7[a-z]?$")  # indicators for four- and five-year-olds (the .7 indicators); the younger age bands are left out
MIN = 60  # fewer statements than this means the source changed shape
BAND = None  # no age band to pick


def domain_of(data: dict, item: dict, by: str) -> str:
    if by == "set":
        return " ".join(data["title"].split())
    chain = [item]
    while chain[-1].get("parentId") in data["standards"]:
        chain.append(data["standards"][chain[-1]["parentId"]])
    top = chain[-1] if by == "top" else chain[-2]  # "sub": the heading just under the top one
    return " ".join(top["description"].split())


def ancestors(data: dict, item: dict) -> list[str]:
    out = []
    while item.get("parentId") in data["standards"]:
        item = data["standards"][item["parentId"]]
        out.append(" ".join(item["description"].split()))
    return out


def main(source: str) -> None:
    rows: dict[str, tuple[str, str]] = {}
    for name in FILES:
        data = json.loads((Path(source) / f"{name}.json").read_text(encoding="utf-8"))["data"]
        for item in sorted(data["standards"].values(), key=lambda x: x.get("position", 0)):
            code = " ".join((item.get("statementNotation") or "").split()).rstrip(":")
            if not code or not KEEP.search(code):
                continue
            if BAND and not any(re.fullmatch(BAND, a) for a in ancestors(data, item)):
                continue
            domain = domain_of(data, item, BY)
            if domain not in DOMAINS:
                continue
            text = re.sub(r"<[^>]+>", " ", item["description"])
            rows.setdefault(PREFIX.get(domain, "") + code, (domain, " ".join(text.split())))
    assert len(rows) >= MIN, f"only {len(rows)} statements found"
    out = {}
    for subject, domains in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": t} for code, (d, t) in rows.items() if d in domains]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} citations ({len(rows)} statements) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
