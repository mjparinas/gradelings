import { preKCourses } from "../prek";

// California Transitional Kindergarten (TK), the public school year before kindergarten. It follows the California
// Preschool/Transitional Kindergarten Learning Foundations (2024); the shared Pre-K units cite each foundation as
// "<domain> <number>" (docs/research/california/prek/).
export const courses = preKCourses("us-ca", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Measurement and Data", "Geometry and Spatial Thinking"],
    standards: {
      "count-to-5": "Mathematics 1.2; Mathematics 1.3; Mathematics 1.4 · counting small groups and seeing how many",
      "find-the-number": "Mathematics 1.5 · recognizing the written numbers",
      "more-or-fewer": "Mathematics 1.6 · comparing groups as more, fewer or the same",
      shapes: "Mathematics 4.1 · naming circles, squares, triangles and rectangles",
      patterns: "Mathematics 2.6 · copying and extending repeating patterns",
      "big-and-small": "Mathematics 3.1 · comparing size, height, length and weight",
      "sort-it": "Mathematics 2.5 · sorting objects by color, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Listening and Speaking", "Foundational Literacy Skills", "Reading"],
    standards: {
      "letter-names": "Foundational Language Development 2.4 · knowing the names of capital letters",
      "first-sounds": "Foundational Language Development 2.1 · hearing the first sound in a word",
      "rhyme-time": "Foundational Language Development 2.3 · hearing words that rhyme",
      "clap-the-parts": "Foundational Language Development 2.3 · clapping the parts of spoken words",
      "listen-to-a-story": "Foundational Language Development 3.2 · listening to a short story and answering questions about it",
      "word-meanings": "Foundational Language Development 1.1; Foundational Language Development 1.2 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Science and Engineering Practices", "Physical Science", "Life Science", "Earth and Space Science"],
    standards: {
      "five-senses": "Science 1.1 · making observations with the five senses",
      "living-or-not": "Science 3.3 · telling living things from things that are not alive",
      "animals-and-babies": "Science 3.5; Science 3.6 · where animals live and how they grow",
      "weather-and-sky": "Science 4.2; Science 4.3 · noticing weather, the sun and the moon",
      "plants-grow": "Science 3.7 · what plants need and how they grow from seeds",
      "sink-or-float": "Science 2.1; Science 2.4 · what objects are made of, how they move, sink and float",
    },
  },
  social: {
    bigIdeas: ["Self and Social Systems", "Skills for Democracy and Being a Community Member", "Time, Continuity, and Change", "Sense of Place and Environment", "Economic Systems"],
    standards: {
      "my-family": "History–Social Science 2.1; Health 2.1 · knowing about myself, my family and staying healthy",
      feelings: "Social and Emotional Development 1.3 · naming feelings in myself and others",
      "community-helpers": "History–Social Science 6.2 · people at work in the community",
      "places-around-me": "History–Social Science 5.1 · places in the community and what happens there",
      "taking-turns": "History–Social Science 3.3; Social and Emotional Development 3.1 · taking turns, sharing and being fair",
      "first-next-last": "History–Social Science 4.1 · putting daily routines in order with time words",
      "caring-for-our-world": "History–Social Science 5.4 · caring for the world and living things",
    },
  },
});
