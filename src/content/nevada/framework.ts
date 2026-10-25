import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Nevada, a US state. Standards are the Nevada Academic Content Standards (NVACS), adopted by the State Board of
// Education and published by the Nevada Department of Education: mathematics and English language arts (2010, the
// Common Core), science (2014, based on the Next Generation Science Standards) and social studies (revised 2018). Nevada
// has no statewide report-card scale, so the four steps below are the same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/nevada/.

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
  id: "nv-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Nevada has no statewide report-card scale. Each school district and charter school chooses its own report card.",
  levels: LEVELS,
};

export const NEVADA: Framework = {
  id: "us-nv",
  slug: "nevada",
  name: "Nevada",
  shortName: "Nevada",
  country: "US",
  curriculumName: "the Nevada Academic Content Standards",
  region: "Nevada",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Nevada Department of Education",
  sourceUrl: "https://doe.nv.gov/offices/office-of-teaching-and-learning/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Nevada report cards",
    intro:
      "Nevada doesn't have one statewide report card. Each school district and charter school decides how it reports progress, so the words and marks on your child's report card depend on the school. Many elementary schools mark each skill against the standards, and most middle and high schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts the Nevada Academic Content Standards, which say what students should learn in each grade, and each district or charter school chooses its report card. Elementary report cards often use numbers or words for each standard, and older grades usually use letter grades. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "Nevada writes its standards with codes, like 4.NBT.1 in math, RL.4.2 in reading, 4-PS3-2 in science and SS.4.11 in social studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Smarter Balanced tests in English language arts and math in 3rd to 8th grade, and the Nevada Science Assessment in 5th grade, 8th grade and high school. Results come in a separate score report with four levels, from Level 1 (Minimal Understanding) to Level 4 (Advanced), not on the report card. High school juniors take the ACT.",
      },
      {
        title: "The Nevada Report Card is about schools",
        body: "The Nevada Report Card website shares data about each school, including its star rating from the Nevada School Performance Framework. It describes the school, not your child. Your child's own report card comes from their school.",
      },
      {
        title: "Reading by 3rd grade",
        body: "Under Nevada's Read by Grade 3 law, schools check reading in Kindergarten to 3rd grade and give extra reading help to children who need it. From July 1, 2028, a 3rd grader who doesn't pass the state reading test must repeat 3rd grade unless a good-cause exemption applies. Ask your school early how your child is reading.",
      },
    ],
    faqs: [
      {
        q: "Does Nevada have one scale for every school?",
        a: `No. Each district and charter school chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with Smarter Balanced results?",
        a: "They measure different things. Smarter Balanced results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
