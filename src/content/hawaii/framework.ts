import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// Hawaiʻi, a US state. Standards are the Hawaiʻi State Department of Education's (HIDOE), the one statewide school
// system: the Hawaiʻi Common Core Standards for Mathematics (HCCS-M, approved by the Board of Education in 2026 and
// phased in from 2027-28), the Hawaiʻi Common Core Standards for English Language Arts (approved April 2024), the Next
// Generation Science Standards and the Hawaiʻi Core Standards for Social Studies (HCSSS, 2018). Elementary schools use
// a standards-based report card, but HIDOE publishes no single set of level names for families, so the four steps below
// are the same plain practice scale as the other states'. Sources and the checking record are in docs/research/hawaii/.

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
  id: "hi-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Hawaiʻi's elementary report card is standards-based, and secondary schools use letter grades. The marks on it are set by the Department and explained on each report card.",
  levels: LEVELS,
};

export const HAWAII: Framework = {
  id: "us-hi",
  slug: "hawaii",
  name: "Hawaiʻi",
  shortName: "Hawaiʻi",
  country: "US",
  curriculumName: "the Hawaiʻi Content Standards",
  region: "Hawaiʻi",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Hawaiʻi State Department of Education",
  sourceUrl: "https://hawaiipublicschools.org/academics/subject-matter-standards/",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding Hawaiʻi report cards",
    intro:
      "Hawaiʻi has one statewide public school system, the Hawaiʻi State Department of Education. Elementary schools use a standards-based report card: teachers mark how your child is doing on the standards in each subject, and rate the six General Learner Outcomes. Middle and high schools usually use letter grades.",
    facts: [
      {
        title: "Marks show progress on the standards",
        body: "On the elementary report card, each mark shows how your child's work compares with the grade-level standards, not how it compares with other children. Read the key on your child's report card for what each mark means.",
      },
      {
        title: "The General Learner Outcomes",
        body: "Every Hawaiʻi student, from kindergarten to grade 12, works toward six General Learner Outcomes (GLOs): self-directed learner, community contributor, complex thinker, quality producer, effective communicator, and effective and ethical user of technology. Elementary teachers rate each one on the report card.",
      },
      {
        title: "Standards, not just grades",
        body: "Hawaiʻi writes its standards with codes, like 4.NBT.1 in math, 4.RL.2 in reading, 4-PS3-2 in science and SS.4.7.14.1 in social studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Smarter Balanced Assessment (SBA) in English language arts and math in 3rd to 8th grade and 11th grade, and the Hawaiʻi State Assessment in science in 5th and 8th grade and at the end of Biology 1. Students in Kaiapuni (Hawaiian language immersion) schools take the KĀʻEO in Hawaiian in 3rd and 4th grade instead. Results come in a separate score report, not on the report card.",
      },
      {
        title: "Hawaiian history in 4th and 7th grade",
        body: "Hawaiʻi's social studies standards give 4th grade to early Hawaiʻi: voyaging, the ahupuaʻa and life before 1800. 7th grade studies the Hawaiian Kingdom and the Pacific Islands, and high school students take Modern History of Hawaiʻi.",
      },
    ],
    faqs: [
      {
        q: "What do the marks on the elementary report card mean?",
        a: `Each mark shows how your child is doing on the standards, and the key on the report card says what each one means. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with Smarter Balanced results?",
        a: "They measure different things. Smarter Balanced results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
