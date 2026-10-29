# Manitoba Pre-K research record

**Source:** *Early Returns: Manitoba's Early Learning and Child Care Curriculum Framework for Preschool Centres and
Nursery Schools*, Manitoba Early Learning and Child Care, gov.mb.ca, downloaded 29 October 2026. Manitoba has no Pre-K
school year; licensed preschool centres and nursery schools must have a play-based curriculum that reflects this
framework. The province says an updated early learning curriculum is being developed (2025); check for it before a
refresh.

| What | Cited as |
| --- | --- |
| The goals for children's social, emotional, physical and cognitive development | `Social development`, `Emotional development`, `Physical development`, `Cognitive development` |
| The play areas every program must offer (dramatic; fine motor; large muscle; block and construction; science, water and sand; music, art, literacy and numeracy) | the area's name, for example `Numeracy` or `Science, water and sand` |

Early Returns has no outcomes, so a unit cites the area of development and the play area it practises, joined by `; `
(for example `Cognitive development; Numeracy`), and says in plain words what the child does.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed) and extracts the text with `pdftotext`.
- `build_outcomes.py source` checks the goals and the list of play areas are in the text and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`). `src/content/manitoba/contract.ts` checks every Pre-K citation against it.
