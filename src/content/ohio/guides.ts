import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Ohio, in US English. The competencies page is Ohio's K-12 Social and Emotional Learning
// Standards, adopted by the State Board of Education in June 2019: five competencies (self-awareness, self-management,
// social awareness, relationship skills and responsible decision-making) with benchmarks for grade bands. They are
// not tested or graded, and schools choose how to teach them. The assessment page covers Ohio's State Tests (English
// language arts and math in grades 3 to 8, science in grades 5 and 8, five performance levels from Limited to
// Advanced), the high school end-of-course exams, the Kindergarten Readiness Assessment and the Third Grade Reading
// Guarantee, under which a parent decides since 2023 whether a child who scores below the promotion score moves on to
// 4th grade. Dates change each year, so the page points to the Ohio Department of Education and Workforce. Ohio has
// no French subject here, so no French guide. Record: docs/research/ohio/README.md.

export const OHIO_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "sel-standards",
    label: "SEL standards",
    hubBlurb: "Ohio's five Social and Emotional Learning competencies, in plain words.",
    description:
      "What Ohio's K-12 Social and Emotional Learning Standards mean (self-awareness, self-management, social awareness, relationship skills and responsible decision-making), how schools teach them, and simple ways to support them at home.",
    gradeLine: "Ohio's Social and Emotional Learning Standards apply from kindergarten through 12th grade.",
    closing: "these skills grow through conversation, play, teamwork and everyday responsibilities, not worksheets.",
    title: "Ohio's Social and Emotional Learning Standards, explained for parents",
    intro:
      "Ohio's State Board of Education adopted K-12 Social and Emotional Learning (SEL) standards in June 2019. They describe five competencies, with skills that grow from kindergarten to 12th grade: understanding yourself, managing yourself, understanding others, getting along with others and making good decisions. Schools choose how to teach them, and they are not tested or graded as a subject.",
    items: [
      {
        id: "self-awareness",
        name: "Self-Awareness",
        blurb: "Understanding your own feelings, strengths and goals.",
        parts: [
          { name: "Emotions", blurb: "Naming feelings and noticing how they affect what we do." },
          { name: "Identity and strengths", blurb: "Knowing what you are good at, what you are working on and what makes you who you are." },
          { name: "Goals and support", blurb: "Setting goals and knowing which trusted adults can help." },
        ],
        atHome: [
          "Use feeling words at home: “You look frustrated. Is that right?”",
          "Ask your child what they are proud of this week and what they want to get better at.",
          "Help them name two adults outside the family they could go to for help.",
        ],
      },
      {
        id: "self-management",
        name: "Self-Management",
        blurb: "Handling feelings, sticking with hard things and working toward goals.",
        parts: [
          { name: "Managing emotions", blurb: "Calming down and choosing what to do next." },
          { name: "Persistence", blurb: "Keeping going and bouncing back when something is hard." },
          { name: "Reaching goals", blurb: "Making a plan, solving problems along the way and checking progress." },
        ],
        atHome: [
          "Practice a calm-down routine together: three slow breaths, a drink of water or a short walk.",
          "When your child gets stuck, ask “What could you try next?” before helping.",
          "Break a big job, like a project, into small steps on a list they can check off.",
        ],
      },
      {
        id: "social-awareness",
        name: "Social Awareness",
        blurb: "Understanding how others feel and respecting different points of view.",
        parts: [
          { name: "Other people's feelings", blurb: "Noticing how others feel and why." },
          { name: "Communicating", blurb: "Talking and listening well at school and with friends." },
          { name: "Different backgrounds", blurb: "Respecting people's cultures, languages, abilities and experiences." },
        ],
        atHome: [
          "While reading or watching a show, ask “How do you think that character feels? Why?”",
          "Talk about a time someone saw things differently from your child, and what they learned.",
          "Share foods, stories or celebrations from your family's background and from others'.",
        ],
      },
      {
        id: "relationship-skills",
        name: "Relationship Skills",
        blurb: "Making friends, working in a team and solving conflicts fairly.",
        parts: [
          { name: "Valuing others", blurb: "Seeing what people share and what makes them different." },
          { name: "Listening and speaking", blurb: "Taking turns, listening closely and saying things kindly." },
          { name: "Solving conflicts", blurb: "Working out disagreements without hurting others." },
        ],
        atHome: [
          "Play a board game together and practice winning and losing kindly.",
          "When siblings or friends argue, ask each to say what they want and find a fair plan together.",
          "Role-play how to ask to join a game or how to say no to a friend.",
        ],
      },
      {
        id: "responsible-decision-making",
        name: "Responsible Decision-Making",
        blurb: "Thinking through choices and how they affect yourself and others.",
        parts: [
          { name: "Asking questions", blurb: "Finding out more before deciding." },
          { name: "Many perspectives", blurb: "Weighing information and how a choice affects other people." },
          { name: "Safe choices", blurb: "Making thoughtful, safe and kind choices at school, with friends and online." },
        ],
        atHome: [
          "Before a decision, ask “What could happen if…?” and talk through two or three options.",
          "Agree on simple rules for being online together, and talk about why they matter.",
          "After a mistake, ask what they would do differently next time, without blame.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the SEL standards graded or tested?",
        a: "No. Ohio's SEL standards are not tested by the state, and schools decide how to teach them. Some report cards comment on related habits, like working with others or following directions.",
      },
      {
        q: "Do schools have to teach them?",
        a: "Ohio offers the standards as guidance, and each district decides how to use them. Many build them into morning meetings, classroom routines and counseling lessons. Ask your school what it does.",
      },
      {
        q: "Where do the standards come from?",
        a: "Ohio teachers, school counselors and other educators wrote them, and the State Board of Education adopted them in June 2019. They are written in grade bands, so each skill grows over several years.",
      },
      {
        q: `Does ${APP_NAME} measure social and emotional skills?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. Its kind hints, small goals and calm options can help children stick with hard things, but these skills grow through conversation, play and teamwork, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school teaches them?",
        a: "Ask your child's teacher or counselor how the school builds these skills and what you can do at home. The full standards are on the Ohio Department of Education and Workforce's website.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Ohio Department of Education and Workforce",
    hubBlurb: "Ohio's State Tests in English language arts and math (grades 3 to 8) and science (grades 5 and 8).",
    name: "Ohio's State Tests",
    intro:
      "Ohio students take Ohio's State Tests each spring: English language arts and math in grades 3 to 8, and science in grades 5 and 8. Third graders also take the English language arts test in the fall. In high school, students take end-of-course exams in Algebra I, Geometry, English Language Arts II, Biology, American History and American Government. Kindergartners take the Kindergarten Readiness Assessment at the start of the year. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 8. Science: grades 5 and 8. High school: end-of-course exams in Algebra I, Geometry, English Language Arts II, Biology, American History and American Government. Students with the most significant cognitive disabilities may take Ohio's alternate assessment instead." },
      { title: "When", body: "Most tests are in spring. Third grade English language arts is also given in the fall, and the Kindergarten Readiness Assessment is given near the start of kindergarten. Each school sets its own days within the windows the state announces each year." },
      { title: "The Third Grade Reading Guarantee", body: "Schools check every child's reading each year from kindergarten to 3rd grade, and a child who is behind gets a reading improvement and monitoring plan. Since 2023, a 3rd grader who scores below the promotion score moves on to 4th grade unless the parent asks for the child to repeat 3rd grade, after talking with the principal and reading teacher. Children who move on keep getting extra reading help." },
      { title: "What they cover", body: "The tests check Ohio's Learning Standards in English language arts, math and science, and the end-of-course exams check their high school courses." },
      { title: "How results are described", body: "Scores are reported in five performance levels: Limited, Basic, Proficient, Accomplished and Advanced. A score of 700 is Proficient. Families get a score report from the school." },
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
        q: "What are Ohio's State Tests?",
        a: "They are Ohio's yearly tests in English language arts and math in grades 3 to 8 and science in grades 5 and 8, plus the end-of-course exams in high school. They are given online, with paper versions for students who need them.",
      },
      {
        q: "Will my child have to repeat 3rd grade because of the reading test?",
        a: "Not unless you ask for it. Since 2023, a 3rd grader who scores below the promotion score moves on to 4th grade unless the parent asks for the child to repeat the grade, after talking with the principal and reading teacher. Either way, the school keeps giving extra reading help.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school chooses.",
      },
      {
        q: "Does social studies have a state test?",
        a: "Not in grades 3 to 8. In high school, American History and American Government have end-of-course exams.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in Ohio's Learning Standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Ohio is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about themselves, families, rules, maps and Ohio's symbols. Teachers give the Kindergarten Readiness Assessment near the start of the year and check each child's reading under the Third Grade Reading Guarantee.",
      lookFor: "Many Ohio districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Science looks at the sun, weather, motion and what living things need, and social studies compares families now and long ago, near and far.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science covers the atmosphere, motion and habitats, and social studies looks at how people's lives changed over time and at Ohio's regions.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study Ohio communities, past and present, and local government. It is also the first year of Ohio's State Tests in English language arts and math, and the year of the Third Grade Reading Guarantee.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is a year about Ohio in the United States: its land and regions, the earthworks of the Adena and Hopewell and the Native nations of the Ohio Country, the Northwest Ordinance and statehood in 1803, canals and the Underground Railroad, and how the state is governed.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Ohio history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science covers the solar system, light and sound, and ecosystems, and social studies is the Western Hemisphere: its regions, early civilizations, European exploration and economies. Students take the state science test.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Ohio districts. Math moves to ratios, rates, negative numbers and expressions. Science covers rocks and minerals, matter and motion, and cells, and social studies is the Eastern Hemisphere: its regions, maps, early civilizations, governments and markets.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers Earth and the moon, the conservation of mass and energy, and cycles of matter, and social studies is world history from ancient Greece to the first global age, around 1600.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers the physical Earth, forces and motion, and heredity, and social studies is United States history from 1492 to Reconstruction, including the nation's move west from the Ohio Country. Students take the state science test.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} is American Government, a course Ohio requires for graduation, including how Ohio governs itself under its 1851 constitution, plus economics and financial literacy, which Ohio students must also complete before they graduate.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, the end-of-course exams, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
