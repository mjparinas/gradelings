import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Missouri, in US English. The competencies page is the performance goals of the Show-Me
// Standards, adopted by the State Board of Education in 1996 and still the base of the Missouri Learning Standards:
// four goals for gathering and using information, communicating, solving problems and making responsible decisions,
// practised in every subject rather than graded on their own. The assessment page covers the Missouri Assessment
// Program (MAP): Grade-Level Assessments in English language arts and math in grades 3 to 8 and science in grades 5
// and 8, End-of-Course assessments in high school (Algebra I, English II, Biology and Government are required), the
// four achievement levels, and the reading assessments and reading success plans in kindergarten to 3rd grade (section
// 167.645, RSMo), under which a parent and the school discuss retention at the end of 3rd grade. Dates change each
// year, so the page points to the Department of Elementary and Secondary Education. Missouri has no French subject
// here, so no French guide. Record: docs/research/missouri/README.md.

export const MISSOURI_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "show-me-standards",
    label: "Show-Me Standards",
    hubBlurb: "The four performance goals of Missouri's Show-Me Standards, in plain words.",
    description:
      "What the four performance goals of Missouri's Show-Me Standards mean (gathering and using information, communicating, solving problems and making responsible decisions), how schools build them into every subject, and simple ways to support them at home.",
    gradeLine: "The Show-Me Standards' performance goals apply from kindergarten through 12th grade.",
    closing: "these skills grow through questions, projects, conversation and everyday responsibilities, not worksheets.",
    title: "Missouri's Show-Me Standards, explained for parents",
    intro:
      "Missouri's State Board of Education adopted the Show-Me Standards in 1996, and they are still the base of today's Missouri Learning Standards. Alongside what students should know in each subject, they set four performance goals: what students should be able to do with what they know. Teachers build the goals into every subject, so they are not graded on their own.",
    items: [
      {
        id: "goal-1",
        name: "Goal 1: Gather and Use Information",
        blurb: "Asking good questions, finding information and making sense of it.",
        parts: [
          { name: "Asking questions", blurb: "Wondering about the world and turning that into questions to explore." },
          { name: "Finding information", blurb: "Using books, people, observations and the internet to learn more." },
          { name: "Judging sources", blurb: "Deciding which information is accurate and useful." },
        ],
        atHome: [
          "When your child asks “Why?”, ask back “How could we find out?” and look it up together.",
          "Visit the library and let your child pick books about something they are curious about.",
          "Talk about how you know whether something you read online is true.",
        ],
      },
      {
        id: "goal-2",
        name: "Goal 2: Communicate Effectively",
        blurb: "Sharing ideas clearly in speaking, writing and other ways.",
        parts: [
          { name: "Speaking and listening", blurb: "Explaining ideas out loud and listening to others." },
          { name: "Writing", blurb: "Writing for different readers and purposes." },
          { name: "Other ways to share", blurb: "Using pictures, charts, models and technology to show what you mean." },
        ],
        atHome: [
          "At dinner, ask your child to explain something they learned as if you had never heard of it.",
          "Encourage notes, lists, letters or a journal, and praise clear ideas over perfect spelling.",
          "Let them draw a diagram or chart to show how something works.",
        ],
      },
      {
        id: "goal-3",
        name: "Goal 3: Solve Problems",
        blurb: "Working out what the problem is, trying ideas and checking results.",
        parts: [
          { name: "Understanding the problem", blurb: "Figuring out what is being asked and what is known." },
          { name: "Trying strategies", blurb: "Picking a plan, testing it and changing course when needed." },
          { name: "Checking", blurb: "Asking whether the answer makes sense." },
        ],
        atHome: [
          "When your child is stuck, ask “What do you already know?” before giving hints.",
          "Cook, build or plan a trip together and let them solve small problems along the way.",
          "Ask “Does that answer make sense? How could you check?”",
        ],
      },
      {
        id: "goal-4",
        name: "Goal 4: Make Responsible Decisions",
        blurb: "Thinking through choices and acting as a responsible member of a community.",
        parts: [
          { name: "Weighing choices", blurb: "Thinking about what might happen before deciding." },
          { name: "Working with others", blurb: "Cooperating, sharing jobs and respecting other people's ideas." },
          { name: "Being a good citizen", blurb: "Following through on responsibilities at home, at school and in the community." },
        ],
        atHome: [
          "Before a decision, ask “What could happen if…?” and talk through two or three options.",
          "Give your child a regular job at home and talk about why it matters to the family.",
          "Look for ways to help in your community together, like a food drive or a park cleanup.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Show-Me Standards graded or tested?",
        a: "Not on their own. The performance goals are built into the subject standards, so students practice them in reading, math, science and social studies. Some report cards comment on related habits, like working with others or explaining thinking.",
      },
      {
        q: "Are the Show-Me Standards the same as the Missouri Learning Standards?",
        a: "The Show-Me Standards are the foundation. The Missouri Learning Standards add grade-level expectations that say what students should learn in each grade and subject.",
      },
      {
        q: "Where do the standards come from?",
        a: "Missouri educators, parents and community members helped write the Show-Me Standards after a 1993 state law called for them, and the State Board of Education adopted them in 1996.",
      },
      {
        q: `Does ${APP_NAME} measure these goals?`,
        a: `Not directly. ${APP_NAME} practices subject skills in math, English language arts, science and social studies, and many questions ask children to read carefully, solve problems and explain, which builds the same habits. The goals grow best through conversation, projects and real responsibilities, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school uses them?",
        a: "Ask your child's teacher how the class practices these skills and what you can do at home. The standards are on the Missouri Department of Elementary and Secondary Education's website.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Missouri Department of Elementary and Secondary Education",
    hubBlurb: "The Missouri Assessment Program (MAP) in English language arts and math (grades 3 to 8) and science (grades 5 and 8).",
    name: "the Missouri Assessment Program (MAP)",
    intro:
      "Missouri students take the Missouri Assessment Program (MAP) Grade-Level Assessments each spring: English language arts and math in grades 3 to 8, and science in grades 5 and 8. In high school, students take End-of-Course assessments, including the required Algebra I, English II, Biology and Government. Schools also check reading in kindergarten to 3rd grade. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 8. Science: grades 5 and 8. High school: End-of-Course assessments in Algebra I, English II, Biology and Government, plus others some districts give. Students with the most significant cognitive disabilities may take the MAP Alternate Assessment (MAP-A) instead." },
      { title: "When", body: "Grade-Level Assessments are given in the spring, and End-of-Course assessments when a student finishes the course. Each school sets its own days within the windows the state announces each year." },
      { title: "Reading in kindergarten to 3rd grade", body: "Schools assess every child's reading at the beginning and end of each year from kindergarten to 3rd grade. A child who is a grade level or more behind, or at risk of dyslexia, gets a reading success plan with extra reading help. At the end of 3rd grade, a decision to promote or retain a child who is still well behind is made only after the school meets with the parent and makes a plan." },
      { title: "What they cover", body: "The tests check the Missouri Learning Standards in English language arts, math and science, and the End-of-Course assessments check their high school courses." },
      { title: "How results are described", body: "Scores are reported in four achievement levels: Below Basic, Basic, Proficient and Advanced. Families get a score report from the school." },
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
        q: "What is the MAP?",
        a: "The Missouri Assessment Program is Missouri's set of state tests: the Grade-Level Assessments in English language arts and math in grades 3 to 8 and science in grades 5 and 8, and the End-of-Course assessments in high school. They are given online.",
      },
      {
        q: "Will my child have to repeat 3rd grade because of reading?",
        a: "Not automatically. A child who is behind in reading gets a reading success plan and extra help. At the end of 3rd grade, if a child is still a grade level or more behind, the school and the parent talk together about whether the child moves on, and make a plan either way.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your district chooses.",
      },
      {
        q: "Does social studies have a state test?",
        a: "Not in grades 3 to 8. In high school, Government has a required End-of-Course assessment, and students must also pass a civics test and complete a course on the US and Missouri Constitutions to graduate.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Missouri Learning Standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Missouri's pre-K year runs in public schools, Head Start and state-funded programs for four-year-olds. It follows the Missouri Early Learning Standards (2021).",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Missouri is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about themselves, families, rules, maps, the flag and the people remembered on national holidays. Schools check each child's reading at the start and end of the year.",
      lookFor: "Report cards vary by district, and many use standards-based marks. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Science looks at the sky, sound and light, and plants and animals, and social studies covers communities, maps and American symbols such as the Statue of Liberty and the bald eagle.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science covers materials, plants and Earth's land and water, and social studies looks at communities over time, inventors and the regions of Missouri, from the Ozarks to the Bootheel.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and spend social studies on Missouri: its map and regions, the Osage and Missouria, Lewis and Clark and statehood, Dred Scott and the Civil War, and how the state is governed. It is also the first year of the MAP tests in English language arts and math, and the year schools decide with families about reading.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Science in Missouri covers forces and motion, energy and the changing Earth, and social studies is United States history before 1800: the first Americans, explorers, the colonies, the Revolution and the Constitution.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on early American history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science covers light, matter, ecosystems and the sun and stars, and social studies is United States history from 1800 to today, from the Louisiana Purchase to the civil rights movement. Students take the state science test.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Missouri districts. Math moves to ratios, rates, negative numbers and expressions. Science covers weather, climate, growth and engineering design, and social studies is world geography: maps, regions, people and economies around the world.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's surface and resources, and social studies is world history from the first farmers and early civilizations to about 1450.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, waves, heredity and space, and social studies is American history to about 1870, with Missouri at the center of the story: the Missouri Compromise, the trails west, Dred Scott, the Civil War and Reconstruction. Students take the state science test, and Missouri law calls for the study of the US and Missouri Constitutions to begin by now.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers Algebra I (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} is government: the US Constitution, the three branches and how Missouri governs itself, which Missouri students study for the required course on the US and Missouri Constitutions, plus the civics test they must pass to graduate.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, the End-of-Course assessments, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
