# Arkansas Pre-K research record

**Source:** *Arkansas Child Development and Early Learning Standards: Birth through 60 Months*, Arkansas Department of
Education, Office of Early Childhood. The file is the Common Standards Project's copy of the Pre-K 3 and Pre-K 4 goals,
downloaded 30 October 2026.

| What | Cited as |
| --- | --- |
| Goal | `domain strand.number`, for example `MT1.1` or `SE2.1` |

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/arkansas/contract.ts` checks every Pre-K citation against.
