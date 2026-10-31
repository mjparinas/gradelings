import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Maine, in US English. The competencies page is the five Guiding Principles of the Maine
// Learning Results (a clear and effective communicator, a self-directed and lifelong learner, a creative and practical
// problem solver, a responsible and involved citizen, an integrative and informed thinker), which run through every
// content area. They are not graded subjects. The assessment page covers the Maine Comprehensive Assessment System
// (MeCAS): the Maine Through Year Assessment in mathematics and reading in grades 3 to 8 and the second year of high
// school (fall and spring required, winter optional) and the Maine Science Assessment in grades 5 and 8 and the third
// year of high school. Dates change each year, so the page points to the Maine Department of Education. Maine has no
// French subject here, so no French guide. Record: gradelings-research/maine/README.md.

export const MAINE_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "guiding-principles",
    label: "Guiding Principles",
    hubBlurb: "Maine's five Guiding Principles, the habits every subject builds, in plain words.",
    description:
      "What Maine's five Guiding Principles mean (a clear and effective communicator, a self-directed and lifelong learner, a creative and practical problem solver, a responsible and involved citizen, and an integrative and informed thinker), how they show up at school, and simple ways to support them at home.",
    gradeLine: "Maine's Guiding Principles apply in every grade and every subject.",
    closing: "these habits grow through conversation, projects and everyday responsibilities, not worksheets.",
    title: "Maine's Guiding Principles, explained for parents",
    intro:
      "Alongside the standards for each subject, the Maine Learning Results describe five Guiding Principles: the kind of learner and citizen Maine schools hope every student becomes. Teachers weave them into every subject, from a science investigation to a class discussion. They are not a separate subject and not usually graded on their own, though some schools report on work habits or skills like these.",
    items: [
      {
        id: "communicator",
        name: "Clear and Effective Communicator",
        blurb: "Sharing ideas clearly in speaking, writing, pictures and numbers, and listening well.",
        parts: [
          { name: "Speaking and writing", blurb: "Explaining ideas so others can understand them." },
          { name: "Many forms", blurb: "Using words, drawings, charts, numbers and media to show thinking." },
          { name: "Listening", blurb: "Listening carefully and responding to what others say." },
        ],
        atHome: [
          "At dinner, ask your child to explain how they solved a problem today.",
          "Ask them to retell a story or a show in their own words, beginning, middle and end.",
          "Write notes, lists or cards together for real reasons.",
        ],
      },
      {
        id: "learner",
        name: "Self-Directed and Lifelong Learner",
        blurb: "Setting goals, sticking with hard things and staying curious.",
        parts: [
          { name: "Goals", blurb: "Making a plan, checking progress and adjusting." },
          { name: "Persistence", blurb: "Keeping going when something is tricky, and asking for help when needed." },
          { name: "Curiosity", blurb: "Asking questions and finding out more on their own." },
        ],
        atHome: [
          "Help your child set one small goal for the week and check in on it together.",
          "When they get stuck, ask “What could you try next?” before giving the answer.",
          "Follow a question they are curious about to the library or a trusted website.",
        ],
      },
      {
        id: "problem-solver",
        name: "Creative and Practical Problem Solver",
        blurb: "Noticing problems, trying ideas and testing whether they work.",
        parts: [
          { name: "Understanding the problem", blurb: "Working out what the problem really is." },
          { name: "Trying ideas", blurb: "Thinking of more than one way and picking a good one to try." },
          { name: "Checking", blurb: "Testing the solution and improving it." },
        ],
        atHome: [
          "Build something together from recycling and improve it on a second try.",
          "Give real problems: how many pancakes for everyone, or the fastest route to a friend's house.",
          "Praise good attempts and smart changes, not only right answers.",
        ],
      },
      {
        id: "citizen",
        name: "Responsible and Involved Citizen",
        blurb: "Taking part in the community, respecting others and caring for the world around them.",
        parts: [
          { name: "Community", blurb: "Helping out in the class, school and town." },
          { name: "Respect", blurb: "Treating people with different backgrounds and views fairly." },
          { name: "Stewardship", blurb: "Caring for the environment and shared places." },
        ],
        atHome: [
          "Take part in a town event, a beach or park cleanup, or a food drive together.",
          "Talk about a town meeting, a local election or a news story and how it affects your community.",
          "Give your child a real job at home and thank them for doing it.",
        ],
      },
      {
        id: "thinker",
        name: "Integrative and Informed Thinker",
        blurb: "Connecting ideas across subjects and using facts to make sense of the world.",
        parts: [
          { name: "Connections", blurb: "Linking what they learn in one subject to another and to real life." },
          { name: "Evidence", blurb: "Looking for facts and checking sources before deciding." },
          { name: "Big picture", blurb: "Seeing how people, places and ideas fit together." },
        ],
        atHome: [
          "Point out math in cooking, science in the weather and history in your town's old buildings.",
          "Ask “How do you know?” and “Where did that information come from?”",
          "Visit a museum, a working harbor, a farm or a historical society and talk about what you saw.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Guiding Principles graded?",
        a: "Not usually on their own. They run through every subject in the Maine Learning Results. Some schools report on work habits or similar skills on the report card, but how they do it is up to the school or district.",
      },
      {
        q: "What are Maine's five Guiding Principles?",
        a: "Each student should be a clear and effective communicator, a self-directed and lifelong learner, a creative and practical problem solver, a responsible and involved citizen, and an integrative and informed thinker.",
      },
      {
        q: "Where do the Guiding Principles come from?",
        a: "They are part of the Maine Learning Results, the standards the Maine Department of Education sets for every school in the state.",
      },
      {
        q: `Does ${APP_NAME} measure the Guiding Principles?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. Its kind hints, small goals and calm options can help children stick with hard things, but these habits grow through conversation, projects and teamwork, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school uses them?",
        a: "Ask your child's teacher how the class builds these habits and what you can do at home. The Maine Department of Education's website has the full Maine Learning Results.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Maine Department of Education",
    hubBlurb: "The Maine Through Year Assessment in math and reading (grades 3 to 8) and the Maine Science Assessment (grades 5 and 8).",
    name: "Maine state tests (MeCAS)",
    intro:
      "Maine students take state tests that are part of the Maine Comprehensive Assessment System (MeCAS): the Maine Through Year Assessment in mathematics and reading in grades 3 to 8 and the second year of high school, and the Maine Science Assessment in grades 5 and 8 and the third year of high school. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "Math and reading (the Maine Through Year Assessment): grades 3 to 8 and the second year of high school. Science (the Maine Science Assessment): grades 5 and 8 and the third year of high school. Students with significant cognitive disabilities may take an alternate assessment instead." },
      { title: "When", body: "The Through Year Assessment is given more than once a year: in the fall and spring, which are required, and in the winter, which schools may choose. The science test is given in the spring. Each school sets its dates within the windows the Maine Department of Education announces each year." },
      { title: "What they cover", body: "The math and reading tests check the Maine Learning Results in mathematics and English language arts. Because they are given through the year, teachers can see growth from fall to spring. The science test checks Maine's science and engineering standards." },
      { title: "How results are described", body: "Scores are reported as achievement levels compared with state expectations, along with a growth measure for the through-year tests. Families get a score report from the school." },
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
        q: "What is the Maine Through Year Assessment?",
        a: "It is Maine's state test in mathematics and reading for grades 3 to 8 and the second year of high school. Instead of one test in the spring, it is given in the fall and spring (and, if the school chooses, the winter), so teachers can see how much a child has grown during the year.",
      },
      {
        q: "Which grades take the science test?",
        a: "The Maine Science Assessment is given in grades 5 and 8 and the third year of high school.",
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
        a: `${APP_NAME} practices the math, English language arts and science skills in the Maine Learning Results with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Maine is public pre-K for 4-year-olds, free and offered by most school districts, often with Head Start and child care partners. Programs follow the Maine Early Learning and Development Standards: social and emotional growth, approaches to learning, language and literacy, math, science, social studies, creative arts and physical health.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Maine is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about themselves, families, rules and jobs, and how people work together.",
      lookFor: "Many Maine schools use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, learn place value up to 120 and count coins. Social studies looks at Maine's symbols and leaders, communities, and traditions, including those of the Wabanaki Nations.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies compares communities then and now.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study Maine's land and regions, how towns and the state are governed, and the many communities of Maine. It is also the first year of the Maine Through Year Assessment in math and reading.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is a year of Maine studies: the map and the geographic grid, Maine's history from the Wabanaki to today, the state's government and economy, and the Wabanaki Nations.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Maine history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is early United States history, from the colonies to the Revolution and the Constitution, and students take the Maine Science Assessment.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: `6th grade is the start of middle school in many Maine districts. Math moves to ratios, rates, negative numbers and expressions. Science covers topics from life, Earth and physical science, and social studies in ${APP_NAME} looks at world regions and ancient civilizations.`,
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: `In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's systems, and social studies in ${APP_NAME} is world history from medieval times to the age of revolutions.`,
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is United States history from the founding to Reconstruction, including Maine's statehood and Mainers in the Civil War. Students also take the Maine Science Assessment.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies covers civics and government, including how Maine's ranked-choice voting and citizen initiatives work, plus personal finance and economics.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
