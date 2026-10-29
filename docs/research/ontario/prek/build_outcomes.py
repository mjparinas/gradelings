"""Builds outcomes.json for Ontario Junior Kindergarten from ../expectations.json.

Ontario's Kindergarten Curriculum (2026) is one two-year program: Junior Kindergarten (the first year, Pre-K in the
app) and Kindergarten (the second) work on the same expectations. So a Junior Kindergarten unit cites the same
specific expectations as a Kindergarten unit, from the "k/all" entries that ../build_outcomes.py reads out of
../source/kindergarten-2026.json. This script lists them under the subjects whose units may cite them.

Usage: python3 -I build_outcomes.py
"""
import json
from pathlib import Path

HERE = Path(__file__).parent

# Which overall expectations each Pre-K subject draws on (the program is integrated, so some serve two subjects).
SUBJECTS = {
    "math": ["A6", "A7", "A8", "A9", "A10"],
    "language": ["A1", "A2", "A3", "A4"],
    "science": ["A10", "B12", "B13", "C16", "D23"],
    "social": ["B13", "C14", "C15", "C16", "D19", "D20", "D21", "D22", "D23"],
}


def main() -> None:
    rows = json.loads((HERE.parent / "expectations.json").read_text(encoding="utf-8"))["k/all"]
    out = {}
    for subject, overall in SUBJECTS.items():
        picked = [r for r in rows if r["kind"] == "specific" and r["idx"].split(".")[0] in overall]
        assert all(any(r["idx"] == o for r in rows) for o in overall), f"an overall expectation for {subject} is missing"
        out[f"pk/{subject}"] = [{"idx": r["idx"], "text": r["content"]} for r in picked]
    path = HERE / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} expectations to {path}")


if __name__ == "__main__":
    main()
