import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Oregon, the second US state. Standards are the Oregon Department of Education's (ODE): the 2021 mathematics
// standards, the 2026 English language arts standards, the 2022 science standards (Oregon's edition of the Next
// Generation Science Standards) and the 2024 social science standards. Oregon has no statewide report card, so the four
// steps below are the same plain practice scale as Washington's. Sources and the checking record are in
// docs/research/oregon/. Oregon is not offered to families yet: it sits in UPCOMING_FRAMEWORKS until its content is done.

const LEVELS: ProficiencyLevel[] = [
  {
    id: "beginning",
    label: "Beginning",
    kidLabel: "Seedling",
    icon: "🌱",
    colour: "#ff9636",
    description: "Practice shows a first understanding of the learning standards. Most answers still need a hint or a second try.",
    atHome: "Just getting started with this idea. Short, regular practice with lots of support helps most.",
  },
  {
    id: "approaching",
    label: "Approaching",
    kidLabel: "Sprout",
    icon: "🌿",
    colour: "#f5b301",
    description: "Practice shows a partial understanding of the learning standards. Some answers are right on the first try.",
    atHome: "Understands parts of it and is building confidence. Keep practicing the tricky parts.",
  },
  {
    id: "meeting",
    label: "Meeting",
    kidLabel: "Tree",
    icon: "🌳",
    colour: "#25b47e",
    description: "Practice shows a solid understanding of the learning standards. Most answers are right on the first try.",
    atHome: "Has it! Mixed review now and then keeps it strong.",
  },
  {
    id: "exceeding",
    label: "Exceeding",
    kidLabel: "Star",
    icon: "⭐",
    colour: "#4f8ef7",
    description: "Practice shows a deep understanding of the learning standards, including harder, unfamiliar questions.",
    atHome: "Applies it confidently, even in new or harder situations. Try challenge mode and real-life problems.",
  },
];

const SCHEME: ScoringScheme = {
  id: "or-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source: "Oregon has no statewide report card. Districts choose their own, and many elementary schools use a 4-point standards-based scale like this one.",
  levels: LEVELS,
};

export const OREGON: Framework = {
  id: "us-or",
  slug: "oregon",
  name: "Oregon",
  shortName: "Oregon",
  country: "US",
  curriculumName: "Oregon State Standards",
  region: "Oregon",
  overviewLabel: "Focus areas",
  standardLabel: "Learning standard",
  sourceName: "Oregon Department of Education (ODE)",
  sourceUrl: "https://www.oregon.gov/ode/educator-resources/standards/Pages/default.aspx",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Oregon report cards",
    intro:
      "Oregon doesn't have one statewide report card. Each school district decides how it reports, so the words and numbers on your child's report card depend on the district. Many elementary schools use a 4-point standards-based scale, and middle and high schools usually give letter grades.",
    facts: [
      {
        title: "Your district decides how grades look",
        body: "The Oregon Department of Education sets the state standards, which say what students should learn in each grade. Your district chooses the report card, its scale and how often you hear from the school.",
      },
      {
        title: "Many elementary schools use 1 to 4",
        body: "A common pattern is 4 (exceeds the standard), 3 (meets the standard), 2 (approaching the standard) and 1 (not yet meeting it). A 3 is the goal for the grade. Read your child's report card key for the exact words.",
      },
      {
        title: "Letter grades from middle school",
        body: "Most middle and high schools give letter grades or percentages for each class, often with comments on work habits.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Oregon Statewide Assessment System (OSAS) tests in English language arts and math in grades 3 to 8 and 11, and in science in grades 5, 8 and 11. Scores are reported as Levels 1 to 4, with Level 3 meaning the standard is met. They are separate from the report card.",
      },
      {
        title: "New standards",
        body: "Oregon adopted new social science standards in 2024, used from 2026–27, and new English language arts standards in 2026, so your child's class may be moving to new wording.",
      },
    ],
    faqs: [
      {
        q: "Does Oregon have one scale for every school?",
        a: "No. Each district chooses its own. Gradelings uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.",
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "What is the difference between Meeting and Exceeding?",
        a: "Meeting means a solid grasp of the standards for the grade. Exceeding means your child also does well on harder, unfamiliar questions. It isn't expected in every area.",
      },
      {
        q: "Does Gradelings give my child a grade?",
        a: "No. Gradelings shows how practice is going. Your child's teacher decides how they are doing on the report card.",
      },
      {
        q: "How can I help at home?",
        a: "Ask your child's teacher which standards to focus on, then try short, regular practice (10 to 15 minutes). Celebrate effort and progress, not just results.",
      },
    ],
  },
};
