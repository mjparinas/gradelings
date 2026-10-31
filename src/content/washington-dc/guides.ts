import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Washington, DC, in US English. The competencies page is the Standards for Mathematical
// Practice, the eight habits of mind printed at the front of DC's mathematics standards (the Common Core, adopted by
// the State Board of Education in 2010): making sense of problems, reasoning, arguing and critiquing, modeling, using
// tools, precision, structure and repeated reasoning. They are taught inside math lessons, not graded as a subject of
// their own. The assessment page covers the DC Comprehensive Assessments of Progress in Education (DC CAPE: DC ELA and
// DC Math in grades 3 to 8 and high school courses, DC Science in grades 5 and 8 and high school biology), from OSSE's
// DC CAPE page, its introduction for families and its performance level tables. No French here, so no French guide.
// Record: gradelings-research/washington-dc/README.md.

export const WASHINGTON_DC_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in DC's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What DC's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "DC's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "DC's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, DC's mathematics standards include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices apply in every grade of DC's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of DC's mathematics standards, the Common Core standards DC adopted in 2010. The standards document lists them first, before the grade-by-grade content standards.",
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
    slug: "dc-cape-tests",
    short: "DC CAPE",
    source: "the Office of the State Superintendent of Education (OSSE)",
    hubBlurb: "DC CAPE in language arts and math (grades 3 to 8 and high school) and science (grades 5 and 8 and biology).",
    name: "DC's statewide tests (DC CAPE)",
    intro:
      "Every spring, students in the District take statewide tests called DC CAPE, the DC Comprehensive Assessments of Progress in Education. DC ELA and DC Math cover grades 3 to 8 and some high school courses, and DC Science covers grades 5 and 8 and high school biology. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8", "9"],
    facts: [
      { title: "Who takes them", body: "DC ELA and DC Math: grades 3 to 8, then the high school courses ELA I and ELA II, and Algebra I, Geometry and Algebra II. DC Science: grades 5 and 8 and high school biology. Students with the most significant cognitive disabilities may take the Multi-State Alternate Assessment (MSAA) instead." },
      { title: "When", body: "In spring, in a testing window OSSE sets each year. Each school sets its own days within it, and caregivers hear from the school about which tests their child will take." },
      { title: "The early grades", body: "In kindergarten to 2nd grade there are no statewide tests, but schools check early reading during the year to plan extra help. These checks aren't graded." },
      { title: "What they cover", body: "DC CAPE checks DC's language arts and math standards (the Common Core) and its science standards (the Next Generation Science Standards). It is taken on a computer. It replaced the PARCC tests DC used from 2015 to 2023, with the same kinds of questions and comparable results." },
      { title: "How results are described", body: "Language arts and math scores run from 650 to 850 and fall in one of five performance levels. Level 4 means a student met expectations for the grade, and Level 5 that they exceeded them. Score reports go home to caregivers in the fall." },
      { title: "Report card link", body: "Test scores don't change your child's report card. They are one more snapshot for families, teachers and schools." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, then ask your child to retell what happened and explain why.",
      "Practice math with real problems (shopping, cooking, Metro travel times) as well as math facts.",
      "Ask “How do you know?” so your child gets used to explaining answers.",
      "Tell your child the tests show what they know and how they are growing. They are not something to fail.",
    ],
    faqs: [
      {
        q: "What is DC CAPE?",
        a: "The DC Comprehensive Assessments of Progress in Education are the District's statewide tests: DC ELA and DC Math in grades 3 to 8 and high school courses, and DC Science in grades 5 and 8 and high school biology. They are given on a computer in the spring and check DC's standards.",
      },
      {
        q: "What do the five levels mean?",
        a: "Levels 1 to 3 show a student hasn't yet fully met the grade's expectations, from not yet meeting them (Level 1) to approaching them (Level 3). Level 4 means the student met expectations, and Level 5 that they exceeded them.",
      },
      {
        q: "Is DC CAPE the same as PARCC?",
        a: "DC took PARCC tests in language arts and math from 2015 to 2023. OSSE now builds its own tests, named DC CAPE from 2024. OSSE says the questions and the experience are nearly the same, and results are comparable with earlier years.",
      },
      {
        q: "Are test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school or local education agency chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, language arts, science and social studies skills in DC's standards with kind feedback and no timers unless you want them. It isn't a copy of DC CAPE and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Washington, DC is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about themselves, families, rules and fairness, needs and wants, and their city: the DC flag, the mayor and the president.",
      lookFor: "Report cards differ between DCPS and public charter schools. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies looks at communities near and far: leaders and voting, symbols and holidays, DC's wards on a map, and life long ago and today.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies travels the world: continents and climates, how people get food and water, the first civilizations of Egypt, Kush, Mesopotamia and the Olmec, ancient China, Rome and the Americas, and kingdoms such as Mali and the Inca.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and spend social studies on Washington, DC past and present: its rivers, quadrants and wards, the Nacotchtank, Piscataway and Pamunkey peoples, the building of the capital, DC Emancipation Day, U Street and go-go, and how Home Rule, the Council and the statehood debate work. It is also the first year of DC CAPE tests in language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. Test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is North America's first peoples and a new nation: how people came to the Americas, the Haudenosaunee and other Indigenous nations, the arrival of Europeans, Jamestown and 1619, the Thirteen Colonies, the Revolution, and the Constitution and its three branches.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and using sources in research.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies follows the United States from westward expansion to the civil rights movement: slavery and resistance, the Civil War and Reconstruction, the Great Migration and the Black Renaissance, World War II, and court cases such as DC's own Bolling v. Sharpe. Students take the DC Science test as well as language arts and math.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. Test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many DC schools. Math moves to ratios, rates, negative numbers and expressions. Science covers energy, cells and weather, and social studies is world geography: map projections and borders, the regions of Africa, Asia, Latin America, Europe and Oceania, migration and the African diaspora, globalization and climate change.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies is United States history to 1877: Indigenous nations and European colonies, the Revolution, the capital of a new nation on the Potomac, westward expansion, the Civil War and Reconstruction.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is civics in action: the Constitution, rights and the courts, how the District is governed and the debate over its status, DC as the nation's stage for protest, media literacy, human rights and personal finance. Students take DC CAPE in language arts, math and science.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies is World History and Geography I, from early humans and the first farmers to ancient empires, belief systems, trade networks and the empires of about 1600, plus world heritage and who should own artifacts. High school students take DC CAPE in the courses it covers, such as ELA I and Algebra I.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
