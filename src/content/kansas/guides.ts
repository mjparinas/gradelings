import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Kansas, in US English. The competencies page is the Standards for Mathematical Practice, the
// eight habits of mind printed at the front of the Kansas Mathematics Standards (2017, reviewed in 2024): making sense of
// problems, reasoning, arguing and critiquing, modeling, using tools, precision, structure and repeated reasoning. They
// are taught inside math lessons, not graded as a subject of their own. The assessment page covers the Kansas
// Assessment Program (KAP: English language arts and math in grades 3 to 8 and 10, science in grades 5, 8 and 11), the
// optional 2nd grade reading test and the history, government and social studies classroom-based assessments, from the
// Kansas State Department of Education's 2026-27 assessment overview and its KAP parent guide to reports; dates change
// each year, so the page points to the department. No French here, so no French guide. Record:
// docs/research/kansas/README.md.

export const KANSAS_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Kansas's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Kansas's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Kansas's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Kansas's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, the Kansas Mathematics Standards include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices apply in every grade of Kansas's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the Kansas Mathematics Standards, which the Kansas State Board of Education adopted in 2017 and reviewed in 2024. The standards document lists them before the grade-by-grade content standards.",
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
    source: "the Kansas State Department of Education",
    hubBlurb: "The Kansas Assessment Program (KAP) in English language arts and math (grades 3 to 8) and science (grades 5 and 8).",
    name: "Kansas state tests (the Kansas Assessment Program)",
    intro:
      "Kansas students take state tests each spring through the Kansas Assessment Program, called KAP. The tests cover English language arts and math in grades 3 to 8 and 10, and science in grades 5, 8 and 11. Schools may also give an optional reading test in 2nd grade. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "KAP English language arts and math: grades 3 to 8 and 10. KAP science: grades 5, 8 and 11. Students with the most significant cognitive disabilities may take the Dynamic Learning Maps alternate tests instead, and English learners also take the KELPA English language test." },
      { title: "When", body: "In spring, in a window the Kansas State Department of Education sets each year (for 2026-27, from March 22 to April 23). Each school sets its own days within it. The tests are untimed and given on a computer, usually in two sessions of about 45 to 60 minutes." },
      { title: "The early grades", body: "There is no KAP test before 3rd grade. Schools check reading in the early grades to plan extra help, and districts may give an optional reading test in 2nd grade. These checks aren't graded." },
      { title: "Social studies", body: "There is no KAP social studies test. Instead, teachers give classroom-based assessments in history, government and social studies in 4th grade, 7th grade and once in high school." },
      { title: "How results are described", body: "Each score is a scale score from 400 to 700 in one of four performance levels: Level 1 (limited), Level 2 (basic), Level 3 (proficient) and Level 4 (advanced). Levels 3 and 4 mean a student has reached the grade's expectations. Families get an individual student report, and school results are published on the Kansas Report Card website." },
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
        q: "What is KAP?",
        a: "The Kansas Assessment Program is Kansas's set of state tests in English language arts, math and science. They are given on a computer in the spring and check the Kansas standards for each grade, with multiple-choice questions and other kinds, such as putting things in order or matching.",
      },
      {
        q: "What do the four performance levels mean?",
        a: "Level 1 and Level 2 mean a student is still working toward the grade's expectations. Level 3 means a proficient understanding, and Level 4 an advanced one. On every KAP test, a scale score of 510 reaches Level 2 and 540 reaches Level 3.",
      },
      {
        q: "Can I compare this year's score with last year's?",
        a: "Use the performance levels. Kansas started a new score scale in 2025, so scores from before 2025 can't be compared with later ones, and because each grade tests different content, a scale score means most within its own grade and subject.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Kansas standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Kansas is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies, built around a sense of self, they learn about themselves, families, rules, choices and their consequences, the American flag and Kansas's symbols.",
      lookFor: "Many Kansas districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies looks at the role of individuals: life long ago and today, maps of the community, community helpers, rights and responsibilities, and what local government does.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies compares societies then and now: leaders and citizens, national and Kansas symbols, travel on the trails and railroads, and how people use resources.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking. Some districts give an optional state reading test this year.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and spend social studies on local and national communities: maps and globes, cultures, and the people who moved to Kansas and why. It is also the first year of KAP tests in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is Kansas and the regions of the United States: the High Plains, Flint Hills and rivers, the Kansa, Wichita and other Native nations, the trails, Bleeding Kansas and statehood in 1861, cattle towns, wheat and airplanes, Kansans who stood up for fairness, and how the state is governed. Teachers also give a classroom-based social studies assessment.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Kansas topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is U.S. history to 1789, from Native peoples and European exploration to the colonies, the Revolution and the Constitution, and students take the KAP science test as well as English language arts and math.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Kansas districts. Math moves to ratios, rates, negative numbers and expressions. Science covers energy, cells and weather, and social studies is the ancient world to 1300 CE: the first farmers, river valley civilizations, Greece, Rome, India and China, world beliefs and trade.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources. Kansas schools teach either global geography or Kansas history in social studies, so practice covers both: world regions, cultures, governments and economies, and Kansas from the first peoples to today. Teachers also give a classroom-based social studies assessment.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions, angles and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is U.S. history from 1789 to 1898, including Kansas's part in it: the Santa Fe and Oregon Trails, Bleeding Kansas, statehood on the eve of the Civil War, homesteading and the Exodusters. Students take the KAP science test as well as English language arts and math.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} covers the Government of the United States course, including how Kansas governs itself under its Wyandotte Constitution, plus personal finance and economics.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
