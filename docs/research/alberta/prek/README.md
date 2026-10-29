# Alberta Pre-K research record

**Source:** *Flight: Alberta's Early Learning and Care Framework* (Makovichuk, Hewes, Lirette and Thomas, 2014; the
framework Alberta Children's Services adopted for licensed early learning and child care), flightframework.ca,
downloaded 29 October 2026. Alberta has no Pre-K school year for every child; Early Childhood Services offers
Pre-Kindergarten to some children, and Flight guides early learning programs before school.

| What | Cited as |
| --- | --- |
| The four holistic goals (Well-Being; Play and Playfulness; Communication and Literacies; Diversity and Social Responsibility) and their three facets each | `Goal: Facet`, for example `Play and Playfulness: Playful Exploration and Problem Solving` |

The framework is holistic and has no numbered outcomes, so a unit cites the facet it practises and says in plain words
what the child does. Flight's goals and facets are adapted, with permission, from the New Brunswick framework, so Alberta and New Brunswick cite the same facets.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed) and extracts the text with `pdftotext`.
- `build_outcomes.py source` checks every goal and facet is in the text and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`). `src/content/alberta/contract.ts` checks every Pre-K citation against it.
