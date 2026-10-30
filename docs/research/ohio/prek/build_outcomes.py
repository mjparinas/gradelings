"""Builds outcomes.json from Ohio's Early Learning and Development Standards, 2022 (source/*.json, the Common Standards
Project's copies of the state's document, birth to kindergarten entry).

Each standard is a progression numbered strand.standard.step from infancy, and the same numbers appear in every domain,
so Pre-K units cite a step with its domain, for example "Math 1.c.4" (names up to five without counting). The social
studies standards cover only people, communities and their environment, so the social units also cite
social-emotional and cognitive (memory and sequence) steps.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

FILES = ["math", "language", "science", "social", "social-emotional", "cognitive"]
BY = "set"  # what names a statement's domain: the set's title, its top heading or the heading under that (sub)
SUBJECTS = {
    "math": ["Mathematics"],
    "language": ["Language and Literacy"],
    "science": ["Science"],
    "social": ["Social Studies", "Social and Emotional Development", "Cognitive Development"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}
PREFIX = {"Mathematics": "Math ", "Language and Literacy": "Language ", "Science": "Science ", "Social Studies": "Social Studies ", "Social and Emotional Development": "Social-Emotional ", "Cognitive Development": "Cognitive "}  # added to codes that repeat from domain to domain
KEEP = re.compile(r"^\d+\.[a-z]\.\d+$")  # progression steps (strand.standard.step); Pre-K units cite the later steps
MIN = 30  # fewer statements than this means the source changed shape
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
            if BAND and BAND not in ancestors(data, item):
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
