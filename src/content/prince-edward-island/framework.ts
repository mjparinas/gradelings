import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Prince Edward Island (English program). Standards are the specific curriculum outcomes in the Department of Education and
// Lifelong Learning's "Specific Curriculum Outcomes Framework" for Kindergarten to Grade 6 (2013) and its Grade 9 guides,
// plus the course descriptions in the Intermediate Program of Studies for Grades 7 to 9, cited by code. Prince Edward Island has
// no report-card scale Gradelings could confirm, so the four steps below are a plain practice scale, not a Prince Edward Island
// scale. Sources and the checking record are in docs/research/prince-edward-island/.

const LEVELS: ProficiencyLevel[] = [
  {
    id: "beginning",
    label: "Beginning",
    kidLabel: "Seedling",
    icon: "🌱",
    colour: "#ff9636",
    description: "Practice shows a first understanding of the curriculum outcomes. Most answers still need a hint or a second try.",
    atHome: "Just getting started with this idea. Short, regular practice with lots of support helps most.",
  },
  {
    id: "approaching",
    label: "Approaching",
    kidLabel: "Sprout",
    icon: "🌿",
    colour: "#f5b301",
    description: "Practice shows a partial understanding of the curriculum outcomes. Some answers are right on the first try.",
    atHome: "Understands parts of it and is building confidence. Keep practising the tricky parts.",
  },
  {
    id: "meeting",
    label: "Meeting",
    kidLabel: "Tree",
    icon: "🌳",
    colour: "#25b47e",
    description: "Practice shows a solid understanding of the curriculum outcomes. Most answers are right on the first try.",
    atHome: "Has it! Mixed review now and then keeps it strong.",
  },
  {
    id: "exceeding",
    label: "Exceeding",
    kidLabel: "Star",
    icon: "⭐",
    colour: "#4f8ef7",
    description: "Practice shows a deep understanding of the curriculum outcomes, including harder, unfamiliar questions.",
    atHome: "Applies it confidently, even in new or harder situations. Try challenge mode and real-life problems.",
  },
];

const SCHEME: ScoringScheme = {
  id: "pe-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source: "These four steps are a plain practice scale, not a Prince Edward Island Department of Education scale. Ask your child's school how it reports.",
  levels: LEVELS,
};

export const PRINCE_EDWARD_ISLAND: Framework = {
  id: "ca-pe",
  slug: "prince-edward-island",
  name: "Prince Edward Island",
  shortName: "PEI",
  country: "CA",
  curriculumName: "Prince Edward Island Curriculum",
  region: "Prince Edward Island",
  overviewLabel: "Learning focus",
  standardLabel: "Curriculum outcome",
  sourceName: "Prince Edward Island Department of Education and Lifelong Learning",
  sourceUrl: "https://www.princeedwardisland.ca/en/information/education-and-early-years/programs-of-study",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social", "core-french"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Prince Edward Island report cards",
    intro:
      "Public schools on Prince Edward Island follow one provincial curriculum, written as general, key-stage and specific curriculum outcomes. Your child's report card describes how well they are meeting those outcomes. How progress is shown on the report card depends on the grade and the school, so Gradelings uses four plain practice steps you can match to the words on your child's own report.",
    facts: [
      {
        title: "Three kinds of outcomes",
        body: "General curriculum outcomes say what students should know and be able to do at the end of study in a subject. Key-stage outcomes say what they should be able to do by the end of Grades 3, 6, 9 and 12. Specific curriculum outcomes say what is expected at a particular grade, and they are what each Gradelings unit practises.",
      },
      {
        title: "Reporting focuses on the outcomes",
        body: "Provincial guides say that reporting should focus on the extent to which students have achieved the curriculum outcomes. The report card is one way of reporting. Others include conferences, notes and phone calls, and narrative comments can say more than a letter or number alone.",
      },
      {
        title: "Four key stages",
        body: "Kindergarten to Grade 3 is the primary stage, Grades 4 to 6 the elementary stage, Grades 7 to 9 the intermediate stage and Grades 10 to 12 senior high. Core French begins no later than Grade 4, and French Immersion programs are offered in some schools.",
      },
      {
        title: "Practice steps are not a Prince Edward Island scale",
        body: "Gradelings shows practice on four plain steps (Beginning, Approaching, Meeting, Exceeding). Your child's teacher decides how progress is reported.",
      },
    ],
    faqs: [
      {
        q: "Does Prince Edward Island have one report-card scale?",
        a: "We could not confirm a single province-wide scale for every grade, so Gradelings uses four plain practice steps you can match to your child's own report card. Ask your school how it reports.",
      },
      {
        q: "Does Gradelings give a grade?",
        a: "No. Gradelings shows how practice is going so you can see where your child is strong and where to practise. Your child's teacher decides how progress is reported.",
      },
      {
        q: "How do the curriculum outcomes show up in Gradelings?",
        a: "Each unit shows the outcome codes it practises, such as N1 for the first Number outcome in a grade, so you can match a unit to what your child is learning in class.",
      },
      {
        q: "How can I help at home?",
        a: "Ask your child's teacher which outcomes to focus on, then try short, regular practice (10 to 15 minutes). Celebrate effort and progress, not just results.",
      },
    ],
  },
};
