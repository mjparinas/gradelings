# New Hampshire Pre-K research record

**Source:** *New Hampshire Early Learning Standards, Birth through Age Five* (2016), New Hampshire Department of
Health and Human Services and Department of Education; the indicators for four- and five-year-olds. nh-connections.org
refuses scripted downloads (406), so the files are the Common Standards Project's copies, downloaded 31 October 2026.

| What | Cited as |
| --- | --- |
| Indicator for four- and five-year-olds | `domain standard.7letter`, for example `Numeracy 1.1.7b`, `Language 5.5.7c` or `Cognition 3.2.7d` |

Domains: Language (Language Development and Emergent Literacy), Numeracy (Cognitive Development: Early Numeracy),
Cognition (Cognitive Development: Key Concepts, Physical World, Social World), Approaches (Cognitive Development:
Approaches to Learning) and Social-Emotional (Social and Emotional Development).

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/new-hampshire/contract.ts` checks every Pre-K citation against.
