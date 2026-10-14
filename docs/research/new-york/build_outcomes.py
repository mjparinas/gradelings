"""Build docs/research/new-york/outcomes.json from NYSED's standards PDFs.

Usage: python3 -I build_outcomes.py <cache>   (the folder fetch.sh saved the PDFs in)

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Needs pypdf. Stops with an error when a check fails (see README.md).
"""

import json
import re
import sys
from pathlib import Path

import pypdf

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


def text_of(path: Path) -> list[str]:
    lines: list[str] = []
    for page in pypdf.PdfReader(str(path)).pages:
        lines.extend((page.extract_text() or "").splitlines())
        lines.append("=====PAGE")
    lines = [re.sub(r"\b(HS|MS)\. (PS|LS|ESS|ETS)", r"\1-\2", re.sub(r"\s+", " ", l)).strip().lstrip("∗* ") for l in lines]
    lines = [re.sub(r"[\uf000-\uf8ff]", "", l).strip() for l in lines]
    # pypdf sometimes breaks a code over two lines ("K" then ".2 Children, ..."); join them back.
    joined: list[str] = []
    for line in lines:
        if joined and (re.fullmatch(r"[K0-9]", joined[-1]) and re.match(r"^\.\d", line) or re.fullmatch(r"[K0-9]\.", joined[-1]) and re.match(r"^\d", line)):
            joined[-1] += line
        elif joined and re.fullmatch(r"(K|[1-9]|9-10|11-12)(RF|R|W|SL|L)", joined[-1]) and re.match(r"^\d+[a-z]?:", line):
            joined[-1] += line
        elif joined and re.fullmatch(r"[K0-9]\.\d{1,2}", joined[-1]) and re.match(r"^[a-z] ", line):
            joined[-1] += line
        elif joined and re.search(r"(^|\s)(St|[A-Z])$", joined[-1]) and re.match(r"^[a-z]", line):
            joined[-1] += line
        elif joined and re.fullmatch(r"[K0-9]\.\d{1,2}", joined[-1]) and re.match(r"^[A-Z]", line):
            joined[-1] += " " + line
        else:
            joined.append(line)
    return joined


def fail(msg: str) -> None:
    sys.exit(f"build_outcomes: {msg}")


def clean(s: str) -> str:
    s = re.sub(r"\s+", " ", s).strip()
    # pypdf splits some words around ligatures and kerning ("ST ATE", "sou ght"); leave the text as printed otherwise.
    return s


out: dict[str, list[dict]] = {f"{g}/{s}": [] for g in GRADES for s in ("math", "language", "science", "social")}


def add(grade: str, subject: str, idx: str, kind: str, content: str) -> None:
    key = f"{grade}/{subject}"
    if any(o["idx"] == idx for o in out[key]):
        fail(f"{idx} twice in {key}")
    out[key].append({"idx": idx, "kind": kind, "content": clean(content)})


# --- Math: NYS Next Generation Mathematics Learning Standards (2017). Grades K-8 are "NY-4.NBT.1" (lettered parts
# "NY-4.NBT.2a"); Grade 9 is the Algebra I course, "AI-A.SSE.1". Each domain heading ("NY-4.MD Measurement and Data")
# is followed by numbered standards ("5." or "2a.").
def math(cache: Path) -> None:
    lines = text_of(cache / "math.pdf")
    head = re.compile(r"^(NY-(K|[1-8])\.([A-Z]+)|AI-([A-Z])\.([A-Z]+))\s+[A-Z][a-z]")
    item = re.compile(r"^(\d{1,2})([a-z])?\.\s+(\S.*)$")
    stop = re.compile(r"^(Coherence|e\.g\.|Within-Grade|Note|Linked Navigation|=====PAGE|•|Fluency|Mathematical Practices)")
    found: dict[str, tuple[str, str]] = {}
    domain = grade = None
    current: list | None = None
    for line in lines:
        m = head.match(line)
        if m:
            domain = m.group(1)
            grade = (m.group(2) or "9").lower()
            current = None
            continue
        if re.match(r"^(NY-PK|GEO-[A-Z]|AII-[A-Z])[.A-Z]*\s+[A-Z][a-z]", line) or re.match(r"^(Grade \d Overview|Kindergarten Overview|Mathematical Practices|Algebra I Overview|High School)", line):
            domain = None
        if not domain:
            continue
        m = item.match(line)
        if m:
            idx = f"{domain}.{m.group(1)}{m.group(2) or ''}"
            if idx not in found:
                found[idx] = (grade, m.group(3))
                current = [idx]
            else:
                current = None
            continue
        if current and line and not stop.match(line) and not head.match(line):
            g, t = found[current[0]]
            found[current[0]] = (g, t + " " + line)
        elif stop.match(line):
            current = None
    for idx, (g, t) in list(found.items()):
        base = re.sub(r"[a-z]$", "", idx)
        if base != idx and base not in found:
            found[base] = (g, "")
    # A standard printed only as lettered parts ("6a.", "6b.") takes its parts' text.
    for idx, (g, t) in list(found.items()):
        if not t:
            parts = [found[k][1] for k in sorted(found) if re.fullmatch(re.escape(idx) + r"[a-z]", k)]
            found[idx] = (g, " ".join(parts))
    # Every code the document mentions (coherence notes, within-grade connections) must have been read.
    text = "\n".join(lines)
    mentioned = set(re.findall(r"\b(?:NY-(?:K|[1-8])|AI-[ANFS])\.[A-Z]+\.\d+[a-z]?\b", text))
    for code in sorted(mentioned):
        base = re.sub(r"[a-z]$", "", code)
        if code not in found and base not in found:
            fail(f"math code {code} is mentioned but was not read")
    for idx in sorted(found, key=lambda i: [int(x) if x.isdigit() else x for x in re.split(r"(\d+)", i)]):
        g, t = found[idx]
        t = re.split(r"\s*Coherence:", t)[0]
        add(g, "math", idx, "part" if re.search(r"\d[a-z]$", idx) else "standard", t)


# --- ELA: NYS Next Generation English Language Arts Learning Standards (2017). Lines print the code and a colon,
# "4R1:", "4RF3a:", "9-10W2:". Grade 9 uses the 9-10 band.
def ela(cache: Path) -> None:
    lines = text_of(cache / "ela.pdf")
    item = re.compile(r"^(K|[1-8]|9-10)(RF|R|W|SL|L)(\d+)([a-z])?:\s*(.*)$")
    current = None
    found: dict[str, tuple[str, str]] = {}
    banded: set[str] = set()
    for line in lines:
        m = item.match(line)
        if m:
            band, strand, n, letter, rest = m.groups()
            idx = f"{band}{strand}{n}{letter or ''}"
            grade = "9" if band == "9-10" else band.lower()
            if idx in found:
                current = None
                continue
            found[idx] = (grade, rest)
            current = idx
            continue
        if current and line and not line.startswith("=====") and not re.match(r"^(Grade|Kindergarten|Reading|Writing|Speaking|Language|Key Ideas|Craft|Integration|Range|Text Types|Research|Comprehension|Conventions|Knowledge|Vocabulary|Presentation|Phonics|Print|Fluency|Phonological|New York State|NYS Next)", line):
            g, t = found[current]
            found[current] = (g, t + " " + line)
        else:
            current = None
    # Language Standards 1 and 2 (conventions of grammar, usage, punctuation and spelling) are organized in grade bands
    # in Appendix A rather than printed per grade; each grade's page says so and points there. They are listed for every
    # grade under the grade's own code ("4L1", "9-10L2"), kind "banded", with the anchor standard as their text.
    anchors = {
        "L1": "Demonstrate command of the conventions of academic English grammar and usage when writing or speaking (banded skills, Appendix A).",
        "L2": "Demonstrate command of the conventions of academic English capitalization, punctuation, and spelling when writing (banded skills, Appendix A).",
    }
    for band in ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9-10"]:
        for code, text in anchors.items():
            idx = f"{band}{code}"
            if idx not in found:
                found[idx] = ("9" if band == "9-10" else band.lower(), text)
                banded.add(idx)
    for idx, (g, t) in found.items():
        if g in GRADES:
            add(g, "language", idx, "banded" if idx in banded else "part" if re.search(r"\d[a-z]$", idx) else "standard", t)


# --- Science: NYS P-12 Science Learning Standards (2016). Codes are the NGSS-style performance expectations,
# "4-PS3-2. Make observations...". Grades K-5 are by grade; the middle school standards are a 6-8 band (NYSED leaves
# the order to schools), so each is listed under Grades 6, 7 and 8; Grade 9 holds every high school expectation.
# Engineering design bands (K-2-ETS1, 3-5-ETS1) are listed under each grade of the band.
def science(cache: Path) -> None:
    item = re.compile(r"^((K|[1-5]|K-2|3-5|MS|HS)-(PS|LS|ESS|ETS)\d+-\d+)\.?\s*([A-Z].*)$")
    for name in ("science-p-2.pdf", "science-3-5.pdf", "science-ms.pdf", "science-hs.pdf"):
        lines = text_of(cache / name)
        found: dict[str, str] = {}
        current = None
        for line in lines:
            m = item.match(line)
            if m:
                idx = m.group(1)
                current = None if idx in found else idx
                if current:
                    found[idx] = m.group(4)
                continue
            if current and line and not line.startswith("=====") and not line.startswith("["):
                found[current] += " " + line
            else:
                current = None
        for idx, t in found.items():
            t = re.split(r"\s*\[(Clarification|Assessment)", t)[0]
            band = idx.split("-")[0] if not idx.startswith(("K-2", "3-5")) else idx[:3]
            grades = {"K-2": ["k", "1", "2"], "3-5": ["3", "4", "5"], "MS": ["6", "7", "8"], "HS": ["9"]}.get(band, [band.lower()])
            for g in grades:
                add(g, "science", idx, "performance-expectation", t)
        text = "\n".join(lines)
        for code in set(re.findall(r"\b(?:K|[1-5]|K-2|3-5|MS|HS)-(?:PS|LS|ESS|ETS)\d+-\d+\b", text)):
            # The connection boxes cite a few codes no expectation has (K-ESS2-3); report them rather than stop.
            if code not in found:
                print(f"note: {name} mentions {code}, which it never states", file=sys.stderr)


# --- Social studies: NYS K-12 Social Studies Framework (K-8, 2014 with the 2016 revisions; 9-12 with the 2017
# updates). Key Ideas are "4.1" and conceptual understandings "4.1a"; Grade 9 is Global History and Geography I,
# printed "9.1 a".
def social(cache: Path) -> None:
    for name, grades in (("social-k-8.pdf", GRADES[:-1]), ("social-9-12.pdf", ["9"])):
        lines = text_of(cache / name)
        key = re.compile(r"^(K|[1-9])\.(\d{1,2})\s?([a-z])?\s+(.*)$")
        found: dict[str, tuple[str, str, str]] = {}
        current = None
        for line in lines:
            m = key.match(line)
            if m and m.group(1).lower() in grades:
                g = m.group(1).lower()
                idx = f"{m.group(1)}.{m.group(2)}{m.group(3) or ''}"
                rest = m.group(4)
                kind = "conceptual-understanding" if m.group(3) else "key-idea"
                # A key idea is printed in capitals in Grades 4 to 9 ("4.1 GEOGRAPHY OF NEW YORK STATE:"), or as a
                # sentence in Kindergarten to Grade 3. Skip cross-references in prose ("4.4 Government and ...").
                if kind == "key-idea" and g not in ("k", "1", "2", "3") and not re.match(r"^[A-Z][A-Z \-–’'∗*.,():&]+", rest[:12]):
                    current = None
                    continue
                if idx in found:
                    current = None
                    continue
                found[idx] = (g, kind, rest)
                current = idx
                continue
            if current and line and not line.startswith("=====") and not re.match(r"^(Students will|Content Specification|Conceptual Understanding|Key Idea|Grade \d|Kindergarten)", line):
                g, k, t = found[current]
                if len(t) < 600:
                    found[current] = (g, k, t + " " + line)
            else:
                current = None
        for idx, (g, k, t) in found.items():
            add(g, "social", idx, k, t)
        # Every conceptual understanding needs its key idea, and letters run without gaps.
        for g in grades:
            ids = [o["idx"] for o in out[f"{g}/social"]]
            for i in ids:
                m = re.match(r"^(.+?)([a-z])$", i)
                if m:
                    if m.group(1) not in ids:
                        fail(f"social {i} has no key idea {m.group(1)}")
                    if m.group(2) != "a" and f"{m.group(1)}{chr(ord(m.group(2)) - 1)}" not in ids:
                        fail(f"social {i} follows a missing letter")


def main() -> None:
    if len(sys.argv) != 2:
        fail("usage: build_outcomes.py <cache>")
    cache = Path(sys.argv[1])
    math(cache)
    ela(cache)
    science(cache)
    social(cache)
    for key, items in out.items():
        if not items:
            fail(f"nothing read for {key}")
    dest = Path(__file__).with_name("outcomes.json")
    dest.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print({k: len(v) for k, v in out.items()})


main()
