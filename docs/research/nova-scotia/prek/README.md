# Nova Scotia Pre-primary research record

**Source:** *Capable, Confident, and Curious: Nova Scotia's Early Learning Curriculum Framework* (2025 edition, PDF
dated July 2025), Nova Scotia Department of Education and Early Childhood Development, ednet.ns.ca, downloaded
29 October 2026. Pre-primary, the free school year for four-year-olds, follows it.

| What | Cited as |
| --- | --- |
| The four learning goals (Well-being; Discovery and Invention; Language and Communication; Personal and Social Responsibility) and their numbered learning objectives | `Goal N`, for example `Discovery and Invention 2` |

The framework is play-based and has no grade outcomes, so a unit cites the objective it practises and says in plain
words what the child does. Objective Personal and Social Responsibility 6 (connecting with the Mi'kmaq) and Language and
Communication 7 (French) are not cited: no Pre-K unit teaches them.

## Files

- `fetch.sh` downloads the PDF into `source/` (committed) and extracts the text with `pdftotext`.
- `build_outcomes.py source` reads every objective from the text and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`). `src/content/nova-scotia/contract.ts` checks every Pre-primary citation against it.
