#!/usr/bin/env python3
"""Adds the Saskatchewan French outcomes to outcomes.json.

Sources (Ministry of Education):
  Core French 1 to 9:      https://curriculum.gov.sk.ca/CurriculumOutcomeContent?id=395..403
  Francais en immersion 3 to 9:  https://progetudes.gov.sk.ca/CurriculumOutcomeContent?id=268..274
  Programme d'etudes interdisciplinaire (immersion Kindergarten, 1, 2): ids 407, 408, 409 (same site)

Run: python3 build_french_outcomes.py   (needs network access; writes outcomes.json next to this file)

Core French outcomes go in subject "core-french" for the grade whose number equals the Core French level.
Immersion outcomes go in subject "immersion". The Ministry's pages contain a few typos in outcome codes
(4.CE.2, 5.CE.1, 6VC.1 without a dot); these are normalized to grade.STRAND.number.
"""
import html
import json
import os
import re
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
EN = "https://curriculum.gov.sk.ca/CurriculumOutcomeContent?id="
FR = "https://progetudes.gov.sk.ca/CurriculumOutcomeContent?id="


def fetch(url):
    with urllib.request.urlopen(url, timeout=90) as r:
        return r.read().decode("utf-8")


def lines(h):
    h = re.sub(r"<script.*?</script>|<style.*?</style>", "", h, flags=re.S)
    h = re.sub(r"</(p|li|div|h\d|tr|td|span)>", "\n", h)
    t = html.unescape(re.sub(r"<[^>]+>", " ", h))
    return [re.sub(r"\s+", " ", l).strip() for l in t.split("\n") if l.strip()]


def parse(h, marker, code_re, goal_clean, themes=False):
    L = lines(h)
    start = next(k for k, l in enumerate(L) if l.startswith(marker)) - 1
    groups, cur, code, txt, prev = [], None, None, [], ""

    def flush(last=False):
        nonlocal code, txt
        if code and cur is not None:
            if last and themes:
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
            cur["outcomes"].append({"code": code, "text": t})
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


def fr_goal(s):
    return s.replace("''", "'")


def norm_code(c):
    c = c.replace("CE.", "CÉ.").replace("PE.", "PÉ.")
    return re.sub(r"^(\d)([A-ZÉ]{2,3})\.", r"\1.\2.", c)


CORE_CODE = re.compile(r"^\d\.(CS|GL|LK|C)\.\d+$")
FR_CODE = re.compile(r"^(?:\d\.?[A-ZÉ]{2,3}\.\d+|(?:É|AP)-[A-Z]{1,2}\.\d+)$")


def main():
    path = os.path.join(HERE, "outcomes.json")
    data = json.load(open(path, encoding="utf-8"))
    for level, cid in zip("123456789", range(395, 404)):
        data[level]["core-french"] = parse(fetch(EN + str(cid)), "Outcomes:", CORE_CODE, core_goal)
    for g, cid in [("3", 268), ("4", 269), ("5", 270), ("6", 271), ("7", 272), ("8", 273), ("9", 274), ("k", 407), ("1", 408), ("2", 409)]:
        groups = parse(fetch(FR + str(cid)), "Résultats d’apprentissage", FR_CODE, fr_goal, themes=True)
        for grp in groups:
            for o in grp["outcomes"]:
                o["code"] = norm_code(o["code"])
        data[g]["immersion"] = groups
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=1, ensure_ascii=False)


if __name__ == "__main__":
    main()
