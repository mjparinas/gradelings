import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// New Jersey, a US state. Standards are the New Jersey Student Learning Standards (NJSLS), adopted by the New Jersey
// State Board of Education and published by the New Jersey Department of Education: mathematics (2023), English language
// arts (2023), science (readopted 2026), social studies (2020) and Career Readiness, Life Literacies, and Key Skills
// (2020, for personal financial literacy). New Jersey has no statewide report-card scale, so the four steps below are
// the same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/new-jersey/.

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
  id: "nj-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "New Jersey has no statewide report-card scale. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const NEW_JERSEY: Framework = {
  id: "us-nj",
  slug: "new-jersey",
  name: "New Jersey",
  shortName: "New Jersey",
  country: "US",
  curriculumName: "the New Jersey Student Learning Standards",
  region: "New Jersey",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "New Jersey Department of Education",
  sourceUrl: "https://www.nj.gov/education/standards/",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding New Jersey report cards",
    intro:
      "New Jersey doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The New Jersey State Board of Education adopts the New Jersey Student Learning Standards, which say what students should learn, and districts write their own curriculum and choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meeting and Approaching, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "New Jersey writes its standards with codes, like 4.NBT.A.1 in math, RL.CR.4.1 in English language arts and 4-PS3-2 in science. Social studies codes, like 6.1.5.HistoryCC.3, cover a band of grades. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the New Jersey Student Learning Assessments (NJSLA) in English language arts in 3rd to 9th grade and in math in 3rd to 8th grade, with Algebra I, Geometry or Algebra II in high school. Since spring 2026 these tests are adaptive: the questions change with each answer. Science is tested in 5th, 8th and 11th grade. Results come in a separate score report, not on the report card.",
      },
      {
        title: "Reading screening in the early grades",
        body: "New Jersey law asks schools to screen children who show signs of reading difficulties, such as dyslexia, in Kindergarten to 2nd grade, no later than the first half of 2nd grade, so help can start early.",
      },
      {
        title: "Kindergarten is not graded on a test",
        body: "New Jersey has no statewide kindergarten test. Kindergarten report cards describe how a child is growing in reading, math and getting along with others.",
      },
    ],
    faqs: [
      {
        q: "Does New Jersey have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with NJSLA results?",
        a: "They measure different things. NJSLA results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
