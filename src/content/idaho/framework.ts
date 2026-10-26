import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Idaho, a US state. Standards are the Idaho Content Standards, adopted by the State Board of Education and published
// by the Idaho Department of Education: mathematics, English language arts/literacy and science (all 2022) and social
// studies (2024, revised 2025). Idaho has no statewide report-card scale, so the four steps below are the same plain
// practice scale as the other states'. Sources and the checking record are in docs/research/idaho/.

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
  id: "id-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Idaho has no statewide report-card scale. Each school district and charter school chooses its own report card.",
  levels: LEVELS,
};

export const IDAHO: Framework = {
  id: "us-id",
  slug: "idaho",
  name: "Idaho",
  shortName: "Idaho",
  country: "US",
  curriculumName: "the Idaho Content Standards",
  region: "Idaho",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Idaho Department of Education",
  sourceUrl: "https://www.sde.idaho.gov/about-us/departments/content-and-curriculum/idaho-content-standards/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Idaho report cards",
    intro:
      "Idaho doesn't have one statewide report card. Each school district and charter school decides how it reports progress, so the words and marks on your child's report card depend on the school. Many elementary schools mark each skill against the standards, and most middle and high schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts the Idaho Content Standards, which say what students should learn in each grade, and each district chooses its report card. Elementary report cards often use numbers or words for each standard, and older grades usually use letter grades. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "Idaho writes its standards with codes, like 4.NBT.A.1 in math, 4.RC.L.5a in reading, 4-PS-1.1 in science and 4.SS.1.3 in social studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "The ISAT is separate",
        body: "Students take the Idaho Standards Achievement Test (ISAT) in English language arts and math in 3rd to 8th grade and 11th grade, and in science in 5th, 8th and 11th grade, each spring. Scores come in four levels: Level 4 exceeded the standards, Level 3 met them, Level 2 nearly met them and Level 1 has not met them yet. The ISAT does not change your child's report card or whether they move up a grade.",
      },
      {
        title: "Reading in Kindergarten to 3rd grade",
        body: "Every child in Kindergarten to 3rd grade takes the Idaho Reading Indicator (IRI) in the fall and spring. It checks early reading skills and reports one of three levels: at grade level, near or below grade level, or well below grade level. Schools use it to find children who need extra reading help.",
      },
    ],
    faqs: [
      {
        q: "Does Idaho have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with ISAT levels?",
        a: "They measure different things. The ISAT is taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
      },
      {
        q: `Does ${APP_NAME} give my child a grade?`,
        a: `No. ${APP_NAME} shows how practice is going. Your child's teacher decides how they are doing on the report card.`,
      },
      {
        q: "What does an IRI score mean for my child?",
        a: "It is a quick check of early reading skills, given in the fall and spring. If your child scores near or below grade level, ask the teacher what reading help the school is giving and how you can read together at home.",
      },
    ],
  },
};
