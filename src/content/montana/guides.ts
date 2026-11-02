import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Montana, in US English. The competencies page is the Montana Standards for Mathematical
// Practice, the seven practices in the Montana Content Standards for Mathematics (adopted 2025, used from 2026):
// problem solve and persevere, abstract and generalize, justify and prove, model with mathematics, represent,
// collaborate mathematically and culturally connect. Practices 2 to 6 are adapted from the NAEP framework; 1 and 7 are
// Montana's own. They are taught inside math lessons, not graded as a subject. The assessment page covers MAST
// (Montana Aligned to Standards Through-Year: English language arts and math, grades 3 to 8, short testlets through the
// year, four levels), the Montana Science Assessment (grades 5 and 8), the ACT in grade 11 and the alternate
// assessments. Dates change each year, so the page points to the Montana Office of Public Instruction (OPI). No French
// here, so no French guide. Record: gradelings-research/montana/README.md.

export const MONTANA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The seven Mathematical Practices in Montana's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Montana's seven Mathematical Practices mean (problem solving, finding patterns, proving, modeling, representing, working together and seeing math in cultures, including Montana's Tribal Nations), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Montana's Mathematical Practices apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Montana's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, the Montana Content Standards for Mathematics include seven Mathematical Practices. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining and proving their thinking, and working with others. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
    items: [
      {
        id: "persevere",
        name: "1. Problem solve and persevere",
        blurb: "Making a plan, checking progress and sticking with a problem when it's hard.",
        parts: [
          { name: "Plan", blurb: "Making a guess, choosing a strategy and following it." },
          { name: "Check", blurb: "Asking whether the work is accurate and the answer makes sense." },
          { name: "Keep going", blurb: "Trying another way, and valuing other people's approaches." },
        ],
        atHome: [
          "Before solving a word problem, ask your child to tell you what it's about in their own words.",
          "When your child is stuck, ask “What could you try first?” instead of giving the answer.",
          "Praise sticking with a hard problem, not just getting it right.",
        ],
      },
      {
        id: "generalize",
        name: "2. Abstract and generalize",
        blurb: "Turning a situation into numbers and symbols, and spotting patterns and rules.",
        parts: [
          { name: "Numbers mean something", blurb: "Writing a real situation as numbers or an equation, and knowing what each part stands for." },
          { name: "Patterns", blurb: "Noticing repeats and structure, like 8 × 7 being 8 × 5 plus 8 × 2, and turning them into rules." },
        ],
        atHome: [
          "Ask what an answer means: “So 12 what? Twelve cookies or twelve dollars?”",
          "Count by 5s, 10s or 25s and ask what pattern you notice.",
        ],
      },
      {
        id: "justify",
        name: "3. Justify and prove",
        blurb: "Showing why an answer is right, and checking whether a claim holds up.",
        parts: [
          { name: "Explaining", blurb: "Saying why, with words, drawings or examples." },
          { name: "Testing claims", blurb: "Looking for an example that proves a claim wrong, or reasons it is always true." },
        ],
        atHome: [
          "Ask “How do you know?” often, even when the answer is right.",
          "Make a claim (“odd plus odd is always odd”) and let your child test it.",
        ],
      },
      {
        id: "model",
        name: "4. Model with mathematics",
        blurb: "Using math to describe and solve real problems.",
        parts: [
          { name: "Real problems", blurb: "Finding the question in a situation and turning it into math." },
          { name: "Good enough", blurb: "Making sensible assumptions, checking the result and improving the model." },
        ],
        atHome: [
          "Plan a trip, a recipe or a budget together and let your child do the math.",
          "Look at a graph in the news or a sports page and talk about what it shows.",
        ],
      },
      {
        id: "represent",
        name: "5. Represent",
        blurb: "Showing an idea as a drawing, a table, a graph, an equation or with objects.",
        parts: [
          { name: "Many ways", blurb: "Knowing one idea can be shown several ways, such as ½, 0.5 and half a pie." },
          { name: "Choosing tools", blurb: "Picking a ruler, number line, blocks or technology that fits the job." },
        ],
        atHome: [
          "Ask your child to show a problem with a drawing or with coins before solving it.",
          "Measure things around the house with a ruler or measuring cups.",
        ],
      },
      {
        id: "collaborate",
        name: "6. Collaborate mathematically",
        blurb: "Working on math with others: sharing ideas, debating them and building on them.",
        parts: [
          { name: "Sharing", blurb: "Offering an idea and explaining it to others." },
          { name: "Listening", blurb: "Building on other people's ideas and appreciating other ways of thinking." },
        ],
        atHome: [
          "Solve a puzzle together and take turns explaining your ideas.",
          "Solve a problem two different ways and talk about which you like and why.",
        ],
      },
      {
        id: "culture",
        name: "7. Culturally connect",
        blurb: "Seeing how math belongs to many cultures, including those of Montana's Tribal Nations.",
        parts: [
          { name: "Math everywhere", blurb: "Recognizing math in cooking, building, games, art and traditions." },
          { name: "Many contributions", blurb: "Knowing that people of many cultures, including Montana's Indigenous peoples, have built and used math." },
        ],
        atHome: [
          "Look for math in family traditions: doubling a recipe, a quilt or beadwork pattern, a building project.",
          "Ask your child where they see math in their community.",
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
        a: "Yes. The same seven practices apply in every grade. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the Montana Content Standards for Mathematics, adopted in 2025 and used in schools from 2026. Practices 2 to 6 are adapted from the National Assessment of Educational Progress (NAEP) framework, and practices 1 and 7 were written for Montana.",
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
    slug: "mast-tests",
    short: "MAST",
    source: "the Montana Office of Public Instruction",
    hubBlurb: "MAST in English language arts and math (grades 3 to 8), the Montana Science Assessment (grades 5 and 8) and the ACT in grade 11.",
    name: "Montana state tests (MAST and science)",
    intro:
      "Montana students take MAST (Montana Aligned to Standards Through-Year) in English language arts and math in grades 3 to 8. Instead of one long test in spring, MAST is a set of short tests, called testlets, given during the school year. Students also take the Montana Science Assessment in grades 5 and 8, and 11th graders take the ACT at school. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math (MAST): grades 3 to 8. Science (Montana Science Assessment): grades 5 and 8. ACT: grade 11. Students with the most significant cognitive disabilities may take an alternate assessment instead." },
      { title: "When", body: "MAST testlets are given at several points during the school year, and the science test in spring. Each school sets its own testing days within the windows the Montana Office of Public Instruction announces each year." },
      { title: "What they cover", body: "MAST checks the Montana content standards in English language arts and math, a few standards at a time. The science test checks the Montana Science Content Standards. The tests are given on a computer." },
      { title: "How results are described", body: "Results come in four levels: Novice, Nearing Proficient, Proficient and Advanced. Proficient and Advanced meet the state's expectation. Teachers also get testlet reports during the year to help plan lessons. The 2024–25 school year was the first full year of MAST, so its results are a new starting point." },
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
        q: "What is MAST?",
        a: "MAST stands for Montana Aligned to Standards Through-Year. It is Montana's English language arts and math test for grades 3 to 8, given as several short testlets during the school year instead of one long test at the end.",
      },
      {
        q: "What do the four levels mean?",
        a: "Novice means a beginning understanding of the grade's standards, Nearing Proficient a partial one, Proficient a solid one and Advanced a deep one. They describe tests on a few days, not everything your child knows.",
      },
      {
        q: "Which grades take the science test?",
        a: "The Montana Science Assessment is given in grades 5 and 8.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts and science skills in Montana's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Montana is the year before kindergarten, for children who are 4. Montana's public preschool and Head Start programs follow the Montana Early Learning Standards. Children learn through play, stories and songs: counting, shapes and patterns, letters and rhymes, plus first ideas about family, community, weather and living things.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for counting small groups, naming letters, hearing rhymes, taking turns and talking about feelings.",
    },
    k: {
      overview: "Kindergarten in Montana is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about past, present and future, classroom rules and the people who make them, and the goods made in Montana.",
      lookFor: "Many Montana districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies covers Montana's landmarks and simple maps, needs and wants, goods made nearby, and how the same event can be told from different points of view, including those of Montana's Tribal Nations.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies introduces the twelve Tribal Nations of Montana and the seven reservations, the people who help govern communities, and how life has changed.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, and start multiplication, division and fractions. Social studies looks at the Tribal Nations of Montana by their own names, local and Tribal government and voting, symbols of nations, and the land and peoples of the Americas. It is also the first year of the MAST state tests.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is a year of Montana studies: the Tribal Nations and their homelands, how Montana is governed and what tribal sovereignty means, Montana's land and economy, and its history from Lewis and Clark to today.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and map and research skills.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies covers the regions of the United States, the colonies, the Revolution and the Constitution, treaties and the sovereignty of Montana's Tribal Nations, and money, saving and interest. Students also take the science test this year.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Montana districts. Math moves to ratios, rates, negative numbers and expressions. Science covers weather, climate and how living things grow, and social studies looks at world regions such as Latin America and Europe, early civilizations of the Americas, cultures, beliefs and economies.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies continues with regions such as Africa and Asia, population and migration, economic systems and forms of government.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies covers Montana's story from first contact to today (the copper era, the Tribal Nations and the 1972 Montana Constitution) alongside the founding documents and US history to Reconstruction. Students take the science test this year.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} is civics and government: how Montana governs itself under its 1972 constitution, the foundations of tribal sovereignty in Montana, the US government, rights and the economy.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
