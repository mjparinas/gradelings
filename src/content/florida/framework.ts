import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// Florida, a US state. Standards are Florida's state academic standards, adopted by the State Board of Education and
// published by the Florida Department of Education: the B.E.S.T. (Benchmarks for Excellent Student Thinking) Standards for
// Mathematics and for English Language Arts, the Next Generation Sunshine State Standards for Science and the Social
// Studies standards, each written as benchmarks. Florida has no statewide report-card scale for kindergarten to 5th
// grade, so the four steps below are the same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/florida/.

const LEVELS: ProficiencyLevel[] = [
  {
    id: "beginning",
    label: "Beginning",
    kidLabel: "Seedling",
    icon: "🌱",
    colour: "#ff9636",
    description:
      "Practice shows a first understanding of the benchmarks. Most answers still need a hint or a second try.",
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
      "Practice shows a partial understanding of the benchmarks. Some answers are right on the first try.",
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
      "Practice shows a solid understanding of the benchmarks. Most answers are right on the first try.",
    atHome: "Has it! Mixed review now and then keeps it strong.",
  },
  {
    id: "exceeding",
    label: "Exceeding",
    kidLabel: "Star",
    icon: "⭐",
    colour: "#4f8ef7",
    description:
      "Practice shows a deep understanding of the benchmarks, including harder, unfamiliar questions.",
    atHome:
      "Applies it confidently, even in new or harder situations. Try challenge mode and real-life problems.",
  },
];

const SCHEME: ScoringScheme = {
  id: "fl-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Florida has no statewide report-card scale for kindergarten to 5th grade. Districts choose their own report cards, and the uniform A to F scale in state law applies to middle and high school.",
  levels: LEVELS,
};

export const FLORIDA: Framework = {
  id: "us-fl",
  slug: "florida",
  name: "Florida",
  shortName: "Florida",
  country: "US",
  curriculumName: "Florida's state academic standards",
  region: "Florida",
  overviewLabel: "Focus areas",
  standardLabel: "Benchmark",
  sourceName: "Florida Department of Education",
  sourceUrl: "https://www.fldoe.org/academics/standards/",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding Florida report cards",
    intro:
      "Florida doesn't have one statewide report card for kindergarten through 5th grade. Each school district decides how it reports, so the words and marks on your child's report card depend on the district. From 6th grade, state law sets one grading scale for every district: A, B, C, D and F.",
    facts: [
      {
        title: "Your district decides how the early grades look",
        body: "The Florida Department of Education sets the standards, which say what students should learn in each grade, and districts choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Mastered, Progressing and Needs Support, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "One scale from 6th grade on",
        body: "In middle and high school, Florida uses one grading scale for every district: A is 90 to 100 percent, B is 80 to 89, C is 70 to 79, D is 60 to 69 and F is 0 to 59, with I for incomplete.",
      },
      {
        title: "Benchmarks, not just grades",
        body: "Florida writes its standards as benchmarks, each with a code like MA.4.NSO.1.1 that names the subject, grade, strand and skill. Many report cards and progress reports group results by benchmark or strand, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Florida Assessment of Student Thinking (FAST) in English language arts and math, three times a year in the progress-monitoring system and as the end-of-year test, plus science tests in 5th and 8th grade and end-of-course exams in subjects such as Algebra 1, Geometry, Biology 1, Civics and U.S. History. Results come in five achievement levels, and Level 3 is on grade level. They are separate from the report card.",
      },
      {
        title: "Reading by the end of 3rd grade",
        body: "Under state law, a 3rd grader who scores at Level 1 on the statewide reading test may be held back unless a good-cause exemption applies, and schools tell families early and offer extra reading help.",
      },
    ],
    faqs: [
      {
        q: "Does Florida have one scale for every school?",
        a: `Not before 6th grade. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with FAST achievement levels?",
        a: "They measure different things. FAST levels come from a test, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
      },
      {
        q: `Does ${APP_NAME} give my child a grade?`,
        a: `No. ${APP_NAME} shows how practice is going. Your child's teacher decides how they are doing on the report card.`,
      },
      {
        q: "How can I help at home?",
        a: "Ask your child's teacher which benchmarks to focus on, then try short, regular practice (10 to 15 minutes). Celebrate effort and progress, not just results.",
      },
    ],
  },
};
