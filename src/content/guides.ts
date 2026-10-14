import { FRAMEWORKS } from "./frameworks";
import { REGISTRY } from "./registry";
import type { AgeBand, FrameworkId, GradeId, SubjectId } from "./types";

// Parent-facing guide copy that differs by province: the shapes every framework fills in, the shared home tips, and
// GUIDES, which holds each framework's copy (its folder's guides.ts, through its manifest). Pages read it from here.

export interface Competency {
  id: string;
  name: string;
  blurb: string;
  /** The official sub-competencies, if the framework has them. */
  parts: { name: string; blurb: string }[];
  atHome: string[];
}

export interface Assessment {
  /** URL segment, e.g. "fsa" or "eqao". */
  slug: string;
  /** Short name used in links and headings, e.g. "FSA". */
  short: string;
  /** Who runs it and where the current dates are published, for the "dates change" note. */
  source: string;
  /** One line for the guides hub. */
  hubBlurb: string;
  name: string;
  intro: string;
  /** Grades that write it. */
  grades: GradeId[];
  facts: { title: string; body: string }[];
  prepare: string[];
  faqs: { q: string; a: string }[];
}

export interface GradeNote {
  /** One or two sentences on what the year feels like. */
  overview: string;
  /** What parents commonly see on the report card or notice at home. */
  lookFor: string;
}

export interface FrenchGuide {
  title: string;
  intro: string;
  /** Finishes the meta description, e.g. when each program starts. */
  metaTail: string;
  /** Grades to link for "browse the French lessons". */
  browse: GradeId[];
  /** Core French and French Immersion side by side. */
  compare: { title: string; core: string; immersion: string }[];
  sections: { title: string; body: string }[];
  atHome: string[];
  faqs: { q: string; a: string }[];
}

export interface FrameworkGuides {
  /** Not every province has a French guide yet. */
  french?: FrenchGuide;
  competencies: {
    /** URL segment, e.g. "core-competencies" or "learning-skills". */
    slug: string;
    /** Short name used in links and breadcrumbs, e.g. "Core Competencies". */
    label: string;
    /** One line for the guides hub. */
    hubBlurb: string;
    /** Meta description. */
    description: string;
    /** Sentence for grade pages, ending in a link to the guide. */
    gradeLine: string;
    /** Closing note on the guide page. */
    closing: string;
    title: string;
    intro: string;
    items: Competency[];
    faqs: { q: string; a: string }[];
  };
  assessment: Assessment;
  /** Only for grades the framework covers. */
  gradeNotes: Partial<Record<GradeId, GradeNote>>;
}

/** Short home activities, by subject and age band. Not tied to a province. */
export const HOME_TIPS: Record<SubjectId, Record<AgeBand, string[]>> = {
  math: {
    little: [
      "Count everyday things out loud: stairs, grapes, steps to the car.",
      "Sort laundry or toys into groups, then ask which group has more.",
      "Spot shapes on a walk: circles on signs, rectangles on doors.",
      "Make patterns with snacks or blocks (red, blue, red, blue) and let your child continue them.",
    ],
    middle: [
      "Practise math facts in short bursts, such as five minutes while dinner cooks.",
      "Let your child handle small cash purchases, working out the change together.",
      "Cook together and double or halve a recipe.",
      "Ask “How do you know?” after an answer, even when it is right.",
    ],
    big: [
      "Look for fractions, decimals and percentages in sale signs, sports statistics and recipes.",
      "Ask your child to explain a problem to you as if you were the student.",
      "Estimate first (the bill, the trip time), then check with a calculator.",
      "Keep a tricky-problems list and revisit it every few days instead of re-doing everything.",
    ],
  },
  language: {
    little: [
      "Read aloud every day and let your child finish familiar phrases.",
      "Play with sounds: “What starts with /b/? What rhymes with cat?”",
      "Point out letters on signs, cereal boxes and the street.",
      "Ask your child to tell you a story about their drawing, and write down a sentence or two.",
    ],
    middle: [
      "Take turns reading a page aloud, and chat about what happened and why.",
      "Keep a short journal, with one or two sentences a day to start.",
      "Hunt for a new word a day and use it at dinner.",
      "Ask for a prediction before turning the page: “What do you think happens next?”",
    ],
    big: [
      "Read what they are interested in: graphic novels, sports pages, series. Then talk about it.",
      "Ask for the main idea and one piece of evidence from the text.",
      "Have them write real messages: a thank-you note, a short review, a note to a relative.",
      "Read their writing aloud to them; they often spot their own mistakes by ear.",
    ],
  },
  science: {
    little: [
      "Go on a nature walk and name what you see: leaves, bugs, clouds, puddles.",
      "Plant a bean seed and check it together each day.",
      "Ask “What do you notice?” before you explain anything.",
      "Talk about the weather each morning and what to wear for it.",
    ],
    middle: [
      "Try a kitchen experiment, such as what dissolves in water and what floats or sinks.",
      "Keep a simple weather or moon log for a month.",
      "Ask “What do you think will happen?” and then test it.",
      "Visit a park, beach or creek and look for living things and their habitats.",
    ],
    big: [
      "Turn everyday questions into investigations: “Which paper towel holds the most water?”",
      "Read a science news story together and ask what evidence it gives.",
      "Look up how a household machine works, such as a bike gear, a lamp or a fridge.",
      "Have your child draw and label a diagram of something they just learned.",
    ],
  },
  social: {
    little: [
      "Talk about your family, your neighbourhood and the people who help in it.",
      "Make a simple map of your home or street together.",
      "Share a family tradition or story and ask your child to share one back.",
      "Practise taking turns and sharing, and talk about why fairness matters.",
    ],
    middle: [
      "Look at a map of your community and find places you visit.",
      "Ask an older relative or neighbour what the area was like when they were young.",
      "Read stories from many communities, including Indigenous authors, and talk about what is the same and different.",
      "Talk about how rules and jobs help a community work.",
    ],
    big: [
      "Follow a current event together and ask who is affected and why people see it differently.",
      "Build a timeline of a family event or a historical topic they are studying.",
      "Use an atlas or online map to trace a trade or travel route.",
      "Ask “Whose voice is missing from this story?” when reading about the past.",
    ],
  },
  immersion: {
    little: [
      "Read French picture books together, even if you are learning too. Let your child tell you what is happening.",
      "Sing French songs and nursery rhymes in the car or at bath time.",
      "Name things around the house in French, and ask your child to teach you the words.",
      "Clap the syllables in French words and play “What rhymes with chat?”",
    ],
    middle: [
      "Read a short French book or comic together a few times a week, and talk about it in either language.",
      "Ask your child to teach you one new French word or grammar rule a day.",
      "Watch a French show with the French subtitles on, then retell the story.",
      "Keep a short French journal: one or two sentences a day.",
    ],
    big: [
      "Read French novels, comics or articles on topics your child enjoys.",
      "Ask your child to explain a grammar rule to you, with an example.",
      "Have your child write a short French note or message to a relative or pen pal.",
      "Use a French dictionary or conjugation tool together when revising a draft.",
    ],
  },
  "core-french": {
    little: [
      "Learn a few French words together, like bonjour, merci and au revoir.",
      "Sing a French song and clap along.",
      "Name colours and animals in French.",
      "Greet each other in French at breakfast.",
    ],
    middle: [
      "Learn a few French words together, like bonjour, merci and au revoir.",
      "Label things around the house with French sticky notes.",
      "Count in French while climbing the stairs.",
      "Play a French game or watch a short French video together.",
    ],
    big: [
      "Practise a few minutes a day: greetings, numbers, then simple sentences about yourself.",
      "Say your answers out loud in French, even if you are not sure. Speaking is how it sticks.",
      "Watch French videos with subtitles and spot words that look like English (cognates).",
      "Look up a Francophone festival or community in Canada and share one thing you learned.",
    ],
  },
};

/**
 * Every framework's guide copy, from its manifest. Server pages only (it reads every framework's guides); the apps
 * never import this file.
 */
export const GUIDES: Partial<Record<FrameworkId, FrameworkGuides>> = Object.fromEntries(await Promise.all(REGISTRY.map(async (m) => [m.id, await m.guides()] as const)));

export const GUIDE_FRAMEWORKS = FRAMEWORKS.filter((f) => GUIDES[f.id]);

export function guidesFor(id: FrameworkId): FrameworkGuides {
  const g = GUIDES[id];
  if (!g) throw new Error(`No parent guides for ${id}`);
  return g;
}
