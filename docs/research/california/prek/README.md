# California Transitional Kindergarten research record

**Source:** *California Preschool/Transitional Kindergarten Learning Foundations* (2024), At-a-Glance edition,
California Department of Education, cde.ca.gov, downloaded 29 October 2026. It lists every foundation in each domain
with its early (3 to 4½) and later (4 to 5½) descriptions; Transitional Kindergarten (Pre-K in the app, shown as
"Transitional Kindergarten") uses them. The full foundations document adds examples but no other foundations.

| What | Cited as |
| --- | --- |
| Foundations in Mathematics, Foundational Language Development, Science, Health, History–Social Science and Social and Emotional Development | `<domain> <number>`, for example `Mathematics 1.3` |

The site is behind a bot check for pages, but the PDF downloads with a browser user agent.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed) and extracts the text with `pdftotext`.
- `build_outcomes.py source` reads every "Foundation N.N Title" under each domain heading and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`). `src/content/california/contract.ts` checks every TK citation against it.
