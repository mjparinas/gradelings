# Newfoundland and Labrador Pre-K research record

**Source:** *Navigating the Early Years: An Early Childhood Learning Framework* (2019), Department of Education and
Early Childhood Development, gov.nl.ca, downloaded 29 October 2026. It guides early learning from birth to eight in
child care, family resource centres, libraries and schools, including Pre-Kindergarten programs before Kindergarten.

| What | Cited as |
| --- | --- |
| The numbered categories of the four goals for early childhood learning (Well-Being and Belonging; Communication; Play and Exploration; Social Contribution) | their number, for example `2.1` (Language Development) or `3.1` (Investigation and Thinking) |

The framework has no outcomes, so a unit cites the category it practises and says in plain words what the child does.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed) and extracts the text with `pdftotext`.
- `build_outcomes.py source` checks every numbered category heading is in the text and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`). `src/content/newfoundland-and-labrador/contract.ts` checks every Pre-K citation
  against it.
