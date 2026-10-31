# Tennessee Pre-K research record

**Source:** *Tennessee Early Learning Developmental Standards* (2018), Tennessee Department of Education; the
standards for four-year-olds in mathematics, English language arts, science, social studies and approaches to
learning. The standards are published as PDFs laid out in tables, so the files are the Common Standards Project's
copies, downloaded 31 October 2026.

| What | Cited as |
| --- | --- |
| Pre-K standard | its own code, for example `PK.CC.B.5.a`, `PK.FL.PA.2.a`, `PK.LS1.01b`, `PK.06` or `PK.AL.CB.13` |

Standards marked "This standard begins in Kindergarten" are kept in outcomes.json but never cited.

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/tennessee/contract.ts` checks every Pre-K citation against.
