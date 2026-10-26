"""Builds outcomes.json from the Mississippi College- and Career-Readiness Standards (see fetch.sh and README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Reads the plain-text copies (pdftotext -layout) that fetch.sh writes beside each PDF.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. High school courses are listed under Grade 9.

Codes, as the documents print them in their "Identifier" column:
  math      the 2025 Mississippi College- and Career-Readiness Standards for Mathematics: grade, domain and number,
            "K.CC.1", "4.NBT.5", with a letter where the 2025 revision split a standard ("1.MD.3a", "2.MD.8b"),
            and the Standards for Mathematical Practice as "4.SMP.1". Grade 9 cites the Algebra I
            course, whose codes are the high school conceptual categories, "N-RN.3", "A-SSE.1", "F-IF.4", "S-ID.6"
            (and "A.SMP.1" for its practices); only codes printed inside the Algebra I course are listed.
  language  the 2025 Mississippi College- and Career-Readiness Standards for English Language Arts: strand, grade and
            number, "RL.4.2", "RF.1.3", "L.5.4". Grade 9 cites English I, "RL.9.2", "W.9.1". The Kindergarten
            informational text page prints RI.K.7 to RI.K.9 as "RL.K.7" to "RL.K.9"; they are read as RI.
  science   the 2026 Mississippi College- and Career-Readiness Standards for Science (effective 2026-2027): domain
            (L life, P physical, E earth and space), grade, standard (with a letter where a standard has parts) and
            performance objective, "L.4.1.2", "P.4.6A.1", "E.6.8A.3"; the standard itself, "L.4.1", "P.4.6A", is
            listed too. Grade 9 cites Biology ("BIO.1A.2") and Physical Science ("PHS.3.2").
  social    the 2022 Mississippi College- and Career-Readiness Standards for the Social Studies (filed January 2023):
            Kindergarten to Grade 3 grade, strand (CI civics, E economics, CR civil rights, G geography, H history) and
            number, "K.CI.1", "3.G.2"; Grade 4 "4.MS.1"; Grades 5 to 8 grade and number, "5.3", "8.10" (the document
            prints "6. 3" and "6. 4" with a space; they are read as 6.3 and 6.4). Grade 9 cites the traditional ninth
            grade pair of half-credit courses, Mississippi Studies ("MS.4") and Introduction to Geography ("ITG.6").
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]
OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    text = text.replace("​", " ").replace(" ", " ").replace("‐", "-").replace("‑", "-")
    return re.sub(r"\s+", " ", text).strip()


def add(grade, subject, idx, kind, content):
    entries = OUT[f"{grade}/{subject}"]
    if idx not in entries:
        entries[idx] = {"idx": idx, "kind": kind, "content": clean(content)[:600]}


def grade_of(code):
    return "k" if code.upper().startswith("K") else code.split(".")[0]


FOOTER = re.compile(r"2025 MS CCR Standards|MDE: Office of Curriculum|^\s*\d{1,3}\s*$|^\s*(GRADE \d|KINDERGARTEN|ALGEBRA I)\s*$")


def blocks(lines):
    """Runs of non-blank lines (a table row in the identifier/standard layout), with page furniture left out."""
    out, cur = [], []
    for line in lines:
        if not line.strip() or FOOTER.search(line):
            if cur:
                out.append(cur)
            cur = []
        else:
            cur.append(line)
    if cur:
        out.append(cur)
    return out


def table_rows(lines, code_re):
    """(code, text) for each row whose identifier column holds a code; the text is the rest of the row."""
    rows = []
    for block in blocks(lines):
        found = [(i, m) for i, line in enumerate(block) if (m := code_re.match(line))]
        if len(found) != 1:
            # Rows in the same block each start with their own code (practices, short standards): split on the codes.
            for n, (i, m) in enumerate(found):
                end = found[n + 1][0] if n + 1 < len(found) else len(block)
                text = " ".join([block[i][m.end():]] + block[i + 1:end])
                rows.append((m.group(1), text))
            continue
        i, m = found[0]
        text = " ".join(block[:i] + [block[i][m.end():]] + block[i + 1:])
        rows.append((m.group(1), text))
    return rows


# ---------------------------------------------------------------- math
MATH_CODE = re.compile(r"^\s{0,4}((?:K|[1-8])\.(?:CC|OA|NBT|NF|MD|G|RP|NS|EE|F|SP|SMP)\.\d{1,2}[a-z]?|A\.SMP\.\d|[NAFS]-(?:RN|Q|SSE|APR|CED|REI|IF|BF|LE|ID)\.\d{1,2})(?=\s|$)")


def math(src):
    lines = (src / "math-2025.txt").read_text(encoding="utf-8").replace("\f", "\n").split("\n")
    # The course chapters start at "CCR Math Kindergarten"; the table of contents comes first.
    start = next(i for i, line in enumerate(lines) if line.strip() == "CCR Math Kindergarten" and i > 200)
    alg = next(i for i, line in enumerate(lines) if line.strip() == "CCR Algebra I" and i > start)
    alg_end = next(i for i, line in enumerate(lines) if re.match(r"^CCR (Geometry|Algebra II)\s*$", line.strip()) and i > alg)
    # Grades K-8 (and the compacted courses, whose grade codes repeat ones already read).
    for code, text in table_rows(lines[start:alg], MATH_CODE):
        if "-" in code or code.startswith("A."):
            continue
        add(grade_of(code), "math", code, "practice" if ".SMP." in code else "standard", text)
    for code, text in table_rows(lines[alg:alg_end], MATH_CODE):
        if "-" in code or code.startswith("A."):
            add("9", "math", code, "practice" if ".SMP." in code else "high school standard", text)


# ---------------------------------------------------------------- English language arts
ELA_CODE = re.compile(r"^\s{0,4}((?:RL|RI|RF|W|SL|L)\.(?:K|[1-9])\.\d{1,2}[a-z]?)(?=\s|$)")


def language(src):
    lines = (src / "ela-2025.txt").read_text(encoding="utf-8").replace("\f", "\n").split("\n")
    # The appendices (glossary, and the 2016 and 2025 comparison guide with its split "RF.K.3a" rows) are not standards.
    end = next(i for i, line in enumerate(lines) if line.strip() == "Appendix A: Glossary" and i > 1000)
    # Each strand starts with its heading ("Reading Informational Text (RI)"). The Kindergarten informational text page
    # prints RI.K.7 to RI.K.9 as "RL.K.7" to "RL.K.9"; under the RI heading they are read as RI.
    fixed, strand = [], None
    for line in lines[:end]:
        h = re.search(r"\((RL|RI|RF|W|SL|L)\)\s*$", line)
        if h:
            strand = h.group(1)
        if strand == "RI" and ELA_CODE.match(line) and line.lstrip().startswith("RL.K."):
            line = line.replace("RL.K.", "RI.K.", 1)
        fixed.append(line)
    for code, text in table_rows(fixed, ELA_CODE):
        if text.strip().startswith(("Not applicable", "Begins in grade")):
            continue
        add(grade_of(code.split(".", 1)[1]), "language", code, "standard", text)


# ---------------------------------------------------------------- science
SCI_CODE = re.compile(r"^\s{0,6}((?:[LPE]\.(?:K|[1-8])\.\d{1,2}[A-Z]?|(?:BIO|PHS)\.\d{1,2}[A-Z]?)(?:\.\d{1,2})?)(?=\s|$)")


def science(src):
    lines = (src / "science-2026.txt").read_text(encoding="utf-8").replace("\f", "\n").split("\n")
    start = next(i for i, line in enumerate(lines) if line.strip() == "Kindergarten" and i > 150)
    course = None
    current = None
    for line in lines[start:]:
        head = line.strip()
        if re.match(r"^(Biology|Physical Science|Botany|Chemistry|Earth and Space Science|Environmental Science|"
                    r"Foundations of Biology|Foundations of Science Literacy|Genetics|Human Anatomy and Physiology|"
                    r"Marine and Aquatic Science I & II|Physics|Zoology I and II|Appendix A)$", head):
            course = head
        if FOOTER.search(line) or not head:
            current = None
            continue
        m = SCI_CODE.match(line)
        if m and not line[0].isspace():
            # A strand heading at the margin ("L.4.1 : Hierarchical Organization", "P.6.6 Motions, Forces, and Energy");
            # the standard itself follows in the identifier column.
            current = None
            continue
        if m:
            code = m.group(1)
            hs = code.startswith(("BIO", "PHS"))
            if hs and course not in ("Biology", "Physical Science"):
                current = None
                continue
            grade = "9" if hs else grade_of(code.split(".", 1)[1])
            kind = "objective" if code.count(".") == (2 if hs else 3) else "standard"
            add(grade, "science", code, kind, line[m.end():])
            current = (grade, code)
        elif current and re.match(r"^\s{8,}\S", line) and not head.startswith(("Identifier", "Conceptual")):
            entry = OUT[f"{current[0]}/science"][current[1]]
            if len(entry["content"]) < 600:
                entry["content"] = clean(entry["content"] + " " + head)
        else:
            current = None


# ---------------------------------------------------------------- social studies
SOC_CODE = re.compile(r"^\s{0,8}((?:K|[1-3])\.(?:CI|E|CR|G|H)\.\d{1,2}|4\.MS\.\d{1,2}|[5-8]\. ?\d{1,2}|MS\.\d{1,2}|ITG\.\d{1,2})(?=\s|$)")


def social(src):
    lines = (src / "social-2022.txt").read_text(encoding="utf-8").replace("\f", "\n").split("\n")
    start = next(i for i, line in enumerate(lines) if line.strip() == "Citizenship at Home and School" and i > 400)
    # Grade 7 Compacted repeats Grade 7 and Grade 8 content under "7C." codes; its codes aren't read.
    for line in lines[start:]:
        m = SOC_CODE.match(line)
        if not m:
            continue
        code = m.group(1).replace(" ", "")
        if code.startswith(("MS.", "ITG.")):
            grade = "9"
        elif code.startswith("4.MS"):
            grade = "4"
        else:
            grade = grade_of(code)
        # The left column holds the standard; the right column (from about the 40th character) the objectives.
        left = line[m.end():40].strip()
        add(grade, "social", code, "standard", "" if re.match(r"^\d", left) else left)
    # The standard's own words sit in the left column on the lines around the code; read them a second time.
    codes = [(i, SOC_CODE.match(line)) for i, line in enumerate(lines)]
    marks = [(i, m.group(1).replace(" ", "")) for i, m in codes if m and i > start]
    for n, (i, code) in enumerate(marks):
        end = marks[n + 1][0] if n + 1 < len(marks) else min(len(lines), i + 30)
        words = []
        for line in lines[i:end]:
            if FOOTER.search(line) or line.strip().startswith(("Standard", "Objectives")):
                continue
            if re.match(r"^(Grade \d|Carnegie Unit|Mississippi Studies|Introduction to Geography|World History|U\.?S\.? History|United States History)\b", line.strip()):
                break
            left = re.split(r"\s{3,}", line.strip())[0] if not re.match(r"^\s{20,}", line) else ""
            if re.match(r"^\d+\.", left) or left == code or left.replace(" ", "") == code:
                continue
            if re.fullmatch(r"(CIVICS|ECONOMICS|CIVIL RIGHTS|GEOGRAPHY|HISTORY)( Continued)?", left):
                continue
            words.append(left)
        grade = "9" if code.startswith(("MS.", "ITG.")) else ("4" if code.startswith("4.MS") else grade_of(code))
        entry = OUT[f"{grade}/social"].get(code)
        if entry is not None and not entry["content"]:
            entry["content"] = clean(" ".join(w for w in words if w))[:400]


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent / "source"
    math(src)
    language(src)
    science(src)
    social(src)
    for key, entries in OUT.items():
        if not entries:
            fail(f"no standards read for {key}")
    out = {key: list(entries.values()) for key, entries in OUT.items()}
    path = Path(__file__).resolve().parent / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(", ".join(f"{k} {len(v)}" for k, v in out.items()))


if __name__ == "__main__":
    main()
