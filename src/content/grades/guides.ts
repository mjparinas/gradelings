import { APP_NAME } from "@/lib/brand";
import type { FrameworkGuides } from "../guides";

// British Columbia's parent guide copy. Yukon and the Northwest Territories reuse it with their own wording (localText).

export const BC_GUIDES: FrameworkGuides = {
  competencies: {
    slug: "core-competencies",
    label: "Core Competencies",
    hubBlurb: "Communication, Thinking, and Personal and Social, in plain words.",
    description:
      "What the three BC Core Competencies mean (Communication, Thinking, and Personal and Social), how they show up on the report card, and simple ways to support them at home.",
    gradeLine: "Core Competencies are part of every grade.",
    closing: "Core Competencies grow through conversation, projects and play.",
    title: "BC Core Competencies on the report card, explained for parents",
    intro:
      "Alongside subjects like math and science, the BC curriculum has three Core Competencies: Communication, Thinking, and Personal and Social. They are the skills students use to learn anything. Students think about their own growth in them, usually with a short self-assessment, and teachers refer to them in report card comments.",
    items: [
      {
        id: "communication",
        name: "Communication",
        blurb: "Sharing ideas and information, and working with others.",
        parts: [
          { name: "Communicating", blurb: "Explaining, listening, asking questions and sharing ideas in speech, writing, art or other ways." },
          { name: "Collaborating", blurb: "Working with others to plan, share jobs and solve problems together." },
        ],
        atHome: [
          "Ask your child to explain how they got an answer, not only what it was.",
          "Give them a real audience: a family update, a grocery list, a short talk at dinner.",
          "Play a board game or build something together, and talk about how you shared the jobs.",
        ],
      },
      {
        id: "thinking",
        name: "Thinking",
        blurb: "Having ideas, asking questions and judging information.",
        parts: [
          { name: "Creative Thinking", blurb: "Coming up with new ideas, trying them out and building on the ideas of others." },
          { name: "Critical and Reflective Thinking", blurb: "Questioning, weighing evidence, and thinking about what worked and what to change." },
        ],
        atHome: [
          "Ask “What else could we try?” when something doesn't work.",
          "Ask how they know something is true, and where they could check.",
          "After a project or game, ask what went well and what they'd do differently.",
        ],
      },
      {
        id: "personal-social",
        name: "Personal and Social",
        blurb: "Knowing yourself, looking after yourself and caring about others.",
        parts: [
          { name: "Positive Personal and Cultural Identity", blurb: "Knowing your strengths, your story and the communities you belong to." },
          { name: "Personal Awareness and Responsibility", blurb: "Setting goals, managing feelings and staying with a challenge." },
          { name: "Social Awareness and Responsibility", blurb: "Caring about others, respecting differences and helping make things better." },
        ],
        atHome: [
          "Let your child set a small goal for the week and check in on it together.",
          "Name the effort you see: “You kept going even when it was hard.”",
          "Talk about family stories and traditions, and ask how others see things differently.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are Core Competencies graded?",
        a: "No. Students reflect on them, often with a short self-assessment and a goal, and teachers may comment on them. They aren't marked on the Emerging to Extending scale the way subject learning is.",
      },
      {
        q: "What are the BC Core Competencies?",
        a: "There are three: Communication, Thinking, and Personal and Social. Each has smaller parts. Communication includes Communicating and Collaborating. Thinking includes Creative Thinking and Critical and Reflective Thinking. Personal and Social includes Positive Personal and Cultural Identity, Personal Awareness and Responsibility, and Social Awareness and Responsibility.",
      },
      {
        q: `Does ${APP_NAME} measure Core Competencies?`,
        a: `No. ${APP_NAME} practises subject skills in math, language arts, science and social studies and shows how they match the report card scale. Core Competencies grow through conversation, projects, teamwork and play, so we suggest home activities rather than scores.`,
      },
      {
        q: "How can I help my child with their self-assessment?",
        a: "Ask open questions: What are you proud of? What was tricky? What is one thing you want to get better at? Then let your child use their own words. Teachers care more about honest reflection than a polished answer.",
      },
    ],
  },
  french: {
    metaTail: "Core French starts in Grade 5; French Immersion usually starts in Kindergarten or Grade 1.",
    browse: ["5", "k"],
    title: "Core French and French Immersion in BC: a guide for parents",
    intro:
      `Many BC families wonder how Core French and French Immersion differ, when each starts, and how to help at home if you don't speak French. Both follow the BC curriculum, and ${APP_NAME} practises both as optional subjects you can switch on for each child.`,
    compare: [
      { title: "What it is", core: "French as one school subject, taught a few times a week alongside classes in English.", immersion: "A program where much of the school day, including subjects such as math and science, is taught in French." },
      { title: "When it starts", core: "Core French starts in Grade 5 in BC.", immersion: "Early French Immersion usually begins in Kindergarten or Grade 1. Some districts also offer late immersion, often in Grade 6." },
      { title: "Who it suits", core: "Every child can learn some French. No earlier French is needed.", immersion: "Families who want their child to become fluent. Programs and entry points differ by district, so check with yours." },
      { title: "Name in the curriculum", core: "BC Core French", immersion: "Français langue seconde – immersion" },
      { title: `In ${APP_NAME}`, core: `Grades 5 to 9. Prompts are in English, with French words and sentences to read, choose and build.`, immersion: `Kindergarten to Grade 9. Prompts and stories are in French, with English hints for parents.` },
    ],
    sections: [
      { title: "What Core French children learn", body: "Core French builds everyday communication: greetings, numbers, family, school, food, weather, hobbies and describing people and places. In the upper grades children start to write short texts, use common verbs and ask and answer questions. The aim is confidence with simple, real conversations." },
      { title: "What French Immersion children learn", body: "In immersion, children learn to listen, speak, read and write in French, and learn other subjects in French too. Younger children start with songs, stories and routines, then move on to sentences, paragraphs and longer texts as the grades go on. English reading and writing are taught as well. How much is in French in each grade depends on the school district." },
      { title: `How report cards describe French`, body: `French is reported on the same four-level scale as other subjects: Emerging, Developing, Proficient and Extending. Teachers look at listening, speaking, reading and writing together. ${APP_NAME} shows practice, not a report card mark, so ask your child's teacher what the level means for your child.` },
      { title: "Helping if you don't speak French", body: "You don't need French to help. Ask your child to teach you a word each day, listen while they read aloud, and celebrate effort over accuracy. Mistakes are a normal part of learning a language." },
      { title: `How ${APP_NAME} fits in`, body: `French is off by default. A parent can switch on Immersion, Core French or both for each child in Settings, under Subjects. French is not counted toward the Grade Champion trophy, and French lessons are read aloud with a French voice from your device. You can pick that voice in Settings.` },
    ],
    atHome: [
      "Pick one new French word each day and use it at dinner or on the way to school.",
      "Label a few household objects with sticky notes in French.",
      "Listen to French songs or watch a short French video together and talk about what you noticed.",
      "Ask your child to read a page aloud in French, then retell it to you in English.",
      "Play a French game: count stairs, name colours, or spell a word out loud.",
    ],
    faqs: [
      { q: "When does Core French start in BC?", a: "Core French begins in Grade 5. Your school or district can tell you how much time it gets each week." },
      { q: "Can my child start French Immersion later?", a: "Some districts offer late immersion, often starting in Grade 6, and some have limited spaces in other grades. Entry rules differ, so ask your district office." },
      { q: "Will French Immersion hurt my child's English?", a: "English reading and writing are still taught in immersion, and research has generally found that immersion students do well in English. If you are worried, talk with your child's teacher." },
      { q: `Do French marks count toward the Grade Champion trophy in ${APP_NAME}?`, a: `No. French is a separate, optional set of subjects. Children earn their own French trophies instead.` },
      { q: `Does ${APP_NAME} replace French class?`, a: `No. It gives short, kind practice that matches the topics in the BC curriculum. It doesn't replace a teacher, and its levels are not a report card mark.` },
    ],
  },
  assessment: {
    slug: "fsa",
    short: "FSA",
    source: "the Ministry of Education and Child Care",
    hubBlurb: "The Grade 4 and Grade 7 Foundation Skills Assessment.",
    name: "Foundation Skills Assessment (FSA)",
    intro:
      "The Foundation Skills Assessment is an annual provincial check of literacy and numeracy that students in Grades 4 and 7 take in BC. For many students it is the first provincial assessment they write. It is separate from the report card and from class marks.",
    grades: ["4", "7"],
    facts: [
      { title: "Who takes it", body: "Students in Grades 4 and 7. Parents can ask their school if they have questions about their child taking part." },
      { title: "What it covers", body: "Literacy (reading and writing) and numeracy, in line with the BC curriculum." },
      { title: "When", body: "Most students write it in the fall. Schools set their own dates within a window the Ministry of Education and Child Care announces each year (for example, early October to mid-November in 2025)." },
      { title: "How results are described", body: "Results are reported in three levels: Emerging, On Track and Extending. They are not the four report card levels, and they are not letter grades or percentages." },
      { title: "Report card link", body: "FSA results do not change a student's report card. They give families and schools one more snapshot of reading, writing and numeracy." },
    ],
    prepare: [
      "Keep routines simple: regular sleep, a good breakfast and a calm morning.",
      "Read together often, then ask your child to retell what happened and explain why.",
      "Encourage short daily writing: a journal line, a note or a postcard.",
      "Practise numeracy with real problems (shopping, cooking, travel times) as well as number facts.",
      "Tell your child it is a check of what they know, not a test they can fail.",
    ],
    faqs: [
      {
        q: "What does FSA stand for?",
        a: "Foundation Skills Assessment. It is BC's annual provincial check of literacy and numeracy for Grade 4 and Grade 7 students.",
      },
      {
        q: "Is the FSA part of my child's report card?",
        a: "No. It is separate from the report card. Your child's report card describes learning in the classroom through the year using the four-level proficiency scale.",
      },
      {
        q: "Should my child study for the FSA?",
        a: "Cramming isn't needed. The FSA checks skills built over years. Short, regular practice in reading, writing and math is more helpful than a last-minute push, and so is a calm, positive attitude.",
      },
      {
        q: "What do FSA levels mean?",
        a: "Results use Emerging, On Track and Extending. On Track means your child is meeting expectations for the grade in that area. Emerging means they're still building the skill. Extending means they're going beyond. Talk with your child's teacher about what the result means for your child.",
      },
      {
        q: `Can ${APP_NAME} help my child get ready?`,
        a: `${APP_NAME} practises the numeracy and language arts skills taught in Grades 4 and 7 with kind feedback and no timers unless you want them. It isn't a copy of the FSA and doesn't predict a result.`,
      },
    ],
  },
  gradeNotes: {
    pk: {
      overview: "BC has no Pre-K school year: four-year-olds learn at home, in child care and in preschool, guided by the BC Early Learning Framework. It is about play, relationships and wonder, not marks.",
      lookFor: "Notice counting, rhyming, letters from your child's name, curiosity about animals and weather, and how they share and name feelings. Short, playful practice is plenty at this age.",
    },
    k: {
      overview: "Kindergarten in BC is play-based. Children learn through exploring, talking, building and drawing, and teachers describe learning through observations and portfolios as well as written comments.",
      lookFor: "Expect comments about friendships, listening, early letters and sounds, counting, and how your child shares ideas. It's a time to see what your child is curious about.",
    },
    "1": {
      overview: "Grade 1 is where reading, writing and number sense start to grow quickly. Children connect letters to sounds, read short books, write simple sentences and work with numbers to 20 and beyond.",
      lookFor: "Look for comments on reading simple texts, spelling common words, counting and adding, and taking part in class.",
    },
    "2": {
      overview: "In Grade 2, reading becomes smoother and writing gets longer. Math moves into place value, adding and subtracting to 100, and measuring. Science and social studies build on local places and living things.",
      lookFor: "Look for fluent reading, longer writing, adding and subtracting with trading, and the ability to explain thinking.",
    },
    "3": {
      overview: "Grade 3 is a bridge year. Students read to learn as well as learning to read, start multiplication and division, and work with fractions, in the context of communities and the natural world.",
      lookFor: "Look for comments about reading comprehension, paragraph writing, understanding multiplication and division, and fractions. (Memorizing multiplication facts isn’t expected until later grades.)",
    },
    "4": {
      overview: "Grade 4 raises the pace on reading, writing and number work with larger numbers, multiplication, fractions and decimals. Students in Grade 4 also take the Foundation Skills Assessment.",
      lookFor: "Look for comments on reading for meaning, organized paragraphs, fractions and decimals, and the FSA, which is separate from the report card.",
    },
    "5": {
      overview: "In Grade 5, students deepen their number sense with decimals, fractions and multi-digit operations, write longer pieces and do more research in science and social studies.",
      lookFor: "Look for comments on problem solving, supporting ideas with evidence, and independent research.",
    },
    "6": {
      overview: "Grade 6 pushes towards more abstract thinking: an introduction to ratios and percents, multiplying and dividing decimals, factors and multiples, one-step equations, longer writing and more independent study.",
      lookFor: "Look for comments about organization, explaining reasoning in math (including ratios and percents) and writing with evidence.",
    },
    "7": {
      overview: "Grade 7 is the last elementary year in many BC schools and prepares students for secondary school. Students take the Foundation Skills Assessment, and work on integers, the links between decimals, fractions, ratios and percents, two-step equations, circles and deeper analysis of what they read.",
      lookFor: "Look for comments on independence, study habits and confidence with the harder math and reading ahead.",
    },
    "8": {
      overview: "Grade 8 is the first year of secondary school in many BC districts. Students work with fraction operations, squares and roots, ratios and rates, linear equations, the Pythagorean theorem and surface area and volume, and they study cells, particles and plate tectonics.",
      lookFor: "Look for comments on managing a heavier workload, showing steps in math and supporting an argument with evidence from a text.",
    },
    "9": {
      overview: "Grade 9 builds towards the graduation years. Students work with rational numbers, exponent laws, polynomials, multi-step equations and linear relations, explore atoms, electric current and ecosystems, and study the Enlightenment, industrialization and Canada's story.",
      lookFor: "Look for comments on planning ahead for course choices, explaining reasoning in math and weighing perspectives in social studies and English.",
    },
  },
};

/**
 * BC guide copy reworded for a territory that follows the BC curriculum (Yukon, the Northwest Territories).
 */
export function localText<T>(value: T, place: string, school: string, authority: string): T {
  if (typeof value === "string") {
    return value
      .replaceAll("BC Core Competencies", "Core Competencies")
      .replaceAll("BC curriculum", `BC curriculum, adapted for ${place === "the NWT" ? place : "the " + place}`)
      .replaceAll("BC Core French", "Core French")
      .replaceAll("BC report card", `${place === "the NWT" ? "NWT" : place} report card`)
      .replaceAll("in BC", `in ${place === "the NWT" ? place : "the " + place}`)
      .replaceAll("BC districts", `${school} schools`)
      .replaceAll("many BC", `many ${school}`)
      .replaceAll("your district office", `your school or ${authority}`)
      .replaceAll("districts", "schools")
      .replaceAll("district", "school") as T;
  }
  if (Array.isArray(value)) return value.map((v) => localText(v, place, school, authority)) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localText(v, place, school, authority)])) as T;
  return value;
}
