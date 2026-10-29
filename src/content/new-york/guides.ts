import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for New York, in US English. The competencies page is the New York State Education Department's
// (NYSED) Social Emotional Learning Benchmarks: first set out in 2018 and revised in November 2022, with three goals
// (self-awareness and self-management; social awareness and interpersonal skills; decision-making and responsible
// behavior), base indicators under each goal and benchmarks by developmental band (K-2, 3-5, 6-8, 9-10, 11-12). NYSED
// says they are for voluntary use and "not meant to be used ... to grade student performance" (sel-benchmarks.pdf).
// It uses the existing `sel-standards` URL segment so the shared route folder serves New York too.
// The assessment page covers the New York State Testing Program as NYSED's parent pages describe it (checked October
// 2026): the grades 3-8 English language arts and mathematics tests and the elementary-level (grade 5) and
// intermediate-level (grade 8) science tests, taken on computer, untimed; ELA and math over two days, science in one;
// performance Levels 1 to 4 with Level 3 proficient; score reports expected in September; individual grades 3-8 ELA
// and math scores kept off the transcript; promotion not based solely or primarily on the tests; NYSAA for students
// with severe cognitive disabilities; Regents exams in high school; WIDA ACCESS as the annual English language
// proficiency test (it replaced the NYSESLAT, which NYSED now lists under its archive). Dates change each year, so the
// page points to NYSED. It makes no claim about opting out. New York has no French subject, so no French guide. Grade
// notes follow NYSED's Next Generation Learning Standards (docs/research/new-york/outcomes.json), the P-12 Science
// Learning Standards and the New York State K-12 Social Studies Framework's grade themes.

export const NEW_YORK_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "sel-standards",
    label: "Social emotional learning",
    hubBlurb: "New York's three social emotional learning goals, from knowing yourself to making good decisions, in plain words.",
    description:
      "What New York State's Social Emotional Learning Benchmarks mean (self-awareness and self-management, social awareness and interpersonal skills, and responsible decision-making), how they show up at school, and simple ways to support them at home.",
    gradeLine: "New York's social emotional learning benchmarks apply in every grade.",
    closing: "social and emotional skills grow through conversation, play and everyday responsibilities.",
    title: "New York's Social Emotional Learning Benchmarks, explained for parents",
    intro:
      "Alongside subjects like math and science, the New York State Education Department (NYSED) publishes Social Emotional Learning Benchmarks: the skills students use to understand themselves, manage their feelings, get along with others and make caring choices. The benchmarks were first set out in 2018 and updated in 2022. They name three goals, with benchmarks for each grade band from kindergarten to 12th grade. They are guidance for voluntary use, so each district decides how to use them, and they are not graded.",
    items: [
      {
        id: "self-awareness",
        name: "Self-awareness and self-management",
        blurb: "Knowing your feelings, strengths and interests, and using that to manage yourself and reach goals.",
        parts: [
          { name: "Feelings", blurb: "Naming emotions and understanding how they affect what you do." },
          { name: "Identity", blurb: "Knowing what makes you who you are, including your family, culture and interests." },
          { name: "Goals", blurb: "Setting personal and school goals and working steadily toward them." },
        ],
        atHome: [
          "Name feelings out loud, yours and theirs: “You look frustrated. Is the puzzle tricky?”",
          "Practice a calm-down step together, like three slow breaths or a short walk.",
          "Help your child set a small weekly goal and check in on it together.",
        ],
      },
      {
        id: "social-awareness",
        name: "Social awareness and interpersonal skills",
        blurb: "Understanding other people, getting along and building friendships where everyone belongs.",
        parts: [
          { name: "Empathy", blurb: "Imagining how others feel and seeing things from their point of view." },
          { name: "Similarities and differences", blurb: "Respecting what makes each person and group unique, and what people share." },
          { name: "Communication", blurb: "Listening, speaking up with care and working well with others." },
          { name: "Solving conflicts", blurb: "Preventing, managing and working through disagreements fairly." },
        ],
        atHome: [
          "When reading a story, ask how a character feels and why.",
          "Play a board game and practice taking turns and losing gracefully.",
          "After a disagreement, talk through what each person wanted and what could work for both.",
        ],
      },
      {
        id: "decision-making",
        name: "Decision-making and responsible behavior",
        blurb: "Making thoughtful choices that keep yourself and others safe and well, at home, at school and in the community.",
        parts: [
          { name: "Safety and well-being", blurb: "Thinking about how a choice affects your own and other people's safety and feelings." },
          { name: "Making decisions", blurb: "Weighing options and their results to make good choices in school and with friends." },
          { name: "Helping the community", blurb: "Taking action to help your school and community, and standing up for fairness." },
        ],
        atHome: [
          "Before a family decision, list the options and what might happen with each.",
          "Wonder out loud together: “What could we do? What might happen next?”",
          "Plan a small way to help a neighbor or your community, then talk about how it went.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are these social emotional skills graded?",
        a: "No. NYSED says the benchmarks are guidance for voluntary use and are not meant to grade students. Some districts mention work habits or social skills on the report card, but how they do it is up to the district.",
      },
      {
        q: "What are New York's three SEL goals?",
        a: "Self-awareness and self-management; social awareness and interpersonal skills; and decision-making and responsible behavior. Each goal has a few base indicators, with benchmarks for kindergarten to 2nd grade, 3rd to 5th grade, middle school and high school.",
      },
      {
        q: "Why are the benchmarks written by grade band, not by grade?",
        a: "Children grow these skills at different speeds, so NYSED groups the benchmarks into bands (K–2, 3–5, 6–8, 9–10 and 11–12) and expects children to keep practicing earlier skills as they grow.",
      },
      {
        q: `Does ${APP_NAME} measure social and emotional skills?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. Its kind hints, small goals and calm options can help children stick with hard things, but social and emotional skills grow through conversation, play and teamwork, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about SEL at my child's school?",
        a: "Ask your child's teacher or school counselor how the school builds these skills and what you can do at home. NYSED's website has the full Social Emotional Learning Benchmarks.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the New York State Education Department (NYSED)",
    hubBlurb: "New York's grades 3 to 8 English language arts and math tests, and the science tests in grades 5 and 8.",
    name: "New York State tests (grades 3–8)",
    intro:
      "Each spring, New York students in grades 3 to 8 take the New York State English Language Arts and Mathematics Tests, and students in grades 5 and 8 also take a science test. The tests check the learning standards taught in class. They are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: every grade from 3 to 8. Science: grade 5 (the elementary-level test) and grade 8 (the intermediate-level test), based on New York's P-12 Science Learning Standards. Students with severe cognitive disabilities may take the New York State Alternate Assessment (NYSAA) instead." },
      { title: "What they cover", body: "The English language arts and math tests follow New York's Next Generation Learning Standards. Students read passages, write answers using evidence and solve real-world word problems, explaining their reasoning in open-ended answers. The science tests include questions where students graph, sort or drag answers." },
      { title: "When and how", body: "Students test on a computer in the spring. Schools pick two days in a row for English language arts and two for math, and one day for science, within the window NYSED sets each year. The tests are untimed: a student who is working productively gets the time they need within the school day." },
      { title: "How results are described", body: "Scores are reported in four levels. Level 4 means the student excels in the standards for their grade, Level 3 means proficient, Level 2 partially proficient and Level 1 below proficient. NYSED expects parent score reports around September, and they show how your child did in specific skill areas." },
      { title: "In high school", body: "High school students take Regents Exams at the end of some courses. Many students take the Algebra I Regents, and often a science Regents such as Earth and Space Sciences or Life Science: Biology, in 9th grade. Ask your school which Regents Exams your child will take." },
      { title: "English language learners", body: "Students who are learning English also take a yearly English language proficiency test. New York now uses WIDA ACCESS, which took the place of the NYSESLAT." },
      { title: "Report card link", body: "State test scores don't change your child's report card. NYSED says individual grades 3–8 English language arts and math scores are not put on a student's transcript or permanent record, and districts can't base promotion decisions solely or mainly on them." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, then ask your child to retell what happened and point to the words that show it.",
      "Encourage short daily writing: a journal entry, a note or a list with reasons.",
      "Practice math with real problems (shopping, cooking, travel times) as well as math facts.",
      "Try NYSED's online question sampler together, so the computer screens feel familiar.",
      "Tell your child the tests show what they know. They are not something to fail.",
    ],
    faqs: [
      {
        q: "Which state tests will my child take?",
        a: "English language arts and math every year from 3rd to 8th grade, and science in 5th and 8th grade. In high school, students take Regents Exams at the end of some courses.",
      },
      {
        q: "When are the tests?",
        a: "In the spring, but the dates change each year. NYSED posts the testing window at www.nysed.gov/state-assessment, and your school sets its own days within it.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your district chooses, so the two can tell different parts of the story.",
      },
      {
        q: "What do Levels 1 to 4 mean?",
        a: "Level 3 means your child is proficient in the standards for their grade, and Level 4 means they excel. Level 2 means partially proficient and Level 1 below proficient, so they are still building those skills. Talk with your child's teacher about what the score means for your child.",
      },
      {
        q: "Who can I talk to about state testing?",
        a: "Your child's teacher or principal can explain how your school runs the tests, what accommodations your child may get and anything else about your child taking part. NYSED's parent resources are on its state assessment pages.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts and science skills in New York's learning standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "New York offers free, full-day Pre-K for 4-year-olds in most school districts, including every New York City family who applies. It follows the New York State Prekindergarten Learning Standards: approaches to learning, physical and social-emotional development, language and literacy, math, science, social studies and the arts.",
      lookFor: "Pre-K reports are usually progress notes, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in New York is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 by ones and tens, and add and subtract within 5 fluently. Science explores pushes and pulls, sunlight, weather and what plants and animals need, and social studies is “Self and Others”: families, rules, symbols, maps and needs and wants.",
      lookFor: "Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, count to 120, tell time to the half hour and start naming coins. Science covers light and sound, plant and animal parts and patterns in the sky, and social studies is “My Family and Other Families, Now and Long Ago”.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, time to five minutes and coins up to a dollar. Science looks at materials, plants and animals in their habitats and how land changes, and social studies is “My Community and Other United States Communities”: urban, suburban and rural places, rules and jobs.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study forces, life cycles and weather in science. Social studies is “Communities around the World”: geography, cultures, governments and how people meet their needs. It is also the first year of the New York State tests in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions, decimals and angles, and longer writing. Science covers energy, waves, Earth's changing surface and how animals' bodies work. Social studies is “Local History and Local Government”: New York State's geography, the Native American nations who live here, such as the Haudenosaunee nations, colonial and Revolutionary New York, government, and immigration.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on New York history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract, multiply and divide with fractions, work with decimals, volume and the coordinate plane, and write longer pieces with evidence. Science covers matter, ecosystems, gravity and Earth's systems, and students take the elementary-level science test. Social studies is “The Western Hemisphere”: early peoples and civilizations of the Americas, European exploration, and the geography, cultures and governments of North, Central and South America and the Caribbean.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many New York districts. Math moves to ratios, rates, negative numbers, expressions and equations. Middle school science in New York is a 6–8 band, so schools spread life, Earth and space, and physical science across the three years. Social studies is “The Eastern Hemisphere”: geography, early river valley civilizations, world religions, classical civilizations and trade across Asia, Africa and Europe.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers, equations and inequalities, circles and probability. Science continues the 6–8 band. Social studies begins “History of the United States and New York”: Native Americans, colonial life, independence, the Constitution, westward expansion, reform movements and the Civil War.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, systems of equations, functions, transformations and the Pythagorean theorem. Students finish the 6–8 science band and take the intermediate-level science test. Social studies continues United States and New York history from Reconstruction through industrial growth and immigration, both world wars, the Great Depression and the civil rights movement.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} follows New York's Algebra I course (expressions, equations, functions and data), which ends with the Algebra I Regents Exam. English classes read and write more closely, and science is a high school course such as Earth and Space Sciences or Life Science: Biology. Social studies is Global History and Geography I: early civilizations, belief systems, classical empires, trade networks and the world up to about 1750.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math, lab work in science and weighing perspectives in social studies and English.",
    },
  },
};
