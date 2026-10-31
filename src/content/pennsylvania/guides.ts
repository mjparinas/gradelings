import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Pennsylvania, in US English. The Pennsylvania Department of Education (PDE) has no statewide social
// and emotional learning standards, but it publishes the Pennsylvania Career Ready Skills (PA CRS), optional social emotional
// learning progressions for every grade band, so the competencies page explains those three domains
// (docs/research/pennsylvania/FACTS.md, section 4). The assessment page covers the PSSA and the Keystone Exams as PDE
// describes them, including the religious-belief review and excusal route in 22 Pa. Code 4.4(d)(4) and the early-literacy
// screening in Act 47 of 2025. Dates change each year, so the page points to PDE and the district. Pennsylvania has no French
// subject here, so no French guide. Grade notes follow the PA Core Standards, the Pennsylvania science standards (STEELS) and
// the state's civics, economics, geography and history standards, placed as in docs/research/pennsylvania/README.md.

export const PENNSYLVANIA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "career-ready-skills",
    label: "Career Ready Skills",
    hubBlurb: "PDE's three social and emotional skill areas, from kindergarten to high school: feelings, relationships and choices.",
    description:
      "What the Pennsylvania Career Ready Skills mean for parents, with simple ways to support self-awareness, getting along with others and making responsible choices at home.",
    gradeLine: "The Pennsylvania Career Ready Skills grow in every grade band.",
    closing: "these skills grow in everyday moments: a hard problem, a disagreement, a choice that affects someone else.",
    title: "Pennsylvania Career Ready Skills, explained for parents",
    intro:
      "The Pennsylvania Department of Education publishes the Pennsylvania Career Ready Skills (PA CRS), social and emotional learning progressions that describe what children can do at each stage from kindergarten to 12th grade. They're guidance, not a graded subject, and schools choose whether and how to use them. Teachers weave them into everyday classroom life, and families can support them at home too.",
    items: [
      {
        id: "self-awareness",
        name: "Self-awareness and self-management",
        blurb: "Recognizing and regulating emotions: understanding feelings, setting goals and responding well to challenges.",
        parts: [
          { name: "Naming feelings", blurb: "Recognizing basic feelings first, then more ways of expressing them as children grow." },
          { name: "Coping with setbacks", blurb: "Choosing helpful strategies when something is hard or frustrating." },
          { name: "Setting goals", blurb: "Picking short, medium and long-term goals and sticking with them." },
        ],
        atHome: [
          "At the end of the day, ask “What was one hard thing, and what helped?”",
          "Help your child set one small goal for the week and check in on it.",
          "Name your own feelings out loud, then say how you handle them.",
        ],
      },
      {
        id: "relationships",
        name: "Establishing and maintaining relationships",
        blurb: "Communicating and collaborating across differences: respect, listening and resolving conflicts.",
        parts: [
          { name: "Taking turns and sharing", blurb: "Positive back-and-forth with classmates and adults." },
          { name: "Respecting differences", blurb: "Noticing how people are alike and different and valuing each person." },
          { name: "Resolving conflict", blurb: "Knowing that disagreements happen and finding ways to work them out." },
        ],
        atHome: [
          "After a disagreement, ask each person to say what they heard the other person say.",
          "Play a board game together and practice taking turns, winning and losing kindly.",
          "Talk about a friend's point of view: “How do you think they felt?”",
        ],
      },
      {
        id: "problem-solving",
        name: "Social problem-solving",
        blurb: "Showing empathy and making respectful, responsible choices in many situations.",
        parts: [
          { name: "Thinking about consequences", blurb: "Considering what a choice means for you and for others before acting." },
          { name: "Understanding social settings", blurb: "Knowing that expectations differ at home, at school and in the community." },
          { name: "Helping others", blurb: "Noticing when someone needs help and responding kindly." },
        ],
        atHome: [
          "When your child faces a choice, ask “What could happen if you did that? Who else would it affect?”",
          "Look for a small way to help a neighbor or relative together.",
          "Talk about stories and shows: “What would you have done in that spot?”",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Career Ready Skills graded?",
        a: "No. They're guidance from the Pennsylvania Department of Education, and schools choose how to use them. They aren't a separate subject, and how they show up on a report card depends on your district.",
      },
      {
        q: "Why do they say “career” for young children?",
        a: "The idea is that skills like managing feelings, getting along with others and making good choices matter in every part of life, including future work. For young children they simply look like sharing, taking turns and trying again.",
      },
      {
        q: "Does Pennsylvania have separate social and emotional learning standards?",
        a: "PDE's Career Ready Skills are its social and emotional learning framework. They're optional, so ask your child's school which program it uses.",
      },
      {
        q: `Does ${APP_NAME} practice these skills?`,
        a: `Partly. ${APP_NAME} gives kind feedback after a wrong answer, lets children try again and celebrates effort, which supports coping with setbacks. Relationships and social problem-solving grow best with people, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more?",
        a: "Ask your child's teacher how the school builds these skills into class. PDE publishes the Career Ready Skills and a toolkit for families and educators on pa.gov.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Pennsylvania Department of Education (PDE)",
    hubBlurb: "The PSSA in grades 3 to 8, the Keystone Exams in high school, and how to review a test.",
    name: "Pennsylvania state tests (PSSA)",
    intro:
      "Pennsylvania students take the Pennsylvania System of School Assessment (PSSA) in the spring: English language arts and math in grades 3 to 8, and science in grades 5 and 8. High school students take the Keystone Exams in Algebra I, Literature and Biology. The tests are online, they're separate from the report card, and results are reported as Advanced, Proficient, Basic or Below Basic.",
    grades: ["3", "4", "5", "6", "7", "8", "9"],
    facts: [
      { title: "Who takes them", body: "PSSA English language arts and math: grades 3 to 8. PSSA science: grades 5 and 8. Keystone Exams go with the course, in Algebra I, Literature and Biology, at or near the end of the course. Students with the most significant cognitive disabilities take an alternate assessment instead." },
      { title: "What they cover", body: "The PSSA checks the PA Core Standards in English language arts and math and Pennsylvania's science standards. Many questions ask students to explain, use evidence or work with a passage. In grades 4 to 8 the English language arts test includes a written response about a passage (a text dependent analysis)." },
      { title: "When", body: "The PSSA is usually given in the spring, from about April to early May, over several sessions. PDE sets the windows each year and districts choose dates within them." },
      { title: "How results are described", body: "Results use four performance levels: Advanced, Proficient, Basic and Below Basic. Your school shares your child's score report." },
      { title: "Early reading checks", body: "Pennsylvania's early literacy law (Act 47 of 2025) asks schools to screen students in kindergarten to 3rd grade for reading three times a year and to tell families when a child shows signs of a reading difficulty. Ask your school what screener it uses." },
      { title: "Keystone Exams and graduation", body: "Pennsylvania offers several pathways to show readiness to graduate, and the Keystone Exams are one of them. Ask your high school which pathway applies to your child." },
      { title: "Report card link", body: "State test scores don't set your child's report card grades. They are one more snapshot for families, teachers and schools." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, then ask your child to retell what happened and explain why.",
      "Encourage short daily writing: a journal entry, a note or a list with reasons.",
      "Practice math with real problems (shopping, cooking, travel times) as well as math facts.",
      "Tell your child the tests show what they know. They are not something to fail.",
    ],
    faqs: [
      {
        q: "What is the PSSA?",
        a: "The Pennsylvania System of School Assessment is the state's yearly test in English language arts, math and science for grades 3 to 8. Science is given in grades 5 and 8.",
      },
      {
        q: "Can my child skip the tests?",
        a: "Pennsylvania's rules give parents the right to review a state test at school ahead of time and to ask in writing for their child to be excused if it conflicts with their religious beliefs. That is the only reason the regulation allows. Talk with your school if you have questions.",
      },
      {
        q: "Does my child have to pass a test to move up a grade?",
        a: "We found no Pennsylvania law that holds a child back based on a state test score. Schools use screening and tests to give extra help, and your district decides about promotion, so ask your school.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the grades your district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, reading, science and social studies skills in Pennsylvania's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pennsylvania funds a pre-K year for many four-year-olds through Pre-K Counts and Head Start, in schools, child care and community programs. Programs follow the Pennsylvania Learning Standards for Early Childhood, Pre-Kindergarten (2024).",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten is optional in Pennsylvania, and most districts offer it. It is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Science looks at plants, animals, weather and pushes and pulls, and social studies covers rules, needs and wants, jobs, and simple maps.",
      lookFor: "Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, learn place value to 120 and tell time. Social studies looks at rules and responsibilities, goods and services, and the places around us.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to adding and subtracting within 1,000, money and time, and measuring in inches and centimeters. Science looks at matter, living things and how land and water change, and social studies looks at communities, leaders and how things change over time.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and take their first PSSA tests in English language arts and math. Social studies looks at Pennsylvania communities: how local government serves them, trade and jobs, and the state's places and regions.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts, and fractions. Ask early if you have questions about reading support.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, fractions and decimals, and longer writing with evidence. Science covers energy, waves and how Earth's surface changes. Social studies is Pennsylvania studies: the Commonwealth's people, places and past, its state and local government, and its economy and resources.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Pennsylvania history.",
    },
    "5": {
      overview: "In 5th grade, students work with decimals and fractions, volume and the coordinate plane, and write longer pieces with evidence. Science covers matter, how living things get energy and Earth's systems, and the PSSA science test is given this year. Social studies is early American history, from the colonies and the founding documents to how the government works.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Pennsylvania districts. Math moves to ratios, rates and rational numbers, and science covers Earth and space, from the solar system to weather and plate tectonics. Social studies looks at the world: early civilizations, trade, governments and economies, and regions and resources.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, percent, equations and probability. Science covers life science and the environment: heredity, ecosystems, and how people affect the environment. Social studies is United States history and government, from the Revolution and the Constitution to a growing nation.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations and functions, the Pythagorean theorem and transformations, and some students take Algebra I. Science covers forces, energy, waves and chemical reactions, and the PSSA science test is given this year. Social studies is United States history and civics, from expansion and the Civil War through Reconstruction, with rights, laws, economics and personal finance.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: "9th grade is the first year of high school. Most students take Algebra I or Geometry, and Biology or another science course, and some courses end with a Keystone Exam. This app's 9th grade social studies practices civics and government: the U.S. and Pennsylvania Constitutions, rights, the three branches, elections and the economy.",
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing evidence in science and English.",
    },
  },
};
