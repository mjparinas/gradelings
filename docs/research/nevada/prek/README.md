# Nevada Pre-K research record

**Source:** *Nevada Pre-Kindergarten Standards*, revised 2023, Nevada Department of Education. The files are the Common
Standards Project's copies (each names the PDF it was taken from), downloaded 30 October 2026.

| What | Cited as |
| --- | --- |
| Pre-K indicator | `domain.standard.PKn`, for example `M.NQ.PK8` or `SS.CI.PK7` |

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/nevada/contract.ts` checks every Pre-K citation against.
