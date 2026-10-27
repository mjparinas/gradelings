import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Rhode Island, a US state. Standards are the ones the Rhode Island Board of Education and the Council on Elementary and
// Secondary Education adopted: mathematics and English language arts (2010, the Common Core State Standards, which
// Rhode Island calls its Core Standards), science (2013, the Next Generation Science Standards) and social studies (the
// Rhode Island Social Studies Standards, taken up by the Council in February 2023). Rhode Island has no statewide
// report-card scale, so the four steps below are the same plain practice scale as the other states'. Sources and the
// checking record are in docs/research/rhode-island/.

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
  id: "ri-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Rhode Island has no statewide report-card scale. Each school district and charter school chooses its own report card.",
  levels: LEVELS,
};

export const RHODE_ISLAND: Framework = {
  id: "us-ri",
  slug: "rhode-island",
  name: "Rhode Island",
  shortName: "Rhode Island",
  country: "US",
  curriculumName: "the Rhode Island standards",
  region: "Rhode Island",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Rhode Island Department of Education",
  sourceUrl: "https://ride.ri.gov/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Rhode Island report cards",
    intro:
      "Rhode Island doesn't have one statewide report card. Each school district and charter school decides how it reports progress, so the words and marks on your child's report card depend on the school. Many elementary schools mark each skill against the standards, and most middle and high schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The Rhode Island Department of Education (RIDE) sets the standards that say what students should learn in each grade, and each district or charter school chooses its report card. Elementary report cards often use numbers or words for each standard, and older grades usually use letter grades. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "Rhode Island's standards have codes, like 4.NBT.1 in math, RL.4.2 in reading, 4-PS3-2 in science and SS4.2.3 in social studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Rhode Island Comprehensive Assessment System (RICAS) in English language arts and math in 3rd to 8th grade, and the Next Generation Science Assessment (NGSA) in 5th, 8th and 11th grade. Results come in a separate score report, not on the report card. RICAS has four levels: Not Meeting, Partially Meeting, Meeting and Exceeding Expectations.",
      },
      {
        title: "Rhode Island history in 4th grade",
        body: "Rhode Island's social studies standards give 4th grade to Rhode Island itself: its land and bay, the Narragansett and other Native peoples, Roger Williams and the founding of the colony, the Revolution, the mills and the people who came to work in them, and how the state is governed.",
      },
      {
        title: "Civics in middle and high school",
        body: "8th grade studies government and civic life in the United States and Rhode Island, and high school includes a civics course. State law asks middle and high school students to show they are proficient in civics, and every district gives students at least one student-led civics project in middle or high school.",
      },
    ],
    faqs: [
      {
        q: "Does Rhode Island have one scale for every school?",
        a: `No. Each district and charter school chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with RICAS results?",
        a: "They measure different things. RICAS results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
