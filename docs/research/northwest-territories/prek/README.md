# Northwest Territories Pre-K research record

**Source:** *NWT Junior Kindergarten / Kindergarten Curriculum: A Holistic Approach to Children's Early Learning*
(January 2017), Northwest Territories Education, Culture and Employment, ece.gov.nt.ca, downloaded 29 October 2026.
Junior Kindergarten is the free school year for four-year-olds in the NWT. The territory is moving Kindergarten to
Grade 12 onto the BC curriculum, but ECE has said JK/K keeps its own NWT curriculum.

| What | Cited as |
| --- | --- |
| The numbered Integrated Curricular Outcomes under each of the eleven General Competencies | their number, for example `11.4` (Applied Literacies: Mathematics, "Relate a numeral, 1 to 10, to its respective quantity") |

Outcomes about Dene Kede and Inuuqatigiit content (for example the roles of Elders, the land and animals in Dene and
Inuit life) are listed in `outcomes.json` but not cited: no shared Pre-K unit teaches Indigenous content.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed) and extracts the text with `pdftotext`.
- `build_outcomes.py source` reads every numbered outcome, joins its wrapped lines, drops the source reference in
  brackets and writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`). `src/content/nwt/contract.ts` checks every
  Pre-K citation against it.
