import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Connecticut, in US English. The competencies page is the Standards for Mathematical Practice,
// the eight habits of mind printed in the Connecticut Core Standards for Mathematics: making sense of problems,
// reasoning, arguing and critiquing, modeling, using tools, precision, structure and repeated reasoning. They are taught
// inside math lessons, not graded as a subject. The assessment page covers the Smarter Balanced tests (English language
// arts and math, grades 3 to 8, four achievement levels), the Next Generation Science Assessment (grades 5, 8 and 11),
// the SAT School Day in grade 11 and the Connecticut Alternate Assessment. Dates change each year, so the page points to
// the Connecticut State Department of Education (CSDE). No French here, so no French guide. Record:
// gradelings-research/connecticut/README.md.

export const CONNECTICUT_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "math-practices",
    label: "Mathematical Practices",
    hubBlurb: "The eight Standards for Mathematical Practice in Connecticut's math standards, the habits of a good problem solver, in plain words.",
    description:
      "What Connecticut's eight Standards for Mathematical Practice mean (making sense of problems, reasoning, explaining, modeling, using tools, being precise and spotting patterns), how they show up in math class, and simple ways to support them at home.",
    gradeLine: "Connecticut's Standards for Mathematical Practice apply in every grade, from kindergarten to high school.",
    closing: "these habits grow through talking about problems together, not only through right answers.",
    title: "Connecticut's Mathematical Practices, explained for parents",
    intro:
      "Alongside the content standards for each grade, the Connecticut Core Standards for Mathematics include eight Standards for Mathematical Practice. They describe how students should think and work when they do math: making sense of a problem, sticking with it, explaining their thinking and checking it. They are the same in every grade and grow as children do. Teachers build them into math lessons; they are not graded as a separate subject.",
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
        a: "Yes. The same eight practices appear in every grade of the Connecticut Core Standards for Mathematics. What changes is the math they are used with, from counting in kindergarten to algebra in high school.",
      },
      {
        q: "Where do they come from?",
        a: "They are part of the Connecticut Core Standards for Mathematics, which the Connecticut State Board of Education adopted in 2010. The standards list them before the content standards for each grade.",
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
    source: "the Connecticut State Department of Education",
    hubBlurb: "Smarter Balanced in English language arts and math (grades 3 to 8) and the Next Generation Science Assessment (grades 5, 8 and 11).",
    name: "Connecticut state tests (Smarter Balanced and NGSS)",
    intro:
      "Connecticut students take state tests each spring: the Smarter Balanced tests in English language arts and math in grades 3 to 8, and the Next Generation Science Assessment in grades 5, 8 and 11. In 11th grade, students also take the SAT at school. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math (Smarter Balanced): grades 3 to 8. Science (Next Generation Science Assessment): grades 5, 8 and 11. SAT School Day: grade 11. Students with the most significant cognitive disabilities may take the Connecticut Alternate Assessment instead." },
      { title: "When", body: "In spring. Each school sets its own testing days within the window the Connecticut State Department of Education announces each year." },
      { title: "What they cover", body: "Smarter Balanced checks the Connecticut Core Standards in English language arts and math. The science test checks the Next Generation Science Standards. The tests are given on a computer and adjust to how a student is doing." },
      { title: "How results are described", body: "Smarter Balanced results come in four achievement levels: Level 1 (Not Met), Level 2 (Approaching), Level 3 (Met) and Level 4 (Exceeded). Levels 3 and 4 meet the state's expectation. Families get an Individual Student Report, and school results appear on EdSight, the state's education data site." },
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
        a: "Smarter Balanced is the test Connecticut uses in English language arts and math for grades 3 to 8. It is taken on a computer in the spring, and the questions adjust to how a student answers.",
      },
      {
        q: "What do the four levels mean?",
        a: "Level 1 means the standard was not met, Level 2 that it is nearly met, Level 3 that it was met and Level 4 that it was exceeded. They describe one test on one day, not everything your child knows.",
      },
      {
        q: "Which grades take the science test?",
        a: "The Next Generation Science Assessment is given in grades 5, 8 and 11.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your district chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts and science skills in Connecticut's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Connecticut is the preschool year for 4-year-olds, offered by public schools and community programs such as School Readiness and Smart Start, many of them free or on a sliding scale for families who qualify. Programs follow the Connecticut Early Learning and Development Standards (CT ELDS): social and emotional growth, language and early literacy, math, science, social studies and the creative arts.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Connecticut is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies (Understanding My Communities) they learn about themselves, families, community leaders and rules, and where the things we buy come from.",
      lookFor: "Many Connecticut districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies (Society and Ourselves) covers maps, Connecticut and its Native nations and communities, symbols of the United States, and goods made near and far.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies (Contributing to Society) covers local leaders, what local government does and how communities change.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, and start multiplication, division and fractions. Social studies (Connecticut and Local History) is a year about Connecticut: how the state is governed and how a bill becomes a law, the Native nations of Connecticut, the people who have made the state home, and its industries. It is also the first year of the Smarter Balanced tests.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies (United States Geography) explores the regions of the United States: their land and climate, why people settle and move, and how communities prepare for storms and other hazards.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and map and research skills.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies (United States History I) runs from exploration and the colonies, including colonial Connecticut and the Fundamental Orders, to the Revolution and the Constitution. Students also take the science test this year.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Connecticut districts. Math moves to ratios, rates, negative numbers and expressions. Science covers weather, climate and how living things grow, and social studies (World Regional Studies I) looks at world regions such as Latin America and Europe, their cultures, beliefs and economies.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies (World Regional Studies II) continues with regions such as Africa and Asia, population and migration, and economic systems.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies (United States History II) runs from the founding to Reconstruction, with Connecticut's part in it: the Connecticut Compromise, gradual abolition, the Amistad and the Civil War. Students take the science test this year.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} is civics and government, the half credit every Connecticut student needs to graduate: how Connecticut governs itself under its 1965 constitution, its 169 towns, elections, rights and the economy.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
