"""Builds outcomes.json from the New York State Prekindergarten Learning Standards, 2019
(source/2019-prek-learning-standards.txt).

Each standard has a code of domain and number, such as "PK.MATH.6" or "PK.MATH.3a", sometimes followed by the code
of the full standards document in brackets ("[NY-PK.CC.5.]"). A Pre-K unit cites the PK code. This script reads each
standard where it is first stated at the start of a line, keeping the first line of its wording (the crosswalk tables later in the document repeat codes
inside columns) and lists them under the subjects whose units may cite them, by domain.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

# Domains: AL approaches to learning, PDH physical development and health, SEL social and emotional learning,
# AC communication, language and literacy, ELAL English language arts and literacy, MATH, SCI science, SOC social
# studies, ARTS the arts.
SUBJECTS = {
    "math": ["MATH"],
    "language": ["ELAL", "AC"],
    "science": ["SCI", "PDH"],
    "social": ["SOC", "SEL", "PDH"],
}


def main(source: str) -> None:
    text = (Path(source) / "2019-prek-learning-standards.txt").read_text(encoding="utf-8")
    rows: dict[str, str] = {}
    for line in text.splitlines():
        m = re.match(r"\s?PK\. ?([A-Z]+)\.(\d+[a-z]?)\.?\s+(?:\[[^\]]*\]\s*)?([A-Z].*)", line)
        if not m or m.group(3).startswith("Indicators"):
            continue
        code = f"PK.{m.group(1)}.{m.group(2)}"
        rows.setdefault(code, re.split(r"\s{3,}", m.group(3).strip())[0])
    assert len(rows) > 80, f"only {len(rows)} standards found"
    out = {}
    for subject, domains in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": t} for code, t in rows.items() if code.split(".")[1] in domains]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} standard citations ({len(rows)} standards) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
