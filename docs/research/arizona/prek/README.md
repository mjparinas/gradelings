# Arizona Pre-K research record

**Source:** *Arizona Early Learning Standards*, 4th edition (2018), Arizona Department of Education. azed.gov refuses
scripted downloads, so the files are the Common Standards Project's copies, downloaded 30 October 2026.

| What | Cited as |
| --- | --- |
| Indicator | `standard strand.standard.letter`, for example `Math 1.4.a` or `Social Emotional 1.2.b` |

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/arizona/contract.ts` checks every Pre-K citation against.
