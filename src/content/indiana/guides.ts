import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Indiana, in US English. The competencies page explains the process standards Indiana builds into
// every grade: the eight Process Standards for Mathematics listed in every grade of the 2023 math standards ("PS.1" to
// "PS.8"), the Communication and Collaboration domain of the English/language arts standards, the science and
// engineering practices behind the science standards, and the social studies skills of sources, timelines and maps.
// The assessment page covers ILEARN (English/language arts and math in grades 3 to 8, science in grades 4 and 6, social
// studies in grade 5, and Biology in high school) and IREAD, Indiana's reading test in grades 2 and 3, with the 3rd
// grade reading rule in state law. Dates change each year, so the page points to the Indiana Department of Education
// (IDOE). Indiana has no French subject here, so no French guide. Record: docs/research/indiana/README.md.

export const INDIANA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "process-standards",
    label: "Process standards",
    hubBlurb: "The ways of thinking Indiana's standards build in every grade: solving problems, explaining reasoning, investigating and working with sources.",
    description:
      "What the process standards in Indiana's Academic Standards mean for parents: the Process Standards for Mathematics, communication and collaboration in English/language arts, science investigations and social studies skills, with simple ways to support them at home.",
    gradeLine: "Indiana's process standards apply in every grade.",
    closing: "these thinking skills grow every time your child explains, tests an idea or asks a good question.",
    title: "Indiana's process standards, explained for parents",
    intro:
      "The Indiana Academic Standards list what students learn in each grade and subject. Alongside that content, the standards describe how students are expected to think and work: making sense of a problem, explaining their reasoning, discussing ideas with others, testing an idea with evidence and reading sources carefully. They aren't a separate subject. Teachers build them into everyday lessons, and they show up on state tests too.",
    items: [
      {
        id: "math-process",
        name: "Process Standards for Mathematics",
        blurb: "Eight habits of good math thinkers, listed in every grade of Indiana's math standards.",
        parts: [
          { name: "Making sense", blurb: "Understanding a problem, making a plan and sticking with it." },
          { name: "Reasoning", blurb: "Explaining thinking, and listening to and questioning other people's reasoning." },
          { name: "Modeling and tools", blurb: "Using drawings, objects, equations and tools to show and solve real problems." },
          { name: "Precision and structure", blurb: "Being careful with numbers and words, and spotting patterns and structure." },
        ],
        atHome: [
          "Ask “How do you know?” after an answer, even when it's right.",
          "Estimate first (the grocery total, the drive time), then check.",
          "Let your child solve a real problem, like doubling a recipe, and explain each step.",
        ],
      },
      {
        id: "communication",
        name: "Communication and collaboration",
        blurb: "One of the four domains of Indiana's English/language arts standards, in every grade.",
        parts: [
          { name: "Listening and discussing", blurb: "Taking turns, building on others' ideas and asking good questions." },
          { name: "Presenting", blurb: "Sharing ideas clearly, in speech and with pictures or media." },
          { name: "Working together", blurb: "Researching and solving problems with classmates." },
        ],
        atHome: [
          "At dinner, ask your child to tell about their day in order: first, next, last.",
          "After a story, ask what your child thinks and why, then share your own view.",
          "Let your child explain a game or recipe to a younger sibling or a grandparent.",
        ],
      },
      {
        id: "science-practices",
        name: "Science and engineering practices",
        blurb: "Indiana's science standards ask students to investigate, use evidence and design solutions.",
        parts: [
          { name: "Asking and investigating", blurb: "Asking questions and planning simple, fair tests." },
          { name: "Evidence and models", blurb: "Collecting data, building models and explaining with evidence." },
          { name: "Designing", blurb: "Defining a problem, building a solution and improving it after testing." },
        ],
        atHome: [
          "Wonder out loud together (“Why did the ice melt faster there?”) and test a guess.",
          "Keep a simple weather or plant-growth chart for a week, then talk about the pattern.",
          "Build something together from recycled materials and ask how to make it better.",
        ],
      },
      {
        id: "social-studies-skills",
        name: "Social studies skills",
        blurb: "Reading sources, making timelines and using maps run through every grade.",
        parts: [
          { name: "Sources", blurb: "Telling primary from secondary sources, and fact from fiction or opinion." },
          { name: "Timelines and causes", blurb: "Putting events in order and finding cause and effect." },
          { name: "Maps and globes", blurb: "Directions, map keys, scale, and latitude and longitude." },
        ],
        atHome: [
          "Use a map (paper or on a phone) to plan a trip, and let your child give directions.",
          "Look at an old family photo together and ask what it tells you about the past.",
          "Visit a nearby historic site or county museum and talk about what life was like.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the process standards graded?",
        a: "Not as a subject. They are part of how each subject is taught, and some report cards comment on related habits, like problem solving or working with others. How that is reported is up to the school corporation.",
      },
      {
        q: "Does Indiana have social and emotional learning standards?",
        a: "Indiana's academic standards don't include graded social and emotional learning standards. The Indiana Department of Education has published guidance on social-emotional skills, and many schools teach skills like self-control and teamwork, so ask your school how it does.",
      },
      {
        q: "Where do the process standards come from?",
        a: "Indiana's 2023 math standards list eight Process Standards in every grade, and its English/language arts standards have a whole Communication and Collaboration domain. The science standards build in the practices of investigation and design, and the social studies standards build in sources, timelines and maps.",
      },
      {
        q: `Does ${APP_NAME} measure the process standards?`,
        a: `Partly. ${APP_NAME} practices subject skills in math, English/language arts, science and social studies, and many questions ask children to reason, read a map or judge a source. These habits grow best through conversation and real problems, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school teaches them?",
        a: "Ask your child's teacher which skills the class is working on and what you can do at home. The standards are published by the Indiana Department of Education.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Indiana Department of Education",
    hubBlurb: "ILEARN in English/language arts and math (grades 3 to 8), science (grades 4 and 6) and social studies (grade 5), and IREAD for reading in grades 2 and 3.",
    name: "Indiana state tests (ILEARN and IREAD)",
    intro:
      "Indiana students take ILEARN, the state test of the Indiana Academic Standards. It covers English/language arts and math in grades 3 to 8, science in grades 4 and 6, and social studies in grade 5, with Biology in high school. Reading is also checked with IREAD in grades 2 and 3. The tests are separate from the report card and from class grades.",
    grades: ["2", "3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes ILEARN", body: "English/language arts and math: grades 3 to 8. Science: grades 4 and 6. Social studies: grade 5. High school students take the Biology test. Students with the most significant cognitive disabilities may take the I AM alternate assessment instead." },
      { title: "When", body: "ILEARN English/language arts and math now include shorter checkpoints during the school year as well as the spring test. Each school corporation sets its own days within the windows the Indiana Department of Education announces each year." },
      { title: "IREAD and 3rd grade reading", body: "IREAD checks foundational reading in 3rd grade, and many 2nd graders take it early. Under Indiana law, a 3rd grader who hasn't passed IREAD after extra help and summer retakes generally repeats 3rd grade, with some exemptions. Ask your school how it supports readers and applies the rule." },
      { title: "How results are described", body: "ILEARN scores are reported in performance levels that show whether a student is below, approaching, at or above proficiency. Families get a score report from the school. Indiana updated its score ranges in 2026, so scores from different years may not compare directly." },
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
        q: "What is ILEARN?",
        a: "ILEARN is Indiana's state test program. It checks the Indiana Academic Standards in English/language arts, math, science and social studies, online, with accommodations for students who need them.",
      },
      {
        q: "What is IREAD?",
        a: "IREAD is Indiana's reading test for the early grades. It checks the foundational skills (phonics, vocabulary, fluency and comprehension) children need to read well by the end of 3rd grade.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school corporation chooses.",
      },
      {
        q: "Can my child skip the state tests?",
        a: "Indiana expects every student to take the state tests, and there is no opt-out process in state law. If you have concerns, talk with your child's school.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English/language arts, science and social studies skills in Indiana's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Indiana is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about families, rules, holidays, maps and the jobs people do, and in science they explore pushes and pulls, sunlight, weather and what living things need.",
      lookFor: "Many Indiana school corporations use standards-based report cards in the early grades. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies covers past and present, American songs and symbols, the Pledge of Allegiance, rules and laws, and goods and services.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Social studies is about the local community: how it began and changed, good citizens, the meaning of the Pledge of Allegiance and Benjamin Harrison's part in it, maps, prices and saving. Many 2nd graders take IREAD early.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study Indiana's communities and regions, the Native Americans who shaped them, the Midwest on the map and the three levels of government. It is the first year of ILEARN in English/language arts and math, and IREAD, the state reading test, decides whether a child moves on to 4th grade, with some exemptions.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers energy, waves, the senses, rocks and erosion, and natural hazards. Social studies is Indiana: its land and glaciers, first peoples, the road to statehood in 1816, Abraham Lincoln's boyhood, the Underground Railroad and the Civil War, the growing state, and how Indiana's government and economy work. Students take ILEARN science.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and explaining causes and effects in history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is United States history from early North America and European exploration to the colonies, the American Revolution, the Constitution and the Bill of Rights. Students take ILEARN social studies.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Indiana school corporations. Math moves to ratios, rates, negative numbers and expressions. Science covers space, ecosystems and waves, and social studies is Europe and the Americas from ancient times to the Industrial Revolution, with Indiana's middle school civics: the United States and Indiana Constitutions and the three branches. Students take ILEARN science.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers cells and body systems, forces, motion and energy, and Earth's surface and resources. Social studies is Africa, Asia and the Southwest Pacific, from early river valley civilizations and world religions to kingdoms, trade routes, colonization and independence.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers atoms and chemical reactions, heredity and evolution, and weather and climate, and social studies is United States history from 1754 to 1877: the Revolution, the Constitution, the new nation, westward expansion, reform, the Civil War and Reconstruction.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} is Algebra I, with some geometry, and English classes read and write more closely. Science is Biology and Integrated Chemistry and Physics. Social studies in ${APP_NAME} is United States Government, which every Indiana student takes for graduation, including Indiana's own state and local government, plus the core ideas of Economics.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
