import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for New Mexico, in US English. The competencies page is the Standards for Mathematical Practice, the
// eight habits of mind printed at the front of New Mexico's mathematics standards (the Common Core, adopted 2010 and
// written into rule as 6.29.14 NMAC): making sense of problems, reasoning, arguing and critiquing, modeling, using tools,
// precision, structure and repeated reasoning. They are taught inside math lessons, not graded as a subject of their
// own. The assessment page covers the New Mexico Measures of Student Success and Achievement (NM-MSSA, language arts and
// math, grades 3 to 8), the New Mexico Assessment of Science Readiness (NM-ASR, grades 5, 8 and 11) and the SAT in
// grade 11, from the Public Education Department's NM-ASR fact sheet and Cognia's 2026 NM-MSSA family guide (both in
// gradelings-research/new-mexico/source); dates change each year, so the page points to the department. No French here, so no
// French guide. Record: gradelings-research/new-mexico/README.md.

export const NEW_MEXICO_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in New Mexico's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What New Mexico's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "New Mexico's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "New Mexico's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, New Mexico's mathematics standards include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices apply in every grade of New Mexico's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of New Mexico's mathematics standards, the Common Core standards New Mexico adopted in 2010. The standards document lists them first, before the grade-by-grade content standards.",
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
    source: "the New Mexico Public Education Department",
    hubBlurb: "NM-MSSA in language arts and math (grades 3 to 8) and the NM-ASR science test (grades 5, 8 and 11).",
    name: "New Mexico state tests (NM-MSSA, NM-ASR and SAT)",
    intro:
      "New Mexico students take state tests each spring. The New Mexico Measures of Student Success and Achievement (NM-MSSA) covers language arts and math in grades 3 to 8, and the New Mexico Assessment of Science Readiness (NM-ASR) is given in grades 5, 8 and 11. Eleventh graders also take the SAT. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "NM-MSSA language arts and math: grades 3 to 8. NM-ASR science: grades 5, 8 and 11, with a Spanish version for eligible English learners. SAT: grade 11. Students with the most significant cognitive disabilities may take an alternate assessment instead, and English learners also take the ACCESS English language test." },
      { title: "When", body: "In spring, in windows the Public Education Department sets in its testing calendar each year. Each school sets its own days within them." },
      { title: "The early grades", body: "In kindergarten to 2nd grade there are no state tests, but schools check early reading during the year to plan extra help, and New Mexico screens 1st graders for signs of dyslexia. These checks aren't graded." },
      { title: "What they cover", body: "NM-MSSA checks New Mexico's language arts and math standards (the Common Core). NM-ASR checks the New Mexico STEM Ready! Science Standards, asking students to explain things they observe and solve problems." },
      { title: "How results are described", body: "Each score falls in one of four levels: Novice, Nearing Proficiency, Proficient and Advanced. Proficient and Advanced mean meeting grade-level standards. NM-MSSA reports also give a Lexile reading measure and a Quantile math measure. Families can see reports through the state's parent portals or from their school." },
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
        q: "What is the NM-MSSA?",
        a: "The New Mexico Measures of Student Success and Achievement is New Mexico's state test in language arts and math for grades 3 to 8. It is given on a computer in the spring and checks the grade's standards.",
      },
      {
        q: "What do the four levels mean?",
        a: "Novice and Nearing Proficiency mean a student is still working toward the grade's standards. Proficient means meeting them, and Advanced means going beyond them. The NM-ASR science test reports the same four levels.",
      },
      {
        q: "What are the Lexile and Quantile scores on the report?",
        a: "They are measures that match your child's reading (Lexile) and math (Quantile) to books and skills of about the right difficulty. You can use the Lexile measure to find books that are a good fit.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school or district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, language arts, science and social studies skills in New Mexico's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in New Mexico is the year before kindergarten, for children who are 4 by September 1. New Mexico PreK is offered in public schools and community programs, and follows the New Mexico Early Learning Standards. Children learn through play, stories and songs: counting, shapes and patterns, letters and rhymes, plus first ideas about family, community and the world around them.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for counting small groups, naming letters, hearing rhymes, taking turns and talking about feelings.",
    },
    k: {
      overview: "Kindergarten in New Mexico is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about themselves, families, rules, community leaders (including Tribal leaders), and local, state and national symbols such as New Mexico's Zia sun flag.",
      lookFor: "Many New Mexico districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies compares life in New Mexico long ago and today, and covers maps, community helpers and cultures in the community. New Mexico also screens 1st graders for signs of dyslexia.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies covers national identity: leaders and citizens, symbols, Tribal, local, state and national government, and the journeys that brought people to New Mexico.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and spend social studies on global immigration and migration: why people move, world maps and cultures, and the removal and return of Indigenous people in New Mexico, such as the Long Walk. It is also the first year of NM-MSSA tests in language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is New Mexico history and geography: the four provinces and the Rio Grande, the Pueblos, the Navajo Nation and Apache nations, Spanish settlers and El Camino Real, statehood in 1912 and the state's symbols, oil, chile, science labs and trade with Mexico, New Mexicans who stood up for fairness, and how the state is governed.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on New Mexico topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is United States history and government, from Native peoples and European exploration to the colonies, the Revolution and the Constitution, and students take the NM-ASR science test as well as NM-MSSA.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many New Mexico districts. Math moves to ratios, rates, negative numbers and expressions. Science covers energy, cells and weather, and social studies is world history up to about 1300: the first farmers, river valley civilizations, Greece, Rome, India and China, world beliefs and trade.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies is New Mexico history: the earliest New Mexicans, Chaco Canyon and the Mogollon, the Diné and Apache peoples, Spanish colonial New Mexico and the Pueblo Revolt, the Mexican period, and the US territory up to statehood.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is United States history to 1920, including New Mexico's part in it: the war with Mexico and the Treaty of Guadalupe Hidalgo, the Civil War at Glorieta Pass and the Long Walk. Students take NM-MSSA and the NM-ASR science test.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} covers civics and economics, including how New Mexico governs itself under its 1911 constitution, plus personal finance, which New Mexico's high school economics standards include.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
