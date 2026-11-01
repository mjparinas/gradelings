import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// West Virginia, a US state. Standards are the West Virginia Board of Education's College- and Career-Readiness Standards:
// English language arts (Policy 2520.1A, 2021), mathematics (Policy 2520.2B, 2024), science (Policy 2520.3C, 2022) and
// social studies (Policy 2520.4, 2024). West Virginia has no statewide report-card scale below high school (Policy 2510
// sets a uniform A to F scale only for courses that earn high school credit), so the four steps below are the same plain
// practice scale as the other states'. Sources and the checking record are in docs/research/west-virginia/.

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
  id: "wv-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "West Virginia has no statewide report-card scale for kindergarten to 8th grade. Each county chooses its own report card; courses that earn high school credit use the state's A to F scale.",
  levels: LEVELS,
};

export const WEST_VIRGINIA: Framework = {
  id: "us-wv",
  slug: "west-virginia",
  name: "West Virginia",
  shortName: "West Virginia",
  country: "US",
  curriculumName: "the West Virginia College- and Career-Readiness Standards",
  region: "West Virginia",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "West Virginia Department of Education",
  sourceUrl: "https://wvde.us/academics/content-standards-policies",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding West Virginia report cards",
    intro:
      "West Virginia doesn't have one statewide report card for the elementary and middle grades. Each county board of education decides how it reports progress, so the words and marks on your child's report card depend on the county. Courses that earn high school credit use the state's A to F grading scale.",
    facts: [
      {
        title: "Your county decides how the report card looks",
        body: "The West Virginia Board of Education sets the College- and Career-Readiness Standards, which say what students should learn in each grade, and each county chooses its report card. Many elementary report cards use standards-based marks, and many middle schools use letter grades. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "West Virginia numbers its standards by subject, grade and number: M.4.6 is 4th grade math standard 6, ELA.4.2 is 4th grade English language arts standard 2, S.4.2 is 4th grade science and SS.8.14 is 8th grade social studies. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students in 3rd to 8th grade take the West Virginia General Summative Assessment in English language arts and math, and in science in 5th and 8th grade. Results come in four achievement levels: Does Not Meet Standard, Partially Meets Standard, Meets Standard and Exceeds Standard. 11th graders take the SAT School Day. Results come in a separate score report, not on the report card, and they generally don't change a student's grades.",
      },
      {
        title: "Reading and math by the end of 3rd grade",
        body: "Under the Third Grade Success Act, schools screen reading and math in kindergarten to 3rd grade three times a year, screen for dyslexia, and give a reading improvement plan and extra help to students who need it. From the 2026-27 school year, a 3rd grader whose state test shows Does Not Meet Standard in reading or math repeats 3rd grade on the recommendation of the teacher and the student assistance team, unless one of the law's exceptions applies.",
      },
      {
        title: "High school grades",
        body: "Courses that earn high school credit use the state's uniform grading scale: A is 90 to 100, B 80 to 89, C 70 to 79, D 60 to 69 and F below 60. Counties may use the same scale in the earlier grades, but they don't have to.",
      },
    ],
    faqs: [
      {
        q: "Does West Virginia have one scale for every school?",
        a: `Not for kindergarten to 8th grade. Each county chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with the state test's levels?",
        a: "They measure different things. The General Summative Assessment's levels come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
