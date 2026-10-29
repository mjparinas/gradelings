# Saskatchewan Pre-K research record

**Source:** *Essential Learning Experiences for Three-, Four- and Five-Year-Olds* (Saskatchewan Ministry of Education,
Early Years Branch, 2015), a supplement to *Play and Exploration: Early Learning Program Guide*, Saskatchewan
Publications Centre, downloaded 29 October 2026. Saskatchewan's Prekindergarten program is a school program for some
three- and four-year-olds; the provincial auditor's 2024 report on it names this booklet as the program's curriculum.

| What | Cited as |
| --- | --- |
| The essential learning experiences in each domain (social emotional, physical, spiritual, intellectual, and language and emerging literacy) | `Domain: Experience`, for example `Intellectual: Exploring Numeracy` |

The booklet has no numbered outcomes, so a unit cites the experience it practises and says in plain words what the
child does.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed) and extracts the text with `pdftotext`.
- `build_outcomes.py source` checks every domain and experience is in the text and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`). `src/content/saskatchewan/contract.ts` checks every Pre-K citation against it.
