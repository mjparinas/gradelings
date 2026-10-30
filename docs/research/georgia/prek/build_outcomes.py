"""Builds outcomes.json from the Georgia Early Learning and Development Standards indicators for 48 to 60 months
(source/gelds-48-60-months.html, the PDF's word positions from pdftotext -bbox-layout).

Each GELDS indicator is coded by domain, standard, age band and letter; the 48 to 60 months band (Georgia's Pre-K year)
is ".4", for example "CD-MA2.4b" (Cognitive Development: Math, counts at least 10 objects one to one) or "CLL7.4a".
The indicators are a table with the code on the left and its text on the right, sometimes over several lines centred on
the code, so this script gives each line of the text column (which starts 110 to 130 points in; a short text
sometimes shares the code's line) to the code nearest
it on the page.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

# Domains: PDM Physical Development and Motor Skills, SED Social and Emotional Development, APL Approaches to Play and
# Learning, CLL Communication, Language and Literacy, CD-MA Math, CD-SS Social Studies, CD-SC Science, CD-CR Creative
# Development, CD-CP Cognitive Processes.
SUBJECTS = {
    "math": ["CD-MA"],
    "language": ["CLL"],
    "science": ["CD-SC"],
    "social": ["SED", "CD-SS", "APL", "CD-SC"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}
CODE = re.compile(r"^((?:CD-)?[A-Z]{2,3})\d+\.4[a-z]$")
TITLE = re.compile(r"\((CD-)?[A-Z]+\)( - Continued)?$")  # a domain's title at the top of a page
NS = "{http://www.w3.org/1999/xhtml}"


def main(source: str) -> None:
    root = ET.parse(Path(source) / "gelds-48-60-months.html").getroot()
    rows: dict[str, list[tuple[float, str]]] = {}
    for page in root.iter(f"{NS}page"):
        codes, texts = [], []
        for line in page.iter(f"{NS}line"):
            words = [w.text or "" for w in line.iter(f"{NS}word")]
            y = (float(line.get("yMin")) + float(line.get("yMax"))) / 2
            if CODE.match(words[0]):
                codes.append((y, words[0]))
                if len(words) > 1:
                    texts.append((y, " ".join(words[1:])))
            elif 105 <= float(line.get("xMin")) <= 140 and words[0] != "Standard" and not TITLE.search(" ".join(words)):
                texts.append((y, " ".join(words)))
        for y, text in texts:
            if not codes:
                continue
            code = min(codes, key=lambda c: abs(c[0] - y))[1]
            rows.setdefault(code, []).append((y, text))
    out_rows = {code: re.sub(r"\s+", " ", " ".join(t for _, t in sorted(parts))).strip() for code, parts in rows.items()}
    assert len(out_rows) > 100, f"only {len(out_rows)} indicators found"
    out = {}
    for subject, domains in SUBJECTS.items():
        out[f"pk/{subject}"] = [
            {"idx": code, "text": t} for code, t in out_rows.items() if CODE.match(code).group(1) in domains
        ]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} indicator citations ({len(out_rows)} indicators) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
