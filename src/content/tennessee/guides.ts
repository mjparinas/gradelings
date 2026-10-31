import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Tennessee, in US English. The competencies page is the Standards for Mathematical Practice, the
// eight habits of mind printed in Tennessee's Academic Standards for Mathematics (adopted by the State Board of
// Education on February 5, 2021): making sense of problems, reasoning, arguing and critiquing, modeling, using tools,
// precision, structure and repeated reasoning. Tennessee has no statewide SEL standards for students, and the practices
// are taught inside math lessons, not graded as a subject. The assessment page covers TCAP (English language arts, math
// and science in grades 3 to 8, social studies in grades 6 to 8, end-of-course tests in high school) and the 3rd grade
// promotion law (T.C.A. 49-6-3115). Dates change each year, so the page points to the Tennessee Department of
// Education. No French here, so no French guide. Record: gradelings-research/tennessee/README.md.

export const TENNESSEE_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Tennessee's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Tennessee's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Tennessee's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Tennessee's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, Tennessee's math standards include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices appear in every grade of Tennessee's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of Tennessee's Academic Standards for Mathematics, adopted by the Tennessee State Board of Education in February 2021. The standards list them before the content standards, together with the literacy skills students use to read, write and talk about math.",
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
    source: "the Tennessee Department of Education",
    hubBlurb: "TCAP in English language arts, math and science (grades 3 to 8) and social studies (grades 6 to 8), plus end-of-course tests in high school.",
    name: "Tennessee's state tests (TCAP)",
    intro:
      "Tennessee students take the Tennessee Comprehensive Assessment Program (TCAP) tests each spring: English language arts, math and science in grades 3 to 8, and social studies in grades 6 to 8. In high school, students take end-of-course tests in courses such as English I and II, Algebra I and II, Geometry, Biology and US History. Younger students take reading screeners in kindergarten to 3rd grade. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts, math and science: grades 3 to 8. Social studies: grades 6 to 8. High school: end-of-course tests in courses such as English I and II, Algebra I and II, Geometry, Biology and US History. Students with the most significant cognitive disabilities may take TCAP-Alt instead." },
      { title: "When", body: "Most tests are in April and May. Grades 3 to 5 usually test on paper and grades 6 to 8 online. Each district sets its own days within the windows the state announces each year." },
      { title: "The 3rd grade promotion law", body: "Under Tennessee law (T.C.A. 49-6-3115), a 3rd grader who doesn't score Meeting or Exceeding Expectations on the English language arts test may need tutoring, summer school, a retest or a combination before moving to 4th grade, unless an exemption or appeal applies. The rules have changed several times since 2021, so ask your school what applies this year." },
      { title: "What they cover", body: "The tests check the Tennessee Academic Standards in English language arts, math, science and social studies, and the end-of-course tests check their high school courses." },
      { title: "How results are described", body: "Scores are reported in four performance levels: Below, Approaching, Met and Exceeded Expectations. Families get an individual score report from the school." },
      { title: "Report card link", body: "State test scores are reported separately from your child's report card. In grades 3 to 8, some districts count TCAP as a small part of the final grade in tested subjects, as state law allows; ask your school how it does this." },
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
        q: "What is TCAP?",
        a: "TCAP is the Tennessee Comprehensive Assessment Program, the state's yearly tests in English language arts, math and science in grades 3 to 8, social studies in grades 6 to 8, and end-of-course tests in high school.",
      },
      {
        q: "Will my child have to repeat 3rd grade because of the reading test?",
        a: "Not automatically. A 3rd grader who doesn't meet expectations on the English language arts test may be offered tutoring, summer school or a retest before moving on, and exemptions and appeals apply. Talk with your child's teacher early in the year about reading progress and what your school does.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "They are reported separately. Some districts count TCAP as a small part of the final grade in tested subjects in grades 3 to 8, so ask your school how it works there.",
      },
      {
        q: "Is there a state test in 2nd grade?",
        a: "Some districts give an optional 2nd grade test in English language arts and math. Ask your school whether it does.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Tennessee Academic Standards with kind feedback and no timers unless you want them. It isn't a copy of TCAP and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Tennessee's Voluntary Pre-K funds a pre-K year for four-year-olds in public schools and community programs. It follows the Tennessee Early Learning Developmental Standards (2018).",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Tennessee is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Science looks at materials, light and sound, living things and the weather, and social studies is about themselves, families, rules and the symbols of Tennessee and the United States. Teachers check each child's early reading with a screener.",
      lookFor: "Many Tennessee districts use standards-based report cards in the early grades. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Science covers sunlight, plants and animals, and the sun, moon and seasons, and social studies maps Tennessee and learns its symbols, leaders and holidays.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science covers pushes and pulls, how animals move and grow, and land and water, and social studies looks at Tennessee's eight neighbor states, the United States and Tennessee constitutions, and national monuments and symbols.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study matter, forces, energy and life cycles in science. Social studies is United States history from the colonies and the American Revolution to the Constitution and westward expansion, with Tennessee as the Volunteer State. It is also the first year of TCAP and the year of Tennessee's 3rd grade promotion law.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are reported separately from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers energy, waves, light, food webs, habitats and Earth's changing surface. Social studies continues United States history from the Civil War and Reconstruction through industry, the world wars, the Great Depression and the civil rights movement.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research skills.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science covers matter and mixtures, forces and motion, traits and space. Social studies is a year about Tennessee: the first Tennesseans and the Cherokee, Chickasaw and other nations, the frontier and statehood in 1796, the Civil War, TVA and the civil rights movement, Tennessee music, its three grand divisions and how the state is governed.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research on Tennessee history.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Tennessee districts. Math moves to ratios, rates, negative numbers and expressions. Science covers energy and heat, ecosystems, people's impact on the environment and climate, and social studies is world history and geography from early humans to the ancient civilizations of Mesopotamia, Egypt, India, China, Greece and Rome. Students take the TCAP social studies test for the first time.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers atoms, chemical reactions, cells, body systems and heredity, and social studies is world history and geography from the Middle Ages to the age of exploration.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers matter, forces and fields, Newton's laws, waves and natural selection, and social studies is United States history from the colonies to Reconstruction, with Tennessee's place in it: statehood, Andrew Jackson and removal, the Civil War and its three constitutions.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} is Algebra I, and English classes read and write more closely. Science covers biology, chemistry and physics topics, and social studies in ${APP_NAME} is United States Government and Civics, including how Tennessee governs itself, plus economics and personal finance, which Tennessee students must complete before they graduate.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, the end-of-course tests, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
