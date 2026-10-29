import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Hawaiʻi, in US English. The competencies page is the six General Learner Outcomes (GLOs), which
// the Hawaiʻi State Department of Education calls the foundation of standards-based learning in every grade: elementary
// teachers rate each one with a GLO rubric on the standards-based report card (HIDOE's GLO and elementary pages, in
// docs/research/hawaii/source). The assessment page covers the Smarter Balanced Assessments (SBA) in language arts and
// math (grades 3 to 8 and 11), the Hawaiʻi Assessments in Science (grades 5 and 8 and the Biology 1 end-of-course exam)
// and the Kaiapuni Assessment of Educational Outcomes (KĀʻEO) for Hawaiian language immersion students, from HIDOE's
// Types of Testing page; dates change each year, so the page points to the department. No French here, so no French
// guide. Record: docs/research/hawaii/README.md.

export const HAWAII_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "general-learner-outcomes",
    label: "General Learner Outcomes",
    hubBlurb: "The six General Learner Outcomes (GLOs) Hawaiʻi teachers rate on the elementary report card, in plain words.",
    description:
      "What Hawaiʻi's six General Learner Outcomes mean (self-directed learner, community contributor, complex thinker, quality producer, effective communicator, and effective and ethical user of technology), how they show up on the report card, and simple ways to support them at home.",
    gradeLine: "Hawaiʻi's General Learner Outcomes apply in every grade, and elementary report cards rate each one.",
    closing: "these habits grow through everyday routines and conversations, not only through schoolwork.",
    title: "Hawaiʻi's General Learner Outcomes (GLOs), explained for parents",
    intro:
      "Alongside the content standards for each subject, Hawaiʻi public schools teach six General Learner Outcomes, or GLOs. The Hawaiʻi State Department of Education calls them the foundation of standards-based learning for all students: they describe the kind of learner and person school hopes to grow, beyond academic success. In kindergarten to 6th grade, teachers use a GLO rubric and classroom evidence to rate each GLO, and the ratings appear on the standards-based report card.",
    items: [
      {
        id: "self-directed",
        name: "1. Self-directed Learner",
        blurb: "The ability to be responsible for one's own learning.",
        parts: [
          { name: "Setting goals", blurb: "Knowing what they are trying to learn and planning how to get there." },
          { name: "Keeping going", blurb: "Working on their own and sticking with a task when it gets hard." },
          { name: "Reflecting", blurb: "Looking back at their work and deciding what to do better next time." },
        ],
        atHome: [
          "Ask your child to set one small goal for the week and check on it together on the weekend.",
          "Let your child pack their own school bag and make their own homework plan.",
          "When something goes wrong, ask “What could you try next time?”",
        ],
      },
      {
        id: "community",
        name: "2. Community Contributor",
        blurb: "The understanding that it is essential for human beings to work together.",
        parts: [
          { name: "Working together", blurb: "Sharing jobs, listening and doing their part in a group." },
          { name: "Respect", blurb: "Treating classmates, teachers and people who are different from them with respect." },
          { name: "Giving back", blurb: "Helping at school, at home and in the community." },
        ],
        atHome: [
          "Give your child a real family job, like setting the table or caring for a plant.",
          "Join a beach or park clean-up together and talk about why it matters.",
          "Ask how they helped someone at school today.",
        ],
      },
      {
        id: "complex-thinker",
        name: "3. Complex Thinker",
        blurb: "The ability to demonstrate critical thinking and problem solving.",
        parts: [
          { name: "Asking questions", blurb: "Wondering why and how, and looking for evidence." },
          { name: "Solving problems", blurb: "Trying more than one way and choosing the best one." },
        ],
        atHome: [
          "Ask “How do you know?” and “Is there another way?” about schoolwork and everyday puzzles.",
          "Let your child plan something real, like a picnic, and work out what's needed.",
        ],
      },
      {
        id: "quality-producer",
        name: "4. Quality Producer",
        blurb: "The ability to recognize and produce quality performance and quality products.",
        parts: [
          { name: "Knowing what good looks like", blurb: "Understanding what makes a piece of work strong." },
          { name: "Revising", blurb: "Checking work and improving it before calling it done." },
        ],
        atHome: [
          "Look at a piece of schoolwork together and ask what your child is proudest of.",
          "Encourage a second draft of a drawing, a story or a model.",
        ],
      },
      {
        id: "communicator",
        name: "5. Effective Communicator",
        blurb: "The ability to communicate effectively.",
        parts: [
          { name: "Listening", blurb: "Paying attention and responding to what others say." },
          { name: "Sharing ideas", blurb: "Speaking, writing and showing ideas clearly for different audiences." },
        ],
        atHome: [
          "Talk at dinner: ask your child to explain something they learned so a younger sibling would understand.",
          "Have your child write a short note or message to a relative.",
        ],
      },
      {
        id: "technology",
        name: "6. Effective and Ethical User of Technology",
        blurb: "The ability to use a variety of technologies effectively and ethically.",
        parts: [
          { name: "Using tools well", blurb: "Choosing the right technology for a task and using it to learn." },
          { name: "Using it responsibly", blurb: "Being safe, kind and honest online, and giving credit for others' work." },
        ],
        atHome: [
          "Agree on family rules for screens and talk about why they matter.",
          "When your child looks something up, ask how they know the website is trustworthy.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the GLOs graded?",
        a: "In elementary school, yes, but separately from the subjects. Teachers use a GLO rubric and classroom evidence to rate each of the six GLOs, and the ratings appear on the standards-based report card alongside the subject marks.",
      },
      {
        q: "Are they the same in every grade?",
        a: "Yes. The same six GLOs apply from kindergarten to high school. What changes is what they look like as children grow.",
      },
      {
        q: "Where do they come from?",
        a: "The Hawaiʻi State Department of Education adopted the General Learner Outcomes as the foundation of standards-based learning for all students in Hawaiʻi's public schools.",
      },
      {
        q: `Does ${APP_NAME} measure the GLOs?`,
        a: `No. ${APP_NAME} practices the subject standards. Setting a daily goal, coming back after a mistake and checking an answer help build habits like those of a self-directed learner and a quality producer, but the GLO rating is your child's teacher's judgment.`,
      },
      {
        q: "How can I learn more about how my child's school uses them?",
        a: "Ask your child's teacher what a strong rating looks like for each GLO in their grade, and how you can support it at home.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Hawaiʻi State Department of Education",
    hubBlurb: "Smarter Balanced tests in language arts and math (grades 3 to 8 and 11), and science tests in grades 5 and 8 and Biology 1.",
    name: "Hawaiʻi state tests (Smarter Balanced, science and KĀʻEO)",
    intro:
      "Hawaiʻi public school students take state tests each spring. The Smarter Balanced Assessments (SBA) cover English language arts and math in grades 3 to 8 and 11, the Hawaiʻi Assessments in Science are given in grades 5 and 8 and at the end of Biology 1 in high school, and students in Kaiapuni Hawaiian language immersion schools take the KĀʻEO, which is given in Hawaiian. Here is what families need to know.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "Smarter Balanced language arts and math: grades 3 to 8 and 11. Science: grades 5 and 8, and the Biology 1 end-of-course exam. Kaiapuni students take the KĀʻEO instead, in Hawaiian. Students with significant cognitive disabilities take the HSA-Alternate." },
      { title: "When", body: "In spring, in windows the Department of Education sets each year, usually from February to May. Each school sets its own days within them." },
      { title: "The early grades", body: "There are no state tests in kindergarten to 2nd grade. Teachers watch each child's progress during the year and add support where it's needed." },
      { title: "What they cover", body: "Smarter Balanced checks the Hawaiʻi Common Core standards in language arts and math, with a computer-adaptive part and a performance task that asks students to apply what they know to a real-world problem. The science tests check the Next Generation Science Standards." },
      { title: "How results are described", body: "Smarter Balanced scores fall into four achievement levels. Levels 3 and 4 mean meeting or exceeding the standard for the grade. Families receive results in the fall." },
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
        q: "What is the Smarter Balanced Assessment?",
        a: "It is Hawaiʻi's state test in English language arts and math for grades 3 to 8 and 11. It is taken on a computer in the spring, adapts to each student's answers and isn't timed, so students have the time they need.",
      },
      {
        q: "What do the four achievement levels mean?",
        a: "Levels 1 and 2 mean a student is still working toward the grade's standard. Level 3 means meeting it, and Level 4 means exceeding it.",
      },
      {
        q: "What is the KĀʻEO?",
        a: "The Kaiapuni Assessment of Educational Outcomes is the state test for students in Hawaiian language immersion schools. It is given in Hawaiian and was built with Kaiapuni teachers from across the islands.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, including the General Learner Outcomes in elementary school.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, language arts, science and social studies skills in Hawaiʻi's standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Hawaiʻi is the year before kindergarten, offered in the state's free public pre-kindergarten classrooms in some elementary schools and in community preschools, many of them helped by the Preschool Open Doors program. Programs follow the Hawaiʻi Early Learning and Development Standards (HELDS): physical well-being, social and emotional growth, approaches to learning, language and literacy, and cognition and general knowledge.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Hawaiʻi is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about themselves, their families and school, rules and roles, and their island home.",
      lookFor: "Hawaiʻi's elementary report card is standards-based and also rates the six General Learner Outcomes. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies looks at their island community: its reefs, beaches and forests, how weather and natural hazards affect it, and how people take care of it.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, taking part in class and the General Learner Outcomes.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies covers leaders and public services, people who made a difference, family journeys, and how goods are made and traded.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and take the Smarter Balanced tests for the first time. Social studies looks at why people migrate, the many groups who have come to Hawaiʻi, world maps and cultures, and money, taxes and voting.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is Hawaiian history: the islands and how they formed, Polynesian voyaging and wayfinding, canoe plants and the ahupuaʻa, Hawaiian values, and the aliʻi and the rise of Kamehameha.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Hawaiian history topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Science is tested this year. Social studies is United States history from Native American nations and European exploration to the thirteen colonies and the American Revolution.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the last year of elementary school in many Hawaiʻi schools and the first year of middle school in others. Math moves to ratios, rates, negative numbers and expressions. Science covers energy, cells and weather, and social studies is world history, from the first civilizations to the Renaissance.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources. Social studies is two courses: Hawaiian History, from Cook's arrival and Kamehameha's unification to the overthrow of 1893, and Pacific Island Studies.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear relationships, functions, systems of equations and exponents. Science covers forces, heredity and space and is tested this year, and social studies is United States history from the Constitution through the Civil War and Reconstruction.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers Algebra 1 with data analytics and some geometry, and English classes read and write more closely. Social studies in ${APP_NAME} covers the high school courses Modern History of Hawaiʻi (annexation, the plantations, Pearl Harbor, statehood and the Hawaiian Renaissance) and Participation in Democracy.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
