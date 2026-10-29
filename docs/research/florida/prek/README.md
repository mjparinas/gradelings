# Florida Pre-K research record

**Source:** *Florida Early Learning and Developmental Standards: 4 Years Old to Kindergarten* (Form OEL-VPK 15,
October 2017), Florida Department of Education, Division of Early Learning, adopted by Rule 6M-8.602, F.A.C. These are
the standards for Florida's free Voluntary Prekindergarten (VPK) program. Downloaded 29 October 2026 from the Division's
standards site (flbt5.floridaearlylearning.com).

| What | Cited as |
| --- | --- |
| Numbered standards in each domain and component | `domain.component.standard`, for example `V.A.1` (Mathematical Thinking, Number Sense, standard 1) or `VII.D.6` |

The document numbers domains with Roman numerals, components with capital letters and standards with numerals, and
gives benchmarks (a, b, ...) under each standard. Units cite the standard, not the benchmark. Physical Development (I)
has sub-components and isn't cited by any Pre-K unit, so `build_outcomes.py` skips it.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed) and extracts the text with `pdftotext`.
- `build_outcomes.py source` reads every numbered standard in the cited domains and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`). `src/content/florida/contract.ts` checks every Pre-K citation against it.
