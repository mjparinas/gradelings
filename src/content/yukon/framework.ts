import type { Framework } from "../frameworks";
import { BRITISH_COLUMBIA } from "../grades/framework";

// Yukon implements the BC curriculum, adapted for the Yukon, and reports Kindergarten to Grade 9 on the same
// four-point Provincial Proficiency Scale (Yukon Education in the CMEC Student Transfer Guide, 2023).
// Its extra content is the Yukon First Nations governance and citizenship units in Social Studies 5.
export const YUKON: Framework = {
  ...BRITISH_COLUMBIA,
  id: "ca-yt",
  regionKind: "territory",
  slug: "yukon",
  name: "Yukon",
  shortName: "Yukon",
  curriculumName: "Yukon Curriculum",
  region: "Yukon",
  sourceName: "Yukon Education",
  sourceUrl: "https://yukon.ca/en/school-curriculum",
  reportCard: {
    title: "Understanding Yukon report cards",
    intro:
      "Yukon schools follow the BC curriculum, adapted for the Yukon, so report cards from Kindergarten to Grade 9 describe learning with the same four-point proficiency scale. Each level describes where a student is right now in their learning, not a pass or fail.",
    facts: [
      {
        title: "Four levels, not letter grades",
        body: "Kindergarten to Grade 9 use Emerging, Developing, Proficient and Extending. Letter grades with percentage marks start in Grade 10.",
      },
      {
        title: "Written comments matter",
        body: "Teachers add descriptive feedback: what your child can do, what they're working on, and how you can support them. Yukon schools follow the Communicating Student Learning guidelines.",
      },
      {
        title: "Yukon First Nations ways of knowing, doing and being",
        body: "Yukon Education works with Yukon First Nations to weave their languages, history, culture and ways of knowing, doing and being into every subject and grade, and Grade 5 social studies adds Yukon First Nations governance and citizenship.",
      },
      {
        title: "Core Competencies",
        body: "Students reflect on the Core Competencies (Communication, Thinking, and Personal and Social) and set goals, as in BC.",
      },
      {
        title: "FSA is separate",
        body: "Students in Grades 4 and 7 write the Foundation Skills Assessment, a separate check of reading, writing and numeracy. It isn't part of the report card.",
      },
    ],
    faqs: BRITISH_COLUMBIA.reportCard.faqs,
  },
};
