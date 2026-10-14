import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Alabama, in US English. Alabama has no statewide social and emotional learning standards, so the
// competencies page explains the practices the Alabama Courses of Study build into every grade: the Student
// Mathematical Practices, the science and engineering practices, the recurring English language arts standards and the
// social studies practices (docs/research/alabama/README.md). The assessment page covers the Alabama Comprehensive
// Assessment Program (ACAP) as ALSDE describes it: English language arts and math in grades 2 to 8, science in grades 4,
// 6 and 8, four achievement levels with Levels 3 and 4 counting as proficient, and ACAP Alternate. It also covers the
// Alabama Literacy Act's 3rd grade reading rule. Dates change each year, so the page points to ALSDE. Alabama has no
// French subject, so no French guide. Grade notes follow the Alabama Courses of Study (math 2019, English language
// arts 2021, science 2023, social studies 2024).

export const ALABAMA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "learning-practices",
    label: "Learning practices",
    hubBlurb: "The ways of thinking Alabama's standards build in every grade: solving problems, investigating, reading closely and weighing evidence.",
    description:
      "What the practices in the Alabama Course of Study mean for parents: the Student Mathematical Practices, science and engineering practices, the recurring English language arts standards and the social studies practices, with simple ways to support them at home.",
    gradeLine: "Alabama's learning practices apply in every grade.",
    closing: "these thinking skills grow every time your child explains, tests an idea or asks a good question.",
    title: "Alabama's learning practices, explained for parents",
    intro:
      "The Alabama Course of Study lists what students learn in each grade and subject. Alongside that content, each subject names practices: the ways students are expected to think and work, such as making sense of a problem, planning an investigation, using context clues or judging a source. They aren't a separate subject. Teachers build them into everyday lessons, and they show up on state tests too.",
    items: [
      {
        id: "math-practices",
        name: "Student Mathematical Practices",
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
        id: "recurring-ela",
        name: "Recurring English language arts standards",
        blurb: "Skills practiced all year in every grade: active listening, context clues, using digital tools well and writing through a process.",
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
        id: "social-studies-practices",
        name: "Social studies practices",
        blurb: "Evaluating evidence and communicating conclusions, with civic, economic, geographic and historical thinking.",
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
        a: "They're part of the Alabama Course of Study, so teachers teach them and state tests include them, but they're usually graded inside each subject rather than on their own line. How they appear on a report card depends on your district.",
      },
      {
        q: "Why does each subject list practices?",
        a: "The practices connect the content of every grade. A child doesn't only learn fractions or the water cycle, but also how to solve problems, investigate and explain with them.",
      },
      {
        q: "Does Alabama have social and emotional learning standards?",
        a: "Alabama doesn't have statewide social and emotional learning standards for kindergarten to grade 9 like some states do. Districts choose their own programs, so ask your child's school what it uses.",
      },
      {
        q: `Does ${APP_NAME} practice these skills?`,
        a: `Partly. ${APP_NAME} practices subject skills in math, reading and writing, science and social studies, and many questions ask children to read data, put events in order or reason through a problem. Investigating, researching and discussing grow best in class and at home, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more?",
        a: "Ask your child's teacher how the practices show up in class. ALSDE publishes the full Alabama Course of Study for every subject.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Alabama State Department of Education (ALSDE)",
    hubBlurb: "ACAP English language arts and math (grades 2 to 8) and science (grades 4, 6 and 8), and the 3rd grade reading rule.",
    name: "Alabama state tests (ACAP)",
    intro:
      "Alabama students take the Alabama Comprehensive Assessment Program (ACAP) Summative each spring: English language arts and math in grades 2 to 8, and science in grades 4, 6 and 8. The tests are separate from the report card. Under the Alabama Literacy Act, 3rd grade reading results also help decide whether a child moves on to 4th grade.",
    grades: ["2", "3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 2 to 8. Science: grades 4, 6 and 8. Students with the most significant cognitive disabilities may take ACAP Alternate instead." },
      { title: "What they cover", body: "ACAP checks the Alabama Course of Study for the grade: reading, writing and language, math, and science, including questions that ask students to explain and use evidence." },
      { title: "When", body: "Students test online in the spring. ALSDE sets the testing window each year, and districts choose dates within it." },
      { title: "How results are described", body: "Scores are reported in four achievement levels, from Level 1 to Level 4. Levels 3 and 4 count as proficient. Your school shares a score report for your child." },
      { title: "The 3rd grade reading rule", body: "Under the Alabama Literacy Act, 3rd graders need to show grade-level reading to move on to 4th grade, most often through the ACAP reading score. There are other ways to show it, such as a reading portfolio or a summer reading camp, and some good-cause exemptions. Ask your school early if you have questions." },
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
        q: "What is ACAP?",
        a: "The Alabama Comprehensive Assessment Program is Alabama's set of state tests. ACAP Summative covers English language arts and math in grades 2 to 8 and science in grades 4, 6 and 8, and ACAP Alternate is for students with the most significant cognitive disabilities.",
      },
      {
        q: "Does my child have to pass a test to move on to 4th grade?",
        a: "Under the Alabama Literacy Act, 3rd graders need to show they can read at grade level, and the ACAP reading score is the usual way. Students who don't reach it can show it in other ways, such as a portfolio or a summer reading camp, and some are exempt for good cause. Your school will tell you early if your child needs extra reading help.",
      },
      {
        q: "Can my child skip the tests?",
        a: "State tests are required in Alabama, and the state doesn't offer an opt-out like some states do. If you have concerns, talk with your child's school about accommodations and what the results are used for.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the grades your district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, reading, science and social studies skills in the Alabama Course of Study with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Alabama is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 by ones and tens, and start adding and taking away within 10. Science looks at pushes and pulls, living things and weather, and social studies covers family, school and community, rules and community helpers.",
      lookFor: "Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, learn place value to 120 and tell time. Social studies looks at community and state: leaders and laws, jobs, and finding Alabama on a map.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to adding and subtracting within 1,000, money, time and equal parts of shapes. Science looks at matter, habitats and how land changes, and social studies looks at Alabama and the nation: government, symbols, the economy and people who made a difference. It is also the first year of the ACAP state tests in English language arts and math.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking. State test scores are separate from the report card.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and begin three years of Alabama history: Alabama's land and regions, the Indigenous peoples who have lived here for thousands of years, and European exploration. Under the Alabama Literacy Act, 3rd graders need to show grade-level reading to move on to 4th grade.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts, and fractions. Ask early if you have questions about reading support.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, fractions and decimals, and longer writing. Science covers energy, waves and Earth's changing surface, with the first ACAP science test. Social studies follows Alabama and the United States from the colonies through statehood in 1819, the Civil War and Reconstruction, to the late 1800s.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Alabama history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract, multiply and divide with decimals, add and subtract fractions with unlike denominators, and work with volume and the coordinate plane, and write longer pieces with evidence. Social studies brings Alabama and US history to the present: the world wars, the Great Depression, the Civil Rights Movement in Montgomery, Birmingham and Selma, and the space program in Huntsville.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Alabama districts. Math moves to ratios, rates, percents and integers, and science is Earth and space science, with an ACAP science test. Social studies is Making a New Nation: colonization, the American Revolution, the Constitution and the rights and responsibilities of citizens.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, probability and equations. Science is life science: cells, body systems, ecosystems and heredity. Social studies begins world history and geography, from early humans and the first river valley civilizations to ancient Greece and Rome.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations and functions, the Pythagorean theorem and transformations, and science is physical science, with an ACAP science test. Social studies continues world history from the Middle Ages to the Enlightenment.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: "9th grade is the first year of high school. Alabama's usual math course is Geometry with Data Analysis, with Algebra I with Probability for some students, and many students take Biology. Social studies finishes the world history sequence with the Age of Revolution to the present: industrialization, the world wars, the Cold War and globalization.",
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing evidence in science and English.",
    },
  },
};
