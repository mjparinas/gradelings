import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Michigan, a US state. Standards are the Michigan K-12 Standards, adopted by the State Board of Education and published
// by the Michigan Department of Education: mathematics and English language arts (2010, the Common Core), science (2015,
// based on the Next Generation Science Standards) and social studies (2019). Michigan has no statewide report-card
// scale, so the four steps below are the same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/michigan/.

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
  id: "mi-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Michigan has no statewide report-card scale. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const MICHIGAN: Framework = {
  id: "us-mi",
  slug: "michigan",
  name: "Michigan",
  shortName: "Michigan",
  country: "US",
  curriculumName: "the Michigan K-12 Standards",
  region: "Michigan",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Michigan Department of Education",
  sourceUrl: "https://www.michigan.gov/mde/services/academic-standards",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Michigan report cards",
    intro:
      "Michigan doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The Michigan Department of Education publishes the learning standards, which say what students should learn in each grade, and districts choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meeting and Approaching, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "Michigan writes its standards with codes, like 4.NBT.1 in math, RL.4.2 in reading, 4-PS3-2 in science and 4-H3.0.6 in social studies. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the M-STEP in English language arts and math in 3rd to 7th grade, and in science and social studies in 5th and 8th grade. In 8th grade, the PSAT 8/9 gives the English language arts and math scores. In high school, students take the PSAT 8/9 and PSAT 10, then the Michigan Merit Examination, with the SAT, in 11th grade. Results come in a separate score report, not on the report card.",
      },
      {
        title: "Reading checks in the early grades",
        body: "Under Michigan's Read by Grade Three Law, schools check reading in Kindergarten to 3rd grade, and a child who needs help gets an individual reading improvement plan. The law no longer requires holding a 3rd grader back for reading. Ask your school how it shares these results.",
      },
    ],
    faqs: [
      {
        q: "Does Michigan have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with M-STEP results?",
        a: "They measure different things. M-STEP results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
