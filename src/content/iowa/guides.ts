import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Iowa, in US English. The competencies page is the Standards for Mathematical Practice, the
// eight habits of mind printed in the Iowa Academic Standards for Mathematics (adopted April 2024, built on the Common
// Core): making sense of problems, reasoning, arguing and critiquing, modeling, using tools, precision, structure and
// repeated reasoning. They are taught inside math lessons, not graded as a subject of their own. The assessment page
// covers Iowa's state summative assessment (formerly ISASP: English language arts and math in grades 3 to 11, science in
// grades 5, 8 and 10, moving to 11 from 2026-27), the four achievement levels the Department proposed in 2026, and the
// early reading screenings of Iowa Code section 279.68, from the Department's 2026 announcements and the Code; the levels
// are awaiting State Board approval, so the page says they are proposed. No French here, so no French guide. Record:
// docs/research/iowa/README.md.

export const IOWA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Iowa's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Iowa's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Iowa's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Iowa's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, the Iowa Academic Standards for Mathematics include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices apply in every grade of Iowa's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the Iowa Academic Standards for Mathematics, which the State Board of Education adopted in 2024, building on the Common Core. The standards document prints them before the grade-by-grade content standards, once for Kindergarten to 5th grade and again for 6th to 8th grade.",
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
    source: "the Iowa Department of Education",
    hubBlurb: "Iowa's state summative assessment in English language arts and math (grades 3 to 11) and science (grades 5, 8 and high school).",
    name: "Iowa state tests (the state summative assessment, formerly ISASP)",
    intro:
      "Iowa students take a state test each spring. The state summative assessment, which used to be called the Iowa Statewide Assessment of Student Progress (ISASP), covers English language arts and math in grades 3 to 11 and science in grades 5 and 8 and once in high school. It was rebuilt for Iowa's new standards and first given in spring 2026. In Kindergarten to 3rd grade, schools also check reading at the start of each year. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 11. Science: grades 5 and 8, and once in high school (10th grade through 2025-26, then 11th grade from 2026-27). The test is given in Iowa's public schools and accredited nonpublic schools." },
      { title: "When", body: "In spring, in a window the Iowa Department of Education sets each year. Each school sets its own days within it." },
      { title: "The early grades", body: "In Kindergarten to 3rd grade, schools check every child's reading at the start of each year and again during the year. A child who misses the grade's benchmark on two checks in a row is called persistently at risk and gets intensive reading help, and parents get a letter with the plan." },
      { title: "What they cover", body: "The state test checks the Iowa Academic Standards: the English language arts and math standards adopted in 2024 and the science standards adopted in 2025." },
      { title: "How results are described", body: "Iowa has proposed four new achievement levels: Below, Approaching, Meeting and Exceeding grade-level expectations. They replace the three earlier levels (Not Yet Proficient, Proficient and Advanced) once the State Board of Education approves them. Families get a score report, and school results are published in the Iowa School Performance Profiles." },
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
        q: "What happened to ISASP?",
        a: "Iowa built a new state summative assessment for the Iowa Academic Standards adopted in 2024. It replaces the Iowa Statewide Assessment of Student Progress (ISASP) and was first given in spring 2026, with new questions and new achievement levels.",
      },
      {
        q: "What do the four achievement levels mean?",
        a: "Below and Approaching mean a student is still working toward the grade's expectations. Meeting means reaching them, and Exceeding means going beyond them. The levels were proposed in 2026 and go to the State Board of Education for approval.",
      },
      {
        q: "What does Iowa's early reading law say?",
        a: "Schools check reading in Kindergarten to 3rd grade at the start of each year. A child who misses the benchmark on two checks in a row gets intensive reading help, and parents get a written plan with ideas for reading at home. Children in Kindergarten to 6th grade who aren't reading proficiently get a personal reading plan, and parents can ask for their child to repeat the grade.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school or district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Iowa Academic Standards with kind feedback and no timers unless you want them. It isn't a copy of the state test and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Iowa's Statewide Voluntary Preschool Program funds a year for four-year-olds in school districts and community partners. It follows the Iowa Early Learning Standards, 4th edition (2026).",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Iowa is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies (Me and My Community) they learn about their roles at home and school, rules here and in other places, community helpers, and needs, wants and money. Schools also check reading at the start of the year.",
      lookFor: "Many Iowa districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies (Places Near and Far) covers maps of the community and Iowa, why people live where they do, and the traditions and festivals of Iowa's cultures.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies (Our State) covers Iowa's Native nations, how Iowa's communities have changed, its symbols, landmarks and natural resources, and its elected leaders.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and spend social studies on America's Early Story: Native American cultures, explorers such as Marquette and Jolliet, the Thirteen Colonies and slavery in early America. It is also the first year of the state test in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. Ask how reading checks are going. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is Our New Nation: the American Revolution and the Declaration of Independence, westward expansion and how settlers came to Iowa, and the immigrants who made Iowa home, plus a first budget.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Iowa topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is Our Changing Nation, from the Constitution and the Civil War to railroads, the Industrial Revolution and civil rights, including Iowa's own court cases and the students of Tinker v. Des Moines. Students take the state science test as well as English language arts and math.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Iowa districts. Math moves to ratios, rates, negative numbers and expressions. Science covers cells and body systems, light, waves and heat, and Earth's surface and history, and social studies is Ancient and Medieval World Studies: Mesopotamia, Egypt, Greece, Rome, China and the Americas, medieval Europe, the Renaissance and the age of exploration.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers forces, fields and energy, ecosystems and biodiversity, and space, and social studies is Modern World Studies: the regions of the world, their governments and religions, revolutions, and Iowa's place in a connected world.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers atoms and reactions, heredity and natural selection, and weather and climate, and social studies is U.S. History and Civics, from the Revolution and the Constitution to Reconstruction, including how Iowa became a state and Iowa's part in the Civil War.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} covers government and economics, including how Iowa governs itself under its 1857 constitution and the Meskwaki Nation's own government, plus financial literacy, which Iowa's high school standards include.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
