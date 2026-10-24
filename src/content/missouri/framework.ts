import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Missouri, a US state. Standards are the Missouri Learning Standards' Grade-Level Expectations, adopted by the State
// Board of Education in April 2016 and published by the Missouri Department of Elementary and Secondary Education (DESE):
// mathematics, English language arts, science and social studies. Missouri has no statewide report-card scale, so the
// four steps below are the same plain practice scale as the other states'. Sources and the checking record are in
// docs/research/missouri/.

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
  id: "mo-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Missouri has no statewide report-card scale for students. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const MISSOURI: Framework = {
  id: "us-mo",
  slug: "missouri",
  name: "Missouri",
  shortName: "Missouri",
  country: "US",
  curriculumName: "Missouri Learning Standards",
  region: "Missouri",
  overviewLabel: "Focus areas",
  standardLabel: "Grade-level expectation",
  sourceName: "Missouri Department of Elementary and Secondary Education",
  sourceUrl: "https://dese.mo.gov/college-career-readiness/curriculum/missouri-learning-standards",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Missouri report cards",
    intro:
      "Missouri doesn't have one statewide report card for students. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts the Missouri Learning Standards, which say what students should learn in each grade, and districts choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meeting and Approaching, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "Missouri writes its Grade-Level Expectations with codes, like 4.NBT.A.1 in math, 4.R.1.A in English language arts, 4.PS3.A.1 in science and 3.H.3.F.a in social studies. Standards-based report cards often group results by these expectations, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Missouri Assessment Program (MAP) Grade-Level tests in English language arts and math in 3rd to 8th grade, and in science in 5th and 8th grade. Before graduating, high school students take End-of-Course tests in Algebra I, English II, Biology and Government. Results come in a separate score report, not on the report card.",
      },
      {
        title: "Reading checks in the early grades",
        body: "Schools check every child's reading at the start and end of each year in Kindergarten to 3rd grade. A child who is a grade level or more behind gets a reading success plan with extra reading instruction, and the school tells the family in writing. If a child is still behind at the end of 3rd grade, the parent and the school decide together whether the child moves on.",
      },
      {
        title: "The Missouri and US Constitutions",
        body: "Missouri law asks every school to teach the United States and Missouri Constitutions, starting no later than 7th grade, and every high school student takes a government course and passes a civics test like the one for new citizens before graduating.",
      },
    ],
    faqs: [
      {
        q: "Does Missouri have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with MAP results?",
        a: "They measure different things. MAP results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
      },
      {
        q: `Does ${APP_NAME} give my child a grade?`,
        a: `No. ${APP_NAME} shows how practice is going. Your child's teacher decides how they are doing on the report card.`,
      },
      {
        q: "How can I help at home?",
        a: "Ask your child's teacher which expectations to focus on, then try short, regular practice (10 to 15 minutes). Celebrate effort and progress, not just results.",
      },
    ],
  },
};
