import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Utah, in US English. The competencies page is the Standards for Mathematical Practice, the
// eight habits of mind printed at the start of every grade in the Utah Core Standards for Mathematics (1.MP.1 to
// 1.MP.8 in Grade 1, and so on): making sense of problems, reasoning, arguing and critiquing, modeling, using tools,
// precision, structure and repeated reasoning. They are taught inside math lessons, not graded as a subject. The
// assessment page covers RISE (English language arts and math in grades 3 to 10, science in grades 4 to 10 and writing
// in grades 5 and 8; USBE family guides, June 2026) and the Acadience Reading and Math checks in the early grades.
// Dates change each year, so the page points to the Utah State Board of Education. No French here, so no French guide.
// Record: gradelings-research/utah/README.md.

export const UTAH_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Utah's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Utah's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Utah's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Utah's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, Utah's math standards include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices appear in every grade of Utah's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the Utah Core Standards for Mathematics, adopted by the Utah State Board of Education. Every grade lists them first, numbered by grade (1.MP.1 to 1.MP.8 in 1st grade, for example), before the content standards.",
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
    slug: "rise-tests",
    short: "RISE tests",
    source: "the Utah State Board of Education",
    hubBlurb: "RISE in English language arts and math (grades 3 to 10), science (grades 4 to 10) and writing (grades 5 and 8), plus the Acadience checks in the early grades.",
    name: "Utah's state tests (RISE)",
    intro:
      "Utah students take the RISE tests (Readiness, Improvement, Success and Empowerment) near the end of each school year: English language arts and math in grades 3 to 10, science in grades 4 to 10 and writing in grades 5 and 8. Students take the RISE test that matches the course they are in. Younger students take short Acadience Reading and Acadience Math checks during the year. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8", "9"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 10. Science: grades 4 to 10. Writing: grades 5 and 8. In middle and high school, students take the test for the course they are enrolled in. Students with the most significant cognitive disabilities may take an alternate test instead." },
      { title: "How the test works", body: "RISE is taken on a computer and adapts to your child: a right answer brings a harder question and a wrong answer an easier one, until the test finds the level that fits. Harder questions mean your child is doing well. The tests are not timed, and Utah teachers write them and Utah parents review them." },
      { title: "Early reading and math checks", body: "In the early grades, children take short Acadience Reading and Acadience Math checks at the beginning, middle and end of the year. They help teachers find out early who needs extra help, and schools share the results with families." },
      { title: "What they cover", body: "RISE checks the Utah Core Standards for each grade and course: reading, writing and listening in English language arts, the grade's math, and the SEEd science standards." },
      { title: "How results are described", body: "Results come in four proficiency levels: Below Proficient, Approaching Proficient, Proficient and Highly Proficient. The Individual Student Report also gives a scale score, compares it with school, district and state averages, and breaks results into smaller skill areas." },
      { title: "Report card link", body: "RISE results come in a separate Individual Student Report, usually within about three weeks of your school's testing window, not on the report card. You can ask the school for the report, or find it on the school's parent portal." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and getting to school every day.",
      "Read together often, then ask your child to retell what happened and explain why.",
      "Practice math with real problems (shopping, cooking, travel times) as well as math facts.",
      "Ask “How do you know?” so your child gets used to explaining answers.",
      "Tell your child to do their best and take their time: harder questions mean they are doing well, and it's okay if it feels challenging.",
    ],
    faqs: [
      {
        q: "What does RISE stand for?",
        a: "RISE stands for Readiness, Improvement, Success and Empowerment. It is Utah's statewide end-of-year test in English language arts, math, science and writing, based on the Utah Core Standards.",
      },
      {
        q: "Is RISE timed?",
        a: "No. RISE tests are not timed, and they adapt to each student, so questions get harder or easier depending on the answers.",
      },
      {
        q: "Are RISE scores part of my child's report card?",
        a: "No. RISE results come in a separate Individual Student Report. Talk with your child's teacher about how the results connect with classwork.",
      },
      {
        q: "How can my child practice the format?",
        a: "The Utah RISE portal (utahrise.org) has training tests that let students try the tools, question types and navigation before test day.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Utah Core Standards with kind feedback and no timers unless you want them. It isn't a copy of RISE and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Utah is the year before kindergarten, for children who are 4. Utah's public preschool programs follow the Utah Core State Standards for Early Learning, Ages 3 to 5. Children learn through play: counting, shapes and patterns, letters, sounds and rhymes, plus the first ideas about weather, living things, community and getting along.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for counting small groups, naming letters, hearing rhymes, taking turns and talking about feelings.",
    },
    k: {
      overview: "Kindergarten in Utah is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Science looks at weather, sunlight, pushes and pulls and what living things need, and social studies is about families, traditions, maps, rules and needs and wants. Teachers check early reading and math with short Acadience checks during the year.",
      lookFor: "Many Utah schools use skills-based report cards in the early grades. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Science covers light and sound, how plants and animals survive, and patterns of the sun, moon and stars. Social studies looks at family and community history, maps, rules and the goods and services people need.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science covers materials and their properties, habitats, and how land and water change, and social studies looks at change over time in the community, Utah and the United States, maps of the world, and producers and consumers.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study forces, life cycles, traits, weather and climate in science. Social studies compares types of government and the United States and Utah constitutions, and looks at communities and their geography. It is the first year of the RISE tests in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. RISE results are reported separately from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers Earth's features, fossils and rock layers, how plants and animals are built to survive, energy and waves, and the sun and stars. Social studies is the year of Utah: its regions and the Great Salt Lake, its first peoples and Tribal nations today, explorers, pioneers, the railroad and statehood, and Utah's government and symbols.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research skills. Science joins the RISE tests this year.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science covers Earth's systems and natural hazards, matter, and ecosystems and food webs. Social studies is United States history, from the Native peoples of North America and the age of exploration to the colonies, the Revolution, the Constitution and the Civil War.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. RISE adds a writing test in 5th grade.",
    },
    "6": {
      overview: "6th grade is the last year of elementary school in many Utah districts and the first of middle school in others. Math moves to ratios, rates, negative numbers and expressions. Science covers the Sun, Earth and Moon, molecules and heat, weather and climate, and ecosystems. Social studies is world history, from early humans and ancient civilizations to empires, trade and the modern world.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers forces and motion, Earth's changing surface and history, cells and body systems, and heredity and evolution. Social studies is Utah Studies, from Native innovations and Utah's diverse peoples to the railroad, statehood, the world wars and Utah today.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers atoms, molecules and chemical reactions, energy and waves, photosynthesis, and Earth's resources and human impact. Social studies is United States History I, from Native peoples and exploration to the Revolution, the Constitution, a growing nation and Reconstruction.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text. RISE includes a writing test in 8th grade.",
    },
    "9": {
      overview: `9th grade is the first year of high school in many Utah districts and the last year of junior high in others. Math in ${APP_NAME} is Secondary Mathematics I, Utah's integrated first high school course. Science covers biology and Earth and space science, and social studies in ${APP_NAME} is World Geography. Students take the RISE tests for the courses they are in.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math, and weighing evidence and perspectives in social studies and English.",
    },
  },
};
