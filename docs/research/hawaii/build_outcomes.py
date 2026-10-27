"""Builds outcomes.json from Hawaiʻi's content standards (Hawaiʻi State Department of Education; see fetch.sh and
README.md).

Usage: python3 -I build_outcomes.py [source-dir]     (default: ./source)
Reads the committed plain-text copies (the .txt files fetch.sh writes beside each PDF, and the English language arts
Google Doc, which is saved as text), so it needs no PDF library.

Output: {"<grade>/<subject>": [{"idx", "kind", "content"}]} for Kindergarten ("k") to Grade 9 and the subjects math,
language, science and social. Spans are listed under every grade they cover: the science K-2 and 3-5 engineering
expectations under their grades, middle school (MS) under 6, 7 and 8, high school (HS) under 9; English language arts
Grades 9/10 under 9; the high school mathematics and social studies courses under 9.

Codes:
  math      the Hawaiʻi Common Core Standards for Mathematics (HCCS-M, 2026), as printed: "4.NBT.1", "6.EEI.3",
            "8.LR.2"; the high school courses Algebra 1 + Data Analytics ("A1.2.3") and Geometry + Probability
            ("G.1.1"), listed under Grade 9.
  language  the Hawaiʻi Common Core Standards for English Language Arts (2024): grade, strand and number, "4.RL.2",
            "K.RF.3", "2.WF.1", "6.L.1"; Grade 9 cites the Grades 9/10 standards, "9/10.RI.2". A standard's lettered
            parts are joined into its text.
  science   the Next Generation Science Standards performance expectation codes ("4-PS3-2", "MS-LS1-1", "HS-ESS2-4").
  social    the Hawaiʻi Core Standards for Social Studies (HCSSS, 2018) content standards, as printed: "SS.4.1.18.1"
            (grade, theme, anchor standard, number); Grade 7 cites its two courses, Hawaiian History: the Hawaiian
            Kingdom ("SS.7HHK.1.17.1") and Pacific Island Studies ("SS.7PI.1.13.1"); Grade 9 cites the high school
            courses Modern History of Hawaiʻi ("SS.MHH.1.19.1") and Participation in Democracy ("SS.PID.1.17.1"). The
            inquiry standards ("SS.3-5.1.1", "SS.9-12.2.2") are listed under each grade of their band.
"""

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social"]


def fail(message):
    print("error:", message, file=sys.stderr)
    sys.exit(1)


def clean(text):
    text = text.replace("‐", "-").replace("­", "").replace("–", "-").replace("\r", "")
    return re.sub(r"\s+", " ", text).strip()


OUT = OrderedDict((f"{g}/{s}", OrderedDict()) for g in GRADES for s in SUBJECTS)


def add(grade, subject, idx, kind, content):
    entries = OUT[f"{grade}/{subject}"]
    if idx not in entries:
        entries[idx] = {"idx": idx, "kind": kind, "content": clean(content)}


def read(src, name):
    return (src / name).read_text(encoding="utf-8")


# ---------------------------------------------------------------- math
MATH_STD = re.compile(r"^\s*((?:K|[1-8])\.[A-Z]{1,4}\.\d{1,2}|(?:A1|G)\.\d{1,2}\.\d{1,2}):\s+(\S.*?)\s*$")
STOP = re.compile(r"^\s*(Clarifications|Limitations|Examples?|Students should|ʻŌpaʻa|\d{1,3}\s*$)")


def math(src):
    """Hawaiʻi Common Core Standards for Mathematics (HCCS-M), approved by the Board of Education in 2026."""
    lines = read(src, "math.txt").split("\n")
    for i, line in enumerate(lines):
        m = MATH_STD.match(line)
        if not m:
            continue
        idx, content = m.group(1), m.group(2)
        for more in lines[i + 1 : i + 8]:
            if not more.strip() or STOP.match(more) or MATH_STD.match(more):
                break
            content += " " + more.strip()
        head = idx.split(".")[0]
        grade = "9" if head in ("A1", "G") else head.lower()
        kind = "high school standard" if grade == "9" else "standard"
        add(grade, "math", idx, kind, content[:600])


# ---------------------------------------------------------------- English language arts
ELA_CODE = re.compile(r"^\t?(K|[1-8]|9/10|11/12)\.(RL|RI|RF|WF|W|SL|L)\.(\d{1,2})$")


def language(src):
    """Hawaiʻi Common Core Standards for English Language Arts (approved April 2024, reprinted May 2026)."""
    lines = [line.rstrip("\r") for line in read(src, "ela.txt").split("\n")]
    for i, line in enumerate(lines):
        m = ELA_CODE.match(line)
        if not m:
            continue
        band = m.group(1)
        if band == "11/12":
            continue
        parts = []
        for more in lines[i + 1 : i + 14]:
            text = more.strip()
            if ELA_CODE.match(more) or text.startswith(("Integrated ", "Return to Table", "____")) or re.match(r"^(K|\d+|9/10|11/12)\.[A-Z]+\.\d+\.$", text):
                break
            if not text or re.fullmatch(r"[a-z]", text):
                continue
            parts.append(text)
        if not parts or parts[0].startswith("(Not addressed") or parts[0].startswith("(Addressed"):
            continue
        grade = "9" if band == "9/10" else band.lower()
        add(grade, "language", f"{band}.{m.group(2)}.{m.group(3)}", "standard", " ".join(parts)[:600])


# ---------------------------------------------------------------- science
PE = re.compile(r"^\s*((?:K|[1-5]|MS|HS|K-2|3-5)-(?:PS|LS|ESS|ETS)\d-\d+)\.\s+(.*)$")


def science(src):
    """The Next Generation Science Standards (HIDOE's science standards): the performance expectations."""
    lines = read(src, "science.txt").split("\n")
    for i, line in enumerate(lines):
        m = PE.match(line)
        if not m:
            continue
        content = m.group(2)
        for more in lines[i + 1 : i + 6]:
            if "[" in content or not more.strip() or PE.match(more):
                break
            content += " " + more.strip()
        idx, content = m.group(1), re.split(r"\s*\[(?:Clarification|Assessment)", content)[0]
        band = idx.split("-")[0]
        if idx.startswith("K-2-"):
            grades = ["k", "1", "2"]
        elif idx.startswith("3-5-"):
            grades = ["3", "4", "5"]
        elif band == "MS":
            grades = ["6", "7", "8"]
        elif band == "HS":
            grades = ["9"]
        else:
            grades = ["k" if band == "K" else band]
        for g in grades:
            add(g, "science", idx, "performance expectation", content)


# ---------------------------------------------------------------- social studies
SOCIAL_FILES = [
    ("HCSSSgrK.txt", "k"), ("HCSSSgr1.txt", "1"), ("HCSSSgr2.txt", "2"), ("HCSSSgr3.txt", "3"), ("HCSSSgr4.txt", "4"),
    ("HCSSSgr5.txt", "5"), ("HCSSSgr6WorldHist.txt", "6"), ("HCSSSHawaiianKingdom.txt", "7"),
    ("HCSSSPacificIslandStudies.txt", "7"), ("HCSSSgr8USHist.txt", "8"), ("HCSSSModernHistoryHawaii.txt", "9"),
    ("HCSSSDemocracy.txt", "9"),
]
CONTENT = re.compile(r"Content Standard (SS\.[0-9A-Z]+\.\d+\.\d+\.\d+)")
INQUIRY = re.compile(r"Inquiry Standard (SS\.(?:K-2|3-5|6-8|9-12)\.\d+\.\d+)")
END = re.compile(r"^\s*(Theme \d|Sample Compelling|Questions\s|\d{1,3}\s*$)|^(History|Geography|Civics|Economics)\s")


def social(src):
    """Hawaiʻi Core Standards for Social Studies (HCSSS, 2018): the content and inquiry standards."""
    for name, grade in SOCIAL_FILES:
        lines = read(src, name).split("\n")
        for i, line in enumerate(lines):
            m = INQUIRY.search(line)
            if m:
                col = line.index("Inquiry Standard")
                text = []
                for more in lines[i + 1 : i + 5]:
                    piece = more[col - 2 :].strip() if len(more) > col - 2 else ""
                    if not piece or INQUIRY.search(more) or "Anchor Standard" in more or more[:col].strip().startswith("Theme"):
                        break
                    text.append(piece)
                add(grade, "social", m.group(1), "inquiry standard", " ".join(text))
                continue
            m = CONTENT.search(line)
            if not m:
                continue
            col = line.index("Content Standard")
            text = []
            for more in lines[i + 1 : i + 9]:
                if CONTENT.search(more) or INQUIRY.search(more) or END.match(more):
                    break
                # The description column starts under "Content Standard"; the sample-content column follows after a
                # run of spaces, and a topic that runs long can touch the description from the left.
                piece = more[col - 2 :] if len(more) > col - 2 else ""
                if len(more) > col - 2 and col >= 3 and more[col - 3] != " " and piece[:1] != " ":
                    piece = piece.split(" ", 1)[1] if " " in piece else ""
                piece = re.split(r"\s{2,}|•", piece.strip())[0].strip()
                if piece:
                    text.append(piece)
                elif text:
                    break
            add(grade, "social", m.group(1), "content standard", " ".join(text))
    for g in GRADES:
        if not any(e["kind"] == "content standard" for e in OUT[f"{g}/social"].values()):
            fail(f"no social studies content standards for grade {g}")


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "source"
    math(src)
    language(src)
    science(src)
    social(src)
    out = OrderedDict((key, list(entries.values())) for key, entries in OUT.items())
    for key, entries in out.items():
        if not entries:
            fail(f"no standards for {key}")
    path = Path(__file__).parent / "outcomes.json"
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print(f"Wrote {sum(len(e) for e in out.values())} entries to {path}")


if __name__ == "__main__":
    main()
