import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for New Jersey, in US English. The competencies page is the Life Literacies and Key Skills
// standards (NJSLS-CLKS standard 9.4, June 2020): six areas (creativity and innovation, critical thinking and
// problem-solving, digital citizenship, global and cultural awareness, information and media literacy, and technology
// literacy) that teachers build into every subject. They are part of New Jersey's learning standards but not a
// separate graded subject. The assessment page covers the NJSLA-Adaptive (English language arts in grades 3 to 9, math
// in grades 3 to 8 and high school courses), NJSLA-Science (grades 5, 8 and 11) and the NJGPA-Adaptive graduation
// test in grade 11. Dates change each year, so the page points to the New Jersey Department of Education (NJDOE). New
// Jersey has no French subject here, so no French guide. Record: docs/research/new-jersey/README.md.

export const NEW_JERSEY_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "life-literacies",
    label: "Life literacies",
    hubBlurb: "New Jersey's six Life Literacies and Key Skills, in plain words.",
    description:
      "What New Jersey's Life Literacies and Key Skills standards mean (creativity, critical thinking, digital citizenship, global and cultural awareness, information and media literacy, and technology literacy), how schools teach them, and simple ways to support them at home.",
    gradeLine: "New Jersey's Life Literacies and Key Skills standards apply from kindergarten through 12th grade.",
    closing: "these skills grow through conversation, projects, play and everyday problem solving, not worksheets.",
    title: "New Jersey's Life Literacies and Key Skills, explained for parents",
    intro:
      "New Jersey's learning standards include Career Readiness, Life Literacies, and Key Skills. One part of them, Life Literacies and Key Skills, describes six kinds of thinking students need in school, work and life, with goals for the end of 2nd, 5th, 8th and 12th grade. Teachers build them into math, English language arts, science, social studies and other classes. They are not a separate graded subject. (Personal financial literacy, another part of the same standards, is practiced in social studies here.)",
    items: [
      {
        id: "creativity-and-innovation",
        name: "Creativity and Innovation",
        blurb: "Coming up with new ideas, trying them out and learning from mistakes.",
        parts: [
          { name: "Brainstorming", blurb: "Thinking of many ideas before choosing one." },
          { name: "Trying new things", blurb: "Being curious and willing to take a thinking risk." },
          { name: "Growth mindset", blurb: "Seeing a mistake or failure as part of getting better." },
        ],
        atHome: [
          "Ask “How many different ways could we do this?” before settling on one answer.",
          "Build something together from recycled boxes, then change one thing and try again.",
          "When a plan doesn't work, say what you learned from it out loud.",
        ],
      },
      {
        id: "critical-thinking",
        name: "Critical Thinking and Problem-Solving",
        blurb: "Finding the real problem, gathering facts and testing solutions.",
        parts: [
          { name: "Naming the problem", blurb: "Saying clearly what needs to be solved." },
          { name: "Gathering information", blurb: "Collecting facts and looking for helpful resources." },
          { name: "Reflecting", blurb: "Checking why a solution did or didn't work." },
        ],
        atHome: [
          "When something goes wrong, ask “What's the problem, exactly?” before fixing it.",
          "Plan a small outing together and compare two or three options.",
          "After a project, ask what worked, what didn't and what they would change.",
        ],
      },
      {
        id: "digital-citizenship",
        name: "Digital Citizenship",
        blurb: "Being safe, kind and responsible online.",
        parts: [
          { name: "Staying safe", blurb: "Protecting personal information and knowing when to ask an adult." },
          { name: "Digital footprint", blurb: "Understanding that what we post can last and be seen by others." },
          { name: "Giving credit", blurb: "Using other people's work fairly and saying where it came from." },
        ],
        atHome: [
          "Agree on simple rules for being online together, and talk about why they matter.",
          "Before posting or sending a photo, ask “Would you be okay if everyone saw this?”",
          "When your child uses a picture or fact from a website for a project, help them note the source.",
        ],
      },
      {
        id: "global-cultural-awareness",
        name: "Global and Cultural Awareness",
        blurb: "Understanding that people's backgrounds shape how they see things.",
        parts: [
          { name: "Different points of view", blurb: "Knowing people from different cultures may see the same thing differently." },
          { name: "Culture and place", blurb: "Seeing how culture and geography shape people's lives." },
          { name: "Working together", blurb: "Respecting differences so everyone can work well together." },
        ],
        atHome: [
          "Share foods, stories or celebrations from your family's background and from others'.",
          "Look at a map together when a place comes up in the news or a book.",
          "While reading, ask “How might someone from another place see this?”",
        ],
      },
      {
        id: "information-media-literacy",
        name: "Information and Media Literacy",
        blurb: "Finding good information and judging whether it can be trusted.",
        parts: [
          { name: "Searching well", blurb: "Using good search words and choosing helpful sources." },
          { name: "Checking sources", blurb: "Asking who made something, why, and whether it is accurate." },
          { name: "Sharing responsibly", blurb: "Thinking before passing information on." },
        ],
        atHome: [
          "When you see a surprising claim, ask “Who says so, and how do they know?”",
          "Compare how two news sources describe the same event.",
          "Talk about how ads try to make us want things.",
        ],
      },
      {
        id: "technology-literacy",
        name: "Technology Literacy",
        blurb: "Choosing and using digital tools to learn, create and solve problems.",
        parts: [
          { name: "Picking the right tool", blurb: "Knowing which app or device fits a task." },
          { name: "Making things", blurb: "Using technology to create, not only to watch." },
          { name: "Working together", blurb: "Using shared documents and tools with classmates." },
        ],
        atHome: [
          "Ask your child to show you how they use a school app or tool.",
          "Make a short slideshow, video or digital card together for a family event.",
          "Talk about when technology helps and when it's better to put it away.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Life Literacies and Key Skills graded?",
        a: "Not as a subject. They are part of the New Jersey Student Learning Standards, and teachers build them into other classes. Some report cards comment on skills like these, but how they do it is up to the school or district.",
      },
      {
        q: "What else is in New Jersey's Career Readiness, Life Literacies, and Key Skills standards?",
        a: "Personal financial literacy (spending, saving, budgeting, credit and insurance) and career awareness and planning. Personal financial literacy is part of social studies here, and New Jersey requires financial literacy lessons in middle school.",
      },
      {
        q: "Does New Jersey have social and emotional learning standards?",
        a: "New Jersey has SEL competencies that schools may use to plan how they teach skills like self-awareness and getting along with others. They are guidance, not graded standards. Ask your school how it uses them.",
      },
      {
        q: `Does ${APP_NAME} measure these skills?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. Its kind hints, small goals and calm options can help children stick with hard things, but these skills grow through projects, conversation and teamwork, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school teaches them?",
        a: "Ask your child's teacher how these skills show up in class projects. The full standards are on the New Jersey Department of Education's website.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the New Jersey Department of Education",
    hubBlurb: "The NJSLA-Adaptive in English language arts and math (grades 3 to 9) and NJSLA-Science (grades 5 and 8).",
    name: "New Jersey state tests (NJSLA)",
    intro:
      "New Jersey students take the New Jersey Student Learning Assessments (NJSLA) each spring. Since spring 2026, the English language arts and math tests are adaptive: questions get easier or harder depending on how a student answers. English language arts is tested in grades 3 to 9 and math in grades 3 to 8, with high school math tests in Algebra I, Geometry and Algebra II. Science is tested in grades 5, 8 and 11, and 11th graders take the New Jersey Graduation Proficiency Assessment. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8", "9"],
    facts: [
      { title: "Who takes them", body: "English language arts (NJSLA-Adaptive): grades 3 to 9. Math: grades 3 to 8, then Algebra I, Geometry or Algebra II in high school. Science (NJSLA-Science): grades 5, 8 and 11. Graduation test (NJGPA-Adaptive): grade 11. Students with the most significant cognitive disabilities may take the Dynamic Learning Maps alternate assessment instead." },
      { title: "When", body: "In spring. In 2026, the NJSLA testing window was April 27 to May 29. Each school sets its own days within the windows NJDOE announces each year." },
      { title: "Younger students", body: "There is no state test before 3rd grade. New Jersey schools do check reading skills, including early signs of dyslexia, in kindergarten to 2nd grade, so teachers can help early." },
      { title: "What they cover", body: "The NJSLA checks the New Jersey Student Learning Standards in English language arts, math and science. The graduation test checks the English language arts and math students need to graduate." },
      { title: "How results are described", body: "Scores are reported in performance levels that compare a student's work with the state's expectations. The State Board of Education set the levels for the new adaptive tests in September 2026. Families get a score report from the school." },
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
        q: "What does adaptive mean?",
        a: "On an adaptive test, the computer picks the next questions based on how a student is doing, so each student sees questions closer to their level. New Jersey's English language arts and math tests became adaptive in spring 2026.",
      },
      {
        q: "Which grades take the science test?",
        a: "NJSLA-Science is given in grades 5, 8 and 11.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school chooses.",
      },
      {
        q: "Can my child skip the state tests?",
        a: "Ask your school. Federal and state law expect nearly all students to take the state tests, and schools tell families each year which tests their children will take. They can explain their own policy.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts and science skills in the New Jersey Student Learning Standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in New Jersey is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100, start adding and taking away within 10 and learn the names of coins. In social studies they learn about themselves, families, rules and community helpers. Schools also check early reading skills.",
      lookFor: "Many New Jersey districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, learn place value up to 120 and count coins. Social studies covers maps, communities, jobs and New Jersey's symbols, from the eastern goldfinch to the motto \"Liberty and Prosperity.\"",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies compares communities then and now.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study New Jersey's land and regions, its cities, suburbs and farms, and how town, county and state government work. It is also the first year of the NJSLA in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is a year about New Jersey: the Lenape, the Dutch, Swedish and English colony, the Crossroads of the Revolution, inventors like Thomas Edison, and how the state is governed.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on New Jersey history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is early United States history, from the colonies to the Revolution and the Constitution, and students take NJSLA-Science.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: `6th grade is the start of middle school in many New Jersey districts. Math moves to ratios, rates, negative numbers and expressions. Science covers weather, climate and how living things grow, and social studies in ${APP_NAME} is early humans and ancient civilizations. New Jersey middle schools also teach financial literacy.`,
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: `In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies in ${APP_NAME} is world history from about 500 to 1450: medieval Europe, the Islamic world, Africa, Asia and the Americas.`,
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is United States history from the Revolution to Reconstruction, including the New Jersey Plan and New Jersey's part in the Underground Railroad. Students take NJSLA-Science this year.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} covers civics, including how New Jersey governs itself under its 1947 constitution, plus economics and personal finance, which New Jersey high school students must study to graduate. 9th graders take the NJSLA in English language arts.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
