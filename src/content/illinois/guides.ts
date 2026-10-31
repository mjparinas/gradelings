import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Illinois, in US English. The competencies page is the Illinois Social and Emotional Learning
// Standards, revised in July 2026 for the 2026-27 school year: five goals (self-awareness, self-management, social
// awareness, relationship skills and responsible decision-making), each with three indicators and benchmarks for five
// grade bands. They are part of Illinois's learning standards but not a graded subject. The assessment page covers the
// Illinois Assessment of Readiness (IAR: English language arts and math, grades 3 to 8), the Illinois Science
// Assessment (ISA: grades 5 and 8), PreACT 9 and PreACT (grades 9 and 10), the ACT in grade 11 and the KIDS
// observation in kindergarten. Dates change each year, so the page points to the Illinois State Board of Education
// (ISBE). Illinois has no French subject here, so no French guide. Record: gradelings-research/illinois/README.md.

export const ILLINOIS_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "sel-standards",
    label: "SEL standards",
    hubBlurb: "Illinois's five Social and Emotional Learning goals, in plain words.",
    description:
      "What the Illinois Social and Emotional Learning Standards mean (self-awareness, self-management, social awareness, relationship skills and responsible decision-making), how schools teach them, and simple ways to support them at home.",
    gradeLine: "Illinois's Social and Emotional Learning Standards apply from kindergarten through 12th grade.",
    closing: "these skills grow through conversation, play, teamwork and everyday responsibilities, not worksheets.",
    title: "Illinois's Social and Emotional Learning Standards, explained for parents",
    intro:
      "Illinois was the first state to adopt Social and Emotional Learning (SEL) standards for every grade, and the Illinois State Board of Education revised them in July 2026 for the 2026-27 school year. They describe five goals, each with skills that grow from kindergarten to 12th grade: understanding yourself, managing yourself, understanding others, getting along with others and making good decisions. Teachers build them into the school day. They are not a separate graded subject.",
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
        q: "Are the SEL standards graded?",
        a: "Not as a subject. They are part of the Illinois Learning Standards, and schools build them into the school day. Some report cards comment on behaviors like these, but how they do it is up to the school or district.",
      },
      {
        q: "What changed in the 2026 revision?",
        a: "The Illinois State Board of Education revised the standards in July 2026, starting in the 2026-27 school year. They are organized under five goals (self-awareness, self-management, social awareness, relationship skills and responsible decision-making) with benchmarks for five grade bands from kindergarten to 12th grade. ISBE has noted a wording error in two self-management indicators that it plans to correct; the skills students learn are not affected.",
      },
      {
        q: "Which grade bands do the standards use?",
        a: "Early elementary (kindergarten to 2nd grade), late elementary (3rd to 5th), middle school (6th to 8th), early high school (9th and 10th) and late high school (11th and 12th).",
      },
      {
        q: `Does ${APP_NAME} measure social and emotional learning?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. Its kind hints, small goals and calm options can help children stick with hard things, but these skills grow through conversation, play and teamwork, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school teaches them?",
        a: "Ask your child's teacher or counselor how the school builds these skills and what you can do at home. The full standards are on the Illinois State Board of Education's website.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Illinois State Board of Education",
    hubBlurb: "The IAR in English language arts and math (grades 3 to 8) and the Illinois Science Assessment (grades 5 and 8).",
    name: "Illinois state tests (IAR and ISA)",
    intro:
      "Illinois students take state tests each spring: the Illinois Assessment of Readiness (IAR) in English language arts and math in grades 3 to 8, and the Illinois Science Assessment (ISA) in grades 5 and 8. In high school, students take PreACT 9 and PreACT in grades 9 and 10 and the ACT in grade 11. Kindergarten teachers also observe each child with the Kindergarten Individual Development Survey (KIDS). The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "English language arts and math (IAR): grades 3 to 8. Science (ISA): grades 5 and 8. PreACT 9 and PreACT: grades 9 and 10. ACT with science and writing: grade 11. Students with the most significant cognitive disabilities may take the Dynamic Learning Maps alternate assessment instead." },
      { title: "When", body: "In spring. For 2026-27, the IAR online window is March 1 to April 16, 2027, and the science test window is March 1 to April 30, 2027. Each school sets its own days within the windows ISBE announces each year." },
      { title: "Kindergarten", body: "KIDS isn't a test children sit. Teachers observe each child during the first 40 days of kindergarten in areas like social and emotional development, language and literacy, and math, to plan teaching." },
      { title: "What they cover", body: "The IAR checks the Illinois Learning Standards in English language arts and math. The ISA checks the Illinois Learning Standards for Science. The high school tests check readiness for college and careers." },
      { title: "How results are described", body: "Scores are reported as performance levels compared with state expectations. Families get a score report from the school, and school results appear on the Illinois Report Card." },
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
        q: "What is the IAR?",
        a: "The Illinois Assessment of Readiness is Illinois's state test in English language arts and math for grades 3 to 8. It is given online in the spring, with a paper version for students who need it.",
      },
      {
        q: "Which grades take the science test?",
        a: "The Illinois Science Assessment is given in grades 5 and 8. High school students take science as part of PreACT and the ACT.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school chooses. The Illinois Report Card is something different: a public report on each school.",
      },
      {
        q: "Can my child skip the state tests?",
        a: "Ask your school. Federal and state law expect nearly all students to take the state tests, and schools can explain their own policy and what happens if a family asks for their child not to test.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts and science skills in the Illinois Learning Standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Illinois is the year before kindergarten, offered by public schools and community programs through Preschool for All, which is free for many families, and Head Start. Programs follow the Illinois Early Learning and Development Standards: language arts, math, science, social studies, social and emotional development, physical development and the arts.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for joining in, taking turns, naming feelings, rhyming, knowing letters and counting small groups.",
    },
    k: {
      overview: "Kindergarten in Illinois is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies (My Social World) they learn about themselves, families, rules and jobs. Teachers also observe each child with the KIDS survey in the first weeks of school.",
      lookFor: "Many Illinois districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies (Living, Learning, and Working Together) covers maps, communities, jobs and Illinois's symbols.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies (Families, Neighborhoods, and Communities) compares communities then and now.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study Illinois's land and communities and how local government works (Communities Near and Far). It is also the first year of the IAR in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies (Our State, Our Nation) is a year about Illinois: its regions, Cahokia and the Native nations of Illinois, French villages and statehood, Lincoln, Chicago's growth, and how the state is governed.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on Illinois history.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies (Our Nation, Our World) is early United States history, from the colonies to the Revolution and the Constitution, and students take the Illinois Science Assessment.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: `6th grade is the start of middle school in many Illinois districts. Math moves to ratios, rates, negative numbers and expressions. Science covers weather, climate and how living things grow, and social studies in ${APP_NAME} looks at world regions and ancient civilizations. Illinois middle schoolers take a semester of civics in 6th, 7th or 8th grade.`,
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: `In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies in ${APP_NAME} is world history from medieval times to the age of revolutions.`,
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is United States history from the founding to Reconstruction, including Illinois's part in it. Most Illinois schools give the Constitution test on the US and Illinois constitutions this year, and students take the Illinois Science Assessment.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies covers civics, the semester every Illinois high school student takes, including how Illinois's government works under its 1970 constitution, plus personal finance and economics. Students take PreACT 9 in the spring.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
