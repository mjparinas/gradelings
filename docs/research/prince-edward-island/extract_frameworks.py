"""Extract the specific curriculum outcomes from PEI's "Specific Curriculum Outcomes Framework" PDFs (Kindergarten to Grade 6, 2013).

Usage:  python3 -I extract_frameworks.py <dir with eelc_outcomes_framework_<grade>.txt from `pdftotext -layout`> > framework_outcomes.json
Result: {"<grade>/<subject>": [{"code", "group", "text"}]} for grades k,1..6 and subjects math, language, science, social, core-french,
        plus a "gco" entry per section: {"<grade>/<subject>": {"GCO 1": {"group", "text"}}} written under the key "_gco".

Why this is more than a regex: every page has two columns (the general curriculum outcome, GCO, on the left; the specific outcomes on the
right), the column offset changes from page to page, and some outcomes continue on the next page. A line is split into a left part (starts in
the first three columns) and a right part (everything after the first gap of two or more spaces, or the whole line when it is indented).
The subject of a page is its first non-blank line (e.g. "MATHEMATICS"). Rules per subject are in the parse_* functions.
"""
import difflib
import json
import os
import re
import sys

SECTION = {
    "MATHEMATICS": "math", "EARLY NUMERACY": "math",
    "ENGLISH LANGUAGE ARTS": "language", "EARLY LITERACY": "language",
    "SCIENCE": "science", "SOCIAL STUDIES": "social", "CORE FRENCH": "core-french",
}
FOOT = re.compile(r"PEI SPECIFIC CURRICULUM OUTCOMES FRAMEWORK")
IGN = re.compile(
    r"^(Students (will be expected|should be able) to\w?"
    r"|(Sample )?Specific Curriculum( Outcomes)?"
    r"|Key-Stage Curriculum Outcomes( and( Sample)?)?"
    r"|\(For a complete list of the specific curriculum outcomes, please refer to( the)?"
    r"|(the )?Elementary Core French Curriculum Guide\.\))$"
)
STUDENTS = re.compile(r"^Students (will be expected|should be able) to\w?$")
MATH_CODE = re.compile(r"^((?:N|PR|SS|SP)\d+)\s+(\S.*)$")
NUM_CODE = re.compile(r"^(\d{1,2}\.\d{1,2})\s+(\S.*)$")
SOC_CODE = re.compile(r"^(\d\.\d\.\d)\s+(\S.*)$")
K_CODE = re.compile(r"^(\d\.\d{1,2})\s+(\S.*)$")
SCI_ITEM = re.compile(r"^((?:SP|PS|LS|ESS)-\d+)\s+(\S.*)$")
UNIT_RE = re.compile(r"^(Skills and Process of Science|Life Science|Physical Science|Earth and Space Science|Space and Earth Science)\b")
STAGE = re.compile(r"^\(([A-Za-z]+)\)$")
MATH_STRAND = {"N": "Number", "PR": "Patterns and Relations", "SS": "Shape and Space", "SP": "Statistics and Probability"}
ELA_STRAND = {**{n: "Speaking and Listening" for n in (1, 2, 3)}, **{n: "Reading and Viewing" for n in (4, 5, 6, 7)},
              **{n: "Writing and Other Ways of Representing" for n in (8, 9, 10)}}
SOCIAL_GCOS = ["Citizenship, Power, and Governance", "Culture and Diversity", "Individuals, Societies, and Economic Decisions",
               "Interdependence", "People, Place, and Environment", "Time, Continuity, and Change"]
# prefixes that keep their hyphen when a line breaks after them
KEEP_HYPHEN = {"co", "non", "self", "multi", "cross", "well", "one", "two", "three", "high", "low", "e", "pre", "post", "sub", "problem", "small"}
HYPHEN_LOG = []


def clean(s):
    return re.sub(r"\s+", " ", s).strip()


def join(prev, nxt, where=""):
    """Join two wrapped lines. Repairs a word split across lines with a hyphen; logs every repair so it can be reviewed."""
    prev, nxt = prev.rstrip(), nxt.strip()
    if not prev:
        return nxt
    if prev.endswith("/") and nxt[:1].islower():  # "and/" + "or" -> "and/or"
        HYPHEN_LOG.append((where, prev.split()[-1] + nxt.split()[0], "slash-joined"))
        return prev + nxt
    if prev.endswith("-") and len(prev) > 1 and prev[-2].isalpha() and nxt[:1].islower():
        left = re.split(r"[\s(]", prev)[-1][:-1]
        right = re.split(r"[\s)]", nxt)[0]
        keep = left.lower() in KEEP_HYPHEN
        HYPHEN_LOG.append((where, left + "-" + right, "kept" if keep else "joined"))
        return prev + nxt if keep else prev[:-1] + nxt
    return prev + " " + nxt


def parts_text(parts):
    """Join an outcome's statement and its sub-points with '; ' (no doubled punctuation)."""
    out = ""
    for i, p in enumerate(parts):
        p = clean(p)
        if not p:
            continue
        if not out:
            out = p
        elif out.endswith(":") or out.endswith(";"):
            out += " " + p
        else:
            out += "; " + p
    return out


def split_row(line):
    """-> (left, right, right_start). A line that starts in the first three columns has left text."""
    line = line.rstrip()
    if not line.strip():
        return "", "", None
    lead = len(line) - len(line.lstrip())
    if lead > 3:
        return "", line.strip(), lead
    m = re.match(r"^(\s*\S.*?)(\s{2,})(\S.*)$", line)
    if m:
        return m.group(1).strip(), m.group(3).strip(), len(m.group(1)) + len(m.group(2))
    m = re.match(r"^(\s*\S.*?\S) (\d\.\d\.\d\s.*)$", line)  # left text running right up to an outcome code
    if m:
        return m.group(1).strip(), m.group(2).strip(), len(m.group(1)) + 1
    return line.strip(), "", None


def sections(text):
    """Group the pages of one framework by subject. -> [(subject, [page text, ...])]"""
    out = []
    for p in text.split("\f"):
        lines = [l for l in p.split("\n") if l.strip()]
        if not lines:
            continue
        head = lines[0].strip()
        if re.search(r"\n\s*[A-Z]{1,2}-\d\.\d+\s", p):
            continue  # Grade 6 prints a Health table under an English Language Arts page title
        if head in SECTION:
            subj = SECTION[head]
            if out and out[-1][0] == subj:
                out[-1][1].append(p)
            else:
                out.append((subj, [p]))
    return out


def page_rows(p):
    """Rows of one page after the header: [(left, right, rel_indent)] and the left/right streams."""
    lines = p.split("\n")
    h = next((i for i, l in enumerate(lines) if l.strip().startswith("General Curriculum")), None)
    if h is None:  # a continuation page printed without the column header: the first non-blank line is the page title
        h = next(i for i, l in enumerate(lines) if l.strip())
    hdr = lines[h]
    mm = re.search(r"Specific Curriculum|Key-Stage", hdr)
    chdr = mm.start() if mm else 40
    rows = []
    for i in range(h + 1, len(lines)):
        l = lines[i]
        if FOOT.search(l):
            continue
        left, right, st = split_row(l)
        if i == h + 1 and left == "Outcomes":
            left = ""
        if right and IGN.match(clean(right)) and not STUDENTS.match(clean(right)):
            right = ""
        if left.lower() in ("general curriculum",):
            left = ""
        if re.fullmatch(r"[ivx0-9]+", left or "") and not right:
            continue
        rows.append([left, right, st])
    starts = [r[2] for r in rows if r[1] and r[2] is not None]
    ref = min(starts + [chdr]) if starts else chdr
    for r in rows:
        r[2] = None if r[2] is None else r[2] - ref
    return rows


def left_blocks(all_rows):
    """Left-column text in runs. A run that has no closing punctuation continues in the next run (a right-column row can sit between
    two lines of a wrapped label or statement), unless the next run starts a new 'GCO' statement or a page starts."""
    blocks, cur = [], []
    for row in all_rows:
        if row is None or not row[0]:
            if cur:
                blocks.append(cur)
                cur = []
        else:
            cur.append(row[0])
    if cur:
        blocks.append(cur)
    merged = []
    for b in blocks:
        if merged and not re.search(r"[.)?]$", merged[-1][-1]) and not re.match(r"GCO\b", b[0]) and not re.match(r"(Skills|Attitudes|Knowledge|STSE)", b[0]):
            merged[-1] = merged[-1] + b
        else:
            merged.append(b)
    return merged


def join_lines(lines, where=""):
    s = ""
    for l in lines:
        s = join(s, l, where)
    return clean(s)


def parse_left_gcos(blocks, where):
    """Blocks of left-column text -> [(label, number or None, statement)] in order. A label is the text printed before a 'GCO' line."""
    out, label = [], ""
    for blk in blocks:
        idx = [i for i, l in enumerate(blk) if re.match(r"GCO\b", l)]
        if not idx:
            label = join_lines(blk, where)
            continue
        if idx[0] > 0:
            label = join_lines(blk[: idx[0]], where)
        for k, i in enumerate(idx):
            j = idx[k + 1] if k + 1 < len(idx) else len(blk)
            stmt = join_lines(blk[i:j], where)
            m = re.match(r"GCO\s*(\d+)?\s*:\s*(.*)$", stmt)
            if not m:
                out.append((label, None, stmt))
            else:
                out.append((label, int(m.group(1)) if m.group(1) else None, m.group(2)))
            label = ""
    return out


# ------------------------------------------------------------------ subjects
def parse_math(pages, where, kinder):
    out, cur = [], None
    allrows = []
    for p in pages:
        rows = page_rows(p)
        allrows += rows + [None]
        for left, right, rel in rows:
            t = clean(right)
            if not t or STUDENTS.match(t):
                continue
            m = K_CODE.match(t) if kinder else MATH_CODE.match(t)
            if m and (rel is None or rel <= 2):
                cur = {"code": m.group(1), "parts": [m.group(2)], "kind": "start"}
                out.append(cur)
            elif kinder and rel is not None and rel <= 2 and not m:
                cur = {"head": t, "parts": [], "code": None}
                out.append(cur)
            elif cur is not None and cur.get("code"):
                if t.startswith("•"):
                    cur["parts"].append(t.lstrip("• ").strip())
                else:
                    cur["parts"][-1] = join(cur["parts"][-1], t, where)
    res, head = [], ""
    for o in out:
        if not o.get("code"):
            head = o["head"]
            continue
        group = head if kinder else MATH_STRAND[re.match(r"[A-Z]+", o["code"]).group(0)]
        res.append({"code": o["code"], "group": group, "text": parts_text(o["parts"])})
    return res, left_blocks(allrows)


def parse_coded(pages, where, kinder, strand_by_gco=None):
    """English language arts (and Kindergarten early literacy) and Core French: '1.1  statement', '(Emergent)' stages, '- ' sub-points."""
    out, cur, stage, head = [], None, "", ""
    allrows = []
    for p in pages:
        rows = page_rows(p)
        allrows += rows + [None]
        for left, right, rel in rows:
            t = clean(right)
            if not t or STUDENTS.match(t):
                continue
            ms = STAGE.match(t)
            m = NUM_CODE.match(t)
            if ms:
                stage, cur = ms.group(1), None
            elif m and rel is not None and rel <= 3:
                cur = {"code": m.group(1), "parts": [m.group(2)], "stage": stage, "head": head}
                out.append(cur)
            elif kinder and rel is not None and rel <= 2 and not m and not t.startswith("-"):
                head, cur = t, None
            elif cur is not None:
                if re.match(r"^[-•]\s", t) or t in ("-", "•"):
                    cur["parts"].append(t[1:].strip())
                else:
                    cur["parts"][-1] = join(cur["parts"][-1], t, where)
            else:
                HYPHEN_LOG.append((where, "UNATTACHED: " + t, "dropped"))
    return out, left_blocks(allrows)


def parse_science(pages, where, kinder):
    units, cur_unit, cur, wrap = [], None, None, False
    allrows = []

    def new_item(txt):
        nonlocal cur
        cur = [txt]
        cur_unit["items"].append(cur)

    for p in pages:
        rows = page_rows(p)
        allrows += rows + [None]
        for left, right, rel in rows:
            t = clean(right)
            if not t or STUDENTS.match(t):
                continue
            item = t.startswith("•") or SCI_ITEM.match(t) or (kinder and K_CODE.match(t))
            if item and cur_unit is not None:
                new_item(t.lstrip("• ").strip() if t.startswith("•") else t)
                wrap = False
            elif rel is not None and rel >= 3 and cur is not None:
                cur[0] = join(cur[0], t, where)
            else:
                cur = None
                if wrap and cur_unit is not None:
                    cur_unit["title"] = join(cur_unit["title"], t, where)
                    wrap = False
                elif UNIT_RE.match(t) or (kinder and cur_unit is None):
                    cur_unit = {"title": t, "items": []}
                    units.append(cur_unit)
                    wrap = bool(re.search(r"(\bthe|\ba|\band|\bof|,)$", t))
                else:
                    wrap = False  # sub-cluster heading inside the unit: not an outcome
    res = []
    for u in units:
        mm = UNIT_RE.match(u["title"])
        group = mm.group(1) if mm and mm.group(1) != "Skills and Process of Science" else ""
        res.append({"code": u["title"], "group": group, "text": "; ".join(clean(i[0]) for i in u["items"] if clean(i[0]))})
    return res, left_blocks(allrows)


def parse_social(pages, where, kinder):
    out, cur, organizer, unit, head_open = [], None, "", "", False
    organizers = set()
    allrows = []
    for p in pages:
        rows = page_rows(p)
        allrows += rows + [None]
        for left, right, rel in rows:
            t = clean(right)
            if not t:
                continue
            if STUDENTS.match(t):
                head_open = False
                continue
            m = (K_CODE if kinder else SOC_CODE).match(t)
            if t.startswith("Conceptual Organizer:"):
                organizer, cur = t[len("Conceptual Organizer:"):].strip(), None
                organizers.add(organizer)
                head_open = True
                unit_kind = "org"
            elif re.match(r"^Unit [A-Za-z]+:", t):
                unit, cur, head_open, unit_kind = t, None, True, "unit"
            elif m:
                cur = {"code": m.group(1), "parts": [m.group(2)], "unit": unit, "org": organizer}
                out.append(cur)
                head_open = False
            elif kinder and rel is not None and rel <= 2 and cur is None or (kinder and rel is not None and rel <= 2 and not m and not head_open and cur is not None and False):
                unit, cur, head_open, unit_kind = t, None, True, "unit"
            elif kinder and rel is not None and rel <= 2 and not m:
                unit, cur, head_open, unit_kind = t, None, True, "unit"
            elif head_open:
                if unit_kind == "org":
                    if t.startswith("("):
                        continue
                    organizer = join(organizer, t, where)
                else:
                    unit = join(unit, t, where)
            elif t.startswith("(") and cur is None:
                continue
            elif cur is not None:
                cur["parts"][-1] = join(cur["parts"][-1], t, where)
            else:
                HYPHEN_LOG.append((where, "UNATTACHED: " + t, "dropped"))
    res = []
    for o in out:
        group = o["unit"]
        if len(organizers) > 1 and o["org"]:
            group = o["org"] + " - " + group
        res.append({"code": o["code"], "group": group, "text": parts_text(o["parts"])})
    return res, left_blocks(allrows)


# ------------------------------------------------------------------ assembling
def norm_label(label, options):
    best = difflib.get_close_matches(label, options, n=1, cutoff=0.8)
    return best[0] if best else None


def extract(folder):
    result, gco = {}, {}
    problems = []
    for grade in ["k", "1", "2", "3", "4", "5", "6"]:
        text = open(os.path.join(folder, f"eelc_outcomes_framework_{grade}.txt"), encoding="utf8").read()
        kinder = grade == "k"
        for subj, pages in sections(text):
            where = f"{grade}/{subj}"
            if subj == "math":
                outs, blocks = parse_math(pages, where, kinder)
            elif subj in ("language", "core-french"):
                outs, blocks = parse_coded(pages, where, kinder)
            elif subj == "science":
                outs, blocks = parse_science(pages, where, kinder)
            else:
                outs, blocks = parse_social(pages, where, kinder)
            lefts = parse_left_gcos(blocks, where)
            key = where
            entries, g = [], {}
            if subj in ("language", "core-french"):
                strand_of = {}
                for label, n, stmt in lefts:
                    if n is not None:
                        strand_of[n] = label
                        g[f"GCO {n}"] = {"group": label, "text": stmt}
                    else:
                        problems.append((where, "GCO without number", stmt[:60]))
                if subj == "language" and not kinder:
                    # a strand heading is printed once, next to the first GCO of the strand (and not at all for Writing in some grades)
                    for first, members in ((1, (1, 2, 3)), (4, (4, 5, 6, 7)), (8, (8, 9, 10))):
                        name = strand_of.get(first) or ELA_STRAND[first]
                        for n in members:
                            strand_of[n] = name
                            if f"GCO {n}" in g:
                                g[f"GCO {n}"]["group"] = name
                for o in outs:
                    if kinder and subj == "language":
                        grp = o["head"]
                    else:
                        grp = strand_of.get(int(o["code"].split(".")[0]), "")
                    if o["stage"]:
                        grp += f" ({o['stage']})"
                    entries.append({"code": o["code"], "group": grp, "text": parts_text(o["parts"])})
            else:
                entries = outs
                if subj == "science":
                    for label, n, stmt in lefts:
                        if n in (1, 2, 3, 4):
                            g[f"GCO {n}"] = {"group": {1: "STSE", 2: "Skills", 3: "Knowledge", 4: "Attitudes"}[n], "text": stmt, "label": label}
                elif subj == "social":
                    for label, n, stmt in lefts:
                        std = norm_label(label, SOCIAL_GCOS)
                        if std is None:
                            problems.append((where, "social GCO label not recognised", label))
                            continue
                        g["GCO: " + std] = {"group": std, "text": stmt, "printed_label": label}
            result[key] = entries
            gco[key] = g
    result["_gco"] = gco
    result["_problems"] = problems
    result["_hyphens"] = HYPHEN_LOG
    return result


if __name__ == "__main__":
    json.dump(extract(sys.argv[1]), sys.stdout, ensure_ascii=False, indent=1)
