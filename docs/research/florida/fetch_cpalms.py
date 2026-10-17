"""Downloads Florida's benchmarks from CPALMS (cpalms.org, the Department of Education's standards site) and writes one
text file per subject into a folder, a benchmark per line: `CODE<TAB>text<TAB>date adopted or last revised`, in the order
the site lists them. The PDF books next to them are the Department's own documents; these files give each benchmark's
code and words cleanly (a PDF page prints a benchmark's words above, beside or below its code), and CPALMS is the only
place the science standards (the Next Generation Sunshine State Standards) are published in full. The script walks the
site's own standards tree: subject, grade, body of knowledge, big idea, benchmarks.
Usage: python3 -I fetch_cpalms.py OUTDIR"""
import html
import re
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

BASE = "https://www.cpalms.org/Search/"
# CPALMS subject ids (GetTreeSubjectsForStandard).
SUBJECTS = {"math": 86, "ela": 87, "science": 29, "social": 32}


def get(path, **params):
    url = BASE + path + "?" + "&".join(f"{k}={v}" for k, v in params.items())
    last = None
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=90) as r:
                return r.read().decode("utf-8")
        except Exception as e:  # network hiccup: retry
            last = e
            time.sleep(2 * (attempt + 1))
    raise last


def clean(s):
    return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s))).strip()


def benchmarks(subject, grade, bok, idea):
    page = get("GetTreeBenchmarksForStandard", SubjectAreaId=subject, GradelevelId=grade, BokId=bok, IdeaId=idea)
    rows = []
    for card in page.split('class="card custom-standard-cards')[1:]:
        code = re.search(r'<h5 class="card-title[^>]*>(.*?)</h5>', card, re.S)
        text = re.search(r'<p class="card-text trim-text"[^>]*>(.*?)</p>', card, re.S)
        date = re.search(r"Date Adopted or Last Revised:\s*([0-9/]+)", card)
        if code and text:
            rows.append("\t".join([clean(code.group(1)), clean(text.group(1)), date.group(1) if date else ""]))
    return rows


def subject_rows(subject):
    jobs = []
    grades = re.findall(r"LoadTreeBoks\('%d', '(\d+)'\)" % subject, get("GetTreeGradeLevelsForStandard", SubjectAreaId=subject))
    for g in grades:
        boks = re.findall(r"LoadTreeIdeas\('%d', '%s', '(\d+)'\)" % (subject, g), get("GetTreeBoksForStandard", SubjectAreaId=subject, GradelevelId=g))
        for b in boks:
            ideas = re.findall(r"LoadTreeBenchmarks\('%d', '%s', '%s', '(\d+)'\)" % (subject, g, b), get("GetTreeIdeasForStandard", SubjectAreaId=subject, GradelevelId=g, BokId=b))
            jobs += [(subject, g, b, i) for i in ideas]
    with ThreadPoolExecutor(6) as pool:
        batches = list(pool.map(lambda j: benchmarks(*j), jobs))
    seen, rows = set(), []
    for batch in batches:
        for row in batch:
            code = row.split("\t")[0]
            if code not in seen:  # a benchmark listed under two big ideas
                seen.add(code)
                rows.append(row)
    return rows


def main(out):
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)
    for name, subject in SUBJECTS.items():
        rows = subject_rows(subject)
        (out / f"{name}.tsv").write_text("\n".join(rows) + "\n", encoding="utf-8")
        print(name, len(rows), "benchmarks", flush=True)


if __name__ == "__main__":
    main(sys.argv[1])
