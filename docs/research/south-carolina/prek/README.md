# South Carolina Pre-K research record

**Source:** *South Carolina Early Learning Standards* (2017), South Carolina Department of Education, South Carolina
First Steps and partners. The files are the Common Standards Project's copies, downloaded 31 October 2026.

| What | Cited as |
| --- | --- |
| Older Preschoolers indicator | `domain-goal letter`, for example `MTE-1z` or `ESD-6n` |

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/south-carolina/contract.ts` checks every Pre-K citation against.
