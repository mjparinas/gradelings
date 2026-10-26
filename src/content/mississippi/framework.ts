import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Mississippi, a US state. Standards are the Mississippi College- and Career-Readiness Standards, adopted by the State
// Board of Education and published by the Mississippi Department of Education: mathematics (2025), English language arts
// (2025), science (2026, in effect from the 2026-2027 school year) and social studies (2022). Mississippi has no statewide
// report-card scale, so the four steps below are the same plain practice scale as the other states'. Sources and the
// checking record are in docs/research/mississippi/.

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
  id: "ms-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Mississippi has no statewide report-card scale. Each school district chooses its own report card.",
  levels: LEVELS,
};

export const MISSISSIPPI: Framework = {
  id: "us-ms",
  slug: "mississippi",
  name: "Mississippi",
  shortName: "Mississippi",
  country: "US",
  curriculumName: "the Mississippi College- and Career-Readiness Standards",
  region: "Mississippi",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Mississippi Department of Education",
  sourceUrl: "https://mdek12.org/academiceducation/mississipp-college-and-career-readiness-standards/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Mississippi report cards",
    intro:
      "Mississippi doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the school. Many elementary schools mark each skill against the standards, and most middle and high schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts the Mississippi College- and Career-Readiness Standards, which say what students should learn in each grade, and each district chooses its report card. Elementary report cards often use numbers or words for each standard, and older grades usually use letter grades. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "Mississippi writes its standards with codes, like 4.NBT.5 in math, RL.4.2 in reading, P.4.6A.4 in science and 4.MS.3 in social studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Mississippi Academic Assessment Program (MAAP) tests in English language arts and math in 3rd to 8th grade, science in 5th and 8th grade, and Algebra I, Biology and English II in high school. Results come in a separate score report with five levels, from Level 1 (Minimal) to Level 5 (Advanced), not on the report card.",
      },
      {
        title: "The A to F grades are about schools",
        body: "Each year the Mississippi Department of Education gives every school and district a letter grade from A to F. It describes the school, not your child. Your child's own report card comes from their school.",
      },
      {
        title: "Reading by 3rd grade",
        body: "Under Mississippi's Literacy-Based Promotion Act, schools check reading from Kindergarten to 3rd grade and give extra help to children who need it. A 3rd grader needs to reach Level 3 (Passing) or higher on the reading part of the MAAP English language arts test, with two more chances to retest, to move on to 4th grade unless a good-cause exemption applies. Ask your school early how your child is reading.",
      },
    ],
    faqs: [
      {
        q: "Does Mississippi have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with MAAP results?",
        a: "They measure different things. MAAP results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
