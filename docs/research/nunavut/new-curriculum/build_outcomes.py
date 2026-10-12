"""Build outcomes.json from the Nunavut K-6 curriculum documents (2025).

The Department of Education's documents are PDFs on gov.nu.ca, which blocks automated downloads, so a person downloads them
and converts each to text (pdftotext). The text files are kept in ./source/:

    python3 docs/research/nunavut/new-curriculum/build_outcomes.py

It reads the "Learning Outcomes checklists" at the back of each document, which list every outcome by code
(for example K.N.1.1, 2.OC.2.3, 1.LS.1.2, 3.C.4), and writes outcomes.json next to this script.
"""

import json
import re
import sys
from pathlib import Path

SOURCES = {
    "math": ("mathematics-k6-2025.txt", "Nunavut Mathematics K–6 (2025)", {"N": "Number", "PR": "Patterns and Relations", "SS": "Shape and Space", "SP": "Statistics and Probability"}),
    "language": ("english-1st-language-k6-2025.txt", "Nunavut English Language Arts K–6 (2025)", {"OC": "Oral Communication", "R": "Reading", "W": "Writing and Representing"}),
    "science": ("science-k6-2025.txt", "Nunavut Science K–6 (2025)", {"MW": "The Material World", "P": "Physics", "ES": "Earth and Space", "LS": "Life Sciences"}),
    "social": ("social-studies-k6-2025.txt", "Nunavut Social Studies K–6 (2025)", {"C": "Communities", "S": "Stories", "L": "Land"}),
}

CODE = re.compile(r"^((K|[1-6])\.([A-Z]+)\.\d+(?:\.\d+)?)\s+(.*)$")
STOP = re.compile(r"(NOTES|LEARNING OUTCOMES|^Name:|checklists|Learning Outcomes:|^\d+\.\d+\s*$|^6\.\d+)")


def parse(path: Path, strands: dict) -> dict:
    lines = path.read_text(encoding="utf8").splitlines()
    first = next(i for i, l in enumerate(lines) if i > 200 and re.search(r"checklists: Kindergarten|CHECKLISTS: KINDERGARTEN", l))
    out: dict = {}
    current = None
    for raw in lines[max(0, first - 80):]:
        line = raw.strip()
        m = CODE.match(line)
        if m and m.group(3) in strands:
            grade = m.group(2).lower()
            current = {"code": m.group(1), "strand": strands[m.group(3)], "text": m.group(4)}
            out.setdefault(grade, {}).setdefault(m.group(1), current)
            continue
        if not line or STOP.search(line) or line in strands.values() or line == "Writing":
            current = None
            continue
        if current is not None:
            current["text"] += " " + line
    for grade in out.values():
        for o in grade.values():
            text = re.sub(r"\s*(\[[A-Za-z]+\]\s*)+$", "", o["text"])  # science process skill tags
            text = re.sub(r"\s+", " ", text).replace(" ,", ",").strip()
            o["text"] = text
    return {g: list(v.values()) for g, v in sorted(out.items(), key=lambda kv: "k0123456".index(kv[0]))}


def main() -> None:
    folder = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).with_name("source")
    result = {}
    for subject, (file, guide, strands) in SOURCES.items():
        result[subject] = {"guide": guide, "strands": list(strands.values()), "grades": parse(folder / file, strands)}
    out = Path(__file__).with_name("outcomes.json")
    out.write_text(json.dumps(result, ensure_ascii=False, indent=1) + "\n", encoding="utf8")
    for s, v in result.items():
        print(s, {g: len(os) for g, os in v["grades"].items()})


if __name__ == "__main__":
    main()
