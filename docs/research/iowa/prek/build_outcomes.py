"""Builds outcomes.json from the Iowa Early Learning Standards, 4th edition, June 2026 (source/*.json, the Common Standards Project's
copies of the state's document).

Each standard lists indicators by age band, lettered on through the bands, for example "7.2.X" (instantly recognizes
collections up to five); Pre-K units cite the indicators for about 4 to 5 years.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

FILES = ["math", "language", "science", "social", "emotional"]
BY = "set"  # what names a statement's domain: the set's title, its top heading or the heading under that (sub)
SUBJECTS = {
    "math": ["Area 7: Mathematics"],
    "language": ["Area 6: Communication, Language and Emergent Literacy"],
    "science": ["Area 8: Science"],
    "social": ["Area 4: Social Development and Social Studies", "Area 1: Emotional Wellbeing and Relationship Development"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}
PREFIX = {}  # added to codes that repeat from domain to domain
KEEP = re.compile(r"^\d\.\d+\.[A-Z]+(\.[a-z])?$")  # indicators and their lettered parts
MIN = 40  # fewer statements than this means the source changed shape
BAND = 'Approximately 4-5 years'  # each standard lists indicators by age; Pre-K is the year from four to five


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
