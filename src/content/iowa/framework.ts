import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// Iowa, a US state. Standards are the Iowa Academic Standards, adopted by the State Board of Education and published
// by the Iowa Department of Education: mathematics (2024) and English language arts (2024), both built on the Common
// Core, science (2025, built on the Next Generation Science Standards) and social studies (2026). Iowa has no statewide
// report-card scale, so the four steps below are the same plain practice scale as the other states'; their names match
// the four achievement levels Iowa has proposed for its state test. Sources and the checking record are in
// docs/research/iowa/.

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
  id: "ia-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Iowa has no statewide report-card scale. Each school district and accredited nonpublic school chooses its own report card.",
  levels: LEVELS,
};

export const IOWA: Framework = {
  id: "us-ia",
  slug: "iowa",
  name: "Iowa",
  shortName: "Iowa",
  country: "US",
  curriculumName: "the Iowa Academic Standards",
  region: "Iowa",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Iowa Department of Education",
  sourceUrl: "https://educate.iowa.gov/pk-12/standards",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding Iowa report cards",
    intro:
      "Iowa doesn't have one statewide report card. Each school district decides how it reports progress, so the words and marks on your child's report card depend on the school. Many elementary schools mark each skill against the standards, and most middle and high schools use letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts the Iowa Academic Standards, which say what students should learn in each grade, and each district chooses its report card. Elementary report cards often use numbers or words for each standard, and older grades usually use letter grades. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards, not just grades",
        body: "Iowa writes its standards with codes, like 4.NBT.A.1 in math, RL.4.2 in reading, 4-PS3-2 in science and SS.4.14 in social studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take Iowa's state summative assessment (formerly called ISASP) in English language arts and math in 3rd to 11th grade, and in science in 5th grade, 8th grade and high school. Results come in a separate score report, not on the report card. Iowa has proposed four new achievement levels: Below, Approaching, Meeting and Exceeding grade-level expectations.",
      },
      {
        title: "School Performance Profiles are about schools",
        body: "The Iowa School Performance Profiles share data about each public school, including test results and graduation rates. They describe the school, not your child. Your child's own report card comes from their school.",
      },
      {
        title: "Reading in the early grades",
        body: "Under Iowa law, schools check every child's reading at the start of each year in Kindergarten to 3rd grade. A child who misses the benchmark on two screenings in a row gets intensive reading help, and parents get a letter with the plan and ideas for reading at home. Children in Kindergarten to 6th grade who aren't reading proficiently get a personal reading plan.",
      },
    ],
    faqs: [
      {
        q: "Does Iowa have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with state test results?",
        a: "They measure different things. The state test is taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
      },
      {
        q: `Does ${APP_NAME} give my child a grade?`,
        a: `No. ${APP_NAME} shows how practice is going. Your child's teacher decides how they are doing on the report card.`,
      },
      {
        q: "Can I ask for my child to repeat a grade for reading?",
        a: "Yes. If your child in Kindergarten to 6th grade isn't reading proficiently, the school must tell you in writing, and you can ask for your child to stay in the same grade the next year. Talk with the teacher first about the reading plan and what has helped.",
      },
    ],
  },
};
