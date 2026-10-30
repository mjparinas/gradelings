# New Jersey Pre-K research record

**Source:** *Preschool Teaching and Learning Standards* (2014), New Jersey Department of Education. Downloaded 29 October
2026 from nj.gov.

| What | Cited as |
| --- | --- |
| Preschool learning outcome | `domain.standard.outcome`, for example `4.1.6` or `0.5.4` |
| Language Arts Literacy outcome (Common Core preschool codes) | `RF.PK.2`, with lettered parts as `RF.PK.2a` |

## Files

- `fetch.sh` downloads the PDF into `source/` and extracts the text with `pdftotext -layout`.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/new-jersey/contract.ts` checks every Pre-K citation against.
