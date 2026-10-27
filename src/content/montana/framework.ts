import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Montana, a US state. Standards are the ones the Montana Board of Public Education adopted: the Montana Content
// Standards for Mathematics (2026 edition), for English Language Arts and Literacy (2011, in force until the 2027
// standards take effect on July 1, 2027), for Science (2016) and for Social Studies (2021). Montana has no statewide
// report-card scale, so the four steps below are the same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/montana/.

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
  id: "mt-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Montana has no statewide report-card scale. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const MONTANA: Framework = {
  id: "us-mt",
  slug: "montana",
  name: "Montana",
  shortName: "Montana",
  country: "US",
  curriculumName: "the Montana academic standards",
  region: "Montana",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Montana Office of Public Instruction",
  sourceUrl: "https://opi.mt.gov/Educators/Teaching-Learning/K-12-Content-Standards/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Montana report cards",
    intro:
      "Montana doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The Montana Board of Public Education sets the content standards, which say what students should learn in each grade, and districts choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meeting and Approaching, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "Montana writes its standards with codes, like MT.4.NBT.1 in math, RL.4.2 in reading, 4-PS3-2 in science and SS.CG.4.4 in social studies. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students in 3rd to 8th grade take MAST (Montana Aligned to Standards Through-Year) in English language arts and math: short tests spread through the school year instead of one big test in spring. Results come in four levels: Novice, Nearing Proficient, Proficient and Advanced. The Montana Science Assessment is given in 5th and 8th grade, and 11th graders take the ACT at school. Results come in a separate score report, not on the report card.",
      },
      {
        title: "Indian Education for All",
        body: "Montana's constitution commits the state to teaching about the distinct cultural heritage of American Indians, and the Indian Education for All law puts that in every subject and grade. The social studies standards ask students to learn about the twelve Tribal Nations of Montana, their histories and their sovereignty.",
      },
      {
        title: "New reading and writing standards are coming",
        body: "Montana adopted new English language arts and literacy standards that take effect on July 1, 2027, and updated its math standards in 2026. Until then, reading and writing follow the 2011 standards.",
      },
    ],
    faqs: [
      {
        q: "Does Montana have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with MAST levels?",
        a: "They measure different things. MAST levels come from state tests taken during the year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
