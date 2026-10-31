# Pennsylvania Pre-K research record

**Source:** *Pennsylvania Learning Standards for Early Childhood, Pre-Kindergarten* (2024), Pennsylvania Office of
Child Development and Early Learning (Departments of Education and Human Services). The standards are published as a
long PDF laid out in tables, so the files are the Common Standards Project's copies, downloaded 31 October 2026.

| What | Cited as |
| --- | --- |
| Pre-K standard or indicator | its own code with the standard area, for example `2.1 PK.A.2.1`, `1.1 PK.C.1`, `3.1 PK.A.1` or `16.1 PK.A.1` |

The social studies file is titled "Scientific Thinking and Technology" in the Common Standards Project; its statements
are the 5.1 to 8.1 civics, economics, geography and history standards.

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/pennsylvania/contract.ts` checks every Pre-K citation against.
