"""Builds outcomes.json from the Hawaiʻi Early Learning and Development Standards continuum
(source/hawaii-early-learning-development-standards.html, the PDF's line positions from pdftotext -bbox-layout).

HELDS is a table: a row per skill, a column per age band, and each cell ends with its code, "domain.band.letter". The
"48 months to kindergarten entry" column, Hawaiʻi's pre-K year, is band KE, for example "GK.KE.a" (count to 20 by ones)
or "SE.KE.c". A Pre-K unit cites the KE indicator. This script finds each KE code, reads its cell upward (the lines in
the same column directly above it) and lists it under the subjects whose units may cite it.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

# Domains: PHM Physical Well-being, Health and Motor Development; SE Social and Emotional Development; AL Approaches to
# Learning; LA Language and Literacy Development; GK Cognition and General Knowledge (math, science, social studies, arts).
SUBJECTS = {
    "math": ["GK"],
    "language": ["LA", "AL/LA"],
    "science": ["GK"],
    "social": ["SE", "GK", "AL", "PHM/GK"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}
CODE = re.compile(r"\(([A-Z]+(?:/[A-Z]+)?)\.KE\.([a-z]+)\)")
ANY_CODE = re.compile(r"\([A-Z/]+\.[0-9KE-]+\.[a-z]+\)|EMERGING")
NS = "{http://www.w3.org/1999/xhtml}"


def main(source: str) -> None:
    root = ET.parse(Path(source) / "hawaii-early-learning-development-standards.html").getroot()
    rows: dict[str, str] = {}
    for page in root.iter(f"{NS}page"):
        lines = []
        for line in page.iter(f"{NS}line"):
            text = " ".join(w.text or "" for w in line.iter(f"{NS}word"))
            lines.append((float(line.get("xMin")), float(line.get("yMin")), text))
        for x, y, text in lines:
            m = CODE.search(text)
            if not m:
                continue
            cell = [text[: m.start()]]
            top = y
            while True:
                above = [l for l in lines if abs(l[0] - x) < 2 and 0 < top - l[1] < 13]
                if not above or ANY_CODE.search(above[0][2]):
                    break
                cell.insert(0, above[0][2])
                top = above[0][1]
            code = f"{m.group(1)}.KE.{m.group(2)}"
            if m.group(1) in DOMAINS:
                rows.setdefault(code, re.sub(r"\s+", " ", " ".join(cell)).replace("- ", "-").strip())
    assert len(rows) > 50, f"only {len(rows)} indicators found"
    out = {}
    for subject, domains in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": t} for code, t in rows.items() if code.rsplit(".", 2)[0] in domains]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} indicator citations ({len(rows)} indicators) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
