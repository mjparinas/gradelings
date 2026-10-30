import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// Alabama, a US state. Standards are the Alabama Courses of Study adopted by the Alabama State Board of Education and
// published by the Alabama State Department of Education (ALSDE): Mathematics (2019), English Language Arts (2021),
// Science (2023) and Social Studies (2024, in schools from 2026-27). Alabama has no statewide report-card scale, so
// the four steps below are the same plain practice scale as the other states'. Sources and the checking record are in
// docs/research/alabama/.

const LEVELS: ProficiencyLevel[] = [
  {
    id: "beginning",
    label: "Beginning",
    kidLabel: "Seedling",
    icon: "🌱",
    colour: "#ff9636",
    description:
      "Practice shows a first understanding of the content standards. Most answers still need a hint or a second try.",
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
      "Practice shows a partial understanding of the content standards. Some answers are right on the first try.",
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
      "Practice shows a solid understanding of the content standards. Most answers are right on the first try.",
    atHome: "Has it! Mixed review now and then keeps it strong.",
  },
  {
    id: "exceeding",
    label: "Exceeding",
    kidLabel: "Star",
    icon: "⭐",
    colour: "#4f8ef7",
    description:
      "Practice shows a deep understanding of the content standards, including harder, unfamiliar questions.",
    atHome:
      "Applies it confidently, even in new or harder situations. Try challenge mode and real-life problems.",
  },
];

const SCHEME: ScoringScheme = {
  id: "al-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Alabama has no statewide report-card scale. Districts choose their own report cards, and many elementary schools use a standards-based scale for the early grades and letter grades later.",
  levels: LEVELS,
};

export const ALABAMA: Framework = {
  id: "us-al",
  slug: "alabama",
  name: "Alabama",
  shortName: "Alabama",
  country: "US",
  curriculumName: "Alabama Course of Study",
  region: "Alabama",
  overviewLabel: "Focus areas",
  standardLabel: "Content standard",
  sourceName: "Alabama State Department of Education (ALSDE)",
  sourceUrl: "https://www.alabamaachieves.org/academic-standards/",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding Alabama report cards",
    intro:
      "Alabama doesn't have one statewide report card. Each school district decides how it reports, so the words and numbers on your child's report card depend on the school. Many elementary schools use a standards-based scale in the early grades, and most schools give letter grades from about 3rd grade on.",
    facts: [
      {
        title: "Your district decides how grades look",
        body: "The Alabama State Department of Education (ALSDE) sets the Alabama Course of Study, which says what students should learn in each grade. Your district chooses the report card, its scale and how often you hear from the school.",
      },
      {
        title: "Standards-based marks in the early grades",
        body: "Many schools mark kindergarten to 2nd grade against the standards, often with words like Mastered, Progressing and Needs Support or a 1 to 4 scale. Read your child's report card key for the exact words.",
      },
      {
        title: "Letter grades later",
        body: "From about 3rd grade, most schools give a letter grade for each subject (A is often 90 to 100), with comments on work habits.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Alabama Comprehensive Assessment Program (ACAP): English language arts and math in grades 2 to 8, and science in grades 4, 6 and 8. Results come in four levels, and Levels 3 and 4 count as proficient. They are separate from the report card.",
      },
      {
        title: "Reading and math in the early grades",
        body: "Under the Alabama Literacy Act, 3rd graders need to show grade-level reading to move on to 4th grade, with several ways to show it. The Alabama Numeracy Act adds extra math help in kindergarten to 5th grade.",
      },
    ],
    faqs: [
      {
        q: "Does Alabama have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with ACAP levels?",
        a: "They measure different things. ACAP levels come from one test each spring, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
