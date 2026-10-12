"""Build outcomes.json from the Atlantic Canada foundation documents.

Usage: python3 -I build_outcomes.py <dir> > outcomes.json
<dir> holds, for each document, the pdftotext -layout output (<name>.txt) and the plain pdftotext output (<name>.plain.txt):
  math, english, science, socialstudies, corefrench   (see fetch.sh)

Every outcome is a key-stage curriculum outcome (end of Grade 3, 6 or 9) from the Foundation documents for the Atlantic Canada
mathematics, English language arts, science and social studies curricula, and from the Atlantic Second Language Core French
Curriculum. The key stage a grade belongs to: Kindergarten to Grade 3 -> 3, Grades 4 to 6 -> 6, Grades 7 to 9 -> 9.
Each outcome is checked to appear word for word in the plain text of its document, so a typo cannot slip in.
"""
import json, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

STAGE = {"k": 3, "1": 3, "2": 3, "3": 3, "4": 6, "5": 6, "6": 6, "7": 9, "8": 9, "9": 9}

# Substring of the general curriculum outcome (and strand heading) -> label used in citations.
LABELS = {
    "math": [
        ("number sense", "Number sense and number theory"),
        ("operation sense", "Operation sense"),
        ("patterns and relationships", "Patterns and relationships"),
        ("measurement", "Measurement"),
        ("spatial sense", "Spatial sense"),
        ("collection, display", "Data management"),
        ("uncertainty", "Probability"),
    ],
    "language": [
        ("speak and listen to explore", "Speaking and listening: explore and reflect"),
        ("communicate information and ideas", "Speaking and listening: communicate"),
        ("interact with sensitivity", "Speaking and listening: interact with respect"),
        ("select, read, and view", "Reading and viewing: select and read"),
        ("interpret, select, and combine", "Reading and viewing: interpret and combine information"),
        ("respond personally", "Reading and viewing: respond personally"),
        ("respond critically", "Reading and viewing: respond critically"),
        ("explore, clarify, and reflect", "Writing and representing: explore and reflect"),
        ("create texts collaboratively", "Writing and representing: create texts"),
        ("range of strategies", "Writing and representing: strategies"),
    ],
    "science": [
        ("nature of science and technology", "Science, technology, society and the environment"),
        ("skills required", "Skills of inquiry"),
        ("construct knowledge", "Knowledge"),
        ("attitudes", "Attitudes"),
    ],
    "social": [
        ("rights and responsibilities of citizenship", "Citizenship, power and governance"),
        ("culture, diversity", "Culture and diversity"),
        ("economic decisions", "Individuals, societies and economic decisions"),
        ("interdependent relationship", "Interdependence"),
        ("interactions among people, places", "People, place and environment"),
    ],
}
DOCS = {"math": "math", "language": "english", "science": "science", "social": "socialstudies"}


def squash(s):
    s = re.sub(r"\s+", " ", s)
    s = s.replace("\u2013", "-").replace("\u2019", "'").replace("\u201c", '"').replace("\u201d", '"')
    return re.sub(r"(\w)- (\w)", r"\1\2", s).strip().lower()


def label_for(subject, table, text):
    key = (table["heading"] + " " + table["gco"]).lower()
    for sub, label in LABELS[subject]:
        if sub in key:
            return label
    if subject == "social":
        # The sixth strand's heading sits above its statement and is cut by the page layout.
        if "affects the present and the future" in key or "time, continuity" in text[table["line"] - 14 : table["line"]]:
            return "Time, continuity and change"
    raise SystemExit(f"{subject}: no label for table at line {table['line']}: {key[:100]}")


def stage_tables(subject, folder):
    from extract_stages import extract
    name = DOCS[subject]
    layout = open(os.path.join(folder, name + ".txt"), encoding="utf8").read()
    plain = squash(open(os.path.join(folder, name + ".plain.txt"), encoding="utf8").read())
    strands = {}
    for t in extract(layout):
        label = label_for(subject, t, layout)
        row = strands.setdefault(label, {"gco": t["gco"], "stages": {}})
        if not row["gco"]:
            row["gco"] = t["gco"]
        for stage, items in t["stages"].items():
            items = [re.sub(r"^(the )?outcomes for entry.*?expected to\s*", "", i, flags=re.I) for i in items]
            items = [i for i in items if i and not i.lower().startswith(("for grade 3, stse", "some post-secondary"))]
            if subject == "science":  # several coded outcomes can share one paragraph, under a Life/Physical/Earth/Chemistry heading
                split = []
                for i in items:
                    for part in re.split(r"(?<=\(\d{3}\))\s+", i):
                        split.append(re.sub(r"^(Life Science|Physical Science|Earth and Space Science|Chemistry|Physics)\s+", "", part))
                items = split
            row["stages"].setdefault(stage, []).extend(items)
    # A statement the page layout pushed out of the table's reach: restate it, and check it is in the document.
    fallback = {"Time, continuity and change": "Students will be expected to demonstrate an understanding of the past and how it affects the present and the future."}
    for label, r in strands.items():
        if not r["gco"].strip():
            r["gco"] = fallback[label]
            if squash(r["gco"]) not in plain:
                raise SystemExit(f"{subject}: the statement for {label} is not in the source text")
    # Outcomes that list sub-points keep the lead-in and the points (separated by bullets in the source); check each piece.
    pieces = lambda i: [p for p in re.split(r"\s*\u2022\s*", i) if p.strip()]
    missing = [(label, s, p) for label, r in strands.items() for s, items in r["stages"].items() for i in items for p in pieces(i) if squash(p) not in plain]
    if missing:
        for m in missing[:20]:
            print("NOT FOUND", subject, m, file=sys.stderr)
        raise SystemExit(f"{len(missing)} {subject} outcomes are not in the source text")
    for r in strands.values():
        for stage, items in r["stages"].items():
            r["stages"][stage] = [tidy(i) for i in items]
    return strands


def tidy(i):
    """'lead-in to • a • b' becomes 'lead-in to: a; b'; words split across lines by a hyphen are joined."""
    parts = [p.strip() for p in re.split(r"\s*\u2022\s*", i) if p.strip()]
    text = parts[0] + (": " + "; ".join(parts[1:]) if len(parts) > 1 else "")
    return re.sub(r"(\w)- (\w)", r"\1\2", text)


def core_french(folder):
    """Core French: four general curriculum outcomes, each with key-stage bullets for the ends of Grades 6, 9 and 12."""
    layout = open(os.path.join(folder, "corefrench.txt"), encoding="utf8").read().split("\n")
    plain = squash(open(os.path.join(folder, "corefrench.plain.txt"), encoding="utf8").read())
    out = {}
    names = {"COMMUNICATION": "Communication", "CULTURE": "Culture", "GENERAL LANGUAGE EDUCATION": "General language education", "LANGUAGE": "Language"}
    i = 0
    while i < len(layout):
        s = layout[i].strip()
        if s in names and layout[i + 1 : i + 4] and any("Key-stage curriculum outcomes" in l or "General curriculum outcome" in l for l in layout[i + 1 : i + 4]):
            label = names[s]
            # the next "By the end of grade" header, then bullets in the right (or both) columns until the page footer
            j = i + 1
            while j < len(layout) and "By the end of grade" not in layout[j]:
                j += 1
            head = layout[j]
            gco_lines = []
            k = i + 1
            while k < j:
                gco_lines.append(layout[k])
                k += 1
            cols = [m.start() for m in re.finditer(r"By the end of grade", head)]
            body = []
            k = j + 1
            while k < len(layout) and "Second Language Core French Curriculum" not in layout[k] and "Curriculum Outcomes" not in layout[k] and not re.match(r"^\s*(COMMUNICATION|CULTURE|GENERAL LANGUAGE EDUCATION|LANGUAGE)\s*$", layout[k]):
                body.append(layout[k])
                k += 1
            if len(cols) == 2:  # grade 9 | grade 12 on one page
                left = [l[: cols[1]] for l in body]
                stage = re.search(r"grade (\d+)", head).group(1)
                items = bullets(left)
            else:  # the general outcome sits in the left column; the grade 6 bullets are in the right column
                right = [l[cols[0] :] for l in body]
                stage = re.search(r"grade (\d+)", head).group(1)
                items = bullets(right)
            row = out.setdefault(label, {"gco": "", "stages": {}})
            row["stages"][stage] = items
            if stage == "6":
                text = " ".join(l[: cols[0]].strip() for l in layout[i + 1 : j + 6] if l[: cols[0]].strip() and "General curriculum outcome" not in l)
                row["gco"] = re.sub(r"^On the basis of their experiences in the Core French curriculum, students should be able to\s*", "", re.sub(r"\s+", " ", text)).strip()
            i = k
            continue
        i += 1
    bad = [(l, s, b) for l, r in out.items() for s, items in r["stages"].items() for b in items if squash(b) not in plain]
    for r in out.values():
        r["gco"] = re.sub(r"(\w)- (\w)", r"\1\2", r["gco"])
    if bad:
        for b in bad[:20]:
            print("NOT FOUND core-french", b, file=sys.stderr)
        raise SystemExit(f"{len(bad)} core French outcomes are not in the source text")
    return out


def bullets(lines):
    items, cur = [], None
    for l in lines:
        t = l.strip()
        if t.startswith("\u2022"):
            if cur:
                items.append(cur)
            cur = t.lstrip("\u2022 ").strip()
        elif t and cur is not None:
            cur += " " + t
    if cur:
        items.append(cur)
    return [re.sub(r"(\w)- (\w)", r"\1\2", re.sub(r"\s+", " ", i)) for i in items]


def main(folder):
    result = {}
    for subject in DOCS:
        strands = stage_tables(subject, folder)
        for grade, stage in STAGE.items():
            rows = []
            for label, r in strands.items():
                items = r["stages"].get(str(stage), [])
                if not items:
                    continue
                rows.append({"idx": f"{label} (by Grade {stage})", "strand": label, "stage": stage, "gco": r["gco"], "outcomes": items})
            result[f"{grade}/{subject}"] = rows
    cf = core_french(folder)
    for grade in ["4", "5", "6", "7", "8", "9"]:
        stage = STAGE[grade]
        rows = []
        for label, r in cf.items():
            items = r["stages"].get(str(stage), [])
            if items:
                rows.append({"idx": f"{label} (by Grade {stage})", "strand": label, "stage": stage, "gco": r["gco"], "outcomes": items})
        result[f"{grade}/core-french"] = rows
    json.dump(result, sys.stdout, indent=1, ensure_ascii=False)
    if len(sys.argv) > 2:
        write_overall(result, sys.argv[2])


def write_overall(result, path):
    """src/content/newfoundland-and-labrador/overall.ts: what a course page shows parents as its learning focus."""
    lines = [
        "// Generated by docs/research/newfoundland-and-labrador/build_outcomes.py from the Atlantic Canada foundation documents. Do not edit by hand.",
        "// Each list is what a course page shows parents as its learning focus: one line per strand, with its general curriculum outcome.",
        "",
        "export const OVERALL: Record<string, string[]> = {",
    ]
    for key, rows in result.items():
        lines.append(f"  {json.dumps(key)}: [")
        for r in rows:
            gco = re.sub(r"^GCO:\s*", "", r["gco"]).strip()
            lines.append("    " + json.dumps(f"{r['strand']}. {gco[0].upper() + gco[1:]}", ensure_ascii=False) + ",")
        lines.append("  ],")
    lines += [
        "};",
        "",
        "/** The learning focus for one course; throws when a course has none, so a missing one fails loudly. */",
        "export function overall(grade: string, subject: string): string[] {",
        "  const list = OVERALL[`${grade}/${subject}`];",
        "  if (!list?.length) throw new Error(`No Newfoundland and Labrador learning focus for ${grade}/${subject}`);",
        "  return list;",
        "}",
        "",
    ]
    open(path, "w", encoding="utf8").write("\n".join(lines))


main(sys.argv[1])
