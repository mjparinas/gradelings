import { preKCourses } from "../prek";

// North Dakota pre-K, the year before Kindergarten. It follows the North Dakota Early Learning Standards (North Dakota
// Department of Public Instruction) for children from 36 to 60 months, which give goals by domain (`P-MATH 7`, simple patterns;
// `P-LIT 3`, letters and their sounds) (docs/research/north-dakota/prek/).
export const courses = preKCourses("us-nd", {
  math: {
    bigIdeas: ["Counting and Number Sense", "Operations and Patterns", "Measurement", "Geometry and Spatial Sense"],
    standards: {
      "count-to-5": "P-MATH 2; P-MATH 3 · seeing and counting small groups",
      "find-the-number": "P-MATH 5 · recognizing the written numbers",
      "more-or-fewer": "P-MATH 4 · comparing groups as more, fewer or the same",
      shapes: "P-MATH 9 · naming and sorting shapes",
      patterns: "P-MATH 7 · copying and extending simple patterns",
      "big-and-small": "P-MATH 8 · comparing size, length and weight",
      "sort-it": "P-SCI 3 · comparing and sorting objects into groups",
    },
  },
  language: {
    bigIdeas: ["Language and Communication", "Literacy"],
    standards: {
      "letter-names": "P-LIT 3 · knowing the names of letters and their sounds",
      "first-sounds": "P-LIT 1 · hearing the first sound in a word",
      "rhyme-time": "P-LIT 1 · hearing and making words that rhyme",
      "clap-the-parts": "P-LIT 1 · clapping the syllables in words",
      "listen-to-a-story": "P-LIT 5; P-LIT 4 · listening to a short story, answering questions and retelling it",
      "word-meanings": "P-LC 6; P-LC 7 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Observing and Describing", "Asking Questions and Investigating"],
    standards: {
      "five-senses": "P-SCI 1 · observing with the senses",
      "living-or-not": "P-SCI 3 · telling living things from things that are not alive",
      "animals-and-babies": "P-SCI 1 · observing animals and what they need to live",
      "weather-and-sky": "P-SCI 1 · noticing weather and how it changes",
      "plants-grow": "P-SCI 1; P-SCI 6 · caring for plants and watching them grow",
      "sink-or-float": "P-SCI 4; P-SCI 5 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Relationships and Belonging", "Feelings and Self", "Social Studies"],
    standards: {
      "my-family": "P-SS 6; P-SE 9 · knowing about myself and my family",
      feelings: "P-SE 6 · naming feelings in myself and others",
      "community-helpers": "P-SE 11 · belonging to a community and the people in it",
      "places-around-me": "P-SS 7 · the families and communities I belong to",
      "taking-turns": "P-SE 4; P-SS 4 · taking turns, sharing and following rules",
      "first-next-last": "P-SS 1 · knowing past, present and future: first, next and last",
      "caring-for-our-world": "P-SS 3 · caring for our surroundings",
    },
  },
});
