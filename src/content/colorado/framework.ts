import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Colorado, a US state. Standards are the Colorado Academic Standards, adopted by the Colorado State Board of Education
// and published by the Colorado Department of Education: mathematics (2020), reading, writing and communicating (2020),
// science (2020) and social studies (2022). Colorado has no statewide report-card scale, so the four steps below are the
// same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/colorado/.

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
  id: "co-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Colorado has no statewide report-card scale. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const COLORADO: Framework = {
  id: "us-co",
  slug: "colorado",
  name: "Colorado",
  shortName: "Colorado",
  country: "US",
  curriculumName: "the Colorado Academic Standards",
  region: "Colorado",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Colorado Department of Education",
  sourceUrl: "https://www.cde.state.co.us/standardsandinstruction",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Colorado report cards",
    intro:
      "Colorado doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The Colorado State Board of Education adopts the Colorado Academic Standards, which say what students should learn in each grade, and districts choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meeting and Approaching, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "Colorado writes its standards with codes, like 4.NBT.A.1 in math, 4.2.1.a in reading, writing and communicating, and 4.H.1.a in social studies. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Colorado Measures of Academic Success (CMAS) in English language arts and math in 3rd to 8th grade, and in science in 5th and 8th grade. Some schools also give CMAS social studies in 4th or 7th grade. In high school, students take the PSAT in 9th and 10th grade and the SAT in 11th grade. Results come in a separate score report, not on the report card.",
      },
      {
        title: "Reading checks in Kindergarten to 3rd grade",
        body: "Under Colorado's READ Act, schools check every child's reading in Kindergarten to 3rd grade. A child who needs extra help gets a READ plan, made with the family, that says what support the school will give.",
      },
      {
        title: "Kindergarten is observed, not tested",
        body: "Early in kindergarten, teachers use a school readiness assessment, watching how children learn and play, to plan their teaching. It isn't a grade.",
      },
    ],
    faqs: [
      {
        q: "Does Colorado have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with CMAS results?",
        a: "They measure different things. CMAS results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
