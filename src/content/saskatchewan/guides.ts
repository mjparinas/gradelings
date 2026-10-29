import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guides for Saskatchewan. Sources: the Saskatchewan Curriculum (curriculum.gov.sk.ca), including its
// broad areas of learning and cross-curricular competencies, and the Ministry of Education's announcement of the
// provincial student assessment program (saskatchewan.ca, November 2024). Saskatchewan has no single provincial
// report card, so the report-card wording is general. The French guide draws on the Core French and Français en
// immersion curricula and on "Studying French in Saskatchewan" (saskatchewan.ca). The wording needs a Saskatchewan
// teacher's review.

export const SASKATCHEWAN_GUIDES: FrameworkGuides = {
  french: {
    metaTail: "Core French has Levels 1 to 9, matched to Grades 1 to 9 here; French Immersion runs from Kindergarten.",
    browse: ["4", "k"],
    title: "Core French and French Immersion in Saskatchewan: a guide for parents",
    intro: `Saskatchewan families often wonder how Core French and French Immersion differ, when each starts and how to help at home without speaking French. The Ministry of Education offers both as second-language programs from Kindergarten to Grade 12, and ${APP_NAME} practises both as optional subjects you can switch on for each child.`,
    compare: [
      { title: "What it is", core: "French taught as a subject for part of the week, alongside classes in English.", immersion: "A program where French is the language of instruction for much of the school day, in most subjects other than English language arts." },
      { title: "When it starts", core: "The curriculum has Levels 1 to 9, and Level 1 is the beginning level no matter the grade. Your school division decides when students start, so many begin in the middle grades.", immersion: "Kindergarten to Grade 12, in the school divisions that offer it. Kindergarten to Grade 2 follow an interdisciplinary French program, and Grades 3 to 9 follow Français en immersion." },
      { title: "Who it suits", core: "Every child can learn some French. No earlier French is needed.", immersion: "Families who want their child to become functionally fluent in French. Programs and entry points differ by division, so check with yours." },
      { title: "Name in the curriculum", core: "Core French (Levels 1 to 9)", immersion: "Français en immersion" },
      { title: `In ${APP_NAME}`, core: "Grades 1 to 9, where the level matches the grade. Prompts are in English, with French words and sentences to read, choose and build.", immersion: "Kindergarten to Grade 9. Prompts and stories are in French, with English hints for parents." },
    ],
    sections: [
      { title: "What Core French children learn", body: "Each level has four goals: communication skills (understanding, speaking, reading and writing French), general language strategies, language knowledge such as numbers, verbs and question words, and culture. Children start with key words, greetings and classroom instructions, then move to sentences, short paragraphs and longer texts. The Culture goal looks at Francophone, First Nations and Métis cultures, starting with Saskatchewan." },
      { title: "What French Immersion children learn", body: "In immersion, children learn to listen, speak, read and write in French, and learn other subjects in French too. In Grades 3 to 9 the strands are valuing the French language and culture, listening, reading, speaking and writing. How much of the day is in French, and when English language arts is added, depends on the school division." },
      { title: "Francophone schools are different", body: "The Conseil des écoles fransaskoises is Saskatchewan's French first-language school division. It teaches in French for families whose children are entitled to Francophone education. That is a different program from Core French and French Immersion, and it is not built in this app." },
      { title: "How report cards describe French", body: `Saskatchewan has no single provincial report-card scale, so your school division decides the wording. French is reported the way other subjects are in your division. ${APP_NAME} shows practice, not a report-card mark, so ask your child's teacher what the level means for your child.` },
      { title: "Helping if you don't speak French", body: "You don't need French to help. Ask your child to teach you a word each day, listen while they read aloud, and celebrate effort over accuracy. Mistakes are a normal part of learning a language." },
      { title: `How ${APP_NAME} fits in`, body: "French is off by default. A parent can switch on Immersion, Core French or both for each child in Settings, under Subjects. French is not counted toward the Grade Champion trophy, and French lessons are read aloud with a French voice from your device. You can pick that voice in Settings. Core French in Saskatchewan is organized by level, so a child who started French later than Grade 1 may find their grade's lessons a step ahead. Ask your child's teacher which level fits." },
    ],
    atHome: [
      "Pick one new French word each day and use it at dinner or on the way to school.",
      "Label a few household objects with sticky notes in French.",
      "Listen to French songs or watch a short French video together and talk about what you noticed.",
      "Ask your child to read a page aloud in French, then retell it to you in English.",
      "Learn the French names of some Saskatchewan places, such as Gravelbourg or Île-à-la-Crosse, and look them up on a map.",
    ],
    faqs: [
      { q: "When does Core French start in Saskatchewan?", a: "The Core French curriculum has Levels 1 to 9, and Level 1 is the beginning level regardless of grade. Each school division decides which grade starts, so ask your school how much time French gets each week." },
      { q: "Can my child start French Immersion later?", a: "Some divisions offer later entry, and some have limited spaces. Entry rules differ, so ask your school division." },
      { q: "Will French Immersion hurt my child's English?", a: "English language arts is still taught in immersion, and the Ministry describes immersion students as becoming proficient in English and functionally fluent in French. If you are worried, talk with your child's teacher." },
      { q: `Do French marks count toward the Grade Champion trophy in ${APP_NAME}?`, a: "No. French is a separate, optional set of subjects. Children earn their own French trophies instead." },
      { q: `Does ${APP_NAME} replace French class?`, a: "No. It gives short, kind practice that matches the outcomes in the Saskatchewan curriculum. It doesn't replace a teacher, and its levels are not a report-card mark." },
    ],
  },
  competencies: {
    slug: "cross-curricular-competencies",
    label: "Cross-curricular competencies",
    hubBlurb: "The four competencies and three broad areas of learning in Saskatchewan classrooms.",
    description:
      "What Saskatchewan's four cross-curricular competencies (thinking, identity and interdependence, literacies, and social responsibility) and three broad areas of learning mean, and simple ways to build them at home.",
    gradeLine: "The cross-curricular competencies are woven into every subject and grade.",
    closing: "These competencies grow through everyday talk, projects, play and helping others.",
    title: "Saskatchewan's cross-curricular competencies and broad areas of learning, explained for parents",
    intro:
      "The Saskatchewan Curriculum aims to help students become lifelong learners, build a sense of self and community, and become engaged citizens. These are the three broad areas of learning. Four cross-curricular competencies, which teachers weave into every subject, help students get there: developing thinking, developing identity and interdependence, developing literacies, and developing social responsibility. Teachers often comment on them separately from subject outcomes.",
    items: [
      {
        id: "thinking",
        name: "Developing Thinking",
        blurb: "Understanding, questioning, problem solving and thinking creatively and critically.",
        parts: [],
        atHome: [
          "Ask “What do you think will happen, and why?” before a game, a recipe or an experiment.",
          "When your child is stuck, ask what they have tried and what else they could try.",
          "Look for more than one way to solve the same problem and compare them.",
        ],
      },
      {
        id: "identity",
        name: "Developing Identity and Interdependence",
        blurb: "Understanding who you are, taking care of yourself and working well with others and the land.",
        parts: [],
        atHome: [
          "Talk about family stories, traditions and languages.",
          "Let your child make age-appropriate choices and explain them.",
          "Spend time outdoors and talk about how people, animals and the land depend on each other.",
        ],
      },
      {
        id: "literacies",
        name: "Developing Literacies",
        blurb: "Making sense of the world through language, numbers, images, technology and the arts.",
        parts: [],
        atHome: [
          "Read together every day, and also read maps, recipes, signs and charts.",
          "Ask your child to explain a graph, a price or a game score in their own words.",
          "Draw, build or perform something to show what they learned.",
        ],
      },
      {
        id: "social-responsibility",
        name: "Developing Social Responsibility",
        blurb: "Taking part in the community, respecting differences and caring for the environment.",
        parts: [],
        atHome: [
          "Help with a family or community job, such as a clean-up or a food drive.",
          "Talk about how a rule or a choice affects other people.",
          "Learn about the Treaties and the First Nations and Métis communities near you.",
        ],
      },
    ],
    faqs: [
      {
        q: "What are the broad areas of learning?",
        a: "There are three: lifelong learners, sense of self and community, and engaged citizens. They describe the big goals of a Saskatchewan education.",
      },
      {
        q: "Are the competencies graded?",
        a: "Teachers comment on them alongside the subject outcomes. How they are shown on a report card is up to each school division, so ask your child's teacher.",
      },
      {
        q: "Do the competencies replace subjects?",
        a: "No. They are woven into math, English language arts, science, social studies and the other subjects instead of being taught separately.",
      },
      {
        q: "Does Gradelings measure the competencies?",
        a: "No. Gradelings practises subject outcomes and shows how practice is going. The competencies grow through talk, projects and community, so we suggest home activities rather than scores.",
      },
      {
        q: "How can I help if my child is working on one of them?",
        a: "Ask the teacher for one specific example and one thing to try at home, then pick a single competency to focus on. Small, steady habits work better than trying to change everything at once.",
      },
    ],
  },
  assessment: {
    slug: "provincial-assessments",
    short: "Provincial assessments",
    source: "the Saskatchewan Ministry of Education (saskatchewan.ca)",
    hubBlurb: "Saskatchewan's new provincial assessments in English language arts and mathematics.",
    name: "Saskatchewan provincial student assessments",
    intro:
      "Saskatchewan is bringing in a provincial student assessment program based on the Saskatchewan Curriculum. The plan is for students in Grades 5 and 9 to write a mathematics assessment and students in Grades 4, 7 and 10 to write an English language arts assessment. The program is being introduced in stages, starting with field testing, so check the Ministry's website for the current schedule. The assessments are separate from report cards, and the Ministry has said teachers may choose to use them as part of a student's grades.",
    grades: ["4", "5", "7", "9"],
    facts: [
      { title: "Who takes it", body: "The announced plan is Grade 5 and Grade 9 mathematics, and Grade 4, Grade 7 and Grade 10 English language arts." },
      { title: "What it covers", body: "The Ministry says the assessments are developed with Saskatchewan teachers and based on the Saskatchewan Curriculum students are already learning." },
      { title: "When", body: "The program is being introduced in stages, starting with the 2025–26 school year. Dates and grades can change, so ask your school or check saskatchewan.ca." },
      { title: "Why", body: "The Ministry describes the aim as a fair and objective measure of how students are doing, to guide teaching and help schools and divisions improve." },
      { title: "Report card link", body: "The assessments are separate from report cards. Your school will tell you how results are shared and whether teachers use them." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, then ask your child to retell what happened and explain why.",
      "Encourage short, regular writing: a journal line, a note or a postcard.",
      "Practise math with real problems, such as shopping, cooking and travel times, as well as number facts.",
      "Tell your child it is a check of what they know, not a test they can fail.",
    ],
    faqs: [
      {
        q: "Which grades write the provincial assessments?",
        a: "The announced plan is Grade 5 and Grade 9 mathematics, and Grade 4, Grade 7 and Grade 10 English language arts. The rollout is in stages, so check with your school for this year.",
      },
      {
        q: "Are the provincial assessments part of my child's report card?",
        a: "They are separate from report cards. The Ministry has said teachers may choose to use them as part of a student's grades, so ask your child's teacher how they will be used.",
      },
      {
        q: "Should my child study for them?",
        a: "Cramming is not needed. The assessments check skills built over years, so short, regular practice in reading, writing and math is more helpful than a last-minute push.",
      },
      {
        q: "Where can I find the current schedule?",
        a: "The Ministry of Education publishes the schedule and family information at saskatchewan.ca. Your school will also tell you when your child's grade takes part.",
      },
      {
        q: "Can Gradelings help my child get ready?",
        a: "Gradelings practises the math and language outcomes taught in these grades with kind feedback and no timers unless you want them. It isn't a copy of the provincial assessments and doesn't predict a result.",
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "Saskatchewan's Prekindergarten is a free, play-based school program for some three- and four-year-olds, offered in many communities with spaces set aside for children who will benefit most. It follows Essential Learning Experiences, a supplement to Play and Exploration: social emotional, physical, spiritual and intellectual development, with language and early literacy.",
      lookFor: "Prekindergarten has no marks or report card; teachers share what your child is exploring. Look for joining in, taking turns, naming feelings, rhyming, letters from your child's name and counting small groups.",
    },
    k: {
      overview:
        "Kindergarten in Saskatchewan builds early learning in English language arts, mathematics, science, social studies, health, arts and physical education. Children count to 10, spot patterns, compare objects, and explore living things, forces, materials and their natural surroundings.",
      lookFor:
        "Look for comments on listening, early letters and sounds, counting and comparing, sharing ideas, and getting along with classmates.",
    },
    "1": {
      overview:
        "Grade 1 is where reading, writing and number sense start to grow quickly. Children work with numbers to 100 (and add and subtract to 20), repeating patterns and shapes, and study families, the senses, materials and daily and seasonal changes.",
      lookFor:
        "Look for comments on reading simple texts, writing a few sentences, counting and adding, and taking part in class.",
    },
    "2": {
      overview:
        "In Grade 2, reading becomes smoother and writing gets longer. Math moves to numbers to 100, addition and subtraction, patterns, shapes and graphs. Science covers animal growth, liquids and solids, motion, and air and water, and social studies looks at the local community.",
      lookFor:
        "Look for fluent reading, longer writing, comfort with adding and subtracting to 100, and the ability to explain thinking.",
    },
    "3": {
      overview:
        "Grade 3 is a bridge year. Students read to learn as well as learning to read, work with numbers to 1000, multiplication to 5 × 5, fractions and measurement, and study plants, structures, magnets and static electricity, and soils. Social studies looks at communities around the world.",
      lookFor:
        "Look for comments about reading comprehension, paragraph writing, early multiplication and fractions, and working with others.",
    },
    "4": {
      overview:
        "Grade 4 raises the pace on reading, writing and number work, with numbers to 10 000, multiplication and division, fractions and decimals. Social studies focuses on Saskatchewan: its people, land, treaties, government and resources. Science covers habitats, light, sound, and rocks and minerals.",
      lookFor:
        "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and understanding how Saskatchewan communities work. Grade 4 students may write a provincial English language arts assessment.",
    },
    "5": {
      overview:
        "In Grade 5, students deepen number sense with numbers to a million, decimals and fractions, and take on longer reading and writing tasks. Science covers human body systems, properties of materials, forces and simple machines, and weather. Social studies looks at Canada, its heritage, governance and treaty relationship.",
      lookFor:
        "Look for comments on problem solving, supporting ideas with evidence, and independent work. Grade 5 students may write a provincial mathematics assessment.",
    },
    "6": {
      overview:
        "Grade 6 pushes towards more abstract thinking: place value beyond a million, factors, percent, integers, ratio, algebra with patterns and equations, and angles, area and volume. Science covers diversity of living things, electricity, flight and the solar system.",
      lookFor:
        "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview:
        "Grade 7 starts the intermediate years. Students work with decimals, fractions, percents, integers, linear equations and circles, and study ecosystems, mixtures and solutions, heat, and Earth's crust. Social studies looks at Canada, the circumpolar world and Pacific Rim countries.",
      lookFor:
        "Look for comments on independence, study habits and confidence with the harder math and reading ahead. Grade 7 students may write a provincial English language arts assessment.",
    },
    "8": {
      overview:
        "Grade 8 is the last year before high school. Students work with squares and roots, rates and ratios, linear relations, the Pythagorean theorem, surface area and volume. They study cells and organ systems, light, fluids, and water systems, and explore Canadian identity and citizenship.",
      lookFor:
        "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence.",
    },
    "9": {
      overview:
        "Grade 9 builds towards the Level 10, 20 and 30 courses. Students work with powers, rational numbers, polynomials, linear relations and inequalities, and study reproduction, atoms and elements, electricity, and the universe. Social studies examines societies of the past and their influence on Canada.",
      lookFor:
        "Look for comments on planning ahead for course choices, explaining reasoning in math and weighing perspectives in social studies and English. Grade 9 students may write a provincial mathematics assessment.",
    },
  },
};
