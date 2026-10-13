import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// California, the third US state. Standards are the California Department of Education's (CDE): the California Common
// Core State Standards for Mathematics (2013) and for English Language Arts & Literacy (2013), the Next Generation
// Science Standards for California Public Schools (2013, with the Preferred Integrated Model for middle school) and the
// History–Social Science Content Standards (1998, with the 2016 Framework). California has no statewide report card,
// so the four steps below are the same plain practice scale as Washington's and Oregon's. Sources and the checking
// record are in docs/research/california/. California is not offered to families yet: it sits in UPCOMING_FRAMEWORKS
// until its content is done.

const LEVELS: ProficiencyLevel[] = [
  {
    id: "beginning",
    label: "Beginning",
    kidLabel: "Seedling",
    icon: "🌱",
    colour: "#ff9636",
    description:
      "Practice shows a first understanding of the learning standards. Most answers still need a hint or a second try.",
    atHome:
      "Just getting started with this idea. Short, regular practice with lots of support helps most.",
  },
  {
    id: "approaching",
    label: "Approaching",
    kidLabel: "Sprout",
    icon: "🌿",
    colour: "#f5b301",
    description:
      "Practice shows a partial understanding of the learning standards. Some answers are right on the first try.",
    atHome:
      "Understands parts of it and is building confidence. Keep practicing the tricky parts.",
  },
  {
    id: "meeting",
    label: "Meeting",
    kidLabel: "Tree",
    icon: "🌳",
    colour: "#25b47e",
    description:
      "Practice shows a solid understanding of the learning standards. Most answers are right on the first try.",
    atHome: "Has it! Mixed review now and then keeps it strong.",
  },
  {
    id: "exceeding",
    label: "Exceeding",
    kidLabel: "Star",
    icon: "⭐",
    colour: "#4f8ef7",
    description:
      "Practice shows a deep understanding of the learning standards, including harder, unfamiliar questions.",
    atHome:
      "Applies it confidently, even in new or harder situations. Try challenge mode and real-life problems.",
  },
];

const SCHEME: ScoringScheme = {
  id: "ca-practice-steps",
  name: "Four practice steps",
  source:
    "California has no statewide report card. Districts choose their own, and many elementary schools use a 4-point standards-based scale like this one.",
  levels: LEVELS,
};

export const CALIFORNIA: Framework = {
  id: "us-ca",
  slug: "california",
  name: "California",
  shortName: "California",
  country: "US",
  curriculumName: "California Content Standards",
  region: "California",
  overviewLabel: "Focus areas",
  standardLabel: "Learning standard",
  sourceName: "California Department of Education (CDE)",
  sourceUrl: "https://www.cde.ca.gov/be/st/ss/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding California report cards",
    intro:
      "California doesn't have one statewide report card. Each school district decides how it reports, so the words and numbers on your child's report card depend on the district. Many elementary schools use a 4-point standards-based scale, and middle and high schools usually give letter grades.",
    facts: [
      {
        title: "Your district decides how grades look",
        body: "The California Department of Education and the State Board of Education set the content standards, which say what students should learn in each grade. Your district chooses the report card, its scale and how often you hear from the school.",
      },
      {
        title: "Many elementary schools use 1 to 4",
        body: "A common pattern is 4 (exceeds the standard), 3 (meets the standard), 2 (nearly meets the standard) and 1 (not yet meeting it). A 3 is the goal for the grade. Read your child's report card key for the exact words.",
      },
      {
        title: "Letter grades from middle school",
        body: "Most middle and high schools give letter grades for each class, often with comments on work habits and citizenship.",
      },
      {
        title: "State tests are separate",
        body: "Students take the California Assessment of Student Performance and Progress (CAASPP): Smarter Balanced tests in English language arts and math in grades 3 to 8 and 11, and the California Science Test in grades 5 and 8 and once in high school. Scores are reported in four levels, from Standard Not Met to Standard Exceeded. They are separate from the report card.",
      },
      {
        title: "Middle school science is integrated",
        body: "California's preferred model teaches middle school science as integrated courses, with life, Earth and physical science in each of grades 6, 7 and 8. Some districts teach one science discipline a year instead.",
      },
    ],
    faqs: [
      {
        q: "Does California have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "What is the difference between Meeting and Exceeding?",
        a: "Meeting means a solid grasp of the standards for the grade. Exceeding means your child also does well on harder, unfamiliar questions. It isn't expected in every area.",
      },
      {
        q: `Does ${APP_NAME} give my child a grade?`,
        a: `No. ${APP_NAME} shows how practice is going. Your child's teacher decides how they are doing on the report card.`,
      },
      {
        q: "How can I help at home?",
        a: "Ask your child's teacher which standards to focus on, then try short, regular practice (10 to 15 minutes). Celebrate effort and progress, not just results.",
      },
    ],
  },
};
