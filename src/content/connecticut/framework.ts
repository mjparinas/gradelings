import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Connecticut, a US state. Standards are the ones the Connecticut State Board of Education adopted: the Connecticut Core
// Standards for mathematics and for English language arts (the Common Core, 2010), the Next Generation Science Standards
// (2015) and the Connecticut Elementary and Secondary Social Studies Standards (2023). Connecticut has no statewide
// report-card scale, so the four steps below are the same plain practice scale as the other states'.
// Sources and the checking record are in docs/research/connecticut/.

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
  id: "ct-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Connecticut has no statewide report-card scale. Each school district chooses its own report card, and many elementary schools use standards-based marks.",
  levels: LEVELS,
};

export const CONNECTICUT: Framework = {
  id: "us-ct",
  slug: "connecticut",
  name: "Connecticut",
  shortName: "Connecticut",
  country: "US",
  curriculumName: "the Connecticut academic standards",
  region: "Connecticut",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Connecticut State Department of Education",
  sourceUrl: "https://portal.ct.gov/sde",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Connecticut report cards",
    intro:
      "Connecticut doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards, and most middle schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The Connecticut State Board of Education sets the academic standards, which say what students should learn in each grade, and districts choose the report card. Many elementary report cards use standards-based marks, such as 1 to 4 or words like Meeting and Approaching, and some use letters. Read your child's report card key for the exact words.",
      },
      {
        title: "Standards, not just grades",
        body: "Connecticut writes its standards with codes, like 4.NBT.A.1 in math, RL.4.2 in reading, 4-PS3-2 in science and 3.Civ.4.b in social studies. Standards-based report cards often group results by these standards, so the codes are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Smarter Balanced tests in English language arts and math in 3rd to 8th grade. Results come in four achievement levels: Level 1 (Not Met), Level 2 (Approaching), Level 3 (Met) and Level 4 (Exceeded). The Next Generation Science Assessment is given in 5th, 8th and 11th grade, and 11th graders take the SAT at school. Results come in a separate score report, not on the report card.",
      },
      {
        title: "New social studies standards",
        body: "Connecticut adopted new social studies standards in 2023. Each grade has a theme, from Understanding My Communities in kindergarten to Connecticut and Local History in 3rd grade and United States History II in 8th grade, and they include Native American, Black and Latino, and Asian American and Pacific Islander history.",
      },
      {
        title: "Civics in high school",
        body: "Every Connecticut student needs at least a half credit in civics and government to graduate from high school, and the social studies standards set out what that course covers.",
      },
    ],
    faqs: [
      {
        q: "Does Connecticut have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with Smarter Balanced levels?",
        a: "They measure different things. Smarter Balanced levels come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
