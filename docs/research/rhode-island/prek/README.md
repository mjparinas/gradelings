# Rhode Island Pre-K research record

**Source:** *Rhode Island Early Learning and Development Standards* (RIELDS), 2023 edition, Rhode Island Department of
Education, Department of Human Services and partners, <https://rields.com/wp-content/uploads/2023/04/RIELDS_standards_2023_0329.pdf>,
downloaded 31 October 2026 (`source/rields-2023.pdf`, with the text of its outline pages).

| What | Cited as |
| --- | --- |
| Learning goal | `domain standard.letter`, for example `M 1.a` or `SS 3.b` |

The learning goals cover birth to 60 months; each has age indicators in the full document, ending at 60 months, which
is the Pre-K year.

## Files

- `fetch.sh` downloads the PDF into `source/` and makes the outline text beside it.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/rhode-island/contract.ts` checks every Pre-K citation against.
