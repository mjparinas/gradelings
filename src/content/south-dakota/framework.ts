import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// South Dakota, a US state. Standards are the ones the South Dakota Board of Education Standards adopted: the South
// Dakota State Standards for Mathematics (2018, built on the Common Core), the English Language Arts Standards (April
// 2025), the Science Standards (April 2024, built on the Next Generation Science Standards) and the Social Studies
// Standards (April 2023). South Dakota has no statewide report-card scale, so the four steps below are the same plain
// practice scale as the other states'. Sources and the checking record are in docs/research/south-dakota/.

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
  id: "sd-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "South Dakota has no statewide report-card scale. Each school district chooses its own report card.",
  levels: LEVELS,
};

export const SOUTH_DAKOTA: Framework = {
  id: "us-sd",
  slug: "south-dakota",
  name: "South Dakota",
  shortName: "South Dakota",
  country: "US",
  curriculumName: "the South Dakota standards",
  region: "South Dakota",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "South Dakota Department of Education",
  sourceUrl: "https://doe.sd.gov/contentstandards/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding South Dakota report cards",
    intro:
      "South Dakota doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the school. Many elementary schools mark each skill against the standards, and most middle and high schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The South Dakota Department of Education publishes the standards that say what students should learn in each grade, and each school district chooses its report card. Elementary report cards often use numbers or words for each standard, and older grades usually use letter grades. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "South Dakota's standards have codes, like 4.NBT.1 in math, 4.RL.2 in reading, 4-PS3-2 in science and 4.SS.2 in social studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the South Dakota ELA and Math Assessments in 3rd to 8th grade, the South Dakota Science Assessment in 5th and 8th grade, and the SD-ACT in 11th grade. Results come in a separate score report, not on the report card. The ELA and math tests report four achievement levels, from Level 1 (not met) to Level 4 (exceeded).",
      },
      {
        title: "History in order, every year",
        body: "South Dakota's social studies standards move through history in order. From 1st to 5th grade, each year pairs a stretch of world history with a stretch of American history, 7th and 8th grade cover American history from 1492 to 2008, and South Dakota's own geography and history are part of almost every grade.",
      },
      {
        title: "The Oceti Sakowin Essential Understandings",
        body: "South Dakota's standards include the Oceti Sakowin Essential Understandings, so students learn about the Dakota, Nakota and Lakota peoples and the nine Tribal Nations in South Dakota today, in 1st, 4th, 5th, 7th and 8th grade. High school civics covers Tribal governments too.",
      },
    ],
    faqs: [
      {
        q: "Does South Dakota have one scale for every school?",
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
