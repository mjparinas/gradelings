import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for West Virginia, in US English. The competencies page is the Mathematical Habits of Mind (MHM1 to
// MHM8), the eight habits printed at the front of the West Virginia College- and Career-Readiness Standards for
// Mathematics (Policy 2520.2B): making sense of problems, reasoning, arguing and critiquing, modeling, using tools,
// precision, structure and repeated reasoning. Teachers must build them into math lessons; they are not graded as a
// subject. The assessment page covers the West Virginia General Summative Assessment (English language arts and math in
// grades 3 to 8, science in grades 5 and 8, four achievement levels) and the SAT School Day in grade 11. Dates change
// each year, so the page points to the West Virginia Department of Education (WVDE). No French here, so no French guide.
// Record: gradelings-research/west-virginia/README.md.

export const WEST_VIRGINIA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-habits-of-mind",
    label: "Mathematical Habits of Mind",
    hubBlurb: "The eight Mathematical Habits of Mind in West Virginia's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What West Virginia's eight Mathematical Habits of Mind mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "West Virginia's Mathematical Habits of Mind apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "West Virginia's Mathematical Habits of Mind, explained for parents",
    intro:
      "Alongside the content standards for each grade, the West Virginia College- and Career-Readiness Standards for Mathematics begin with eight Mathematical Habits of Mind, numbered MHM1 to MHM8. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. West Virginia teachers are asked to build them into every math lesson; they are not graded as a separate subject.",
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
        q: "Are the Habits of Mind graded?",
        a: "No, not as a subject of their own. Teachers build them into math lessons, and some report cards comment on problem solving or explaining thinking, but they are not graded separately.",
      },
      {
        q: "Are they the same in every grade?",
        a: "Yes. The same eight habits appear in every grade of West Virginia's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the West Virginia College- and Career-Readiness Standards for Mathematics (Policy 2520.2B), which the West Virginia Board of Education sets. The standards list them before the content standards, and each grade's introduction asks teachers to weave them in.",
      },
      {
        q: `Does ${APP_NAME} measure the Habits of Mind?`,
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
    source: "the West Virginia Department of Education",
    hubBlurb: "The West Virginia General Summative Assessment in English language arts and math (grades 3 to 8) and science (grades 5 and 8).",
    name: "West Virginia General Summative Assessment (WVGSA)",
    intro:
      "West Virginia students take the West Virginia General Summative Assessment (WVGSA) each spring: English language arts and math in grades 3 to 8, and science in grades 5 and 8. In 11th grade, students take the SAT School Day. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 8. Science: grades 5 and 8. SAT School Day: grade 11. Students take the tests for the grade they are enrolled in, and students with the most significant cognitive disabilities may take an alternate assessment instead." },
      { title: "When", body: "In spring. Each county and school sets its own testing days within the window the West Virginia Department of Education announces each year." },
      { title: "What they cover", body: "The WVGSA checks the West Virginia College- and Career-Readiness Standards in English language arts, math and science. The tests are taken on a computer." },
      { title: "How results are described", body: "Results come as a scale score and one of four achievement levels: Does Not Meet Standard, Partially Meets Standard, Meets Standard and Exceeds Standard. Families can also see Lexile (reading) and Quantile (math) measures online, and school and state results are on ZoomWV, the state's education data site." },
      { title: "Report card link", body: "WVGSA results generally don't change your child's grades or whether they move up a grade. They can be used, with other information, when a school decides what help a student needs." },
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
        q: "What is the WVGSA?",
        a: "The West Virginia General Summative Assessment is the state test in English language arts and math for grades 3 to 8, and in science for grades 5 and 8. It is taken on a computer in the spring.",
      },
      {
        q: "What do the four achievement levels mean?",
        a: "Does Not Meet Standard shows a minimal understanding of the grade's standards, Partially Meets an incomplete one, Meets an adequate one and Exceeds a thorough one. They describe one test on one day, not everything your child knows.",
      },
      {
        q: "Which grades take the science test?",
        a: "Science is tested in grades 5 and 8. Each test covers the standards of a band of grades, not just that year.",
      },
      {
        q: "Does the 3rd grade test matter more?",
        a: "Under the Third Grade Success Act, from the 2026-27 school year a 3rd grader whose test shows Does Not Meet Standard in reading or math may repeat 3rd grade, on the recommendation of the teacher and the student assistance team, unless one of the law's exceptions applies. Ask your school how it supports students well before the test.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts and science skills in West Virginia's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in West Virginia is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Social studies starts with their own community and their place in West Virginia: rules, helpers, needs and wants, and the state's flag, bird and flower.",
      lookFor: "Report cards are chosen by each county, and many use standards-based marks. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies looks at being a good citizen, jobs and resources in the community, maps, and West Virginia's symbols and places.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at habitats, landforms and how the land changes, and social studies widens to the nation: government and leaders, goods and services, maps, and West Virginia's history and landmarks.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, and start multiplication, division and fractions. Science covers weather and climate, life cycles and forces. Social studies introduces the state, nation and world, with West Virginia's regions, resources and jobs. It is also the first year of the WVGSA state tests, and the end of the Third Grade Success Act's reading and math screening.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers energy, waves, rocks, fossils and natural hazards. Social studies follows the United States from the colonies and the Revolution to westward expansion, and West Virginia's counties, geography and how life has changed since the 1700s.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and map and research skills.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science covers matter, ecosystems, Earth's water and the Sun and stars. Social studies runs from the Civil War to the United States as a world power, including how West Virginia became a state in 1863. Students take the science test this year.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many West Virginia counties. Math moves to ratios, rates, negative numbers and expressions. Science covers weather, climate, space and engineering design, and social studies looks at the world since 1900: the world wars, the Great Depression, the Cold War and civil rights, along with Congress, economic systems, trade and time zones.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies is a continent-by-continent study of the ancient world: how geography shaped early civilizations, their economies and their governments.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity, growth and Earth's history. Social studies is West Virginia Studies, the whole story of the state from its first peoples to today: its government, economy and geography, statehood in the Civil War, coal, timber and the labor struggles, and modern West Virginia. Students take the science test this year.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers Algebra I (expressions, equations, functions and data), and English classes read and write more closely. Science in ${APP_NAME} follows the high school courses a 9th grader may take, and social studies is World Studies, from the classical civilizations to the modern world.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English. High school courses use the state's A to F grading scale.",
    },
  },
};
