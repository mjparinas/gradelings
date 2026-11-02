import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Nebraska, in US English. The competencies page is the five Nebraska Mathematical Processes, the
// habits of mind printed at the front of Nebraska's College and Career Ready Standards for Mathematics (approved
// September 2, 2022): problem solving, reasoning, representations, connections and communication. They are taught
// inside math lessons, not graded as a subject of their own. The assessment page covers the Nebraska Student-Centered
// Assessment System (NSCAS General: English language arts and math in grades 3 to 8, science in grades 5 and 8; the
// ACT in grade 11), from the Nebraska Department of Education's 2025-26 Summative Assessment Administration and
// Reporting Plan, and the reading checks of the Nebraska Reading Improvement Act (79-2603 to 79-2606); dates change
// each year, so the page points to the department. No French here, so no French guide. Record:
// gradelings-research/nebraska/README.md.

export const NEBRASKA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-processes",
    label: "Mathematical Processes",
    hubBlurb: "The five Nebraska Mathematical Processes, the habits of a good problem solver, in plain words.",
    description:
      "What Nebraska's five Mathematical Processes mean (problem solving, reasoning, representations, connections and communication), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "The Nebraska Mathematical Processes apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Nebraska's Mathematical Processes, explained for parents",
    intro:
      "Alongside the content standards for each grade, Nebraska's math standards include five Mathematical Processes. They describe how students should think and work when they do math: making sense of a problem, sticking with it, showing it in different ways, connecting ideas and explaining their thinking. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
    items: [
      {
        id: "problem-solving",
        name: "1. Problem solving",
        blurb: "Making sense of a problem and sticking with it when it's hard.",
        parts: [
          { name: "Understand first", blurb: "Reading the problem, picturing it and finding a way in." },
          { name: "Plan and try again", blurb: "Choosing a strategy, such as mental math, estimating or a drawing, and trying another plan if it doesn't work." },
          { name: "Check", blurb: "Asking whether the answer makes sense." },
        ],
        atHome: [
          "Before solving a word problem, ask your child to tell you what it's about in their own words.",
          "When your child is stuck, ask “What could you try first?” instead of giving the answer.",
          "Praise sticking with a hard problem, not just getting it right.",
        ],
      },
      {
        id: "reasoning",
        name: "2. Reasoning",
        blurb: "Thinking about what numbers mean, and making sense of other people's thinking.",
        parts: [
          { name: "Numbers mean something", blurb: "Knowing what each number stands for: dollars, inches, people." },
          { name: "Back to the story", blurb: "Checking that an answer fits the real situation." },
          { name: "Other ways", blurb: "Comparing approaches and spotting which one works, or where one goes wrong." },
        ],
        atHome: [
          "Ask what an answer means: “So 12 what? Twelve cookies or twelve dollars?”",
          "Estimate before you calculate, then compare.",
          "Solve a problem two different ways and talk about which you like and why.",
        ],
      },
      {
        id: "representations",
        name: "3. Representations",
        blurb: "Showing a math idea with objects, drawings, symbols, tables or words.",
        parts: [
          { name: "Many ways to show it", blurb: "Using blocks, pictures, number lines, equations, tables and graphs." },
          { name: "Choosing one", blurb: "Picking the way that shows the idea most clearly." },
        ],
        atHome: [
          "Ask your child to draw a picture of a word problem before solving it.",
          "Show the same number different ways: coins, tally marks, a number line.",
        ],
      },
      {
        id: "connections",
        name: "4. Connections",
        blurb: "Linking math ideas to each other and to real life.",
        parts: [
          { name: "Real problems", blurb: "Using math to model a situation from everyday life, then asking whether the result makes sense." },
          { name: "Linking ideas", blurb: "Seeing how multiplication connects to area, or fractions to division." },
        ],
        atHome: [
          "Plan a trip, a recipe or a budget together and let your child do the math.",
          "Look at a graph in the news or a sports page and talk about what it shows.",
        ],
      },
      {
        id: "communication",
        name: "5. Communication",
        blurb: "Explaining and justifying an answer with clear, precise math words.",
        parts: [
          { name: "Explaining", blurb: "Saying why an answer is right, out loud or in writing." },
          { name: "Precise words", blurb: "Using math words correctly, like equal, factor and perimeter, and naming the units." },
          { name: "Good questions", blurb: "Asking questions that clear up or deepen understanding." },
        ],
        atHome: [
          "Ask “How do you know?” often, even when the answer is right.",
          "Ask your child to include the units: 5 feet, 3 hours, $2.50.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Mathematical Processes graded?",
        a: "No, not as a subject of their own. Teachers build them into math lessons, and some report cards comment on problem solving or explaining thinking, but they are not graded separately.",
      },
      {
        q: "Are they the same in every grade?",
        a: "Yes. The same five processes apply in every grade of Nebraska's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of Nebraska's College and Career Ready Standards for Mathematics, which the Nebraska State Board of Education approved on September 2, 2022. The standards document lists them before the grade-by-grade standards.",
      },
      {
        q: `Does ${APP_NAME} measure the Mathematical Processes?`,
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
    source: "the Nebraska Department of Education",
    hubBlurb: "The Nebraska Student-Centered Assessment System (NSCAS) in English language arts and math (grades 3 to 8) and science (grades 5 and 8).",
    name: "Nebraska state tests (NSCAS)",
    intro:
      "Nebraska students take state tests each spring through the Nebraska Student-Centered Assessment System, called NSCAS. The tests cover English language arts and math in grades 3 to 8 and science in grades 5 and 8, and 11th graders take the ACT. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "NSCAS General English language arts and math: grades 3 to 8. NSCAS General science: grades 5 and 8. In 11th grade, students take the ACT in English, math and science. Students with the most significant cognitive disabilities may take the NSCAS Alternate tests instead, and English learners also take the ELPA21 English language test." },
      { title: "When", body: "In spring, in a window the Nebraska Department of Education sets each year (for 2025-26, from March 23 to May 1, 2026). Each school sets its own days within it." },
      { title: "The early grades", body: "There is no NSCAS test before 3rd grade. Under the Nebraska Reading Improvement Act, schools check every child's reading three times a year from kindergarten to 3rd grade, and a child who needs it gets a reading improvement plan with extra help. These checks aren't graded." },
      { title: "Social studies", body: "There is no state social studies test. Schools teach and assess Nebraska's social studies standards in their own classes." },
      { title: "How results are described", body: "Each result is one of three achievement levels: Developing (not yet showing the grade's expectations), On Track (showing them) and Advanced (showing them at a high level). Families get an individual student report, and school results are published on the Nebraska Education Profile website in the fall." },
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
        q: "What is NSCAS?",
        a: "The Nebraska Student-Centered Assessment System is Nebraska's set of state tests in English language arts, math and science. They are given in the spring and check Nebraska's College and Career Ready Standards for each grade.",
      },
      {
        q: "What do the three achievement levels mean?",
        a: "Developing means a student does not yet show the knowledge and skills the grade expects and may need extra support. On Track means they show them and are likely ready for the next grade. Advanced means they show them at a high level. On Track and Advanced both mean a student has met the grade's expectations.",
      },
      {
        q: "Why do the tests sometimes change?",
        a: "The tests follow the standards. When the State Board updates a subject's standards, the test changes to match a year or two later: the updated science standards are first tested in spring 2026.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in Nebraska's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Nebraska is the year before kindergarten, for children who are 4. Public preschool programs follow Nebraska's Early Learning Guidelines: Birth to Five, which cover language and literacy, math, science, social and emotional growth and physical health. Children learn through play, stories and songs.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for counting small groups, naming letters, hearing rhymes, taking turns and talking about feelings.",
    },
    k: {
      overview: "Kindergarten in Nebraska is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Social studies, called Myself and Others, is about themselves and their families, rules and good citizens, maps of the classroom, the weather and seasons, and the American flag and Nebraska's symbols. Schools check reading three times a year.",
      lookFor: "Many Nebraska districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies is about families: family life long ago and today, traditions, maps and directions, continents and oceans, community leaders and helpers, and saving for later.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies is about the neighborhood: symbols and holidays, people who made a difference, how families traveled and moved, and goods, services and work.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and spend social studies on communities near and far: maps and globes, cultures, local government, and the people who moved to Nebraska and why. It is also the first year of NSCAS tests in English language arts and math, and the last year of the state's early reading checks.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, measuring angles, and longer writing. Social studies is Nebraska Studies: the Sandhills, the Panhandle and the Platte River, the Pawnee, Omaha, Ponca and other Native nations and Standing Bear's case, the trails and the Homestead Act, statehood in 1867, how Nebraska grew, Nebraskans who stood up for fairness, and the one-house Unicameral.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Nebraska topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is U.S. Studies from the first peoples and European exploration to the colonies, the Revolution and the Constitution, and students take the NSCAS science test as well as English language arts and math.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Nebraska districts. Math moves to ratios, rates, negative numbers and expressions. Science covers energy, cells and weather, and social studies is World Studies I, the ancient world: the first farmers, river valley civilizations, Greece, Rome, India and China, world beliefs and trade.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources. Social studies is World Studies II, region by region: the Byzantine Empire, the spread of Islam, imperial China, medieval Japan, the kingdoms of West Africa, medieval Europe, the Aztec and Inca, and how the world's governments and economies work today.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions, angles and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is U.S. history from the Constitution to the Gilded Age, including Nebraska's part in it: the trails along the Platte, the Kansas–Nebraska Act, statehood in 1867, the railroad from Omaha, Standing Bear's case and the Populists' Omaha Platform. Students take the NSCAS science test as well as English language arts and math.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} covers the high school civics and economics standards, including how Nebraska governs itself with its one-house, nonpartisan Unicameral, plus personal finance and economics.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
