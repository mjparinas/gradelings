import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Wisconsin, in US English. The competencies page is the Department of Public Instruction's six
// Guiding Principles for Teaching and Learning, which underpin all of Wisconsin's academic standards. They are not a
// graded subject. The assessment page covers the Wisconsin Forward Exam (English language arts and math in grades 3 to
// 8, science in grades 4 and 8, social studies in grades 4, 8 and 10), PreACT Secure in grades 9 and 10, the ACT in
// grade 11 and Dynamic Learning Maps for students with the most significant cognitive disabilities. Dates change each
// year, so the page points to DPI. Wisconsin has no French subject here, so no French guide. Record:
// docs/research/wisconsin/README.md.

export const WISCONSIN_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "guiding-principles",
    label: "Guiding Principles",
    hubBlurb: "The six Guiding Principles behind all of Wisconsin's standards, in plain words.",
    description:
      "What the Wisconsin Department of Public Instruction's six Guiding Principles for Teaching and Learning mean (every student can learn, rigorous and relevant teaching, assessment that helps learning, shared responsibility, students' strengths, and welcoming classrooms), how they show up at school, and simple ways to support them at home.",
    gradeLine: "Wisconsin's Guiding Principles for Teaching and Learning apply in every grade and every subject.",
    closing: "these ideas come alive through conversation, curiosity and a home that treats mistakes as part of learning.",
    title: "Wisconsin's Guiding Principles for Teaching and Learning, explained for parents",
    intro:
      "Behind every one of Wisconsin's academic standards are six Guiding Principles for Teaching and Learning from the Department of Public Instruction (DPI). They describe what good teaching and learning look like in every subject, from kindergarten math to high school history. They are not a separate subject and not graded on their own, but they explain why your child's classroom works the way it does, and families have a part in each one.",
    items: [
      {
        id: "right-to-learn",
        name: "Every Student Has the Right to Learn",
        blurb: "Every child can learn and deserves support to reach high goals.",
        parts: [
          { name: "High expectations", blurb: "Teachers expect every child to grow, whatever their starting point." },
          { name: "Support that fits", blurb: "Children get the help they need to reach those goals." },
        ],
        atHome: [
          "Say “You can't do it yet” instead of “You can't do it.”",
          "Praise effort and good strategies, not just right answers.",
          "If your child is stuck, ask the teacher what support the school offers.",
        ],
      },
      {
        id: "rigorous-relevant",
        name: "Instruction Must Be Rigorous and Relevant",
        blurb: "Learning should be challenging and connected to real life.",
        parts: [
          { name: "Challenge", blurb: "Work asks children to think, not only to remember." },
          { name: "Real connections", blurb: "Lessons link to children's lives, their community and the world." },
        ],
        atHome: [
          "Use real problems: doubling a recipe, planning a trip, comparing prices at the store.",
          "Ask “Why do you think that?” and “How do you know?”",
          "Connect school topics to places you visit, like a park, museum or farm.",
        ],
      },
      {
        id: "purposeful-assessment",
        name: "Purposeful Assessment Drives Instruction",
        blurb: "Checking what children know helps teachers decide what to teach next.",
        parts: [
          { name: "Feedback", blurb: "Quizzes, projects and conversations show what a child understands." },
          { name: "Next steps", blurb: "Teachers use that information to plan and adjust." },
        ],
        atHome: [
          "Look at returned work together and ask what your child learned from the comments.",
          "Treat mistakes as clues about what to practice next.",
          "Ask the teacher what a test or report card mark means for next steps.",
        ],
      },
      {
        id: "collaborative-responsibility",
        name: "Learning Is a Collaborative Responsibility",
        blurb: "Families, teachers, schools and communities share the job of helping children learn.",
        parts: [
          { name: "Families and schools", blurb: "Parents and teachers work as a team." },
          { name: "Community", blurb: "Libraries, clubs and neighbors all help children grow." },
        ],
        atHome: [
          "Share what you notice about your child with the teacher, and ask what they notice.",
          "Visit the public library together and let your child choose books.",
          "Go to a school event or conference when you can.",
        ],
      },
      {
        id: "students-strengths",
        name: "Students Bring Strengths and Experiences to Learning",
        blurb: "Every child's language, culture and experiences are a starting point for learning.",
        parts: [
          { name: "What children bring", blurb: "Home languages, family traditions and interests help learning." },
          { name: "Building on strengths", blurb: "Teachers start from what children already know and can do." },
        ],
        atHome: [
          "Tell family stories and share traditions; they are knowledge too.",
          "Read and talk in your home language as much as you like.",
          "Notice what your child is curious about and help them learn more about it.",
        ],
      },
      {
        id: "responsive-environments",
        name: "Responsive Environments Engage Learners",
        blurb: "Children learn best where they feel safe, welcome and respected.",
        parts: [
          { name: "Safe and welcoming", blurb: "Classrooms where every child belongs." },
          { name: "Engaging", blurb: "Activities that invite children to take part and take risks." },
        ],
        atHome: [
          "Set up a calm, regular place and time for homework or reading.",
          "Ask your child where and when they feel they learn best.",
          "Keep the tone kind when work is hard, so trying feels safe.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Guiding Principles graded?",
        a: "No. They describe how teaching and learning should work in every subject. Your child's report card shows progress on the academic standards, and some report cards also comment on work habits.",
      },
      {
        q: "Who wrote them?",
        a: "The Wisconsin Department of Public Instruction (DPI). They are printed at the start of Wisconsin's academic standards documents.",
      },
      {
        q: "Do schools have to follow a set curriculum?",
        a: "No. Wisconsin's standards say what students should learn, and each district chooses its own curriculum, materials and report card.",
      },
      {
        q: `How does ${APP_NAME} fit the Guiding Principles?`,
        a: `${APP_NAME} gives kind hints and a second try, adjusts what comes next to what your child knows, and lets children practice without a timer. It practices subject skills; it doesn't measure the Guiding Principles themselves.`,
      },
      {
        q: "Where can I read more?",
        a: "The Guiding Principles and every subject's standards are on DPI's website. Your child's teacher can tell you how the school puts them into practice.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Wisconsin Department of Public Instruction",
    hubBlurb: "The Forward Exam in English language arts and math (grades 3 to 8), science (4 and 8) and social studies (4, 8 and 10).",
    name: "Wisconsin state tests (Forward Exam)",
    intro:
      "Wisconsin students take the Wisconsin Forward Exam each spring: English language arts and math in grades 3 to 8, science in grades 4 and 8, and social studies in grades 4, 8 and 10. In high school, students take PreACT Secure in grades 9 and 10 and the ACT in grade 11. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "Forward Exam English language arts and math: grades 3 to 8. Science: grades 4 and 8. Social studies: grades 4, 8 and 10. PreACT Secure: grades 9 and 10. ACT with writing: grade 11. Students with the most significant cognitive disabilities may take the Dynamic Learning Maps alternate assessment instead." },
      { title: "When", body: "In spring, online. Each school sets its own days within the testing window DPI announces each year, so ask your school for this year's dates." },
      { title: "What they cover", body: "The Forward Exam checks Wisconsin's academic standards in English language arts, math, science and social studies. The high school tests check readiness for college and careers." },
      { title: "How results are described", body: "Forward Exam scores are reported in four levels: Developing, Approaching, Meeting and Advanced. Families get a score report from the school, and school results appear in DPI's public school report cards." },
      { title: "Early reading checks", body: "Schools also screen reading skills from kindergarten to 3rd grade to find children who need extra help early. A screener helps teachers plan; it isn't a grade." },
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
        q: "What is the Forward Exam?",
        a: "The Wisconsin Forward Exam is Wisconsin's state test in English language arts and math for grades 3 to 8, science in grades 4 and 8, and social studies in grades 4, 8 and 10. It is given online in the spring.",
      },
      {
        q: "What do the four levels mean?",
        a: "Advanced and Meeting mean a student met or went beyond the grade's expectations. Approaching and Developing mean there is more to learn. The levels describe one test day, not your child's whole year.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school chooses. DPI's school report cards are something different: public reports on each school and district.",
      },
      {
        q: "Can my child skip the state tests?",
        a: "Ask your school. Wisconsin law lets a parent ask for their child to be excused from some state tests, and your school can explain how to ask and what it means for your child.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in Wisconsin's academic standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Most Wisconsin school districts offer a free 4K year for four-year-olds, often with community child care partners. It follows the Wisconsin Model Early Learning Standards (4th edition).",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Wisconsin is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about themselves, families, rules and jobs. Schools also check early reading skills to see who needs extra help.",
      lookFor: "Many Wisconsin districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies covers maps, communities, jobs and Wisconsin's symbols.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies compares communities then and now.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study Wisconsin's land and communities and how local government works. It is also the first year of the Forward Exam in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is a year about Wisconsin: its regions, the eleven First Nations of Wisconsin, fur traders and statehood, America's Dairyland, and how the state is governed. Students take the Forward Exam in science and social studies as well as English language arts and math.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Wisconsin history.",
    },
    "5": {
      overview: `In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies in ${APP_NAME} is early United States history, from the colonies to the Revolution and the Constitution.`,
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: `6th grade is the start of middle school in many Wisconsin districts. Math moves to ratios, rates, negative numbers and expressions. Science covers weather, climate and how living things grow, and social studies in ${APP_NAME} looks at world regions and ancient civilizations.`,
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: `In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies in ${APP_NAME} is world history from medieval times to the age of revolutions.`,
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is United States history from the founding to Reconstruction, including Wisconsin's part in it, with the US and Wisconsin constitutions. Students take the Forward Exam in all four subjects this year.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies covers civics, including how Wisconsin's government works under its 1848 constitution, plus personal finance and economics. Wisconsin students must pass a civics test to graduate, and students graduating from 2028 need a half credit of personal finance. Students take PreACT Secure in the spring.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
