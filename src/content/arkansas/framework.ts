import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Arkansas, a US state. Standards are the Arkansas Academic Standards adopted by the Arkansas State Board of Education and
// published by the Arkansas Department of Education, Division of Elementary and Secondary Education (DESE): Mathematics
// (2023), English Language Arts (2023), the K-12 Science Standards and Social Studies (2022). Arkansas has no statewide
// report-card scale for these grades, so the four steps below are the same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/arkansas/.

const LEVELS: ProficiencyLevel[] = [
  {
    id: "beginning",
    label: "Beginning",
    kidLabel: "Seedling",
    icon: "🌱",
    colour: "#ff9636",
    description:
      "Practice shows a first understanding of the content standards. Most answers still need a hint or a second try.",
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
      "Practice shows a partial understanding of the content standards. Some answers are right on the first try.",
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
      "Practice shows a solid understanding of the content standards. Most answers are right on the first try.",
    atHome: "Has it! Mixed review now and then keeps it strong.",
  },
  {
    id: "exceeding",
    label: "Exceeding",
    kidLabel: "Star",
    icon: "⭐",
    colour: "#4f8ef7",
    description:
      "Practice shows a deep understanding of the content standards, including harder, unfamiliar questions.",
    atHome:
      "Applies it confidently, even in new or harder situations. Try challenge mode and real-life problems.",
  },
];

const SCHEME: ScoringScheme = {
  id: "ar-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Arkansas has no statewide report-card scale for kindergarten to 8th grade. Districts choose their own report cards, and many elementary schools use a standards-based scale for the early grades and letter grades later.",
  levels: LEVELS,
};

export const ARKANSAS: Framework = {
  id: "us-ar",
  slug: "arkansas",
  name: "Arkansas",
  shortName: "Arkansas",
  country: "US",
  curriculumName: "Arkansas Academic Standards",
  region: "Arkansas",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Arkansas Department of Education, Division of Elementary and Secondary Education",
  sourceUrl: "https://dese.ade.arkansas.gov/Offices/learning-services/curriculum-support/standards-and-courses",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Arkansas report cards",
    intro:
      "Arkansas doesn't have one statewide report card for kindergarten through 8th grade. Each school district decides how it reports, so the words and numbers on your child's report card depend on the school. Many elementary schools use a standards-based scale in the early grades, and most schools give letter grades later on.",
    facts: [
      {
        title: "Your district decides how grades look",
        body: "The Arkansas Department of Education sets the Arkansas Academic Standards, which say what students should learn in each grade. Your district chooses the report card, its scale and how often you hear from the school.",
      },
      {
        title: "Standards-based marks in the early grades",
        body: "Many schools mark the early grades against the standards, often with a 1 to 4 scale or words like Mastered, Progressing and Needs Support. Read your child's report card key for the exact words.",
      },
      {
        title: "Letter grades later, and one scale in high school",
        body: "Most schools give a letter grade for each subject in the upper grades. High school courses, including 9th grade, use Arkansas's uniform grading scale: A is 90 to 100, B 80 to 89, C 70 to 79, D 60 to 69 and F below 60.",
      },
      {
        title: "State tests are separate",
        body: "Students take ATLAS, the Arkansas Teaching and Learning Assessment System: English language arts, math and science in grades 3 to 10 each spring (with no 9th grade science test), plus shorter literacy and math checks in kindergarten to 2nd grade. Results come in four levels, and Levels 3 and 4 count as proficient. They are separate from the report card.",
      },
      {
        title: "Reading by the end of 3rd grade",
        body: "Under the LEARNS Act, schools check reading from kindergarten on, and from the end of the 2025-26 school year a 3rd grader needs Level 2 or above on the ATLAS reading test to move on to 4th grade, with some good-cause exemptions.",
      },
    ],
    faqs: [
      {
        q: "Does Arkansas have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with ATLAS levels?",
        a: "They measure different things. ATLAS levels come from one test each spring, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
