import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Virginia, in US English. The competencies page explains the "5 C's" of the Profile of a
// Virginia Graduate (critical thinking, creative thinking, collaboration, communication and citizenship), which the
// Standards of Learning build into every subject. The assessment page covers the Standards of Learning (SOL) tests
// (reading and math in grades 3 to 8, science in grades 5 and 8, writing in grade 8, end-of-course tests in high
// school), the fall and winter growth tests in reading and math, and the Virginia Literacy Act's reading checks in
// Kindergarten to 3rd grade. Dates and score levels change, so the page points to the Virginia Department of Education
// (VDOE). Virginia has no French subject here, so no French guide. Record: docs/research/virginia/README.md.

export const VIRGINIA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "5-cs",
    label: "The 5 C's",
    hubBlurb: "Critical thinking, creative thinking, collaboration, communication and citizenship: the skills Virginia's Profile of a Graduate builds in every grade.",
    description:
      "What Virginia's 5 C's mean for parents: critical thinking, creative thinking, collaboration, communication and citizenship, how they show up in every subject, and simple ways to support them at home.",
    gradeLine: "The 5 C's apply in every grade.",
    closing: "these skills grow every time your child explains an idea, tries a new approach or works through a problem with others.",
    title: "Virginia's 5 C's, explained for parents",
    intro:
      "Virginia's Profile of a Graduate describes what students should be able to do when they finish school. Alongside what they know in each subject, it names five skills, often called the 5 C's: critical thinking, creative thinking, collaboration, communication and citizenship. They aren't a separate subject. The Standards of Learning build them into everyday lessons, from math problems to history projects.",
    items: [
      {
        id: "critical-thinking",
        name: "Critical thinking",
        blurb: "Asking good questions, weighing evidence and solving problems step by step.",
        parts: [
          { name: "Questioning", blurb: "Asking why and how, and not taking the first answer for granted." },
          { name: "Evidence", blurb: "Using facts, data and sources to back up an answer." },
          { name: "Problem solving", blurb: "Making a plan, trying it and checking whether it worked." },
        ],
        atHome: [
          "Ask “How do you know?” after an answer, even when it's right.",
          "Estimate first (the grocery total, the drive time), then check.",
          "When you read news together, ask whether a sentence is a fact or an opinion.",
        ],
      },
      {
        id: "creative-thinking",
        name: "Creative thinking",
        blurb: "Coming up with new ideas and more than one way to solve a problem.",
        parts: [
          { name: "New ideas", blurb: "Imagining different answers and trying them out." },
          { name: "Flexibility", blurb: "Changing a plan when the first one doesn't work." },
          { name: "Making", blurb: "Designing, building and writing something of your own." },
        ],
        atHome: [
          "Ask “Is there another way to solve it?” after a math problem.",
          "Build something together from recycling and improve it on a second try.",
          "Let your child invent a different ending to a story you read.",
        ],
      },
      {
        id: "collaboration",
        name: "Collaboration",
        blurb: "Working well with others toward a shared goal.",
        parts: [
          { name: "Listening", blurb: "Hearing other people's ideas before sharing your own." },
          { name: "Sharing the work", blurb: "Taking a role and doing your part." },
          { name: "Working out disagreements", blurb: "Settling differences fairly and respectfully." },
        ],
        atHome: [
          "Cook a meal together and give your child one job from start to finish.",
          "Play a board game that needs a team, then talk about what worked.",
          "When siblings disagree, ask each to say the other's idea back first.",
        ],
      },
      {
        id: "communication",
        name: "Communication",
        blurb: "Sharing ideas clearly in speaking and writing, and understanding others.",
        parts: [
          { name: "Speaking", blurb: "Explaining an idea clearly to different listeners." },
          { name: "Writing", blurb: "Writing with a purpose and for a reader." },
          { name: "Understanding", blurb: "Reading and listening carefully to what others say." },
        ],
        atHome: [
          "Ask your child to teach you something they learned this week.",
          "Write a short note or list together for a real purpose, like a grocery list.",
          "After a story, ask your child to retell it in their own words.",
        ],
      },
      {
        id: "citizenship",
        name: "Citizenship",
        blurb: "Taking part in the community, knowing how government works and treating others with respect.",
        parts: [
          { name: "Responsibility", blurb: "Following rules, keeping promises and caring for shared spaces." },
          { name: "Civic knowledge", blurb: "Knowing how local, state and national government work." },
          { name: "Service", blurb: "Helping others and making the community better." },
        ],
        atHome: [
          "Talk about a local issue, like a new park or road, and who decides it.",
          "Volunteer together, even for a small job like a neighborhood cleanup.",
          "Visit a library, a museum or a historic site and talk about why it matters.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the 5 C's graded?",
        a: "Not as a subject. They are part of how each subject is taught, and some report cards comment on related habits, like working with others or effort. How that is reported is up to your school division.",
      },
      {
        q: "Where do the 5 C's come from?",
        a: "They come from the Profile of a Virginia Graduate, which the Virginia Board of Education adopted to describe what students should know and be able to do by graduation. The Standards of Learning build them into each subject.",
      },
      {
        q: `Does ${APP_NAME} measure the 5 C's?`,
        a: `Partly. ${APP_NAME} practices subject skills in math, English, science and history and social science, and many questions ask children to reason, weigh evidence or read a map. These skills grow best through conversation and real problems, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school teaches them?",
        a: "Ask your child's teacher which skills the class is working on and what you can do at home. The Virginia Department of Education publishes the Profile of a Virginia Graduate and the Standards of Learning.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "SOL tests",
    source: "the Virginia Department of Education",
    hubBlurb: "Standards of Learning tests in reading and math (grades 3 to 8), science (grades 5 and 8) and writing (grade 8).",
    name: "Virginia state tests (the SOL tests)",
    intro:
      "Virginia students take Standards of Learning (SOL) tests. They cover reading and math in grades 3 to 8, science in grades 5 and 8, and writing in grade 8, and high school students take end-of-course tests. In reading and math, shorter growth tests in the fall and winter show progress during the year. In Kindergarten to 3rd grade, schools also check every child's reading under the Virginia Literacy Act. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "Reading and math: grades 3 to 8. Science: grades 5 and 8. Writing: grade 8. High school students take end-of-course tests in subjects such as Algebra I, Biology, English and history. Students with the most significant cognitive disabilities may take the Virginia Alternate Assessment Program (VAAP) instead." },
      { title: "When", body: "The SOL tests are given in the spring, near the end of the school year, and each school division sets its own days within the state's testing window. The reading and math growth tests are given in the fall and winter." },
      { title: "Reading checks in Kindergarten to 3rd grade", body: "Under the Virginia Literacy Act, schools check every child's reading with a short screener in Kindergarten to 3rd grade. A child who needs extra help gets a reading plan, and the family is part of it." },
      { title: "How results are described", body: "Families get a score report with a scaled score and a performance level, such as Proficient or Advanced. The Virginia Department of Education explains the current levels and what each score means." },
      { title: "Report card link", body: "SOL scores don't change your child's report card. They are one more snapshot for families, teachers and schools." },
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
        q: "What are the SOL tests?",
        a: "SOL stands for Standards of Learning, Virginia's standards for what students learn in each grade. The SOL tests check those standards. Most are taken online.",
      },
      {
        q: "What are the growth tests in the fall and winter?",
        a: "In grades 3 to 8, students take shorter reading and math tests in the fall and winter. They show teachers and families how much a child has grown during the year, before the spring SOL test.",
      },
      {
        q: "Are SOL scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school division chooses.",
      },
      {
        q: "Can my child skip the SOL tests?",
        a: "Virginia expects every student to take the state tests, and state law has no opt-out process. If you have concerns, talk with your child's school.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English, science and history and social science skills in Virginia's Standards of Learning with kind feedback and no timers unless you want them. It isn't a copy of the SOL tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "The Virginia Preschool Initiative funds a pre-K year for four-year-olds in public schools and community programs. It follows Virginia's Early Learning and Development Standards (2021).",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Virginia is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start joining and separating groups within 10. In history and social science they learn about Virginia's holidays, the American and Virginia flags, Virginia's earliest communities and maps. Teachers check early skills with the Virginia Kindergarten Readiness Program and reading with a short screener.",
      lookFor: "Many Virginia school divisions use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. History and social science covers Virginia's early history, from Werowocomoco and Jamestown, Virginians such as Pocahontas, George Washington, Maggie L. Walker and Arthur Ashe, and maps of Virginia.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 999, adding and subtracting within 100, money and time. History and social science covers Indigenous peoples of the Eastern Woodlands, the Plains and the Southwest, European explorers, the founders of the nation, changemakers in United States history, and world maps.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study ancient Egypt, China, Greece, Rome and the empire of Mali, the seven continents, and the three branches of government. It is also the first year of the SOL tests in reading and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts, and fractions. SOL scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, fractions and decimals, and longer writing. Science covers living things and ecosystems, weather, the ocean, the planets and Virginia's natural resources. History and social science is Virginia Studies: Virginia's regions and waters, its Indigenous nations, Jamestown, the colony, the American Revolution, the Civil War, Reconstruction and Virginia today.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and explaining causes and effects in history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and write longer pieces with evidence. History and social science is United States History to 1865: the geography of North America, early cultures, exploration, the colonies, the Revolution, the new nation, westward expansion and the Civil War. Students take the science SOL test.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. SOL scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Virginia school divisions. Math moves to ratios, percents, integers and operations with fractions. Science covers the solar system, energy, atoms, water, weather and watersheds, and history and social science is United States History from 1865 to the present, from Reconstruction and industrial America to the world wars, the Cold War and the civil rights movement.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional reasoning, rational numbers and equations. Science is life science, from cells to ecosystems and heredity, and history and social science is Civics and Economics: the Constitution, how national, state and local government work, the courts, citizenship and elections, the economy and personal finance.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers real numbers, scientific notation and linear relationships. Science is physical science, from atoms and chemical changes to forces, energy and waves, and history and social science is World Geography, region by region. Students take the reading, math, science and writing SOL tests.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} is Algebra 1 (expressions, equations, functions and statistics), and English classes read and write more closely. Science covers biology and Earth science, and history and social science is World History and Geography to 1500, from early humans and the first civilizations to medieval Europe, the Americas and the Renaissance.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing sources in history and English.",
    },
  },
};
