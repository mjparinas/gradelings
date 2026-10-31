import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Louisiana, in US English. The competencies page is the Standards for Mathematical Practice, the
// eight habits of mind printed in the Louisiana Student Standards for Mathematics (2016): making sense of problems,
// reasoning, arguing and critiquing, modeling, using tools, precision, structure and repeated reasoning. Louisiana has
// no statewide SEL standards for students, and the practices are taught inside math lessons, not graded as a subject.
// The assessment page covers LEAP 2025 (English language arts, math, science and social studies in grades 3 to 8, and
// English I and II, Algebra I, Geometry, Biology, Civics and U.S. History in high school) and the 3rd grade literacy
// law (Act 422 of 2023, R.S. 17:24.11). Dates change each year, so the page points to the Louisiana Department of
// Education. No French here, so no French guide. Record: gradelings-research/louisiana/README.md.

export const LOUISIANA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Louisiana's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Louisiana's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Louisiana's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Louisiana's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, Louisiana's math standards include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices appear in every grade of Louisiana's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the Louisiana Student Standards for Mathematics, adopted by the Louisiana Board of Elementary and Secondary Education (BESE) in 2016. The standards list them before the content standards for each grade.",
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
    slug: "leap-tests",
    short: "LEAP tests",
    source: "the Louisiana Department of Education",
    hubBlurb: "LEAP 2025 in English language arts, math, science and social studies (grades 3 to 8), plus high school course tests and the 3rd grade reading law.",
    name: "Louisiana's state tests (LEAP 2025)",
    intro:
      "Louisiana students take the LEAP 2025 tests (Louisiana Educational Assessment Program) each spring: English language arts, math, science and social studies in grades 3 to 8. In high school, students take LEAP 2025 tests at the end of English I, English II, Algebra I, Geometry, Biology, Civics and U.S. History. Younger students take a reading screener in kindergarten to 3rd grade. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts, math, science and social studies: grades 3 to 8. High school: English I, English II, Algebra I, Geometry, Biology, Civics and U.S. History. Students with the most significant cognitive disabilities may take LEAP Connect instead." },
      { title: "When", body: "Most tests are in April and May. Grades 4 and up test online, and schools choose online or paper for 3rd grade. Each school sets its own days within the windows the state announces each year, and every test is timed." },
      { title: "Reading by 3rd grade", body: "Under Louisiana's early literacy law (Act 422 of 2023), children in kindergarten to 3rd grade take a reading screener at the start, middle and end of the year, and a child who is behind gets extra reading help and a plan shared with the family. A 3rd grader who still scores at the lowest level on the screener after three tries may repeat 3rd grade, unless a good-cause exemption applies." },
      { title: "What they cover", body: "The tests check the Louisiana Student Standards in English language arts, math, science and social studies, and the high school tests check those courses. The social studies tests were rebuilt for the 2022 standards and first given in the 2024-2025 school year." },
      { title: "How results are described", body: "Scores are reported in five achievement levels: Unsatisfactory, Approaching Basic, Basic, Mastery and Advanced. Mastery or above means a student is ready for the next grade or course. The report also breaks results into categories, such as reading or writing." },
      { title: "Report card link", body: "LEAP results come in a separate student report, not on the report card. In high school, the LEAP test counts for 15 to 30 percent of the final course grade, as each school system chooses." },
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
        q: "What is LEAP 2025?",
        a: "LEAP 2025 is the Louisiana Educational Assessment Program, the state's yearly tests in English language arts, math, science and social studies in grades 3 to 8, and in English I and II, Algebra I, Geometry, Biology, Civics and U.S. History in high school.",
      },
      {
        q: "Will my child have to repeat 3rd grade because of reading?",
        a: "Not automatically. Under Act 422 of 2023, the school uses a reading screener three times a year, and a 3rd grader who still scores at the lowest level after three tries may repeat 3rd grade unless a good-cause exemption applies. Children who are behind get extra help first, so talk with your child's teacher early in the year.",
      },
      {
        q: "Are LEAP scores part of my child's report card?",
        a: "No. LEAP results come in a separate student report. In high school, the LEAP test for a course counts for part of the final course grade, so ask your school how it works there.",
      },
      {
        q: "When do results come out?",
        a: "Schools get results for grades 3 to 8 in the summer, and each school system decides how to share them with families. Ask your child's school when to expect the report.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Louisiana Student Standards with kind feedback and no timers unless you want them. It isn't a copy of LEAP and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Louisiana is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Science looks at pushes and pulls, sunlight, weather and what living things need, and social studies is about themselves, families, rules, jobs, and the traditions and symbols of Louisiana and the United States. Teachers check each child's early reading with a screener.",
      lookFor: "Many Louisiana school systems use skills-based report cards in the early grades. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Science covers light and sound, how plants and animals survive, and the sun, moon and stars. Social studies is a year about Louisiana: its symbols, cultures and celebrations, its regions on a map, its natural resources and how it is governed.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science covers materials and their properties, habitats, and how land and water change, and social studies looks at the United States: its founders and landmarks, maps and continents, the Constitution and the three branches of government.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study forces, life cycles, traits, weather and natural hazards in science. Social studies is the American story: famous Americans, inventions, big events such as the Louisiana Purchase, and how markets and money work. It is the first year of LEAP 2025 and the year of Louisiana's 3rd grade reading law.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. LEAP results are reported separately from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers energy, waves and light, how plants and animals are built to survive, and Earth's surface and resources. Social studies is world history and geography from early humans to the ancient civilizations, including Poverty Point, the ancient earthworks in northeast Louisiana.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research skills.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science covers matter, ecosystems and food webs, gravity and the stars, and Earth's systems. Social studies is world history from the Middle Ages to the Renaissance, the Reformation and the age of exploration.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Louisiana school systems. Math moves to ratios, rates, negative numbers and expressions. Science covers atoms, forces, energy and waves, cells and ecosystems, and the solar system. Social studies is United States history to 1791, from the thirteen colonies to the American Revolution and the Constitution, with French and Spanish colonial Louisiana.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, body systems, photosynthesis, heredity, biodiversity and the weather and climate. Social studies is United States history from 1791 to 1877, with the Louisiana Purchase, Louisiana's statehood in 1812, and the Civil War and Reconstruction in Louisiana.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers energy and materials, genes, fossils and natural selection, and Earth's history, resources and hazards. Social studies is United States history from 1877 to 2008, with Louisiana's oil and timber industries, the 1927 flood, Huey Long, the civil rights movement and Hurricanes Katrina and Rita.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} is Algebra I, and English classes read and write more closely. Science covers the biology and physical science courses, and social studies in ${APP_NAME} is Civics, including how Louisiana governs itself through its parishes. Algebra I, English I, Biology and Civics each end with a LEAP 2025 test.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, the LEAP course tests, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
