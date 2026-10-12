import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// Parent guides for Nunavut. Sources: the Nunavut Department of Education (gov.nu.ca/education), its Approved Curriculum and
// Teaching Resources and its Inuit Qaujimajatuqangit materials. Programs, the phase-in of the new Nunavut curriculum and the
// way schools report change, so the copy points parents to their school and to gov.nu.ca. The wording needs review by Inuit
// partners and a Nunavut teacher.

export const NUNAVUT_GUIDES: FrameworkGuides = {
  french: {
    metaTail: "French as an Additional Language is taught from Grade 4 to Grade 9.",
    browse: ["4"],
    title: "French as an Additional Language in Nunavut: a guide for parents",
    intro: `Nunavut's approved curriculum includes French as an Additional Language for Grades 4 to 9, based on Manitoba's French: Communication and Culture. ${APP_NAME} practises it as an optional subject you can switch on for each child. French Immersion is not built for Nunavut.`,
    compare: [
      { title: "What it is", core: "French as a school subject, taught alongside classes in Inuktut and English.", immersion: "Not built in this app. Francophone and immersion programs differ by school." },
      { title: "When it starts", core: "Grade 4, and it continues to Grade 9.", immersion: "Ask your school about any French programs it offers." },
      { title: "Who it suits", core: "Every child can learn some French. No earlier French is needed.", immersion: "Families who want much of the day in French should ask their school what is offered." },
      { title: "Name in the curriculum", core: "French as an Additional Language for Nunavut, Grades 4 to 9", immersion: "Not available in this app" },
      { title: `In ${APP_NAME}`, core: "Grades 4 to 9. Prompts are in English, with French words and sentences to read, choose and build.", immersion: "Not built" },
    ],
    sections: [
      { title: "What children learn", body: "Children listen, speak, read and write simple French on familiar topics, and learn about the French-speaking world. Texts grow longer and more connected in the upper grades." },
      { title: "Nunavut's three official languages", body: "Nunavut has Inuit languages (Inuktut), English and French as official languages. Many children are already learning in more than one language, which is a strength when learning French." },
      { title: "How report cards describe French", body: `${APP_NAME} shows practice, not a report card mark, so ask your child's teacher what the report card says about French for your child.` },
      { title: "Helping if you don't speak French", body: "You don't need French to help. Ask your child to teach you a word each day, listen while they read aloud, and celebrate effort over accuracy." },
      { title: `How ${APP_NAME} fits in`, body: "French is off by default. A parent can switch it on for each child in Settings, under Subjects. French is not counted toward the Grade Champion trophy, and French lessons are read aloud with a French voice from your device." },
    ],
    atHome: [
      "Pick one new French word each day and use it at dinner.",
      "Label a few household objects with sticky notes in French.",
      "Listen to a French song or watch a short French video together.",
      "Ask your child to read a page aloud in French, then retell it in English or Inuktut.",
    ],
    faqs: [
      { q: "When does French start in Nunavut?", a: "The approved curriculum has French as an Additional Language for Grades 4 to 9. Your school can tell you how much time it gets each week." },
      { q: "Is French Immersion available in the app?", a: `Not yet. ${APP_NAME} practises French as an Additional Language only. Ask your school about other French programs.` },
      { q: `Do French marks count toward the Grade Champion trophy in ${APP_NAME}?`, a: "No. French is a separate, optional subject. Children earn their own French trophies instead." },
      { q: `Does ${APP_NAME} replace French class?`, a: "No. It gives short, kind practice and its levels are not a report card mark." },
    ],
  },
  competencies: {
    slug: "iq-principles",
    label: "Inuit Qaujimajatuqangit",
    hubBlurb: "The Inuit values that guide teaching and learning in Nunavut, in plain words.",
    description:
      "What the Inuit Qaujimajatuqangit principles mean (including Inuuqatigiitsiarniq, Tunnganarniq, Pijitsirniq, Aajiiqatigiinniq, Pilimmaksarniq, Piliriqatigiinniq, Qanuqtuurniq and Avatittinnik Kamatsiarniq) and simple ways to live them at home.",
    gradeLine: "Inuit Qaujimajatuqangit guides learning from Kindergarten to Grade 12.",
    closing: "These principles grow through family, Elders, the land and everyday routines.",
    title: "Inuit Qaujimajatuqangit in Nunavut, explained for parents",
    intro:
      "Nunavut's Department of Education builds its programs on Inuit Qaujimajatuqangit (IQ), which means Inuit knowledge and ways of knowing. The Government of Nunavut describes eight IQ guiding principles. They are not marked as subjects, and they show up in how classes work and how people treat each other. Spellings and words vary from community to community.",
    items: [
      { id: "inuuqatigiitsiarniq", name: "Inuuqatigiitsiarniq", blurb: "Respecting others, relationships and caring for people.", parts: [], atHome: ["Say thank you and listen when someone speaks.", "Ask an Elder or relative about their day."] },
      { id: "tunnganarniq", name: "Tunnganarniq", blurb: "Fostering good spirit by being open, welcoming and inclusive.", parts: [], atHome: ["Welcome a new neighbour or classmate.", "Invite someone who is alone to join a game."] },
      { id: "pijitsirniq", name: "Pijitsirniq", blurb: "Serving and providing for family and community.", parts: [], atHome: ["Share food with another household.", "Help with a family or community job."] },
      { id: "aajiiqatigiinniq", name: "Aajiiqatigiinniq", blurb: "Making decisions through discussion and consensus.", parts: [], atHome: ["Plan a family outing by talking until everyone agrees.", "Practise listening before deciding."] },
      { id: "pilimmaksarniq", name: "Pilimmaksarniq (also Pijariuqsarniq)", blurb: "Developing skills through observing, mentoring, practising and effort.", parts: [], atHome: ["Learn a skill from a relative, step by step.", "Praise effort when something takes many tries."] },
      { id: "piliriqatigiinniq", name: "Piliriqatigiinniq (also Ikajuqtigiinniq)", blurb: "Working together for a common cause.", parts: [], atHome: ["Cook or clean up as a team.", "Take on a project with friends."] },
      { id: "qanuqtuurniq", name: "Qanuqtuurniq", blurb: "Being innovative and resourceful.", parts: [], atHome: ["Make a toy or tool from things you already have.", "Ask “What else could we try?”"] },
      { id: "avatittinnik-kamatsiarniq", name: "Avatittinnik Kamatsiarniq", blurb: "Respect and care for the land, animals and the environment.", parts: [], atHome: ["Pick up garbage on a walk.", "Talk with Elders about caring for the land."] },
    ],
    faqs: [
      { q: "Is IQ part of the subject levels?", a: "IQ guides how teaching and learning happen across subjects, rather than being graded as a separate subject. Ask your child's teacher how it shows up in your child's school." },
      { q: `Does ${APP_NAME} measure IQ?`, a: `No. ${APP_NAME} practises subject skills. The IQ principles grow through family, Elders, the land and community, so we suggest home activities instead of scores.` },
      { q: "Where can I learn more?", a: "The Nunavut Department of Education publishes its Inuit Qaujimajatuqangit education framework at gov.nu.ca. Local Elders and your school can share what these principles look like in your community." },
    ],
  },
  assessment: {
    slug: "provincial-assessments",
    short: "How learning is checked",
    source: "the Nunavut Department of Education (gov.nu.ca/education)",
    hubBlurb: "How Nunavut schools check learning, and how that differs from practice.",
    name: "How learning is checked in Nunavut",
    intro:
      "The Department of Education requires schools to use the approved curriculum guides, and it has identified the core learning outcomes in each subject for Kindergarten to Grade 9. Teachers can use core curriculum checklists to track which outcomes each student has met. We could not confirm a single territory-wide test schedule, so ask your school how learning is checked and reported in your child's grade.",
    grades: [],
    facts: [
      { title: "Approved curriculum", body: "Schools must use the guides approved by the Department of Education. They include guides adopted from other jurisdictions and resources made in Nunavut." },
      { title: "Core learning outcomes", body: "The Department identified core outcomes in each subject for Kindergarten to Grade 9 to help teachers focus on the most important learning." },
      { title: "Checklists", body: "Core curriculum learning outcomes checklists let teachers record what each student has achieved during the year." },
      { title: "Your school's plan", body: "Your child's teacher and principal can tell you what assessments your child takes part in and how results are shared." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, in Inuktut, English or French, then ask your child to retell what happened.",
      "Encourage short, regular writing: a journal line, a note or a postcard.",
      "Practise math with real problems, such as shopping, cooking and travel times.",
      "Tell your child that checking learning is not a test they can fail.",
    ],
    faqs: [
      { q: "Does Nunavut have a territory-wide test?", a: "We could not confirm a regular territory-wide test schedule. Ask your school what applies to your child's grade, and check gov.nu.ca for updates." },
      { q: "What are core outcomes?", a: "They are the most important learning outcomes the Department identified in each subject. Teachers use them to focus teaching and track progress." },
      { q: `Can ${APP_NAME} help my child get ready?`, a: `${APP_NAME} practises math, language, science and social studies skills with kind feedback and no timers unless you want them. It isn't a copy of any assessment and doesn't predict a result.` },
    ],
  },
  gradeNotes: {
    k: {
      overview: "Kindergarten builds early learning through play, stories and songs, often in Inuktut. Children explore language, early number ideas, their community and the land around them. Since fall 2025, Kindergarten follows the new made-in-Nunavut curriculum.",
      lookFor: "Look for comments on listening, early letters and sounds, counting and comparing, and getting along with classmates.",
    },
    "1": {
      overview: "Grade 1 is where reading, writing and number sense start to grow quickly. Children work with numbers to 20, patterns and shapes, and learn about their community, the seasons and living things. Since fall 2025, Grade 1 follows the new made-in-Nunavut curriculum.",
      lookFor: "Look for comments on reading simple texts, writing a few sentences, counting and adding, and taking part in class.",
    },
    "2": {
      overview: "In Grade 2, reading becomes smoother and writing gets longer. Math moves to numbers to 100, addition and subtraction, patterns and graphs. Science looks at animals and materials, including the animals of the Arctic. Since fall 2026, Grade 2 follows the new made-in-Nunavut curriculum.",
      lookFor: "Look for fluent reading, longer writing, comfort with adding and subtracting, and the ability to explain thinking.",
    },
    "3": {
      overview: "Grade 3 builds strong reading and early multiplication. Students learn more about Nunavut: its regions, communities and symbols, and how people live together. Since fall 2026, Grade 3 follows the new made-in-Nunavut curriculum.",
      lookFor: "Look for comments about reading comprehension, paragraph writing, early multiplication and using what they know about Nunavut.",
    },
    "4": {
      overview: "Grade 4 raises the pace on reading, writing and number work. Social studies explores Inuit Qaujimajatuqangit, the languages of Nunavut and its communities. French as an Additional Language begins.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and using maps.",
    },
    "5": {
      overview: "In Grade 5, students deepen number sense and take on longer reading and writing tasks. Science looks at Earth, the Sun and the seasons. Social studies looks at the land claim that created Nunavut and at land skills.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence, and independent work.",
    },
    "6": {
      overview: "Grade 6 pushes towards more abstract thinking: fractions and decimals, ratio and percent, patterns and equations. Social studies looks at how Nunavut is governed, including its consensus government.",
      lookFor: "Look for comments about organization, explaining reasoning in math and writing with evidence.",
    },
    "7": {
      overview: "Grade 7 starts deeper work with integers, fractions, decimals, percents and equations. Science covers ecosystems, including the tundra. Social studies explores the circumpolar world.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "Grade 8 is the last year before the Grade 9 courses. Students work with rates and ratios, linear relations and the Pythagorean theorem. Social studies looks at how Nunavut was created.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence.",
    },
    "9": {
      overview: "Grade 9 is the start of the senior years. Students work with powers, rational numbers and linear relations, and in social studies study how Nunavut is governed, the land claims institutions and the Arctic together.",
      lookFor: "Look for comments on planning ahead for course choices, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};
