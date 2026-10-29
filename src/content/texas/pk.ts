import { preKCourses } from "../prek";

// Texas Pre-K for four-year-olds. It follows the 2022 Texas Prekindergarten Guidelines (PK4); the shared Pre-K units
// cite their child behaviors by code (docs/research/texas/prek/).
export const courses = preKCourses("us-tx", {
  math: {
    bigIdeas: ["Number Sense", "Joining and Separating", "Geometry and Spatial Sense", "Measurement", "Classification and Patterns"],
    standards: {
      "count-to-5": "PK4.V.A.2; PK4.V.A.3; PK4.V.A.4 · counting small groups and seeing how many",
      "find-the-number": "PK4.V.A.5 · recognizing the numerals 0 to 10",
      "more-or-fewer": "PK4.V.A.8 · comparing groups as more, fewer or the same",
      shapes: "PK4.V.C.1; PK4.V.C.4 · naming circles, squares, triangles and rectangles",
      patterns: "PK4.V.E.3 · copying and extending repeating patterns",
      "big-and-small": "PK4.V.D.1; PK4.V.D.3 · comparing size, height, length and weight",
      "sort-it": "PK4.V.E.1 · sorting objects by color, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Listening Comprehension", "Vocabulary", "Phonological Awareness", "Alphabet Knowledge", "Comprehension of Text"],
    standards: {
      "letter-names": "PK4.III.C.1 · knowing the names of capital letters",
      "first-sounds": "PK4.III.B.7 · hearing the first sound in a word",
      "rhyme-time": "PK4.III.B.6 · hearing words that rhyme",
      "clap-the-parts": "PK4.III.B.5 · clapping the parts of spoken words",
      "listen-to-a-story": "PK4.III.D.3 · listening to a short story and answering questions about it",
      "word-meanings": "PK4.II.D.1 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Physical Science", "Life Science", "Earth and Space Science"],
    standards: {
      "five-senses": "PK4.VI.A.1 · observing common objects with the five senses",
      "living-or-not": "PK4.VI.B.1 · telling living things from things that are not alive",
      "animals-and-babies": "PK4.VI.B.2; PK4.VI.B.3 · where animals live and how they grow",
      "weather-and-sky": "PK4.VI.C.2; PK4.VI.C.3 · noticing weather, day and night",
      "plants-grow": "PK4.VI.B.2 · what plants need and how they grow from seeds",
      "sink-or-float": "PK4.VI.A.1; PK4.VI.A.2 · how objects move, sink and float",
    },
  },
  social: {
    bigIdeas: ["People, Past and Present", "Economics", "Geography", "Citizenship", "Social and Emotional Development"],
    standards: {
      "my-family": "PK4.VII.A.2; PK4.IX.C.2 · knowing about myself, my family and staying healthy",
      feelings: "PK4.I.B.2.a; PK4.I.D.1 · naming feelings in myself and others",
      "community-helpers": "PK4.VII.B.3 · the roles of family, school and community helpers",
      "places-around-me": "PK4.VII.C.1 · places in the community and what happens there",
      "taking-turns": "PK4.I.C.4; PK4.I.B.1.a · sharing, taking turns and following classroom rules",
      "first-next-last": "PK4.VII.A.3 · daily routines in order",
      "caring-for-our-world": "PK4.VI.C.4 · caring for our environment and our planet",
    },
  },
});
