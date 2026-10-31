# Wisconsin Pre-K research record

**Source:** *Wisconsin Model Early Learning Standards* (WMELS), 4th edition (2013), Wisconsin Department of Public
Instruction and the Wisconsin Early Childhood Collaborating Partners,
<https://dpi.wi.gov/sites/default/files/imce/fscp/pdf/ec-wmels-rev2013.pdf>, downloaded 31 October 2026
(`source/wmels-2013.pdf`, with its `pdftotext -layout` text).

| What | Cited as |
| --- | --- |
| Performance standard | `domain.sub-domain.EL.number`, for example `V.B.EL.1` or `II.A.EL.2` |

The standards have no social studies domain, so the social Pre-K units cite social and emotional development,
diversity in learning and, for time order and position, mathematical thinking.

## Files

- `fetch.sh` downloads the PDF into `source/` and makes the text beside it.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/wisconsin/contract.ts` checks every Pre-K citation against.
