import { preKCourses } from "../prek";

// Oregon pre-K, the year before Kindergarten. It follows the Oregon Early Learning and Kindergarten Guidelines for children
// aged 4 to 5; the shared Pre-K units cite their guidelines, for example "M.2" (recognizing the number in a small set).
// The guidelines have no science or social studies domain, so science units cite curiosity (P-ATL11) and social studies
// units cite social-emotional and self-regulation guidelines (docs/research/oregon/prek/).
export const courses = preKCourses("us-or", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Measurement and Data", "Geometry and Spatial Sense"],
    standards: {
      "count-to-5": "M.2; M.3 · seeing and counting small groups",
      "find-the-number": "M.5 · recognizing the written numbers",
      "more-or-fewer": "M.4 · comparing groups as more, fewer or the same",
      shapes: "M.11 · naming and sorting circles, squares, triangles and rectangles",
      patterns: "M.7 · copying and extending repeating patterns",
      "big-and-small": "M.9 · comparing size, length and weight",
      "sort-it": "M.10 · sorting objects into groups",
    },
  },
  language: {
    bigIdeas: ["Language and Communication", "Phonological Awareness", "Print and Alphabet Knowledge", "Comprehension and Text Structure"],
    standards: {
      "letter-names": "LIT.3 · knowing the names of letters",
      "first-sounds": "LIT.1; LIT.3 · hearing the first sound in a word",
      "rhyme-time": "LIT.1 · hearing and making words that rhyme",
      "clap-the-parts": "LIT.1 · clapping the syllables in words",
      "listen-to-a-story": "LIT.4; LIT.5 · listening to a short story and answering questions about it",
      "word-meanings": "LC.6; LC.7 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Initiative and Curiosity"],
    standards: {
      "five-senses": "P-ATL11 · observing with the senses",
      "living-or-not": "P-ATL11 · telling living things from things that are not alive",
      "animals-and-babies": "P-ATL11 · animals and what they need to live",
      "weather-and-sky": "P-ATL11 · noticing weather and how it changes",
      "plants-grow": "P-ATL10; P-ATL11 · caring for plants and watching them grow",
      "sink-or-float": "P-ATL10; P-ATL11 · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Senses of Identity and Belonging", "Emotional Functioning", "Relationships with Other Children", "Self-Regulation"],
    standards: {
      "my-family": "SE.1; SE.3 · knowing about myself and my family",
      feelings: "SE.4; SE.6 · naming feelings in myself and others",
      "community-helpers": "SE.3 · how people live and work in the community",
      "places-around-me": "SE.3 · places in the community and simple maps",
      "taking-turns": "SE.9; SE.10; P-ATL2 · taking turns, sharing and following rules",
      "first-next-last": "P-ATL2 · following routines: first, next and last",
      "caring-for-our-world": "P-ATL3 · caring for our surroundings",
    },
  },
});
