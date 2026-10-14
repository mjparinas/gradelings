import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guide copy for Alaska, in US English. The competencies page is the Alaska Standards for Culturally-Responsive
// Schools, Cultural Standards for Students (A to E), adopted by the State Board of Education in 1998 and published by
// the Alaska Native Knowledge Network: students grounded in their community's heritage, building on local knowledge,
// taking part in many cultural settings, learning through traditional ways of knowing, and seeing how everything in the
// world around them is connected. They are guidance for schools, not graded subjects. The assessment page covers AK STAR
// (English language arts and math, grades 3 to 9) and the Alaska Science Assessment (grades 5, 8 and 10), from the
// Department of Education and Early Development's quick guide to statewide assessments; dates change each year, so the
// page points to the department. No French here, so no French guide. Record: docs/research/alaska/README.md.

export const ALASKA_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "cultural-standards",
    label: "Cultural Standards",
    hubBlurb: "Alaska's Cultural Standards for Students, the five kinds of cultural knowledge schools build, in plain words.",
    description:
      "What Alaska's Cultural Standards for Students mean (knowing your community's heritage, building on local knowledge, taking part in many cultural settings, learning in traditional ways, and seeing how everything is connected), how they show up at school, and simple ways to support them at home.",
    gradeLine: "Alaska's Cultural Standards for Students apply in every grade and every subject.",
    closing: "these understandings grow through family, community, Elders and the land, not worksheets.",
    title: "Alaska's Cultural Standards for Students, explained for parents",
    intro:
      "Alongside the content standards for each subject, Alaska has Cultural Standards for Students, part of the Alaska Standards for Culturally-Responsive Schools adopted by the State Board of Education. They describe students who are grounded in the heritage of their own community and able to learn about the wider world from that foundation. They were written with Alaska Native educators and apply to every student, whatever their background. They are guidance for schools and communities, not a separate subject, and they are not graded.",
    items: [
      {
        id: "heritage",
        name: "A. Grounded in their community's heritage",
        blurb: "Knowing the history, traditions and values of their own family and community.",
        parts: [
          { name: "Family history", blurb: "Knowing their own family story and where they come from." },
          { name: "Traditions", blurb: "Learning and passing on the community's traditions through oral and written history." },
          { name: "Language", blurb: "Understanding the role of the local heritage language in who they are." },
        ],
        atHome: [
          "Tell your child stories about grandparents and relatives, and draw a family tree together.",
          "Share a family tradition, recipe or seasonal activity and explain why it matters to you.",
          "Learn a few words of your family's or your community's heritage language together.",
        ],
      },
      {
        id: "foundation",
        name: "B. Building on local knowledge",
        blurb: "Using what they learn from their own community as a foundation for success in school and life.",
        parts: [
          { name: "Learning from other cultures", blurb: "Gaining insight from other cultures while staying true to their own." },
          { name: "Local knowledge", blurb: "Using their own community's skills and ways of knowing to learn about the larger world." },
          { name: "Thinking ahead", blurb: "Making choices with long-term consequences in mind." },
        ],
        atHome: [
          "When your child learns something new at school, ask how it connects to something they already know from home.",
          "Talk through a decision together and ask what might happen next week, next year and for the next generation.",
          "Read or watch stories from cultures different from your own and talk about what you share.",
        ],
      },
      {
        id: "participation",
        name: "C. Taking part in many cultural settings",
        blurb: "Feeling at home and contributing in their own community and in other settings.",
        parts: [
          { name: "Community life", blurb: "Taking part in local activities, including subsistence where it fits the family." },
          { name: "Contributing", blurb: "Helping their family and their community make good decisions." },
          { name: "Many settings", blurb: "Getting along well in different cultural settings, from a village to a city." },
        ],
        atHome: [
          "Join a community event together: a potluck, a cleanup, a festival or a fishing day.",
          "Give your child a real job that helps the household, and thank them for it.",
          "Talk about how to be a good guest when visiting a new place or family.",
        ],
      },
      {
        id: "ways-of-knowing",
        name: "D. Learning in traditional ways",
        blurb: "Learning by watching, doing and listening to Elders and other knowledge holders.",
        parts: [
          { name: "Learning from Elders", blurb: "Spending time with Elders and treating them with respect as teachers." },
          { name: "Hands-on learning", blurb: "Learning by watching and doing, as at a culture camp or out on the land." },
          { name: "Gathering stories", blurb: "Collecting local history and thinking about what it means." },
        ],
        atHome: [
          "Visit an Elder or older relative and let your child ask them about life when they were young.",
          "Learn a practical skill together by doing it: cooking, mending, fishing, berry picking or building.",
          "Help your child think honestly about what they're good at and what they want to get better at.",
        ],
      },
      {
        id: "connections",
        name: "E. Seeing how everything is connected",
        blurb: "Understanding the land, how cultures change, and their own place in the world.",
        parts: [
          { name: "The local land", blurb: "Knowing the ecology and geography of the region they live in." },
          { name: "Cultures and change", blurb: "Understanding how and why cultures change, and what happens when they meet." },
          { name: "Their place", blurb: "Knowing who they are and their place in the world." },
        ],
        atHome: [
          "Notice the seasons together: when the river breaks up, when the berries ripen, when the birds return.",
          "Talk about how your town or family has changed over time, and why.",
          "Ask your child what makes your community special and what they would want to keep the same.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the Cultural Standards graded?",
        a: "No. They are guidance for schools and communities about what culturally knowledgeable students can do. Teachers weave them into lessons, projects and culture camps, but they are not a subject on the report card.",
      },
      {
        q: "Are they only for Alaska Native students?",
        a: "No. They were developed with Alaska Native educators and draw on Alaska Native ways of knowing, but they are meant for every student in every community. Each child is grounded in their own family's and community's heritage.",
      },
      {
        q: "Where do the Cultural Standards come from?",
        a: "They are part of the Alaska Standards for Culturally-Responsive Schools, adopted by the Alaska State Board of Education in 1998. The Alaska Native Knowledge Network at the University of Alaska Fairbanks publishes them, along with standards for educators, schools and communities.",
      },
      {
        q: `Does ${APP_NAME} measure the Cultural Standards?`,
        a: `No. ${APP_NAME} practices subject skills in math, English language arts, science and social studies. These understandings grow through family, community, Elders and the land, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I learn more about how my child's school uses them?",
        a: "Ask your child's teacher or school how the class connects learning to the local community, and whether Elders or culture camps are part of the year. Your district may also have its own local cultural standards.",
      },
    ],
  },
  assessment: {
    slug: "state-tests",
    short: "state tests",
    source: "the Alaska Department of Education and Early Development",
    hubBlurb: "AK STAR in English language arts and math (grades 3 to 9) and the Alaska Science Assessment (grades 5, 8 and 10).",
    name: "Alaska state tests (AK STAR)",
    intro:
      "Alaska students take two state tests: the Alaska System of Academic Readiness (AK STAR) in English language arts and math in grades 3 to 9, and the Alaska Science Assessment in grades 5, 8 and 10. The tests are separate from the report card and from class grades. Under the Alaska Reads Act, children in kindergarten through 3rd grade also take a short reading screener during the year.",
    grades: ["3", "4", "5", "6", "7", "8", "9"],
    facts: [
      { title: "Who takes them", body: "English language arts and math (AK STAR): grades 3 to 9. Science (the Alaska Science Assessment): grades 5, 8 and 10. Students with significant cognitive disabilities may take an alternate assessment instead." },
      { title: "When", body: "Both tests are given in the spring, in a window the Alaska Department of Education and Early Development sets each year. Each school picks its own dates within that window." },
      { title: "What they cover", body: "AK STAR checks Alaska's English language arts and mathematics standards. It is connected to the MAP Growth tests many schools give in the fall or winter, so teachers can see growth through the year. The science test checks the Science Standards for Alaska." },
      { title: "How results are described", body: "Scores are reported as achievement levels compared with state expectations, along with a measure of growth. Families get a score report from the school." },
      { title: "Report card link", body: "State test scores don't change your child's report card. They are one more snapshot for families, teachers and schools." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, then ask your child to retell what happened and explain why.",
      "Practice math with real problems (shopping, cooking, travel times, sharing a catch) as well as math facts.",
      "Ask “How do you know?” so your child gets used to explaining answers.",
      "Tell your child the tests show what they know and how they are growing. They are not something to fail.",
    ],
    faqs: [
      {
        q: "What is AK STAR?",
        a: "AK STAR (the Alaska System of Academic Readiness) is Alaska's state test in English language arts and math for grades 3 to 9. It is given in the spring and is linked to the MAP Growth tests many schools give earlier in the year.",
      },
      {
        q: "Which grades take the science test?",
        a: "The Alaska Science Assessment is given in grades 5, 8 and 10.",
      },
      {
        q: "Are state test scores part of my child's report card?",
        a: "No. They are separate. Your child's report card describes learning in class through the year, using the marks your district chooses.",
      },
      {
        q: "Can my child skip the state tests?",
        a: "Ask your school. Federal law expects nearly all students to take the state tests, and schools can explain their own policy and what happens if a family asks for their child not to test.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practices the math, English language arts and science skills in Alaska's content standards with kind feedback and no timers unless you want them. It isn't a copy of the state tests and doesn't predict a score.`,
      },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten in Alaska is a year of learning through play, stories and hands-on activities. Children learn letters and sounds, count to 100 and start adding and taking away within 10. In social studies they learn about themselves, families, rules and jobs, and the places around them.",
      lookFor: "Many Alaska districts use standards-based report cards. Expect comments on letters and sounds, counting, following routines, getting along with classmates and how your child shares ideas. Schools also check early reading skills a few times a year under the Alaska Reads Act.",
    },
    "1": {
      overview: "In 1st grade, reading and writing take off. Children sound out words, read short books and write simple sentences. In math they add and subtract within 20 and learn place value up to 120. Social studies looks at a child's place in the world: maps of the neighborhood, how the land and weather shape a community, and how communities change.",
      lookFor: "Look for comments on reading simple books, spelling common words, adding and subtracting, and taking part in class.",
    },
    "2": {
      overview: "In 2nd grade, reading becomes smoother and writing gets longer. Math moves to numbers up to 1,000, adding and subtracting within 100, money and time. Science looks at materials, plants and animals, and how land changes, and social studies is about the local community, its leaders and Alaska's state symbols.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with regrouping, and the ability to explain thinking.",
    },
    "3": {
      overview: "3rd grade is a big year. Students read to learn as well as learning to read, start multiplication, division and fractions, and study Alaska's past, present and future: its land and regions, its history from Russian America to statehood, how Alaska is governed, and Alaska Native cultures today. It is also the first year of AK STAR.",
      lookFor: "Look for comments on reading comprehension, paragraph writing, multiplication and division facts within 100, and fractions. State test scores are separate from the report card.",
    },
    "4": {
      overview: "4th grade raises the pace with multi-digit multiplication and division, equivalent fractions and decimals, and longer writing. Social studies covers the regions of the United States, their land, resources and work, and Alaska's industries and ties to the rest of the nation and the world.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and using maps and sources.",
    },
    "5": {
      overview: "In 5th grade, students add, subtract and multiply fractions, work with decimals and volume, and write longer pieces with evidence. Social studies is early United States history, from the colonies to the Revolution and the Constitution, and students take the Alaska Science Assessment.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence and independent research. State test scores are separate from the report card.",
    },
    "6": {
      overview: "6th grade is the start of middle school in many Alaska districts. Math moves to ratios, rates, negative numbers and expressions. Science covers cells, heat and design, and social studies is Alaska studies and geography: the state's physical regions, earthquakes and other hazards, the peoples of Alaska, its resources and economy, and local, Tribal and state government.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: `In 7th grade, students work with proportional relationships, operations with negative numbers and equations. Science covers chemical reactions, ecosystems and Earth's systems, and social studies in ${APP_NAME} is world history and geography, from early civilizations to medieval times and the empires of Africa and the Americas.`,
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "8th grade prepares students for high school. Math covers linear equations, functions and the Pythagorean theorem. Science covers forces, heredity and space, and social studies is United States history and civics, from European exploration and the founding to Reconstruction. Students also take the Alaska Science Assessment.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: `9th grade is the first year of high school, and the last year of AK STAR. Math in ${APP_NAME} covers high school algebra (expressions, equations, functions and data), and English classes read and write more closely. Social studies covers civics and government, including the Alaska Constitution, statehood and the Alaska Native Claims Settlement Act, and Alaska's resource economy and the Permanent Fund.`,
      lookFor: "Look for comments on planning ahead for course choices and credits, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
