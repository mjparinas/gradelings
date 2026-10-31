# Indiana Pre-K research record

**Source:** *Indiana Early Learning Standards* (2023), Indiana Department of Education, Office of Kindergarten Readiness.
in.gov refuses scripted downloads, so the files are the Common Standards Project's copies, downloaded 30 October 2026.

| What | Cited as |
| --- | --- |
| Older-preschool indicator | `standard.o.letter`, for example `M1.1.o.e` or `SW1.2.o.a` |
| English/language arts indicator | `ELA.domain.standard.letter`, for example `ELA.2.2.h` |

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/indiana/contract.ts` checks every Pre-K citation against.
