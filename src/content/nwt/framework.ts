import type { Framework } from "../frameworks";
import { BRITISH_COLUMBIA } from "../grades/framework";

// The Northwest Territories is replacing the Alberta curriculum with the BC curriculum adapted for the NWT, phased in
// since 2023 (Grades 1 to 9 on the adapted curriculum in 2026-27; Kindergarten to Grade 3 as a draft). Kindergarten
// to Grade 9 report on the same four-point proficiency scale (NWT Education, Culture and Employment). Its extra
// content is the NWT's own curricula that stay in schools: Dene Kede and Inuuqatigiit, plus local territory content.
export const NORTHWEST_TERRITORIES: Framework = {
  ...BRITISH_COLUMBIA,
  id: "ca-nt",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  preKName: "Junior Kindergarten",
  regionKind: "territory",
  slug: "northwest-territories",
  name: "Northwest Territories",
  shortName: "NWT",
  curriculumName: "NWT Curriculum",
  region: "Northwest Territories",
  sourceName: "NWT Education, Culture and Employment",
  sourceUrl: "https://www.ece.gov.nt.ca/en/curriculumrenewal",
  reportCard: {
    title: "Understanding NWT report cards",
    intro:
      "NWT schools are moving from the Alberta curriculum to the BC curriculum, adapted for the NWT. Grades using the adapted curriculum describe learning with a four-point proficiency scale, and a standard NWT report card is still being developed, so your child's report may look different from one school or year to the next. Each level describes where a student is right now in their learning, not a pass or fail.",
    facts: [
      {
        title: "Four levels, not letter grades",
        body: "Grades using the adapted curriculum use Emerging, Developing, Proficient and Extending, with written comments. Grades 10 to 12 keep percentage grades.",
      },
      {
        title: "A curriculum in transition",
        body: "Grades 4 to 6 and 9 were first. Grades 7 and 8 follow, and Kindergarten to Grade 3 are on the draft curriculum in 2026-27. Ask your school which curriculum your child's grade is using this year.",
      },
      {
        title: "Dene Kede and Inuuqatigiit stay",
        body: "The NWT's own Dene Kede and Inuuqatigiit curricula weave Dene and Inuit languages, values and ways of knowing into learning, alongside the adapted BC curriculum.",
      },
      {
        title: "Core Competencies",
        body: "Students reflect on the Core Competencies (Communication, Thinking, and Personal and Social) and set goals, as in BC.",
      },
      {
        title: "Assessments are changing",
        body: "The last Alberta Achievement Tests in the NWT were written in 2023. The BC Foundation Skills Assessment is being brought in, Grade 4 first. They are separate checks of reading, writing and numeracy and are not part of the report card.",
      },
    ],
    faqs: BRITISH_COLUMBIA.reportCard.faqs,
  },
};
