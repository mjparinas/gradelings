import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// Maine, the fourth US state. Standards are the Maine Learning Results of the Maine Department of Education (DOE): the
// 2020 mathematics standards (the Common Core performance expectations, cited with their cluster letters, "4.NBT.A.1"),
// the 2020 English language arts standards (no codes, so a strand and standard, "Reading 4"), the 2019 Science and
// Engineering standards (Next Generation Science Standards codes, "4-PS3-2") and the 2019 social studies standards
// (named performance expectations, "Civics & Government 2", "History 1"). Maine has no statewide report card, so the
// four steps below are the same plain practice scale as the other US states'. Sources and the checking record are in
// docs/research/maine/.

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
  id: "me-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source: "Maine has no statewide report card. Each school administrative unit chooses its own, and many Maine schools use standards-based grading on a 1 to 4 scale like this one.",
  levels: LEVELS,
};

export const MAINE: Framework = {
  id: "us-me",
  slug: "maine",
  name: "Maine",
  shortName: "Maine",
  country: "US",
  curriculumName: "Maine Learning Results",
  region: "Maine",
  overviewLabel: "Focus areas",
  standardLabel: "Learning standard",
  sourceName: "Maine Department of Education",
  sourceUrl: "https://www.maine.gov/doe/learning/standards",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding Maine report cards",
    intro:
      "Maine doesn't have one statewide report card. Each school administrative unit (a district, regional school unit or school union) decides how it reports, so the words and numbers on your child's report card depend on where your child goes to school. Many Maine schools use standards-based grading, often on a 1 to 4 scale, and middle and high schools may also give letter grades.",
    facts: [
      {
        title: "Your school unit decides how grades look",
        body: "The Maine Department of Education sets the Maine Learning Results, which say what students should learn in each grade. Your school administrative unit chooses the report card, its scale and how often you hear from the school.",
      },
      {
        title: "Many schools use 1 to 4",
        body: "Many Maine schools grade against the standards. A common pattern is 4 (exceeds the standard), 3 (meets the standard), 2 (partly meets it) and 1 (does not meet it yet). A 3 is the goal for the grade. Read your child's report card key for the exact words.",
      },
      {
        title: "Work habits are often reported apart",
        body: "Many Maine report cards list habits of work, such as effort, organization and taking part, separately from what a child knows and can do in each subject.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Maine Through Year Assessment in math and reading in grades 3 to 8 and the second year of high school, and the Maine Science Assessment in grades 5 and 8 and the third year of high school. They are separate from the report card.",
      },
      {
        title: "The Guiding Principles",
        body: "Maine's five Guiding Principles describe the kind of learner every student grows into, such as a clear and effective communicator and a creative and practical problem solver. Some schools report on them too.",
      },
    ],
    faqs: [
      {
        q: "Does Maine have one scale for every school?",
        a: `No. Each school administrative unit chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
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
