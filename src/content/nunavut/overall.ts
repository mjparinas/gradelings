import type { GradeId, SubjectId } from "../types";

// What a Nunavut course page shows parents as its learning focus. Nunavut's approved guides are organized in four strands
// (Nunavusiutit, Iqqaqqaukkaringniq, Uqausiliriniq, Aulajaaqtut; Nunavut Department of Education, Approved Curriculum and
// Teaching Resources), and the guides themselves are listed in docs/research/nunavut/approved.json. Kindergarten to Grade 3 now
// follow the new made-in-Nunavut curriculum (Kindergarten and Grade 1 from 2025-26, Grades 2 and 3 from 2026-27), so those
// grades describe it instead of the adopted guides.

/** Grades already taught with the new Nunavut curriculum. Add the next grade each September as the territory phases it in. */
export const NEW_CURRICULUM_GRADES: readonly GradeId[] = ["k", "1", "2", "3"];

const NEW_CURRICULUM = "The new Nunavut curriculum is grounded in Inuit Qaujimajatuqangit and taught in Inuktut and English.";

const NEW: Record<string, string[]> = {
  math: [
    "Iqqaqqaukkaringniq: concepts in mathematics, analytical and critical thinking, and solution-seeking.",
    "Number, Patterns and Relations, Shape and Space, and Statistics and Probability, often through hands-on activities and life on the land.",
    NEW_CURRICULUM,
  ],
  language: [
    "Uqausiliriniq: communication and language, creative and artistic expression, and reflective and critical thinking.",
    "Oral Communication, Reading, and Writing and Representing in English.",
    NEW_CURRICULUM,
  ],
  science: [
    "Iqqaqqaukkaringniq: ways to describe and improve our world through science and technology.",
    "The Material World, Physics, Earth and Space, and Life Sciences, alongside traditional knowledge of the land.",
    NEW_CURRICULUM,
  ],
  social: [
    "Nunavusiutit: heritage and culture, history, geography, environmental science, and civics and economics.",
    "Communities, Stories and Land, starting close to home.",
    NEW_CURRICULUM,
  ],
};

const MATH = [
  "Iqqaqqaukkaringniq: concepts in mathematics, analytical and critical thinking, and solution-seeking.",
  "Number: develop number sense and understand how numbers and operations work.",
  "Patterns and Relations: use patterns and equations to describe the world and solve problems.",
  "Shape and Space: measure, and describe 2-D shapes and 3-D objects and how they move.",
  "Statistics and Probability: collect, read and interpret data, and describe chance.",
];

const LANGUAGE = [
  "Uqausiliriniq: communication and language, creative and artistic expression, and reflective and critical thinking.",
  "Comprehension: listen, view and read to understand a range of texts.",
  "Production: speak, write and represent ideas clearly for different audiences and purposes.",
];

const SCIENCE_K6 = [
  "Iqqaqqaukkaringniq: ways to describe and improve our world through science and technology.",
  "Life science, physical science, and earth and space science, as in the Common Framework of Science Learning Outcomes.",
  "Skills of inquiry and design, and links between science, technology, society and the environment.",
];

const SCIENCE_79 = [
  "Iqqaqqaukkaringniq: the Nunavut adaptation of the Alberta Science 7–9 program of studies.",
  "Units of study bring together life, physical and earth and space science with skills of inquiry and design.",
  "Learning with Elders and from the land is encouraged alongside classroom science.",
];

const SOCIAL = [
  "Nunavusiutit: heritage and culture, history, geography, environmental science, and civics and economics, with a focus on Nunavut and its links to Canada and the circumpolar world.",
  "Inuuqatigiit, the curriculum from the Inuit perspective, shapes how the strand is taught.",
  "Skills of inquiry, working with others and respecting different points of view.",
];

const FRENCH = [
  "French as an Additional Language for Nunavut, Grades 4 to 9: communication in French and learning about francophone cultures.",
  "Oral communication, reading, writing and viewing build step by step from familiar topics.",
];

export function overall(grade: GradeId, subject: SubjectId): string[] {
  if (NEW_CURRICULUM_GRADES.includes(grade) && NEW[subject]) return NEW[subject];
  switch (subject) {
    case "math":
      return MATH;
    case "language":
      return LANGUAGE;
    case "science":
      return ["7", "8", "9"].includes(grade) ? SCIENCE_79 : SCIENCE_K6;
    case "social":
      return SOCIAL;
    default:
      return FRENCH;
  }
}
