# British Columbia Pre-K research record

**Source:** *British Columbia Early Learning Framework* (2019), Government of British Columbia, Ministry of Education
and Child Care, gov.bc.ca, read 29 October 2026. It covers children from birth to 8 and guides early learning programs
before Kindergarten. BC has no Pre-K school year or Pre-K curriculum with outcomes.

| What | Cited as |
| --- | --- |
| The four living inquiries (Well-being and belonging; Engagement with others, materials, and the world; Communication and literacies; Identities, social responsibility, and diversity) and their pathways (Table 1, p. 65, and pp. 66 to 90) | `Living inquiry: Pathway`, for example `Communication and literacies: Sound and word play` |

The framework is holistic and has no outcomes, so a unit cites the pathway it practises and says in plain words what the
child does. Its Indigenous pathways (Indigenous voices and perspectives; Reconciliation with Indigenous peoples) are not
cited: no Pre-K unit teaches Indigenous content.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed, downloaded 2026-10-29) and extracts the text with `pdftotext`.
- `build_outcomes.py source` checks every living inquiry and pathway is in the text and writes `outcomes.json`:
  `{"pk/<subject>": [{idx, text}]}`. `src/content/grades/contract.ts` checks every BC Pre-K citation against it.
