import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// Massachusetts, a US state. Standards are the Massachusetts Curriculum Frameworks, adopted by the Board of Elementary
// and Secondary Education and published by the Department of Elementary and Secondary Education (DESE): mathematics
// (2017), English language arts and literacy (2017), science and technology/engineering (2016) and history and social
// science (2018). Massachusetts has no statewide report-card scale, so the four steps below are the same plain practice
// scale as the other states'. Sources and the checking record are in docs/research/massachusetts/.

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
  id: "ma-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Massachusetts has no statewide report-card scale for students. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const MASSACHUSETTS: Framework = {
  id: "us-ma",
  slug: "massachusetts",
  name: "Massachusetts",
  shortName: "Massachusetts",
  country: "US",
  curriculumName: "Massachusetts Curriculum Frameworks",
  region: "Massachusetts",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Massachusetts Department of Elementary and Secondary Education",
  sourceUrl: "https://www.doe.mass.edu/frameworks/",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding Massachusetts report cards",
    intro:
      "Massachusetts doesn't have one statewide report card for students. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The Board of Elementary and Secondary Education adopts the Massachusetts Curriculum Frameworks, which say what students should learn in each grade, and districts choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meeting and Approaching, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "The frameworks write their standards with codes, like 4.NBT.A.1 in math, RL.4.2 in English language arts and 4-PS3-1 in science. History and social science standards are numbered by grade and topic, like 3.T4.1 for the Pilgrims and the Plymouth Colony. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "MCAS results are separate",
        body: "Students take the MCAS tests in English language arts and math in 3rd to 8th grade and 10th grade, and in science and technology/engineering in 5th and 8th grade and once in high school. Results come in a separate score report, not on the report card. Since a 2024 ballot question, passing the MCAS is no longer required to graduate, but students still take the tests.",
      },
      {
        title: "Early reading checks",
        body: "Schools check every child's early reading skills from Kindergarten to 3rd grade, at least twice a year, and tell families when a child would benefit from extra help. These screenings guide teaching; they aren't grades.",
      },
      {
        title: "History and civics have their own milestones",
        body: "Third graders study Massachusetts and New England, and eighth graders take a full year of civics on United States and Massachusetts government, which ends with a civics project. Ask the teacher how the project shows up on the report card.",
      },
    ],
    faqs: [
      {
        q: "Does Massachusetts have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with MCAS results?",
        a: "They measure different things. MCAS results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
