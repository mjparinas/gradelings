import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// Ohio, a US state. Standards are Ohio's Learning Standards, adopted by the State Board of Education and published by the
// Ohio Department of Education and Workforce: mathematics (2017), English language arts (Kindergarten to Grade 8 revised
// 2026, Grades 9 to 12 2017), science (2018) and social studies (Kindergarten to Grade 8 updated 2026, high school 2018).
// Ohio has no statewide report-card scale, so the four steps below are the same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/ohio/.

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
  id: "oh-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Ohio has no statewide report-card scale for students. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const OHIO: Framework = {
  id: "us-oh",
  slug: "ohio",
  name: "Ohio",
  shortName: "Ohio",
  country: "US",
  curriculumName: "Ohio's Learning Standards",
  region: "Ohio",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Ohio Department of Education and Workforce",
  sourceUrl: "https://education.ohio.gov/Topics/Learning-in-Ohio/OLS-Graphic-Sections/Learning-Standards",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding Ohio report cards",
    intro:
      "Ohio doesn't have one statewide report card for students. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts Ohio's Learning Standards, which say what students should learn in each grade, and districts choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meeting and Approaching, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "Ohio writes its standards with codes, like 4.NBT.1 in math, RL.4.2 in English language arts and 4.PS.2 in science. Social studies standards are numbered content statements for each grade. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take Ohio's State Tests in English language arts and math in 3rd to 8th grade, and in science in 5th and 8th grade. High school students take end-of-course tests in English language arts II, Algebra I, Geometry, Biology, American History and American Government. Results come in a separate score report, not on the report card.",
      },
      {
        title: "The Third Grade Reading Guarantee",
        body: "Schools check every child's reading in Kindergarten to 3rd grade, and a child who is not on track gets a reading improvement and monitoring plan made with the family. Third graders take the English language arts test in the fall and spring. A parent, with the child's reading teacher and principal, can ask for the child to move on to 4th grade whatever the score.",
      },
      {
        title: "Kindergarten is observed, not tested",
        body: "Early in kindergarten, teachers use Ohio's Kindergarten Readiness Assessment, watching how children learn and play, to plan their teaching. It isn't a grade.",
      },
    ],
    faqs: [
      {
        q: "Does Ohio have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with state test results?",
        a: "They measure different things. State test results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
