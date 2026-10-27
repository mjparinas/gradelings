import { APP_NAME } from "@/lib/brand";
import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Vermont, a US state. Standards are Vermont's, adopted by the State Board of Education: mathematics and English
// language arts (2010, the Common Core State Standards), science (2013, the Next Generation Science Standards) and social
// studies (2017, the College, Career, and Civic Life (C3) Framework for Social Studies State Standards, written for
// grade bands), with the Agency of Education's Vermont Framework for K-8 Social Studies giving each grade its theme.
// Vermont has no statewide report-card scale, so the four steps below are the same plain practice scale as the other
// states'. Sources and the checking record are in docs/research/vermont/.

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
  id: "vt-practice-steps",
  name: "Four practice steps",
  practiceSteps: true,
  source:
    "Vermont has no statewide report-card scale. Each supervisory union or school district chooses its own report card.",
  levels: LEVELS,
};

export const VERMONT: Framework = {
  id: "us-vt",
  slug: "vermont",
  name: "Vermont",
  shortName: "Vermont",
  country: "US",
  curriculumName: "Vermont's state standards",
  region: "Vermont",
  overviewLabel: "Focus areas",
  standardLabel: "Standard",
  sourceName: "Vermont Agency of Education",
  sourceUrl: "https://education.vermont.gov/",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Vermont report cards",
    intro:
      "Vermont doesn't have one statewide report card. Each supervisory union or school district decides how it reports progress, so the words and marks on your child's report card depend on the school. Vermont schools use proficiency-based learning, so many report cards mark each skill on a scale, often from 1 to 4, and older grades may add letter grades.",
    facts: [
      {
        title: "Your district decides how the report card looks",
        body: "The State Board of Education adopts Vermont's standards, which say what students should learn, and each supervisory union or school district chooses its report card. Elementary report cards often use numbers or words for each proficiency, and middle and high schools often use letter grades too. Read your child's report card key for the exact marks.",
      },
      {
        title: "Proficiency-based learning",
        body: "Vermont's Education Quality Standards ask schools to teach and report by proficiencies: students show what they know and can do, and high school students graduate by meeting proficiency-based graduation requirements, not only by earning credits. So you may see a mark for each skill rather than one grade per subject.",
      },
      {
        title: "Standards with codes",
        body: "Vermont's standards have codes, like 4.NBT.1 in math, RL.4.2 in reading, 4-PS3-2 in science and D2.Civ.1.3-5 in social studies, where 3-5 is the grade band. Teachers often plan lessons by these codes, so they are a handy way to talk with the teacher.",
      },
      {
        title: "State tests are separate",
        body: "Students take the Vermont Comprehensive Assessment Program (VTCAP) in English language arts and math from 3rd to 9th grade, and in science in 5th, 8th and 11th grade. Results come in a separate report with four performance levels, not on the report card. Level 3 and Level 4 mean a student meets grade-level expectations.",
      },
      {
        title: "Vermont history in 4th grade",
        body: "Vermont's social studies framework gives 4th grade to Vermont, the early republic and the United States from before the colonies to the Civil War: the Abenaki homeland, the Green Mountain Boys, the Republic of Vermont, the fourteenth state and Vermont's stand against slavery.",
      },
    ],
    faqs: [
      {
        q: "Does Vermont have one scale for every school?",
        a: `No. Each supervisory union or district chooses its own. ${APP_NAME} uses four plain practice steps (Beginning, Approaching, Meeting and Exceeding) so you can see where practice stands. Match them to the words on your child's own report card.`,
      },
      {
        q: "Is “Beginning” a failing grade?",
        a: "No. Beginning means practice shows only a first understanding so far. It tells you where extra practice and a talk with the teacher will help.",
      },
      {
        q: "How do the practice steps compare with VTCAP results?",
        a: "They measure different things. VTCAP results come from a test taken once a year, while practice steps show how practice is going right now. Use both as starting points for a talk with the teacher.",
      },
      {
        q: `Does ${APP_NAME} give my child a grade?`,
        a: `No. ${APP_NAME} shows how practice is going. Your child's teacher decides how they are doing on the report card.`,
      },
      {
        q: "How can I help at home?",
        a: "Ask your child's teacher which proficiencies to focus on, then try short, regular practice (10 to 15 minutes). Celebrate effort and progress, not just results.",
      },
    ],
  },
};
