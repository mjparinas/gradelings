import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Pennsylvania, a US state. Standards are the Pennsylvania Department of Education's academic standards: the PA Core
// Standards for mathematics and for English language arts, the Pennsylvania Integrated Standards for Science, Environment,
// Ecology, Technology and Engineering (PDE's STEELS) for science, and the academic standards for civics and government, economics,
// geography and history for social studies. Pennsylvania has no statewide report-card scale, so the four steps below are the
// same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/pennsylvania/.

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
  id: "pa-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Pennsylvania has no statewide report-card scale. Each school district decides how it reports, and the state's tests (PSSA and the Keystone Exams) use their own achievement levels.",
  levels: LEVELS,
};

export const PENNSYLVANIA: Framework = {
  id: "us-pa",
  slug: "pennsylvania",
  name: "Pennsylvania",
  shortName: "Pennsylvania",
  country: "US",
  curriculumName: "Pennsylvania's academic standards",
  region: "Pennsylvania",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Pennsylvania Department of Education",
  sourceUrl: "https://www.pa.gov/agencies/education",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Pennsylvania report cards",
    intro:
      "Pennsylvania doesn't have one statewide report card. The Department of Education sets the academic standards, and each school district decides how it reports, so the words and marks on your child's report card depend on the district.",
    facts: [
      {
        title: "Your district decides what the report card looks like",
        body: "Pennsylvania sets what students should learn in each grade, and districts choose how to grade and report. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meets Standard and Progressing, and many middle schools use letter grades or percentages. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards describe the goal, local schools choose the lessons",
        body: "State standards say what students should know and be able to do, such as the PA Core Standards in math and English language arts. Each district writes its own curriculum to meet them, so the order of topics can differ from school to school.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Pennsylvania System of School Assessment (PSSA) in English language arts and math in grades 3 to 8 and in science in grades 5 and 8, and the Keystone Exams in high school courses such as Algebra I, Literature and Biology. Results come in four performance levels: Advanced, Proficient, Basic and Below Basic. They are separate from the report card.",
      },
      {
        title: "Standards have codes",
        body: "Pennsylvania labels its standards with codes, such as CC.2.1.4.B.1 in math or 3.1.4.A in science. Progress reports and teachers sometimes use them, so the codes are a handy way to talk with the teacher.",
      },
    ],
    faqs: [
      {
        q: "Does Pennsylvania have one report card for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with PSSA performance levels?",
        a: "They measure different things. PSSA levels come from a test, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
