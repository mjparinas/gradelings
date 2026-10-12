"""Build outcomes.json for Prince Edward Island from the PDFs in source/.

Usage (from this folder):
    mkdir -p /tmp/claude-0/pei-extract && for f in source/*.pdf; do pdftotext -layout "$f" /tmp/claude-0/pei-extract/$(basename "$f" .pdf).txt; done
    python3 -I build_outcomes.py /tmp/claude-0/pei-extract > outcomes.json

Sources:
  Kindergarten to Grade 6   eelc_outcomes_framework_<grade>.pdf (parsed by extract_frameworks.py)
  Grade 9 mathematics       eelc_math_9_5.pdf (the "Specific Curriculum Outcomes" list pages)
  Grade 9 social studies    eelc_socialstudies_9.pdf (the SCO block on each outcome's page; GCOs from Table 1)
  Grades 7-9 science, social studies, core French, Grade 7-8 mathematics placeholders
                            intermediate_program_of_studies_and_authorized_materials.pdf
  English language arts and science GCOs for Grades 7-9 are the Grade 6 framework's statements (the PEI GCOs are the same K-12 statements;
  the Grade 7-9 guides are not in the repository).
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import extract_frameworks as ef  # noqa: E402

GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
SUBJECTS = ["math", "language", "science", "social", "core-french"]
STRANDS = ["Number", "Patterns and Relations", "Shape and Space", "Statistics and Probability"]
SOCIAL_GCOS = ef.SOCIAL_GCOS
PR2_TEXT = ("Model and solve problems using linear equations of the form: ax = b; x/a = b, a ≠ 0; ax + b = c; x/a + b = c, a ≠ 0; "
            "ax = b + cx; a(x + b) = c; ax + b = cx + d; a(bx + c) = d(ex + f); a/x = b, x ≠ 0; "
            "where a, b, c, d, e and f are rational numbers.")


def grade9_math(text):
    """The list pages print each outcome as '9.N1 – statement' (eight spaces of indent) followed by '•' sub-points."""
    out, cur = [], None
    for line in text.split("\n"):
        m = re.match(r"^ {8}(9\.(?:N|SS)\d+|PR\d+) – (.*)$", line)
        if m:
            code = m.group(1) if m.group(1).startswith("9.") else "9." + m.group(1)
            cur = {"code": code, "parts": [m.group(2).strip()]}
            out.append(cur)
            continue
        if cur is None:
            continue
        if not line.strip():
            cur = None
        elif re.match(r"^\s{8,}•", line):
            cur["parts"].append(line.strip().lstrip("• ").strip())
        elif re.match(r"^\s{8,}\S", line):
            cur["parts"][-1] = ef.join(cur["parts"][-1], line.strip(), "9/math")
        else:
            cur = None
    res = []
    for o in out:
        strand = {"N": "Number", "PR": "Patterns and Relations", "SS": "Shape and Space"}[re.search(r"\.([A-Z]+)", o["code"]).group(1)]
        t = ef.parts_text(o["parts"])
        if o["code"] == "9.PR2":
            t = PR2_TEXT
        res.append({"code": o["code"], "group": strand, "text": t})
    return res


def grade9_social(text):
    lines = text.split("\n")
    unit_of = {}
    for c in ("DT1", "DT2", "DT3", "DT4"):
        unit_of[c] = "Disciplinary Thinking"
    for c, u in (((1, 2), "Geographical Information"), ((3, 4), "Population"), ((5, 6), "Sustainability"),
                 ((7, 8), "Globalization"), ((9, 10, 11), "Global Citizenship"), ((12, 13), "Social Action")):
        for n in c:
            unit_of[f"SCO{n}"] = u
    out, i = [], 0
    while i < len(lines):
        if re.match(r"^\s+Learners are expected to \.\.\.\s*$", lines[i]):
            j, block = i + 1, []
            while j < len(lines) and "Remembering" not in lines[j]:
                block.append(lines[j])
                j += 1
            code, parts = None, []
            for b in block:
                if not b.strip():
                    continue
                m = re.match(r"^\s+(DT\d|SCO\d+)\s{2,}(.*)$", b) or re.match(r"^\s+(DT\d|SCO\d+)\s*$", b)
                if m:
                    code = m.group(1)
                    if m.lastindex and m.lastindex > 1 and m.group(2).strip():
                        parts.append(m.group(2).strip())
                else:
                    parts.append(b.strip())
            if code and not any(o["code"] == code for o in out):
                s = ""
                for part in parts:
                    s = ef.join(s, part, "9/social")
                out.append({"code": code, "group": unit_of[code], "text": ef.clean(s)})
            i = j
        i += 1
    return out


def grade9_social_gco(text):
    lines = text.split("\n")
    start = next(i for i, l in enumerate(lines) if l.startswith("Table 1. Program Area General Curriculum Outcomes"))
    out, cur = {}, None
    for l in lines[start + 2:start + 40]:
        if "(SEPT 2025)" in l:
            break
        st = l.strip()
        if not st:
            continue
        if st in SOCIAL_GCOS:
            cur = st
            out[cur] = []
            continue
        if cur is None:
            continue
        st = re.sub(r"^GCO \d+\s*", "", st)
        if st:
            out[cur].append(st)
    res = []
    for k in SOCIAL_GCOS:
        s = ""
        for part in out[k]:
            s = ef.join(s, part, "9/social-gco")
        res.append({"code": "GCO: " + k, "group": k, "text": ef.clean(s)})
    return res


def build(folder):
    fw = ef.extract(folder)
    gco = fw["_gco"]
    out = {}

    def put(grade, subj, entries):
        out.setdefault(f"{grade}/{subj}", []).extend(entries)

    for g in ["k", "1", "2", "3", "4", "5", "6"]:
        for s in SUBJECTS:
            key = f"{g}/{s}"
            if key not in fw:
                continue
            entries = list(fw[key])
            gs = gco.get(key, {})
            if s == "language" or s == "core-french":
                entries += [{"code": c, "group": v["group"], "text": v["text"]} for c, v in sorted(gs.items(), key=lambda kv: int(kv[0].split()[1]))]
            elif s == "science":
                entries += [{"code": c, "group": v["group"], "text": v["text"]} for c, v in sorted(gs.items()) if c in ("GCO 1", "GCO 2", "GCO 3")]
            elif s == "social":
                entries += [{"code": "GCO: " + n, "group": n, "text": gs["GCO: " + n]["text"]} for n in SOCIAL_GCOS if "GCO: " + n in gs]
            put(g, s, entries)

    inter = open(os.path.join(folder, "intermediate_program_of_studies_and_authorized_materials.txt"), encoding="utf8").read()
    for g in ("7", "8"):
        put(g, "math", [{"code": n, "group": n, "text": f"Grade {g} mathematics strand (outcomes are in the Grade {g} guide, which is not in the repository)"} for n in STRANDS])
    put("9", "math", grade9_math(open(os.path.join(folder, "eelc_math_9_5.txt"), encoding="utf8").read()))

    for g in ("7", "8", "9"):
        put(g, "language", [{"code": c, "group": v["group"], "text": v["text"]} for c, v in
                            sorted(gco["6/language"].items(), key=lambda kv: int(kv[0].split()[1]))])
    src = "Unit named in the PEI Intermediate Program of Studies (2022-2023)"
    for g, names in (("7", ["Interactions with Ecosystems", "Earth’s Crust", "Heat", "Mixtures and Solutions"]),
                     ("8", ["Water Systems", "Fluids", "Optics", "Cells, Tissues, Organs, and Systems"]),
                     ("9", ["Biodiversity & Sustainability of Ecosystems", "Patterns in Atoms, Elements, and Compounds", "Understanding Electricity"])):
        put(g, "science", [{"code": n, "group": "", "text": src} for n in names])
        put(g, "science", [{"code": c, "group": v["group"], "text": v["text"]} for c, v in sorted(gco["6/science"].items()) if c in ("GCO 1", "GCO 2", "GCO 3")])

    ps = "(Intermediate Program of Studies)"
    put("7", "social", [
        {"code": "Economic empowerment", "group": "", "text": f"Empowerment and disempowerment in Canada, 1830-1920: the economic context {ps}"},
        {"code": "Political empowerment", "group": "", "text": f"Empowerment and disempowerment in Canada, 1830-1920: the political context {ps}"},
        {"code": "Cultural empowerment", "group": "", "text": f"Empowerment and disempowerment in Canada, 1830-1920: the cultural context {ps}"},
        {"code": "Societal empowerment", "group": "", "text": f"Empowerment and disempowerment in Canada, 1830-1920: the societal context {ps}"},
        {"code": "National empowerment", "group": "", "text": f"Empowerment and disempowerment in Canada, 1830-1920: the national context {ps}"},
    ])
    put("8", "social", [
        {"code": "Canadian identity", "group": "", "text": f"Canadian identity and its cultural, political and societal roots, from the 1920s to present-day Canada {ps}"},
        {"code": "Geographic influences", "group": "", "text": f"Canadian identity explored through geographic influences {ps}"},
        {"code": "Decades of change", "group": "", "text": f"Canadian identity explored through decades of change {ps}"},
        {"code": "Citizenship", "group": "", "text": f"Canadian identity explored through citizenship {ps}"},
        {"code": "Culminating project", "group": "", "text": f"A project-based expression of their own understanding of Canadian identity, presented in the final weeks {ps}"},
    ])
    soc9 = open(os.path.join(folder, "eelc_socialstudies_9.txt"), encoding="utf8").read()
    put("9", "social", grade9_social(soc9) + grade9_social_gco(soc9))

    for g in ("7", "8", "9"):
        put(g, "core-french", [{"code": "Core French 7-9", "group": "",
                                "text": "Intermediate Core French (Français de base 7e, 8e, 9e, 2017) is not in the repository; the program of studies says it is function-driven and based on action-oriented tasks"}])

    ordered = {}
    for g in GRADES:
        for s in SUBJECTS:
            if f"{g}/{s}" in out:
                ordered[f"{g}/{s}"] = out[f"{g}/{s}"]
    return ordered


if __name__ == "__main__":
    json.dump(build(sys.argv[1]), sys.stdout, ensure_ascii=False, indent=1)
    sys.stdout.write("\n")
