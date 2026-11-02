import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// Utah, a US state. Standards are the Utah Core Standards, adopted by the Utah State Board of Education (USBE):
// mathematics, English language arts (2023), science (SEEd, Utah Science with Engineering Education) and social studies
// (Kindergarten to Grade 6 adopted 2022; Utah Studies, United States History I and World Geography for Grades 7 to 9).
// Utah has no statewide report card or grading scale: each school district or charter school chooses its own, so the
// four steps below are the same plain practice scale as the other states'. Sources and the checking record are in
// docs/research/utah/.

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
  id: "ut-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Utah has no statewide report card. Each school district or charter school chooses its own report card and marks.",
  levels: LEVELS,
};

export const UTAH: Framework = {
  id: "us-ut",
  slug: "utah",
  name: "Utah",
  shortName: "Utah",
  country: "US",
  curriculumName: "Utah Core Standards",
  region: "Utah",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Utah State Board of Education",
  sourceUrl: "https://www.schools.utah.gov/curr",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding Utah report cards",
    intro:
      "Utah doesn't have one statewide report card. Each school district or charter school decides how its report card looks, so the words and marks on your child's report card depend on the school. What every public school shares is the Utah Core Standards, which say what students learn in each grade.",
    facts: [
      {
        title: "Your district chooses the report card",
        body: "The Utah State Board of Education adopts the Utah Core Standards, and each school district or charter school chooses its report card. Many elementary schools use standards-based report cards, with a number or a word for each skill, while middle and high schools usually give letter grades. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "Utah writes its standards with codes, like 4.NBT.5 in math, 4.R.5 in English language arts and 4.2.1 in science. Social studies standards are numbered by grade, strand and standard, like 4.3.2, and middle school courses have their own letters, like UT.2.1 in Utah Studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "RISE tests are separate",
        body: "Students take the RISE tests near the end of the year: English language arts and math in 3rd to 10th grade, science in 4th to 10th grade and writing in 5th and 8th grade. The tests adapt to each student and are not timed. Results come in a separate Individual Student Report with four levels, from Below Proficient to Highly Proficient, not on the report card.",
      },
      {
        title: "Reading and math checks in the early grades",
        body: "Younger children take short Acadience Reading and Acadience Math checks at the beginning, middle and end of the year. They help teachers spot who needs extra help early, and schools share the results with families. Ask the school how your child did and what you can practice at home.",
      },
    ],
    faqs: [
      {
        q: "Does Utah have one report card for every school?",
        a: `No. Each school district or charter school chooses its own report card. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with RISE results?",
        a: "They measure different things. RISE results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
