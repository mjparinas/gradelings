import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for North Carolina, in US English. North Carolina has no statewide social and emotional learning
// standards, so the competencies page explains North Carolina's Portrait of a Graduate, adopted by the State Board of
// Education in 2022: seven durable skills (adaptability, collaboration, communication, critical thinking, empathy, a
// learner's mindset and personal responsibility) that schools build into every subject. The assessment page covers the
// End-of-Grade tests (reading and math in grades 3 to 8, science in 5 and 8), the End-of-Course tests in high school
// (NC Math 1, NC Math 3, English II and Biology), the Read to Achieve reading checks in Kindergarten to 3rd grade and
// the Kindergarten Entry Assessment. Dates change each year, so the page points to the North Carolina Department of
// Public Instruction (NCDPI). North Carolina has no French subject here, so no French guide. Record:
// docs/research/north-carolina/README.md.

export const NORTH_CAROLINA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "portrait-of-a-graduate",
    label: "Portrait of a Graduate",
    hubBlurb: "The seven durable skills North Carolina wants every graduate to have, from collaboration to a learner's mindset.",
    description:
      "What North Carolina's Portrait of a Graduate means for parents: the seven durable skills (adaptability, collaboration, communication, critical thinking, empathy, a learner's mindset and personal responsibility), with simple ways to build them at home.",
    gradeLine: "North Carolina's Portrait of a Graduate skills grow in every grade.",
    closing: "these skills grow every time your child works with others, explains an idea or sticks with something hard.",
    title: "North Carolina's Portrait of a Graduate, explained for parents",
    intro:
      "North Carolina's Standard Course of Study lists what students learn in each grade and subject. In 2022 the State Board of Education also adopted a Portrait of a Graduate: seven durable skills that help young people succeed in school, work and life. They aren't a separate subject or a grade. Teachers build them into everyday lessons in every subject, from Kindergarten to graduation.",
    items: [
      {
        id: "working-with-others",
        name: "Working with others",
        blurb: "Collaboration, communication and empathy: the skills of getting things done together.",
        parts: [
          { name: "Collaboration", blurb: "Sharing the work, listening to teammates and building on each other's ideas." },
          { name: "Communication", blurb: "Saying, writing and showing ideas clearly, and listening well." },
          { name: "Empathy", blurb: "Understanding how other people feel and see things, and treating them with respect." },
        ],
        atHome: [
          "Plan a family meal or outing together, and give your child a real part of the job.",
          "At dinner, ask your child to explain something they learned so you could do it too.",
          "After a story or a disagreement, ask “How do you think they felt?”",
        ],
      },
      {
        id: "thinking",
        name: "Thinking",
        blurb: "Critical thinking: asking good questions, weighing evidence and solving problems.",
        parts: [
          { name: "Asking questions", blurb: "Wondering why and how, and figuring out what you need to know." },
          { name: "Weighing evidence", blurb: "Checking whether information is reliable and backing up ideas with reasons." },
          { name: "Solving problems", blurb: "Making a plan, trying it and changing course when it doesn't work." },
        ],
        atHome: [
          "Ask “How do you know?” after an answer, even when it's right.",
          "When you see a claim online or in an ad, ask together who made it and why.",
          "Let your child solve a real problem, like fitting groceries in the budget, and explain each step.",
        ],
      },
      {
        id: "growing",
        name: "Growing as a learner",
        blurb: "A learner's mindset, adaptability and personal responsibility: the habits of a learner who keeps going.",
        parts: [
          { name: "Learner's mindset", blurb: "Believing skills grow with practice, and being curious about new things." },
          { name: "Adaptability", blurb: "Staying calm and flexible when plans change or something is hard." },
          { name: "Personal responsibility", blurb: "Owning your choices, keeping commitments and managing your time." },
        ],
        atHome: [
          "Praise effort and strategies (“You tried a new way!”) more than being smart.",
          "Talk about a time you made a mistake and what you learned from it.",
          "Give your child a regular job at home and let them plan when to do it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Portrait of a Graduate skills graded?",
        a: "Not as a subject. They are part of how every subject is taught, and some report cards comment on related habits, like working with others or managing time. How that is reported is up to the school or district.",
      },
      {
        q: "Does North Carolina have social and emotional learning standards?",
        a: "North Carolina has no statewide social and emotional learning standards. The Portrait of a Graduate covers several related skills, such as empathy, adaptability and personal responsibility, and many schools teach them in their own ways, so ask your school how it does.",
      },
      {
        q: "Where does the Portrait of a Graduate come from?",
        a: "The North Carolina State Board of Education adopted it in 2022, after hearing from families, teachers, students and employers across the state. The North Carolina Department of Public Instruction publishes it with resources for schools.",
      },
      {
        q: `Does ${APP_NAME} measure these skills?`,
        a: `Partly. ${APP_NAME} practices subject skills in math, English language arts, science and social studies, and many questions ask children to reason, weigh evidence or stick with something harder. Skills like collaboration and empathy grow best through conversation and real life, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school teaches them?",
        a: "Ask your child's teacher which skills the class is working on and what you can do at home. Many North Carolina districts also have their own portrait of a graduate built on the state's.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the North Carolina Department of Public Instruction",
    hubBlurb: "End-of-Grade tests in reading and math (grades 3 to 8) and science (grades 5 and 8), End-of-Course tests in high school, and Read to Achieve.",
    name: "North Carolina state tests (End-of-Grade and End-of-Course)",
    intro:
      "North Carolina students take End-of-Grade tests in reading and math in grades 3 to 8, and in science in grades 5 and 8. In high school, students take End-of-Course tests in NC Math 1, NC Math 3, English II and Biology. In Kindergarten to 3rd grade, schools also check every child's reading under the Read to Achieve law. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "Reading and math End-of-Grade tests: grades 3 to 8. Science: grades 5 and 8. High school End-of-Course tests: NC Math 1, NC Math 3, English II and Biology, in the year a student takes the course, so a middle schooler in NC Math 1 takes that test too. Students with the most significant cognitive disabilities may take the NCEXTEND1 alternate assessment instead." },
      { title: "When", body: "End-of-Grade tests are given in the last weeks of the school year. End-of-Course tests are given at the end of the course, which can be in winter for semester courses. Each district sets its own days within the testing window NCDPI sets each year." },
      { title: "Reading checks in Kindergarten to 3rd grade", body: "Under North Carolina's Read to Achieve law, schools check every child's reading with a short screener (mCLASS) at the beginning, middle and end of the year in Kindergarten to 3rd grade, tell families how their child is doing and give extra help to children who need it. Third graders also take a reading test at the start of the year." },
      { title: "Third grade reading", body: "A 3rd grader who isn't yet reading at grade level by the end of the year can get more help, including a summer reading camp, and another chance to show their reading. Read to Achieve has good-cause exemptions, and the school works with the family to decide what comes next. Ask your school how it applies the rules." },
      { title: "How results are described", body: "Scores are reported as achievement levels. Level 3 and above count as grade-level proficient, and higher levels show stronger work. Families get a score report from the school that explains what each level means." },
      { title: "Report card link", body: "End-of-Grade scores don't change your child's report card. They are one more snapshot for families, teachers and schools. In high school, the End-of-Course test counts toward the final course grade." },
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
        q: "What are the End-of-Grade tests?",
        a: "They are North Carolina's state tests for grades 3 to 8. They check the North Carolina Standard Course of Study in reading and math every year, and in science in grades 5 and 8, mostly online.",
      },
      {
        q: "Which grades take the science test?",
        a: "Science is tested in grades 5 and 8. In high school, Biology has an End-of-Course test.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your district chooses. In high school, an End-of-Course test counts toward the course grade.",
      },
      {
        q: "Can my child skip the state tests?",
        a: "North Carolina expects every student to take the state tests, and state law has no opt-out process. If you have concerns, talk with your child's school.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in North Carolina's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "NC Pre-K funds a year for four-year-olds in public schools, Head Start and licensed child care centers. It follows North Carolina Foundations for Early Learning and Development.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in North Carolina is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about families, traditions, rules, needs and wants, and simple maps. Early in the year, teachers use the Kindergarten Entry Assessment to get to know each child, and reading is checked with a short screener three times a year.",
      lookFor: "Many North Carolina districts use standards-based report cards in the early grades. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies covers communities and the people who shape them, landforms and maps, and why people trade.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Social studies is about America: its symbols and values, the three branches of government, and people of many backgrounds who worked for freedom and fairness.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study North Carolina communities: their regions, history, local, state and tribal government, and economy. It is also the first year of the End-of-Grade tests in reading and math, and the Read to Achieve law looks closely at reading by the end of 3rd grade.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science covers magnets, electricity, light, fossils, rocks and minerals, and the phases of the moon. Social studies is North Carolina studies: its three regions, its American Indian nations, its history from the Roanoke colonies to today, and how its government and economy work.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and explaining causes and effects in history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science covers matter, forces, body systems, ecosystems and how the ocean shapes North Carolina's weather, and students take the End-of-Grade science test. Social studies is United States history, from the colonies and the Constitution to the Civil War, the Great Depression and the civil rights movement.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in most North Carolina districts. Math moves to ratios, rates, negative numbers and expressions. Science covers atoms, heat, waves, plants, the solar system and Earth's layers, and social studies is world history from the first farmers and early civilizations to about 1400.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers forces and motion, cells, body systems and heredity, and the atmosphere and weather. Social studies is world history since about 1400: exploration, revolutions, the world wars and the world today.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem, and some students take NC Math 1. Science covers chemistry, disease, evolution, Earth's history and North Carolina's water and energy, with the End-of-Grade science test. Social studies is North Carolina and United States history together, from the colony to today, with its struggles over rights and its innovations.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school, and most students take NC Math 1, which ends with an End-of-Course test. English classes read and write more closely, and science covers biology and physical science. Social studies in ${APP_NAME} is Founding Principles of the United States and North Carolina: Civic Literacy, and Economics and Personal Finance. North Carolina students need both to graduate.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
