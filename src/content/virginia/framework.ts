import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Virginia, a US state. Standards are the Virginia Board of Education's Standards of Learning (SOL): Mathematics (2023),
// English (2024), Science (2018, with the 2026 technical edits) and History and Social Science (2023), as the Virginia
// Department of Education publishes them. Virginia has no statewide report-card scale, so the four steps below are the
// same plain practice scale as the other states'. Sources and the checking record are in docs/research/virginia/.

const LEVELS: ProficiencyLevel[] = [
  {
    id: "beginning",
    label: "Beginning",
    kidLabel: "Seedling",
    icon: "🌱",
    colour: "#ff9636",
    description:
      "Practice shows a first understanding of the standards. Most answers still need a hint or a second try.",
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
      "Practice shows a partial understanding of the standards. Some answers are right on the first try.",
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
      "Practice shows a solid understanding of the standards. Most answers are right on the first try.",
    atHome: "Has it! Mixed review now and then keeps it strong.",
  },
  {
    id: "exceeding",
    label: "Exceeding",
    kidLabel: "Star",
    icon: "⭐",
    colour: "#4f8ef7",
    description:
      "Practice shows a deep understanding of the standards, including harder, unfamiliar questions.",
    atHome:
      "Applies it confidently, even in new or harder situations. Try challenge mode and real-life problems.",
  },
];

const SCHEME: ScoringScheme = {
  id: "va-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Virginia has no statewide report-card scale. Each school division chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const VIRGINIA: Framework = {
  id: "us-va",
  slug: "virginia",
  name: "Virginia",
  shortName: "Virginia",
  country: "US",
  curriculumName: "the Virginia Standards of Learning",
  region: "Virginia",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Virginia Department of Education",
  sourceUrl: "https://www.doe.virginia.gov/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Virginia report cards",
    intro:
      "Virginia doesn't have one statewide report card. Each school division (Virginia's word for a school district) decides how it reports progress, so the words and marks on your child's report card depend on the division. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your school division decides how the report card looks",
        body: "The Virginia Board of Education adopts the Standards of Learning, which say what students should learn in each grade, and school divisions choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meets and Approaching, and many middle schools give letter grades. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "The Standards of Learning have codes, like 4.NS.3 in math, 4.RL.1 in English, 4.4 in science and VS.5 in Virginia Studies. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "SOL tests are separate",
        body: "Students take Standards of Learning (SOL) tests in reading and math in 3rd to 8th grade, in science in 5th and 8th grade, and in writing in 8th grade, plus end-of-course tests in high school. In reading and math, shorter growth tests in the fall and winter show progress during the year. Results come in a separate score report, not on the report card.",
      },
      {
        title: "Reading checks in Kindergarten to 3rd grade",
        body: "Under the Virginia Literacy Act, schools check every child's reading with a short screener in Kindergarten to 3rd grade. A child who needs extra help gets a reading plan, and the school tells the family.",
      },
      {
        title: "Kindergarten readiness",
        body: "In kindergarten, teachers use the Virginia Kindergarten Readiness Program in the fall and spring to see children's early literacy, math and social-emotional skills and plan their teaching. It isn't a grade.",
      },
    ],
    faqs: [
      {
        q: "Does Virginia have one scale for every school?",
        a: `No. Each school division chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with SOL test results?",
        a: "They measure different things. SOL results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
