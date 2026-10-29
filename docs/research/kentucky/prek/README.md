# Kentucky Pre-K research record

**Source:** *Kentucky Early Childhood Standards* (2013), Kentucky Governor's Office of Early Childhood. Downloaded 29
October 2026 from kyecac.ky.gov.

| What | Cited as |
| --- | --- |
| Benchmark for three- and four-year-olds | domain and number, for example `Mathematics 1.1` or `Social Studies 1.5` |

The benchmarks are broad (Mathematics has four), so several units can cite the same one.

## Files

- `fetch.sh` downloads the PDF into `source/` and extracts the text with `pdftotext -layout`.
- `build_outcomes.py source` reads the three- and four-year-old part and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`), which `src/content/kentucky/contract.ts` checks every Pre-K citation against.
