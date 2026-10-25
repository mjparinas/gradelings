import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Maryland, a US state. Standards are the Maryland College and Career Ready Standards and frameworks adopted by the
// Maryland State Board of Education and published by the Maryland State Department of Education (MSDE): mathematics
// (revised 2025), English language arts, science (the Next Generation Science Standards) and social studies. Maryland
// has no statewide report-card scale, so the four steps below are the same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/maryland/.

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
  id: "md-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Maryland has no statewide report-card scale. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const MARYLAND: Framework = {
  id: "us-md",
  slug: "maryland",
  name: "Maryland",
  shortName: "Maryland",
  country: "US",
  curriculumName: "the Maryland College and Career Ready Standards",
  region: "Maryland",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Maryland State Department of Education",
  sourceUrl: "https://marylandpublicschools.org/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Maryland report cards",
    intro:
      "Maryland doesn't have one statewide report card. Each of the state's 24 school systems decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your school system decides how the report card looks",
        body: "The Maryland State Board of Education sets the learning standards, which say what students should learn in each grade, and each county school system and Baltimore City choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meeting and Approaching, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "Maryland writes its standards with codes, like 4.NOS.A.1 in math, RL.4.2 in reading and 4-PS3-2 in science. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Maryland Comprehensive Assessment Program (MCAP) tests in English language arts and math in 3rd to 8th grade, science in 5th and 8th grade, and social studies in 8th grade. In high school there are MCAP tests in English 10, Algebra I and other math courses, life science and government. Results come in a separate score report, not on the report card.",
      },
      {
        title: "Kindergarten is observed, not tested",
        body: "In the first weeks of kindergarten, teachers use the Kindergarten Readiness Assessment (KRA) by watching children and asking them to do short tasks. It helps teachers plan; it isn't a grade.",
      },
      {
        title: "Reading checks in the early grades",
        body: "Maryland's Ready to Read Act asks schools to screen reading skills in kindergarten to 3rd grade, so teachers can spot children who need extra help early. Ask your school which screener it uses and what the results show.",
      },
    ],
    faqs: [
      {
        q: "Does Maryland have one scale for every school?",
        a: `No. Each school system chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with MCAP results?",
        a: "They measure different things. MCAP results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
