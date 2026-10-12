"""Extract the key-stage curriculum outcome tables from the Atlantic Canada foundation documents (layout text from pdftotext -layout).

Usage: python3 -I extract_stages.py <layout.txt> > stages.json
Each table is a General Curriculum Outcome (GCO) statement with two columns of outcomes: grades 3 and 6, or grades 9 and 12.
"""
import json, re, sys

HEAD = re.compile(r"By the end of grade (\d+)", re.I)
FOOT = re.compile(r"Foundation for the Atlantic|^\s*Outcomes\s+\d+\s*$|^\s*\d+\s+Outcomes\s*$|^\s*\d+\s+Foundation")
TITLE_START = re.compile(r"^\s*(GCO:\s*)?Students will", re.I)


def norm(s):
    s = re.sub(r"\s+", " ", s).strip()
    return re.sub(r"(\w)- (\w)", lambda m: m.group(1) + m.group(2), s) if False else s


def paragraphs(lines):
    out, cur = [], []
    for l in lines + [""]:
        if l.strip():
            cur.append(l.strip())
        elif cur:
            out.append(" ".join(cur))
            cur = []
    return out


def extract(text):
    lines = text.split("\n")
    tables = []
    i = 0
    while i < len(lines):
        m = HEAD.search(lines[i])
        if m and len(HEAD.findall(lines[i])) == 2:
            a, b = (int(x) for x in HEAD.findall(lines[i]))
            off = [x.start() for x in HEAD.finditer(lines[i])][1]
            # title: walk back to the nearest statement start
            j = i - 1
            while j > max(0, i - 16) and not TITLE_START.match(lines[j]):
                j -= 1
            title_lines = []
            k = j
            while k < i and "Elaboration" not in lines[k] and lines[k].strip():
                title_lines.append(lines[k].strip())
                k += 1
            # strand heading (ELA): a short line just above the statement
            heading = ""
            h = j - 1
            while h > 0 and not lines[h].strip():
                h -= 1
            if lines[h].strip() and len(lines[h].strip()) < 60 and not FOOT.search(lines[h]):
                heading = lines[h].strip()
            # body
            body = []
            k = i + 1
            while k < len(lines) and not FOOT.search(lines[k]) and not (TITLE_START.match(lines[k]) and k > i + 3):
                body.append(lines[k])
                k += 1
            left = [l[:off] for l in body]
            right = [l[off:] for l in body]
            skip = lambda p: p.lower().startswith(("outcomes for entry", "also be expected", "and will also"))
            tables.append({
                "line": i + 1,
                "heading": heading,
                "gco": norm(" ".join(title_lines)),
                "stages": {
                    str(a): [p for p in map(norm, paragraphs(left)) if not skip(p)],
                    str(b): [p for p in map(norm, paragraphs(right)) if not skip(p)],
                },
            })
            i = k
            continue
        i += 1
    return tables


if __name__ == "__main__":
    json.dump(extract(open(sys.argv[1], encoding="utf8").read()), sys.stdout, indent=1, ensure_ascii=False)
