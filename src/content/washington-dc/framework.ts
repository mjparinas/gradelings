import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Washington, DC, the District of Columbia: a federal district, not a state, so pages call it "the District" where they
// would say "the state" (`regionKind: "district"`). Its standards are approved by the DC State Board of Education on the
// recommendation of the Office of the State Superintendent of Education (OSSE): mathematics and English language arts
// (2010, the Common Core State Standards), science (December 2013, the Next Generation Science Standards) and social
// studies (the DC Social Studies Standards, approved June 21, 2023, first used in 2024-25), which give each grade its own
// theme and number its standards through the grade ("3.20"). The District has no single report-card scale (DC Public
// Schools and each public charter school choose their own), so the four steps below are the same plain practice scale as
// the states'. Sources and the checking record are in docs/research/washington-dc/.

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
  id: "dc-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Washington, DC has no single report-card scale. DC Public Schools and each public charter school choose their own report card.",
  levels: LEVELS,
};

export const WASHINGTON_DC: Framework = {
  id: "us-dc",
  slug: "washington-dc",
  name: "Washington, DC",
  shortName: "Washington, DC",
  country: "US",
  regionKind: "district",
  curriculumName: "DC learning standards",
  region: "Washington, DC",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Office of the State Superintendent of Education (OSSE)",
  sourceUrl: "https://osse.dc.gov/service/dc-standards-learning",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Washington, DC report cards",
    intro:
      "Washington, DC doesn't have one report card for every school. DC Public Schools (DCPS) and each public charter school decide how they report progress, and nearly half of the District's public school students go to a charter school, so the words and marks on your child's report card depend on the school. Many elementary report cards mark each standard on a scale, often from 1 to 4, and middle and high schools usually use letter grades.",
    facts: [
      {
        title: "Your school decides how the report card looks",
        body: "The DC State Board of Education approves the District's learning standards, which say what students should learn in each grade, and the Office of the State Superintendent of Education (OSSE) supports schools in teaching them. DC Public Schools and each public charter school choose their own report card. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards with codes",
        body: "DC's standards have codes, like 4.NBT.1 in math, RL.4.2 in reading, 4-PS3-2 in science and 3.20 in social studies, where the 3 is the grade and the 20 is the standard's number. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "New social studies standards",
        body: "The District's social studies standards were rewritten in 2023 and schools began using them in the 2024-25 school year. Each grade has its own theme, such as the wider world and early civilizations in 2nd grade, the District's own history in 3rd grade and applied civics in 8th grade.",
      },
      {
        title: "Washington, DC in 3rd grade",
        body: "3rd grade social studies is about the District itself: its rivers and wards, the Nacotchtank, Piscataway and Pamunkey peoples, the building of the capital, the Civil War and DC Emancipation Day, U Street, Home Rule and how the District is governed today.",
      },
      {
        title: "State tests are separate",
        body: "Students take the DC CAPE tests (District of Columbia Comprehensive Assessments of Progress in Education) in English language arts and math from 3rd to 8th grade and in some high school courses, and in science in 5th and 8th grade and high school biology. Results come in a separate report with five performance levels, not on the report card. Level 4 and Level 5 mean a student met or exceeded expectations.",
      },
    ],
    faqs: [
      {
        q: "Does Washington, DC have one scale for every school?",
        a: `No. DC Public Schools and each public charter school choose their own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with DC CAPE results?",
        a: "They measure different things. DC CAPE results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
