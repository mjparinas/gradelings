import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// North Dakota, a US state. Standards are the ones the North Dakota Department of Public Instruction published:
// mathematics and English language arts (2023, North Dakota's own standards, which grew out of the Common Core), science
// (2019, built on the Next Generation Science Standards) and social studies (2019, revised 2023). All four are on the
// Department's CASE server. North Dakota has no statewide report-card scale, so the four steps below are the same plain
// practice scale as the other states'. Sources and the checking record are in docs/research/north-dakota/.

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
  id: "nd-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "North Dakota has no statewide report-card scale. Each school district and charter school chooses its own report card.",
  levels: LEVELS,
};

export const NORTH_DAKOTA: Framework = {
  id: "us-nd",
  slug: "north-dakota",
  name: "North Dakota",
  shortName: "North Dakota",
  country: "US",
  curriculumName: "the North Dakota standards",
  region: "North Dakota",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "North Dakota Department of Public Instruction",
  sourceUrl: "https://www.nd.gov/dpi/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding North Dakota report cards",
    intro:
      "North Dakota doesn't have one statewide report card. Each school district and charter school decides how it reports progress, so the words and marks on your child's report card depend on the school. Many elementary schools mark each skill against the standards, and most middle and high schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The North Dakota Department of Public Instruction (NDDPI) sets the standards that say what students should learn in each grade, and each district chooses its report card. Many elementary schools mark each standard with a number or a word, and older grades usually use letter grades. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "North Dakota's standards have codes, like 4.NO.NBT.1 in math, 4.R.3 in reading, 4-PS3-2 in science and H.3_5.10 in social studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the North Dakota state assessment (the ND A+ Summative) in English language arts and math in 3rd to 8th grade and 10th grade, and in science in 4th, 8th and 10th grade. Results come in a separate score report with performance levels, not on the report card.",
      },
      {
        title: "North Dakota studies in 4th and 8th grade",
        body: "State law asks schools to teach North Dakota studies in 4th grade and again in 8th grade: the state's land and regions, its tribal nations and the North Dakota Native American Essential Understandings, settlement, statehood, government and the economy, from farming to energy.",
      },
      {
        title: "A civics test for graduation",
        body: "To graduate from high school in North Dakota, students pass a civics test drawn from the 100 questions of the United States citizenship test, answering at least 70 correctly. Students can take it from 7th grade on, as often as they need to.",
      },
    ],
    faqs: [
      {
        q: "Does North Dakota have one scale for every school?",
        a: `No. Each district and charter school chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
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
