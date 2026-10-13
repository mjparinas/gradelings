import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Washington, the first US state. Standards are the Washington State K–12 Learning Standards set by the Office of
// Superintendent of Public Instruction (OSPI): the 2026 mathematics and English language arts standards (revisions of
// the Common Core, required from 2027–28), the K–12 Science Learning Standards (the Next Generation Science
// Standards) and the 2019 social studies standards. Washington has no statewide report card, so the four steps below
// are a plain practice scale like Alberta's. Sources and the checking record are in docs/research/washington/.
// Washington is not offered to families yet: it sits in UPCOMING_FRAMEWORKS until its content and the US launch
// work are done (see the Washington plan).

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
  id: "wa-practice-steps",
  name: "Four practice steps",
  source: "Washington has no statewide report card. Districts choose their own, and many elementary schools use a 4-point standards-based scale like this one.",
  levels: LEVELS,
};

export const WASHINGTON: Framework = {
  id: "us-wa",
  slug: "washington",
  name: "Washington",
  shortName: "Washington",
  country: "US",
  curriculumName: "Washington State Learning Standards",
  region: "Washington",
  overviewLabel: "Focus areas",
  standardLabel: "Learning standard",
  sourceName: "Washington Office of Superintendent of Public Instruction (OSPI)",
  sourceUrl: "https://ospi.k12.wa.us/student-success/learning-standards-instructional-materials",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Washington report cards",
    intro:
      "Washington doesn't have one statewide report card. Each school district decides how it reports, so the words and numbers on your child's report card depend on the district. Most elementary schools use a 4-point standards-based scale, and middle and high schools usually give letter grades.",
    facts: [
      {
        title: "Your district decides how grades look",
        body: "OSPI sets the Washington State K–12 Learning Standards, which say what students should learn in each grade. Your district chooses the report card, its scale and how often you hear from the school.",
      },
      {
        title: "Many elementary schools use 1 to 4",
        body: "A common pattern is 4 (exceeds standard), 3 (meets standard), 2 (approaching standard) and 1 (below standard). A 3 is the goal for the grade. Read your child's report card key for the exact words.",
      },
      {
        title: "Letter grades from middle school",
        body: "Most middle and high schools give letter grades or percentages for each class, often with comments on work habits.",
      },
      {
        title: "State tests are separate",
        body: "Students take Smarter Balanced tests in English language arts and math in grades 3 to 8, and the Washington Comprehensive Assessment of Science in grades 5 and 8. Scores are reported as Levels 1 to 4, with Level 3 meaning the standard is met. They are separate from the report card.",
      },
      {
        title: "New math and English standards",
        body: "Washington adopted revised math and English language arts standards in 2026. Schools explore them in 2026–27 and use them from 2027–28, so your child's class may be moving from the older Common Core wording to the new one.",
      },
    ],
    faqs: [
      {
        q: "Does Washington have one scale for every school?",
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
