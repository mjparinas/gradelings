# Washington Pre-K research record

**Source:** *Washington State Early Learning and Development Guidelines, Birth through 3rd Grade* (2012, revised April
2021, DCYF publication EL_0015), dcyf.wa.gov, downloaded 29 October 2026. Washington has no single Pre-K year;
ECEAP, Head Start, transitional kindergarten and child care use these guidelines.

| What | Cited as |
| --- | --- |
| The six areas of development and their topics in the Ages 4 to 5 Years section | `Area: Topic`, for example `Learning about my world: Math` |

The guidelines have no codes, so a unit cites the area and topic it practises and says in plain words what the child
does.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed) and extracts the text with `pdftotext`.
- `build_outcomes.py source` checks every area and topic is in the Ages 4 to 5 Years section and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`). `src/content/washington/contract.ts` checks every Pre-K citation against it.
