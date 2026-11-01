import { preKCourses } from "../prek";

// West Virginia pre-K, the year before Kindergarten. It follows the West Virginia Early Learning Standards Framework; the
// shared Pre-K units cite its statements, numbered in document order ("M.1.3" is Mathematics, strand 1, third statement:
// one-to-one correspondence) (docs/research/west-virginia/prek/).
export const courses = preKCourses("us-wv", {
  math: {
    bigIdeas: ["Number \u2013 Counting and Cardinality", "Number \u2013 Operations and the Problems they Solve", "Measurement and Data", "Geometry"],
    standards: {
      "count-to-5": "M.1.3; M.1.4 · seeing and counting small groups",
      "find-the-number": "M.1.2 · recognizing the written numbers",
      "more-or-fewer": "M.1.5 · comparing groups as more, fewer or the same",
      shapes: "M.4.3 · naming and sorting circles, squares, triangles and rectangles",
      patterns: "M.4.1 · copying and extending repeating patterns",
      "big-and-small": "M.3.1; M.3.2 · comparing size, height, length and weight",
      "sort-it": "M.3.4 · sorting objects by color, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Listening and Speaking", "Foundational Skills for Reading", "Literature", "Writing"],
    standards: {
      "letter-names": "L.2.6 · knowing the names of letters",
      "first-sounds": "L.2.11 · hearing the first sound in a word",
      "rhyme-time": "L.2.10 · hearing and making words that rhyme",
      "clap-the-parts": "L.2.9 · clapping the syllables in words",
      "listen-to-a-story": "L.3.1; L.3.3 · listening to a short story and answering questions about it",
      "word-meanings": "L.1.3 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Science as Inquiry", "Scientific Knowledge"],
    standards: {
      "five-senses": "S.1.5 · observing with the senses",
      "living-or-not": "S.2.1 · telling living things from things that are not alive",
      "animals-and-babies": "S.2.1 · animals and what they need to live",
      "weather-and-sky": "S.2.2 · noticing weather and how it changes",
      "plants-grow": "S.2.1; S.2.3 · caring for plants and watching them grow",
      "sink-or-float": "S.1.4 · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Self-Concept", "Social Relationships", "Knowledge of Family and Community", "Dispositions to Learning"],
    standards: {
      "my-family": "SE.3.1; SE.1.1 · knowing about myself and my family",
      feelings: "SE.1.4; SE.2.2 · naming feelings in myself and others",
      "community-helpers": "SE.3.2 · how people live and work in the community",
      "places-around-me": "SE.3.5 · places in the community and simple maps",
      "taking-turns": "SE.2.8; SE.2.3 · taking turns, sharing and following rules",
      "first-next-last": "SE.2.5 · following routines: first, next and last",
      "caring-for-our-world": "SE.2.3 · caring for materials and our surroundings",
    },
  },
});
