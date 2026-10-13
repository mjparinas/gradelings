import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Washington, in US English. The competencies page is OSPI's Social Emotional Learning
// Standards, Benchmarks and Indicators (six standards, adopted 2016, indicators added 2019; ospi.k12.wa.us,
// "Social Emotional Learning"). The assessment page covers the state tests: Smarter Balanced in English language
// arts and math (grades 3 to 8 and 10) and the Washington Comprehensive Assessment of Science (WCAS, grades 5, 8 and
// 11). Schedules change, so the pages point to OSPI. Washington has no French subject, so there is no French guide.

export const WASHINGTON_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "sel-standards",
    label: "Social Emotional Learning",
    hubBlurb: "Washington's six SEL standards, from self-awareness to social engagement, in plain words.",
    description:
      "What Washington's six Social Emotional Learning standards mean (self-awareness, self-management, self-efficacy, social awareness, social management and social engagement), how they show up at school, and simple ways to support them at home.",
    gradeLine: "Washington's Social Emotional Learning standards apply in every grade.",
    closing: "social emotional skills grow through conversation, play and everyday responsibilities.",
    title: "Washington's Social Emotional Learning standards, explained for parents",
    intro:
      "Alongside subjects like math and science, OSPI has six Social Emotional Learning (SEL) standards: the skills students use to understand themselves, manage their feelings and get along with others. Schools build them into everyday learning. They describe how students grow over time and are not meant for grading or labeling children.",
    items: [
      {
        id: "self-awareness",
        name: "Self-Awareness",
        blurb: "Recognizing your own feelings, strengths and areas for growth, and knowing where to find support.",
        parts: [
          { name: "Emotions", blurb: "Naming feelings and noticing how they affect what you do." },
          { name: "Identity", blurb: "Knowing your strengths, goals, culture and languages." },
          { name: "Supports", blurb: "Understanding how family, school and community shape you and can help." },
        ],
        atHome: [
          "Name feelings out loud, yours and theirs: “You look frustrated. Is the puzzle tricky?”",
          "Ask your child what they are good at and what they want to get better at.",
          "Talk about the people your child can go to for help, at home and at school.",
        ],
      },
      {
        id: "self-management",
        name: "Self-Management",
        blurb: "Handling feelings, thoughts and actions, and making responsible choices.",
        parts: [
          { name: "Managing emotions", blurb: "Calming down, handling stress and controlling impulses in healthy ways." },
          { name: "Responsible decisions", blurb: "Thinking through choices and solving problems." },
        ],
        atHome: [
          "Practice a calm-down step together, like three slow breaths or a short walk.",
          "When something goes wrong, ask “What could we try next time?”",
          "Let your child make small choices and talk about how they turned out.",
        ],
      },
      {
        id: "self-efficacy",
        name: "Self-Efficacy",
        blurb: "Staying motivated, sticking with hard things and believing you can learn.",
        parts: [
          { name: "Goals", blurb: "Setting a goal, checking progress, adjusting and keeping going." },
          { name: "Problem solving", blurb: "Working through challenges responsibly in different situations." },
          { name: "Self-advocacy", blurb: "Speaking up for yourself and asking for what you need." },
        ],
        atHome: [
          "Help your child set a small weekly goal and check in on it together.",
          "Praise effort and strategies: “You tried a new way when the first one didn't work.”",
          "Practice asking for help: what to say to a teacher when something is confusing.",
        ],
      },
      {
        id: "social-awareness",
        name: "Social Awareness",
        blurb: "Understanding how others feel and respecting people whose lives differ from yours.",
        parts: [
          { name: "Empathy", blurb: "Noticing other people's feelings and points of view." },
          { name: "Respect", blurb: "Respecting similarities and differences between people and groups." },
          { name: "Context", blurb: "Understanding that people act differently in different places and situations." },
        ],
        atHome: [
          "When reading a story, ask how a character feels and why.",
          "Read books and watch shows about families and communities different from yours.",
          "Talk about how rules and manners change between home, school and other places.",
        ],
      },
      {
        id: "social-management",
        name: "Social Management",
        blurb: "Building healthy relationships, communicating clearly and working through conflict.",
        parts: [
          { name: "Communication", blurb: "Listening, taking turns and expressing ideas respectfully." },
          { name: "Healthy relationships", blurb: "Making friends and recognizing unhealthy situations." },
          { name: "Conflict", blurb: "Working through disagreements in respectful ways." },
        ],
        atHome: [
          "Play a board game and practice taking turns and losing gracefully.",
          "Role-play what to say when a friend is unkind or a game isn't fair.",
          "After a disagreement, talk through what each person wanted and what could work for both.",
        ],
      },
      {
        id: "social-engagement",
        name: "Social Engagement",
        blurb: "Caring about others and helping your school and community.",
        parts: [
          { name: "Belonging", blurb: "Feeling part of a school and community, and helping others feel included." },
          { name: "Teamwork", blurb: "Working with others to set and reach shared goals." },
          { name: "Contributing", blurb: "Taking part in making school, home and the community better." },
        ],
        atHome: [
          "Give your child a real job at home that helps the whole family.",
          "Do something kind for a neighbor together, then talk about how it felt.",
          "Plan a small family project together and share out the tasks.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the SEL standards graded?",
        a: "No. OSPI says the SEL standards and indicators are not meant for formally assessing or labeling students. Some districts mention work habits or social skills on the report card, but how they do it is up to the district.",
      },
      {
        q: "What are Washington's six SEL standards?",
        a: "Self-Awareness, Self-Management and Self-Efficacy are about yourself. Social Awareness, Social Management and Social Engagement are about getting along with others and your community. Each standard has two or three benchmarks, with examples for each grade band.",
      },
      {
        q: `Does ${APP_NAME} measure social emotional skills?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. Its kind hints, small goals and calm options can help children stick with hard things, but social emotional skills grow through conversation, play and teamwork, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about SEL at my child's school?",
        a: "Ask your child's teacher or school counselor how the school teaches social emotional skills and what you can do at home. OSPI's website has the full standards, benchmarks and indicators.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Office of Superintendent of Public Instruction (OSPI)",
    hubBlurb: "Smarter Balanced (grades 3 to 8) and the science test (grades 5 and 8).",
    name: "Washington state tests (Smarter Balanced and WCAS)",
    intro:
      "Each spring, Washington students take state tests: the Smarter Balanced assessments in English language arts and math in grades 3 to 8, and the Washington Comprehensive Assessment of Science (WCAS) in grades 5 and 8. High school students take them again in grade 10 (Smarter Balanced) and grade 11 (WCAS). The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "Smarter Balanced English language arts and math: grades 3 to 8, and grade 10. WCAS science: grades 5, 8 and 11. Parents with questions about their child taking part can talk with the school." },
      { title: "What they cover", body: "Smarter Balanced checks reading, writing, listening, research and math against the state learning standards. WCAS checks science against the Washington K–12 Science Learning Standards (the Next Generation Science Standards)." },
      { title: "When", body: "Students test on a computer in the spring. Each school sets its own dates within a window OSPI announces each year, usually between March and June." },
      { title: "How results are described", body: "Scores are reported in four levels. Level 3 means the student met the standard for the grade, and Level 4 means they exceeded it. Levels 1 and 2 mean they are still working toward it." },
      { title: "Report card link", body: "State test scores don't change your child's report card. They are one more snapshot for families, teachers and schools. Families usually get a score report from the school or district after the tests." },
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
        q: "What is Smarter Balanced?",
        a: "Smarter Balanced is the state test in English language arts and math for grades 3 to 8 and grade 10. It is taken on a computer and adjusts to how your child answers. It includes a longer task that asks students to explain their thinking.",
      },
      {
        q: "What is the WCAS?",
        a: "The Washington Comprehensive Assessment of Science is the state science test in grades 5, 8 and 11. It asks students to use science ideas and practices to explain events and solve problems.",
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
        a: `${APP_NAME} practices the math, English language arts and science skills in the Washington State Learning Standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Washington is a full-day year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away, and teachers get to know each child through the WaKIDS inventory in the first weeks.",
      lookFor: "Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, learn place value with tens and ones, and start measuring and telling time.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and how land and water change.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and work with area. It is also the first year of the Smarter Balanced state tests.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is all about Washington State: its land, tribes, government and history.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Washington history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies covers early US history, from Native nations and the colonies to the Constitution, and students take the WCAS science test.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. Smarter Balanced and WCAS scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Washington districts. Math moves to ratios, rates, percents, negative numbers and expressions. Science follows the middle school NGSS, and social studies explores world geography and ancient civilizations.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and two-step equations. Science covers chemical reactions, ecosystems and Earth's surface, and social studies returns to Washington State history and government.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies covers US history from the founding through Reconstruction. Students also take the WCAS science test.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Many students take Algebra 1, and English classes read and write more closely. Social studies in ${APP_NAME} covers civics: the three branches, elections, how laws are made and tribal sovereignty.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
