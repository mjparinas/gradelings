# Yukon Pre-K research record

**Source:** *Early Kindergarten Policy*, Yukon Department of Education, effective August 20, 2021, open.yukon.ca,
downloaded 29 October 2026. Early Kindergarten (K4) is an optional school year for children who are 4 on or before
December 31, offered in rural Yukon schools.

The policy says Early Kindergarten "follows the BC Kindergarten Curriculum", informed by the BC Early Learning Framework
(ELF), the BC Play Today Handbook and the Yukon Child Development Centre Preschool Curriculum. Yukon has no early-learning
outcomes of its own, so the Pre-K units cite the BC Early Learning Framework exactly as BC does (`Living inquiry:
Pathway`), and `src/content/yukon/contract.ts` checks them against `docs/research/bc/prek/outcomes.json`. There is no
`build_outcomes.py` here for that reason.

## Files

- `fetch.sh` downloads the policy into `source/` (committed) and extracts the text with `pdftotext`.
