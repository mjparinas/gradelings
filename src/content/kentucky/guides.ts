import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Kentucky, in US English. The competencies page is the Standards for Mathematical Practice, the
// eight habits of mind printed in the Kentucky Academic Standards for Mathematics (adopted 2019, 704 KAR 8:040): making
// sense of problems, reasoning, arguing and critiquing, modeling, using tools, precision, structure and repeated
// reasoning. They are taught inside math lessons, not graded as a subject. The assessment page covers the Kentucky
// Summative Assessments (reading and math in grades 3 to 8 and 10, science in 4, 7 and 11, social studies in 5, 8 and
// 11) and the Read to Succeed Act's reading screening in kindergarten to 3rd grade. Dates change each year, so the page
// points to the Kentucky Department of Education. No French here, so no French guide. Record:
// docs/research/kentucky/README.md.

export const KENTUCKY_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Kentucky's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Kentucky's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Kentucky's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Kentucky's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, Kentucky's math standards include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
    items: [
      {
        id: "persevere",
        name: "1. Make sense of problems and keep trying",
        blurb: "Understanding what a problem asks and sticking with it when it's hard.",
        parts: [
          { name: "Understand first", blurb: "Reading the problem, picturing it and asking what it is really asking." },
          { name: "Plan", blurb: "Choosing a way to start and changing course if it isn't working." },
          { name: "Check", blurb: "Asking whether the answer makes sense." },
        ],
        atHome: [
          "Before solving a word problem, ask your child to tell you what it's about in their own words.",
          "When your child is stuck, ask “What could you try first?” instead of giving the answer.",
          "Praise sticking with a hard problem, not just getting it right.",
        ],
      },
      {
        id: "reason",
        name: "2. Reason with numbers and quantities",
        blurb: "Moving between a real situation and the numbers that describe it.",
        parts: [
          { name: "Numbers mean something", blurb: "Knowing what each number stands for: dollars, inches, people." },
          { name: "Back to the story", blurb: "Checking that an answer fits the real situation." },
        ],
        atHome: [
          "Ask what an answer means: “So 12 what? Twelve cookies or twelve dollars?”",
          "Estimate before you calculate, then compare.",
        ],
      },
      {
        id: "argue",
        name: "3. Explain thinking and listen to others",
        blurb: "Giving reasons for an answer and making sense of someone else's.",
        parts: [
          { name: "Explaining", blurb: "Saying why an answer is right, with words, drawings or examples." },
          { name: "Critiquing", blurb: "Listening to another way and finding what works or what's wrong." },
        ],
        atHome: [
          "Ask “How do you know?” often, even when the answer is right.",
          "Solve a problem two different ways and talk about which you like and why.",
        ],
      },
      {
        id: "model",
        name: "4. Use math in everyday life",
        blurb: "Using math to describe and solve real problems.",
        parts: [
          { name: "Real problems", blurb: "Turning a situation into an equation, a drawing, a table or a graph." },
          { name: "Good enough", blurb: "Making sensible assumptions and improving the model if needed." },
        ],
        atHome: [
          "Plan a trip, a recipe or a budget together and let your child do the math.",
          "Look at a graph in the news or a sports page and talk about what it shows.",
        ],
      },
      {
        id: "tools",
        name: "5. Choose the right tools",
        blurb: "Knowing when a ruler, a drawing, a calculator or mental math is the best choice.",
        parts: [
          { name: "Tools", blurb: "Using rulers, number lines, blocks, graph paper or technology." },
          { name: "Choosing", blurb: "Picking a tool that fits the job and knowing its limits." },
        ],
        atHome: [
          "Measure things around the house with a ruler or measuring cups.",
          "Ask whether a calculator is needed or whether mental math is quicker.",
        ],
      },
      {
        id: "precision",
        name: "6. Be precise",
        blurb: "Using clear words, correct units and careful calculations.",
        parts: [
          { name: "Clear words", blurb: "Using math words correctly, like equal, factor and perimeter." },
          { name: "Units and labels", blurb: "Saying what is being measured, and checking calculations." },
        ],
        atHome: [
          "Ask your child to include the units: 5 feet, 3 hours, $2.50.",
          "When cooking, measure carefully and talk about what happens if you don't.",
        ],
      },
      {
        id: "structure",
        name: "7. Look for structure",
        blurb: "Noticing how numbers and shapes are built and using that to solve problems.",
        parts: [
          { name: "Patterns in numbers", blurb: "Seeing that 8 × 7 is 8 × 5 plus 8 × 2, or that 99 is one less than 100." },
          { name: "Breaking apart", blurb: "Splitting shapes and numbers into easier pieces." },
        ],
        atHome: [
          "Ask for shortcuts: “Is there a quicker way to add 98 + 47?”",
          "Find shapes inside other shapes on signs, tiles and quilts.",
        ],
      },
      {
        id: "regularity",
        name: "8. Spot repeated reasoning",
        blurb: "Noticing when a calculation repeats and finding a general rule.",
        parts: [
          { name: "Repeats", blurb: "Seeing the same steps come up again and again." },
          { name: "Rules", blurb: "Turning a repeated pattern into a shortcut or formula." },
        ],
        atHome: [
          "Count by 5s, 10s or 25s and ask what pattern you notice.",
          "Build a growing pattern with coins or blocks and ask what the 10th step would be.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Mathematical Practices graded?",
        a: "No, not as a subject of their own. Teachers build them into math lessons, and some report cards comment on problem solving or explaining thinking, but they are not graded separately.",
      },
      {
        q: "Are they the same in every grade?",
        a: "Yes. The same eight practices appear in every grade of Kentucky's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the Kentucky Academic Standards for Mathematics, adopted in 2019. The standards print them before each grade's content standards and show how they connect to the math in that grade.",
      },
      {
        q: `Does ${APP_NAME} measure the Mathematical Practices?`,
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
    source: "the Kentucky Department of Education",
    hubBlurb: "The Kentucky Summative Assessments: reading and math in grades 3 to 8 and 10, science in grades 4, 7 and 11, and social studies in grades 5, 8 and 11.",
    name: "Kentucky's state tests (KSA)",
    intro:
      "Kentucky students take the Kentucky Summative Assessments (KSA) near the end of each school year: reading and math in grades 3 to 8 and 10, science in grades 4, 7 and 11, and social studies in grades 5, 8 and 11. Younger children have their reading checked with a screener in kindergarten to 3rd grade. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "Reading and math: grades 3 to 8 and grade 10. Science: grades 4, 7 and 11. Social studies: grades 5, 8 and 11. Students with the most significant cognitive disabilities may take the Kentucky Alternate Assessment instead." },
      { title: "When", body: "The tests are given in the last weeks of the school year, in a window that follows each district's calendar. Most students test online. Ask your school for this year's dates." },
      { title: "Reading checks in the early grades", body: "Under Kentucky's Read to Succeed Act (2022), schools screen every child's reading in kindergarten to 3rd grade. A child who needs help gets a reading improvement plan with extra support, and the school tells the family. No child is held back because of one test." },
      { title: "What they cover", body: "The tests check the Kentucky Academic Standards in reading, math, science and social studies. Some grades also have writing and editing tests; ask your school which ones it gives this year." },
      { title: "How results are described", body: "Scores are reported in four performance levels: Novice, Apprentice, Proficient and Distinguished. Families get an individual score report from the school." },
      { title: "Report card link", body: "State test scores are reported separately from your child's report card. They are one picture of the year; your child's teacher sees much more." },
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
        q: "What is KSA?",
        a: "KSA is the Kentucky Summative Assessments, the state's yearly tests in reading and math (grades 3 to 8 and 10), science (grades 4, 7 and 11) and social studies (grades 5, 8 and 11).",
      },
      {
        q: "Will my child be held back because of the reading test?",
        a: "Not because of a test alone. Kentucky's Read to Succeed Act focuses on finding children who need help early, from kindergarten to 3rd grade, and giving them a reading improvement plan. Talk with your child's teacher early in the year about reading progress.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No, they are reported separately in an individual score report. Ask your school how it shares results and what they mean for your child.",
      },
      {
        q: "Is there a state test before 3rd grade?",
        a: "No KSA test, but schools screen reading in kindergarten to 3rd grade, and many give their own checks in math and reading during the year.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, reading and writing, science and social studies skills in the Kentucky Academic Standards with kind feedback and no timers unless you want them. It isn't a copy of KSA and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Kentucky is public preschool, free in every school district for 4-year-olds from families at or below 160% of the federal poverty level and for 3- and 4-year-olds with disabilities, and offered in Head Start and child care centers too. Programs follow the Kentucky Early Childhood Standards: approaches to learning, the arts, health and wellness, language and early literacy, math, physical education, science, social studies and technology.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Kentucky is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Science looks at pushes and pulls, weather and what plants and animals need, and social studies, called “Myself and My Community”, is about rules, community leaders and the symbols of Kentucky and the United States. Teachers check each child's early reading with a screener.",
      lookFor: "Many Kentucky districts use standards-based report cards in the early grades. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Science covers light and sound, how plants and animals grow and survive, and patterns of the sun, moon and stars, and social studies looks at Kentucky: its government, leaders, symbols, regions and what it produces.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science covers materials, habitats and how land and water change, and social studies looks at North America: its land and peoples, Kentucky's resources and how Kentucky's laws change over time.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study forces and magnets, life cycles and weather in science. Social studies looks at communities around the world: continents and oceans, cultures, trade and how Kentucky connects with other places. It is also the first year of the Kentucky Summative Assessments in reading and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are reported separately from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers energy and waves, how plant and animal structures work, and rocks and erosion, with the first KSA science test. Social studies is “Migration and Settlement”: explorers, Colonial America and colonial Kentucky, how the colonies governed themselves, and how markets work.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research skills.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science covers matter, ecosystems and Earth's systems, the sun and the stars. Social studies is “Colonization to Constitution”: the road to the American Revolution, the Constitution, the three branches of government, and the rights and responsibilities of a Kentucky citizen, with the first KSA social studies test.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Kentucky districts. Math moves to ratios, rates, negative numbers and expressions. Science covers particles and heat, ecosystems and photosynthesis, and weather, climate, Earth's surface and space, and social studies is the development of civilizations: the river valleys of Mesopotamia, Egypt, India and China, and the classical empires of Greece and Rome.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers forces, motion, energy and waves, chemical reactions, and cells and body systems, with a KSA science test. Social studies is the growth and expansion of civilizations from 600 to 1600 across Africa, Asia, Europe and the Americas: empires, trade and exploration.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers heredity, natural selection, Earth's history and how people affect Earth's resources, and social studies is the United States from 1600 to 1877, from the colonies through the Revolution, the early republic, westward expansion, the Civil War and Reconstruction, with Kentucky's place in it.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} is Algebra I, and English classes read and write more closely. Science covers biology, chemistry and physics topics, and social studies in ${APP_NAME} is civics and government, including how Kentucky governs itself, plus economics and personal finance. Kentucky students must pass a civics test and complete a financial literacy course before they graduate.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
