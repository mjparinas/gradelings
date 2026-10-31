import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for South Carolina, in US English. The competencies page is the Profile of the South Carolina
// Graduate, adopted by the State Board of Education and the Education Oversight Committee and named in the South
// Carolina College- and Career-Ready Standards: world-class knowledge, world-class skills (creativity and innovation,
// critical thinking and problem solving, collaboration and teamwork, communication, information, media and technology,
// and knowing how to learn) and life and career characteristics (integrity, self-direction, global perspective,
// perseverance, work ethic and interpersonal skills). The assessment page covers SC READY (English language arts and
// math in grades 3 to 8), SCPASS science (grades 4 and 6 in recent years; grade 8 science has been paused by budget
// proviso), End-of-Course exams and the Read to Succeed Act's 3rd grade reading rule. Dates and tested grades change, so
// the page points to the South Carolina Department of Education. South Carolina has no French subject, so no French
// guide. Grade notes follow the South Carolina College- and Career-Ready Standards (math 2025, English language arts
// 2023, science 2021, social studies 2019).

export const SOUTH_CAROLINA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "graduate-profile",
    label: "Profile of the Graduate",
    hubBlurb: "The knowledge, skills and characteristics South Carolina wants every graduate to have, and how they start in the early grades.",
    description:
      "What the Profile of the South Carolina Graduate means for parents: world-class knowledge, world-class skills such as critical thinking, collaboration and communication, and life and career characteristics such as perseverance and integrity, with simple ways to support them at home.",
    gradeLine: "The Profile of the South Carolina Graduate applies in every grade.",
    closing: "these skills grow every time your child explains, works with others, sticks with a hard problem or asks a good question.",
    title: "The Profile of the South Carolina Graduate, explained for parents",
    intro:
      "The Profile of the South Carolina Graduate describes what the state wants every student to have by the end of high school: world-class knowledge, world-class skills, and life and career characteristics. The South Carolina College- and Career-Ready Standards are written to build toward it from kindergarten on. The profile isn't a separate subject. Teachers build it into everyday lessons in every grade.",
    items: [
      {
        id: "knowledge",
        name: "World-class knowledge",
        blurb: "Strong learning in English language arts, math, science and social studies, plus the arts, world languages and other subjects.",
        parts: [
          { name: "Core subjects", blurb: "Reading, writing, math, science and social studies at each grade's standards." },
          { name: "Making connections", blurb: "Using what's learned in one subject to understand another." },
          { name: "Real-world use", blurb: "Applying knowledge to real problems at home, in the community and at work." },
        ],
        atHome: [
          "Ask your child to teach you one thing they learned this week.",
          "Connect lessons to daily life: fractions in a recipe, history on a road trip, science in the garden.",
          "Read together often, mixing stories and true books.",
        ],
      },
      {
        id: "skills",
        name: "World-class skills",
        blurb: "Creativity and innovation, critical thinking and problem solving, collaboration and teamwork, communication, information, media and technology, and knowing how to learn.",
        parts: [
          { name: "Thinking", blurb: "Solving problems, asking good questions and coming up with new ideas." },
          { name: "Working together", blurb: "Listening, sharing ideas and communicating clearly with others." },
          { name: "Learning how to learn", blurb: "Finding and judging information, and using technology wisely." },
        ],
        atHome: [
          "Ask “How do you know?” after an answer, even when it's right.",
          "Plan something together, like a meal or a weekend outing, and let your child solve the problems that come up.",
          "When you see a headline or video together, ask who made it and how you could check it.",
        ],
      },
      {
        id: "characteristics",
        name: "Life and career characteristics",
        blurb: "Integrity, self-direction, global perspective, perseverance, work ethic and interpersonal skills.",
        parts: [
          { name: "Character", blurb: "Being honest and responsible, and treating others with respect." },
          { name: "Grit", blurb: "Sticking with hard work, managing time and setting goals." },
          { name: "Seeing the wider world", blurb: "Understanding people and places beyond your own community." },
        ],
        atHome: [
          "Praise effort and strategy, not just results: “You kept going even when it was hard.”",
          "Give your child a regular job at home and let them plan how to get it done.",
          "Talk about a news story from another country and how life there is alike and different.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the Profile of the Graduate graded?",
        a: "Not on its own line. The knowledge is graded in each subject, and the skills and characteristics are built into lessons. Some report cards comment on work habits or behavior, depending on your district.",
      },
      {
        q: "Why does South Carolina have a graduate profile?",
        a: "It ties the standards in every grade to one goal: students who leave high school ready for college, careers and citizenship. The standards for each subject were written with it in mind.",
      },
      {
        q: "Does South Carolina have social and emotional learning standards?",
        a: "South Carolina doesn't have statewide social and emotional learning standards for kindergarten to grade 9 like some states do. The life and career characteristics in the Profile of the Graduate cover similar ground, and districts choose their own programs, so ask your child's school what it uses.",
      },
      {
        q: `Does ${APP_NAME} practice these skills?`,
        a: `Partly. ${APP_NAME} practices subject knowledge in math, reading and writing, science and social studies, and many questions ask children to read data, put events in order or reason through a problem. Teamwork, communication and perseverance grow best in class and at home, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more?",
        a: "Ask your child's teacher how the profile shows up in class. The South Carolina Department of Education publishes the profile and the full standards for every subject.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the South Carolina Department of Education",
    hubBlurb: "SC READY English language arts and math (grades 3 to 8), SCPASS science, End-of-Course exams and the 3rd grade reading rule.",
    name: "South Carolina state tests (SC READY and SCPASS)",
    intro:
      "South Carolina students take SC READY, the South Carolina College- and Career-Ready Assessments, in English language arts and math in grades 3 to 8 each spring, and SCPASS science tests in elementary and middle school. Certain high school courses end with an End-of-Course exam. The tests are separate from the report card. Under the Read to Succeed Act, 3rd grade reading results also help decide whether a child moves on to 4th grade.",
    grades: ["3", "4", "5", "6", "7", "8", "9"],
    facts: [
      { title: "Who takes them", body: "SC READY English language arts and math: grades 3 to 8. SCPASS science: grades 4 and 6 in recent years (state budget rules have paused 8th grade science). End-of-Course exams: Algebra 1, English 2, Biology 1 and United States History and the Constitution. Students with the most significant cognitive disabilities take an alternate assessment instead." },
      { title: "What they cover", body: "The tests check the South Carolina College- and Career-Ready Standards for the grade: reading, writing and research, math, and science, including questions that ask students to explain and use evidence." },
      { title: "When", body: "Students test online in the spring, near the end of the school year. The Department of Education sets the testing window each year, and districts choose dates within it." },
      { title: "How results are described", body: "SC READY scores are reported in four levels: Does Not Meet Expectations, Approaches Expectations, Meets Expectations and Exceeds Expectations. Your school shares a score report for your child." },
      { title: "The 3rd grade reading rule", body: "Under the Read to Succeed Act, schools check reading from kindergarten on and add help early. A 3rd grader who scores at the lowest level on the SC READY reading test may be held back, unless a good-cause exemption applies, and may be offered a summer reading camp. Ask your school early if you have questions." },
      { title: "Report card link", body: "SC READY and SCPASS scores don't change your child's report card grades. In high school, the End-of-Course exam counts toward the final course grade." },
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
        q: "What is SC READY?",
        a: "SC READY, the South Carolina College- and Career-Ready Assessments, is South Carolina's state test in English language arts and math for grades 3 to 8. Science is tested separately by SCPASS.",
      },
      {
        q: "Does my child have to pass a test to move on to 4th grade?",
        a: "Under the Read to Succeed Act, a 3rd grader who scores at the lowest level on the SC READY reading test may be held back unless a good-cause exemption applies (for example, some students with an IEP or English learners in their first years). Your school will tell you early if your child needs extra reading help.",
      },
      {
        q: "Can my child skip the tests?",
        a: "State tests are required in South Carolina, and the state doesn't offer an opt-out like some states do. If you have concerns, talk with your child's school about accommodations and what the results are used for.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "Not before high school. Your child's report card describes learning in class through the year, using the grades your district chooses. End-of-Course exams in high school count toward the course grade.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, reading, science and social studies skills in the South Carolina College- and Career-Ready Standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "South Carolina's full-day 4K year (CERDEP) runs in public schools and approved community programs for four-year-olds. It follows the South Carolina Early Learning Standards (2017).",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in South Carolina is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 by ones and tens, and start adding and taking away within 10. Science looks at pushes and pulls, living things and weather, and social studies, The Community Around Us, covers rules, needs and wants, jobs and simple maps.",
      lookFor: "Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, learn place value to 120 and tell time. Social studies is Life in South Carolina: where the state is, its landforms and symbols, rural, suburban and urban places, and how state and local government work.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to adding and subtracting within 1,000, money, time and equal parts of shapes. Science looks at matter, plants and how land changes, and social studies is Life in the United States: the nation's symbols and history, its land and resources, its many cultures, and budgets and saving.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and take the first SC READY state tests. Social studies is world geography: maps and hemispheres, climates and natural hazards, cultures, exploration and migration. Under the Read to Succeed Act, 3rd grade reading results help decide whether a child moves on to 4th grade.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts, and fractions. Ask early if you have questions about reading support.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, fractions and decimals, and longer writing. Science covers energy, waves and Earth's changing surface, and students take the SCPASS science test. Social studies is United States and South Carolina Studies I, from colonization and the Carolina colony through the Revolution, westward expansion, the Civil War and Reconstruction.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and using sources in history.",
    },
    "5": {
      overview: "In 5th grade, students work with decimals and fractions, volume and the coordinate plane, and write longer pieces with evidence. Science covers matter, food webs, Earth's systems and the sun and stars. Social studies is United States and South Carolina Studies II, from the industrial age through the world wars, the Great Depression, civil rights and today.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many South Carolina districts. Math moves to ratios, rates, percents and integers, and science covers cells, heat, waves and Earth's history, weather and climate, with an SCPASS science test. Social studies is World Civilizations, from the first river valley civilizations to today's connected world.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, probability and equations. Science covers atoms and chemical reactions, energy, ecosystems and Earth's resources. Social studies is World Regional Geography: the land, peoples, resources and borders of Africa, Asia, Europe, Oceania and the Americas.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations and functions, the Pythagorean theorem and transformations, and science covers forces, waves, heredity and the solar system. Social studies is South Carolina and the United States, from the Carolina colony through the Revolution, the Civil War, Reconstruction, the New South and the civil rights movement to today.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: "9th grade is the first year of high school. Many students take Algebra 1, English 1 and Biology 1, and Algebra 1 and Biology 1 end with an End-of-Course exam. South Carolina students need United States Government and Economics and Personal Finance to graduate, and this app's 9th grade social studies practices both, including how South Carolina's own government works.",
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing evidence in science and English.",
    },
  },
};
