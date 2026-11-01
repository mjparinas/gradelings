import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Idaho, in US English. The competencies page is the Standards for Mathematical Practice, the
// eight habits of mind printed for every grade in the Idaho Content Standards for Mathematics (2022): making sense of
// problems, reasoning, arguing and critiquing, modeling, using tools, precision, structure and repeated reasoning. They
// are taught inside math lessons, not graded as a subject of their own. The assessment page covers the Idaho Standards
// Achievement Test (ISAT: English language arts and math in grades 3 to 8 and 11, science in grades 5, 8 and 11, with
// four achievement levels) and the Idaho Reading Indicator (Kindergarten to 3rd grade, fall and spring, three levels),
// from the Department's pages and family guides in gradelings-research/idaho/source/. No French here, so no French guide.

export const IDAHO_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Idaho's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Idaho's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Idaho's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Idaho's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, the Idaho Content Standards for Mathematics include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices apply in every grade of Idaho's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the Idaho Content Standards for Mathematics, which took effect in 2022. The standards document prints them for every grade, just before that grade's content standards.",
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
    slug: "isat",
    short: "the ISAT",
    source: "the Idaho Department of Education",
    hubBlurb: "The Idaho Standards Achievement Test (ISAT) in English language arts, math and science, and the Idaho Reading Indicator in Kindergarten to 3rd grade.",
    name: "Idaho state tests (the ISAT and the IRI)",
    intro:
      "Idaho students take the Idaho Standards Achievement Test (ISAT) each spring. It covers English language arts and math in grades 3 to 8 and 11, and science in grades 5, 8 and 11. In Kindergarten to 3rd grade, children also take the Idaho Reading Indicator (IRI), a short check of early reading skills, in the fall and spring. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "ISAT English language arts and math: grades 3 to 8 and 11. ISAT science: grades 5, 8 and 11. IRI: every child in Kindergarten to 3rd grade in Idaho's public schools." },
      { title: "When", body: "The ISAT is given each spring, from March to May, in a window the Idaho Department of Education sets. The IRI is given in September and again in May." },
      { title: "What they cover", body: "The ISAT checks the Idaho Content Standards in English language arts, math and science. The IRI checks early reading skills, and it helps schools find children who may need extra reading help or who may be at risk for dyslexia." },
      { title: "How results are described", body: "ISAT scores come in four achievement levels: Level 4 exceeded the standards, Level 3 met them, Level 2 nearly met them and Level 1 has not met them yet. IRI scores come in three levels: at grade level, near or below grade level, and well below grade level." },
      { title: "Report card link", body: "The ISAT is not meant to change your child's report card or whether they move up a grade. It is one more snapshot for families, teachers and schools." },
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
        q: "What do the four ISAT levels mean?",
        a: "Level 1 means your child has not met the grade's achievement standards yet, Level 2 that they nearly met them, Level 3 that they met them and Level 4 that they exceeded them. The score report also shows how scores compare with the school, the district and the state.",
      },
      {
        q: "What is the Idaho Reading Indicator?",
        a: "A short reading check for every child in Kindergarten to 3rd grade, in the fall and the spring. It looks at skills like letter sounds, reading words and reading aloud smoothly. If your child scores near or below grade level, ask the teacher what reading help the school gives and how you can read together at home.",
      },
      {
        q: "Can my child practice for the ISAT?",
        a: "Yes. The Idaho Department of Education links free ISAT practice tests on its website, so children can see what the questions look like before test day.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school or district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Idaho Content Standards with kind feedback and no timers unless you want them. It isn't a copy of the ISAT and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Idaho is the year before kindergarten, for children around 4. Programs vary, from school districts to Head Start and child care, and follow the Idaho Early Learning eGuidelines: approaches to learning, social and emotional growth, language and literacy, math, science, social studies and creative arts.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Idaho is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about themselves, their families and school, where things are, jobs in the community, and the flag, the Pledge and holidays. Children take the Idaho Reading Indicator in the fall and spring.",
      lookFor: "Many Idaho districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies covers families then and now, maps of the community and Idaho, and needs and wants.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, habitats and how land changes, and social studies covers the five tribes in Idaho, how people use Idaho's land and resources, and Idaho's constitution and leaders.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, and start multiplication, division and fractions. Social studies looks at the history of their own community, migration and immigration, and how local government works. It is also the first year of the ISAT in English language arts and math, and the last year of the Idaho Reading Indicator.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. Ask how reading checks are going. ISAT scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is Idaho's own story: the five tribes in Idaho, Lewis and Clark, fur traders, gold rushes and statehood, treaties and conflicts over land, Idaho's regions and economy, and how Idaho governs itself.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Idaho topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies covers the colonies, the American Revolution and the Constitution, the regions of the United States, and the difference between reservations, state lands and federal public lands in Idaho. Students take the ISAT in science as well as English language arts and math.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. ISAT scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Idaho districts. Math moves to ratios, rates, negative numbers and expressions. Science covers cells and body systems, light and waves, and Earth's surface, resources and history, and social studies covers the first civilizations, ancient Greece, Rome, China and the Americas, medieval times and the age of exploration.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers forces, fields and energy, ecosystems and biodiversity, and space, and social studies covers the regions of the world, their governments and religions, revolutions, and Idaho's place in a connected world.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers atoms and reactions, heredity and growth, and weather and climate, and social studies is United States history, from the Revolution and the Constitution to the Civil War and Reconstruction, including how Idaho went from territory to state. Students take the ISAT in science again.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} covers American government and economics, including how Idaho governs itself under its 1889 constitution and the sovereignty of the five tribes in Idaho, plus personal finance.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
