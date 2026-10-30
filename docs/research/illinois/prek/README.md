# Illinois Pre-K research record

**Source:** *Illinois Early Learning and Development Standards for Children Three Years Old to Kindergarten Enrollment
Age* (IELDS, 2013), Illinois State Board of Education. Downloaded 29 October 2026 from isbe.net.

| What | Cited as |
| --- | --- |
| Preschool benchmark | `goal.standard.EC letter`, for example `6.A.ECb` or `31.C.ECa` |

## Files

- `fetch.sh` downloads the PDF into `source/` and extracts the text with `pdftotext -layout`.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/illinois/contract.ts` checks every Pre-K citation against.
