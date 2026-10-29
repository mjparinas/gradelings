import { preKCourses } from "../prek";

// Newfoundland and Labrador Pre-K. Early learning before Kindergarten follows Navigating the Early Years: An Early
// Childhood Learning Framework (2019), whose four goals are split into numbered categories; the shared Pre-K units cite
// them ("3.1 Investigation and Thinking") (docs/research/newfoundland-and-labrador/prek/).
export const courses = preKCourses("ca-nl", {
  math: {
    bigIdeas: ["Play and Exploration: Investigation and Thinking", "Communication: Language Development"],
    standards: {
      "count-to-5": "3.1 · counting small groups of objects",
      "find-the-number": "2.1 · recognizing the written numerals 1 to 10",
      "more-or-fewer": "3.1 · comparing groups as more, fewer or the same",
      shapes: "3.1 · naming circles, squares, triangles and rectangles",
      patterns: "3.1 · copying and extending simple repeating patterns",
      "big-and-small": "3.1 · comparing size, height, length and weight",
      "sort-it": "3.1 · sorting objects by colour, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Communication: Language Development"],
    standards: {
      "letter-names": "2.1 · knowing the names of capital letters",
      "first-sounds": "2.1 · hearing the first sound in a word",
      "rhyme-time": "2.1 · playing with rhymes",
      "clap-the-parts": "2.1 · clapping the parts of spoken words",
      "listen-to-a-story": "2.1 · listening to a short story and answering questions about it",
      "word-meanings": "2.1 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Play and Exploration: Investigation and Thinking"],
    standards: {
      "five-senses": "3.1 · exploring what we see, hear, taste and feel",
      "living-or-not": "3.1 · telling living things from things that are not alive",
      "animals-and-babies": "3.1 · where animals live and how they grow",
      "weather-and-sky": "3.1 · noticing weather, day and night",
      "plants-grow": "3.1 · what plants need and how they grow from seeds",
      "sink-or-float": "3.1 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Well-Being and Belonging", "Social Contribution"],
    standards: {
      "my-family": "1.3 · knowing about myself and my family",
      feelings: "1.2 · naming feelings in myself and others",
      "community-helpers": "4.3 · people in the community and what they do",
      "places-around-me": "1.3 · familiar places in the community",
      "taking-turns": "4.3; 4.1 · taking turns, sharing and being fair",
      "first-next-last": "1.1 · daily routines in order",
      "caring-for-our-world": "4.3 · caring for our environment",
    },
  },
});
