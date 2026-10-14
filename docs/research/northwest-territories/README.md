# Northwest Territories research record

**Sources:** NWT Education, Culture and Employment, "JK-12 Curriculum Renewal" (ece.gov.nt.ca/en/curriculumrenewal) and the "Curriculum Renewal Implementation Plan" fact sheet (October 2022). Read October 2026.

## Sources in this folder
`fetch.sh [dir]` downloads ECE's documents into `source/` (PDFs in `source/pdf/` with their `pdftotext -layout` text in `source/txt/`, HTML pages in `source/html/` with a text copy when pandoc is installed), downloaded 14 October 2026: the Curriculum Renewal page (`curriculum-renewal`), the Implementation Plan fact sheet (October 2022), the May 2025 implementation timeline and the timeline fact sheet, the FAQ on adopting BC's curriculum (November 2021), the report-cards education bulletin, the Indigenous perspectives fact sheet, the BC-NWT education sharing agreement, and the Dene Kede and Inuuqatigiit, student assessment tools and key competencies pages. ece.gov.nt.ca is slow and sometimes times out, so the script retries; rerun it if one download fails. The BC curriculum the NWT adapts is stored in `../bc/source/` (`../bc/fetch.sh`).

## What the sources say
- The NWT is replacing the **Alberta** curriculum with the **BC curriculum adapted for the NWT**, in divisions: Grades 4 to 6 (trial 2023-24, final 2025-26), Grade 9 (trial 2023-24, final 2024-25), Grades 7 to 9 (trial 2024-25, final 2026-27), Grades 1 to 3 (trial 2025-26, draft in all subjects 2026-27, final 2027-28) and JK/Kindergarten (draft 2026-27, final 2027-28). Grades 10 to 12 follow separately.
- In 2026-27, Grades 1 to 9 therefore use the adapted BC curriculum and Kindergarten is on the draft, so no Alberta content is used for the NWT. Official dates have moved before; recheck the page before launch.
- **Reporting:** adapted-curriculum grades use the four-level proficiency scale (Emerging, Developing, Proficient, Extending) with written feedback; Grades 1 to 9 once fully implemented. A standard NWT report card is still being developed. Grades 10 to 12 keep percentages.
- **Assessments:** the last Alberta Achievement Tests were June 2023. BC's Grade 4 Foundation Skills Assessment began in 2024-25, Grade 7 in 2026-27.
- **NWT-specific curricula that stay:** Dene Kede, Inuuqatigiit, Our Languages, Northern Studies, Hunter Education and the JK/Kindergarten program.

## Mapping
- Every BC unit is shared with `ca-nt` standards (`nwtCourse` in `src/content/nwt/kit.ts`); progress is the same for BC, Yukon and NWT families. NWT has no separate outcome codes for adapted subjects, so its standards repeat BC's text.
- NWT-only units are `bankUnit` sets with ids starting `nt-`: Our Territory (Grade 3 social), Dene Kede (Grade 5 social), Inuuqatigiit (Grade 6 social).

## Known gaps
- Dene and Inuvialuit units are light, written from public information. Other NWT curricula (Our Languages, Northern Studies, Hunter Education) and the Gwich'in, Sahtú and Métis perspectives are not built.
- French: BC's Immersion and Core French are shared as-is; NWT's French programs and the Francophone school program (Commission scolaire francophone TNO) are not separately built.
- Grades 10 to 12 are out of scope.
- ECE's pages were read through a text summary; recheck dates and wording at ece.gov.nt.ca before launch.
