"""Builds outcomes.json from the Kentucky Early Childhood Standards (source/kentucky-early-childhood-standards.txt).

The standards have two parts, birth to three and three- and four-year-olds; Pre-K units cite the second. Each domain has
numbered standards and benchmarks, and the benchmark numbers repeat from domain to domain, so a unit cites the domain's
name with the benchmark, for example "Mathematics 1.1" (counting and cardinality) or "Social Studies 1.5". This script
reads every benchmark of the three- and four-year-old part (it starts at the second "Approaches to Learning Standard 1")
and lists it under the subjects whose units may cite it.

Usage: python3 -I build_outcomes.py source
"""
import json
import re
import sys
from pathlib import Path

SUBJECTS = {
    "math": ["Mathematics"],
    "language": ["Language and Early Literacy"],
    "science": ["Science"],
    "social": ["Social Studies", "Health/Mental Wellness", "Approaches to Learning", "Science"],
}
DOMAINS = {d for ds in SUBJECTS.values() for d in ds}
STANDARD = re.compile(r"^([A-Z][A-Za-z/ ]+?) Standard \d+:")
BENCHMARK = re.compile(r"^Benchmark (\d+\.\d+):?\s+(.*)")


def main(source: str) -> None:
    lines = (Path(source) / "kentucky-early-childhood-standards.txt").read_text(encoding="utf-8").splitlines()
    starts = [i for i, line in enumerate(lines) if line.startswith("Approaches to Learning Standard 1:")]
    assert len(starts) == 2, starts
    rows: dict[str, str] = {}
    domain = None
    for i in range(starts[1], len(lines)):
        m = STANDARD.match(lines[i])
        if m:
            domain = m.group(1)
            continue
        m = BENCHMARK.match(lines[i])
        if not m or domain not in DOMAINS:
            continue
        parts = [m.group(2)]
        for nxt in lines[i + 1 :]:
            if not nxt.strip() or nxt[:1].isupper():  # a blank line, or the next heading at the margin
                break
            parts.append(nxt.strip())
        text = re.sub(r"\s+", " ", " ".join(parts)).strip().rstrip(":")
        rows.setdefault(f"{domain} {m.group(1)}", text)
    assert len(rows) > 30, f"only {len(rows)} benchmarks found"
    out = {}
    for subject, domains in SUBJECTS.items():
        out[f"pk/{subject}"] = [{"idx": code, "text": t} for code, t in rows.items() if code.rsplit(" ", 1)[0] in domains]
    path = Path(__file__).with_name("outcomes.json")
    path.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(v) for v in out.values())} benchmark citations ({len(rows)} benchmarks) to {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "source")
