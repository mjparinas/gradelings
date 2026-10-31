# Michigan Pre-K research record

**Source:** *Early Childhood Standards of Quality for Birth to Kindergarten* (2022), Michigan Department of Lifelong
Education, Advancement, and Potential (MiLEAP); the 3 to 5 years early learning expectations. michigan.gov refuses
scripted downloads (403), so the files are the Common Standards Project's copies, downloaded 31 October 2026.

| What | Cited as |
| --- | --- |
| Early learning expectation | `domain standard letter`, for example `Mathematics 2b` or `Social Studies 3b` |

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/michigan/contract.ts` checks every Pre-K citation against.
