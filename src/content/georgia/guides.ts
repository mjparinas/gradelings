import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Georgia, in US English. Georgia has no statewide social and emotional learning standards, so the
// competencies page explains the practices Georgia's standards build into every grade: the eight Mathematical
// Practices in Georgia's K-12 Mathematics Standards (coded "4.MP.1" in every grade), the Practices domain of Georgia's
// K-12 English Language Arts Standards, the way science standards ask students to obtain, evaluate and communicate
// information, and the social studies map and globe skills and information processing skills. The assessment page
// covers the Georgia Milestones Assessment System (End-of-Grade tests in English language arts and math in grades 3 to
// 8, science in 5 and 8 and social studies in 8; End-of-Course tests in high school; four achievement levels), the
// promotion rules in O.C.G.A. 20-2-283 and the Georgia Early Literacy Act's reading checks. Dates change each year, so
// the page points to the Georgia Department of Education (GaDOE). Georgia has no French subject here, so no French
// guide. Record: docs/research/georgia/README.md.

export const GEORGIA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "learning-practices",
    label: "Learning practices",
    hubBlurb: "The ways of thinking Georgia's standards build in every grade: solving problems, reading closely, investigating and weighing sources.",
    description:
      "What the practices in Georgia's standards mean for parents: the Mathematical Practices, the English language arts literacy practices, science investigations and the social studies map and information skills, with simple ways to support them at home.",
    gradeLine: "Georgia's learning practices apply in every grade.",
    closing: "these thinking skills grow every time your child explains, tests an idea or asks a good question.",
    title: "Georgia's learning practices, explained for parents",
    intro:
      "Georgia's standards list what students learn in each grade and subject. Alongside that content, each subject names practices: the ways students are expected to think and work, such as sticking with a hard problem, reading a text with a purpose, collecting evidence or reading a map. They aren't a separate subject. Teachers build them into everyday lessons, and they show up on state tests too.",
    items: [
      {
        id: "math-practices",
        name: "Mathematical Practices",
        blurb: "Eight habits of good math thinkers, listed in every grade of Georgia's math standards.",
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
        id: "literacy-practices",
        name: "Literacy practices",
        blurb: "The Practices domain of Georgia's English language arts standards: how readers and writers work.",
        parts: [
          { name: "Engagement and intention", blurb: "Reading and writing with a purpose, and choosing strategies that help." },
          { name: "Situating texts", blurb: "Thinking about who wrote a text, when, and for whom." },
          { name: "Author's craft", blurb: "Noticing the choices writers make, and making them in your own writing." },
          { name: "Collaboration and presentation", blurb: "Building ideas with others and sharing them clearly." },
        ],
        atHome: [
          "Before reading together, ask “What do you want to find out?”",
          "After a story, ask why the author chose a word, a picture or an ending.",
          "Let your child read a short piece of their writing aloud to the family.",
        ],
      },
      {
        id: "science-practices",
        name: "Science practices",
        blurb: "Georgia's science standards ask students to investigate, use evidence and explain what they find.",
        parts: [
          { name: "Asking and investigating", blurb: "Asking questions and planning simple, fair tests." },
          { name: "Evidence and models", blurb: "Collecting data, building models and explaining with evidence." },
          { name: "Obtaining and communicating", blurb: "Finding reliable information and sharing results clearly." },
        ],
        atHome: [
          "Wonder out loud together (“Why did the ice melt faster there?”) and test a guess.",
          "Keep a simple weather or plant-growth chart for a week, then talk about the pattern.",
          "Ask “What's your evidence?” when your child explains how something works.",
        ],
      },
      {
        id: "social-studies-skills",
        name: "Social studies skills",
        blurb: "The map and globe skills and information processing skills that run through every grade.",
        parts: [
          { name: "Map and globe skills", blurb: "Directions, map keys, scale, grids, and latitude and longitude." },
          { name: "Sources", blurb: "Telling primary from secondary sources, and fact from opinion." },
          { name: "Timelines, charts and causes", blurb: "Putting events in order, reading charts and finding cause and effect." },
        ],
        atHome: [
          "Use a map (paper or on a phone) to plan a trip, and let your child give directions.",
          "Look at an old family photo together and ask what it tells you about the past.",
          "When you read news together, ask whether a sentence is a fact or an opinion.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the learning practices graded?",
        a: "Not as a subject. They are part of how each subject is taught, and some report cards comment on related habits, like problem solving or working with others. How that is reported is up to the school or district.",
      },
      {
        q: "Does Georgia have social and emotional learning standards?",
        a: "No. Georgia has no statewide social and emotional learning standards. Many schools still teach skills like self-control and teamwork, so ask your school how it does.",
      },
      {
        q: "Where do the practices come from?",
        a: "Georgia's K-12 Mathematics Standards list eight Mathematical Practices in every grade, and Georgia's K-12 English Language Arts Standards have a whole Practices domain. The science and social studies standards build investigation, sources and map skills into their standards.",
      },
      {
        q: `Does ${APP_NAME} measure the practices?`,
        a: `Partly. ${APP_NAME} practices subject skills in math, English language arts, science and social studies, and many questions ask children to reason, read a map or judge a source. These habits grow best through conversation and real problems, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school teaches them?",
        a: "Ask your child's teacher which practices the class is working on and what you can do at home. The standards are published by the Georgia Department of Education.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Georgia Department of Education",
    hubBlurb: "Georgia Milestones in English language arts and math (grades 3 to 8), science (grades 5 and 8) and social studies (grade 8).",
    name: "Georgia state tests (Georgia Milestones)",
    intro:
      "Georgia students take the Georgia Milestones Assessment System. The End-of-Grade tests cover English language arts and math in grades 3 to 8, science in grades 5 and 8, and social studies in grade 8. In high school, students take End-of-Course tests in some courses. In Kindergarten to 3rd grade, schools also check every child's reading under the Georgia Early Literacy Act. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 8. Science: grades 5 and 8. Social studies: grade 8. High school students take End-of-Course tests in some courses, such as Algebra, Biology, American Literature and US History. Students with the most significant cognitive disabilities may take the Georgia Alternate Assessment (GAA 2.0) instead." },
      { title: "When", body: "In spring, near the end of the school year. Each district sets its own days within the window the Georgia Department of Education announces each year." },
      { title: "Reading checks in Kindergarten to 3rd grade", body: "Under the Georgia Early Literacy Act, schools check every child's reading with a short screener several times a year in Kindergarten to 3rd grade, and give extra help to children who need it." },
      { title: "Moving up a grade", body: "Georgia's promotion rules look at reading in 3rd grade and at reading and math in 5th and 8th grade. A child who isn't yet at grade level gets more help and another chance, and a placement committee that includes the parent and teacher decides together. Ask your school how it applies these rules." },
      { title: "How results are described", body: "Scores are reported in four achievement levels: Beginning Learner, Developing Learner, Proficient Learner and Distinguished Learner. Families get a score report from the school, including a Lexile measure for reading." },
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
        q: "What is Georgia Milestones?",
        a: "Georgia Milestones is Georgia's state testing program. It checks Georgia's standards in English language arts, math, science and social studies, mostly online, with a paper version for students who need it.",
      },
      {
        q: "Which grades take the science and social studies tests?",
        a: "Science is tested in grades 5 and 8, and social studies in grade 8. In high school, Biology and US History have End-of-Course tests.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your district chooses. In high school, an End-of-Course test counts toward the course grade.",
      },
      {
        q: "Can my child skip the state tests?",
        a: "Georgia expects every student to take the state tests, and there is no opt-out process in state law. If you have concerns, talk with your child's school.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in Georgia's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Georgia is Georgia's Pre-K Program, free for every 4-year-old in the state and offered in public schools and private child care centers. Classrooms follow the Georgia Early Learning and Development Standards (GELDS): social and emotional growth, approaches to play and learning, language and literacy, math, science, social studies and creative development.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Georgia is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about holidays, American symbols, good citizens and maps. Teachers record each child's skills through the year with GKIDS and check reading with a short screener.",
      lookFor: "Many Georgia districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies covers historical figures such as Benjamin Franklin, Sacagawea and George Washington Carver, the continents and oceans, and goods and services.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Social studies is about Georgia: its five regions and major rivers, people such as James Oglethorpe, Tomochichi, Sequoyah and Martin Luther King, Jr., the Muscogee (Creek) and Cherokee, and the governor and mayor.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study early American Indian cultures, European explorers, the thirteen colonies and the three branches of government. It is also the first year of Georgia Milestones in English language arts and math, and reading in 3rd grade counts toward moving up a grade.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers the stars and planets, weather, light, sound and forces. Social studies is United States history from the American Revolution and the Constitution to westward expansion, the Civil War and Reconstruction.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and explaining causes and effects in history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies continues United States history from 1900 to 2001: World War I, the Great Depression, World War II, the Cold War and the civil rights movement. Students take Georgia Milestones science, and reading and math count toward moving up a grade.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in most Georgia districts. Math moves to ratios, rates, negative numbers and expressions. Science is Earth science, from the solar system to rocks, weather and water, and social studies is world geography: Latin America, Europe and Australia, their land, history, governments and economies.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science is life science, from cells and body systems to heredity and ecosystems, and social studies is world geography: Africa, Southwest Asia (the Middle East) and Southern and Eastern Asia.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science is physical science, from atoms and chemical changes to forces, energy and waves, and social studies is Georgia Studies: Georgia's geography, history from its first peoples to today, and how its government and economy work. Students take Georgia Milestones science and social studies, and reading and math count toward moving up a grade.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra and geometry (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} is American Government/Civics, which every Georgia student takes for graduation, including Georgia's own state and local government, plus personal financial literacy.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
