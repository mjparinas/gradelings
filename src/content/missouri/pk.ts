import { preKCourses } from "../prek";

// Missouri pre-K, the year before kindergarten in public schools, Head Start and the state's pre-K programs. It follows
// the Missouri Early Learning Standards (2021); the shared Pre-K units cite their indicators with the content area, for
// example "Mathematics I.A.2" (docs/research/missouri/prek/). The standards have no social studies area, so the social
// units cite social-emotional development and the closest physical development indicators.
export const courses = preKCourses("us-mo", {
  math: {
    bigIdeas: ["Number and Operations", "Geometry and Spatial Sense", "Patterns and Relationships", "Measurement", "Data"],
    standards: {
      "count-to-5": "Mathematics I.A.1; Mathematics I.A.2 · counting and seeing how many",
      "find-the-number": "Mathematics I.B.1 · recognizing the written numbers",
      "more-or-fewer": "Mathematics I.A.2 · comparing groups as more, fewer or the same",
      shapes: "Mathematics II.B.2; Mathematics II.B.1 · naming circles, squares, triangles and rectangles",
      patterns: "Mathematics III.A.2; Mathematics III.A.1 · copying and extending repeating patterns",
      "big-and-small": "Mathematics IV.A.3; Mathematics IV.A.4 · comparing size, height, length and weight",
      "sort-it": "Mathematics V.A.1 · sorting and organizing objects",
    },
  },
  language: {
    bigIdeas: ["Spoken Language", "Listening", "Print and Books", "Sounds of Language"],
    standards: {
      "letter-names": "Language and Literacy IV.A.6 · knowing the names of letters",
      "first-sounds": "Language and Literacy V.A.3 · hearing the first sound in a word",
      "rhyme-time": "Language and Literacy V.A.1; Language and Literacy V.A.2 · hearing and saying rhymes",
      "clap-the-parts": "Language and Literacy V.A.2; Language and Literacy V.A.3 · clapping the syllables in words",
      "listen-to-a-story": "Language and Literacy II.A.4; Language and Literacy IV.A.4 · listening to a short story and answering questions about it",
      "word-meanings": "Language and Literacy I.A.4; Language and Literacy II.A.5 · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Physical Science", "Life Science", "Earth Science"],
    standards: {
      "five-senses": "Science I.A.1; Science I.A.3 · exploring the world with the senses",
      "living-or-not": "Science II.A.1 · asking questions about living things",
      "animals-and-babies": "Science II.A.1; Science II.A.4 · how animals grow and change",
      "weather-and-sky": "Science III.A.1; Science III.A.2 · the earth, the weather and the sky",
      "plants-grow": "Science II.A.3; Science II.A.4 · growing plants and seeing what they need",
      "sink-or-float": "Science I.A.2; Science I.A.3 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Knowledge of Self", "Knowledge of Others", "Approaches to Learning", "Safety"],
    standards: {
      "my-family": "Social-Emotional I.A.3; Social-Emotional II.A.5 · knowing yourself and the people in your family",
      feelings: "Social-Emotional I.B.3; Social-Emotional II.B.3 · naming feelings and seeing how others feel",
      "community-helpers": "Physical Development III.A.3 · knowing how and when to ask helpers for help",
      "places-around-me": "Social-Emotional I.B.4; Physical Development I.C.3 · different places and where things are",
      "taking-turns": "Social-Emotional II.B.4; Social-Emotional II.A.4; Social-Emotional I.B.1 · sharing, being kind and following rules",
      "first-next-last": "Physical Development I.C.4; Social-Emotional I.B.2 · knowing what comes first, next and last in the day",
      "caring-for-our-world": "Social-Emotional I.C.1 · caring for our own and shared things",
    },
  },
});
