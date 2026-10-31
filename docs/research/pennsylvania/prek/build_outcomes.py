"""Builds outcomes.json from the Pennsylvania Learning Standards for Early Childhood, Pre-Kindergarten (2024)
(source/*.json, the Common Standards Project's copies of the mathematics, language and literacy, science, social
studies and social and emotional development standards; the social studies file is titled "Scientific Thinking" in
the Common Standards Project, but its statements are the 5.1 to 8.1 social studies standards).

Pre-K units cite the standards by their own codes, which start with the standard area ("2.1 PK.A.2.1", "16.1 PK.A.1").
Social studies also takes in social and emotional development and the environmental literacy standards (3.4) for
caring for our world.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

FILES = ["math", "language", "science", "social-studies", "social-emotional"]
BY = "top"  # what names a statement's domain: the set's title or subject, its top heading or the heading under that (sub)
SUBJECTS = {
    "math": ["Numbers and Operations", "Algebraic Concepts", "Geometry", "Measurement, Data, and Probability"],
    "language": ["Foundational Skills", "Reading Informational Text", "Reading Literature", "Writing", "Speaking and Listening"],
    "science": ["Life Science", "Physical Science", "Earth and Space Science", "Environmental Literacy and Sustainability", "Technology and Engineering"],
    "social": ["Civics and Government", "PRINCIPLES AND DOCUMENTS OF GOVERNMENT", "RIGHTS AND RESPONSIBILITIES OF CITIZENSHIP", "HOW GOVERNMENT WORKS", "Economics", "SCARCITY AND CHOICE", "MARKETS AND ECONOMIC SYSTEMS", "FUNCTIONS OF GOVERNMENT", "INCOME, PROFIT, AND WEALTH", "Geography", "BASIC GEOGRAPHIC LITERACY", "PHYSICAL CHARACTERISTICS OF PLACES AND REGIONS", "History", "HISTORICAL ANALYSIS AND SKILLS DEVELOPMENT", "Self-Awareness and Self-Management", "Establishing and Maintaining Relationships", "Decision-Making and Responsible Behavior", "Environmental Literacy and Sustainability"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}
PREFIX = {}  # added to codes that repeat from domain to domain
KEEP = re.compile(r"^\d+\.\d PK\.[A-Z]+(\.\d+)+$")  # the pre-K standards and the indicators under them ("2.1 PK.A.2.1"); headings are left out
MIN = 300  # fewer statements than this means the source changed shape
BAND = None  # no age band to pick


def domain_of(data: dict, item: dict, by: str) -> str:
    if by == "set":
        return " ".join(data["title"].split())
    if by == "subject":  # the set's subject, where several sets share one title
        return " ".join(data["subject"].split())
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
