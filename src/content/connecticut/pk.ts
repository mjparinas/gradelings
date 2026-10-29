import { preKCourses } from "../prek";

// Connecticut pre-K, the preschool year for four-year-olds (School Readiness, Smart Start and other programs). It follows
// the Connecticut Early Learning and Development Standards (CT ELDS); the shared Pre-K units cite their 48 to 60 months
// indicators as "domain.60.number" (docs/research/connecticut/prek/).
export const courses = preKCourses("us-ct", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Measurement and Data", "Geometry and Spatial Sense"],
    standards: {
      "count-to-5": "M.60.5; M.60.2 · seeing and counting small groups to 5",
      "find-the-number": "M.60.4 · recognizing the written numbers",
      "more-or-fewer": "M.60.6 · comparing groups as more, fewer or the same",
      shapes: "M.60.14 · naming circles, squares, triangles and rectangles",
      patterns: "C.60.9 · noticing and using repeating patterns",
      "big-and-small": "M.60.9 · comparing size, height, length and weight",
      "sort-it": "M.60.12 · sorting objects by one attribute",
    },
  },
  language: {
    bigIdeas: ["Listening and Understanding", "Vocabulary", "Early Literacy"],
    standards: {
      "letter-names": "L.60.20 · recognizing and naming letters",
      "first-sounds": "L.60.23 · hearing which words begin with the same sound",
      "rhyme-time": "L.60.22 · hearing and making words that rhyme",
      "clap-the-parts": "L.60.24 · clapping the syllables in words",
      "listen-to-a-story": "L.60.12; L.60.13 · listening to a short story and retelling it",
      "word-meanings": "L.60.1; L.60.6 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Inquiry", "Living Things", "Physical Properties and Forces", "Earth and Weather"],
    standards: {
      "five-senses": "C.60.8; S.60.3 · observing with the senses and comparing what we notice",
      "living-or-not": "S.60.7 · telling living things from things that are not alive",
      "animals-and-babies": "S.60.8 · how animals grow and change",
      "weather-and-sky": "S.60.14 · noticing weather and the sky",
      "plants-grow": "S.60.8; S.60.9 · what plants need and how they grow",
      "sink-or-float": "S.60.12; C.60.7 · trying materials and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social and Emotional Development", "Self, Family and Community", "People and the Environment", "Past, Present and Future"],
    standards: {
      "my-family": "SS.60.1; SE.60.11 · knowing about myself and my family",
      feelings: "SE.60.8; SE.60.10 · naming feelings in myself and others",
      "community-helpers": "SS.60.7 · people in the community and the work they do",
      "places-around-me": "SS.60.5 · places at home, school and in the community",
      "taking-turns": "SE.60.16; SS.60.3 · taking turns, sharing and following rules",
      "first-next-last": "SE.60.7; SS.60.10 · daily routines in order",
      "caring-for-our-world": "SS.60.4 · caring for our environment",
    },
  },
});
