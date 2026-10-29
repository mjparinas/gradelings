# Georgia Pre-K research record

**Source:** *Georgia Early Learning and Development Standards* (GELDS), indicators for 48 to 60 months, Bright from the
Start: Georgia Department of Early Care and Learning. Downloaded 29 October 2026 from gelds.decal.ga.gov.

| What | Cited as |
| --- | --- |
| 48 to 60 months indicator | `domain standard.4 letter`, for example `CD-MA2.4b` or `SED5.4b` |

## Files

- `fetch.sh` downloads the PDF into `source/` and saves its word positions (`pdftotext -bbox-layout`, the `.html`) and a
  readable `.txt`.
- `build_outcomes.py source` reads the two-column indicator table from the word positions and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`), which `src/content/georgia/contract.ts` checks every Pre-K citation against.
