import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guides for Prince Edward Island's English program. Sources: the Department of Education and Lifelong Learning
// (princeedwardisland.ca), its elementary and intermediate programs of studies, its Specific Curriculum Outcomes Frameworks and
// its notice on intermediate curriculum renewal, which names the CAMET competencies. Programs, entry points and the provincial
// assessment schedule change, so the copy points parents to their school and to the department. The wording needs a Prince
// Edward Island teacher's review.

export const PRINCE_EDWARD_ISLAND_GUIDES: FrameworkGuides = {
  french: {
    metaTail: "Core French begins no later than Grade 4. French Immersion starts in Kindergarten, Grade 4 or Grade 7.",
    browse: ["4"],
    title: "Core French and French Immersion in Prince Edward Island: a guide for parents",
    intro: `Families on Prince Edward Island often ask how the French programs differ, when each starts, and how to help at home without speaking French. In English-language schools, children can learn French through Core French or through one of three French Immersion programs. ${APP_NAME} practises Core French from Grade 4 to Grade 9. French Immersion is not built yet, because its curriculum guides are not public.`,
    compare: [
      { title: "What it is", core: "French as a school subject, taught for part of the week alongside classes in English. The program is built around modules, each ending in a final task, with a focus on spoken interaction.", immersion: "A program in which much of the school day is taught in French. Language arts, mathematics, science and social studies are taught in French." },
      { title: "When it starts", core: "Core French begins no later than Grade 4, and Grades 1 to 3 are handled locally on a pilot basis. It continues through Grade 9.", immersion: "Early (continuing) French Immersion begins in Kindergarten. Middle Immersion begins in Grade 4. Late Immersion begins in Grade 7." },
      { title: "Who it suits", core: "Every child can learn some French. No earlier French is needed.", immersion: "Families who want their child to become fluent in French and are happy to have much of the school day in French." },
      { title: "Name in the curriculum", core: "Core French (for example 4FREA for Grade 4)", immersion: "French Language Arts (French Immersion)" },
      { title: `In ${APP_NAME}`, core: "Grades 4 to 9. Prompts are in English, with French words and sentences to read, choose and build.", immersion: "Not available for Prince Edward Island yet." },
    ],
    sections: [
      { title: "What Core French children learn", body: "The Core French curriculum has strands for communication, culture, general language education and language. In Grade 4, children are beginning learners of French and practise listening, speaking, reading and writing, with a particular emphasis on spoken interaction. They share personal information, describe people and places, ask simple questions and learn about francophone communities." },
      { title: "What French Immersion children learn", body: "By the end of Grade 9, Late Immersion and Middle Immersion students are expected to perform at the same level of French as their peers in Early French Immersion. From Grade 10 to Grade 12, all immersion students are in one French Immersion program." },
      { title: "Time in French", body: "The department recommends about 10% of elementary time for Core French, with a 60-minute class every second day in Grade 4. In Grades 7 to 9, the time for Core French is 11 to 13% of the timetable." },
      { title: "Helping if you don't speak French", body: "You don't need French to help. Ask your child to teach you a word each day, listen while they read aloud, and celebrate effort over accuracy. Mistakes are a normal part of learning a language." },
      { title: `How ${APP_NAME} fits in`, body: `${APP_NAME} shows practice, not a report card mark, so ask your child's teacher how French is reported. French is off by default. A parent can switch on Core French for each child in Settings, under Subjects. French is not counted toward the Grade Champion trophy, and French lessons are read aloud in a French voice.` },
    ],
    atHome: [
      "Pick one new French word each day and use it at dinner or on the way to school.",
      "Label a few household objects with sticky notes in French.",
      "Listen to French songs or watch a short French video together and talk about what you noticed.",
      "Ask your child to read a page aloud in French, then retell it to you in English.",
      "Play a French game: count stairs, name colours, or spell a word out loud.",
    ],
    faqs: [
      { q: "When does French start in Prince Edward Island?", a: "Core French begins no later than Grade 4. Early French Immersion starts in Kindergarten, Middle Immersion in Grade 4 and Late Immersion in Grade 7. Your school can tell you what is offered near you." },
      { q: "Can my child start French Immersion later?", a: "Yes. Middle Immersion starts in Grade 4 and Late Immersion in Grade 7. Entry rules and spaces differ by school, so ask your school or the Public Schools Branch." },
      { q: "Will French Immersion hurt my child's English?", a: "English language arts is still taught alongside immersion, and research has generally found that immersion students do well in English. If you are worried, talk with your child's teacher." },
      { q: `Do French marks count toward the Grade Champion trophy in ${APP_NAME}?`, a: "No. French is a separate, optional set of subjects. Children earn their own French trophies instead." },
      { q: `Does ${APP_NAME} replace French class?`, a: "No. It gives short, kind practice that matches the Core French topics. It doesn't replace a teacher, and its levels are not a report card mark." },
    ],
  },
  competencies: {
    slug: "camet-competencies",
    label: "CAMET competencies",
    hubBlurb: "The six competencies that Prince Edward Island's intermediate program works on, in plain words.",
    description:
      "What the CAMET competencies mean (communication, critical thinking, collaboration, citizenship, technological fluency, and personal and career development), and simple ways to build them at home.",
    gradeLine: "The CAMET competencies grow through exploratory learning and every subject in the intermediate years.",
    closing: "These competencies grow through everyday routines, projects, play and helping others.",
    title: "The CAMET competencies, explained for parents",
    intro:
      "Prince Edward Island's intermediate program (Grades 7 to 9) focuses its exploratory modules on developing the competencies named by the Council of Atlantic Ministers of Education and Training (CAMET): communication, critical thinking, collaboration, citizenship, technological fluency, and personal and career development. They grow in every subject, and they start long before Grade 7.",
    items: [
      { id: "communication", name: "Communication", blurb: "Sharing and receiving ideas clearly, in speaking, writing, reading and other ways.", parts: [], atHome: ["Ask your child to explain a game or a story to you without showing it.", "Read together every day and ask what they think will happen next.", "Write a postcard or a note to a relative."] },
      { id: "critical-thinking", name: "Critical thinking", blurb: "Asking questions, weighing evidence and making reasoned choices.", parts: [], atHome: ["Ask “How do you know?” about something in the news or an ad.", "Compare two reviews or two sources and talk about which you trust.", "Try a puzzle and talk about the strategies you used."] },
      { id: "collaboration", name: "Collaboration", blurb: "Working with others, sharing roles and building ideas together.", parts: [], atHome: ["Cook a meal together, with each person taking a job.", "Ask your child to plan a family game night with a clear job for everyone.", "Talk about a time a team worked well and why."] },
      { id: "citizenship", name: "Citizenship", blurb: "Taking part in communities, caring for others and the environment, and respecting different views.", parts: [], atHome: ["Help with a family or community job, such as a cleanup.", "Talk about a news story and ask how different people might see it.", "Learn about a custom or tradition from a family friend or neighbour."] },
      { id: "technological-fluency", name: "Technological fluency", blurb: "Using technology thoughtfully and safely to learn, create and solve problems.", parts: [], atHome: ["Take something simple apart, like an old flashlight, and talk about how it works.", "Search for an answer together and check two sources.", "Set up a screen routine with time limits you both agree on."] },
      { id: "personal-career-development", name: "Personal and career development", blurb: "Knowing yourself as a learner, setting goals and exploring interests and careers.", parts: [], atHome: ["Make a short routine for homework time and let your child choose the order.", "Ask your child what they would like to try and what it would take.", "Talk about the jobs people in your family and community do."] },
    ],
    faqs: [
      { q: "Are the competencies part of the subject marks?", a: "They grow through subjects and exploratory modules rather than being a separate subject. Ask your child's teacher how they show up in reporting." },
      { q: "How do they connect to what my child practises?", a: "Every subject builds them, for example critical thinking in math problems, communication in language arts and citizenship in social studies." },
      { q: `Does ${APP_NAME} measure the competencies?`, a: `No. ${APP_NAME} practises subject outcomes and shows how practice is going. The competencies grow through routines, talk and community, so we suggest home activities rather than scores.` },
    ],
  },
  assessment: {
    slug: "provincial-assessments",
    short: "Provincial assessments",
    source: "Prince Edward Island Department of Education and Lifelong Learning (princeedwardisland.ca)",
    hubBlurb: "Prince Edward Island's provincial literacy and mathematics assessments, and how they differ from report cards.",
    name: "Prince Edward Island provincial literacy and mathematics assessments",
    intro:
      "The department's provincial assessments in literacy and mathematics (the Primary and Elementary Literacy Assessments and the Primary and Elementary Mathematics Assessments) give schools and the province information that helps guide teaching. The schedule and format can change, so check the department's website or ask your school for this year's details.",
    grades: ["3", "6"],
    facts: [
      { title: "Who takes it", body: "The department has run the primary assessments at the end of Grade 3 and the elementary assessments at the end of Grade 6. Ask your school which students take part this year." },
      { title: "What it covers", body: "Literacy and mathematics. Check the department's Provincial Assessments page for the current list." },
      { title: "When", body: "The department publishes the dates each year. Your school will tell you when your child's grade takes part." },
      { title: "Why", body: "The aim is to understand how students are doing across the province, to guide teaching and to help schools plan support. Results also help the department decide when a course needs renewing." },
      { title: "Report card link", body: "The assessments are separate from report cards. Your school will tell you how results are shared." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, then ask your child to retell what happened and explain why.",
      "Practise math with real problems, such as shopping, cooking and travel times, as well as number facts.",
      "Tell your child it is a check of what they know, not a test they can fail.",
    ],
    faqs: [
      { q: "Which grades write the provincial assessments?", a: "The department has run literacy and mathematics assessments at the end of Grade 3 and Grade 6. Dates and details can change, so check princeedwardisland.ca or ask your school for this year." },
      { q: "Are the provincial assessments part of my child's report card?", a: "They are separate from report cards. Ask your child's teacher how results are shared." },
      { q: "Should my child study for them?", a: "Cramming is not needed. The assessments check skills built over years, so short, regular practice in reading and math is more helpful than a last-minute push." },
      { q: "Where can I find the current schedule?", a: "The Department of Education and Lifelong Learning publishes information about provincial assessments at princeedwardisland.ca. Your school will also tell you when your child's grade takes part." },
      { q: `Can ${APP_NAME} help my child get ready?`, a: `${APP_NAME} practises math and language skills taught in these grades with kind feedback and no timers unless you want them. It isn't a copy of the provincial assessments and doesn't predict results.` },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten builds early learning through play. Children explore language and literacy, counting and shapes, and the world around them: who they are as a unique person, their family and their community. In science they begin to explore the world using their senses.",
      lookFor: "Look for comments on listening, early letters and sounds, counting, patterns, sharing ideas, and getting along with classmates.",
    },
    "1": {
      overview: "Grade 1 is where reading, writing and number sense start to grow quickly. In science, children explore the needs and characteristics of living things, materials and their senses, and daily and seasonal changes. In social studies they explore groups, environments, place and time, and needs and wants.",
      lookFor: "Look for comments on reading simple texts, writing a few sentences, counting and adding, and taking part in class.",
    },
    "2": {
      overview: "In Grade 2, reading becomes smoother and writing gets longer. Math moves to numbers to 100 and beyond, with addition, subtraction, patterns and graphs. Science looks at animal growth and changes, air and water in the environment, liquids and solids, and position and motion. Social studies looks at people, technology, economics and environments.",
      lookFor: "Look for fluent reading, longer writing, comfort with adding and subtracting, and the ability to explain thinking.",
    },
    "3": {
      overview: "Grade 3 is a bridge year. Math adds multiplication, division and fractions, and reading moves from learning to read to reading to learn. Science covers plant growth and changes, soils, invisible forces, and materials and structures. Social studies looks at place, peoples and citizenship. The primary literacy and mathematics assessments have been held at the end of Grade 3.",
      lookFor: "Look for comments about reading comprehension, paragraph writing, early multiplication and fractions, and using evidence in science and social studies.",
    },
    "4": {
      overview: "Grade 4 raises the pace on reading, writing and number work, with larger numbers, fractions and decimals. Core French begins this year. Science covers habitats, light, sound, and rocks, minerals and erosion. Social studies explores exploration and the landscapes of Canada.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and early French communication.",
    },
    "5": {
      overview: "In Grade 5, students deepen number sense and take on longer reading and writing tasks. Science looks at the human body, properties and changes in materials, forces and simple machines, and weather. Social studies looks at how we learn about the past and at societies of long ago, including how the environment and social structure shaped them.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence, and independent work.",
    },
    "6": {
      overview: "Grade 6 pushes towards more abstract thinking with fractions, decimals, ratio, percent and patterns. Science explores the diversity of life, electricity, flight and space. Social studies covers Prince Edward Island history and world cultures. The elementary literacy and mathematics assessments have been held at the end of Grade 6.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "Grade 7 begins the intermediate years. Math follows the Western and Northern Canadian Protocol strands: number, patterns and relations, shape and space, and statistics and probability. Science covers interactions within ecosystems, Earth's crust, heat, and mixtures and solutions. Social studies focuses on empowerment and disempowerment in Canada between 1830 and 1920.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "Grade 8 continues the intermediate years. Science covers water systems, fluids, optics, and cells, tissues, organs and systems. Social studies looks at Canadian identity and its cultural, political and societal roots, from the 1920s to present-day Canada, and ends in a project that expresses the student's own understanding of Canadian identity.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence.",
    },
    "9": {
      overview: "Grade 9 is the last intermediate year. Math includes powers, rational numbers, polynomials and linear relations. Science brings together biodiversity and the sustainability of ecosystems, patterns in atoms, elements and compounds, and electricity. Social studies, called Global Connections, looks at geography, population, globalization, sustainability and social action.",
      lookFor: "Look for comments on planning ahead for course choices, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
