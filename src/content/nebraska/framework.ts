import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// Nebraska, a US state. The State Board of Education adopts Nebraska's College and Career Ready Standards, published by
// the Nebraska Department of Education: mathematics (2022), English language arts (2021), science (2017, updated in
// December 2024) and social studies (2019). Nebraska has no statewide report-card scale, so the four steps below are the
// same plain practice scale as the other states'. Sources and the checking record are in docs/research/nebraska/.

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
  id: "neb-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Nebraska has no statewide report-card scale. Each school district chooses its own report card.",
  levels: LEVELS,
};

export const NEBRASKA: Framework = {
  id: "us-ne",
  slug: "nebraska",
  name: "Nebraska",
  shortName: "Nebraska",
  country: "US",
  curriculumName: "Nebraska's College and Career Ready Standards",
  region: "Nebraska",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Nebraska Department of Education",
  sourceUrl: "https://www.education.ne.gov/contentareastandards/",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding Nebraska report cards",
    intro:
      "Nebraska doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools mark each skill against the standards, and most middle and high schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The Nebraska State Board of Education adopts Nebraska's College and Career Ready Standards, which say what students should learn in each grade, and each district chooses its report card. Elementary report cards often use numbers or words for each standard, and older grades usually use letter grades. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "Nebraska writes its own standards with codes, like MA.4.N.2.b in math, LA.4.RP.1 in reading, SC.4.4.2.b in science and SS 4.1.1.c in social studies. The code names the subject, the grade, the strand, the standard and the indicator. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Nebraska Student-Centered Assessment System (NSCAS) tests in English language arts and math in 3rd to 8th grade, and in science in 5th and 8th grade, each spring. Results come in a separate score report with three levels: Developing, On Track and Advanced. In 11th grade, students take the ACT. Test results are not on the report card.",
      },
      {
        title: "The Nebraska Education Profile is about schools",
        body: "The Nebraska Education Profile website from the Nebraska Department of Education shares data about each school and district, such as state test results and graduation rates. It describes the school, not your child. Your child's own report card comes from their school.",
      },
      {
        title: "Reading under the Nebraska Reading Improvement Act",
        body: "Under the Nebraska Reading Improvement Act, schools check every child's reading three times a year from kindergarten to 3rd grade. If a child reads below the expected level, the school tells the family within 15 working days and shares an individualized reading improvement plan, with extra reading help during the school day and a summer reading program. Ask your school early how your child is reading.",
      },
    ],
    faqs: [
      {
        q: "Does Nebraska have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with NSCAS results?",
        a: "They measure different things. NSCAS results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
