# Nunavut research record

**Sources:** Nunavut Department of Education, "Nunavut Approved Curriculum and Teaching Resources" (August 2019, gov.nu.ca, 120 pages) and its 2023-24 edition (ilinniapaa-learning.ca copy, August 2023), which has the same structure; "Curriculum and Teaching Resources Orientation 2023/2024" (gov.nu.ca); the Department's news on the new Nunavut curriculum (Kindergarten and Grade 1 from 2025-26). The Department's web pages returned 403 to automated reads, so the PDFs are the checked source.

## What the sources say
- Teachers must use the approved curriculum guides. They are "produced in Nunavut" or "adopted from other jurisdictions including NWT, Alberta, Saskatchewan, and Manitoba".
- Four strands: Nunavusiutit (heritage and culture, history, geography, environmental science, civics and economics), Iqqaqqaukkaringniq (mathematics, analytical and critical thinking, solution-seeking), Uqausiliriniq (communication and language) and Aulajaaqtut (wellness and safety).
- Mathematics K-9: the Alberta K-9 Mathematics Program of Studies (2007, updated 2014). Science K-6: NWT Science and Technology K-6 (2004). Science 7-9: Nunavut Adaptation of the Alberta Science 7-8-9 program (2003, adapted 2014). English language arts: NWT K-3, 4-7 and 7-9 curricula (2011). Social studies: Inuuqatigiit (NWT, 1996), NWT Elementary Social Studies Grades 1-6 (1993), Junior Secondary Social Studies (NWT, 1993), Civics in the Junior Secondary Social Studies Curriculum (NWT, 1998), the Nunavut Land Claims Agreement, and a Nunavut Grade 9 Social Studies teacher's guide (2015). French: French as an Additional Language for Nunavut, Grades 4-9 (Manitoba, 2014).
- Inuktitut Language Arts K-6 (Nunavut, 1999) and the Inuktut Titiqqiriniq literacy program are Nunavut's own; they are not built here.
- The Department has identified core outcomes for each subject (Kindergarten to Grade 9) and core curriculum checklists.
- A new Nunavut curriculum is being phased in, starting with Kindergarten and Grade 1 in 2025-26, and is complete for Kindergarten to Grade 6 on paper. Recheck gov.nu.ca; this app follows the approved list above.

## Mapping
- `approved.json` lists, per grade and subject, the approved guides and the strand names a unit may cite. `nunavut.test.ts` checks every Nunavut citation against it.
- `src/content/nunavut/plan.ts` was generated once from the Manitoba pool (Kindergarten to Grade 6 math and science, all language, social studies and Core French) and the Alberta pool (Grades 7-9 math and science). BC units are shared; the rest are copied with Nunavut standards only. Units whose questions name another province, city or Indigenous nation were left out.
- Social studies: only skills, citizenship, community and map units were reused. World-history units (ancient, medieval) were left out because the approved NWT guides are not those courses.

## Known gaps
- Citations are by guide and strand, not outcome code, because the NWT guides and the 2007 Alberta program text could not be read automatically. The match for Kindergarten to Grade 6 math and for language is by topic (WNCP-based Manitoba units), not outcome by outcome. Check against the guides before launch.
- No territory-wide report-card scale or test schedule could be confirmed, so the framework uses four plain practice steps and the assessment guide says to ask the school.
- Nunavut-only units contain Inuit and Inuktut content (Inuit Qaujimajatuqangit principles, the land claim, land skills, a few Inuktitut words). Facts come from public Government of Nunavut and NTI material but the content is light. Dates and names (signing dates, boards) should be rechecked.
- Inuktut Language Arts, the Inuktut Titiqqiriniq program, Inuinnaqtun, Aulajaaqtut (wellness) and the new Nunavut curriculum are not built.
- The Grade 10 to 12 courses are out of scope.
