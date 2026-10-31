import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Arkansas, in US English. Arkansas has no statewide social and emotional learning standards, so the
// competencies page explains the ways of working the Arkansas Academic Standards build into every grade: problem solving
// and reasoning in math, the science and engineering practices, the communication, collaboration and research strands
// of English language arts and the social studies inquiry practices (docs/research/arkansas/README.md). The assessment
// page covers ATLAS, the Arkansas Teaching and Learning Assessment System, as DESE describes it: English language arts,
// math and science in grades 3 to 10 (no 9th grade science test), literacy and math checks in kindergarten to 2nd grade,
// four achievement levels with Levels 3 and 4 counting as proficient, and the LEARNS Act's 3rd grade reading rule. Dates
// change each year, so the page points to DESE. Arkansas has no French subject, so no French guide. Grade notes follow
// the Arkansas Academic Standards (math 2023, English language arts 2023, science, social studies 2022).

export const ARKANSAS_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "learning-practices",
    label: "Learning practices",
    hubBlurb: "The ways of thinking Arkansas's standards build in every grade: solving problems, investigating, discussing and weighing evidence.",
    description:
      "What the practices in the Arkansas Academic Standards mean for parents: problem solving and reasoning in math, science and engineering practices, communication and research in English language arts, and social studies inquiry, with simple ways to support them at home.",
    gradeLine: "Arkansas's learning practices apply in every grade.",
    closing: "these thinking skills grow every time your child explains, tests an idea or asks a good question.",
    title: "Arkansas's learning practices, explained for parents",
    intro:
      "The Arkansas Academic Standards list what students learn in each grade and subject. Alongside that content, the standards build in ways of working: solving problems and explaining reasoning, planning an investigation, discussing ideas with others, researching a question and judging a source. They aren't a separate subject. Teachers build them into everyday lessons, and they show up on state tests too.",
    items: [
      {
        id: "math-reasoning",
        name: "Problem solving and reasoning in math",
        blurb: "Every grade of the Arkansas Mathematics Standards includes problem solving: understanding a problem, choosing a strategy and explaining why it works.",
        parts: [
          { name: "Making sense", blurb: "Understanding a problem, making a plan and sticking with it." },
          { name: "Explaining", blurb: "Showing and explaining the reasoning behind an answer." },
          { name: "Modeling", blurb: "Using drawings, objects, equations and graphs to show and solve real problems." },
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
        id: "communication-research",
        name: "Communication, collaboration and research",
        blurb: "English language arts strands practiced in every grade: listening, discussing, presenting, and researching a question.",
        parts: [
          { name: "Communication and collaboration", blurb: "Listening actively, taking part in discussions and presenting ideas clearly." },
          { name: "Research", blurb: "Asking a question, gathering information from sources and sharing what was learned." },
          { name: "Writing process", blurb: "Planning, drafting, revising and editing a piece of writing." },
        ],
        atHome: [
          "After reading together, ask what your child wondered and what surprised them.",
          "Pick a question at dinner and help your child find two sources that answer it.",
          "Ask your child to read a piece of writing aloud and pick one sentence to make better.",
        ],
      },
      {
        id: "social-studies-inquiry",
        name: "Social studies inquiry",
        blurb: "Asking good questions, evaluating sources and evidence, and communicating conclusions and taking informed action.",
        parts: [
          { name: "Developing questions", blurb: "Asking questions about key ideas and planning how to answer them." },
          { name: "Evaluating sources", blurb: "Gathering information from several sources and perspectives, and judging how useful they are." },
          { name: "Communicating and acting", blurb: "Explaining a claim with evidence, and taking part in the community." },
        ],
        atHome: [
          "Look at a map of Arkansas before a trip and let your child find the route.",
          "Make a family timeline with photos and dates.",
          "When you see a news headline together, ask which parts are facts and which are opinions.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the practices graded?",
        a: "They're part of the Arkansas Academic Standards, so teachers teach them and state tests include them, but they're usually graded inside each subject rather than on their own line. How they appear on a report card depends on your district.",
      },
      {
        q: "Why do the standards build in practices?",
        a: "The practices connect the content of every grade. A child doesn't only learn fractions or the water cycle, but also how to solve problems, investigate and explain with them.",
      },
      {
        q: "Does Arkansas have social and emotional learning standards?",
        a: "Arkansas doesn't have statewide social and emotional learning standards for kindergarten to grade 9 like some states do. Districts choose their own programs, so ask your child's school what it uses.",
      },
      {
        q: `Does ${APP_NAME} practice these skills?`,
        a: `Partly. ${APP_NAME} practices subject skills in math, reading and writing, science and social studies, and many questions ask children to read data, put events in order or reason through a problem. Investigating, researching and discussing grow best in class and at home, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more?",
        a: "Ask your child's teacher how the practices show up in class. The Arkansas Department of Education publishes the full Arkansas Academic Standards for every subject.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Arkansas Department of Education (DESE)",
    hubBlurb: "ATLAS English language arts, math and science (grades 3 to 10), early grades checks, and the 3rd grade reading rule.",
    name: "Arkansas state tests (ATLAS)",
    intro:
      "Arkansas students take ATLAS, the Arkansas Teaching and Learning Assessment System. Each spring, students in grades 3 to 10 take English language arts, math and science tests (there is no 9th grade science test), and kindergarten to 2nd grade have shorter literacy and math checks. The tests are separate from the report card. Under the LEARNS Act, 3rd grade reading results also help decide whether a child moves on to 4th grade.",
    grades: ["3", "4", "5", "6", "7", "8", "9"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 10, with end-of-course math tests in high school. Science: grades 3 to 8 and 10. Kindergarten to 2nd grade take literacy and math checks during the year. Students with the most significant cognitive disabilities take an alternate assessment instead." },
      { title: "What they cover", body: "ATLAS checks the Arkansas Academic Standards for the grade: reading, writing and language, math, and science, including questions that ask students to explain and use evidence." },
      { title: "When", body: "Students test online in the spring. DESE sets the testing window each year, and districts choose dates within it." },
      { title: "How results are described", body: "Scores are reported in four achievement levels, from Level 1 to Level 4. Levels 3 and 4 count as proficient, and Level 3 means meeting grade-level expectations. Your school shares a score report for your child." },
      { title: "The 3rd grade reading rule", body: "Under the LEARNS Act, from the end of the 2025-26 school year, 3rd graders need Level 2 or above on the ATLAS reading test to move on to 4th grade, unless a good-cause exemption applies. Schools check reading from kindergarten on and add help early. Ask your school early if you have questions." },
      { title: "Report card link", body: "State test scores don't change your child's report card grades. They are one more snapshot for families, teachers and schools." },
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
        q: "What is ATLAS?",
        a: "The Arkansas Teaching and Learning Assessment System is Arkansas's set of state tests. It covers English language arts, math and science in grades 3 to 10 each spring, and shorter literacy and math checks in kindergarten to 2nd grade.",
      },
      {
        q: "Does my child have to pass a test to move on to 4th grade?",
        a: "Under the LEARNS Act, 3rd graders need Level 2 or above on the ATLAS reading test to move on, unless a good-cause exemption applies (for example, some students with an IEP or English learners in their first years). Your school will tell you early if your child needs extra reading help.",
      },
      {
        q: "Can my child skip the tests?",
        a: "State tests are required in Arkansas, and the state doesn't offer an opt-out like some states do. If you have concerns, talk with your child's school about accommodations and what the results are used for.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the grades your district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, reading, science and social studies skills in the Arkansas Academic Standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Arkansas Better Chance funds a pre-K year for four-year-olds in schools and community programs. It follows the Arkansas Child Development and Early Learning Standards.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Arkansas is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 by ones and tens, and start adding and taking away within 10. Science looks at pushes and pulls, living things and weather, and social studies covers rules, needs and wants, simple maps, and symbols like the American flag and the Arkansas flag.",
      lookFor: "Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, learn place value to 120 and tell time. Social studies looks at rules and laws, saving and spending, maps, life long ago, and the goods Arkansas grows and trades.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to adding and subtracting within 1,000, money, time and equal parts of shapes. Science looks at matter, plants and how land changes, and social studies looks at government, the founding documents, state and national symbols and landmarks, and how goods are made and sold.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and take the first ATLAS state tests. Social studies explores Arkansas's land, regions and resources, state government and Arkansas history. Under the LEARNS Act, 3rd graders need Level 2 or above on the ATLAS reading test to move on to 4th grade, unless an exemption applies.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts, and fractions. Ask early if you have questions about reading support.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, fractions and decimals, and longer writing. Science covers energy, waves and Earth's changing surface. Social studies goes deeper into Arkansas history, people and places, from Toltec Mounds to Hot Springs National Park, and compares state and federal government.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Arkansas history.",
    },
    "5": {
      overview: "In 5th grade, students work with decimals and fractions, volume and the coordinate plane, and write longer pieces with evidence. Science covers matter, food webs, Earth's systems and the sun and stars. Social studies is world geography: maps, regions, climate, population and how people and places around the world are connected.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Arkansas districts. Math moves to ratios, rates, percents and integers, and science covers cells and body systems, heat and weather. Social studies is world history, from early humans and the first civilizations to the world's empires and trade routes.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, probability and equations. Science covers matter and chemical reactions, ecosystems and Earth's surface. Social studies is United States history to about 1850, and many students also take the Arkansas History course in 7th or 8th grade.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations and functions, the Pythagorean theorem and transformations, and science covers forces, energy, waves, heredity and space. Social studies is United States history from about 1850, through the Civil War and Reconstruction to the early 1900s, with Arkansas History in 7th or 8th grade.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: "9th grade is the first year of high school. Most students take Algebra I, and many take physical science or biology. Arkansas students take civics in high school, and this app's 9th grade social studies practices it: the Constitution, rights and responsibilities, how governments work, and Arkansas's own government.",
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing evidence in science and English.",
    },
  },
};
