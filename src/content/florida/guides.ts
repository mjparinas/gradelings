import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Florida, in US English. Florida has no statewide social and emotional learning standards for
// kindergarten to 9th grade, so the competencies page explains the ways of thinking its standards build into every grade:
// the Mathematical Thinking and Reasoning Standards (MTRs) in B.E.S.T. math, the K-12 Expectations in B.E.S.T. English
// language arts, the Nature of Science benchmarks and the social studies inquiry skills (docs/research/florida/README.md).
// The assessment page covers the Florida Assessment of Student Thinking (FAST) and the statewide science, writing and
// end-of-course tests as the Florida Department of Education (FLDOE) describes them, including the 3rd grade reading
// rule in section 1008.25 of the Florida Statutes. Dates change each year, so the page points to FLDOE and the district.
// Florida has no French subject here, so no French guide. Grade notes follow B.E.S.T. math and English language arts,
// the Next Generation Sunshine State Standards for science and the state's social studies standards.

export const FLORIDA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "thinking-standards",
    label: "Thinking and reasoning",
    hubBlurb: "The ways of thinking Florida's standards build in every grade: reasoning in math, citing evidence, investigating and weighing sources.",
    description:
      "What the Mathematical Thinking and Reasoning Standards, the English language arts Expectations, the Nature of Science benchmarks and social studies skills mean for parents, with simple ways to support them at home.",
    gradeLine: "Florida's thinking and reasoning standards apply in every grade.",
    closing: "these thinking skills grow every time your child explains, tests an idea or asks a good question.",
    title: "Florida's thinking and reasoning standards, explained for parents",
    intro:
      "Florida's B.E.S.T. Standards list what students learn in each grade of math and English language arts, and the Next Generation Sunshine State Standards do the same for science. Alongside that content, the standards build in ways of working: the Mathematical Thinking and Reasoning Standards (MTRs) in math, the K-12 Expectations in English language arts and the Nature of Science benchmarks in science. They aren't separate subjects. Teachers build them into everyday lessons, and they show up on state tests too.",
    items: [
      {
        id: "math-thinking",
        name: "Mathematical thinking and reasoning (MTRs)",
        blurb: "Seven standards in B.E.S.T. math that apply in every grade, from kindergarten to Algebra 1 and Geometry.",
        parts: [
          { name: "Effortful learning", blurb: "Sticking with a hard problem, alone and with others." },
          { name: "Representing and explaining", blurb: "Showing understanding in more than one way, and discussing the thinking of self and others." },
          { name: "Fluency, patterns and reasonableness", blurb: "Choosing efficient methods, using patterns and structure, and checking that an answer makes sense." },
          { name: "Real-world math", blurb: "Connecting mathematical ideas to everyday life." },
        ],
        atHome: [
          "Ask “How do you know?” after an answer, even when it's right.",
          "Estimate first (the grocery total, the drive time), then check.",
          "Let your child solve a real problem, like doubling a recipe, and explain each step.",
        ],
      },
      {
        id: "ela-expectations",
        name: "English language arts Expectations",
        blurb: "Six expectations in B.E.S.T. English language arts that apply from kindergarten to 12th grade.",
        parts: [
          { name: "Citing evidence", blurb: "Pointing to the text to explain and justify an idea." },
          { name: "Complex texts and inferences", blurb: "Reading grade-level texts closely and making inferences to understand them." },
          { name: "Discussing and communicating", blurb: "Listening and taking part in discussions, following the rules of grammar and using a voice and tone that fit the audience." },
        ],
        atHome: [
          "After reading together, ask “What in the story makes you think that?”",
          "Take turns predicting what happens next, then check.",
          "Ask your child to read a piece of writing aloud and pick one sentence to make better.",
        ],
      },
      {
        id: "nature-of-science",
        name: "Nature of Science",
        blurb: "Benchmarks in every grade of science about how scientists work: asking questions, investigating and explaining with evidence.",
        parts: [
          { name: "Investigating", blurb: "Asking questions, making predictions and planning fair tests." },
          { name: "Collecting and using data", blurb: "Recording observations and measurements, and finding patterns in charts and graphs." },
          { name: "Explaining", blurb: "Using evidence to explain what happened, and comparing results with others." },
        ],
        atHome: [
          "Wonder out loud together: “Why do you think that happened? How could we test it?”",
          "Keep a simple weather or plant-growth log for a week and look for patterns.",
          "Build something from recycled materials, then talk about how to improve it.",
        ],
      },
      {
        id: "social-studies-skills",
        name: "Social studies skills",
        blurb: "Reading maps and timelines, using sources and evidence, and understanding how citizens take part.",
        parts: [
          { name: "Maps and timelines", blurb: "Finding places, reading maps and putting events in order." },
          { name: "Sources and evidence", blurb: "Telling facts from opinions, and comparing what different sources say." },
          { name: "Citizenship", blurb: "Understanding rights and responsibilities and how people take part in their community." },
        ],
        atHome: [
          "Look at a map of Florida before a trip and let your child find the route.",
          "Make a family timeline with photos and dates.",
          "When you see a news headline together, ask which parts are facts and which are opinions.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the MTRs and Expectations graded?",
        a: "They're part of Florida's standards, so teachers teach them and state tests include them, but they're usually graded inside each subject rather than on their own line. How they appear on a report card depends on your district.",
      },
      {
        q: "Why do the standards build in these skills?",
        a: "They connect the content of every grade. A child doesn't only learn fractions or the water cycle, but also how to solve problems, cite evidence and investigate with them.",
      },
      {
        q: "Does Florida have social and emotional learning standards?",
        a: "Florida doesn't have statewide social and emotional learning standards for kindergarten to 9th grade like some states do. Districts choose their own programs, so ask your child's school what it uses.",
      },
      {
        q: `Does ${APP_NAME} practice these skills?`,
        a: `Partly. ${APP_NAME} practices subject skills in math, reading and writing, science and social studies, and many questions ask children to read data, put events in order or reason through a problem. Investigating, discussing and researching grow best in class and at home, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more?",
        a: "Ask your child's teacher how these skills show up in class. The Florida Department of Education publishes the full standards for every subject, and CPALMS (cpalms.org) lets you search them by grade.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Florida Department of Education (FLDOE)",
    hubBlurb: "FAST reading and math, the science and writing tests, end-of-course exams, and the 3rd grade reading rule.",
    name: "Florida state tests (FAST)",
    intro:
      "Florida students take the Florida Assessment of Student Thinking (FAST) in reading and math, checked three times a year: early in the school year, in winter and in May. Students also take a statewide writing test, a science test in 5th and 8th grade, and end-of-course (EOC) exams in courses such as Civics, Algebra 1, Geometry and Biology 1. The tests are separate from the report card. In 3rd grade, reading results also help decide whether a child moves on to 4th grade.",
    grades: ["3", "4", "5", "6", "7", "8", "9"],
    facts: [
      { title: "Who takes them", body: "FAST reading (English language arts): 3rd grade and up. FAST math: 3rd to 8th grade. Younger students take shorter FAST early literacy and math checks that FLDOE is extending over time. Writing: 4th grade and up. Science: 5th and 8th grade. EOC exams go with the course, including Civics (usually 7th grade) and Algebra 1, Geometry and Biology 1 (often 8th or 9th). Students with the most significant cognitive disabilities take an alternate assessment instead." },
      { title: "What they cover", body: "FAST checks Florida's B.E.S.T. Standards for the grade in reading and math, and the science and EOC tests check the Next Generation Sunshine State Standards and the course standards. Many questions ask students to explain, use evidence or work with a passage or a graph." },
      { title: "When", body: "The FAST windows run in late summer, winter and May, and the May check (PM3) is the one used for most decisions. FLDOE sets the windows each year, and districts choose dates within them." },
      { title: "How results are described", body: "Scores are reported in five achievement levels, from Level 1 to Level 5, and Level 3 means on grade level. Your school shares a score report for your child." },
      { title: "The 3rd grade reading rule", body: "Under section 1008.25 of the Florida Statutes, a 3rd grader who scores Level 1 on the 3rd grade reading test may be held back from 4th grade unless a good cause exemption applies. Schools check reading from kindergarten on and add help early. Ask your school early if you have questions." },
      { title: "End-of-course exams", body: "The Civics EOC counts for 30 percent of a 7th grader's course grade, and the Algebra 1 EOC is part of Florida's high school graduation requirements. Ask your school how an exam counts in your child's course." },
      { title: "Report card link", body: "FAST scores don't set your child's report card grades. They are one more snapshot for families, teachers and schools." },
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
        q: "What is FAST?",
        a: "The Florida Assessment of Student Thinking is Florida's reading and math progress monitoring. Students take it three times a year, so families and teachers can see growth from the fall to the spring.",
      },
      {
        q: "Does my child have to pass a test to move on to 4th grade?",
        a: "A 3rd grader who scores Level 1 on the 3rd grade reading test may be held back unless a good cause exemption applies (for example, some students with disabilities or English learners in their first years). Your school will tell you early if your child needs extra reading help.",
      },
      {
        q: "Can my child skip the tests?",
        a: "Florida requires students to take the statewide tests, and the state doesn't offer a formal opt-out. If you have concerns, talk with your child's school about accommodations and what the results are used for.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the grades your district chooses. Some end-of-course exams count toward a course grade, so ask your school.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, reading, science and social studies skills in Florida's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Florida is Voluntary Prekindergarten (VPK): free for every 4-year-old who lives in Florida, in a school or a private provider. It follows the Florida Early Learning and Developmental Standards: approaches to learning, social and emotional development, language and literacy, math, science and social studies.",
      lookFor: "VPK has no report card; teachers share progress notes and a checklist, and VPK children take a short state progress check three times a year. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Florida is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Science looks at the senses, living things and objects, and social studies covers rules, needs and wants, simple maps, and symbols like the American flag and the Florida flag.",
      lookFor: "Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, learn place value to 120 and tell time. Social studies looks at rules and rights, saving and spending, maps of Florida and life long ago.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to adding and subtracting within 1,000, money and time, and measuring in inches and centimeters. Science looks at life cycles, matter and weather, and social studies looks at early America, why people form governments, and supply and demand.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and take the first FAST reading and math tests. Social studies covers U.S. regions and landmarks and the countries of North America. Under Florida law, 3rd grade reading results also help decide whether a child moves on to 4th grade.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts, and fractions. Ask early if you have questions about reading support.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, fractions and decimals, and longer writing with evidence. Science covers energy, electricity and Earth's changing surface. Social studies is Florida history, from the first peoples and Spanish St. Augustine to statehood, the Civil War and Florida today, plus how earning, saving and budgeting work.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Florida history.",
    },
    "5": {
      overview: "In 5th grade, students work with decimals and fractions, volume and the coordinate plane, and write longer pieces with evidence. Science covers matter, forces, the water cycle and food webs, and the statewide science test is given this year. Social studies is American history from the earliest peoples through westward expansion.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Florida districts. Math moves to ratios, rates, percents and integers, and science covers Earth's structure, weather and cells. Social studies is world history, from early river civilizations and Greece and Rome to the civilizations of the Americas.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, probability and equations. Science covers heredity, matter and ecosystems. Social studies is civics and government, from the origins of government and the American Revolution to the Constitution and the branches of government, ending with the Civics end-of-course exam.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations and functions, the Pythagorean theorem and transformations, and many students take Algebra 1. Science covers forces, energy, waves and space, and the statewide science test is given this year. Social studies is American history from colonial settlement to Reconstruction, with a strong financial literacy strand.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: "9th grade is the first year of high school. Most students take Algebra 1 or Geometry, and Biology 1 or another science course, and some courses end with a state exam. This app's 9th grade social studies practices world history, from ancient and classical civilizations and the Middle Ages to revolutions, industrialization and the modern world.",
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing evidence in science and English.",
    },
  },
};
