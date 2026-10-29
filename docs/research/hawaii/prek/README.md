# Hawaiʻi Pre-K research record

**Source:** *Hawaiʻi Early Learning and Development Standards* (HELDS) continuum, Executive Office on Early Learning,
April 2014. Downloaded 29 October 2026 from earlylearning.hawaii.gov.

| What | Cited as |
| --- | --- |
| Indicator in the "48 months to kindergarten entry" column | `domain.KE.letter`, for example `GK.KE.d`, `SE.KE.c` or `PHM/GK.KE.q` |

## Files

- `fetch.sh` downloads the PDF into `source/` and saves its line positions (`pdftotext -bbox-layout`, the `.html`) and a
  readable `.txt`.
- `build_outcomes.py source` reads each KE cell of the table from the line positions and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`), which `src/content/hawaii/contract.ts` checks every Pre-K citation against.
