"""Builds outcomes.json from the Connecticut Early Learning and Development Standards
(source/ct-early-learning-development-standards.txt).

The CT ELDS give learning progressions by age band; each indicator is coded "domain.age.number". Pre-K units cite the
48 to 60 months band (the end of preschool), for example "M.60.2" (Mathematics, count up to 10 objects). This script
reads every 60-month indicator (the text runs to the next blank line) and lists it under the subjects whose units may
cite it. The document prints a few codes oddly ("SE 60.4", "L60.2", "LR.60.18" for C.60.18); they are normalised here.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

# Domains: C Cognition, SE Social and Emotional, PH Physical, L Language and Literacy, CA Creative Arts,
# M Mathematics, S Science, SS Social Studies. Patterns sit in Cognition (C), so math units may cite it too.
SUBJECTS = {
    "math": ["M", "C"],
    "language": ["L"],
    "science": ["S", "C"],
    "social": ["SE", "SS", "C"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}
CODE = re.compile(r"^(SE|PH|LR|L|CA|M|SS|S|C)\.? ?60\.? ?(\d+)\s+(.*)")


def main(source: str) -> None:
    lines = (Path(source) / "ct-early-learning-development-standards.txt").read_text(encoding="utf-8").splitlines()
    rows: dict[str, str] = {}
    for i, line in enumerate(lines):
        m = CODE.match(line)
        if not m:
            continue
        domain = "C" if m.group(1) == "LR" else m.group(1)
        parts = [m.group(3)]
        for nxt in lines[i + 1 :]:
            if not nxt.strip() or CODE.match(nxt):
                break
            parts.append(nxt.strip())
        text = re.sub(r"\s+", " ", " ".join(parts)).replace("- ", "-").strip()
        if domain in DOMAINS:
            rows.setdefault(f"{domain}.60.{m.group(2)}", text)
    assert len(rows) > 80, f"only {len(rows)} indicators found"
    out = {}
    for subject, domains in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": t} for code, t in rows.items() if code.split(".")[0] in domains]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} indicator citations ({len(rows)} indicators) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
