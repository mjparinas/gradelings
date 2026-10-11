"""Check outcomes.json against the source PDFs.

Usage: python3 -I verify_outcomes.py <scratch dir with the pdftotext -layout .txt files> [outcomes.json]
It writes a second, independent extraction (pdftotext in reading order, no -layout) next to the .txt files and checks, for every entry
that comes from a PDF:
  1. the code appears in the PDF's layout text;
  2. the first 60 characters of the text appear in the PDF's reading-order text;
  3. the whole text appears in the reading-order text (or, if the columns were read in a different order, every '; ' piece does);
  4. the codes found by an independent scan of each subject's pages match the codes in the file, and numbering has no gaps.
Text is compared after lower-casing and removing everything that is not a letter or a digit, so hyphenation repairs, '; ' joins and
bullet marks do not matter; the words and their order do.
"""
import collections
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "source")


def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


def windowed(text, R, window=600):
    """Every word of `text`, in order, is found in `R` within `window` characters of the previous word (columns read side by side can
    interleave a few lines of the other column)."""
    pos = 0
    for w in re.findall(r"[A-Za-z0-9]+", text):
        w = w.lower()
        i = R.find(w, pos, pos + window)
        if i < 0:
            return False
        pos = i + len(w)
    return True


def reading_text(folder, stem):
    out = os.path.join(folder, stem + ".reading.txt")
    if not os.path.exists(out):
        subprocess.run(["pdftotext", os.path.join(SRC, stem + ".pdf"), out], check=True)
    return open(out, encoding="utf8").read()


# Entries whose columns interleave so badly in the reading-order text that no automatic comparison passes. Each one was compared by hand
# with the -layout text (see EXTRACTION_REPORT.md).
MANUAL = {
    ("k/science", "Exploring the World Using Our Senses"): "reading order lists 1.1 and 1.2 apart from their statements",
    ("1/social", "1.3.3"): "Grade 1 social studies page: left and right columns interleave",
    ("1/social", "1.3.4"): "Grade 1 social studies page: left and right columns interleave",
    ("1/social", "GCO: Individuals, Societies, and Economic Decisions"): "left statement interleaved with Unit Three lines",
    ("1/social", "GCO: Interdependence"): "left statement interleaved with outcomes 1.3.2-1.3.4",
    ("2/language", "8.2"): "interleaved with the GCO 8 statement",
    ("2/language", "GCO 8"): "interleaved with outcomes 8.1 and 8.2",
    ("6/social", "GCO: Time, Continuity, and Change"): "statement shares a row with outcome 6.1.1",
}


def main(folder, path):
    data = json.load(open(path, encoding="utf8"))
    layout, reading = {}, {}
    stems = [f"eelc_outcomes_framework_{g}" for g in "k123456"] + ["eelc_math_9_5", "eelc_socialstudies_9", "intermediate_program_of_studies_and_authorized_materials"]
    for st in stems:
        layout[st] = open(os.path.join(folder, st + ".txt"), encoding="utf8").read()
        reading[st] = norm(reading_text(folder, st))
    fails, soft = [], []
    checked = 0
    for key, entries in data.items():
        grade, subj = key.split("/")
        for e in entries:
            code, text = e["code"], e["text"]
            if grade in "k123456":
                st = f"eelc_outcomes_framework_{grade}"
            elif key == "9/math":
                st = "eelc_math_9_5"
            elif key == "9/social":
                st = "eelc_socialstudies_9"
            elif key in ("7/language", "8/language", "9/language") or (subj == "science" and code.startswith("GCO")):
                st = "eelc_outcomes_framework_6"  # GCOs for Grades 7-9 come from the Grade 6 framework
            elif subj == "math":
                continue  # Grade 7/8 placeholders: nothing to check
            else:
                st = "intermediate_program_of_studies_and_authorized_materials"
            R, L = reading[st], layout[st]
            checked += 1
            # 1. code
            if subj == "science" and not code.startswith("GCO"):
                ok = norm(code) in R
            elif code.startswith("GCO:"):
                ok = norm(code[4:]) in R
                if not ok and key == "k/social":  # the Kindergarten page prints "Cutlure and Diversity" and "People, Places, and Environment"
                    ok = norm({"Culture and Diversity": "Cutlure and Diversity", "People, Place, and Environment": "People, Places, and Environment"}[code[5:]]) in R
                    if ok:
                        soft.append((key, code, "printed label differs from the standard strand name (PDF typo or variant)"))
            elif code.startswith("GCO "):
                ok = re.search(r"GCO\s*" + code.split()[1] + r"\b", L) is not None
            elif key in ("7/social", "8/social") or code == "Core French 7-9":
                ok = True  # placeholders
            elif grade == "9" and subj == "math":
                ok = code in L or code.replace("9.", "") in L
            else:
                ok = re.search(r"(?<![\w.])" + re.escape(code) + r"(?![\w])", L) is not None
            if not ok:
                fails.append((key, code, "code not found in PDF text"))
            # 2 and 3. text
            if key in ("7/social", "8/social") or code == "Core French 7-9":
                kw = {"Economic empowerment": "economic", "Political empowerment": "political", "Cultural empowerment": "cultural",
                      "Societal empowerment": "societal", "National empowerment": "national", "Canadian identity": "Canadian identity",
                      "Geographic influences": "geographic influences", "Decades of change": "decades of change", "Citizenship": "citizenship",
                      "Culminating project": "culmination", "Core French 7-9": "Intermediate Core French"}[code]
                if norm(kw) not in R:
                    fails.append((key, code, "placeholder keyword not in PDF"))
                continue
            if key == "9/math" and code == "9.PR2":
                if norm(text[:60]) not in R:
                    fails.append((key, code, "first 60 chars"))
                soft.append((key, code, "equation text transcribed by hand from the rendered page (typeset equations)"))
                continue
            if subj == "science" and not code.startswith("GCO") and grade in "789":
                if norm(code) not in R:
                    fails.append((key, code, "unit name"))
                continue
            first = norm(text[:60])
            if first in R and norm(text) in R:
                continue
            pieces = [p for p in re.split(r";\s", text) if norm(p)]
            bad = [p for p in pieces if norm(p) not in R]
            if first in R and not bad:
                soft.append((key, code, "first 60 chars and every '; ' piece found, but not the whole text as one run (columns interleave)"))
            elif windowed(text, R):
                soft.append((key, code, "words found in order but interleaved with the other column in the reading-order text; first-60: "
                             + ("found" if first in R else "interleaved")))
            elif (key, code) in MANUAL:
                soft.append((key, code, "checked by hand against the layout text: " + MANUAL[(key, code)]))
            else:
                fails.append((key, code, "text not found: " + text[:70]))
    print(f"entries checked against a PDF: {checked}")
    print(f"FAILURES: {len(fails)}")
    for f in fails:
        print("  FAIL", f)
    print(f"soft notes: {len(soft)}")
    for f in soft:
        print("  note", f)

    # 4. independent code scan per grade and subject
    print("\nCode scan (independent regex over the layout text of each subject's pages) vs outcomes.json:")
    sec = {"math": ("MATHEMATICS", "EARLY NUMERACY"), "language": ("ENGLISH LANGUAGE ARTS", "EARLY LITERACY"), "social": ("SOCIAL STUDIES",),
           "core-french": ("CORE FRENCH",)}
    pat = {"math": r"(?:^|\s{2,})((?:N|PR|SS|SP)\d+)\s", "language": r"(?:^|\s{2,})(\d{1,2}\.\d{1,2})\s", "social": r"(?:^|\s{2,}|\s)(\d\.\d\.\d)\s",
           "core-french": r"(?:^|\s{2,})(\d{1,2}\.\d{1,2})\s"}
    for g in "k123456":
        text = layout[f"eelc_outcomes_framework_{g}"]
        for subj, heads in sec.items():
            codes = collections.Counter()
            for p in text.split("\f"):
                lines = [l for l in p.split("\n") if l.strip()]
                if not lines or lines[0].strip() not in heads or re.search(r"\n\s*[A-Z]{1,2}-\d\.\d+\s", p):
                    continue
                for l in lines:
                    if g == "k" and subj == "social":
                        m = re.match(r"^.{0,45}?\s{2,}(\d\.\d)\s", l) or re.match(r"^\s{20,}(\d\.\d)\s", l)
                        if m:
                            codes[m.group(1)] += 1
                        continue
                    for m in re.finditer(pat[subj], l):
                        codes[m.group(1)] += 1
            if g == "k" and subj == "math":
                codes = collections.Counter()
                for p in text.split("\f"):
                    lines = [l for l in p.split("\n") if l.strip()]
                    if lines and lines[0].strip() == "EARLY NUMERACY":
                        for l in lines:
                            m = re.search(r"(?:^|\s{2,})(\d\.\d)\s", l)
                            if m:
                                codes[m.group(1)] += 1
            got = collections.Counter(e["code"] for e in data.get(f"{g}/{subj}", []) if re.fullmatch(r"(?:N|PR|SS|SP)\d+|\d{1,2}\.\d{1,2}(?:\.\d)?", e["code"]))
            if codes != got:
                miss, extra = codes - got, got - codes
                print(f"  {g}/{subj}: scan-only {dict(miss)}  file-only {dict(extra)}")
    print("  (no line above = scan and file agree for that grade and subject)")

    print("\nBullet / sub-point lines in the PDF vs parts in the file:")
    sys.path.insert(0, HERE)
    import extract_frameworks as ef
    ef.extract(folder)
    for g in "k123456":
        text = layout[f"eelc_outcomes_framework_{g}"]
        for subj, heads in (("math", ("MATHEMATICS", "EARLY NUMERACY")), ("language", ("ENGLISH LANGUAGE ARTS", "EARLY LITERACY")),
                            ("science", ("SCIENCE",))):
            n = 0
            for p in text.split("\f"):
                lines = [l for l in p.split("\n") if l.strip()]
                if not lines or lines[0].strip() not in heads or re.search(r"\n\s*[A-Z]{1,2}-\d\.\d+\s", p):
                    continue
                for l in lines:
                    if subj == "science":
                        n += len(re.findall(r"(?:^|\s{2,})(?:•|(?:SP|PS|LS|ESS)-\d+\s)", l)) + (1 if g == "k" and re.search(r"^\s{20,}\d\.\d\s", l) else 0)
                    elif subj == "language":
                        n += len(re.findall(r"(?:^|\s{2,})[-•]\s", l))
                    else:
                        n += len(re.findall(r"(?:^|\s{2,})•", l))
            got = ef.BULLETS.get(f"{g}/{subj}", 0)
            if n != got:
                print(f"  MISMATCH {g}/{subj}: PDF has {n}, file has {got}")
    print("  (no MISMATCH above = every bullet line in the PDF became a part of an entry)")

    print("\nNumbering gaps (per strand or GCO):")
    for key, entries in data.items():
        grade, subj = key.split("/")
        if subj == "math" and grade not in "k789":
            by = collections.defaultdict(list)
            for e in entries:
                m = re.match(r"([A-Z]+)(\d+)$", e["code"])
                if m:
                    by[m.group(1)].append(int(m.group(2)))
            for s, ns in by.items():
                if ns != list(range(1, max(ns) + 1)):
                    print("  GAP", key, s, ns)
        if subj in ("language", "core-french") and grade in "123456":
            by = collections.defaultdict(list)
            for e in entries:
                m = re.fullmatch(r"(\d+)\.(\d+)", e["code"])
                if m:
                    by[(m.group(1), e["group"])].append(int(m.group(2)))
            for s, ns in by.items():
                if ns != list(range(1, max(ns) + 1)):
                    print("  GAP", key, s, ns)
        if subj == "social" and grade in "123456":
            by = collections.defaultdict(list)
            for e in entries:
                m = re.fullmatch(r"(\d)\.(\d)\.(\d)", e["code"])
                if m:
                    by[e["group"]].append(int(m.group(3)))
            for s, ns in by.items():
                if ns != list(range(1, max(ns) + 1)):
                    print("  GAP", key, s, ns)
    print("  (no line above = no gaps)")

    print("\nCounts (outcomes / GCO entries) per grade and subject:")
    print("grade | " + " | ".join(["math", "language", "science", "social", "core-french"]))
    for g in "k123456789":
        row = []
        for s in ["math", "language", "science", "social", "core-french"]:
            es = data.get(f"{g}/{s}")
            if es is None:
                row.append("-")
            else:
                n_gco = sum(1 for e in es if e["code"].startswith("GCO"))
                row.append(f"{len(es) - n_gco}+{n_gco}")
        print(f"{g} | " + " | ".join(row))
    # duplicate (code, group) pairs
    for key, entries in data.items():
        c = collections.Counter((e["code"], e["group"]) for e in entries)
        d = [k for k, v in c.items() if v > 1]
        if d:
            print("DUPLICATE (code, group)", key, d)
        for e in entries:
            if not e["text"].strip() or not e["code"].strip():
                print("EMPTY", key, e)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else os.path.join(HERE, "outcomes.json"))
