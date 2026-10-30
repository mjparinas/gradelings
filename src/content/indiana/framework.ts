import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// Indiana, a US state. Standards are the 2023 Indiana Academic Standards for mathematics, English/language arts, science
// and social studies, adopted by the Indiana State Board of Education in June 2023 and published by the Indiana
// Department of Education (IDOE). Indiana has no statewide report-card scale, so the four steps below are the same plain
// practice scale as the other states'. Sources and the checking record are in docs/research/indiana/.

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
  id: "in-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Indiana has no statewide report-card scale. Each school corporation chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const INDIANA: Framework = {
  id: "us-in",
  slug: "indiana",
  name: "Indiana",
  shortName: "Indiana",
  country: "US",
  curriculumName: "the Indiana Academic Standards",
  region: "Indiana",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Indiana Department of Education",
  sourceUrl: "https://www.in.gov/doe/students/indiana-academic-standards/",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding Indiana report cards",
    intro:
      "Indiana doesn't have one statewide report card. Each school corporation (Indiana's word for a school district) decides how it reports progress, so the words and marks on your child's report card depend on where your child goes to school. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your school corporation decides how the report card looks",
        body: "The Indiana State Board of Education adopts the Indiana Academic Standards, which say what students should learn in each grade, and each school corporation or charter school chooses its report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meets and Approaching, and many middle schools give letter grades. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "Indiana writes its standards with codes, like 4.NS.3 in math, 4.RC.2 in English/language arts, 4-PS3-1 in science and 4.H.3 in social studies. Some standards are marked essential, which means students should master them by the end of the grade. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take ILEARN in English/language arts and math in 3rd to 8th grade, with short checkpoints during the year and a test in the spring. ILEARN also tests science in 4th and 6th grade and social studies in 5th grade. Results come in a separate score report, not on the report card.",
      },
      {
        title: "Reading checks in 2nd and 3rd grade",
        body: "Indiana gives IREAD, a reading test, in 2nd and 3rd grade. A 3rd grader who doesn't pass gets more chances and extra reading help, and under state law most students who still don't pass repeat 3rd grade, with some exemptions. The school tells the family early when a child needs help.",
      },
      {
        title: "Practice is not a grade",
        body: `${APP_NAME} shows how practice is going on each standard. Your child's teacher decides how they are doing on the report card.`,
      },
    ],
    faqs: [
      {
        q: "Does Indiana have one scale for every school?",
        a: `No. Each school corporation chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with ILEARN results?",
        a: "They measure different things. ILEARN results come from checkpoints and a spring test, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
      },
      {
        q: `Does ${APP_NAME} give my child a grade?`,
        a: `No. ${APP_NAME} shows how practice is going. Your child's teacher decides how they are doing on the report card.`,
      },
      {
        q: "How can I help at home?",
        a: "Ask your child's teacher which standards to focus on, especially the ones marked essential, then try short, regular practice (10 to 15 minutes). Celebrate effort and progress, not just results.",
      },
    ],
  },
};
