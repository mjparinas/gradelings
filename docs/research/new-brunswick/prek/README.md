# New Brunswick Pre-K research record

**Source:** *New Brunswick Curriculum Framework for Early Learning and Child Care, English* (2008), Department of
Education and Early Childhood Development, gnb.ca, downloaded 29 October 2026. New Brunswick has no Pre-K school year;
the framework guides licensed early learning and child care centres for children before Kindergarten.

| What | Cited as |
| --- | --- |
| The four holistic goals (Well-Being; Play and Playfulness; Communication and Literacies; Diversity and Social Responsibility) and their three facets each | `Goal: Facet`, for example `Play and Playfulness: Playful Exploration and Problem Solving` |

The framework is holistic and has no numbered outcomes, so a unit cites the facet it practises and says in plain words
what the child does. Alberta's Flight framework adapts these goals and facets, so the two provinces cite the same facets.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed) and extracts the text with `pdftotext`.
- `build_outcomes.py source` checks every goal and facet is in the text and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`). `src/content/new-brunswick/contract.ts` checks every Pre-K citation against it.
