# Virginia Pre-K research record

**Source:** *Virginia's Early Learning and Development Standards* (ELDS, 2021), Virginia Department of Education.
doe.virginia.gov refuses scripted downloads (403), so the files are the Common Standards Project's copies, downloaded
31 October 2026.

| What | Cited as |
| --- | --- |
| Later Preschool indicator | `area strand.standard letter`, for example `CD3.1k` or `SED2.1h` |

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/virginia/contract.ts` checks every Pre-K citation against.
