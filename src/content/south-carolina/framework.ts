import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// South Carolina, a US state. Standards are the South Carolina College- and Career-Ready Standards adopted by the State
// Board of Education and published by the South Carolina Department of Education: Mathematics (2025), English Language
// Arts (2023), Science (2021) and Social Studies (2019). South Carolina has no statewide report-card scale for these
// grades, so the four steps below are the same plain practice scale as the other states'. Sources and the checking
// record are in docs/research/south-carolina/.

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
  id: "sc-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "South Carolina has no statewide report-card scale for kindergarten to 8th grade. Districts choose their own report cards, and many elementary schools use a standards-based scale in the early grades and number or letter grades later.",
  levels: LEVELS,
};

export const SOUTH_CAROLINA: Framework = {
  id: "us-sc",
  slug: "south-carolina",
  name: "South Carolina",
  shortName: "South Carolina",
  country: "US",
  curriculumName: "South Carolina College- and Career-Ready Standards",
  region: "South Carolina",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "South Carolina Department of Education",
  sourceUrl: "https://ed.sc.gov/instruction/standards/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding South Carolina report cards",
    intro:
      "South Carolina doesn't have one statewide report card for kindergarten through 8th grade. Each school district decides how it reports, so the words and numbers on your child's report card depend on the school. Many elementary schools use a standards-based scale in the early grades, and most schools give number or letter grades later on.",
    facts: [
      {
        title: "Your district decides how grades look",
        body: "The South Carolina Department of Education sets the South Carolina College- and Career-Ready Standards, which say what students should learn in each grade. Your district chooses the report card, its scale and how often you hear from the school.",
      },
      {
        title: "Standards-based marks in the early grades",
        body: "Many schools mark the early grades against the standards, often with a 1 to 4 scale or words like Meeting, Progressing and Beginning. Read your child's report card key for the exact words.",
      },
      {
        title: "One grading scale for high school credit",
        body: "Courses that earn high school credit, including most 9th grade courses, use South Carolina's Uniform Grading Policy: A is 90 to 100, B 80 to 89, C 70 to 79, D 60 to 69 and F below 60.",
      },
      {
        title: "State tests are separate",
        body: "Students take SC READY in English language arts and math in grades 3 to 8 each spring, with four levels from Does Not Meet to Exceeds Expectations, and SCPASS science in elementary and middle school. High school courses such as Algebra 1, English 2, Biology 1 and US History end with an End-of-Course exam. Results are separate from the report card.",
      },
      {
        title: "Reading by the end of 3rd grade",
        body: "Under the Read to Succeed Act, schools check reading from kindergarten on, and a 3rd grader who scores at the lowest level on the SC READY reading test may be held back, with good-cause exemptions and summer reading help.",
      },
    ],
    faqs: [
      {
        q: "Does South Carolina have one scale for every school?",
        a: `No, not before high school. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with SC READY levels?",
        a: "They measure different things. SC READY levels come from one test each spring, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
