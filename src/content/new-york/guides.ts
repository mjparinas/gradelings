import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for California, in US English. The competencies page is the California Department of Education's
// social and emotional learning guidance: the California SEL Guiding Principles and the Transformative SEL (T-SEL)
// Competencies and Conditions for Thriving, "developed for voluntary use", with five competencies (Self-Awareness,
// Self-Management, Social Awareness, Relationship Skills, Responsible Decision-Making). They are guidance, not graded
// standards (docs/research/california/README.md). It uses the existing `sel-standards` URL segment so the shared route
// folder serves California too. The assessment page covers the California Assessment of Student Performance and
// Progress (CAASPP): Smarter Balanced English language arts/literacy and mathematics in grades 3 to 8 and 11, and the
// California Science Test (CAST) in grades 5 and 8 and once in high school. Education Code 60615 lets a parent or
// guardian ask in writing each year to excuse a child from any or all parts of CAASPP. Dates change each year, so the
// page points to CDE. California has no French subject, so no French guide. Grade notes follow CDE's standards and
// the History–Social Science Framework's course titles.

export const NEW_YORK_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "sel-standards",
    label: "Social and emotional learning",
    hubBlurb: "California's five social and emotional learning competencies, from self-awareness to good decisions, in plain words.",
    description:
      "What the California Department of Education's social and emotional learning guidance means (self-awareness, self-management, social awareness, relationship skills and responsible decision-making), how it shows up at school, and simple ways to support it at home.",
    gradeLine: "California's social and emotional learning competencies apply in every grade.",
    closing: "social and emotional skills grow through conversation, play and everyday responsibilities.",
    title: "California's social and emotional learning competencies, explained for parents",
    intro:
      "Alongside subjects like math and science, the California Department of Education (CDE) publishes guidance on social and emotional learning (SEL): the skills students use to understand themselves, manage their feelings, get along with others and make caring choices. CDE's SEL Guiding Principles describe how schools can support the whole child, and its Transformative SEL Competencies name five areas of skills. They were written for voluntary use, so each district decides how to use them, and they are not graded standards.",
    items: [
      {
        id: "self-awareness",
        name: "Self-Awareness",
        blurb: "Noticing your own feelings, thoughts and strengths, and understanding who you are.",
        parts: [
          { name: "Feelings", blurb: "Naming emotions and noticing how they affect what you think and do." },
          { name: "Strengths", blurb: "Knowing what you are good at and what you are still learning." },
          { name: "Identity", blurb: "Understanding your identity, your family's story and what matters to you." },
        ],
        atHome: [
          "Name feelings out loud, yours and theirs: “You look frustrated. Is the puzzle tricky?”",
          "Ask your child what they are proud of this week and what felt hard.",
          "Talk about your family's story, languages and traditions.",
        ],
      },
      {
        id: "self-management",
        name: "Self-Management",
        blurb: "Handling feelings and stress, setting goals and sticking with them.",
        parts: [
          { name: "Calming down", blurb: "Using healthy ways to manage strong feelings and stress." },
          { name: "Goals", blurb: "Making a plan, checking progress and adjusting to reach a goal." },
          { name: "Agency", blurb: "Taking initiative and showing courage to try hard things." },
        ],
        atHome: [
          "Practice a calm-down step together, like three slow breaths or a short walk.",
          "Help your child set a small weekly goal and check in on it together.",
          "Let your child make real choices, then talk about how they turned out.",
        ],
      },
      {
        id: "social-awareness",
        name: "Social Awareness",
        blurb: "Understanding other people, valuing differences and helping everyone belong.",
        parts: [
          { name: "Empathy", blurb: "Imagining how someone else feels and responding with kindness." },
          { name: "Perspectives", blurb: "Understanding that people can see the same thing in different ways." },
          { name: "Belonging", blurb: "Including others so everyone feels part of the class and community." },
        ],
        atHome: [
          "When reading a story, ask how a character feels and why.",
          "Read books and watch shows about families and communities different from yours.",
          "Ask your child how they could help a new or left-out classmate feel welcome.",
        ],
      },
      {
        id: "relationship-skills",
        name: "Relationship Skills",
        blurb: "Building healthy friendships, working as a team and solving conflicts.",
        parts: [
          { name: "Communication", blurb: "Listening well and speaking up with care." },
          { name: "Teamwork", blurb: "Sharing ideas, taking turns and solving problems together." },
          { name: "Repair", blurb: "Working through disagreements, asking for help and making things right." },
        ],
        atHome: [
          "Play a board game and practice taking turns and losing gracefully.",
          "After a disagreement, talk through what each person wanted and what could work for both.",
          "Model a real apology, then talk about how to make things right, not only say sorry.",
        ],
      },
      {
        id: "responsible-decision-making",
        name: "Responsible Decision-Making",
        blurb: "Asking questions, weighing choices and thinking about how they affect others.",
        parts: [
          { name: "Curiosity", blurb: "Asking questions and staying open to new ideas." },
          { name: "Weighing options", blurb: "Using facts and reasons to choose a fair solution." },
          { name: "Impact", blurb: "Thinking ahead about how a choice affects yourself, your family and your community." },
        ],
        atHome: [
          "Wonder out loud together: “Why do you think that happened? How could we find out?”",
          "Before a family decision, list the options and what might happen with each.",
          "Plan a small way to help a neighbor or your community, then talk about how it went.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are these social and emotional skills graded?",
        a: "No. CDE's SEL Guiding Principles and Transformative SEL Competencies are guidance for schools, written for voluntary use, not graded standards. Some districts mention work habits or social skills on the report card, but how they do it is up to the district.",
      },
      {
        q: "What are California's five SEL competencies?",
        a: "Self-Awareness, Self-Management, Social Awareness, Relationship Skills and Responsible Decision-Making. CDE describes each one and the school conditions that help children thrive.",
      },
      {
        q: "What are the SEL Guiding Principles?",
        a: "They are CDE's short set of ideas for how schools can support social and emotional learning: caring about the whole child, building a fair and welcoming school for every student, helping adults grow these skills too, working with families and the community, and learning and improving over time.",
      },
      {
        q: `Does ${APP_NAME} measure social and emotional skills?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. Its kind hints, small goals and calm options can help children stick with hard things, but social and emotional skills grow through conversation, play and teamwork, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about SEL at my child's school?",
        a: "Ask your child's teacher or school counselor how the school builds these skills and what you can do at home. CDE's website has the full SEL Guiding Principles and the Transformative SEL Competencies.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the California Department of Education (CDE)",
    hubBlurb: "CAASPP English language arts and math (grades 3 to 8) and the California Science Test (grades 5 and 8).",
    name: "California state tests (CAASPP)",
    intro:
      "Each spring, California students take the California Assessment of Student Performance and Progress (CAASPP): the Smarter Balanced tests in English language arts and math in grades 3 to 8 and 11, and the California Science Test (CAST) in grades 5 and 8 and once in high school. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math (Smarter Balanced): grades 3 to 8, and 11th grade. Science (CAST): grades 5 and 8, and once in high school, in 10th, 11th or 12th grade. Students with significant cognitive disabilities may take the California Alternate Assessments instead." },
      { title: "What they cover", body: "The English language arts and math tests check reading, writing, listening, research and math against California's Common Core standards, and ask students to explain their answers, not just pick one. CAST checks the California Next Generation Science Standards." },
      { title: "When", body: "Students test on a computer in the spring. Each district sets its own dates within the window CDE announces each year. The Smarter Balanced tests have no time limit, so children can take as long as they need." },
      { title: "How results are described", body: "Scores are reported in four levels: Standard Exceeded, Standard Met, Standard Nearly Met and Standard Not Met. Families get a Student Score Report from the school, usually by the end of the school year or the start of the next." },
      { title: "Exemption", body: "Under Education Code 60615, a parent or guardian may ask the school in writing to excuse their child from any or all parts of CAASPP for that school year. Schools tell families about this each year. Ask your school about the steps and what your child would do instead." },
      { title: "Report card link", body: "State test scores don't change your child's report card. They are one more snapshot for families, teachers and schools." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, then ask your child to retell what happened and explain why.",
      "Encourage short daily writing: a journal entry, a note or a list with reasons.",
      "Practice math with real problems (shopping, cooking, travel times) as well as math facts.",
      "Tell your child the tests show what they know. They are not something to fail.",
    ],
    faqs: [
      {
        q: "What is CAASPP?",
        a: "The California Assessment of Student Performance and Progress is California's set of state tests. It includes the Smarter Balanced tests in English language arts and math in grades 3 to 8 and 11, and the California Science Test (CAST) in grades 5 and 8 and once in high school.",
      },
      {
        q: "Can my child be excused from the tests?",
        a: "Yes. Education Code 60615 lets a parent or guardian send the school a written request to excuse their child from any or all parts of CAASPP. The request covers one school year. Your school can explain how it handles requests.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your district chooses.",
      },
      {
        q: "What do the four levels mean?",
        a: "Standard Met means the student met the standard for the grade, and Standard Exceeded means they went beyond it. Standard Nearly Met and Standard Not Met mean they are still building those skills. Talk with your child's teacher about what the score means for your child.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts and science skills in California's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in California is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Social studies is “Learning and Working Now and Long Ago”: rules, jobs, calendars and the flags and symbols of the country and the state.",
      lookFor: "Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies is “A Child's Place in Time and Space”: maps, American symbols and holidays, and school and travel long ago.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money, time and estimating. Science looks at materials, plants and animals, and how land changes, and social studies is “People Who Make a Difference”, from family history to heroes long ago and today.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study “Continuity and Change” in their own region: its land, the California Indian nations who live there, its history and local government. It is also the first year of the CAASPP state tests in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is all about California, a changing state: its regions, California Indian nations, the missions and ranchos, the Gold Rush and statehood, the state's growth and its government.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on California history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is US history and geography, from the first nations and the explorers to the colonies, the Revolution, the Constitution and westward movement, and students take the CAST science test.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many California districts. Math moves to ratios, rates, negative numbers and expressions. Science follows California's integrated middle school model, with topics from life, Earth and physical science each year, and social studies is ancient civilizations, from early people to Rome, India and China.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Integrated science covers chemical reactions, ecosystems and Earth's systems, and social studies is medieval and early modern times: Rome's fall, Islam, China, Africa, Japan, Europe, the Americas, and the Scientific Revolution and Enlightenment.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Integrated science covers forces, heredity, evolution and space, and social studies is US history from the founding to 1914: the Constitution, the new nation, the West, the Civil War, Reconstruction and industrial America. Students also take the CAST science test.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} follows California's Algebra I course (expressions, equations, functions and data), and English classes read and write more closely. California schools usually teach the Principles of American Democracy in 12th grade, so ${APP_NAME} gives 9th graders a head start on it: the ideas behind the Constitution, rights, the three branches, landmark Supreme Court cases, elections, California's government and the media.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
