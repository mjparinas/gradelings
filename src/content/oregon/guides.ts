import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Oregon, in US English. The competencies page is Oregon's Transformative Social and Emotional
// Learning (TSEL) Framework & Standards, adopted by the State Board of Education in June 2023 (OAR 581-022-2030;
// districts implement them from July 2024): five K–12 domains, coded TSEL.K12.SAI.1 to TSEL.K12.RDMC.5, deliberately
// not written in grade bands and "not a way to test or identify student deficits" (oregon.gov/ode, "Transformative
// Social and Emotional Learning", read October 2026). It shares the `sel-standards` URL segment with Washington so one
// route folder serves both. The assessment page covers the Oregon Statewide Assessment System (OSAS): English language
// arts and math in grades 3 to 8 and 11, science in grades 5, 8 and 11, four achievement levels. ORS 329.479 lets a
// parent opt a child out of the ELA and/or math tests each year with ODE's form (ODE's 2026-27 annual notice and
// opt-out form). Dates change each year, so the page points to ODE. Oregon has no French subject, so no French guide.
// Grade notes follow ODE's standards and gradelings-research/oregon/README.md.

export const OREGON_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "sel-standards",
    label: "Transformative SEL",
    hubBlurb: "Oregon's five Transformative Social and Emotional Learning domains, from identity to curiosity, in plain words.",
    description:
      "What Oregon's Transformative Social and Emotional Learning standards mean (self-awareness and identity, self-management and agency, social awareness and belonging, relationship skills and collaborative problem-solving, and responsible decision-making and curiosity), how they show up at school, and simple ways to support them at home.",
    gradeLine: "Oregon's Transformative Social and Emotional Learning standards apply in every grade.",
    closing: "social and emotional skills grow through conversation, play and everyday responsibilities.",
    title: "Oregon's Transformative SEL standards, explained for parents",
    intro:
      "Alongside subjects like math and science, the Oregon State Board of Education adopted Transformative Social and Emotional Learning (SEL) standards in 2023: the skills students use to understand themselves, manage their feelings, get along with others and make caring choices. Schools weave them into every subject. The same five domains run from kindergarten to 12th grade, because children grow at their own pace, and ODE says they are not a way to test children or find deficits.",
    items: [
      {
        id: "self-awareness-identity",
        name: "Self-Awareness and Identity",
        blurb: "Noticing your own feelings, thoughts and strengths, and understanding who you are.",
        parts: [
          { name: "Emotions and strengths", blurb: "Naming feelings, thoughts and strengths, and noticing how they change." },
          { name: "Stress and calm", blurb: "Recognizing how stress feels in the body and what helps you feel calm again." },
          { name: "Identity", blurb: "Understanding your identity and how it connects to your interests and sense of belonging." },
        ],
        atHome: [
          "Name feelings out loud, yours and theirs: “You look frustrated. Is the puzzle tricky?”",
          "Ask your child what helps them calm down, and notice it together next time.",
          "Talk about your family's story, languages and traditions, and what your child is proud of.",
        ],
      },
      {
        id: "self-management-agency",
        name: "Self-Management and Agency",
        blurb: "Handling feelings and stress, setting goals and taking initiative.",
        parts: [
          { name: "Managing feelings", blurb: "Expressing thoughts, emotions and stress in healthy ways." },
          { name: "Goals", blurb: "Making a plan, checking progress and adjusting to reach a goal." },
          { name: "Agency", blurb: "Showing courage, speaking up and taking initiative, alone and with others." },
        ],
        atHome: [
          "Practice a calm-down step together, like three slow breaths or a short walk.",
          "Help your child set a small weekly goal and check in on it together.",
          "Let your child make real choices, then talk about how they turned out.",
        ],
      },
      {
        id: "social-awareness-belonging",
        name: "Social Awareness and Belonging",
        blurb: "Understanding others, valuing differences and helping everyone feel they belong.",
        parts: [
          { name: "Identities", blurb: "Noticing the similarities and differences that shape people and groups." },
          { name: "Empathy", blurb: "Using empathy and kindness to build healthy relationships." },
          { name: "Belonging", blurb: "Including and supporting others so everyone feels part of the community." },
        ],
        atHome: [
          "When reading a story, ask how a character feels and why.",
          "Read books and watch shows about families and communities different from yours.",
          "Ask your child how they could help a new or left-out classmate feel welcome.",
        ],
      },
      {
        id: "relationship-skills-problem-solving",
        name: "Relationship Skills and Collaborative Problem-Solving",
        blurb: "Building healthy relationships, working as a team and repairing harm after a conflict.",
        parts: [
          { name: "Relationships", blurb: "Communicating with care and respecting other people's perspectives." },
          { name: "Teamwork", blurb: "Solving problems together and making room for everyone's ideas." },
          { name: "Repair", blurb: "Noticing harm or conflict, knowing when to get help, and making things right." },
        ],
        atHome: [
          "Play a board game and practice taking turns and losing gracefully.",
          "After a disagreement, talk through what each person wanted and what could work for both.",
          "Model a real apology, then talk about how to make things right, not only say sorry.",
        ],
      },
      {
        id: "decision-making-curiosity",
        name: "Responsible Decision-Making and Curiosity",
        blurb: "Asking questions, weighing information and making caring choices.",
        parts: [
          { name: "Curiosity", blurb: "Being curious, open-minded and thinking critically." },
          { name: "Informed choices", blurb: "Using information and facts to find fair solutions to problems." },
          { name: "Impact", blurb: "Thinking ahead about how choices affect yourself, your family and your community." },
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
        q: "Are the Transformative SEL standards graded?",
        a: "No. ODE says the standards are not a way to test children or identify deficits, and they are not meant for tracking or labeling students. Some districts mention work habits or social skills on the report card, but how they do it is up to the district.",
      },
      {
        q: "What are Oregon's five SEL domains?",
        a: "Self-Awareness and Identity, Self-Management and Agency, Social Awareness and Belonging, Relationship Skills and Collaborative Problem-Solving, and Responsible Decision-Making and Curiosity. Each domain has one standard with several practices and growth indicators.",
      },
      {
        q: "Why aren't the standards written for each grade?",
        a: "Oregon wrote one set of standards for kindergarten through 12th grade on purpose. Children (and adults) can show these skills differently from day to day and place to place, so the standards describe growth over time rather than a target for each grade.",
      },
      {
        q: `Does ${APP_NAME} measure social and emotional skills?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. Its kind hints, small goals and calm options can help children stick with hard things, but social and emotional skills grow through conversation, play and teamwork, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about SEL at my child's school?",
        a: "Ask your child's teacher or school counselor how the school builds these skills and what you can do at home. ODE's website has the full Transformative SEL Framework & Standards.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Oregon Department of Education (ODE)",
    hubBlurb: "OSAS English language arts and math (grades 3 to 8) and science (grades 5 and 8).",
    name: "Oregon state tests (OSAS)",
    intro:
      "Each spring, Oregon students take the Oregon Statewide Assessment System (OSAS) tests: English language arts and math in grades 3 to 8, and science in grades 5 and 8. High school students take them again in 11th grade. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 8, and 11th grade. Science: grades 5, 8 and 11. Social sciences have no required state test." },
      { title: "What they cover", body: "The English language arts and math tests check reading, writing, listening, research and math against Oregon's state standards, and ask students to explain their answers, not just pick one. The science test checks the Oregon Science Standards." },
      { title: "When", body: "Students test on a computer in the spring. Each school sets its own dates within a window ODE announces each year. There is no time limit, so children can take as long as they need." },
      { title: "How results are described", body: "Scores are reported in four achievement levels. Level 3 means the student met the standard for the grade, and Level 4 means they exceeded it. Levels 1 and 2 mean they are still working toward it. Schools share scores at the end of the school year or the start of the next." },
      { title: "Opting out", body: "Oregon law (ORS 329.479) lets parents opt their child out of the English language arts and/or math tests each year, using ODE's form, handed in to the school. Schools send the form at least 30 days before testing, and students who opt out get supervised study time instead." },
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
        q: "What is OSAS?",
        a: "The Oregon Statewide Assessment System is the set of state tests: English language arts and math in grades 3 to 8 and 11, and science in grades 5, 8 and 11. The English language arts and math tests are built with educators from Oregon and other states, and include tasks that ask students to explain their thinking.",
      },
      {
        q: "Can I opt my child out?",
        a: "Yes, for English language arts and math. Under ORS 329.479, a parent can fill in ODE's opt-out form each school year and give it to the school. It only lasts for that year. Talk with your school if you have questions about the science test.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the scale your district chooses.",
      },
      {
        q: "What do the four levels mean?",
        a: "Level 3 means the student met the standard for the grade, and Level 4 means they exceeded it. Levels 1 and 2 mean they are still building those skills. Talk with your child's teacher about what the score means for your child.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts and science skills in Oregon's state standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Oregon is the year before kindergarten, for children around 4. Programs include Oregon Pre-Kindergarten, Head Start, preschool and child care, and follow the Oregon Early Learning and Kindergarten Guidelines: approaches to learning, social-emotional development, language and communication, literacy and math.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Oregon is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. Social studies starts with “Me and My World”: rules, fairness and maps of familiar places.",
      lookFor: "Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies looks at school and family.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies explores the neighborhood and community.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and learn about Oregon's regions and counties and the Pacific Northwest. It is also the first year of the OSAS state tests in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is all about Oregon, from time immemorial to today, including the nine federally recognized Tribes of Oregon, the state's government and its economy.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Oregon history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies covers early US history to 1800, from Native nations and the colonies to the Constitution, and students take the OSAS science test.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Oregon districts. Math moves to ratios, rates, negative numbers and expressions. Science covers energy, cells and weather, and social studies begins world history, from early people to ancient civilizations.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's surface, and social studies continues world history from about 600 to 1900: empires, trade, exploration and revolutions.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies covers US history from 1780 to 1865. Students also take the OSAS science test.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math follows Oregon's high school standards (linear and exponential relationships, equations and functions), and English classes read and write more closely. Oregon requires three social science credits, including half a credit of civics, so social studies in ${APP_NAME} covers civics and economics: the three branches, elections, how laws are made, rights and how markets work.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
