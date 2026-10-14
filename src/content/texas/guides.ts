import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Texas, in US English. Texas has no statewide social and emotional learning standards, so the
// competencies page explains the process standards the TEKS place at the start of every grade: the mathematical process
// standards, the scientific and engineering practices, the English language arts strands of inquiry and research and
// of response, and the social studies skills (docs/research/texas/README.md). The assessment page covers STAAR:
// reading language arts and math in grades 3 to 8, science in grades 5 and 8, social studies in grade 8, and the
// end-of-course tests. House Bill 8 (2025) replaces the grades 3 to 8 tests with three shorter tests a year from
// 2027–28, so the page points to TEA for the current plan. Texas has no French subject, so no French guide. Grade notes
// follow the TEKS.

export const TEXAS_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "process-skills",
    label: "Process skills",
    hubBlurb: "The thinking skills the TEKS build in every grade: solving problems, investigating, researching and explaining.",
    description:
      "What the process standards in the Texas Essential Knowledge and Skills (TEKS) mean for parents: problem solving in math, scientific and engineering practices, inquiry and response in reading, and social studies skills, with simple ways to support them at home.",
    gradeLine: "The TEKS process skills apply in every grade.",
    closing: "these thinking skills grow every time your child explains, tests an idea or asks a good question.",
    title: "The TEKS process skills, explained for parents",
    intro:
      "The Texas Essential Knowledge and Skills (TEKS) list what students learn in each grade and subject. In every grade, each subject also starts with process standards: the ways students are expected to think and work, such as solving problems step by step, planning an investigation, asking questions about a text or reading a map and a graph. They aren't a separate subject. Teachers build them into everyday lessons, and they show up on state tests too.",
    items: [
      {
        id: "math-processes",
        name: "Mathematical process standards",
        blurb: "Using math in everyday life, solving problems with a plan and explaining the reasoning.",
        parts: [
          { name: "Problem solving", blurb: "Understanding the problem, making a plan, solving it and checking that the answer makes sense." },
          { name: "Tools and techniques", blurb: "Choosing tools like objects, drawings or technology, and techniques like mental math and estimation." },
          { name: "Communicating", blurb: "Showing and explaining ideas with symbols, diagrams, graphs and precise words." },
        ],
        atHome: [
          "Ask “How do you know?” after an answer, even when it's right.",
          "Estimate first (the grocery total, the drive time), then check.",
          "Let your child solve a real problem, like doubling a recipe, and explain each step.",
        ],
      },
      {
        id: "science-practices",
        name: "Scientific and engineering practices",
        blurb: "Asking questions, planning safe investigations, collecting data and building solutions.",
        parts: [
          { name: "Investigating", blurb: "Asking questions, making a plan and carrying out a fair, safe investigation." },
          { name: "Analyzing data", blurb: "Recording observations and measurements, and finding patterns in charts and graphs." },
          { name: "Explaining", blurb: "Using evidence to explain what happened and sharing results with others." },
        ],
        atHome: [
          "Wonder out loud together: “Why do you think that happened? How could we test it?”",
          "Keep a simple weather or plant-growth log for a week and look for patterns.",
          "Build something from recycled materials, then talk about how to improve it.",
        ],
      },
      {
        id: "reading-inquiry",
        name: "Inquiry, response and research in reading",
        blurb: "Asking questions about texts, responding with evidence and researching a topic.",
        parts: [
          { name: "Asking questions", blurb: "Generating questions before, during and after reading to deepen understanding." },
          { name: "Responding", blurb: "Talking and writing about texts, using evidence from the text to support ideas." },
          { name: "Researching", blurb: "Gathering information from several sources and sharing what was learned." },
        ],
        atHome: [
          "After reading together, ask what your child wondered and what surprised them.",
          "Ask “What in the book makes you think that?” to practice using evidence.",
          "Pick a question your child is curious about and look it up together in two different sources.",
        ],
      },
      {
        id: "social-studies-skills",
        name: "Social studies skills",
        blurb: "Reading maps, charts and sources, and telling fact from opinion.",
        parts: [
          { name: "Sources", blurb: "Gathering information from primary and secondary sources, such as letters, photos and books." },
          { name: "Maps and data", blurb: "Reading and making maps, timelines, charts and graphs." },
          { name: "Thinking critically", blurb: "Telling fact from opinion, finding cause and effect and comparing points of view." },
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
        q: "Are the process skills graded?",
        a: "They're part of the TEKS, so teachers teach them and state tests include them, but they're usually graded inside each subject rather than on their own line. How they appear on a report card depends on your district.",
      },
      {
        q: "Why are they at the start of each grade's standards?",
        a: "TEA places them first on purpose: they connect the content of every grade. A child doesn't only learn fractions or the water cycle, but also how to solve problems and investigate questions with them.",
      },
      {
        q: "Does Texas have social and emotional learning standards?",
        a: "Texas doesn't have statewide social and emotional learning standards for kindergarten to grade 9 like some states do. Many districts choose their own programs, so ask your child's school what it uses.",
      },
      {
        q: `Does ${APP_NAME} practice these skills?`,
        a: `Partly. ${APP_NAME} practices subject skills in math, reading and writing, science and social studies, and many questions ask children to read data, put events in order or reason through a problem. Investigating, researching and discussing grow best in class and at home, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more?",
        a: "Ask your child's teacher how the process skills show up in class. TEA publishes the full TEKS for every grade and subject.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Texas Education Agency (TEA)",
    hubBlurb: "STAAR reading and math (grades 3 to 8), science (grades 5 and 8) and social studies (grade 8), and what's changing.",
    name: "Texas state tests (STAAR)",
    intro:
      "Texas students take the State of Texas Assessments of Academic Readiness (STAAR): reading language arts and math in grades 3 to 8, science in grades 5 and 8, social studies in grade 8, and end-of-course tests in high school. The tests are separate from the report card. Texas passed a law in 2025 to replace the grades 3 to 8 tests with three shorter tests during the year, starting in the 2027–28 school year.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "Reading language arts and math: grades 3 to 8. Science: grades 5 and 8. Social studies: grade 8. In high school, end-of-course tests in Algebra I, English I, English II, Biology and US History. Students with the most significant cognitive disabilities may take STAAR Alternate 2." },
      { title: "What they cover", body: "STAAR checks the Texas Essential Knowledge and Skills (TEKS) for the grade or course. Reading tests include short written answers and an essay, and math tests include real-world problems." },
      { title: "When", body: "Students test online, mostly in the spring. TEA sets the testing windows each year, and districts choose dates within them." },
      { title: "How results are described", body: "Scores are reported in four levels: Masters Grade Level, Meets Grade Level, Approaches Grade Level and Did Not Meet Grade Level. Families can see results online through the Texas Assessment family portal." },
      { title: "What's changing", body: "House Bill 8 (2025) replaces STAAR in grades 3 to 8 with three shorter tests a year, at the beginning, middle and end of the year, from 2027–28. Check TEA's website or ask your school for the current plan." },
      { title: "Report card link", body: "State test scores don't change your child's report card grades, though a high school end-of-course test can count toward graduation. They are one more snapshot for families, teachers and schools." },
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
        q: "What is STAAR?",
        a: "The State of Texas Assessments of Academic Readiness is Texas's set of state tests. It includes reading language arts and math in grades 3 to 8, science in grades 5 and 8, social studies in grade 8, and end-of-course tests in high school.",
      },
      {
        q: "Is STAAR going away?",
        a: "In grades 3 to 8 it's being replaced. House Bill 8, signed in 2025, moves Texas to three shorter tests during the year (beginning, middle and end) starting in the 2027–28 school year. Details are still being worked out, so check TEA's website or ask your school.",
      },
      {
        q: "Can my child skip the tests?",
        a: "State tests are required in Texas, and the state doesn't offer an opt-out like some states do. If you have concerns, talk with your child's school about accommodations and what the results are used for.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the grades your district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, reading, science and social studies skills in the TEKS with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Texas is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to at least 20, and start adding and taking away. Science looks at the five senses, weather and living things, and social studies covers rules, jobs, and the flags and symbols of the United States and Texas.",
      lookFor: "Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, learn place value to 120 and count coins. Social studies looks at families, maps, and Texas and US symbols and celebrations.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,200, adding and subtracting within 1,000, money, time and fractions. Science looks at matter, forces, weather and life cycles, and social studies looks at communities, maps and people who made a difference in Texas and the nation.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study how communities change and how people govern them. It is also the first year of the STAAR state tests in reading and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, fractions and decimals, and longer writing. Social studies is Texas history: the American Indian groups of Texas, Spanish missions, the Texas Revolution, the Republic of Texas, statehood, and Texas's regions, economy and government.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Texas history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract, multiply and divide with decimals, add and subtract fractions with unlike denominators, and work with volume and the coordinate plane, and write longer pieces with evidence. Social studies is United States history, from the first European settlements to the present, and students take the STAAR science test.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Texas districts. Math moves to ratios, rates, percents and integers. Science covers matter, energy, Earth and living things together, and social studies is contemporary world cultures: the regions, peoples, governments and economies of the world today.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, probability and equations. Science continues across matter, forces, Earth and living things, and social studies is Texas history again, in more depth, from early American Indian cultures to modern Texas, with its geography, economy and government.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear relationships, scientific notation and the Pythagorean theorem. Social studies is United States history from the colonies through Reconstruction, and students take STAAR in reading, math, science and social studies.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school, and many students take Algebra I, English I and Biology, each with an end-of-course test. Texas schools usually teach United States Government in 12th grade, so ${APP_NAME} gives 9th graders a head start on it: the Constitution, rights, the three branches, elections, Texas's government and how citizens take part.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing evidence in science and English.",
    },
  },
};
