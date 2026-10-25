import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Kentucky, a US state. Standards are the Kentucky Academic Standards, adopted by the Kentucky Board of Education and
// published by the Kentucky Department of Education: mathematics (2019), reading and writing (October 2025), science
// (2022, based on the Next Generation Science Standards) and social studies (2022). Kentucky has no statewide
// report-card scale, so the four steps below are the same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/kentucky/.

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
  id: "ky-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Kentucky has no statewide report-card scale. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const KENTUCKY: Framework = {
  id: "us-ky",
  slug: "kentucky",
  name: "Kentucky",
  shortName: "Kentucky",
  country: "US",
  curriculumName: "the Kentucky Academic Standards",
  region: "Kentucky",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Kentucky Department of Education",
  sourceUrl: "https://www.education.ky.gov/curriculum/standards/kyacadstand/Pages/default.aspx",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Kentucky report cards",
    intro:
      "Kentucky doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle and high schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The Kentucky Department of Education publishes the Kentucky Academic Standards, which say what students should learn in each grade, and districts choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meets and Approaching, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "Kentucky writes its standards with codes, like KY.4.NBT.1 in math, RL.4.2 in reading, 4-PS3-2 in science and 4.H.CH.1 in social studies. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Kentucky Summative Assessments (KSA) in reading and math in 3rd to 8th grade and in 10th grade, science in 4th, 7th and 11th grade, and social studies in 5th, 8th and 11th grade. Results use four levels, Novice, Apprentice, Proficient and Distinguished, and come in a separate score report, not on the report card.",
      },
      {
        title: "Reading checks in the early grades",
        body: "Under Kentucky's Read to Succeed Act (2022), schools screen every child's reading in Kindergarten to 3rd grade, and a child who needs help gets a reading improvement plan with extra support. Ask your school how it shares these results.",
      },
    ],
    faqs: [
      {
        q: "Does Kentucky have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with KSA results?",
        a: "They measure different things. KSA results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
