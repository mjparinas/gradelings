import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Colorado, in US English. The competencies page is the Colorado Essential Skills (revised
// 2020), which Colorado law asks schools to build into every content area: four groups (Communicators, Problem Solvers,
// Community Members, Empowered Individuals). They are not a graded subject. The assessment page covers the Colorado
// Measures of Academic Success (CMAS: English language arts and math in grades 3 to 8, science in grades 5, 8 and 11,
// social studies in grade 4 or 7 at a sample of schools), the PSAT and SAT in high school, CoAlt, and the READ Act's
// reading checks in Kindergarten to Grade 3. Dates change each year, so the page points to the Colorado Department of
// Education (CDE). Colorado has no French subject here, so no French guide. Record: docs/research/colorado/README.md.

export const COLORADO_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "essential-skills",
    label: "Essential Skills",
    hubBlurb: "Colorado's Essential Skills for life and work, in plain words.",
    description:
      "What the Colorado Essential Skills mean (communicators, problem solvers, community members and empowered individuals), how schools build them into every subject, and simple ways to support them at home.",
    gradeLine: "Colorado's Essential Skills are built into every subject from kindergarten through 12th grade.",
    closing: "these skills grow through conversation, play, teamwork and everyday responsibilities, not worksheets.",
    title: "Colorado's Essential Skills, explained for parents",
    intro:
      "Alongside what children learn in each subject, Colorado law asks schools to help students build the skills they need for life, college and work. The Colorado Department of Education calls these the Essential Skills and groups them into four kinds of people students grow into: communicators, problem solvers, community members and empowered individuals. Teachers build them into every subject. They are not a separate graded subject.",
    items: [
      {
        id: "communicators",
        name: "Communicators",
        blurb: "Sharing ideas clearly and making sense of information.",
        parts: [
          { name: "Media literacy", blurb: "Judging what you read, watch and hear, and who made it and why." },
          { name: "Digital and data literacy", blurb: "Using technology well and safely, and reading charts and numbers." },
          { name: "Interpersonal communication", blurb: "Listening closely and speaking so others understand." },
        ],
        atHome: [
          "When you see an ad or a headline together, ask “Who made this, and what do they want us to think?”",
          "Read a simple chart together, like the weather forecast, and ask what it tells you.",
          "At dinner, take turns telling about your day and asking each other one question.",
        ],
      },
      {
        id: "problem-solvers",
        name: "Problem Solvers",
        blurb: "Thinking things through, working with others and trying new ideas.",
        parts: [
          { name: "Critical thinking and analysis", blurb: "Asking good questions and weighing evidence before deciding." },
          { name: "Collaboration and teamwork", blurb: "Working with others toward a shared goal." },
          { name: "Creativity and adaptability", blurb: "Trying new ideas and adjusting when plans change." },
        ],
        atHome: [
          "When your child gets stuck, ask “What could you try next?” before helping.",
          "Give a small family job, like planning a picnic, and let your child lead the plan.",
          "Build something together from odds and ends, and talk about what you would change next time.",
        ],
      },
      {
        id: "community-members",
        name: "Community Members",
        blurb: "Taking part in the community and understanding others.",
        parts: [
          { name: "Civic engagement", blurb: "Helping out and having a say in the community." },
          { name: "Global and cultural awareness", blurb: "Learning about people, places and cultures beyond your own." },
          { name: "Social awareness", blurb: "Noticing how others feel and respecting different points of view." },
        ],
        atHome: [
          "Look for a small way to help in your neighborhood, like a park cleanup or a food drive.",
          "While reading or watching a show, ask “How do you think that character feels? Why?”",
          "Share foods, stories or celebrations from your family's background and from others'.",
        ],
      },
      {
        id: "empowered-individuals",
        name: "Empowered Individuals",
        blurb: "Knowing yourself, managing yourself and sticking with hard things.",
        parts: [
          { name: "Self-awareness and self-management", blurb: "Naming feelings, calming down and staying organized." },
          { name: "Perseverance and resilience", blurb: "Keeping going and bouncing back after setbacks." },
          { name: "Self-advocacy and career awareness", blurb: "Asking for help when needed, and learning about jobs and futures." },
        ],
        atHome: [
          "Practice a calm-down routine together: three slow breaths, a drink of water or a short walk.",
          "Break a big job into small steps on a list your child can check off.",
          "Talk about the work people you know do, and what they had to learn for it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Essential Skills graded?",
        a: "Not as a subject. Colorado builds them into the standards for every subject, and some report cards comment on related habits, like working with others. How that is reported is up to the school or district.",
      },
      {
        q: "Where do the Essential Skills come from?",
        a: "Colorado law asks schools to help students develop the skills they need for life and work, as well as meet the content standards. The Colorado Department of Education revised the list in 2020, adding digital and data literacy and grouping the skills into four categories.",
      },
      {
        q: "Does Colorado have social and emotional learning standards too?",
        a: "Many of those skills, like self-awareness, self-management and social awareness, are part of the Essential Skills, and Colorado also has health and wellness standards. Ask your school how it teaches them.",
      },
      {
        q: `Does ${APP_NAME} measure the Essential Skills?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. Its kind hints, small goals and calm options can help children stick with hard things, but these skills grow through conversation, play and teamwork, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school teaches them?",
        a: "Ask your child's teacher or counselor how the school builds these skills and what you can do at home. The full list is on the Colorado Department of Education's website.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Colorado Department of Education",
    hubBlurb: "CMAS in English language arts and math (grades 3 to 8), science (grades 5, 8 and 11) and social studies.",
    name: "Colorado state tests (CMAS)",
    intro:
      "Colorado students take the Colorado Measures of Academic Success (CMAS) each spring: English language arts and math in grades 3 to 8, science in grades 5, 8 and 11, and social studies in grade 4 or 7 at a sample of schools each year. In high school, students take the PSAT in grades 9 and 10 and the SAT in grade 11. In Kindergarten to 3rd grade, schools also check every child's reading under the READ Act. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math: grades 3 to 8. Science: grades 5, 8 and 11. Social studies: grade 4 or 7, at about a third of schools each year. PSAT: grades 9 and 10. SAT: grade 11. Students with the most significant cognitive disabilities may take the Colorado Alternate Assessment (CoAlt) instead." },
      { title: "When", body: "In spring, usually in April. Each school sets its own days within the window the Colorado Department of Education announces each year." },
      { title: "Reading checks in Kindergarten to 3rd grade", body: "Under the READ Act, schools check every child's reading in Kindergarten to 3rd grade. A child with a significant reading need gets a READ plan, made with the family, that says what extra help the school will give." },
      { title: "What they cover", body: "CMAS checks the Colorado Academic Standards in English language arts, math, science and social studies. The high school tests check readiness for college and careers." },
      { title: "How results are described", body: "CMAS scores are reported in five performance levels, from Did Not Yet Meet Expectations to Exceeded Expectations. Families get a score report from the school." },
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
        q: "What is CMAS?",
        a: "The Colorado Measures of Academic Success are Colorado's state tests in English language arts, math, science and social studies. They are given online in the spring, with a paper version for students who need it.",
      },
      {
        q: "Which grades take the science and social studies tests?",
        a: "CMAS science is given in grades 5, 8 and 11. CMAS social studies is given in grade 4 or 7 at a sample of schools, so not every child takes it.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school chooses.",
      },
      {
        q: "Can my child skip the state tests?",
        a: "Colorado law lets parents excuse their child from the state tests, and districts must have a policy for it. Ask your school how to do it and what it means for your child.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Colorado Academic Standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Colorado is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about themselves, families, rules and maps. Teachers also check each child's reading under the READ Act and use a school readiness assessment early in the year.",
      lookFor: "Many Colorado districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies covers families and cultures, maps, jobs and Colorado's symbols.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies compares neighborhoods and communities then and now.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study Colorado's land, communities and local government. It is also the first year of CMAS in English language arts and math, and the last year of READ Act reading checks.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is a year about Colorado: its regions, Mesa Verde and the Ute, Cheyenne and Arapaho peoples, Bent's Fort and the gold rush, statehood in 1876, and how the state is governed.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Colorado history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is early North America, from the first peoples and the colonies to the Revolution and the Constitution, and students take CMAS science.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Colorado districts. Math moves to ratios, rates, negative numbers and expressions. Science covers weather, climate and how living things grow, and social studies is the Western Hemisphere: the land, countries, early civilizations and governments of the Americas.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies is the Eastern Hemisphere: its regions, ancient and classical civilizations, beliefs, empires and trade.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is United States history from the Revolution to Reconstruction, including the nation's move west and what it meant for the land that became Colorado. Students take CMAS science.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} is civics, the government course Colorado requires for graduation, including how Colorado's government works under its 1876 constitution, plus personal finance and economics. Students take the PSAT in the spring.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
