import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for South Dakota, in US English. The competencies page is the Standards for Mathematical Practice,
// the eight habits of mind printed at the front of the South Dakota State Standards for Mathematics (adopted 2018, built
// on the Common Core): making sense of problems, reasoning, arguing and critiquing, modeling, using tools, precision,
// structure and repeated reasoning. They are taught inside math lessons, not graded as a subject of their own. The
// assessment page covers the South Dakota ELA and Math Assessments (grades 3 to 8), the South Dakota Science Assessment
// (grades 5 and 8) and the SD-ACT (grade 11), from the Department of Education's 2026-27 assessment milestones and a
// sample student report (both in gradelings-research/south-dakota/source); dates change each year, so the page points to the
// department. No French here, so no French guide. Record: gradelings-research/south-dakota/README.md.

export const SOUTH_DAKOTA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in South Dakota's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What South Dakota's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "South Dakota's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "South Dakota's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, South Dakota's mathematics standards include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices apply in every grade of South Dakota's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the South Dakota State Standards for Mathematics, adopted in 2018 and built on the Common Core. The standards document describes them first, before the grade-by-grade content standards.",
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
    source: "the South Dakota Department of Education",
    hubBlurb: "The South Dakota ELA and Math Assessments (grades 3 to 8), the science test (grades 5 and 8) and the SD-ACT in 11th grade.",
    name: "South Dakota state tests (SD ELA, Math, Science and SD-ACT)",
    intro:
      "South Dakota students take state tests each spring. The South Dakota ELA and Math Assessments cover English language arts and math in grades 3 to 8, and the South Dakota Science Assessment is given in grades 5 and 8. In 11th grade, students take the SD-ACT. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "SD ELA and SD Math: grades 3 to 8, in two sessions each. SD Science: grades 5 and 8, in one session. SD-ACT (English, math, reading, science and writing): grade 11. Students with the most significant cognitive disabilities may take an alternate assessment instead, and English learners also take the ACCESS English language test." },
      { title: "When", body: "In spring. For 2026-27 the window for SD ELA, Math and Science runs from March 29 to May 7, 2027, and each school sets its own days within it. The tests are taken on a computer." },
      { title: "The early grades", body: "In kindergarten to 2nd grade there are no state tests, but schools check early reading during the year to plan extra help. These checks aren't graded." },
      { title: "What they cover", body: "SD ELA and SD Math check the grade's South Dakota standards in reading, writing, listening and research, and in math. The questions adapt to each student's answers. SD Science checks the South Dakota Science Standards, asking students to explain things they observe and solve problems." },
      { title: "How results are described", body: "Each student gets a scale score and one of four achievement levels. Level 1 means the student has not met the achievement standard, Level 2 nearly met, Level 3 met and Level 4 exceeded it. The report also shows how the student did in each part of the subject." },
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
        q: "What are the South Dakota ELA and Math Assessments?",
        a: "They are South Dakota's state tests in English language arts and math for grades 3 to 8. They are given in the spring on a computer, and the questions adjust to how your child answers. Each subject takes two sessions.",
      },
      {
        q: "What do the four levels mean?",
        a: "Level 1 means a student has not yet met the grade's achievement standard and needs more support. Level 2 means nearly met, Level 3 means met, and Level 4 means exceeded the standard, showing advanced progress. The science test reports four levels too.",
      },
      {
        q: "What is the SD-ACT?",
        a: "In 11th grade, South Dakota students take the ACT at school, with English, math, reading, science and writing. The scores can be sent to colleges.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school or district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, language arts, science and social studies skills in South Dakota's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in South Dakota is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Social studies is an introduction to America: maps and globes, finding South Dakota and its neighbors, stories of people from American history, and symbols of America such as the flag, the bald eagle and Mount Rushmore.",
      lookFor: "Many South Dakota districts use standards-based report cards in the early grades. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies covers the ancient world up to Rome and America from 1492 to the Revolution, along with South Dakota's flag, motto and Capitol and the Oceti Sakowin and other Nations who lived here before Columbus.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes. Social studies covers the Middle Ages and the Renaissance and American history from the Constitution to the early 1900s, including Lewis and Clark's journey up the Missouri.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, and start multiplication, division and fractions. Social studies maps America and South Dakota (the Black Hills, the Badlands, the Missouri River and the reservations) and returns to the ancient world, Columbus and colonial America. It is also the first year of the SD ELA and Math Assessments.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies covers South Dakota's regions and historic cities, the Roman Empire and the Middle Ages, and America from the Revolution to the War of 1812, with the Corps of Discovery on the Missouri River and the Lakota winter counts that record those years.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on South Dakota topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies covers the Renaissance, the Reformation and the Age of Exploration, and America from 1820 to 1908, including Dakota Territory, homesteaders, the Black Hills gold rush, the treaties of 1851 and 1868, and South Dakota's statehood in 1889. Students take the SD Science Assessment as well as SD ELA and Math.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many South Dakota districts. Math moves to ratios, rates, negative numbers and expressions. Science covers energy, cells and weather, and social studies follows influential ideas through world history, from the ancient Hebrews, Greece and Rome to the Middle Ages, the Reformation, the Enlightenment and the American and French Revolutions.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources. Social studies is American history from 1492 to 1877, starting with the Oceti Sakowin and other Native peoples before Europeans arrived and South Dakota's geography, through the founding, the Constitution, the Civil War and Reconstruction.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space. Social studies is American history from 1877 to 2008, with South Dakota's part in it: railroads and homesteads, treaties kept and broken, Wounded Knee and statehood, the Dust Bowl, Mount Rushmore and the Crazy Horse Memorial, and the Lakota Code Talkers. Students take SD ELA, Math and Science.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} covers United States Government and American Civics, one of South Dakota's high school social studies courses: the Declaration and the Constitution, the three branches, rights, elections, and South Dakota's state, local and Tribal governments.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
