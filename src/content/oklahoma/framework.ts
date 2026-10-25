import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Oklahoma, a US state. Standards are the Oklahoma Academic Standards, adopted by the State Board of Education and
// published by the Oklahoma State Department of Education: mathematics (2022, in classrooms from fall 2023), English
// language arts (2021), science (2026) and social studies (2026, approved March 26, 2026). Oklahoma has no statewide
// report-card scale for Kindergarten to Grade 8, so the four steps below are the same plain practice scale as the other
// states'. Sources and the checking record are in docs/research/oklahoma/.

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
  id: "ok-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Oklahoma has no statewide report-card scale for students in Kindergarten to 8th grade. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const OKLAHOMA: Framework = {
  id: "us-ok",
  slug: "oklahoma",
  name: "Oklahoma",
  shortName: "Oklahoma",
  country: "US",
  curriculumName: "Oklahoma Academic Standards",
  region: "Oklahoma",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Oklahoma State Department of Education",
  sourceUrl: "https://oklahoma.gov/education/services/standards-learning/oklahoma-academic-standards.html",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Oklahoma report cards",
    intro:
      "Oklahoma doesn't have one statewide report card for students in kindergarten to 8th grade. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts the Oklahoma Academic Standards, which say what students should learn in each grade, and districts choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meeting and Approaching, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "Oklahoma writes its standards with codes, like 4.N.2.2 in math, 4.3.R.5 in English language arts, 4.PS3.2 in science and 3.C.2.4 in social studies. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Oklahoma School Testing Program (OSTP) tests in English language arts and math in 3rd to 8th grade, and in science in 5th and 8th grade, near the end of the school year. Results come in a separate score report with four levels (Below Basic, Basic, Proficient and Advanced), not on the report card.",
      },
      {
        title: "Reading in kindergarten to 3rd grade",
        body: "Under Oklahoma's Strong Readers Act, schools screen reading three times a year in kindergarten to 3rd grade and write a reading plan for a child who needs extra help. A 3rd grader who isn't reading on grade level may need more support before moving on to 4th grade, so ask the school early about the screener it uses and your child's results.",
      },
      {
        title: "High school credits and grades",
        body: "In high school, students earn credits toward graduation, including Oklahoma History and Government and United States Government. Each district sets its grading scale, and most use letter grades.",
      },
    ],
    faqs: [
      {
        q: "Does Oklahoma have one scale for every school?",
        a: `Not for kindergarten to 8th grade. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with OSTP results?",
        a: "They measure different things. OSTP results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
