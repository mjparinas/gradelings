# Missouri Pre-K research record

**Source:** *Missouri Early Learning Standards* (2021), Missouri Department of Elementary and Secondary Education,
<https://dese.mo.gov/sites/g/files/zuston521/files/media/pdf/2021/03/qs-el-2021-Missouri-Early-Learning-Standards.pdf>,
downloaded 30 October 2026 (`source/mels-2021.pdf`, with its `pdftotext -layout` text).

| What | Cited as |
| --- | --- |
| Indicator on a preschooler page | `area component.standard.indicator`, for example `Mathematics I.A.2` or `Social-Emotional II.B.4` |

The standards have no social studies area, so the social Pre-K units cite social-emotional development, approaches to
learning and, for asking helpers for help and for time order, physical development (safety and temporal awareness).

## Files

- `fetch.sh` downloads the PDF into `source/` and makes the text beside it.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/missouri/contract.ts` checks every Pre-K citation against.
