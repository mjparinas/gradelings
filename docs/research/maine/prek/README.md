# Maine Pre-K research record

**Source:** *Maine Early Learning and Development Standards* (MELDS), Maine Department of Education. maine.gov refuses
scripted downloads (403), so the file is the Common Standards Project's copy, downloaded 30 October 2026.

| What | Cited as |
| --- | --- |
| Preschool statement | `area.P.number`, for example `CC.P.3` or `SD.P.6` |

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/maine/contract.ts` checks every Pre-K citation against.
