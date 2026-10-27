import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for North Dakota, in US English. The competencies page is the three Math Attributes printed at the
// front of North Dakota's 2023 mathematics standards (problem-solving, connections, and reasoning and proof, which sum
// up the eight mathematical practices of the earlier standards), written for each grade span. They are taught inside
// math lessons, not graded as a subject of their own. The assessment page covers the ND A+ Summative (English language
// arts and math in grades 3 to 8 and 10, science in grades 4, 8 and 10) and the ACT or WorkKeys that 11th graders may
// take (NDCC 15.1-21-19), from the Department of Public Instruction's assessment pages; dates and score scales change,
// so the page points to the Department. No French here, so no French guide. Record: docs/research/north-dakota/README.md.

export const NORTH_DAKOTA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-attributes",
    label: "Math Attributes",
    hubBlurb: "The three Math Attributes in North Dakota's math standards (problem-solving, connections, and reasoning and proof) in plain words.",
    description:
      "What North Dakota's three Math Attributes mean (problem-solving, making connections, and reasoning and proof), how they grow from kindergarten to high school, and simple ways to support them at home.",
    gradeLine: "North Dakota's Math Attributes apply in every grade, written for kindergarten to 2nd grade, 3rd to 5th, 6th to 8th and high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "North Dakota's Math Attributes, explained for parents",
    intro:
      "Alongside the content standards for each grade, North Dakota's 2023 mathematics standards name three Math Attributes: problem-solving, connections, and reasoning and proof. They describe how students think and work when they do math, and they sum up the mathematical practices of the state's earlier standards. Each attribute is written for a span of grades, so it grows as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
    items: [
      {
        id: "problem-solving",
        name: "1. Problem-solving",
        blurb: "Finding a way into a problem, carrying out a plan and checking that the answer makes sense.",
        parts: [
          { name: "Kindergarten to 2nd grade", blurb: "Using a strategy, like drawing or counting on, to solve a problem and find a fitting answer." },
          { name: "3rd to 5th grade", blurb: "Making a plan, asking whether the answer is reasonable and trying another way with some help." },
          { name: "6th grade and up", blurb: "Sorting the information, making a flexible plan, judging the solution and revising it when needed." },
        ],
        atHome: [
          "Before solving a word problem, ask your child to tell you what it's about in their own words.",
          "When your child is stuck, ask “What could you try first?” instead of giving the answer.",
          "After an answer, ask “Does that make sense?” and estimate together.",
        ],
      },
      {
        id: "connections",
        name: "2. Connections",
        blurb: "Seeing how ideas in math fit together and connect to other learning and everyday life.",
        parts: [
          { name: "Kindergarten to 2nd grade", blurb: "Showing how numbers relate with words, pictures or symbols." },
          { name: "3rd to 5th grade", blurb: "Linking related ideas, like multiplication and area, and summing them up with evidence." },
          { name: "6th grade and up", blurb: "Connecting ideas within and across topics and giving examples from other subjects and life." },
        ],
        atHome: [
          "Point out math in daily life: fractions in a recipe, percents in a sale, distance and time on a trip.",
          "Ask how a new idea is like one your child already knows.",
          "Let your child show a problem with a drawing, objects or a chart, then talk about it.",
        ],
      },
      {
        id: "reasoning",
        name: "3. Reasoning and proof",
        blurb: "Explaining why an answer is right, with evidence, and judging other people's reasoning.",
        parts: [
          { name: "Kindergarten to 2nd grade", blurb: "Using what they already know to explain their thinking." },
          { name: "3rd to 5th grade", blurb: "Reasoning step by step and giving evidence for an answer." },
          { name: "6th grade and up", blurb: "Explaining and critiquing conclusions, and showing why a rule always works." },
        ],
        atHome: [
          "Ask “How do you know?” and listen to the whole explanation.",
          "Share a wrong answer on purpose and ask your child to find the mistake.",
          "Praise a clear explanation as much as a right answer.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Math Attributes graded?",
        a: "No, not as a subject of their own. Teachers build them into math lessons, and some report cards comment on problem solving or explaining thinking, but they are not graded separately.",
      },
      {
        q: "Are they the same in every grade?",
        a: "The same three attributes run through every grade, but each is written for a span of grades (kindergarten to 2nd grade, 3rd to 5th, 6th to 8th and high school), so what children are asked to do grows as they do.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of North Dakota's 2023 mathematics standards, which list them before the grade-by-grade content standards. They sum up the eight mathematical practices in the state's earlier math standards.",
      },
      {
        q: `Does ${APP_NAME} measure the Math Attributes?`,
        a: `No. ${APP_NAME} practices the math content standards. Hints, a second try and worked examples help children make sense of problems and keep going, but these habits grow best when you talk about math together.`,
      },
      {
        q: "How can I learn more about how my child's school uses them?",
        a: "Ask your child's teacher how the class talks about problem solving, and what kinds of explanations they hope to hear from students.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the North Dakota Department of Public Instruction",
    hubBlurb: "The ND A+ Summative in English language arts and math (grades 3 to 8 and 10) and science (grades 4, 8 and 10).",
    name: "North Dakota state tests (the ND A+ Summative)",
    intro:
      "North Dakota students take state tests each spring. The ND A+ Summative covers English language arts and math in grades 3 to 8 and 10, and science in grades 4, 8 and 10. In 11th grade, students may take the ACT or WorkKeys. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 8 and 10. Science: grades 4, 8 and 10. Students with the most significant cognitive disabilities may take an alternate assessment instead, and English learners also take an English language test." },
      { title: "When", body: "In spring, in a window the North Dakota Department of Public Instruction sets each year. Each school sets its own days within it. The tests are taken on a computer." },
      { title: "The early grades", body: "In kindergarten to 2nd grade there are no state tests, but schools check early reading and math during the year to plan extra help. These checks aren't graded." },
      { title: "What they cover", body: "The tests check North Dakota's own standards: the 2023 English language arts and math standards, and the 2019 science standards. The 2025 tests were the first to match the 2023 standards, so their results can't be compared directly with earlier years." },
      { title: "How results are described", body: "Each student gets a scale score and a performance level that shows how close the score is to the grade's standards, with proficient meaning the standards were met. Score reports explain the levels for each subject." },
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
        q: "What is the ND A+ Summative?",
        a: "It is North Dakota's state test in English language arts and math for grades 3 to 8 and 10, and in science for grades 4, 8 and 10. It is given in the spring on a computer and checks the grade's North Dakota standards.",
      },
      {
        q: "What does proficient mean?",
        a: "A proficient score means the student met the grade's standards on the test. Scores below proficient mean the student is still working toward them, and the score report shows which areas to focus on.",
      },
      {
        q: "What happens in high school?",
        a: "10th graders take the ND A+ Summative in English language arts, math and science, and 11th graders may take the ACT or WorkKeys. To graduate, students also pass a civics test drawn from the United States citizenship test.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school or district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, language arts, science and social studies skills in North Dakota's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in North Dakota is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about families, rules and community helpers, needs and wants, and symbols such as the American flag and North Dakota's own flag with its eagle.",
      lookFor: "Many North Dakota districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies is about school and community: maps, the land and how people change it, community helpers, earning and saving, and how school and family life in North Dakota have changed since long ago.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, prairie and wetland habitats, and how land changes, and social studies looks at communities: maps and globes, North Dakota's cities, small towns, farms and reservations, producers and consumers, and people who made a difference.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and spend social studies on the regions of the United States, starting with our own Midwest, along with how cities, states and the nation are governed. It is also the first year of state tests in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is North Dakota studies, which state law requires: the Red River Valley, the Drift Prairie and the Missouri Plateau, the tribal nations of North Dakota and the North Dakota Native American Essential Understandings, explorers and the fur trade, homesteaders and railroads, statehood in 1889, state government, and farming and energy. Students take the state science test as well as English language arts and math.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on North Dakota topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is United States history from the first explorers to the new nation: the geography of the United States, explorers including those who reached the northern plains, the thirteen colonies, the Revolution and the Constitution.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many North Dakota districts. Math moves to ratios, rates, negative numbers and expressions. Science covers weather, climate, cells and growth, and social studies is world history from early humans to the Renaissance: the first farmers, river valley civilizations, Greece, Rome, India and China, world beliefs, medieval Europe, the Islamic world and trade.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies is world geography: maps and geographic tools, the regions of Latin America, Europe, Africa and Asia, where people live and why they move, and how economies and trade connect the world. Students can start the civics test for graduation this year.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space. Social studies is North Dakota studies again, as state law requires (the land, the tribal nations and federal policy, government and the Nonpartisan League, the economy from furs to oil, and the state's growth from homesteads to today), along with United States history from the Revolution to Reconstruction. Students take the state tests in all three tested subjects.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra and functions, and English classes read and write more closely. Social studies in ${APP_NAME} covers high school government: the foundations of government and the Constitution, rights and the courts, how federal, state, tribal and local governments share power in North Dakota, elections and the media, supply and demand, and personal finance. North Dakota students pass a civics test before they graduate.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
