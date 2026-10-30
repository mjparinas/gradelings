# Ohio Pre-K research record

**Source:** *Early Learning and Development Standards* (2022), Ohio Department of Education and Workforce and Ohio
Department of Children and Youth, birth to kindergarten entry. The state's sites refuse scripted downloads, so the
files are the Common Standards Project's copies, downloaded 30 October 2026.

| What | Cited as |
| --- | --- |
| Progression step | `domain strand.standard.step`, for example `Math 1.c.4` or `Social-Emotional 1.b.4` |

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/ohio/contract.ts` checks every Pre-K citation against.
