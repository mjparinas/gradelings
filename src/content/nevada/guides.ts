import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Nevada, in US English. The competencies page is the Standards for Mathematical Practice, the
// eight habits of mind printed at the front of the Nevada Academic Content Standards for Mathematics (the Common Core,
// adopted 2010): making sense of problems, reasoning, arguing and critiquing, modeling, using tools, precision, structure
// and repeated reasoning. They are taught inside math lessons, not graded as a subject of their own. The assessment page
// covers Smarter Balanced (English language arts and math, grades 3 to 8), the Nevada Science Assessment (grades 5, 8
// and high school), the ACT (grade 11), i-Ready reading checks in Kindergarten to Grade 3 and the Read by Grade 3 law,
// from the Nevada Department of Education's 2026-27 assessment calendar, its score report guides and NRS 392.750 to
// 392.785; dates change each year, so the page points to the department. No French here, so no French guide. Record:
// docs/research/nevada/README.md.

export const NEVADA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Nevada's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Nevada's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Nevada's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Nevada's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, the Nevada Academic Content Standards for Mathematics include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices apply in every grade of Nevada's math standards. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the Nevada Academic Content Standards for Mathematics, the Common Core standards Nevada adopted in 2010. The standards document lists them first, before the grade-by-grade content standards.",
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
    source: "the Nevada Department of Education",
    hubBlurb: "Smarter Balanced in English language arts and math (grades 3 to 8) and the Nevada Science Assessment (grades 5 and 8).",
    name: "Nevada state tests (Smarter Balanced, Science and ACT)",
    intro:
      "Nevada students take state tests each spring. The Smarter Balanced Summative Assessment covers English language arts and math in grades 3 to 8, and the Nevada Science Assessment is given in grades 5 and 8 and once in high school. Eleventh graders take the ACT. In Kindergarten to 3rd grade, schools also check reading with i-Ready. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "Smarter Balanced English language arts and math: grades 3 to 8. Nevada Science Assessment: grades 5 and 8, and once in high school. ACT: grade 11. Students with the most significant cognitive disabilities may take the Nevada Alternate Assessment instead, and English learners also take the WIDA English language test." },
      { title: "When", body: "In spring, in windows the Nevada Department of Education sets each year (for 2026-27, Smarter Balanced and science run from March 9 to May 4). Each school sets its own days within them." },
      { title: "The early grades", body: "In Kindergarten to 3rd grade, schools check reading with i-Ready two or three times a year to see how children are doing and plan extra help. Kindergartners also have an entry check at the start of the year. They aren't graded." },
      { title: "What they cover", body: "Smarter Balanced checks the Nevada Academic Content Standards in English language arts and math, with questions that ask students to explain their thinking and a writing task. The science test checks the Nevada science standards." },
      { title: "How results are described", body: "Each score falls in one of four achievement levels: Level 1 (Minimal Understanding), Level 2 (Partial Understanding), Level 3 (Proficient) and Level 4 (Advanced). Levels 3 and 4 mean meeting grade-level standards. Families get a score report, and school results are published on the Nevada Report Card website." },
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
        q: "What is Smarter Balanced?",
        a: "The Smarter Balanced Summative Assessment is Nevada's state test in English language arts and math for grades 3 to 8. It is given online in the spring, and it adapts to each student, getting harder or easier as they answer.",
      },
      {
        q: "What do the four achievement levels mean?",
        a: "Level 1 (Minimal Understanding) and Level 2 (Partial Understanding) mean a student is still working toward the grade's standards. Level 3 (Proficient) means meeting them, and Level 4 (Advanced) means going beyond them. The science test reports the same four levels.",
      },
      {
        q: "What is Nevada's Read by Grade 3 law?",
        a: "Schools check reading often in Kindergarten to 3rd grade and give a child who needs it a plan with extra reading help. Under a law that takes effect on July 1, 2028, a 3rd grader who doesn't reach the passing reading score on a state test must repeat 3rd grade, unless an alternative test or a good-cause exemption allows promotion. Until then, the school decides with you whether holding a child back would help. Ask your school how it shares reading results.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school or district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Nevada Academic Content Standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Nevada's state-funded pre-K year runs in school districts and community programs for four-year-olds. It follows the Nevada Pre-Kindergarten Standards, revised in 2023.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Nevada is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies (Building Community) they learn about themselves, families, rules, fairness, the American flag and Nevada's symbols. Schools also check reading with i-Ready.",
      lookFor: "Many Nevada districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies (the Community We Live In and the Work We Do) covers life long ago and today, maps of the community, community helpers and what local government does.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies (Our National Identity and Culture) covers leaders and citizens, national symbols and landmarks, and how communities use natural resources.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and spend social studies on Movement Around Our World: why people migrate, world maps and cultures, and the newcomers who have shaped Nevada. It is also the first year of Smarter Balanced tests in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. Ask about reading checks under the Read by Grade 3 law. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is Nevada Past and Present: the Great Basin and its land, the Paiute, Shoshone and Washoe peoples, the Comstock Lode and statehood in 1864, Hoover Dam, mining and tourism, Nevadans who stood up for fairness, and how the state is governed.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Nevada topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is the U.S., Creating a New Nation, from Native peoples and European exploration to the colonies, the Revolution and the Constitution, and students take the Nevada Science Assessment as well as Smarter Balanced.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Nevada districts. Math moves to ratios, rates, negative numbers and expressions. Science covers energy, cells and weather, and social studies in Nevada's middle school standards includes Early World Civilizations: the first farmers, river valley civilizations, Greece, Rome, India and China, world beliefs and trade.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies in Nevada's middle school standards includes World Geography and Global Studies: world regions, cultures, governments and economies, and Nevada's place in the world.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is Early U.S. History and Civic Ideals, from the Constitution to Reconstruction, including Nevada's part in it: the emigrant trails, the Comstock Lode and statehood during the Civil War. Students take Smarter Balanced and the Nevada Science Assessment.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} covers civics and economics, including how Nevada governs itself under its 1864 constitution, plus financial literacy, which Nevada's high school standards include.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
