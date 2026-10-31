import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Arizona, in US English. The competencies page is the Standards for Mathematical Practice, the
// eight habits of mind printed in every grade of Arizona's Mathematics Standards (2016, "4.MP.1" to "4.MP.8"): making
// sense of problems, reasoning, arguing and critiquing, modeling, using tools, precision, structure and repeated
// reasoning. They are taught inside math lessons, not graded as a subject of their own. The assessment page covers AASA
// (English language arts and math, grades 3 to 8), AzSCI (science, grades 5, 8 and 11) and ACT Aspire (grade 9), from the
// Arizona Department of Education's 2026-27 assessments overview; dates change each year, so the page points to the
// department. No French here, so no French guide. Record: gradelings-research/arizona/README.md.

export const ARIZONA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Arizona's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Arizona's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Arizona's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Arizona's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, Arizona's Mathematics Standards include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices appear in every grade of Arizona's Mathematics Standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of Arizona's Mathematics Standards, adopted by the Arizona State Board of Education in 2016. Each grade's standards document lists them before the content standards.",
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
    source: "the Arizona Department of Education",
    hubBlurb: "AASA in English language arts and math (grades 3 to 8), AzSCI in science (grades 5, 8 and 11) and ACT Aspire in 9th grade.",
    name: "Arizona state tests (AASA and AzSCI)",
    intro:
      "Arizona students take state tests in the spring: the Arizona Academic Standards Assessment (AASA) in English language arts and math in grades 3 to 8, the Arizona Science Test (AzSCI) in grades 5, 8 and 11, and ACT Aspire in 9th grade. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8", "9"],
    facts: [
      { title: "Who takes them", body: "English language arts and math (AASA): grades 3 to 8. Science (AzSCI): grades 5, 8 and 11. ACT Aspire: 9th grade, and the ACT with Writing in 11th grade. Students with significant cognitive disabilities may take an alternate assessment instead." },
      { title: "When", body: "The tests are given in spring windows that the Arizona Department of Education sets each year. Each school picks its own dates within the window." },
      { title: "What they cover", body: "AASA checks Arizona's English language arts and mathematics standards, including writing, and AzSCI checks the Arizona Science Standards. Some standards are marked essential and get more questions." },
      { title: "How results are described", body: "Scores are reported as proficiency levels compared with state expectations. Families get a score report from the school. Results also count toward each school's A to F letter grade." },
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
        q: "What is AASA?",
        a: "AASA (the Arizona Academic Standards Assessment) is Arizona's state test in English language arts and math for grades 3 to 8. It is given in the spring and includes a writing part.",
      },
      {
        q: "Which grades take the science test?",
        a: "AzSCI, the Arizona Science Test, is given in grades 5, 8 and 11.",
      },
      {
        q: "What happens in 9th grade?",
        a: "Arizona 9th graders take ACT Aspire, a test of English, reading, math, science and writing that helps schools see readiness for high school courses and the ACT in 11th grade.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school chooses.",
      },
      {
        q: "Can my child skip the state tests?",
        a: "Ask your school. Federal law expects nearly all students to take the state tests, and schools can explain their own policy and what happens if a family asks for their child not to test.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts and science skills in Arizona's academic standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Arizona's preschool year for four-year-olds runs in district, Head Start and Quality First programs. It follows the Arizona Early Learning Standards, 4th edition.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Arizona is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they are \"children as citizens\": learning about themselves, families, rules, leaders and American symbols.",
      lookFor: "Many Arizona schools use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas. Under Move On When Reading, schools also check early reading skills during the year.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, learn place value up to 120, tell time and count coins. Social studies is about communities: maps, rules, local government, jobs and how people save and spend.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at matter and heat, wind and water, and living things, and social studies is \"the world around me\": continents, world cultures and how people trade.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study Arizona: its land and water, its history from the Hohokam to statehood, its 22 Indian Nations today, and how Arizona is governed and earns its living. It is also the first year of AASA, and of Move On When Reading's end-of-3rd-grade reading check.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers energy, electricity, magnets and Earth's changing surface, and social studies is the regions and cultures of the Americas, from early civilizations to the colonies.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and using maps and sources.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is United States history from the American Revolution to the industrial age, and students take AzSCI, the state science test.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Arizona districts. Math moves to ratios, rates, negative numbers and expressions. Science covers atoms, energy, the solar system and ecosystems, and social studies is the Eastern Hemisphere, from the first farmers to the Renaissance.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers cells, body systems, Newton's laws and plate tectonics, and social studies is integrated global studies, from the Enlightenment and the Industrial Revolution to the world wars and the world today.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers chemical reactions, waves, heredity and Earth's history, and social studies is citizenship and civic engagement: the founding documents, rights, elections, media, personal finance and economics. Students also take AzSCI.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school, and the year of ACT Aspire. Math in ${APP_NAME} covers Algebra 1 (expressions, equations, functions and data), and English classes read and write more closely. Social studies covers civics and government, including the Arizona Constitution, Arizona's state, local and tribal governments, and practice for the American civics test Arizona students pass to graduate.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
