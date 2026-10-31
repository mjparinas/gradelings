import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Rhode Island, in US English. The competencies page is the Standards for Mathematical Practice,
// the eight habits of mind printed at the front of Rhode Island's mathematics standards (the Common Core, adopted
// 2010): making sense of problems, reasoning, arguing and critiquing, modeling, using tools, precision, structure and
// repeated reasoning. They are taught inside math lessons, not graded as a subject of their own. The assessment page
// covers the Rhode Island Comprehensive Assessment System (RICAS, English language arts and math, grades 3 to 8), the
// Next Generation Science Assessment (NGSA, grades 5, 8 and 11) and the PSAT 10 and SAT in high school, from RIDE's
// family guides to RICAS and the NGSA (both in docs/research/rhode-island/source); dates change each year, so the page
// points to the department. No French here, so no French guide. Record: docs/research/rhode-island/README.md.

export const RHODE_ISLAND_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Rhode Island's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Rhode Island's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Rhode Island's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Rhode Island's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, Rhode Island's mathematics standards include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices apply in every grade of Rhode Island's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of Rhode Island's mathematics standards, the Common Core standards Rhode Island adopted in 2010. The standards document lists them first, before the grade-by-grade content standards.",
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
    source: "the Rhode Island Department of Education",
    hubBlurb: "RICAS in English language arts and math (grades 3 to 8) and the NGSA science test (grades 5, 8 and 11).",
    name: "Rhode Island state tests (RICAS, NGSA and SAT)",
    intro:
      "Rhode Island students take state tests each spring. The Rhode Island Comprehensive Assessment System (RICAS) covers English language arts and math in grades 3 to 8, and the Next Generation Science Assessment (NGSA) is given in grades 5, 8 and 11. High school students also take the PSAT 10 and the SAT. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "RICAS English language arts and math: grades 3 to 8. NGSA science: grades 5, 8 and 11, with versions in Spanish and Portuguese. PSAT 10 in grade 10 and SAT in grade 11. Students with the most significant cognitive disabilities may take an alternate assessment instead, and English learners also take the ACCESS English language test." },
      { title: "When", body: "In spring, in windows the Rhode Island Department of Education sets each year. Each school sets its own days within them. The tests are usually taken on a computer." },
      { title: "The early grades", body: "In kindergarten to 2nd grade there are no state tests, but schools check early reading during the year to plan extra help. These checks aren't graded." },
      { title: "What they cover", body: "RICAS checks Rhode Island's English language arts and math standards (the Common Core). It is the same test as Massachusetts' MCAS in those subjects. NGSA checks the Next Generation Science Standards, asking students to explain things they observe and solve problems." },
      { title: "How results are described", body: "RICAS scores run from 440 to 560 and fall in one of four levels: Not Meeting, Partially Meeting, Meeting and Exceeding Expectations. NGSA uses Beginning to Meet, Approaching, Meeting and Exceeding Expectations. Reports for grades 5 to 8 also show a student growth percentile from 1 to 99." },
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
        q: "What is RICAS?",
        a: "The Rhode Island Comprehensive Assessment System is Rhode Island's state test in English language arts and math for grades 3 to 8. It is given in the spring, usually on a computer, and checks the grade's standards. It is the same test Massachusetts gives as MCAS, so results can be compared across the two states.",
      },
      {
        q: "What do the four levels mean?",
        a: "Not Meeting and Partially Meeting Expectations mean a student is still working toward the grade's standards. Meeting Expectations means showing the grade's standards, and Exceeding Expectations means showing mastery of them. The NGSA science test reports four similar levels.",
      },
      {
        q: "What is the student growth percentile?",
        a: "It compares how much your child's score grew since the last test with students who started at a similar score, on a scale from 1 to 99. A higher number means more growth. It is shown for grades 5 to 8.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school or district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, language arts, science and social studies skills in Rhode Island's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "RI Pre-K funds a year for four-year-olds in public schools, Head Start and community programs. It follows the Rhode Island Early Learning and Development Standards (2023 edition).",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Rhode Island is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about families, schools and neighborhoods, classroom rules and community helpers, and symbols such as the American flag and Rhode Island's anchor flag with the word Hope.",
      lookFor: "Many Rhode Island districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies is about local communities: maps and directions, the land and its resources, jobs and money, cultures, and how Rhode Island communities have changed since long ago.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies turns to global communities: maps and globes, continents and oceans, cultures around the world, and how Rhode Island connects with the world through the people who move here and the goods we trade.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and spend social studies on the regions of the United States, starting with our own Northeast, along with the states and territories and the national government. It is also the first year of RICAS tests in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is Rhode Island: its land and Narragansett Bay, the Narragansett, Wampanoag and other Native peoples, Roger Williams and the 1663 charter, colonial life and the sea, including the slave trade, the Gaspee and the Revolution, Slater Mill and the people who came to work in the mills, and how the state and its cities and towns are governed.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Rhode Island topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is United States history from European exploration to Reconstruction: the colonies, the Revolution and the Constitution, the new nation's growth, and the Civil War. Students take the NGSA science test as well as RICAS.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Rhode Island districts. Math moves to ratios, rates, negative numbers and expressions. Science covers energy, cells and weather, and social studies is world history from early humans to about 1300: the first farmers, river valley civilizations, Greece, Rome, India and China, world beliefs and trade.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies is world history from about 1300 to today: exploration and the Atlantic slave trade, the Renaissance and Reformation, revolutions and industry, empires and resistance, the World Wars, the Cold War and globalization.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is government and civic life: natural rights, the Declaration and the Constitution, the three branches, how Rhode Island and its cities, towns and the Narragansett Indian Tribe govern, civil rights and the media. Students take RICAS and the NGSA science test, and many do a student-led civics project.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} covers high school civics: the foundations of American government, how the nation governs, elections and the history of voting rights from Rhode Island's Dorr Rebellion on, civic action and human rights. Rhode Island students show proficiency in civics during middle or high school.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
