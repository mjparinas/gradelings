# Connecticut Pre-K research record

**Source:** *Connecticut Early Learning and Development Standards* (CT ELDS), Connecticut Office of Early Childhood.
Downloaded 29 October 2026 from ctoec.org.

| What | Cited as |
| --- | --- |
| Indicator for 48 to 60 months (the end of preschool) | `domain.60.number`, for example `M.60.2` or `SS.60.4` |

The document prints a few codes oddly (`SE 60.4`, `L60.2`, and `LR.60.18` for `C.60.18`); `build_outcomes.py`
normalises them.

## Files

- `fetch.sh` downloads the PDF into `source/` and extracts the text with `pdftotext` (no `-layout`).
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/connecticut/contract.ts` checks every Pre-K citation against.
