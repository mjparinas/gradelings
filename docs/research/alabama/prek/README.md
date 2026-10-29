# Alabama Pre-K research record

**Source:** *Alabama Standards for Early Learning and Development* (ASELD, revised April 2023), Alabama Department of
Early Childhood Education with the Department of Human Resources. Downloaded 29 October 2026 from children.alabama.gov.

| What | Cited as |
| --- | --- |
| Older-preschooler (48 to 60 months) indicator of a standard | `domain.indicator`, for example `MAT.1bOP-3` (Mathematical Thinking, standard 1b, indicator OP-3) |

Indicator numbers repeat in every domain, so the domain code (SED, SST, APL, SEK, MAT, LLT) is added in front.

## Files

- `fetch.sh` downloads the PDF into `source/` and extracts the text with `pdftotext` (no `-layout`).
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/alabama/contract.ts` checks every Pre-K citation against.
