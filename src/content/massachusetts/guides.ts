import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Massachusetts, in US English. Massachusetts has no statewide social and emotional learning
// standards that schools must teach, so the competencies page explains the practices the Massachusetts Curriculum
// Frameworks build into every grade: the eight Standards for Mathematical Practice, the reading and writing habits the
// English language arts and literacy framework asks for, the eight Science and Engineering Practices, and the seven
// Practice Standards of the 2018 History and Social Science Framework (which end with taking informed action, as in the
// 8th grade civics project). The assessment page covers MCAS (English language arts and math in grades 3 to 8 and 10,
// science and technology/engineering in grades 5 and 8 and once in high school, four achievement levels) and the 2024
// ballot question that removed passing MCAS as a graduation requirement. Dates change each year, so the page points to
// the Department of Elementary and Secondary Education (DESE). Massachusetts has no French subject here, so no French
// guide. Record: docs/research/massachusetts/README.md.

export const MASSACHUSETTS_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "learning-practices",
    label: "Learning practices",
    hubBlurb: "The ways of thinking the Massachusetts frameworks build in every grade: solving problems, reading closely, investigating and weighing sources.",
    description:
      "What the practices in the Massachusetts Curriculum Frameworks mean for parents: the Standards for Mathematical Practice, close reading and writing with evidence, the Science and Engineering Practices and the history and social science Practice Standards, with simple ways to support them at home.",
    gradeLine: "The practices in the Massachusetts Curriculum Frameworks apply in every grade.",
    closing: "these thinking skills grow every time your child explains, tests an idea or asks a good question.",
    title: "Massachusetts learning practices, explained for parents",
    intro:
      "Alongside what students learn in each grade, the Massachusetts Curriculum Frameworks describe how students should think and work in every grade: making sense of math problems, reading closely and writing with evidence, investigating like scientists and engineers, and weighing sources like historians and citizens. These practices aren't graded on their own, but they shape how lessons are taught and how many test questions are written.",
    items: [
      {
        id: "math-practices",
        name: "Standards for Mathematical Practice",
        blurb: "Eight habits of strong math thinkers, the same from kindergarten to high school.",
        parts: [
          { name: "Making sense", blurb: "Understanding a problem, making a plan and sticking with it." },
          { name: "Reasoning", blurb: "Explaining thinking, and listening to and questioning other people's reasoning." },
          { name: "Modeling and tools", blurb: "Using drawings, objects, equations and tools to show and solve real problems." },
          { name: "Precision and patterns", blurb: "Being careful with numbers and words, and spotting patterns and structure." },
        ],
        atHome: [
          "When your child solves a problem, ask “How did you figure that out?” and “Is there another way?”",
          "Use everyday math, like doubling a recipe or working out the change at a store.",
          "Let your child draw a picture or use objects to show a problem before solving it.",
        ],
      },
      {
        id: "literacy-practices",
        name: "Reading and writing habits",
        blurb: "Reading closely, building knowledge and writing with evidence.",
        parts: [
          { name: "Reading closely", blurb: "Reading carefully, rereading and asking what the words really say." },
          { name: "Knowledge from texts", blurb: "Learning about the world from stories, information books and primary sources." },
          { name: "Evidence", blurb: "Pointing to the words in a text that support an answer or an opinion." },
          { name: "Discussion", blurb: "Listening to others and building on their ideas." },
        ],
        atHome: [
          "After reading together, ask “What part of the book makes you think that?”",
          "Mix stories with true books about animals, places, history and how things work.",
          "Let your child explain a news story or a show in their own words, then ask what they still wonder.",
        ],
      },
      {
        id: "science-practices",
        name: "Science and Engineering Practices",
        blurb: "Eight ways scientists and engineers ask questions, test ideas and solve problems.",
        parts: [
          { name: "Asking and defining", blurb: "Asking questions about the world and defining problems to solve." },
          { name: "Investigating", blurb: "Planning fair tests, collecting data and using models." },
          { name: "Explaining and designing", blurb: "Building explanations from evidence, and designing and improving solutions." },
          { name: "Arguing and communicating", blurb: "Defending ideas with evidence and sharing results clearly." },
        ],
        atHome: [
          "Ask “What do you think will happen?” before trying something, then talk about what really happened.",
          "Build something together from recycled materials, test it and make it better.",
          "Keep a simple weather or plant-growth chart for a week and look for patterns.",
        ],
      },
      {
        id: "social-science-practices",
        name: "History and social science Practice Standards",
        blurb: "Seven practices for thinking like historians and taking part as citizens.",
        parts: [
          { name: "Civic knowledge and dispositions", blurb: "Knowing how government works and caring about the community." },
          { name: "Questions and sources", blurb: "Asking focused questions and gathering information from primary and secondary sources." },
          { name: "Weighing sources", blurb: "Telling fact from opinion, and judging a source's purpose, point of view and accuracy." },
          { name: "Arguing and acting", blurb: "Explaining a conclusion with evidence, and deciding on informed next steps." },
        ],
        atHome: [
          "Look at an old photo or letter together and ask who made it, when and why.",
          "When you see a headline, ask “How could we check whether that's true?”",
          "Talk about a local issue, like a park or a crosswalk, and who in town could help fix it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the practices graded?",
        a: "Not on their own. Report cards grade subjects, and some include comments on habits like explaining thinking or working with others. The practices show up in how lessons are taught and in many test questions.",
      },
      {
        q: "Does Massachusetts have social and emotional learning standards?",
        a: "Massachusetts has no SEL standards that schools must teach. DESE offers guidance on social and emotional learning, and many districts choose their own programs. Ask your school what it uses.",
      },
      {
        q: "What is the 8th grade civics project?",
        a: "A 2018 Massachusetts law asks schools to give every student a civics project in 8th grade and again in high school. Students choose a local issue, research it and plan informed action, which is the last of the history and social science practices.",
      },
      {
        q: `Does ${APP_NAME} practice these skills?`,
        a: `${APP_NAME} practices the subject skills in math, English language arts, science and social studies, and many questions ask children to reason, read closely and weigh evidence. The practices grow most through conversation and hands-on work, so we suggest home activities too.`,
      },
      {
        q: "Where can I read the frameworks?",
        a: "The full Massachusetts Curriculum Frameworks for every subject are on the Department of Elementary and Secondary Education's website.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "MCAS",
    source: "the Massachusetts Department of Elementary and Secondary Education",
    hubBlurb: "MCAS in English language arts and math (grades 3 to 8 and 10) and science and technology/engineering (grades 5 and 8 and high school).",
    name: "MCAS",
    intro:
      "Massachusetts students take the Massachusetts Comprehensive Assessment System (MCAS) each spring: English language arts and math in grades 3 to 8 and in grade 10, and science and technology/engineering in grades 5 and 8 and once in high school. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 8 and grade 10. Science and technology/engineering: grades 5 and 8, and one high school test, usually in 9th or 10th grade. Students with significant disabilities may take the MCAS-Alt, a portfolio of their work, instead." },
      { title: "When", body: "Most tests are given in the spring, on computers, with paper versions for students who need them. Each school sets its own days within the windows DESE announces each year." },
      { title: "What they cover", body: "The tests check the Massachusetts Curriculum Frameworks in English language arts, math, and science and technology/engineering." },
      { title: "How results are described", body: "Scores are reported in four achievement levels: Exceeding Expectations, Meeting Expectations, Partially Meeting Expectations and Not Meeting Expectations. Families get a score report from the school." },
      { title: "Graduation", body: "Since Massachusetts voters passed Question 2 in November 2024, students no longer have to pass MCAS to graduate. Students still take the tests, and districts decide their own graduation requirements under state law." },
      { title: "Report card link", body: "MCAS scores don't change your child's report card. They are one more snapshot for families, teachers and schools." },
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
        q: "What is MCAS?",
        a: "MCAS is Massachusetts's statewide testing program. Students take English language arts and math in grades 3 to 8 and 10, and science and technology/engineering in grades 5 and 8 and in high school.",
      },
      {
        q: "Does my child have to pass MCAS to graduate?",
        a: "Not since November 2024, when voters passed Question 2. Students still take the tests, and districts set their own graduation requirements under state law.",
      },
      {
        q: "Are MCAS scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your district chooses.",
      },
      {
        q: "Is there an MCAS test in history or social studies?",
        a: "Not at present. History and social science are taught in every grade, and students complete civics projects in 8th grade and high school.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Massachusetts Curriculum Frameworks with kind feedback and no timers unless you want them. It isn't a copy of MCAS and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Massachusetts has no statewide pre-K program; four-year-olds attend public school preschools, Head Start and community programs, many funded through the Commonwealth Preschool Partnership Initiative. The Massachusetts Curriculum Frameworks set pre-K standards in every subject.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Massachusetts is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about rules, maps, their own address, holidays and the nation's symbols. Schools also check each child's early reading skills during the year.",
      lookFor: "Many Massachusetts districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Science looks at patterns in the sky, light and sound, and how plants and animals use their parts, and social studies covers being part of a group, leaders and elections, and Boston as the state capital.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science covers how wind and water shape the land, materials and habitats, and social studies looks at maps and globes, why people move, the United States as a nation of immigrants, and countries around the world.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and spend the year on Massachusetts and New England: their own city or town and its government, the Native Peoples of New England, the Pilgrims and Plymouth, the Massachusetts Bay Colony and Massachusetts in the American Revolution. It is also the first year of MCAS in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. MCAS scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers Earth's changing surface, energy and waves, and how animals' and plants' parts help them survive. Social studies is North American geography and the regions of the United States, the ancient civilizations of North America, European exploration and how the nation grew in the 19th century.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on a region or state.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science covers Earth's systems, the sun and stars, and how energy moves through ecosystems, and social studies is United States history from the colonies and slavery through the Revolution, the Constitution, the Civil War and the civil rights movement. Students take the MCAS science and technology/engineering test.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. MCAS scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Massachusetts districts. Math moves to ratios, rates, negative numbers and expressions. Science covers the solar system, waves and matter, and cells, and social studies looks at how social scientists study the past, early humans, the first civilizations of the Middle East and Africa, and the geography of Central and South America and the Caribbean.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers weather and climate, energy and ecosystems, and social studies continues world geography and ancient civilizations: Central, South and East Asia, Southeast Asia and Oceania, and ancient Greece and Rome.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers plate tectonics, forces and chemical reactions, and heredity. Social studies is a full year of civics on United States and Massachusetts government, from the ideas behind the Constitution to rights, elections, state and local government and a free press, with a civics project. Students take the MCAS science and technology/engineering test.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math, supporting an argument with evidence and the civics project.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} follows the Algebra I course (expressions, equations, functions and data), and English classes read and write more closely. Science in ${APP_NAME} covers high school biology, chemistry and introductory physics, and social studies is United States History I, from the Revolution through Reconstruction, industry and immigration to World War I, with Massachusetts's part in that story.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, the high school MCAS tests, explaining reasoning in math and weighing perspectives in history and English.",
    },
  },
};
