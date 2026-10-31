"""Builds outcomes.json from the Rhode Island Early Learning and Development Standards, 2023 edition
(source/rields-2023-outline.txt, `pdftotext` of the outline on pages 12 and 13 of the PDF).

Each domain has standards ("M 1") and learning goals under them ("M 1.a"), each with indicators by age that end at
60 months. Pre-K units cite the learning goals, for example "M 1.a" (number recognition and counting).

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

SUBJECTS = {
    "math": ["M"],
    "language": ["LD", "L"],
    "science": ["S"],
    "social": ["SS", "SE"],
}
GOAL = re.compile(r"^(PH|SE|LD|L|CD|M|S|SS|CA) (\d)\.([a-z]):? ?(.*)$")
STOP = re.compile(r"^(PH|SE|LD|L|CD|M|S|SS|CA) ?\d[:.]|^[A-Z][A-Za-z ,&]+ \([A-Z]{1,2}\)$|^RI EARLY|^INTRODUCTION|^OUTLINE|^\d+$")


def main(source: str) -> None:
    lines = (Path(source) / "rields-2023-outline.txt").read_text(encoding="utf-8").splitlines()
    rows: dict[str, tuple[str, str]] = {}
    current = None
    for line in lines:
        line = line.replace("\a", "").strip()  # pdftotext marks the drop capitals with a bell character
        if m := GOAL.match(line):
            current = f"{m.group(1)} {m.group(2)}.{m.group(3)}"
            rows[current] = (m.group(1), m.group(4))
        elif current and line and not STOP.match(line):
            domain, text = rows[current]
            # pdftotext splits a drop capital from its word ("C" then " hildren"), so join it back without a space.
            joined = text + line if len(text) == 1 else f"{text} {line}"
            rows[current] = (domain, joined)
        else:
            current = None
    assert len(rows) > 30, f"only {len(rows)} learning goals found"
    out = {}
    for subject, domains in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": text} for code, (domain, text) in rows.items() if domain in domains]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} citations ({len(rows)} learning goals) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
