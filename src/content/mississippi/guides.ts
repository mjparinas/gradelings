import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Mississippi, in US English. The competencies page is the Standards for Mathematical Practice,
// the eight habits of mind listed with every grade's standards in the 2025 Mississippi College- and Career-Readiness
// Standards for Mathematics ("4.SMP.1" to "4.SMP.8"): making sense of problems, reasoning, arguing and critiquing,
// modeling, using tools, precision, structure and repeated reasoning. They are taught inside math lessons, not graded as
// a subject of their own. The assessment page covers the Mississippi Academic Assessment Program (MAAP: English language
// arts and math in grades 3 to 8, science in grades 5 and 8, and Algebra I, Biology and English II in high school), its
// five performance levels, the Kindergarten Readiness Assessment and the 3rd grade reading requirement of the
// Literacy-Based Promotion Act, from the Mississippi Department of Education's MAAP page and scale score tables; dates
// change each year, so the page points to the department. No French here, so no French guide. Record:
// docs/research/mississippi/README.md.

export const MISSISSIPPI_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Mississippi's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Mississippi's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Mississippi's Standards for Mathematical Practice apply in every grade, from kindergarten to Algebra I.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Mississippi's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, the Mississippi College- and Career-Readiness Standards for Mathematics include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices apply in every grade of Mississippi's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the Mississippi College- and Career-Readiness Standards for Mathematics, updated by the State Board of Education in 2025. The standards list the eight practices with every grade, before that grade's content standards.",
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
    slug: "maap-tests",
    short: "MAAP tests",
    source: "the Mississippi Department of Education",
    hubBlurb: "The MAAP tests in English language arts and math (grades 3 to 8) and science (grades 5 and 8), and the 3rd grade reading requirement.",
    name: "Mississippi state tests (MAAP)",
    intro:
      "Mississippi students take the Mississippi Academic Assessment Program (MAAP) tests each spring. They cover English language arts and math in grades 3 to 8, science in grades 5 and 8, and Algebra I, Biology and English II in high school. In 3rd grade, the reading part of the English language arts test also decides whether a child is ready for 4th grade under the Literacy-Based Promotion Act. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 8. Science: grades 5 and 8. End-of-course tests: Algebra I, Biology and English II, usually in high school. Students with the most significant cognitive disabilities may take the MAAP-Alternate instead, and English learners also take an English language proficiency test." },
      { title: "When", body: "In spring, in windows the Mississippi Department of Education sets each year. Each school sets its own days within them, and 3rd graders who need it get two more chances at the reading test." },
      { title: "The early grades", body: "Kindergartners take the Kindergarten Readiness Assessment at the start and end of the year, and schools check reading often from Kindergarten to 3rd grade so children who need it get extra help early." },
      { title: "What they cover", body: "The MAAP tests check the Mississippi College- and Career-Readiness Standards in English language arts, math and science, with questions that ask students to explain their thinking and, in English language arts, a writing task." },
      { title: "How results are described", body: "Each score falls in one of five performance levels: Level 1 (Minimal), Level 2 (Basic), Level 3 (Passing), Level 4 (Proficient) and Level 5 (Advanced). Levels 4 and 5 mean meeting or going beyond grade-level standards. Families get a score report, and school results feed Mississippi's A to F school grades." },
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
        q: "What is MAAP?",
        a: "The Mississippi Academic Assessment Program is the state's testing program. It includes the English language arts and math tests in grades 3 to 8, science tests in grades 5 and 8, and end-of-course tests in Algebra I, Biology and English II. The tests are given online in the spring.",
      },
      {
        q: "What do the five performance levels mean?",
        a: "Level 1 (Minimal) and Level 2 (Basic) mean a student is still working toward the grade's standards. Level 3 (Passing) means a student has a basic grasp of them. Level 4 (Proficient) means meeting the grade's standards, and Level 5 (Advanced) means going beyond them.",
      },
      {
        q: "What is Mississippi's 3rd grade reading requirement?",
        a: "Under the Literacy-Based Promotion Act, a 3rd grader needs to reach the required score on the reading part of the MAAP English language arts test to move on to 4th grade. Children who don't reach it at first get two more chances, and some are promoted under good-cause exemptions, for example some English learners and students with disabilities. Schools check reading from Kindergarten on and give extra help early, so ask your school how your child is doing well before spring.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school or district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Mississippi College- and Career-Readiness Standards with kind feedback and no timers unless you want them. It isn't a copy of the MAAP tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Mississippi is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies (Citizenship at Home and School) they learn about rules and leaders, money, families and traditions, maps, and the symbols of Mississippi and the United States. Kindergartners take the Kindergarten Readiness Assessment at the start and end of the year.",
      lookFor: "Many Mississippi districts use standards-based report cards in the early grades. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Science covers plants, light and sound and the sky, and social studies (Citizenship at School) covers rules and laws, patriotism, working and earning, maps of the world, and life long ago.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class. Ask how the school is tracking reading progress.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at animals and their life cycles, solids and liquids, and Earth's materials, and social studies (Citizenship in School and Community) covers civic virtues, fair laws, producers and consumers, prices and banks, traditions and maps.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and take their first MAAP tests in English language arts and math. Under the Literacy-Based Promotion Act, the reading part of the test also decides whether a child moves on to 4th grade. Social studies (Citizenship in Local Government) covers the three branches of government at every level, taxes and voting, natural disasters and energy.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. Ask early in the year how your child is doing in reading. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers the human body, energy, and weather and climate. Social studies is Mississippi Studies and Regions: the Delta, the Piney Woods and the state's other regions, the Choctaw, Chickasaw and Natchez nations, statehood in 1817, the Civil War and Reconstruction, the Civil Rights Movement, and Mississippi's music and writers.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Mississippi topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science covers ecosystems, matter, motion and space, and students take the MAAP science test as well as English language arts and math. Social studies is United States history from the first peoples and European exploration to the colonies, the Revolution and the Constitution.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Mississippi districts. Math moves to ratios, rates, negative numbers and expressions. Science covers cells, classifying living things, forces and the solar system, and social studies is World Geography and Civics: maps and regions, the world's cultural regions, and how governments and citizenship work.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers atoms and chemical reactions, cycles of matter, and weather and climate, and social studies is Early World History: the river valley civilizations of Egypt, China and the Indus, Greece and Rome, the kingdoms of Africa, world religions, the Middle Ages and the Renaissance.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers heredity and natural selection, waves, and Earth's history and hazards, and social studies is United States history from exploration to Reconstruction. Students take MAAP tests in English language arts, math and science.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers Algebra I (expressions, equations, functions and quadratics), and English classes read and write more closely. Science covers biology and physical science, and social studies in ${APP_NAME} follows the Mississippi Studies and Introduction to Geography courses many students take in high school.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English. Algebra I, Biology and English II end with MAAP end-of-course tests.",
    },
  },
};
