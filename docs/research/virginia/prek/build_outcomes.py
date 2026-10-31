"""Builds outcomes.json from Virginia's Early Learning and Development Standards, 2021 (source/*.json, the Common
Standards Project's copies of the Virginia Department of Education's document).

Each standard lists indicators by age band, lettered on through the bands, for example "CD3.1k"; Pre-K units cite
the Later Preschool (44-60 months) indicators. Time words (before, after) are under
mathematics and caring for the natural world under science, so the social units can cite those too.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

FILES = ["language", "cognitive", "approaches", "social-emotional"]
BY = "top"  # what names a statement's domain: the set's title, its top heading or the heading under that (sub)
SUBJECTS = {
    "math": ["MATHEMATICS"],
    "language": ["COMMUNICATION", "FOUNDATIONS OF READING"],
    "science": ["SCIENCE: THE NATURAL AND PHYSICAL WORLD"],
    "social": ["Social Science: People, Community, and Culture", "POSITIVE SELF-CONCEPT", "EMOTIONAL COMPETENCE", "INTERACTING WITH OTHERS", "SCIENCE: THE NATURAL AND PHYSICAL WORLD", "MATHEMATICS"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}
PREFIX = {}  # added to codes that repeat from domain to domain
KEEP = re.compile(r"^[A-Z]+\d\.\d[a-z]+$")  # indicators (area, strand, standard, letter)
MIN = 40  # fewer statements than this means the source changed shape
BAND = r'Later Preschool 44-60 months'  # each standard lists indicators by age; Pre-K is the later preschool band


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
