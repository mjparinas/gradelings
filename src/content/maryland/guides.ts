import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Maryland, in US English. The competencies page is the learning practices built into Maryland's
// standards (the Standards for Mathematical Practice, the science and engineering practices, the reading, writing and
// speaking habits of English language arts, and social studies inquiry); they are taught inside each subject, not
// graded on their own. The assessment page covers the Maryland Comprehensive Assessment Program (MCAP: English language
// arts and math in grades 3 to 8, science in grades 5 and 8, social studies in grade 8, and high school tests) and the
// Kindergarten Readiness Assessment. Dates change each year, so the page points to the Maryland State Department of
// Education (MSDE). Maryland has no French subject here, so no French guide. Record: docs/research/maryland/README.md.

export const MARYLAND_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "learning-practices",
    label: "Learning practices",
    hubBlurb: "The ways of thinking Maryland's standards build in every grade: solving problems, investigating, reading closely and weighing evidence.",
    description:
      "What the practices in Maryland's standards mean for parents: the Standards for Mathematical Practice, the science and engineering practices, the reading, writing and speaking habits in English language arts, and social studies inquiry, with simple ways to support them at home.",
    gradeLine: "Maryland's learning practices apply in every grade.",
    closing: "these thinking skills grow every time your child explains, tests an idea or asks a good question.",
    title: "Maryland's learning practices, explained for parents",
    intro:
      "Maryland's College and Career Ready Standards list what students learn in each grade and subject. Alongside that content, each subject names practices: the ways students are expected to think and work, such as making sense of a problem, planning an investigation, using context clues or judging a source. They aren't a separate subject. Teachers build them into everyday lessons, and they show up on state tests too.",
    items: [
      {
        id: "math-practices",
        name: "Standards for Mathematical Practice",
        blurb: "Eight habits of good math thinkers, from sticking with a hard problem to explaining why an answer works.",
        parts: [
          { name: "Making sense", blurb: "Understanding a problem, making a plan and sticking with it." },
          { name: "Reasoning", blurb: "Explaining thinking, and listening to and questioning other people's reasoning." },
          { name: "Modeling and tools", blurb: "Using drawings, objects, equations and tools to show and solve real problems." },
          { name: "Precision and patterns", blurb: "Being careful with numbers and words, and spotting patterns and structure." },
        ],
        atHome: [
          "Ask “How do you know?” after an answer, even when it's right.",
          "Estimate first (the grocery total, the drive time), then check.",
          "Let your child solve a real problem, like doubling a recipe, and explain each step.",
        ],
      },
      {
        id: "science-practices",
        name: "Science and engineering practices",
        blurb: "Asking questions, planning investigations, using models and evidence, and designing solutions.",
        parts: [
          { name: "Investigating", blurb: "Asking questions and planning and carrying out fair, safe investigations." },
          { name: "Analyzing data", blurb: "Recording observations and measurements, and finding patterns in charts and graphs." },
          { name: "Explaining and designing", blurb: "Using evidence to explain what happened, and designing and testing solutions to problems." },
        ],
        atHome: [
          "Wonder out loud together: “Why do you think that happened? How could we test it?”",
          "Keep a simple weather or plant-growth log for a week and look for patterns.",
          "Build something from recycled materials, then talk about how to improve it.",
        ],
      },
      {
        id: "ela-habits",
        name: "Reading, writing and speaking habits",
        blurb: "Skills practiced all year in every grade: reading closely, citing evidence, using context clues, discussing and writing through a process.",
        parts: [
          { name: "Listening and speaking", blurb: "Listening actively and following rules for discussion." },
          { name: "Context clues", blurb: "Using the words around an unfamiliar word to work out what it means." },
          { name: "Writing process", blurb: "Planning, drafting, revising, editing and publishing, with digital tools used safely and fairly." },
        ],
        atHome: [
          "After reading together, ask what your child wondered and what surprised them.",
          "When you meet a new word, ask what clues in the sentence hint at its meaning.",
          "Ask your child to read a piece of writing aloud and pick one sentence to make better.",
        ],
      },
      {
        id: "social-studies-inquiry",
        name: "Social studies inquiry",
        blurb: "Asking questions, evaluating sources and communicating conclusions, with civic, economic, geographic and historical thinking.",
        parts: [
          { name: "Evaluating evidence", blurb: "Using primary and secondary sources, and telling fact from opinion." },
          { name: "Communicating conclusions", blurb: "Explaining a claim with evidence in writing and speaking." },
          { name: "Disciplinary thinking", blurb: "Thinking like a citizen, an economist, a geographer and a historian." },
        ],
        atHome: [
          "Look at a map before a trip and let your child find the route.",
          "Make a family timeline with photos and dates.",
          "When you see a news headline together, ask which parts are facts and which are opinions.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the practices graded?",
        a: "They're part of Maryland's standards, so teachers teach them and MCAP tests include them, but they're usually graded inside each subject rather than on their own line. How they appear on a report card depends on your district.",
      },
      {
        q: "Why does each subject list practices?",
        a: "The practices connect the content of every grade. A child doesn't only learn fractions or the water cycle, but also how to solve problems, investigate and explain with them.",
      },
      {
        q: "What about social and emotional learning?",
        a: "Maryland's school systems choose their own social and emotional learning programs and how they report on them, so ask your child's school what it uses.",
      },
      {
        q: `Does ${APP_NAME} practice these skills?`,
        a: `Partly. ${APP_NAME} practices subject skills in math, reading and writing, science and social studies, and many questions ask children to read data, put events in order or reason through a problem. Investigating, researching and discussing grow best in class and at home, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more?",
        a: "Ask your child's teacher how the practices show up in class. MSDE publishes the full standards and frameworks for every subject on its website.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Maryland State Department of Education",
    hubBlurb: "MCAP tests in English language arts and math (grades 3 to 8), science (grades 5 and 8) and social studies (grade 8).",
    name: "Maryland state tests (MCAP)",
    intro:
      "Maryland students take the Maryland Comprehensive Assessment Program (MCAP) tests each spring: English language arts and math in grades 3 to 8, science in grades 5 and 8, and social studies in grade 8. High school students take MCAP tests in English 10, Algebra I and other math courses, life science and government. Kindergarten teachers also use the Kindergarten Readiness Assessment (KRA) in the first weeks of school. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 8. Science: grades 5 and 8. Social studies: grade 8. High school: English 10, Algebra I and other math courses, life science and government. Students with the most significant cognitive disabilities may take an alternate assessment instead." },
      { title: "When", body: "Mostly in spring, in testing windows MSDE announces each year. Each school system sets its own days within the windows, so ask your school for this year's dates." },
      { title: "Kindergarten", body: "The KRA isn't a test children study for. Teachers watch children and give short tasks in the first weeks of kindergarten in areas like language and literacy, math and social skills, to plan teaching." },
      { title: "What they cover", body: "MCAP tests check Maryland's College and Career Ready Standards in English language arts and math, the Maryland science standards and the Maryland social studies framework. High school tests can count toward graduation requirements, so ask the school how." },
      { title: "How results are described", body: "Scores are reported as performance levels compared with state expectations. Families get a score report from the school, and school results appear on the Maryland Report Card." },
      { title: "Report card link", body: "State test scores don't change your child's report card. They are one more snapshot for families, teachers and schools." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, then ask your child to retell what happened and explain why.",
      "Practice math with real problems (shopping, cooking, travel times) as well as math facts.",
      "Ask “How do you know?” so your child gets used to explaining answers.",
      "Tell your child the tests show what they know and how they are growing. They are not something to fail.",
    ],
    faqs: [
      {
        q: "What is MCAP?",
        a: "The Maryland Comprehensive Assessment Program is Maryland's set of state tests. In grades 3 to 8 it covers English language arts and math every year, science in grades 5 and 8 and social studies in grade 8. Most tests are given online.",
      },
      {
        q: "Which grades take the science test?",
        a: "The MCAP science test is given in grades 5 and 8, and high school students take a life science test.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school system chooses. The Maryland Report Card is something different: a public report on each school.",
      },
      {
        q: "Can my child skip the state tests?",
        a: "Ask your school. Federal and state law expect nearly all students to take the state tests, and schools can explain their own policy and what happens if a family asks for their child not to test.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in Maryland's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Maryland is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they talk about freedom, fairness and rules, find Maryland on a map and learn about jobs and trade. Teachers also use the Kindergarten Readiness Assessment in the first weeks of school.",
      lookFor: "Many Maryland school systems use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies covers community, leaders, maps, trade and borrowing, and Maryland's symbols.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies covers democracy and the common good, producers and consumers, and how communities change.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read and start multiplication, division and fractions. Social studies is about Maryland: its economy (seafood, farms, the Port of Baltimore and tourism), the Chesapeake Bay and the environment, local, state and national government, and the Native nations and early colonists of the Chesapeake. It is also the first year of MCAP tests in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is early Maryland and the nation: the Chesapeake when worlds collided, the Maryland colony from the Ark and the Dove to Annapolis, slavery in Maryland, and Maryland in the American Revolution.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Maryland history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies covers the Constitution and the Bill of Rights, slavery and the Civil War with Maryland as a border state, how roads, railroads and the telegraph changed the country, and civil rights in Maryland, from Thurgood Marshall to the sit-ins. Students take the MCAP science test.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: `6th grade is the start of middle school in most Maryland school systems. Math moves to ratios, rates, negative numbers and expressions. Science covers weather, climate and how living things grow, and social studies in ${APP_NAME} uses geography to study early civilizations, their governments, world religions and early trade.`,
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: `In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies in ${APP_NAME} is world history from about 600 to 1900: the spread of Islam, the Mongols, West African kingdoms, the Maya, Aztec and Inca, Japan and the age of revolutions.`,
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is United States history from colonial times to Reconstruction, including Maryland's part in it, from the Articles of Confederation to Fort McHenry and the fight against slavery. Students take MCAP tests in science and social studies this year.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers Algebra I (expressions, equations, functions and data), and English classes read and write more closely. Social studies is American Government, which Maryland high school students take and are tested on: the principles of the Constitution, the three branches, how Maryland governs itself through the General Assembly, the governor and the courts, landmark cases and how government affects the economy.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
