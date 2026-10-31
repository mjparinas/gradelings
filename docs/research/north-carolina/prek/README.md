# North Carolina Pre-K research record

**Source:** *North Carolina Foundations for Early Learning and Development* (2013), North Carolina Foundations Task
Force (Division of Child Development and Early Education and the Department of Public Instruction). The files are the
Common Standards Project's copies of the preschool indicators, downloaded 30 October 2026.

| What | Cited as |
| --- | --- |
| Preschool indicator | `domain-goal letter`, for example `CD-10m` or `LDC-11j` |

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/north-carolina/contract.ts` checks every Pre-K citation against.
