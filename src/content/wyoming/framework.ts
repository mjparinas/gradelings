import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Wyoming, a US state. Standards are the Wyoming Content and Performance Standards (WYCPS), adopted by the State
// Board of Education: English language arts (2012, the Common Core), mathematics (2023, a priority set built on the
// Common Core), science (2023, a priority set of the Next Generation Science Standards) and social studies (2014, with
// benchmarks on the Eastern Shoshone and Northern Arapaho added in 2018, written for grade bands). Wyoming has no
// statewide report-card scale, so the four steps below are the same plain practice scale as the other states'. Sources
// and the checking record are in docs/research/wyoming/.

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
  id: "wy-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Wyoming has no statewide report-card scale. Each school district chooses its own report card.",
  levels: LEVELS,
};

export const WYOMING: Framework = {
  id: "us-wy",
  slug: "wyoming",
  name: "Wyoming",
  shortName: "Wyoming",
  country: "US",
  curriculumName: "the Wyoming Content and Performance Standards",
  region: "Wyoming",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Wyoming Department of Education",
  sourceUrl: "https://edu.wyoming.gov/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Wyoming report cards",
    intro:
      "Wyoming doesn't have one statewide report card. Each of its school districts decides how it reports progress, so the words and marks on your child's report card depend on the district. Many elementary schools use standards-based report cards that mark each skill on a scale, and older grades usually add letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts the Wyoming Content and Performance Standards, which say what students should learn in each grade, and each school district chooses its report card. Elementary report cards often use numbers or words for each standard, and middle and high schools usually use letter grades too. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards with codes",
        body: "Wyoming writes its standards with codes, like 4.NBT.1 in math, RL.4.2 in reading, 4-PS3-4 in science and SS5.4.2 in social studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take WY-TOPP (the Wyoming Test of Proficiency and Progress) in English language arts and math from 3rd to 10th grade, and in science in 4th, 8th and 10th grade. Results come in a separate score report with four levels (Below Basic, Basic, Proficient and Advanced), not on the report card. High school juniors take the ACT.",
      },
      {
        title: "Wyoming history and the Wind River nations",
        body: "Wyoming's social studies standards ask students to learn the state's land, history and government, and, by state law, the history, culture and government of the Eastern Shoshone and Northern Arapaho, who share the Wind River Reservation.",
      },
      {
        title: "A test on the constitutions",
        body: "Wyoming law requires every student to study the United States and Wyoming constitutions, and to pass a test on them, before receiving a high school diploma.",
      },
    ],
    faqs: [
      {
        q: "Does Wyoming have one scale for every school?",
        a: `No. Each district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with WY-TOPP results?",
        a: "They measure different things. WY-TOPP results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
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
