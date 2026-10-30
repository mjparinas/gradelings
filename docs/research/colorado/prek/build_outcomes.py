"""Builds outcomes.json from the preschool expectations of the Colorado Academic Standards (source/*-pk.json, the
Common Standards Project's copies of CDE's documents).

The Colorado Academic Standards start at preschool. Pre-K units cite the preschool evidence outcomes and progress
indicators by their CDE codes, for example "P.CC.B.2" (Mathematics, recognize up to five objects without counting),
"PK.2.2.b" (Reading, Writing, and Communicating), "LS2.PK.1.f" (Science) or "PK.C.1.c" (Social Studies). This script
lists every coded statement in each file under the subjects whose units may cite it.

Usage: python3 -I build_outcomes.py source
"""
import json
import sys
from pathlib import Path

FILES = {
    "math": ["math"],
    "language": ["rwc"],
    "science": ["science"],
    "social": ["social", "science"],
}


def main(source: str) -> None:
    out = {}
    for subject, names in FILES.items():
        rows: dict[str, str] = {}
        for name in names:
            data = json.loads((Path(source) / f"{name}-pk.json").read_text(encoding="utf-8"))["data"]
            for item in sorted(data["standards"].values(), key=lambda x: x.get("position", 0)):
                code = (item.get("statementNotation") or "").strip()
                if code and not code.startswith(("MP", "PG.")):
                    rows.setdefault(code, " ".join(item["description"].split()))
        out[f"pk/{subject}"] = [{"idx": code, "text": t} for code, t in rows.items()]
    assert all(len(v) > 20 for v in out.values()), {k: len(v) for k, v in out.items()}
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} citations to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
