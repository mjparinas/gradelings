import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Minnesota, in US English. The competencies page is the Minnesota Department of Education's
// (MDE) social and emotional learning guidance, which names five competencies (self-awareness, self-management, social
// awareness, relationship skills and responsible decision-making) as voluntary guidance for schools; they are not
// academic standards and are not graded. It uses the existing `sel-standards` URL segment so the shared route folder
// serves Minnesota too. The assessment page covers the Minnesota Comprehensive Assessments (MCA) as MDE describes them:
// reading and mathematics in grades 3 to 8, reading in grade 10 and mathematics in grade 11, science in grades 5 and 8
// and once in high school; four achievement levels (Does Not Meet, Partially Meets, Meets and Exceeds the Standards);
// the MTAS alternate test; WIDA ACCESS for English learners; and the parent refusal form MDE publishes under Minnesota
// Statutes 120B.31. Dates change each year, so the page points to MDE. Minnesota has no French subject, so no French
// guide. Grade notes follow the Minnesota K-12 Academic Standards (docs/research/minnesota/outcomes.json) and the
// grade themes of the 2021 social studies standards.

export const MINNESOTA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "sel-standards",
    label: "Social emotional learning",
    hubBlurb: "Minnesota's five social and emotional learning competencies, from knowing yourself to making caring choices, in plain words.",
    description:
      "What Minnesota's five social and emotional learning competencies mean (self-awareness, self-management, social awareness, relationship skills and responsible decision-making), how they show up at school, and simple ways to support them at home.",
    gradeLine: "Minnesota's social and emotional learning competencies apply in every grade.",
    closing: "social and emotional skills grow through conversation, play and everyday responsibilities.",
    title: "Minnesota's social and emotional learning competencies, explained for parents",
    intro:
      "Alongside subjects like math and science, the Minnesota Department of Education (MDE) gives schools guidance on social and emotional learning (SEL): the skills students use to understand themselves, manage their feelings, get along with others and make caring choices. MDE names five competencies. They are guidance for schools, not academic standards, so each district decides how to use them, and they are not graded.",
    items: [
      {
        id: "self-awareness",
        name: "Self-awareness",
        blurb: "Knowing your feelings, strengths, values and interests, and how they shape what you do.",
        parts: [
          { name: "Feelings", blurb: "Naming emotions and noticing how they affect your thoughts and actions." },
          { name: "Identity", blurb: "Knowing what makes you who you are, including your family, culture and interests." },
          { name: "Confidence", blurb: "Seeing your strengths and believing you can grow." },
        ],
        atHome: [
          "Name feelings out loud, yours and theirs: “You look frustrated. Is the puzzle tricky?”",
          "Ask what your child is proud of this week, and why.",
          "Talk about a time you got better at something by practicing.",
        ],
      },
      {
        id: "self-management",
        name: "Self-management",
        blurb: "Handling feelings, stress and impulses, and working steadily toward goals.",
        parts: [
          { name: "Calming down", blurb: "Using a strategy to get calm when feelings are big." },
          { name: "Goals", blurb: "Setting a goal and sticking with it, even when it's hard." },
          { name: "Organizing", blurb: "Planning time and materials to get things done." },
        ],
        atHome: [
          "Practice a calm-down step together, like three slow breaths or a short walk.",
          "Help your child set a small weekly goal and check in on it together.",
          "Use a simple checklist for morning or homework routines.",
        ],
      },
      {
        id: "social-awareness",
        name: "Social awareness",
        blurb: "Understanding other people's feelings and points of view, and respecting people different from you.",
        parts: [
          { name: "Empathy", blurb: "Imagining how others feel and seeing things from their point of view." },
          { name: "Respect", blurb: "Valuing what makes each person and group unique, and what people share." },
          { name: "Community", blurb: "Noticing what your family, school and community need." },
        ],
        atHome: [
          "When reading a story, ask how a character feels and why.",
          "Talk about a family tradition and one from a friend's family.",
          "Notice together when someone could use help, and talk about what to do.",
        ],
      },
      {
        id: "relationship-skills",
        name: "Relationship skills",
        blurb: "Making and keeping healthy friendships, communicating clearly and working well with others.",
        parts: [
          { name: "Communication", blurb: "Listening well and speaking up with care." },
          { name: "Teamwork", blurb: "Sharing work, taking turns and helping a group succeed." },
          { name: "Solving conflicts", blurb: "Working through disagreements fairly and asking for help when needed." },
        ],
        atHome: [
          "Play a board game and practice taking turns and losing gracefully.",
          "After a disagreement, talk through what each person wanted and what could work for both.",
          "Give your child a family job that needs teamwork, like cooking a meal together.",
        ],
      },
      {
        id: "decision-making",
        name: "Responsible decision-making",
        blurb: "Making thoughtful choices that keep yourself and others safe and well, at home, at school and in the community.",
        parts: [
          { name: "Thinking ahead", blurb: "Weighing options and what might happen with each." },
          { name: "Fairness and safety", blurb: "Thinking about how a choice affects your own and other people's safety and feelings." },
          { name: "Helping out", blurb: "Taking action to help your school and community." },
        ],
        atHome: [
          "Before a family decision, list the options and what might happen with each.",
          "Wonder out loud together: “What could we do? What might happen next?”",
          "Plan a small way to help a neighbor or your community, then talk about how it went.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are these social emotional skills graded?",
        a: "No. MDE's SEL competencies are guidance for schools, not academic standards, and they are not graded. Some districts mention work habits or social skills on the report card, but how they do it is up to the district.",
      },
      {
        q: "What are Minnesota's five SEL competencies?",
        a: "Self-awareness, self-management, social awareness, relationship skills and responsible decision-making. Schools build them in every grade, often through classroom routines, morning meetings and advisory time.",
      },
      {
        q: "Does every Minnesota school teach SEL the same way?",
        a: "No. Each district and school decides how to build these skills, so ask your child's teacher or counselor what your school does.",
      },
      {
        q: `Does ${APP_NAME} measure social and emotional skills?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. Its kind hints, small goals and calm options can help children stick with hard things, but social and emotional skills grow through conversation, play and teamwork, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about SEL at my child's school?",
        a: "Ask your child's teacher or school counselor how the school builds these skills and what you can do at home. MDE's website has its social and emotional learning guidance.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Minnesota Department of Education (MDE)",
    hubBlurb: "The Minnesota Comprehensive Assessments (MCA) in reading and math in grades 3 to 8, and science in grades 5 and 8.",
    name: "Minnesota Comprehensive Assessments (MCA)",
    intro:
      "Each spring, Minnesota students take the Minnesota Comprehensive Assessments (MCA): reading and math in grades 3 to 8, and science in grades 5 and 8. The tests check the Minnesota K-12 Academic Standards taught in class. They are separate from the report card and from class grades.",
    grades: ["3", "4", "5", "6", "7", "8"],
    facts: [
      { title: "Who takes them", body: "Reading and math: every grade from 3 to 8, then reading in grade 10 and math in grade 11. Science: grade 5, grade 8 and once in high school, usually in the year a student takes biology. Students with the most significant cognitive disabilities may take the Minnesota Test of Academic Skills (MTAS) instead." },
      { title: "What they cover", body: "The MCA follow Minnesota's academic standards. Students read passages and answer questions about them, solve math problems and explain science ideas, mostly on a computer." },
      { title: "When and how", body: "Students test online in the spring, within a window MDE sets each year. Your school chooses its own days within it. Most students finish each test within a few class periods." },
      { title: "How results are described", body: "Scores are reported in four achievement levels: Does Not Meet the Standards, Partially Meets the Standards, Meets the Standards and Exceeds the Standards. Families get an individual report that shows how their child did." },
      { title: "English learners", body: "Students learning English also take a yearly English language proficiency test, ACCESS for ELLs." },
      { title: "Taking part", body: "Minnesota law lets parents and guardians refuse their child's participation in state tests. MDE publishes a guide and a refusal form each year; ask your school for it if you are thinking about it." },
      { title: "Report card link", body: "MCA scores don't change your child's report card. The report card describes learning in class through the year, using the marks your district chooses." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, then ask your child to retell what happened and point to the words that show it.",
      "Practice math with real problems (shopping, cooking, travel times) as well as math facts.",
      "Try MDE's item samplers together, so the computer screens feel familiar.",
      "Tell your child the tests show what they know. They are not something to fail.",
    ],
    faqs: [
      {
        q: "Which state tests will my child take?",
        a: "Reading and math every year from 3rd to 8th grade, and science in 5th and 8th grade. In high school, students take reading in 10th grade, math in 11th grade and science once.",
      },
      {
        q: "When are the tests?",
        a: "In the spring, but the dates change each year. MDE posts the testing window on its statewide testing pages, and your school sets its own days within it.",
      },
      {
        q: "Are MCA scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, so the two can tell different parts of the story.",
      },
      {
        q: "What do the achievement levels mean?",
        a: "Meets the Standards means your child is where the standards expect for their grade, and Exceeds means they are beyond it. Partially Meets and Does Not Meet mean they are still building those skills. Talk with your child's teacher about what the score means for your child.",
      },
      {
        q: "Can I opt my child out?",
        a: "Yes. Minnesota law lets parents and guardians refuse participation. MDE's yearly parent guide includes the refusal form, and your school can give you a copy and explain what it means for your child.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts and science skills in Minnesota's academic standards with kind feedback and no timers unless you want them. It isn't a copy of the MCA and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Pre-K in Minnesota is the year before kindergarten, for children who are 4. Public school, Head Start and child care programs follow the 4-5 years column of Minnesota's Early Childhood Indicators of Progress. Children learn through play, stories and songs: counting, shapes and patterns, letters and rhymes, plus first ideas about families, communities and the world around them.",
      lookFor: "Pre-K reports are usually progress notes or a checklist of skills, not grades. Look for counting small groups, naming letters, hearing rhymes, taking turns and talking about feelings.",
    },
    k: {
      overview: "Kindergarten in Minnesota is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 by ones and tens, and add and subtract within 5. Science explores what plants and animals need, pushes and pulls, weather and the sun's warmth, and social studies is “Family and Community”: belonging, rules, needs and wants, maps of nearby places and words for past and future.",
      lookFor: "Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20, count to 120 and start naming coins. Science covers plant and animal parts, parents and their young, light and sound, and materials, and social studies is “Communities and Culture”: rights and rules, choices and trade, and maps and timelines.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and simple graphs. Science looks at heating and cooling, forces and motion, where water is found and weather, and social studies is “People and the Environment”: voting, levels of government, money and choices, and how Dakota and Anishinaabe people have lived through the seasons, long ago and today.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study life cycles, how we see with light and patterns in the sky. Social studies is “The Ancient World”: daily life, inventions and sources from ancient civilizations, and Minnesota's 11 Tribal Nations. It is also the first year of the MCA in reading and math.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. MCA scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions, decimals, area and perimeter, and longer writing. Science covers weathering and erosion, Earth's systems and water, energy resources, magnets and inherited traits. Social studies is “The Contemporary World”: world regions and states, resources and trade, migration and global issues.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and research skills.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract, multiply and divide with fractions and decimals, work with volume and the coordinate plane, and write longer pieces with evidence. Science covers matter and its changes, energy, food webs and the sun and stars, and students take the science MCA. Social studies is “Early American Studies”: the colonies, slavery and resistance, the American Revolution and the Constitution.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. MCA scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Minnesota districts. Math moves to ratios, rates, negative numbers, expressions and equations, and unit conversions. Science is Earth and space science: the solar system, plate tectonics, rocks, Earth's history, resources and climate. Social studies is “Minnesota Studies”: the land and water, the Dakota and Anishinaabe nations and their sovereignty, territory and statehood, the US–Dakota War of 1862, industry and immigration, and Minnesota's government.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "In 7th grade, students work with proportional relationships, operations with negative numbers, equations and inequalities, circles and probability. Science is life science: cells, body systems, ecosystems, heredity and natural selection. Social studies is “United States Studies”: the Civil War and Reconstruction, industry and reform, the world wars, the Great Depression, the Cold War and the civil rights movement.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations and functions, systems of equations, exponents and the Pythagorean theorem. Science is physical science: atoms and reactions, forces and motion, energy, fields and waves, and students take the science MCA. Social studies is “Global Studies”: governments, economies and human rights around the world, population and migration, and global trade.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school. Math in ${APP_NAME} follows Minnesota's high school benchmarks (linear, exponential and quadratic functions, systems and data). English classes read and write more closely, and science draws on the high school life, chemistry, Earth and physics benchmarks. Social studies is civics: founding ideas, the Constitution and rights, the three branches, elections, and Minnesota's state, local and Tribal governments.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math, lab work in science and weighing perspectives in social studies and English.",
    },
  },
};
