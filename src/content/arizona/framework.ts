import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// Arizona. Standards are the Arizona Department of Education's (ADE) Arizona Academic Standards: Mathematics (2016, cited
// "4.NBT.A.1", Algebra 1 "A1.A-SSE.A.1"; the January 2025 update only marks the essential standards) and English Language
// Arts (2016, "4.RL.1"), both close to the Common Core, the Arizona Science Standards (2018, "4.P4U1.1") and the History
// and Social Science Standards (2018, "4.H2.1"). Arizona has no statewide report card, so the four steps below are the
// same plain practice scale as the other US states'. Sources and the checking record are in docs/research/arizona/.

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
  id: "az-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source: "Arizona has no statewide report card. Each school district and charter school chooses its own, and many Arizona elementary schools use standards-based grading on a 1 to 4 scale like this one.",
  levels: LEVELS,
};

export const ARIZONA: Framework = {
  id: "us-az",
  slug: "arizona",
  name: "Arizona",
  shortName: "Arizona",
  country: "US",
  curriculumName: "Arizona Academic Standards",
  region: "Arizona",
  overviewLabel: "Focus areas",
  standardLabel: "Learning standard",
  sourceName: "Arizona Department of Education",
  sourceUrl: "https://www.azed.gov/standards-practices",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding Arizona report cards",
    intro:
      "Arizona doesn't have one statewide report card. Each school district and charter school decides how it reports, so the words and numbers on your child's report card depend on where your child goes to school. Many Arizona elementary schools use standards-based grading, often on a 1 to 4 scale, and middle and high schools usually give letter grades.",
    facts: [
      {
        title: "Your school decides how grades look",
        body: "The Arizona State Board of Education adopts the academic standards, which say what students should learn in each grade. Your school district or charter school chooses the report card, its scale and how often you hear from the school.",
      },
      {
        title: "Many schools use 1 to 4",
        body: "Many Arizona elementary schools grade against the standards. A common pattern is 4 (exceeds the standard), 3 (meets the standard), 2 (approaching it) and 1 (not yet). A 3 is the goal for the grade. Read your child's report card key for the exact words.",
      },
      {
        title: "School letter grades are something else",
        body: "Arizona gives every public school an A to F letter grade each year, based mostly on state test results and growth. That grade is about the school, not your child, and it doesn't appear on your child's report card.",
      },
      {
        title: "State tests are separate",
        body: "Students take AASA in English language arts and math in grades 3 to 8, AzSCI in science in grades 5, 8 and 11, and ACT Aspire in grade 9. Families get a separate score report for each.",
      },
      {
        title: "Reading by the end of Grade 3",
        body: "Arizona's Move On When Reading law puts extra focus on reading in Kindergarten to Grade 3. Schools screen early reading and must tell families if a child is behind, with a plan to help.",
      },
    ],
    faqs: [
      {
        q: "Does Arizona have one scale for every school?",
        a: `No. Each school district and charter school chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
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
