import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Delaware, in US English. The competencies page is the Standards for Mathematical Practice,
// the eight habits of mind printed at the front of Delaware's mathematics standards (the Common Core, adopted 2010):
// making sense of problems, reasoning, arguing and critiquing, modeling, using tools, precision, structure and
// repeated reasoning. They are taught inside math lessons, not graded as a subject of their own. The assessment page
// covers the Delaware System of Student Assessments (DeSSA) as 14 DE Admin. Code 101 sets it out: Smarter Balanced
// language arts and math in grades 3 to 8, science in grades 5 and 8 and high school Biology, social studies in grades
// 4 to 8 and 11, four performance levels, and the SAT in grade 11. The Department of Education's site refuses
// automated downloads, so the page keeps to the program's lasting facts and points families to the department for
// dates. No French here, so no French guide. Record: docs/research/delaware/README.md.

export const DELAWARE_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Delaware's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Delaware's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Delaware's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Delaware's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, Delaware's mathematics standards include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices apply in every grade of Delaware's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of Delaware's mathematics standards, the Common Core standards Delaware adopted in 2010. The standards document lists them first, before the grade-by-grade content standards.",
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
    source: "the Delaware Department of Education",
    hubBlurb: "DeSSA: Smarter Balanced language arts and math (grades 3 to 8), science and social studies tests, and the SAT in 11th grade.",
    name: "Delaware state tests (DeSSA and SAT)",
    intro:
      "Delaware students take state tests each spring through the Delaware System of Student Assessments (DeSSA). Students in grades 3 to 8 take the Smarter Balanced tests in language arts and math, science is tested in grades 5 and 8 and in high school Biology, and social studies is tested from 4th grade. Eleventh graders take the SAT for language arts and math. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "Smarter Balanced language arts and math: grades 3 to 8. Science: grades 5 and 8, and students taking high school Biology. Social studies: grades 4 to 8 and 11. SAT: grade 11. Students with the most significant cognitive disabilities may take an alternate assessment instead, and English learners also take the ACCESS English language test." },
      { title: "When", body: "In spring, in a testing window the Department of Education sets each year. Each school sets its own days within it." },
      { title: "The early grades", body: "In kindergarten to 2nd grade there are no state tests, but schools check early reading during the year to plan extra help. Delaware law asks districts to use evidence-based reading programs in kindergarten to 3rd grade. These checks aren't graded." },
      { title: "What they cover", body: "DeSSA checks Delaware's language arts and math standards (the Common Core), its science standards (the Next Generation Science Standards) and its social studies standards, asking students to explain things they observe, solve problems and support answers with evidence." },
      { title: "How results are described", body: "Each score falls in one of four performance levels. Levels 3 and 4 mean meeting or going beyond grade-level standards; Levels 1 and 2 mean a student is still working toward them. Families get score reports from their school." },
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
        q: "What is DeSSA?",
        a: "The Delaware System of Student Assessments is Delaware's set of state tests: Smarter Balanced language arts and math for grades 3 to 8, and science and social studies tests in some grades. The tests are given on a computer in the spring and check the grade's standards.",
      },
      {
        q: "What do the four levels mean?",
        a: "Levels 1 and 2 mean a student is still working toward the grade's standards. Level 3 means meeting them, and Level 4 means going beyond them.",
      },
      {
        q: "What do high school students take?",
        a: "Eleventh graders take the SAT, which counts as the state's high school test in language arts and math, along with the social studies test. Students taking Biology take the high school science test.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school or district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, language arts, science and social studies skills in Delaware's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Delaware is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about themselves, families, rules and community helpers, and state and national symbols such as the American flag and Delaware's Blue Hen.",
      lookFor: "Many Delaware elementary schools use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies compares life in Delaware long ago and today, and covers maps, community helpers and cultures in the community.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies covers American symbols and holidays, the President's job, people who made a difference (including Delaware's Caesar Rodney and Annie Jump Cannon), family journeys, and how food is made and traded.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and in social studies learn Delaware's three counties and regions, why people move, world maps and cultures, and how towns pay for services. It is also the first year of the Smarter Balanced tests in language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is Delaware history and geography: the coastal plain, Delaware Bay and the Delmarva Peninsula, the Lenape and Nanticoke peoples and the Dutch and Swedish settlements, how Delaware became the First State, the Brandywine mills, farms and jobs, people from Delaware who made a difference, and how the General Assembly in Dover works. Students also take their first state social studies test.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Delaware topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is United States history and government, from Native peoples and European exploration to the colonies, the Revolution and the Constitution, and students take the state science test as well as language arts, math and social studies.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Delaware districts. Math moves to ratios, rates, negative numbers and expressions. Science covers energy, cells and weather, and social studies is the ancient world: the first farmers, river valley civilizations, Greece, Rome, India and China, world beliefs and trade.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies moves through the world after the ancient era: Byzantium and the rise of Islam, the kingdoms of West Africa, imperial China, medieval Japan and Europe, the Aztec and Inca, and today's countries, cultures and governments.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is United States history to Reconstruction, including Delaware's part in it: Separation Day, the first state to ratify the Constitution, the Brandywine mills and the canal, and a slave state that stayed in the Union. Students take state tests in language arts, math, science and social studies.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} covers civics and economics, including how Delaware governs itself under its 1897 constitution, plus personal finance; Delaware requires a half credit of financial literacy to graduate.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
