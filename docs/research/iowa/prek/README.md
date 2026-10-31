# Iowa Pre-K research record

**Source:** *Iowa Early Learning Standards*, 4th edition (June 2026), Iowa Department of Education and Iowa Department of Health and
Human Services. The state's site refuses scripted downloads, so the files are the Common Standards Project's copies,
downloaded 30 October 2026.

| What | Cited as |
| --- | --- |
| Indicator for about 4 to 5 years | `area.standard.letter`, for example `7.2.X` or `6.4.S` |

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/iowa/contract.ts` checks every Pre-K citation against.
