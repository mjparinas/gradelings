#!/usr/bin/env python3
"""Builds outcomes.json from PEI Specific Curriculum Outcomes Framework PDFs in source/.

Usage: python3 -I build_outcomes.py > outcomes.json

Needs pdftotext (poppler). Writes {"<grade>/<subject>": [{"idx", "kind", "content"}]}.

Citation plan (what a future ca-pe unit would put in standards):
- Mathematics Grades 1 to 9: WNCP-style codes (N1, PR2, SS3, SP1).
- Kindergarten math: Early Numeracy SCO numbers (1.1, 2.1, 3.1, 4.1).
- Language: English Language Arts / Early Literacy SCO numbers (1.1, 4.5, 10.2).
  Where Emergent and Early both list the same number, Early is kept.
- Science Kindergarten to Grade 3: local labels (SP-1, LS-1, PS-1, ESS-1).
- Science Grades 4 to 9: pan-Canadian Common Framework codes in parentheses (104-6, 308-1).
- Social studies: unit SCO codes (1.1.1, 7.3.2).
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SOURCE = HERE / "source"
TEXT = HERE / "text"
GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
out: dict[str, list[dict]] = {}


def clean(s: str) -> str:
    s = s.replace("\u200b", "").replace("ﬁ", "fi").replace("ﬂ", "fl")
    s = s.replace("–", "-").replace("—", "-")
    return re.sub(r"\s+", " ", s).strip()


def add(grade: str, subject: str, idx: str, kind: str, content: str, *, replace: bool = False) -> None:
    idx, content = clean(idx), clean(content)
    if not idx or not content or len(content) < 3:
        return
    lst = out.setdefault(f"{grade}/{subject}", [])
    for row in lst:
        if row["idx"] == idx:
            if replace and len(content) >= len(row["content"]):
                row["content"] = content
            return
    lst.append({"idx": idx, "kind": kind, "content": content})


def pdf_text(name: str) -> str:
    """Return layout text for a source PDF, caching under text/."""
    TEXT.mkdir(exist_ok=True)
    txt = TEXT / f"{name}.txt"
    pdf = SOURCE / f"{name}.pdf"
    if not txt.exists() or (pdf.exists() and pdf.stat().st_mtime > txt.stat().st_mtime):
        subprocess.run(["pdftotext", "-layout", str(pdf), str(txt)], check=True)
    return txt.read_text(encoding="utf8", errors="replace")


def section(text: str, title: str, end_titles: list[str]) -> str:
    """Return the body of a subject chapter, skipping the table of contents.

    Framework PDFs put a dotted TOC line early ("Mathematics .....12") and the real
    chapter later under a page banner (MATHEMATICS) plus a title line (sometimes with
    a theme on the same line, e.g. "Social Studies  Empowerment") followed by
    "General Curriculum".
    """
    title_line = rf"(?m)^(?:{re.escape(title)})\b[^\n]*$"
    real = list(
        re.finditer(
            rf"(?ims)(?:^|\f)\s*{re.escape(title.upper())}\s*\n.*?{title_line}\n\s*General Curriculum",
            text,
        )
    )
    if not real:
        real = list(re.finditer(rf"(?i){title_line}\n\s*General Curriculum", text))
    if real:
        start = real[-1].start()
    else:
        hits = list(re.finditer(rf"(?i){title_line}", text))
        if not hits:
            return ""
        start = hits[-1].start()
    rest = text[start:]
    ends = []
    for et in end_titles:
        et_line = rf"(?m)^(?:{re.escape(et)})\b[^\n]*$"
        for m2 in re.finditer(
            rf"(?ims)(?:^|\f)\s*{re.escape(et.upper())}\s*\n.*?{et_line}\n\s*General Curriculum",
            rest,
        ):
            if m2.start() > 80:
                ends.append(m2.start())
                break
        else:
            for m2 in re.finditer(rf"(?i){et_line}\n\s*General Curriculum", rest):
                if m2.start() > 80:
                    ends.append(m2.start())
                    break
    return rest[: min(ends)] if ends else rest


def sco_blocks(body: str, code_re: str) -> list[tuple[str, str]]:
    """Split a chapter into (code, wording) pairs using SCO codes as boundaries."""
    starts = list(re.finditer(code_re, body))
    rows = []
    for i, m in enumerate(starts):
        chunk = body[m.end() : starts[i + 1].start() if i + 1 < len(starts) else len(body)]
        # Keep the first paragraph-ish of wording; drop pure left-column GCO noise later.
        lines = []
        for line in chunk.splitlines():
            s = line.strip()
            if not s:
                if lines:
                    break
                continue
            if s.startswith("PEI SPECIFIC") or s.startswith("General Curriculum") or s == "Outcomes":
                continue
            if re.match(r"^GCO\b", s) or re.match(r"^Unit\s+(One|Two|Three|Four|Five|Six|Seven|Eight)\b", s):
                if lines:
                    break
                continue
            if s.startswith("Students will be expected to"):
                continue
            lines.append(s)
            if len(lines) >= 8:
                break
        rows.append((m.group(1), " ".join(lines)))
    return rows


def split_grades_7_9(text: str) -> dict[str, str]:
    """Split the combined Grades 7-9 framework into per-grade blobs."""
    parts: dict[str, str] = {}
    # Page headers look like "PEI SPECIFIC CURRICULUM OUTCOMES FRAMEWORK: GRADE 7"
    marks = list(re.finditer(r"PEI SPECIFIC CURRICULUM OUTCOMES FRAMEWORK:\s*GRADE\s*([789])\b", text))
    for i, m in enumerate(marks):
        g = m.group(1)
        # Skip tiny TOC-adjacent headers; keep growing slices per grade.
        end = len(text)
        for m2 in marks[i + 1 :]:
            if m2.group(1) != g:
                end = m2.start()
                break
        chunk = text[m.start() : end]
        if len(chunk) > len(parts.get(g, "")):
            parts[g] = chunk
    return parts


def parse_math(grade: str, blob: str) -> None:
    if grade == "k":
        body = section(blob, "Early Numeracy", ["Health and Physical Development", "Physical Education", "Science"])
        for idx, content in sco_blocks(body, r"(?m)^\s*(\d+\.\d+)\s+"):
            add(grade, "math", idx, "specific", content)
        return

    body = section(blob, "Mathematics", ["Health", "Science", "Social Studies", "Music", "Physical Education"])
    # Right-column codes; allow a single space (some grades use "PR1 Demonstrate").
    for idx, content in sco_blocks(body, r"(?<![A-Za-z])((?:N|PR|SS|SP)\d{1,2})\s+"):
        if content.lower().startswith("gco") or content.lower().startswith("students will"):
            continue
        # Drop leaked left-column strand labels glued to the wording.
        content = re.sub(
            r"\b(?:Number|Patterns and Relations|Shape and Space|Statistics and Probability)\s*\([^)]+\)\s*",
            "",
            content,
        )
        add(grade, "math", idx, "specific", content)


def parse_language(grade: str, blob: str) -> None:
    if grade == "k":
        body = section(blob, "Early Literacy", ["Early Numeracy"])
    else:
        body = section(
            blob,
            "English Language Arts",
            ["Health", "Home Economics", "Mathematics", "Music", "Science", "Social Studies"],
        )
    # Later duplicates (often the Early continuum) replace earlier Emergent ones.
    for idx, content in sco_blocks(body, r"(?m)^\s*(\d{1,2}\.\d+)\s+"):
        if content.lower().startswith("gco") or content.lower().startswith("students will"):
            continue
        add(grade, "language", idx, "specific", content, replace=True)


def parse_science(grade: str, blob: str) -> None:
    body = section(
        blob,
        "Science",
        ["Social Studies", "Visual Arts", "Music", "Physical Education", "Communication and Information Technology"],
    )
    if not body:
        return
    # Kindergarten uses plain 1.1 / 1.2 under Exploring the World Using Our Senses.
    if grade == "k":
        for idx, content in sco_blocks(body, r"(?m)^\s*(\d+\.\d+)\s+"):
            add(grade, "science", idx, "specific", content)
        return
    # Grades 1-3 style local labels: SP-1, LS-1, PS-1, ESS-1
    for idx, content in sco_blocks(body, r"\b((?:SP|LS|PS|ESS)-\d+)\s+"):
        add(grade, "science", idx, "specific", content)
    # Grades 4-9: pan-Canadian codes in parentheses, often several per bullet.
    # Walk the body as a single line-stream and attach each code to the nearest
    # leading bullet fragment (text after the previous code / bullet).
    flat = re.sub(r"[ \t]+", " ", body)
    for m in re.finditer(
        r"(?:•|-)\s*([^•\n]{0,500}?)\((\d{3}-\d{1,2}(?:\s*,\s*\d{3}-\d{1,2})*)\)|"
        r"([A-Za-z][^()\n]{8,300}?)\((\d{3}-\d{1,2}(?:\s*,\s*\d{3}-\d{1,2})*)\)",
        flat,
    ):
        if m.group(1) is not None:
            content, codes = m.group(1), m.group(2)
        else:
            content, codes = m.group(3), m.group(4)
        content = clean(content)
        content = re.sub(r"^(Students will be expected to)\s*", "", content, flags=re.I)
        # Drop left-column GCO blurbs that dominate short false matches.
        if re.search(r"\bGCO\b|understanding of the nature of science|General Curriculum", content):
            # Prefer the clause after the last sentence break if possible.
            parts = re.split(r"(?<=[.:;])\s+", content)
            content = parts[-1] if parts else content
            if re.search(r"\bGCO\b|understanding of the nature of science", content):
                continue
        for code in re.findall(r"\d{3}-\d{1,2}", codes):
            add(grade, "science", code, "specific", content)


def parse_social(grade: str, blob: str) -> None:
    body = section(
        blob,
        "Social Studies",
        ["Visual Arts", "Music", "Physical Education", "Communication and Information Technology", "Health"],
    )
    if not body:
        return
    # Kindergarten uses two-part SCOs (1.1, 2.1); Grades 1-8 use three-part (4.1.1, 7.3.2).
    if grade == "k":
        for idx, content in sco_blocks(body, r"(?m)^\s*(\d+\.\d+)\s+"):
            add(grade, "social", idx, "specific", content)
        return
    triples = sco_blocks(body, r"(?<!\d)(\d+\.\d+\.\d+)\s+")
    if triples:
        for idx, content in triples:
            content = re.split(r"\s+[-•]\s+", content, maxsplit=1)[0]
            add(grade, "social", idx, "specific", content)
        return
    # Grade 9 (2012 framework): transition curriculum with topic headings and bullets, no SCO codes.
    topic = None
    for line in body.splitlines():
        s = line.strip()
        if not s or s.startswith("PEI SPECIFIC") or s.startswith("General Curriculum") or s == "Outcomes":
            continue
        if s.startswith("GCO") or s.startswith("The grade 9") or s.startswith("Students will be expected"):
            continue
        if s.startswith("Citizenship,") or s.startswith("Culture and") or s.startswith("Individuals,") or s.startswith(
            "Interdependence GCO"
        ) or s.startswith("People, Place") or s.startswith("Time, Continuity"):
            continue
        if re.match(r"^[A-Z][A-Za-z /&'-]{2,40}$", s) and not s.startswith("Demonstrate") and not s.startswith("Identify"):
            topic = s
            continue
        if s.startswith("•") or s.startswith("-"):
            text = s.lstrip("•- ").strip()
            if len(text) < 12:
                continue
            idx = topic or text.split(",")[0][:60]
            add(grade, "social", idx if topic else text[:60], "headline", text)


def framework_blob(grade: str) -> str:
    if grade in "789":
        return ""  # filled from the combined file
    name = "eelc_outcomes_framework_k" if grade == "k" else f"eelc_outcomes_framework_{grade}"
    return pdf_text(name)


def main() -> None:
    blobs = {g: framework_blob(g) for g in GRADES if g not in "789"}
    combined = pdf_text("eelc_outcomes_framework_7-9")
    blobs.update(split_grades_7_9(combined))

    for g in GRADES:
        blob = blobs.get(g, "")
        if not blob:
            print(f"warning: no framework text for grade {g}", file=sys.stderr)
            continue
        parse_math(g, blob)
        parse_language(g, blob)
        parse_science(g, blob)
        parse_social(g, blob)

    # Stable key order.
    ordered = {k: out[k] for k in sorted(out, key=lambda x: (x.split("/")[0].replace("k", "0"), x))}
    json.dump(ordered, sys.stdout, indent=1, ensure_ascii=False)
    sys.stdout.write("\n")
    # Summary to stderr for the researcher.
    for k, rows in ordered.items():
        print(f"{k}: {len(rows)}", file=sys.stderr)


if __name__ == "__main__":
    main()
