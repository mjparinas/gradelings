import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// North Carolina, a US state. Standards are the North Carolina Standard Course of Study, as the North Carolina
// Department of Public Instruction (NCDPI) publishes it: the 2023 mathematics standards, the 2017 English language arts
// standards (in schools until the 2026 standards replace them in 2027-28), the 2023 science standards and the 2021
// social studies standards. North Carolina has no statewide report-card scale, so the four steps below are the same
// plain practice scale as the other states'. Sources and the checking record are in docs/research/north-carolina/.

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
  id: "nc-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "North Carolina has no statewide report-card scale. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const NORTH_CAROLINA: Framework = {
  id: "us-nc",
  slug: "north-carolina",
  name: "North Carolina",
  shortName: "North Carolina",
  country: "US",
  curriculumName: "the North Carolina Standard Course of Study",
  region: "North Carolina",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "North Carolina Department of Public Instruction",
  sourceUrl: "https://www.dpi.nc.gov/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding North Carolina report cards",
    intro:
      "North Carolina doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle schools use letter or number grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts the North Carolina Standard Course of Study, which says what students should learn in each grade, and districts choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meets and Approaching, and many middle schools give letter grades. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "North Carolina writes its standards with codes, like NC.4.NBT.5 in math, RL.4.1 in English language arts, PS.4.2.2 in science and 4.H.1.3 in social studies. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take End-of-Grade tests in reading and math in 3rd to 8th grade, and in science in 5th and 8th grade. High school students take End-of-Course tests in NC Math 1, NC Math 3, English II and Biology. Results come in a separate score report, not on the report card.",
      },
      {
        title: "Reading checks in Kindergarten to 3rd grade",
        body: "Under North Carolina's Read to Achieve law, schools check every child's reading several times a year in Kindergarten to 3rd grade, give extra help to children who need it, and tell families how their child is doing.",
      },
      {
        title: "Kindergarten is observed, not tested",
        body: "In kindergarten, teachers use the Kindergarten Entry Assessment early in the year, watching how children learn and play to plan their teaching. It isn't a grade.",
      },
    ],
    faqs: [
      {
        q: "Does North Carolina have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with End-of-Grade test results?",
        a: "They measure different things. End-of-Grade results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
