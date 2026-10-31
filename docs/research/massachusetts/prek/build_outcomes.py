"""Builds outcomes.json from the pre-K standards of the Massachusetts Curriculum Frameworks (mathematics and English
language arts 2017, science and technology/engineering 2016, history and social science 2018) and the social and
emotional development guidelines of the Guidelines for Preschool and Kindergarten Learning Experiences (2019)
(source/*.json, the Common Standards Project's copies).

Pre-K units cite the standards by their own codes (PK.CC.C.4, RF.P.2.a, PreK-LS1-2(MA), PreK.T4.1, SEL1). Social
studies also takes in the science standard about people's impact on the local environment (PreK-ESS3-2(MA)).

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

FILES = ["math", "ela", "ste", "hss", "sel"]
BY = "subject"  # what names a statement's domain: the set's title or subject, its top heading or the heading under that (sub)
SUBJECTS = {
    "math": ["Mathematics (2017-)"],
    "language": ["English Language Arts and Literacy (2017-)"],
    "science": ["Science and Technology/Engineering (2016-)"],
    "social": ["History and Social Science (2018-)", "Guidelines for Preschool and Kindergarten Learning Experiences (2019-)", "Science and Technology/Engineering (2016-)"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}
PREFIX = {}  # added to codes that repeat from domain to domain
KEEP = re.compile(r"^(PK\.|PreK|[A-Z]+\.P\.|SEL\d|APL \d)")  # pre-K standards and the social-emotional and approaches guidelines; the practice standards and headings are left out
MIN = 120  # fewer statements than this means the source changed shape
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
