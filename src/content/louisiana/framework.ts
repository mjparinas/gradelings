import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Louisiana, a US state. Standards are the Louisiana Student Standards, adopted by the Board of Elementary and Secondary
// Education (BESE) and published by the Louisiana Department of Education: mathematics (2016), English language arts
// (2026), science (2017) and social studies (2022). Louisiana sets one ten-point letter scale for every grade that uses
// letter grades (Act 428 of 2024), but no statewide report card or standards-based scale, so the four steps below are the
// same plain practice scale as the other states'. Sources and the checking record are in docs/research/louisiana/.

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
  id: "la-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Louisiana has no statewide standards-based report card. Each school system chooses its own report card; where letter grades are used, state law sets the same ten-point scale everywhere.",
  levels: LEVELS,
};

export const LOUISIANA: Framework = {
  id: "us-la",
  slug: "louisiana",
  name: "Louisiana",
  shortName: "Louisiana",
  country: "US",
  curriculumName: "Louisiana Student Standards",
  region: "Louisiana",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Louisiana Department of Education",
  sourceUrl: "https://doe.louisiana.gov/school-system-leaders/academic-strategy/louisiana-student-standards",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Louisiana report cards",
    intro:
      "Louisiana doesn't have one statewide report card. Each school system decides how its report card looks, so the words and marks on your child's report card depend on the parish or charter school. Where letter grades are used, every public school in Louisiana uses the same ten-point scale.",
    facts: [
      {
        title: "One letter scale for every public school",
        body: "Since 2024, state law (Act 428) sets one ten-point grading scale for every grade that uses letter grades: 90 to 100 is an A, 80 to 89 a B, 70 to 79 a C, 60 to 69 a D and below 60 an F. Many school systems use letter grades from about 3rd grade on; younger grades often use other marks.",
      },
      {
        title: "Your school system chooses the rest",
        body: "The Board of Elementary and Secondary Education adopts the Louisiana Student Standards, which say what students learn in each grade, and each school system chooses its report card. Kindergarten to 2nd grade report cards often use words or numbers for each skill instead of letters. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "Louisiana writes its standards with codes, like 4.NBT.A.1 in math, RL.4.2 in English language arts and 4-PS3-2 in science. Social studies standards are numbered for each grade, like 6.10. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "LEAP tests are separate",
        body: "Students in 3rd to 8th grade take the LEAP 2025 tests in English language arts, math, science and social studies. High school students take LEAP 2025 tests in English I, English II, Algebra I, Geometry, Biology, Civics and U.S. History. Results come in a separate score report with five levels, from Unsatisfactory to Advanced, not on the report card.",
      },
      {
        title: "Reading by 3rd grade",
        body: "Children in kindergarten to 3rd grade take a reading screener at the start, middle and end of the year. Under Louisiana's early literacy law (Act 422 of 2023), a 3rd grader who still scores at the lowest level on the screener after three tries may repeat 3rd grade, unless a good-cause exemption applies. Ask the school early about your child's screener results.",
      },
    ],
    faqs: [
      {
        q: "Does Louisiana have one report card for every school?",
        a: `No. Each school system chooses its own report card, but every public school uses the same ten-point letter scale where letter grades are used. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with LEAP results?",
        a: "They measure different things. LEAP results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
