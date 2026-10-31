"""Builds outcomes.json from the Missouri Early Learning Standards, 2021 (source/mels-2021.txt, `pdftotext -layout` of the
Missouri Department of Elementary and Secondary Education's PDF).

Each content area has components (I, II, ...), standards (A, B, ...) and numbered indicators. A page repeats them above
what an infant, a toddler or a preschooler may do; Pre-K units cite the indicators on the preschooler pages, as the area
then component.standard.indicator, for example "Mathematics I.A.2" (explores quantity).

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

SUBJECTS = {
    "math": ["Mathematics"],
    "language": ["Language and Literacy"],
    "science": ["Science"],
    # Missouri's standards have no social studies area: family, feelings and getting along are social-emotional, and asking
    # for help and knowing time (community helpers, first and last) are under physical development (safety, senses).
    "social": ["Social-Emotional Development", "Approaches to Learning", "Physical Development"],
}
SHORT = {"Social-Emotional Development": "Social-Emotional"}  # the name used in citations
FOOTER = re.compile(r"^\s{20,}([A-Z][A-Za-z -]+?)\s{2,}\d+\s*$")
COMPONENT = re.compile(r"^\s*(I|II|III|IV|V|VI)\.\s+\S")
STANDARD = re.compile(r"^\s*([A-F])\.\s+\S")
INDICATOR = re.compile(r"^\s*(\d)\.\s+(.+?)\s*$")


def main(source: str) -> None:
    pages = (Path(source) / "mels-2021.txt").read_text(encoding="utf-8").split("\f")
    rows: dict[str, tuple[str, str]] = {}
    for page in pages:
        if "A preschooler may" not in page:
            continue
        lines = page.splitlines()
        area = next((m.group(1).strip() for line in lines if (m := FOOTER.match(line))), None)
        assert area, f"no area footer on page: {page[:80]!r}"
        component = standard = None
        for line in lines:
            if "may . . ." in line:
                break
            if m := COMPONENT.match(line):
                component = m.group(1)
            elif m := STANDARD.match(line):
                standard = m.group(1)
            elif m := INDICATOR.match(line):
                assert component and standard, f"indicator before its headings: {line!r}"
                code = f"{SHORT.get(area, area)} {component}.{standard}.{m.group(1)}"
                rows.setdefault(code, (area, m.group(2).rstrip(".")))
    assert len(rows) > 80, f"only {len(rows)} indicators found"
    out = {}
    for subject, areas in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": text} for code, (area, text) in rows.items() if area in areas]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} citations ({len(rows)} indicators) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
