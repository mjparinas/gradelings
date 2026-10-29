# New York Pre-K research record

**Source:** *The New York State Prekindergarten Learning Standards: A Resource for School Success* (2019), New York State
Education Department, downloaded 29 October 2026 from the copy the NYS Council on Children and Families hosts
(nysed.gov links to it).

| What | Cited as |
| --- | --- |
| Standards in each domain (AL, PDH, SEL, AC, ELAL, MATH, SCI, SOC, ARTS) | their PK code, for example `PK.MATH.6` or `PK.MATH.3a` |

`outcomes.json` keeps the first line of each standard's wording; the PDF has the rest and its indicators.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed) and extracts the text with `pdftotext`.
- `build_outcomes.py source` reads each standard where it is first stated and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`). `src/content/new-york/contract.ts` checks every Pre-K citation against it.
