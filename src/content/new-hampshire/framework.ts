import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";

// New Hampshire, a US state. Standards are New Hampshire's, adopted by the State Board of Education: mathematics and
// English language arts (2010, the New Hampshire College and Career Ready Standards, which are the Common Core), science
// (2016, the New Hampshire College and Career Ready Science Standards, which are the Next Generation Science Standards)
// and social studies (the K-12 Social Studies New Hampshire Curriculum Framework, 2006, written for grade spans). New
// Hampshire has no statewide report-card scale, so the four steps below are the same plain practice scale as the other
// states'. Sources and the checking record are in docs/research/new-hampshire/.

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
  id: "nh-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "New Hampshire has no statewide report-card scale. Each school district (SAU) and charter school chooses its own report card.",
  levels: LEVELS,
};

export const NEW_HAMPSHIRE: Framework = {
  id: "us-nh",
  slug: "new-hampshire",
  name: "New Hampshire",
  shortName: "New Hampshire",
  country: "US",
  curriculumName: "the New Hampshire College and Career Ready Standards",
  region: "New Hampshire",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "New Hampshire Department of Education",
  sourceUrl: "https://www.education.nh.gov/",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: (grade) => (grade === "pk" ? preKScale(SCHEME) : SCHEME),
  reportCard: {
    title: "Understanding New Hampshire report cards",
    intro:
      "New Hampshire doesn't have one statewide report card. Each school district and charter school decides how it reports progress, so the words and marks on your child's report card depend on the school. Many New Hampshire schools use competency-based report cards that mark each skill on a scale, and older grades often add letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts New Hampshire's standards, which say what students should learn in each grade, and each district or charter school chooses its report card. Elementary report cards often use numbers or words for each competency, and middle and high schools often use letter grades too. Read your child's report card key for the exact marks.",
      },
      {
        title: "Competencies, not just grades",
        body: "New Hampshire was an early leader in competency-based education: high schools give course credit when students show they have mastered the course's competencies, not only for time spent in class. Many schools report on these competencies from the early grades, so you may see a mark for each skill rather than one grade per subject.",
      },
      {
        title: "Standards with codes",
        body: "New Hampshire writes its standards with codes, like 4.NBT.1 in math, RL.4.2 in reading, 4-PS3-2 in science and SS:CV:4:2.1 in social studies. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the New Hampshire Statewide Assessment System (NH SAS) in English language arts and math in 3rd to 8th grade, and in science in 5th, 8th and 11th grade. Results come in a separate score report with four achievement levels, not on the report card. High school juniors take the SAT.",
      },
      {
        title: "New Hampshire history in 4th grade",
        body: "New Hampshire's social studies framework asks students in the 3rd and 4th grade span to learn the state's land, people, history and government, from the Abenaki and the first English settlements to the State House in Concord and town meeting.",
      },
    ],
    faqs: [
      {
        q: "Does New Hampshire have one scale for every school?",
        a: `No. Each district and charter school chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with NH SAS results?",
        a: "They measure different things. NH SAS results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
      },
      {
        q: `Does ${APP_NAME} give my child a grade?`,
        a: `No. ${APP_NAME} shows how practice is going. Your child's teacher decides how they are doing on the report card.`,
      },
      {
        q: "How can I help at home?",
        a: "Ask your child's teacher which competencies to focus on, then try short, regular practice (10 to 15 minutes). Celebrate effort and progress, not just results.",
      },
    ],
  },
};
