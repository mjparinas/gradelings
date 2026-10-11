import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guides for Newfoundland and Labrador's English program. Sources: the Department of Education and Early Childhood
// Development (gov.nl.ca/education), the Foundation documents for the Atlantic Canada curricula (which set out the Essential
// Graduation Learnings and the key-stage outcomes), and the Newfoundland and Labrador English School District's report card
// guide. Programs, entry points and the provincial assessment schedule change, so the copy points parents to their school and
// to gov.nl.ca. The wording needs a Newfoundland and Labrador teacher's review.

export const NEWFOUNDLAND_AND_LABRADOR_GUIDES: FrameworkGuides = {
  french: {
    metaTail: "Core French starts in Grade 4. Early French Immersion starts in Kindergarten and Late French Immersion in Grade 7.",
    browse: ["4"],
    title: "Core French and French Immersion in Newfoundland and Labrador: a guide for parents",
    intro: `Families in Newfoundland and Labrador often ask how the French programs differ, when each starts, and how to help at home without speaking French. In English-language schools, children can learn French through Core French or through French Immersion. ${APP_NAME} practises Core French from Grade 4 to Grade 9. French Immersion is not built yet, because the immersion curriculum guides are not public.`,
    compare: [
      { title: "What it is", core: "French as a school subject, taught for part of the week alongside classes in English.", immersion: "A program in which French is the language of instruction and, as much as possible, of the classroom." },
      { title: "When it starts", core: "Core French is organized from Grade 4, and most students in Grades 4 to 9 take it. Intensive Core French is offered in Grade 6 in some schools.", immersion: "Early French Immersion begins in Kindergarten with all instruction in French. Late French Immersion begins in Grade 7." },
      { title: "Who it suits", core: "Every child can learn some French. No earlier French is needed.", immersion: "Families who want their child to become fluent in French and are happy to have much of the school day in French." },
      { title: "Name in the curriculum", core: "Core French (Atlantic Canada Second Language Core French Curriculum)", immersion: "French Immersion curriculum guides" },
      { title: `In ${APP_NAME}`, core: "Grades 4 to 9. Prompts are in English, with French words and sentences to read, choose and build.", immersion: "Not available for Newfoundland and Labrador yet." },
    ],
    sections: [
      { title: "What Core French children learn", body: "The Atlantic Core French curriculum has four strands: communication, culture, general language education and language. Children learn to share personal information, describe people and places, ask simple questions, understand a simple text, and learn about francophone communities in Newfoundland and Labrador, Canada and other countries." },
      { title: "What French Immersion children learn", body: "In French Immersion, children learn school subjects in French. English language arts is added in Grade 3 and some other subjects in English in later grades, so the share of French lessens through the years of school." },
      { title: "How report cards describe French", body: `On the Kindergarten to Grade 6 report card, Core French is rated on communicating in oral and written French, using language learning skills and knowing about francophone cultures. ${APP_NAME} shows practice, not a report card mark, so ask your child's teacher what the report card says about French for your child.` },
      { title: "Helping if you don't speak French", body: "You don't need French to help. Ask your child to teach you a word each day, listen while they read aloud, and celebrate effort over accuracy. Mistakes are a normal part of learning a language." },
      { title: `How ${APP_NAME} fits in`, body: "French is off by default. A parent can switch on Core French for each child in Settings, under Subjects. French is not counted toward the Grade Champion trophy, and French lessons are read aloud in a French voice." },
    ],
    atHome: [
      "Pick one new French word each day and use it at dinner or on the way to school.",
      "Label a few household objects with sticky notes in French.",
      "Listen to French songs or watch a short French video together and talk about what you noticed.",
      "Ask your child to read a page aloud in French, then retell it to you in English.",
      "Play a French game: count stairs, name colours, or spell a word out loud.",
    ],
    faqs: [
      { q: "When does French start in Newfoundland and Labrador?", a: "Core French is organized from Grade 4. Early French Immersion starts in Kindergarten for families who choose it, and Late French Immersion starts in Grade 7. Your school can tell you what is offered near you." },
      { q: "Can my child start French Immersion later?", a: "Late French Immersion begins in Grade 7. Entry rules and spaces differ by school and district, so ask your school or the Newfoundland and Labrador English School District." },
      { q: "Will French Immersion hurt my child's English?", a: "English language arts is still taught alongside immersion, and research has generally found that immersion students do well in English. If you are worried, talk with your child's teacher." },
      { q: `Do French marks count toward the Grade Champion trophy in ${APP_NAME}?`, a: "No. French is a separate, optional set of subjects. Children earn their own French trophies instead." },
      { q: `Does ${APP_NAME} replace French class?`, a: "No. It gives short, kind practice that matches the Core French topics. It doesn't replace a teacher, and its levels are not a report card mark." },
    ],
  },
  competencies: {
    slug: "graduation-learnings",
    label: "Essential Graduation Learnings",
    hubBlurb: "The six Essential Graduation Learnings that guide the Atlantic Canada curriculum, in plain words.",
    description:
      "What the Essential Graduation Learnings mean (aesthetic expression, citizenship, communication, personal development, problem solving and technological competence), and simple ways to build them at home.",
    gradeLine: "The Essential Graduation Learnings grow through every subject from Kindergarten to Grade 12.",
    closing: "These learnings grow through everyday routines, projects, play and helping others.",
    title: "The Essential Graduation Learnings, explained for parents",
    intro:
      "The Atlantic Canada curriculum is built around six Essential Graduation Learnings. They describe what graduates should be able to do, and they act as a framework for every subject, so teachers work on them in each grade. In the curriculum documents, each subject lists the key-stage outcomes at the end of Grade 3, Grade 6 and Grade 9 that contribute to them.",
    items: [
      { id: "aesthetic-expression", name: "Aesthetic expression", blurb: "Responding with critical awareness to the arts, and expressing yourself through them.", parts: [], atHome: ["Visit a library, museum or gallery together and talk about what you notice.", "Ask your child to make a poster, song or comic about something they learned.", "Read a favourite story twice and talk about what changed the second time."] },
      { id: "citizenship", name: "Citizenship", blurb: "Understanding how people, communities and the environment depend on each other, locally and globally.", parts: [], atHome: ["Help with a family or community job, such as a cleanup.", "Talk about a news story and ask how different people might see it.", "Learn about a custom or tradition from a family friend or neighbour."] },
      { id: "communication", name: "Communication", blurb: "Using listening, viewing, speaking, reading and writing, and mathematical and scientific symbols, to think, learn and share.", parts: [], atHome: ["Ask your child to explain a game or a story to you without showing it.", "Read together every day and ask what they think will happen next.", "Write a postcard or a note to a relative."] },
      { id: "personal-development", name: "Personal development", blurb: "Continuing to learn and keeping an active, healthy lifestyle.", parts: [], atHome: ["Make a short routine for homework time and let your child choose the order.", "Go for a walk, skate or play outside together.", "Ask your child what was hard today and what helped."] },
      { id: "problem-solving", name: "Problem solving", blurb: "Using strategies and processes to work through all kinds of problems, with language, mathematics and science.", parts: [], atHome: ["Ask “How do you know?” about something in the news or an ad.", "Plan a trip or a budget together and let your child do the maths.", "Try a puzzle or a recipe and talk about what you would change."] },
      { id: "technological-competence", name: "Technological competence", blurb: "Using a variety of technologies, understanding how they work and choosing the right one to solve a problem.", parts: [], atHome: ["Take something simple apart, like an old flashlight, and talk about how it works.", "Search for an answer together and check two sources.", "Set up a tablet or computer routine with time limits you both agree on."] },
    ],
    faqs: [
      { q: "Are the Essential Graduation Learnings part of the subject ratings?", a: "They are woven through subjects rather than rated as a separate subject. Ask your child's teacher how they show up on the report card." },
      { q: "How do they connect to what my child practises?", a: "Every subject builds them, for example problem solving in math problems, communication in language arts and citizenship in social studies." },
      { q: `Does ${APP_NAME} measure the learnings?`, a: `No. ${APP_NAME} practises subject outcomes and shows how practice is going. The learnings grow through routines, talk and community, so we suggest home activities rather than scores.` },
      { q: "How are they different from the social and behavioural indicators?", a: "The Kindergarten to Grade 6 report card also rates well-being and belonging, communication, social contribution and play and exploration as Consistently, Usually, With Prompting or Rarely. The Essential Graduation Learnings are the wider goals the curriculum works towards." },
    ],
  },
  assessment: {
    slug: "provincial-assessments",
    short: "Provincial assessments",
    source: "Newfoundland and Labrador Department of Education and Early Childhood Development (gov.nl.ca/education)",
    hubBlurb: "Newfoundland and Labrador's Provincial Reading and Mathematics Assessments, and how they differ from report cards.",
    name: "Newfoundland and Labrador provincial reading and mathematics assessments",
    intro:
      "The department runs the Provincial Reading and Mathematics Assessments (PRMA) in Grades 3 and 6. They give schools, districts and the province information that helps guide teaching. The schedule and format can change, so check the department's website or ask your school for this year's details.",
    grades: ["3", "6"],
    facts: [
      { title: "Who takes it", body: "The department lists the assessments for Grades 3 and 6. Ask your school which students take part this year." },
      { title: "What it covers", body: "Reading and mathematics." },
      { title: "When", body: "The department publishes the dates each year. Your school will tell you when your child's grade takes part." },
      { title: "Why", body: "The aim is to understand how students are doing across the province, to guide teaching and help schools plan support." },
      { title: "Report card link", body: "The assessments are separate from report cards. Your school will tell you how results are shared." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, then ask your child to retell what happened and explain why.",
      "Practise math with real problems, such as shopping, cooking and travel times, as well as number facts.",
      "Tell your child it is a check of what they know, not a test they can fail.",
    ],
    faqs: [
      { q: "Which grades write the provincial assessments?", a: "The department lists Grades 3 and 6 for reading and mathematics. Dates and details can change, so check gov.nl.ca or ask your school for this year." },
      { q: "Are the provincial assessments part of my child's report card?", a: "They are separate from report cards. Ask your child's teacher how results are shared." },
      { q: "Should my child study for them?", a: "Cramming is not needed. The assessments check skills built over years, so short, regular practice in reading and math is more helpful than a last-minute push." },
      { q: "Where can I find the current schedule?", a: "The Department of Education and Early Childhood Development publishes information about the assessments at gov.nl.ca/education. Your school will also tell you when your child's grade takes part." },
      { q: `Can ${APP_NAME} help my child get ready?`, a: `${APP_NAME} practises math and language skills taught in these grades with kind feedback and no timers unless you want them. It isn't a copy of the provincial assessments and doesn't predict results.` },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten builds early learning through play. Children explore language and letters, counting and shapes, and the world around them. Reports use the same four-point rating as the later grades, and also describe play and exploration, well-being and belonging, communication and social contribution.",
      lookFor: "Look for comments on listening, early letters and sounds, counting to 10, patterns, sharing ideas, and getting along with classmates.",
    },
    "1": {
      overview: "Grade 1 is where reading, writing and number sense start to grow quickly. Children work with numbers to 20, patterns and shapes, and explore living things, materials and the community.",
      lookFor: "Look for comments on reading simple texts, writing a few sentences, counting and adding, and taking part in class.",
    },
    "2": {
      overview: "In Grade 2, reading becomes smoother and writing gets longer. Math moves to numbers to 100, addition and subtraction, patterns and graphs. Science and social studies build curiosity about animals, materials, communities and how things change.",
      lookFor: "Look for fluent reading, longer writing, comfort with adding and subtracting, and the ability to explain thinking.",
    },
    "3": {
      overview: "Grade 3 is a bridge year. Math adds multiplication, division and fractions, and reading moves from learning to read to reading to learn. In social studies, children explore the geography and symbols of their own province. A Provincial Reading and Mathematics Assessment is held in Grade 3.",
      lookFor: "Look for comments about reading comprehension, paragraph writing, early multiplication and fractions, and using evidence in science and social studies.",
    },
    "4": {
      overview: "Grade 4 raises the pace on reading, writing and number work, with fractions, decimals and larger numbers. Core French begins this year. Social studies looks at the peoples who have made their homes in Newfoundland and Labrador and at Canada's regions.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and early French communication.",
    },
    "5": {
      overview: "In Grade 5, students deepen number sense and take on longer reading and writing tasks. Social studies explores early visitors, the fishery and outport life, and how Canada is governed.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence, and independent work.",
    },
    "6": {
      overview: "Grade 6 pushes towards more abstract thinking: ratio, percent, decimals and fractions, and patterns and equations. Social studies looks at government, rights and global issues. A Provincial Reading and Mathematics Assessment is held in Grade 6. Some schools offer Intensive Core French this year.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "Grade 7 starts the junior high years, and courses are marked with percentages. Math covers integers, fractions, decimals, percents and equations. Social studies looks at resources and how they are used. Late French Immersion begins this year for students who choose it.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "Grade 8 is the last year before the high school block. Students work with ratios and rates, linear relations, the Pythagorean theorem, surface area and volume. Social studies looks at how Newfoundland became part of Canada and at how historians weigh evidence.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence.",
    },
    "9": {
      overview: "Grade 9 is the last junior high year. Students work with powers, rational numbers, polynomials and linear relations, and in science they bring together ideas about cells, atoms and electricity. Social studies looks at land claims and self-government agreements, migration and resources.",
      lookFor: "Look for comments on planning ahead for course choices, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
