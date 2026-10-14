import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// New York, the fourth US state. Standards are the New York State Education Department's (NYSED): the NYS Next
// Generation Mathematics Learning Standards (2017, Algebra I in Grade 9), the NYS Next Generation English Language Arts
// Learning Standards (2017), the NYS P-12 Science Learning Standards (2016) and the NYS K-12 Social Studies Framework
// (2014, with the 2016 and 2017 updates). New York has no statewide report card, so the four steps below are the same
// plain practice scale as the other states'. Sources and the checking record are in docs/research/new-york/.

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
  id: "ny-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "New York has no statewide report card. Districts choose their own, and many elementary schools use a 4-point standards-based scale like this one.",
  levels: LEVELS,
};

export const NEW_YORK: Framework = {
  id: "us-ny",
  slug: "new-york",
  name: "New York",
  shortName: "New York",
  country: "US",
  curriculumName: "New York State Learning Standards",
  region: "New York",
  overviewLabel: "Focus areas",
  standardLabel: "Learning standard",
  sourceName: "New York State Education Department (NYSED)",
  sourceUrl: "https://www.nysed.gov/curriculum-instruction",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding New York report cards",
    intro:
      "New York doesn't have one statewide report card. Each school district decides how it reports, so the words and numbers on your child's report card depend on the district. Many elementary schools use a 4-point standards-based scale, and middle and high schools usually give number or letter grades.",
    facts: [
      {
        title: "Your district decides how grades look",
        body: "The New York State Education Department (NYSED) and the Board of Regents set the learning standards, which say what students should learn in each grade. Your district chooses the report card, its scale and how often you hear from the school.",
      },
      {
        title: "Many elementary schools use 1 to 4",
        body: "A common pattern is 4 (exceeds the standard), 3 (meets the standard), 2 (approaching the standard) and 1 (well below the standard). A 3 is the goal for the grade. Read your child's report card key for the exact words.",
      },
      {
        title: "Number grades from middle school",
        body: "Most middle and high schools give a grade out of 100 or a letter grade for each class, often with comments on work habits.",
      },
      {
        title: "State tests are separate",
        body: "Students take the New York State tests in English language arts and math in grades 3 to 8, and in science in grades 5 and 8. Scores are reported in four levels, and Level 3 means proficient. High school students take Regents Exams, and many take the Algebra I Regents in grade 9. All of these are separate from the report card.",
      },
      {
        title: "Middle school science is a 6 to 8 band",
        body: "New York's middle school science standards cover grades 6 to 8 together, and each district decides which topics come in which year. Many 8th graders also take a high school science course.",
      },
    ],
    faqs: [
      {
        q: "Does New York have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with state test levels?",
        a: "They measure different things. State test Levels 1 to 4 come from one test day each spring, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
