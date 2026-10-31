import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Oklahoma, in US English. The competencies page is the seven Mathematical Actions and Processes
// (MAPs) printed in the Oklahoma Academic Standards for Mathematics (February 2022): conceptual understanding,
// procedural fluency, problem-solving strategies, reasoning, a productive disposition, conjectures and modeling, and
// communicating mathematically. Oklahoma has no statewide SEL standards for students, and the MAPs are taught inside
// math lessons, not graded as a subject. The assessment page covers the Oklahoma School Testing Program (English
// language arts and math in grades 3 to 8, science in grades 5 and 8, in the last four weeks of the school year under
// HB 4359 (2026)) and the Strong Readers Act's reading screening in kindergarten to 3rd grade. Dates change each year, so
// the page points to the Oklahoma State Department of Education. No French here, so no French guide. Record:
// gradelings-research/oklahoma/README.md.

export const OKLAHOMA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-actions",
    label: "Mathematical Actions and Processes",
    hubBlurb: "The seven Mathematical Actions and Processes in Oklahoma's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Oklahoma's seven Mathematical Actions and Processes mean (understanding ideas deeply, computing fluently, solving problems, reasoning, sticking with it, spotting patterns and explaining), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Oklahoma's Mathematical Actions and Processes apply in every grade, from pre-kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Oklahoma's Mathematical Actions and Processes, explained for parents",
    intro:
      "Alongside the content standards for each grade, Oklahoma's math standards include seven Mathematical Actions and Processes, often called the MAPs. They describe how students should think and work when they do math: understanding why a method works, choosing a strategy, explaining their thinking and sticking with hard problems. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
    items: [
      {
        id: "understand",
        name: "1. Understand ideas deeply",
        blurb: "Knowing why math works, not only how, and connecting it to the real world.",
        parts: [
          { name: "Why it works", blurb: "Explaining what an operation means, such as multiplying as equal groups." },
          { name: "Connections", blurb: "Linking an idea to pictures, objects and everyday situations." },
        ],
        atHome: [
          "Ask “Why does that work?” about a method your child uses.",
          "Use objects like coins, pasta or blocks to show a math idea.",
        ],
      },
      {
        id: "fluency",
        name: "2. Compute accurately and flexibly",
        blurb: "Using efficient methods and getting reliable answers.",
        parts: [
          { name: "Efficient", blurb: "Knowing facts and methods well enough to use them quickly." },
          { name: "Flexible", blurb: "Choosing a method that fits the numbers, and explaining the choice." },
        ],
        atHome: [
          "Play quick fact games in the car or while cooking.",
          "Ask “Is there an easier way to work that out?”",
        ],
      },
      {
        id: "strategies",
        name: "3. Use strategies to solve problems",
        blurb: "Finding a way into a hard problem and checking that the answer makes sense.",
        parts: [
          { name: "Getting started", blurb: "Breaking a problem into parts and finding where to begin." },
          { name: "Many ways to show it", blurb: "Using drawings, tables, graphs, objects or equations." },
          { name: "Does it make sense?", blurb: "Checking an answer against the real situation." },
        ],
        atHome: [
          "Before solving a word problem, ask your child to tell you what it's about in their own words.",
          "When your child is stuck, ask “What could you try first?” instead of giving the answer.",
        ],
      },
      {
        id: "reasoning",
        name: "4. Reason and make arguments",
        blurb: "Giving reasons for an answer and making sense of someone else's thinking.",
        parts: [
          { name: "Explaining why", blurb: "Saying why an answer is right, with words, drawings or examples." },
          { name: "Weighing other ideas", blurb: "Listening to another way and deciding what works or what's wrong." },
        ],
        atHome: [
          "Ask “How do you know?” often, even when the answer is right.",
          "Solve a problem two different ways and talk about which you like and why.",
        ],
      },
      {
        id: "disposition",
        name: "5. Believe math makes sense and keep going",
        blurb: "Seeing math as useful and worth the effort, and sticking with hard problems.",
        parts: [
          { name: "Useful", blurb: "Noticing math in shopping, sports, building and cooking." },
          { name: "Resilient", blurb: "Trying again after a mistake and learning from it." },
        ],
        atHome: [
          "Praise sticking with a hard problem, not just getting it right.",
          "Share a time you used math at work or at home.",
        ],
      },
      {
        id: "patterns",
        name: "6. Spot patterns, predict and generalize",
        blurb: "Noticing patterns and structure, making predictions and turning them into rules.",
        parts: [
          { name: "Predicting", blurb: "Guessing what comes next and testing the guess." },
          { name: "Modeling", blurb: "Using a pattern, a table or an equation to describe a real situation." },
        ],
        atHome: [
          "Build a growing pattern with coins or blocks and ask what the 10th step would be.",
          "Count by 5s, 10s or 25s and ask what pattern you notice.",
        ],
      },
      {
        id: "communicate",
        name: "7. Communicate mathematically",
        blurb: "Reading, writing and talking about math with clear words.",
        parts: [
          { name: "Math words", blurb: "Using words like equal, factor, perimeter and slope correctly." },
          { name: "Translating", blurb: "Turning words into numbers and symbols, and back again." },
        ],
        atHome: [
          "Ask your child to explain a problem to you as if you were the student.",
          "Ask your child to include the units: 5 feet, 3 hours, $2.50.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Mathematical Actions and Processes graded?",
        a: "No, not as a subject of their own. Teachers build them into math lessons, and some report cards comment on problem solving or explaining thinking, but they are not graded separately.",
      },
      {
        q: "Are they the same in every grade?",
        a: "Yes. The same seven actions and processes appear across every grade of Oklahoma's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the Oklahoma Academic Standards for Mathematics, published in February 2022 and taught in classrooms since fall 2023. They draw on national guidance about how students learn math well.",
      },
      {
        q: `Does ${APP_NAME} measure the Mathematical Actions and Processes?`,
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
    source: "the Oklahoma State Department of Education",
    hubBlurb: "OSTP tests in English language arts and math (grades 3 to 8) and science (grades 5 and 8), plus reading screening in kindergarten to 3rd grade.",
    name: "Oklahoma's state tests (OSTP)",
    intro:
      "Oklahoma students take the Oklahoma School Testing Program (OSTP) tests near the end of each school year: English language arts and math in grades 3 to 8, and science in grades 5 and 8. In high school, students take a college- and career-readiness test in 11th grade with science and US history tests. Younger students are screened in reading three times a year in kindergarten to 3rd grade. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 8. Science: grades 5 and 8. High school: a college- and career-readiness test in 11th grade, with science and US history. Students with the most significant cognitive disabilities may take the Oklahoma Alternate Assessment instead." },
      { title: "When", body: "Under a 2026 state law, the tests are given in the last four weeks of each district's school year, so the exact days depend on your district's calendar." },
      { title: "Reading in kindergarten to 3rd grade", body: "Under the Strong Readers Act, schools screen reading three times a year in kindergarten to 3rd grade, tell families the results, and write a reading plan for a child who needs extra help. A 3rd grader who isn't reading on grade level may need more support before moving to 4th grade, with exemptions in some cases. The rules were strengthened in 2026, so ask your school what applies this year." },
      { title: "What they cover", body: "The tests check the Oklahoma Academic Standards in English language arts, math and science." },
      { title: "How results are described", body: "Scores are reported in four performance levels: Below Basic, Basic, Proficient and Advanced. Families get an individual score report from the school." },
      { title: "Report card link", body: "State test scores are reported separately from your child's report card. Your child's teacher decides the marks on the report card from classwork all year." },
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
        q: "What is OSTP?",
        a: "OSTP is the Oklahoma School Testing Program, the state's yearly tests in English language arts and math in grades 3 to 8, science in grades 5 and 8, and the college- and career-readiness tests in high school.",
      },
      {
        q: "Will my child have to repeat 3rd grade because of reading?",
        a: "Not automatically. Under the Strong Readers Act, a 3rd grader who isn't reading on grade level gets extra support, and exemptions apply in some cases. Talk with your child's teacher early in the year about reading screener results and what your school does.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are reported separately in an individual score report.",
      },
      {
        q: "When are the tests this year?",
        a: "In the last four weeks of your district's school year. Your school will share the exact days.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Oklahoma Academic Standards with kind feedback and no timers unless you want them. It isn't a copy of OSTP and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Oklahoma offers free public pre-K for four-year-olds in nearly every school district. The Oklahoma Academic Standards include pre-kindergarten standards in every subject.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Oklahoma is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Science looks at pushes and pulls, sunlight, weather and what living things need, and social studies is about families, school, needs and wants, simple maps and the symbols of the United States. Teachers screen each child's early reading three times a year.",
      lookFor: "Many Oklahoma districts use standards-based report cards in the early grades. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value to 120. Science covers light and sound, how plants and animals grow, and the sun, moon and stars, and social studies is about our nation's government, symbols and motto, maps and globes, and earning, spending and saving.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers to 1,000, adding and subtracting within 100, money and time. Science covers materials, plants and habitats, and how land and water change, and social studies looks at the principles of our government, Tribal governments, notable Americans, maps of the continents and oceans, and supply and demand.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study forces, life cycles, fossils and weather in science. Social studies is Oklahoma studies: the state's symbols and government, its land and maps, its first peoples and Tribal nations, the land runs and statehood, and its economy. It is also the first year of OSTP and the last year of reading screening under the Strong Readers Act.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are reported separately from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers energy, waves, light, how animals sense and respond, and Earth's changing surface and resources. Social studies is the geography of the United States and its early history: its regions, states and capitals, the American Indian cultures before European exploration, the explorers, and how a market economy works.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and map skills.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science covers matter, gravity, ecosystems and the sun and stars, and students take the OSTP science test. Social studies is United States history from the Native nations before English settlement and the thirteen colonies to the Revolution, the Constitution and the first presidents.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and research skills.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Oklahoma districts. Math moves to ratios, rates, negative numbers and expressions. Science covers Earth's surface and history, weather and climate, cells and body systems, and thermal energy, and social studies is the geography of the Western Hemisphere: its landforms, climates, countries, cultures, governments and economies.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers atoms and chemical reactions, energy, ecosystems and people's use of Earth's resources, and social studies is the geography of the Eastern Hemisphere: Europe, Africa, Asia and Oceania, their peoples, religions, governments and economies.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math is Pre-Algebra: linear equations, functions and the Pythagorean theorem. Science covers forces, waves, space, heredity and natural selection, and students take the OSTP science test. Social studies is United States history from 1754 to 1877, from the French and Indian War and the Revolution to the Constitution, westward expansion, the Civil War and Reconstruction.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} is Algebra 1, and English classes read and write more closely. Science covers physical science and biology, and social studies in ${APP_NAME} is Oklahoma History and Government and United States Government, the two half-year courses Oklahoma students need to graduate.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
