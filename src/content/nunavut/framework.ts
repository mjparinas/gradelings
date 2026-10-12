import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";

// Nunavut. The Department of Education makes the approved curriculum mandatory. It mixes guides adopted from Alberta
// (mathematics, Grades 7 to 9 science) and the Northwest Territories (English language arts, Kindergarten to Grade 6
// science, social studies) with Nunavut-made resources, and is organized in four strands: Nunavusiutit, Iqqaqqaukkaringniq,
// Uqausiliriniq and Aulajaaqtut. A new made-in-Nunavut curriculum is being phased in from Kindergarten and Grade 1, so check the
// Department's approved curriculum list. Nunavut has no report-card scale Gradelings could confirm, so the four steps
// below are a plain practice scale, not a Nunavut scale. Sources and the checking record are in docs/research/nunavut/.

const LEVELS: ProficiencyLevel[] = [
  {
    id: "beginning",
    label: "Beginning",
    kidLabel: "Seedling",
    icon: "🌱",
    colour: "#ff9636",
    description: "Practice shows a first understanding of the learning outcomes. Most answers still need a hint or a second try.",
    atHome: "Just getting started with this idea. Short, regular practice with lots of support helps most.",
  },
  {
    id: "approaching",
    label: "Approaching",
    kidLabel: "Sprout",
    icon: "🌿",
    colour: "#f5b301",
    description: "Practice shows a partial understanding of the learning outcomes. Some answers are right on the first try.",
    atHome: "Understands parts of it and is building confidence. Keep practising the tricky parts.",
  },
  {
    id: "meeting",
    label: "Meeting",
    kidLabel: "Tree",
    icon: "🌳",
    colour: "#25b47e",
    description: "Practice shows a solid understanding of the learning outcomes. Most answers are right on the first try.",
    atHome: "Has it! Mixed review now and then keeps it strong.",
  },
  {
    id: "exceeding",
    label: "Exceeding",
    kidLabel: "Star",
    icon: "⭐",
    colour: "#4f8ef7",
    description: "Practice shows a deep understanding of the learning outcomes, including harder, unfamiliar questions.",
    atHome: "Applies it confidently, even in new or harder situations. Try challenge mode and real-life problems.",
  },
];

const SCHEME: ScoringScheme = {
  id: "nu-practice-steps",
  name: "Four practice steps",
  source: "These four steps are a plain practice scale, not a Nunavut Department of Education scale. Ask your child's school how it reports.",
  levels: LEVELS,
};

export const NUNAVUT: Framework = {
  id: "ca-nu",
  slug: "nunavut",
  name: "Nunavut",
  shortName: "Nunavut",
  country: "CA",
  curriculumName: "Nunavut Curriculum",
  region: "Nunavut",
  overviewLabel: "Learning focus",
  standardLabel: "Approved guide",
  sourceName: "Nunavut Department of Education",
  sourceUrl: "https://www.gov.nu.ca/en/education-and-schools/approved-curriculum",
  grades: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social", "core-french"],
  scoringFor: () => SCHEME,
  reportCard: {
    title: "Understanding Nunavut report cards",
    intro:
      "Nunavut schools follow an approved curriculum that the Department of Education makes mandatory. It is bilingual, built on Inuit Qaujimajatuqangit (Inuit knowledge and ways of knowing), and organized in four strands. How your child's progress is reported depends on the school, so use your child's report card and conversations with the teacher as the guide.",
    facts: [
      {
        title: "Four curriculum strands",
        body: "Nunavusiutit covers heritage, culture, history, geography, civics and economics. Iqqaqqaukkaringniq covers mathematics, science, analytical thinking and problem solving. Uqausiliriniq covers language and communication. Aulajaaqtut covers wellness, safety and one's place in society.",
      },
      {
        title: "Adopted and Nunavut-made guides",
        body: "Nunavut uses curriculum guides adopted from other jurisdictions, such as Alberta for mathematics and the Northwest Territories for English language arts, together with resources made in Nunavut. A new made-in-Nunavut curriculum is being phased in over several years, starting in the early grades.",
      },
      {
        title: "Core curriculum checklists",
        body: "The Department has identified the core learning outcomes in each subject for Kindergarten to Grade 9 and provides checklists teachers can use to track what each student has achieved. Ask your child's teacher which outcomes they are focusing on.",
      },
      {
        title: "Inuktut and bilingual education",
        body: "Nunavut's Education Act and Inuit Language Protection Act call for bilingual curriculum and resources that are culturally and linguistically appropriate. Many schools teach in Inuktut in the early grades.",
      },
      {
        title: "Practice steps are not a Nunavut scale",
        body: "Gradelings shows practice on four plain steps (Beginning, Approaching, Meeting, Exceeding). Your child's teacher decides how progress is reported.",
      },
    ],
    faqs: [
      {
        q: "Does Nunavut have a territory-wide report-card scale?",
        a: "We could not confirm one, so Gradelings uses four plain practice steps you can match to the words on your child's own report card. Ask your school how it reports.",
      },
      {
        q: "Does Gradelings teach in Inuktut?",
        a: "Not yet. Gradelings is in English, with a few Inuktut words and names in Nunavut units. It does not replace Inuktut language arts at school.",
      },
      {
        q: "Does Gradelings give a grade?",
        a: "No. Gradelings shows how practice is going so you can see where your child is strong and where to practise. Your child's teacher decides how progress is reported.",
      },
      {
        q: "How can I help at home?",
        a: "Ask your child's teacher which outcomes to focus on, then try short, regular practice (10 to 15 minutes). Talk with your child about what they learn, and invite Elders and family to share stories and skills. Celebrate effort and progress, not just results.",
      },
    ],
  },
};
