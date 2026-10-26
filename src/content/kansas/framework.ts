import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Kansas, a US state. Standards are adopted by the Kansas State Board of Education and published by the Kansas State
// Department of Education: mathematics (2017, reviewed in 2024), English language arts (2023), science (2013, the Next
// Generation Science Standards) and history, government and social studies (2020). Kansas has no statewide report-card
// scale, so the four steps below are the same plain practice scale as the other states'. Sources and the checking record
// are in docs/research/kansas/.

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
  id: "ks-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Kansas has no statewide report-card scale. Each school district chooses its own report card.",
  levels: LEVELS,
};

export const KANSAS: Framework = {
  id: "us-ks",
  slug: "kansas",
  name: "Kansas",
  shortName: "Kansas",
  country: "US",
  curriculumName: "the Kansas standards",
  region: "Kansas",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Kansas State Department of Education",
  sourceUrl: "https://www.ksde.gov/student-success/standards",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Kansas report cards",
    intro:
      "Kansas doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools mark each skill against the standards, and most middle and high schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The Kansas State Board of Education adopts the Kansas standards, which say what students should learn in each grade, and each district chooses its report card. Elementary report cards often use numbers or words for each standard, and older grades usually use letter grades. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "Kansas writes its standards with codes, like 4.NBT.1 in math, RL.4.2 in reading and 4-PS3-2 in science. In social studies, the same five standards (such as \"choices have consequences\") run through every grade. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Kansas Assessment Program (KAP) tests in English language arts and math in 3rd to 8th grade and 10th grade, and in science in 5th, 8th and 11th grade. Results come in a separate score report with a scale score from 400 to 700 and four levels; Levels 3 and 4 mean a student has reached the grade's expectations. They are not on the report card.",
      },
      {
        title: "The Kansas Report Card is about schools",
        body: "The Kansas Report Card website from the Kansas State Department of Education shares data about each school and district, such as state test results and graduation rates. It describes the school, not your child. Your child's own report card comes from their school.",
      },
      {
        title: "Reading under the Blueprint for Literacy",
        body: "Kansas's Blueprint for Literacy, a 2024 state law, trains teachers in the science of reading and sets a goal for far more students to read on grade level. Schools check reading in the early grades and give extra help to children who need it. Ask your school early how your child is reading.",
      },
    ],
    faqs: [
      {
        q: "Does Kansas have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with KAP results?",
        a: "They measure different things. KAP results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
