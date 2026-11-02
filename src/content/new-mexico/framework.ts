import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// New Mexico, a US state. Standards are New Mexico's content standards, adopted by the Public Education Department as
// rules in Title 6, Chapter 29 of the New Mexico Administrative Code: mathematics and English language arts (2010, the
// Common Core, 6.29.14 and 6.29.13 NMAC), science (2018, the NM STEM Ready! Science Standards: the Next Generation
// Science Standards plus six New Mexico specific standards, 6.29.10 NMAC) and social studies (2022, 6.29.11 NMAC). New
// Mexico has no statewide report-card scale, so the four steps below are the same plain practice scale as the other
// states'. Sources and the checking record are in docs/research/new-mexico/.

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
  id: "nm-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "New Mexico has no statewide report-card scale. Each school district and charter school chooses its own report card.",
  levels: LEVELS,
};

export const NEW_MEXICO: Framework = {
  id: "us-nm",
  slug: "new-mexico",
  name: "New Mexico",
  shortName: "New Mexico",
  country: "US",
  curriculumName: "the New Mexico Content Standards",
  region: "New Mexico",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "New Mexico Public Education Department",
  sourceUrl: "https://web.ped.nm.gov/educators/instructional-resources/new-mexico-adopted-content-standards/",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding New Mexico report cards",
    intro:
      "New Mexico doesn't have one statewide report card. Each school district and charter school decides how it reports progress, so the words and marks on your child's report card depend on the school. Many elementary schools mark each skill against the standards, and most middle and high schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The Public Education Department adopts New Mexico's content standards, which say what students should learn in each grade, and each district or charter school chooses its report card. Elementary report cards often use numbers or words for each standard, and older grades usually use letter grades. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "New Mexico writes its standards with codes, like 4.NBT.1 in math, RL.4.2 in reading, 4-PS3-2 in science and 4.12 in social studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the New Mexico Measures of Student Success and Achievement (NM-MSSA) in English language arts and math in 3rd to 8th grade, and the New Mexico Assessment of Science Readiness (NM-ASR) in 5th, 8th and 11th grade. Results come in a separate score report with four levels, Novice, Nearing Proficiency, Proficient and Advanced, not on the report card. High school juniors take the SAT.",
      },
      {
        title: "Science with a New Mexico twist",
        body: "New Mexico's science standards are the Next Generation Science Standards plus six New Mexico standards, such as how people across New Mexico have worked together to advance science, and the advantages and disadvantages of local industries and energy production.",
      },
      {
        title: "New Mexico history in 4th and 7th grade",
        body: "New Mexico's social studies standards (2022) give 4th grade to New Mexico's government, people, trade and land, and 7th grade to New Mexico history, from the earliest New Mexicans and the Pueblos and Tribes to the Spanish colonial, Mexican and territorial periods.",
      },
    ],
    faqs: [
      {
        q: "Does New Mexico have one scale for every school?",
        a: `No. Each district and charter school chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with NM-MSSA results?",
        a: "They measure different things. NM-MSSA results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
