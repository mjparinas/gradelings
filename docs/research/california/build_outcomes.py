#!/usr/bin/env python3
"""Build outcomes.json from the CDE files that fetch.sh downloads.

Usage: python3 -I build_outcomes.py <cache-dir>

Writes outcomes.json beside this script:
  {"<grade>/<subject>": [{"idx": code, "kind": "standard" | "substandard", "content": text, ...}]}
Grades are "k" and "1".."9"; subjects are math, language, science and social.

- Math (CA CCSSM, 2013): K-8 by grade (4.NBT.1, CA-only standards such as 2.NBT.7.1), and Grade 9 is the
  Algebra I model course (A-SSE.1, N-RN.2, F-IF.4). Each entry is the main statement of a standard, not its
  lettered sub-items.
- English language arts (CA CCSS for ELA/Literacy, 2013): RL, RI, RF, W, SL and L, coded RL.4.1, with the
  9-10 band under Grade 9 (RL.9-10.1). Main statements only.
- Science (CA NGSS, 2013): the performance expectations by grade, with middle school placed by the
  Preferred Integrated Model (each MS code is listed under the grade CDE's integrated document puts it in;
  MS-ETS1 is in all three), and every high school expectation under Grade 9 with "courses", the courses of
  the 2016 Science Framework's High School Three-Course Model it is taught in.
- History-social science (1998 standards): the standards (4.2, kind "standard") and their numbered parts
  (4.2.1, kind "substandard"). Grade 9 has no state course, so 9/social holds the Grade 12 Principles of
  American Democracy standards (12.1 to 12.10); the Principles of Economics standards reuse the numbers
  12.1 to 12.6, so they are left out to keep codes unique.

Entries whose text includes a California addition (marked "CA" in the CDE documents) carry "ca": true.
Science entries carry "ngss", the NGSS code (identical to the California code), so this file has the same
shape as Oregon's. The script stops with an error when a check fails. Needs pypdf and pdfplumber.
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

import pdfplumber
from pypdf import PdfReader

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
DASHES = str.maketrans({"–": "-", "—": "-", "‑": "-", "−": "-"})


def pdf_pages(path: Path) -> list[str]:
    return [page.extract_text() or "" for page in PdfReader(path).pages]


def clean(text: str) -> str:
    text = re.sub("\u00ad\\s*", "", text)  # soft hyphens at line ends
    text = re.sub("[\ue000-\uf8ff]", "", text)  # symbol-font glyphs, such as the modeling star
    text = re.sub(r"\s+", " ", text).strip()
    # A word broken over a line keeps its hyphen ("ocean- floor" -> "ocean-floor") unless the joined word is used
    # elsewhere in the documents ("obser- vations" -> "observations") or neither piece is a word ("distin- guishes"). Suspended hyphens stay ("one- and two-step").
    def rejoin(m: re.Match) -> str:
        a, b = m.group(1), m.group(2)
        whole = (a + b).lower() in VOCAB or (a.lower() not in VOCAB and b.lower() not in VOCAB)
        return a + b if whole else f"{a}-{b}"
    return re.sub(r"([A-Za-z]+)- (?!(?:and|or|to)\b)([a-z]+)", rejoin, text)


# Every word in the source files, filled by main(); used to rejoin words broken over a line.
VOCAB: set[str] = set()


def strip_ca(text: str) -> tuple[str, bool]:
    """Remove CDE's "CA" markers; report whether there was one."""
    found = bool(re.search(r"(?:^|\s)CA(?=\s|$)", text))
    return clean(re.sub(r"(?:^|\s)CA(?=\s|$)", " ", text)), found


def grade_id(g: str) -> str:
    return "k" if g.upper() == "K" else g


def add(out: dict, grade: str, subject: str, idx: str, content: str, kind: str = "standard", **extra) -> None:
    items = out.setdefault(f"{grade}/{subject}", [])
    if any(i["idx"] == idx for i in items):
        raise SystemExit(f"{grade}/{subject}: duplicate code {idx}")
    if not content:
        raise SystemExit(f"{grade}/{subject}: {idx} has no text")
    items.append({"idx": idx, "kind": kind, "content": content, **{k: v for k, v in extra.items() if v}})


def body_lines(page):
    """Text lines of a page without footnotes, footnote markers and notes (all printed under 10 pt)."""
    big = page.filter(lambda o: o.get("object_type") != "char" or o.get("size", 0) >= 10)
    return big.extract_text_lines()


# ---------- Mathematics (CA CCSSM, adopted 2010, modified January 2013) ----------

K8_DOMAIN = re.compile(r"\s((?:K|[1-8])\.(?:CC|OA|NBT|NF|MD|G|RP|NS|EE|F|SP))$")
HS_DOMAIN = re.compile(r"\s((?:N|A|F|G|S)-[A-Z]{1,3})$")
NUMBERED = re.compile(r"^(\d+(?:\.\d+)?)\.?\s+(\S.*)$")
SUB_ITEM = re.compile(r"^[a-z]\.\s")


def math(cache: Path, out: dict) -> None:
    current = None  # (grade, code, main lines, ca flag, in sub-items)

    def flush() -> None:
        nonlocal current
        if current:
            grade, code, lines, ca, _ = current
            text, ca_main = strip_ca(" ".join(lines))
            add(out, grade, "math", code, text, ca=ca or ca_main)
        current = None

    domain = last_grade = None  # a domain runs on over page breaks
    with pdfplumber.open(cache / "math.pdf") as pdf:
        for page in pdf.pages:
            lines = body_lines(page)
            # Standards pages carry a large side tab: "K", "1" ... "8", "A1" (Algebra I), "G", "M1" ...
            tab = next((l["text"].strip() for l in lines if l["chars"][0]["size"] > 20 and l["top"] < 60), "")
            grade = "9" if tab == "A1" else grade_id(tab) if re.fullmatch(r"K|[1-8]", tab) else None
            if not grade:
                flush()
                continue
            if grade != last_grade:
                domain = None
                last_grade = grade
            # Left and right pages have different margins.
            margin = min((l["x0"] for l in lines if 10 <= l["chars"][0]["size"] <= 12.5 and l["top"] > 80), default=36)
            for line in lines:
                text = line["text"].strip()
                ch = line["chars"][0]
                if "|" in text or ch["size"] > 12.5 or ch["size"] < 10:
                    continue  # page footer, tab and section titles
                pattern = HS_DOMAIN if grade == "9" else K8_DOMAIN
                m = pattern.search(text)
                if m and "Demi" in ch["fontname"] and ch["size"] < 11.5:
                    flush()
                    domain = m.group(1)
                    continue
                if ch["size"] >= 11.5 and "Demi" in ch["fontname"]:
                    flush()  # cluster heading
                    continue
                n = NUMBERED.match(text)
                if n and line["x0"] < margin + 9 and domain:
                    flush()
                    code = f"{domain}.{n.group(1)}"
                    if grade != "9" and not code.startswith(f"{grade.upper()}."):
                        raise SystemExit(f"math: {code} on a Grade {grade} page")
                    current = (grade, code, [n.group(2)], False, False)
                    continue
                if not current:
                    continue
                g, code, body, ca, in_sub = current
                if SUB_ITEM.match(text):
                    in_sub = True
                if in_sub:
                    ca = ca or strip_ca(text)[1]
                else:
                    body.append(text)
                current = (g, code, body, ca, in_sub)
        flush()


# ---------- English language arts (CA CCSS for ELA/Literacy, adopted 2010, modified March 2013) ----------

# A standard starts "5. Analyze ..." (CA additions "4.1 ..."). A bare number is not enough: a line can start with
# the end of "(See grade 7 Language standards ...".
# CDE also prints one standard without its point ("6 With some guidance ...", W.5.6), so a bare number counts
# only when it is the next number and a capital follows.
ELA_NUMBERED = re.compile(r"^(\d+\.\d+|\d+\.?)\s+(\S.*)$")
ELA_STRANDS = {"RL", "RI", "RF", "W", "SL", "L"}
ELA_OTHER = {"RH", "RST", "WHST"}
ELA_SKIP = re.compile(r"^\((Not applicable|Begins|See |Please see)", re.I)


def header_grade(text: str) -> str | None:
    text = text.translate(DASHES)
    if "Kindergart" in text:
        return "K"
    m = re.search(r"Grades?\s*(\d+)(?:\s*-\s*(\d+))?\s*Students", text)
    if not m:
        return None
    return f"{m.group(1)}-{m.group(2)}" if m.group(2) else m.group(1)


def layers(chars: list) -> list[str]:
    """The text of each print layer: chars of one baseline, size and font, left to right."""
    groups: dict = {}
    for c in chars:
        groups.setdefault((round(c["top"], 1), round(c["size"], 1), c["fontname"]), []).append(c)
    return ["".join(c["text"] for c in sorted(g, key=lambda c: c["x0"])) for g in groups.values()]


def header_bands(text: str) -> list[str]:
    text = text.translate(DASHES)
    found = re.findall(r"Kindergartners|Grades?\s*\d+(?:\s*-\s*\d+)?\s*Students", text)
    return [header_grade(f.replace("Students", " Students")) for f in found]


def ela(cache: Path, out: dict) -> None:
    strand = None
    state: dict = {}  # (strand, band) -> [number, main lines, ca, in sub-items]

    def flush(key) -> None:
        if key not in state:
            return
        number, lines, ca, _ = state.pop(key)
        text, ca_main = strip_ca(" ".join(lines))
        if not text or ELA_SKIP.match(text):
            return
        s, band = key
        code = f"{s}.{band}.{number}"
        if band == "9-10":
            add(out, "9", "language", code, text, ca=ca or ca_main)
        elif band != "11-12":
            add(out, grade_id(band), "language", code, text, ca=ca or ca_main)

    with pdfplumber.open(cache / "ela.pdf") as pdf:
        for page in pdf.pages:
            page = page.dedupe_chars()
            tab = [w["text"] for w in page.extract_words(extra_attrs=["size"]) if w["size"] > 30 and w["top"] < 120]
            if tab and tab[0] in ELA_STRANDS | ELA_OTHER:
                strand = tab[0]
            if strand not in ELA_STRANDS:
                continue
            verticals = [e for e in page.edges if e["orientation"] == "v" and e["bottom"] - e["top"] > 5]
            # Header cells: words "Kindergartners" / "Grade n Students" inside a ruled row.
            # Header rows: "Kindergartners | Grade 1 Students | ...". Some pages print the row twice, a little
            # apart and in two sizes, so the text is read one font size at a time and close rows are merged.
            headers = []  # (top, bottom, [bands left to right])
            for line in page.extract_text_lines():
                for layer in layers(line["chars"]):
                    found = header_bands(layer)
                    if found and not any(abs(h[0] - line["top"]) < 8 for h in headers):
                        headers.append((line["top"], line["bottom"], found))
            headers.sort()
            bands = []
            for top, bottom, found in headers:
                xs = sorted({round(e["x0"]) for e in verticals if e["top"] - 2 <= top <= e["bottom"] + 2})
                cells = []
                for x0, x1 in zip(xs, xs[1:]):
                    chars = page.crop((x0, top - 1, x1, bottom + 1)).chars
                    for layer in layers(chars):
                        label = header_grade(layer)
                        if label:
                            cells.append((x0, x1, label))
                            break
                if [c[2] for c in cells] != found and len(cells) < len(found):
                    raise SystemExit(f"ela: page {page.page_number}: headers {found} but columns {cells}")
                bands.append((bottom + 2, cells))
            for i, (top, cells) in enumerate(bands):
                bottom = bands[i + 1][0] - 30 if i + 1 < len(bands) else max(
                    (e["bottom"] for e in verticals if e["top"] >= top - 30), default=page.height - 40)
                for x0, x1, band in cells:
                    key = (strand, band)
                    region = page.crop((x0 + 1, top, x1 - 1, bottom))
                    for line in body_lines(region):
                        text = line["text"].strip()
                        if not text:
                            continue
                        n = ELA_NUMBERED.match(text)
                        if n:
                            number = n.group(1).rstrip(".")
                            last = state.get(key, [None])[0]
                            prev = tuple(int(p) for p in last.split(".")) if last else ()
                            bare = not n.group(1).endswith(".") and "." not in number
                            if bare and not (prev and int(number) == prev[0] + 1 and n.group(2)[0].isupper()):
                                pass
                            elif tuple(int(p) for p in number.split(".")) > prev:
                                flush(key)
                                state[key] = [number, [n.group(2)], False, False]
                                continue
                        if key not in state:
                            continue
                        entry = state[key]
                        if SUB_ITEM.match(text):
                            entry[3] = True
                        if entry[3]:
                            entry[2] = entry[2] or strip_ca(text)[1]
                        else:
                            entry[1].append(text)
            # A strand ends where the next strand's tab appears.
        for key in list(state):
            flush(key)


# ---------- Science (CA NGSS, adopted September 2013) ----------

SCI_CODE = re.compile(r"^((?:K|[1-5]|MS|HS|K-2|3-5)-(?:PS|LS|ESS|ETS)\d-\d+)\.\s*(.*)$")
SCI_FILES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "hs-ps", "hs-ls", "hs-ess", "hs-ets"]
COURSES = [(777, "Living Earth"), (856, "Chemistry in the Earth System"), (926, "Physics of the Universe"), (1013, None)]


def hs_courses(cache: Path) -> dict[str, list[str]]:
    """Which Three-Course Model course each high school expectation is taught in (2016 Science Framework, ch. 7).
    A course's instructional segments print each expectation in full ("HS-LS2-1. Use ...")."""
    found: dict[str, list[str]] = {}
    # The chapter's printed page numbers run on from the whole framework: PDF page 4 is page 770. Check the
    # offset on every page that starts with its number.
    for i, text in enumerate(pdf_pages(cache / "science-framework-ch7.pdf")):
        printed = i + 767
        m = re.match(r"\s*(\d{3,4})\s", text)
        if m and int(m.group(1)) != printed and i > 2:
            raise SystemExit(f"science framework: PDF page {i + 1} is printed {m.group(1)}, expected {printed}")
        course = next((COURSES[i][1] for i in range(len(COURSES) - 1) if COURSES[i][0] <= printed < COURSES[i + 1][0]), None)
        if not course:
            continue
        for code in re.findall(r"\b(HS-(?:PS|LS|ESS|ETS)\d-\d+)\.\s", text.translate(DASHES)):
            if course not in found.setdefault(code, []):
                found[code].append(course)
    return found


JOINED: list[str] = []


def repair_words(text: str, other: tuple) -> str:
    """The science PDFs' text layer splits some words ("obser vations", "inf er"). pypdf and pdfplumber split
    different words, so two pieces are joined when pdfplumber's text of the same files has the joined word more
    often than the split one."""
    def join(m: re.Match) -> str:
        a, b = m.group(1), m.group(2)
        words, pairs = other
        # A piece is a word of its own when it stands alone often (not counting "obser-" at a line end), so
        # "are a" never becomes "area".
        alone = min(words[a] - pairs[(a, "-")], words[b])
        if words[a + b] > pairs[(a, b)] and alone < 5:
            JOINED.append(f"{a} {b}")
            return a
        return a + " "
    # The second piece is only looked at, not consumed, so it can also start the next pair.
    return re.sub(r"\b([A-Za-z]+) (?=([a-z]+)\b)", join, text)


def science(cache: Path, out: dict) -> None:
    courses = hs_courses(cache)
    other = []
    for n in SCI_FILES:
        with pdfplumber.open(cache / f"science-{n}.pdf") as pdf:
            other.extend(page.extract_text() or "" for page in pdf.pages)
    tokens = re.findall(r"[A-Za-z]+|[^A-Za-z\s]", " ".join(other))
    other_text = (Counter(tokens), Counter(zip(tokens, tokens[1:])))
    for name in SCI_FILES:
        grade = "9" if name.startswith("hs") else grade_id(name.upper() if name == "k" else name)
        lines = [l.strip() for l in "\n".join(pdf_pages(cache / f"science-{name}.pdf")).translate(DASHES).split("\n")]
        current = None
        body: list[str] = []
        done = False

        def flush() -> None:
            if not current:
                return
            text = repair_words(clean(" ".join(body)).split("[")[0], other_text).strip()
            text = re.sub(r"\s*\*+\s*$", "", text).strip()
            if any(i["idx"] == current for i in out.get(f"{grade}/science", [])):
                return  # the PDFs repeat a few expectations (K-2-ETS1 in each grade's engineering page)
            extra = {"ngss": current}
            if grade == "9":
                extra["courses"] = courses.get(current)
                if not extra["courses"]:
                    raise SystemExit(f"science: {current} is in no Three-Course Model course")
            add(out, grade, "science", current, text, **extra)

        for line in lines:
            m = SCI_CODE.match(line)
            if m:
                flush()
                current = m.group(1)
                expected = {"6": "MS", "7": "MS", "8": "MS", "9": "HS"}.get(grade, grade.upper())
                band = current.split("-")[0] if not current.startswith(("K-2", "3-5")) else current[:3]
                if band not in (expected, "K-2", "3-5"):
                    raise SystemExit(f"science: {current} in the Grade {grade} file")
                body = [m.group(2)]
                done = "[" in m.group(2)
                continue
            if not current or done or not line:
                continue
            if "[" in line or line.startswith(("The performance expectation", "<<<", "Grade", "Kindergarten")):
                if "[" in line:
                    body.append(line.split("[")[0])
                done = True
                continue
            body.append(line)
        flush()


# ---------- History-social science (adopted October 1998) ----------

# The text layer sometimes splits a code ("1. 6 Students ..." for 1.6), so a space after the point is allowed
# when the grade matches the standard before it.
HSS_TOP = re.compile(r"^(K|\d{1,2})\.( ?)(\d{1,2})\s+([A-Z]\S*.*)$")
HSS_SUB = re.compile(r"^(\d{1,2})\.\s+(\S.*)$")
HSS_GRADE = re.compile(r"^(Kindergarten|Grade (One|Two|Three|Four|Five|Six|Seven|Eight|Ten|Eleven|Twelve)|"
                       r"Grades (Six|Nine) Through (Eight|Twelve))\s*$")
# Grade-span title pages print "Grades Nine / Through / Twelve" on three lines.
HSS_BAND = re.compile(r"^(Grades (Six|Nine)|Kindergarten|Through|Grade Five|Eight|Twelve)\s*$")
HSS_FOOTER = re.compile(r"^(California Department of Education|Created May \d+, \d{4}|\d+|[ivx]+|"
                        r"(\d+ )?(KINDERGARTEN|GRADE [A-Z]+)( \d+)?)$")


def social(cache: Path, out: dict) -> None:
    pages = pdf_pages(cache / "hss.pdf")
    lines = [l.strip() for l in "\n".join(pages).split("\n")]
    start = next(i for i, l in enumerate(lines) if HSS_TOP.match(l) and l.startswith("K.1"))
    current = None  # [code, kind, lines]
    section = None  # None (skip), or "content"
    economics = False

    def flush() -> None:
        nonlocal current
        if current:
            code, kind, body = current
            grade = code.split(".")[0]
            text = clean(" ".join(body))
            if grade == "K" or grade in {"1", "2", "3", "4", "5", "6", "7", "8"}:
                add(out, grade_id(grade), "social", code, text, kind)
            elif grade == "12" and not economics:
                add(out, "9", "social", code, text, kind)
        current = None

    top = None
    section = "content"
    for line in lines[start:]:
        if not line or line.startswith("<<<") or HSS_FOOTER.match(line):
            continue
        if HSS_GRADE.match(line) or HSS_BAND.match(line) or "Analysis Skills" in line:
            flush()
            top = None
            section = None
            continue
        if line.startswith("Principles of Economics"):
            flush()
            economics = True
            section = None
            continue
        m = HSS_TOP.match(line)
        if m and (not m.group(2) or (top and top.split(".")[0] == m.group(1))):
            flush()
            top = f"{m.group(1)}.{m.group(3)}"
            section = "content"
            current = [top, "standard", [m.group(4)]]
            continue
        s = HSS_SUB.match(line)
        if s and top and section:
            flush()
            current = [f"{top}.{s.group(1)}", "substandard", [s.group(2)]]
            continue
        if current and section:
            current[2].append(line)
    flush()
    # Check against the plain text: every standard code printed in the content pages was read.
    text = "\n".join(pages)
    printed = set(re.findall(r"(?m)^((?:K|[1-8])\.\d{1,2})\s", text))
    read = {i["idx"] for k, v in out.items() if k.endswith("/social") for i in v if i["kind"] == "standard"}
    missing = printed - read
    if missing:
        raise SystemExit(f"social: codes not read: {sorted(missing)}")
    # Each standard's parts run 1, 2, 3 ... with no gap.
    for key, items in out.items():
        if key.endswith("/social"):
            for std in (i["idx"] for i in items if i["kind"] == "standard"):
                parts = [int(i["idx"].rsplit(".", 1)[1]) for i in items if i["idx"].startswith(std + ".")]
                if parts != list(range(1, len(parts) + 1)):
                    raise SystemExit(f"social: {std} has parts {parts}")


ELA_ORDER = ["RL", "RI", "RF", "W", "SL", "L"]


def ela_key(item: dict) -> tuple:
    strand, _, number = item["idx"].split(".", 2)
    return ELA_ORDER.index(strand), [int(p) for p in number.split(".")]


KNOWN_BREAKS = {"distin-guishes": "distinguishes", "freshwater in various": "fresh water in various"}


def main() -> None:
    cache = Path(sys.argv[1])
    for pdf in sorted(cache.glob("*.pdf")):
        if "framework" not in pdf.name:
            VOCAB.update(w.lower() for w in re.findall(r"(?<![A-Za-z-])[A-Za-z]+(?![A-Za-z-])", " ".join(pdf_pages(pdf))))
    out: dict = {}
    math(cache, out)
    ela(cache, out)
    science(cache, out)
    social(cache, out)
    for g in GRADES:
        out.get(f"{g}/language", []).sort(key=ela_key)
    ordered = {f"{g}/{s}": out.get(f"{g}/{s}", []) for g in GRADES for s in ("math", "language", "science", "social")}
    # Line-break hyphens the PDF text keeps and the word list can't repair.
    for items in ordered.values():
        for item in items:
            for broken, word in KNOWN_BREAKS.items():
                item["content"] = item["content"].replace(broken, word)
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(ordered, indent=1, ensure_ascii=False) + "\n")
    for key, items in ordered.items():
        print(key, len(items))
    print("total", sum(len(v) for v in ordered.values()))
    print("science words rejoined:", ", ".join(sorted(set(JOINED))))


if __name__ == "__main__":
    main()
