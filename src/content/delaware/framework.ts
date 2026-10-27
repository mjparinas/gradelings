import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Delaware, a US state. Standards are Delaware's content standards, adopted by the State Board of Education
// (14 DE Admin. Code 501): mathematics and English language arts (2010, the Common Core State Standards), science
// (2013, the Next Generation Science Standards) and social studies (the Delaware Standards for Civics, Economics,
// Geography and History, 2018, written for grade clusters). Delaware has no statewide report-card scale, so the four
// steps below are the same plain practice scale as the other states'. Sources and the checking record are in
// docs/research/delaware/.

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
  id: "de-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Delaware has no statewide report-card scale. Each school district and charter school chooses its own report card.",
  levels: LEVELS,
};

export const DELAWARE: Framework = {
  id: "us-de",
  slug: "delaware",
  name: "Delaware",
  shortName: "Delaware",
  country: "US",
  curriculumName: "the Delaware Content Standards",
  region: "Delaware",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Delaware Department of Education",
  sourceUrl: "https://education.delaware.gov/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Delaware report cards",
    intro:
      "Delaware doesn't have one statewide report card. Each school district and charter school decides how it reports progress, so the words and marks on your child's report card depend on the school. Many elementary schools use standards-based report cards that mark each skill on a scale, and middle and high schools usually add letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts Delaware's standards, which say what students should learn in each grade, and each district or charter school chooses its report card. Elementary report cards often use numbers or words for each standard, and middle and high schools often use letter grades too. Read your child's report card key for the exact marks.",
      },
      {
        title: "Standards-based marks",
        body: "Many Delaware elementary schools mark each skill or standard on a scale, often from 1 to 4, instead of giving one grade per subject. Middle and high schools usually give letter grades, sometimes with standards marks beside them.",
      },
      {
        title: "Standards with codes",
        body: "Delaware writes its standards with codes, like 4.NBT.1 in math, RL.4.2 in reading, 4-PS3-2 in science and H.4.4-5.a in social studies, where 4-5 is the grade cluster. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Delaware System of Student Assessments (DeSSA): Smarter Balanced tests in English language arts and math from 3rd to 8th grade, science in 5th and 8th grade and high school Biology, and social studies from 4th to 8th grade. High school juniors take the SAT. Results come in a separate score report with four performance levels, not on the report card.",
      },
      {
        title: "Delaware history in 4th grade",
        body: "Delaware's social studies standards ask students in the 4th and 5th grade cluster to connect their state's history with the nation's, so many 4th graders learn Delaware's land, the Lenape and Nanticoke peoples, the first settlements, how Delaware became the First State and how its government works.",
      },
    ],
    faqs: [
      {
        q: "Does Delaware have one scale for every school?",
        a: `No. Each district and charter school chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with DeSSA results?",
        a: "They measure different things. DeSSA results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
      },
      {
        q: `Does ${APP_NAME} give my child a grade?`,
        a: `No. ${APP_NAME} shows how practice is going. Your child's teacher decides how they are doing on the report card.`,
      },
      {
        q: "How can I help at home?",
        a: "Ask your child's teacher which skills to focus on, then try short, regular practice (10 to 15 minutes). Celebrate effort and progress, not just results.",
      },
    ],
  },
};
