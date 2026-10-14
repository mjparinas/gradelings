import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Texas, the fourth US state. Standards are the Texas Essential Knowledge and Skills (TEKS), adopted by the State Board
// of Education and published by the Texas Education Agency (TEA) in 19 Texas Administrative Code Chapters 110 (English
// language arts and reading, 2017), 111 (mathematics, 2012), 112 (science, 2021) and 113 (social studies, 2022 edition).
// Texas has no statewide report card, so the four steps below are the same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/texas/.

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
  id: "tx-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Texas has no statewide report card. Districts choose their own; many use number grades from 0 to 100, and many kindergartens and some elementary schools use a standards-based scale like this one.",
  levels: LEVELS,
};

export const TEXAS: Framework = {
  id: "us-tx",
  slug: "texas",
  name: "Texas",
  shortName: "Texas",
  country: "US",
  curriculumName: "Texas Essential Knowledge and Skills (TEKS)",
  region: "Texas",
  overviewLabel: "Focus areas",
  standardLabel: "TEKS student expectation",
  sourceName: "Texas Education Agency (TEA)",
  sourceUrl: "https://tea.texas.gov/curriculum-and-instruction/texas-essential-knowledge-and-skills-teks",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Texas report cards",
    intro:
      "Texas doesn't have one statewide report card. Each school district decides how it reports, so the words and numbers on your child's report card depend on the district. Many districts give number grades from 0 to 100 from about 1st or 2nd grade, and many kindergartens use a standards-based checklist instead.",
    facts: [
      {
        title: "Your district decides how grades look",
        body: "The State Board of Education sets the Texas Essential Knowledge and Skills (TEKS), which say what students should learn in each grade and course. Your district chooses the report card, its scale and how often you hear from the school.",
      },
      {
        title: "Number grades are common",
        body: "Many Texas districts report a number grade out of 100 for each subject, often with 70 as the lowest passing grade. Some elementary schools use letters or a 1 to 4 standards-based scale instead. Read your child's report card key for the exact words.",
      },
      {
        title: "Grades reflect mastery",
        body: "Texas law asks teachers to give grades that reflect how well a student has mastered the work, and it doesn't let a district require a minimum grade regardless of the work. Many districts also let students redo work they did poorly on.",
      },
      {
        title: "State tests are separate",
        body: "Texas students take state tests in reading and math in grades 3 to 8, science in grades 5 and 8, social studies in grade 8, and end-of-course tests in high school, including Algebra I, English I and Biology. Scores come in four levels and are separate from the report card. Texas is replacing these tests with shorter tests given during the year, so check with TEA for the current plan.",
      },
      {
        title: "Texas history twice",
        body: "Texas students study their state's history in 4th grade and again, in more depth, in 7th grade.",
      },
    ],
    faqs: [
      {
        q: "Does Texas have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the grades on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "What is the difference between Meeting and Exceeding?",
        a: "Meeting means a solid grasp of the TEKS for the grade. Exceeding means your child also does well on harder, unfamiliar questions. It isn't expected in every area.",
      },
      {
        q: `Does ${APP_NAME} give my child a grade?`,
        a: `No. ${APP_NAME} shows how practice is going. Your child's teacher decides the grades on the report card.`,
      },
      {
        q: "How can I help at home?",
        a: "Ask your child's teacher which TEKS to focus on, then try short, regular practice (10 to 15 minutes). Celebrate effort and progress, not just results.",
      },
    ],
  },
};
