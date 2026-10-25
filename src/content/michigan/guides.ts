import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Michigan, in US English. The competencies page is the Michigan Department of Education's Early
// Childhood to Grade 12 Social and Emotional Learning Competencies and Indicators (2017): five competencies
// (self-awareness, self-management, social awareness, relationship skills and responsible decision-making) with 16
// indicators and benchmarks from infancy to 12th grade. They are guidance for schools, not a graded subject. The
// assessment page covers the M-STEP (English language arts and math in grades 3 to 7, science and social studies in
// grades 5 and 8), the PSAT 8/9 in grade 8, the PSAT 8/9 and PSAT 10 in grades 9 and 10, the Michigan Merit Examination
// in grade 11, MI-Access, and the early literacy and math benchmark assessments in Kindergarten to Grade 2. Dates change
// each year, so the page points to the Michigan Department of Education. Michigan has no French subject here, so no
// French guide. Record: docs/research/michigan/README.md.

export const MICHIGAN_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "sel-standards",
    label: "SEL competencies",
    hubBlurb: "Michigan's five Social and Emotional Learning competencies, in plain words.",
    description:
      "What Michigan's Social and Emotional Learning competencies mean (self-awareness, self-management, social awareness, relationship skills and responsible decision-making), how schools use them, and simple ways to support them at home.",
    gradeLine: "Michigan's Social and Emotional Learning competencies run from early childhood through 12th grade.",
    closing: "these skills grow through conversation, play, teamwork and everyday responsibilities, not worksheets.",
    title: "Michigan's Social and Emotional Learning competencies, explained for parents",
    intro:
      "The Michigan Department of Education's Social and Emotional Learning (SEL) Competencies and Indicators describe five groups of skills that grow from early childhood to 12th grade: understanding yourself, managing yourself, understanding others, getting along with others and making good decisions. Each has a few indicators, with benchmarks for each age band and ideas for teachers. They are guidance that schools build into the school day, not a separate graded subject.",
    items: [
      {
        id: "self-awareness",
        name: "Self-Awareness",
        blurb: "Understanding your own feelings, strengths and supports.",
        parts: [
          { name: "Emotions", blurb: "Naming feelings and noticing how they affect what we do." },
          { name: "Strengths and interests", blurb: "Knowing what you are good at and what you enjoy." },
          { name: "Supports and responsibility", blurb: "Knowing who can help, and owning your choices." },
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
        blurb: "Handling feelings, being honest and working toward goals.",
        parts: [
          { name: "Managing emotions and behavior", blurb: "Calming down and choosing what to do next." },
          { name: "Honesty and integrity", blurb: "Telling the truth and doing the right thing when it is hard." },
          { name: "Goals", blurb: "Setting goals, checking progress and changing the plan when needed." },
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
          { name: "Other people's feelings", blurb: "Noticing how others feel and seeing their point of view." },
          { name: "Caring and contributing", blurb: "Showing consideration and helping the school and community." },
          { name: "Cultures and social cues", blurb: "Respecting different cultures and reading how others are reacting." },
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
        blurb: "Making friends, communicating well and solving conflicts fairly.",
        parts: [
          { name: "Communicating", blurb: "Taking turns, listening closely and saying things kindly." },
          { name: "Positive relationships", blurb: "Making and keeping healthy friendships." },
          { name: "Solving conflicts", blurb: "Preventing and working out disagreements in helpful ways." },
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
          { name: "Weighing what matters", blurb: "Thinking about safety, fairness and other people before choosing." },
          { name: "Making decisions", blurb: "Using clear steps to handle everyday school and social situations." },
          { name: "Helping the classroom", blurb: "Playing a part in a positive, safe school climate." },
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
        q: "Are the SEL competencies graded?",
        a: "No. They are guidance from the Michigan Department of Education that schools can build into the school day. Some report cards comment on behaviors like these, but how they do it is up to the school or district.",
      },
      {
        q: "Where do the five competencies come from?",
        a: "Michigan uses the five competencies described by CASEL, the Collaborative for Academic, Social, and Emotional Learning. The Michigan Department of Education adds indicators, benchmarks for each age band and teaching ideas.",
      },
      {
        q: "Which age bands do they use?",
        a: "Infants and toddlers, pre-K, kindergarten to 2nd grade, 3rd to 5th, 6th to 8th, 9th and 10th, and 11th and 12th.",
      },
      {
        q: `Does ${APP_NAME} measure social and emotional learning?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. Its kind hints, small goals and calm options can help children stick with hard things, but these skills grow through conversation, play and teamwork, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school teaches them?",
        a: "Ask your child's teacher or counselor how the school builds these skills and what you can do at home. The full competencies and indicators are on the Michigan Department of Education's website.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Michigan Department of Education",
    hubBlurb: "The M-STEP in English language arts and math (grades 3 to 7) and in science and social studies (grades 5 and 8).",
    name: "Michigan state tests (M-STEP, PSAT and MME)",
    intro:
      "Michigan students take state tests each spring. The Michigan Student Test of Educational Progress (M-STEP) covers English language arts and math in grades 3 to 7, and science and social studies in grades 5 and 8. In 8th grade, the PSAT 8/9 gives the English language arts and math scores. High school students take the PSAT 8/9 in 9th grade, the PSAT 10 in 10th grade and the Michigan Merit Examination in 11th grade. The tests are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "M-STEP English language arts and math: grades 3 to 7. M-STEP science and social studies: grades 5 and 8, and again in grade 11. PSAT 8/9: grades 8 and 9. PSAT 10: grade 10. Michigan Merit Examination (the SAT with Essay, WIN work-readiness tests and M-STEP science and social studies): grade 11. Students with the most significant cognitive disabilities may take MI-Access instead." },
      { title: "When", body: "In spring, in windows the Michigan Department of Education announces each year. Each school sets its own days within them." },
      { title: "The early grades", body: "In Kindergarten to 2nd grade, schools give early literacy and math benchmark assessments in the fall and spring (and sometimes winter) to see how children are doing and plan teaching. They aren't graded." },
      { title: "What they cover", body: "The M-STEP checks the Michigan K-12 Standards in English language arts, math, science and social studies, and English language arts includes a written response at every grade. The PSAT and SAT check readiness for college and careers." },
      { title: "How results are described", body: "Scores are reported as performance levels compared with state expectations. Families get a score report from the school, and school results are published on MI School Data." },
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
        q: "What is the M-STEP?",
        a: "The Michigan Student Test of Educational Progress is Michigan's state test. It covers English language arts and math in grades 3 to 7, and science and social studies in grades 5, 8 and 11. It is given online in the spring, with a paper version for students who need it.",
      },
      {
        q: "Why does my 8th grader take the PSAT instead?",
        a: "In 8th grade, Michigan uses the PSAT 8/9 for English language arts and math. Eighth graders still take the M-STEP in science and social studies.",
      },
      {
        q: "What is the Read by Grade Three Law?",
        a: "It asks schools to check reading often in Kindergarten to 3rd grade and to make an individual reading improvement plan for any child who needs extra help. Since 2023, the law no longer requires holding a 3rd grader back because of a reading score. Ask your school how it shares reading results and plans.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your school chooses.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts, science and social studies skills in the Michigan K-12 Standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Michigan is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies (Myself and Others) they learn about themselves, families, rules, the American flag and the difference between goods and services. Schools also give early literacy and math benchmark checks.",
      lookFor: "Many Michigan districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies (Families and Schools) covers family history, maps of the classroom, symbols of the United States, and producers and consumers.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies (the Local Community) covers the community's history, maps, local government and businesses.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and spend social studies on Michigan Studies: the Great Lakes and the two peninsulas, the Anishinaabek and Michigan's Tribes, early Michigan to statehood in 1837, the state's economy and how Michigan's government works. It is also the first year of the M-STEP in English language arts and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. Ask about reading checks under the Read by Grade Three Law. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies is United States Studies: the regions of the country, the federal government and the market economy, plus Michigan history from statehood, from lumber, copper and iron to the automobile, newcomers to Michigan and the Underground Railroad.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research on United States and Michigan topics.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is Integrated United States History, from the peoples of the Eastern Woodland and European exploration to the colonies, the Revolution and the Constitution, and students take the M-STEP in science and social studies as well as English language arts and math.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Michigan districts. Math moves to ratios, rates, negative numbers and expressions. Science covers energy, cells and weather, and social studies is Global Geography: world regions, landforms and climates, cultures, governments and economies, and the tools geographers use.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's resources, and social studies is World History and Geography to 1500: the first farmers, river valley civilizations, Greece, Rome, India and China, world religions, trade networks and Africa's kingdoms.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is Integrated United States History from the Constitution to Reconstruction, including Michigan's part in it: the Northwest Ordinance, the founding of the Republican Party in Jackson and Michigan soldiers in the Civil War. Students take the PSAT 8/9 and the M-STEP in science and social studies.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies in ${APP_NAME} covers civics and economics, which the Michigan Merit Curriculum requires for graduation, including how Michigan governs itself under its 1963 constitution, plus personal finance. Students take the PSAT 8/9 in the spring.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
