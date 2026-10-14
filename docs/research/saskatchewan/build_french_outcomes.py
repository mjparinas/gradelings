#!/usr/bin/env python3
"""Adds the Saskatchewan French outcomes to outcomes.json.

Sources (Ministry of Education):
  Core French 1 to 9:      https://curriculum.gov.sk.ca/CurriculumOutcomeContent?id=395..403
  Francais en immersion 3 to 9:  https://progetudes.gov.sk.ca/CurriculumOutcomeContent?id=268..274
  Programme d'etudes interdisciplinaire (immersion Kindergarten, 1, 2): ids 407, 408, 409 (same site)

Run: python3 -I build_french_outcomes.py [dir]   reads the pages fetch.sh saved in dir (default ./source)
     python3 -I build_french_outcomes.py --live    downloads the pages from the Ministry instead
Either way it rewrites the French entries of outcomes.json next to this file and src/content/saskatchewan/french-outcomes.ts.

Core French outcomes go in subject "core-french" for the grade whose number equals the Core French level.
Immersion outcomes go in subject "immersion". The Ministry's pages contain a few typos in outcome codes
(4.CE.2, 5.CE.1, 6VC.1 without a dot); these are normalized to grade.STRAND.number.
"""
import html
import json
import os
import re
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
EN = "https://curriculum.gov.sk.ca/CurriculumOutcomeContent?id="
FR = "https://progetudes.gov.sk.ca/CurriculumOutcomeContent?id="


def fetch(url):
    with urllib.request.urlopen(url, timeout=90) as r:
        return r.read().decode("utf-8")


def page(src, base, cid, name):
    """The saved page html/<name>.html from fetch.sh, or the live page with --live (src is None)."""
    if src is None:
        return fetch(base + str(cid))
    with open(os.path.join(src, "html", name + ".html"), encoding="utf-8") as f:
        return f.read()


def lines(h):
    h = re.sub(r"<script.*?</script>|<style.*?</style>", "", h, flags=re.S)
    h = re.sub(r"</(p|li|div|h\d|tr|td|span)>", "\n", h)
    t = html.unescape(re.sub(r"<[^>]+>", " ", h))
    return [re.sub(r"\s+", " ", l).strip() for l in t.split("\n") if l.strip()]


def parse(h, marker, code_re, goal_clean, with_themes=False):
    L = lines(h)
    start = next(k for k, l in enumerate(L) if l.startswith(marker)) - 1
    groups, cur, code, txt, prev = [], None, None, [], ""

    def flush(last=False):
        nonlocal code, txt
        if code and cur is not None:
            if last and with_themes:
                # The theme titles follow the last outcome on the page; keep them apart from its text.
                themes = []
                while txt and not re.search(r"[.;:]$", txt[-1]):
                    themes.insert(0, txt.pop())
                if themes:
                    cur["themes"] = themes
            t = " ".join(txt).strip()
            t = re.sub(r"(\s*\[[A-Z]+\])+\s*$", "", t)
            t = re.sub(r"\s*\(\[?[A-Z, \[\]]+\]?\)\s*$", "", t)
            t = re.sub(r"(\s*\[[A-Z]+\])+\s*$", "", t).strip()
            cur["outcomes"].append({"code": code, "text": fix(t)})
        code, txt = None, []

    for l in L[start:]:
        if l.startswith("STaNS@"):
            break
        if l.startswith(marker):
            if code and txt and txt[-1] == prev:
                txt.pop()
            flush()
            cur = {"name": goal_clean(prev), "outcomes": []}
            groups.append(cur)
            continue
        if len(l) < 14 and code_re.match(l):
            flush()
            code, prev = l, l
            continue
        if code and not re.fullmatch(r"\([A-Z]+(, ?[A-Z]+)*\)", l):
            txt.append(l)
        prev = l
    flush(last=True)
    return groups


def core_goal(s):
    s = s.replace("Goal :", "").strip()
    for name in ("Communication Skills", "General Language Strategies", "Language Knowledge", "Culture"):
        if s.startswith(name):
            return name
    return s


def fix(s):
    """The Ministry's French pages show the ligature in 'oeuvre' as a stray character."""
    return s.replace("¿u", "œu")


def fr_goal(s):
    return s.replace("''", "'")


def norm_code(c):
    c = c.replace("CE.", "CÉ.").replace("PE.", "PÉ.")
    return re.sub(r"^(\d)([A-ZÉ]{2,3})\.", r"\1.\2.", c)


CORE_CODE = re.compile(r"^\d\.(CS|GL|LK|C)\.\d+$")
FR_CODE = re.compile(r"^(?:\d\.?[A-ZÉ]{2,3}\.\d+|(?:É|AP)-[A-Z]{1,2}\.\d+)$")


def short(text, limit=150):
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0].rstrip(",;:")
    return cut + "…"


def overview(groups):
    """One line per strand, shown to parents as the course overview (same style as outcomes.ts)."""
    out = []
    for g in groups:
        codes = [o["code"] for o in g["outcomes"]]
        span = codes[0] if len(codes) == 1 else f"{codes[0]}–{codes[-1]}"
        body = " ".join(short(o["text"]) for o in g["outcomes"][:3])
        more = f" (and {len(codes) - 3} more outcomes)" if len(codes) > 3 else ""
        out.append(f"{g['name']} ({span}): {body}{more}")
    return out


def write_ts(data):
    path = os.path.join(HERE, "..", "..", "..", "src", "content", "saskatchewan", "french-outcomes.ts")
    lines = [
        "// Generated by docs/research/saskatchewan/build_french_outcomes.py from docs/research/saskatchewan/outcomes.json",
        "// (Core French 1 to 9 and Français en immersion, Saskatchewan Ministry of Education). One line per strand, shown",
        "// to parents as the course overview. Do not edit by hand.",
        "",
        'import type { GradeId } from "../types";',
        "",
        "export const SK_FRENCH_OUTCOMES: Partial<Record<GradeId, { immersion?: string[]; \"core-french\"?: string[] }>> = {",
    ]
    for g in "k123456789":
        lines.append(f'  "{g}": {{')
        for subject in ("immersion", "core-french"):
            if subject in data[g]:
                lines.append(f'    "{subject}": {json.dumps(overview(data[g][subject]), ensure_ascii=False, indent=6)[:-1]}    ],'.replace("[\n", "[\n", 1))
        lines.append("  },")
    lines.append("};")
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    src = None if "--live" in sys.argv else (args[0] if args else os.path.join(HERE, "source"))
    path = os.path.join(HERE, "outcomes.json")
    data = json.load(open(path, encoding="utf-8"))
    for level, cid in zip("123456789", range(395, 404)):
        data[level]["core-french"] = parse(page(src, EN, cid, f"core-french_{level}"), "Outcomes:", CORE_CODE, core_goal)
    for g, cid in [("3", 268), ("4", 269), ("5", 270), ("6", 271), ("7", 272), ("8", 273), ("9", 274), ("k", 407), ("1", 408), ("2", 409)]:
        groups = parse(page(src, FR, cid, f"immersion_{g}"), "Résultats d’apprentissage", FR_CODE, fr_goal, with_themes=True)
        for grp in groups:
            for o in grp["outcomes"]:
                o["code"] = norm_code(o["code"])
        data[g]["immersion"] = groups
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=1, ensure_ascii=False)
    write_ts(data)


if __name__ == "__main__":
    main()
