"""Builds outcomes.json from the Wisconsin Model Early Learning Standards, 4th edition (source/wmels-2013.txt,
`pdftotext -layout` of the PDF).

The standards have five domains (I to V), sub-domains (A, B, C) and performance standards numbered within each
sub-domain ("B.EL.1"), each followed by a developmental continuum from birth to first grade. Since the same number
appears in every domain, Pre-K units cite a performance standard with its domain, for example "V.B.EL.1" (numbers and
counting), as the Common Standards Project does.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

SUBJECTS = {
    "math": ["V.B"],
    "language": ["III.A", "III.B", "III.C"],
    "science": ["V.C", "V.A"],
    # The standards have no social studies domain: family, culture and getting along are social and emotional
    # development (II) and approaches to learning (IV.C, diversity in learning); time order and where things are
    # belong to mathematical thinking (V.B, measurement and spatial relationships).
    "social": ["II.A", "II.B", "II.C", "IV.C", "V.B"],
}
DOMAIN = re.compile(r"^\s*(I|II|III|IV|V)\.\s+[A-Z][A-Z ,]{8,}$")
STANDARD = re.compile(r"PERFORMANCE STANDARD:\s*([A-C])\.\s*EL\.\s*(\d+[a-z]?)\s+(.+?)(?:\s*\(continued\))?\s*$")


def main(source: str) -> None:
    rows: dict[str, tuple[str, str]] = {}
    domain = None
    for line in (Path(source) / "wmels-2013.txt").read_text(encoding="utf-8").splitlines():
        if m := DOMAIN.match(line):
            domain = m.group(1)
        elif (m := STANDARD.search(line)) and domain:
            sub = f"{domain}.{m.group(1)}"
            rows.setdefault(f"{sub}.EL.{m.group(2)}", (sub, " ".join(m.group(3).split())))
    assert len(rows) >= 45, f"only {len(rows)} performance standards found"
    out = {}
    for subject, subs in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": text} for code, (sub, text) in rows.items() if sub in subs]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} citations ({len(rows)} performance standards) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
