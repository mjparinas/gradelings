import { preKCourses } from "../prek";

// North Carolina pre-K, the NC Pre-K year for four-year-olds in public schools, Head Start and licensed child care
// centers. It follows North Carolina Foundations for Early Learning and Development; the shared Pre-K units cite their
// preschool indicators, for example "CD-10o" (docs/research/north-carolina/prek/).
export const courses = preKCourses("us-nc", {
  math: {
    bigIdeas: ["Numbers and Quantities", "Comparing, Sorting and Patterns", "Shapes and Position", "Mathematical Problem Solving"],
    standards: {
      "count-to-5": "CD-10o; CD-10k · seeing and counting small groups",
      "find-the-number": "CD-10u; CD-10v · recognizing the written numbers",
      "more-or-fewer": "CD-10r; CD-10l · comparing groups as more, fewer or the same",
      shapes: "CD-12m; CD-12j · naming circles, squares, triangles and rectangles",
      patterns: "CD-11q; CD-11k · copying and extending repeating patterns",
      "big-and-small": "CD-11h; CD-11n; CD-11o · comparing size, height, length and weight",
      "sort-it": "CD-11p; CD-11j · sorting objects by color, size, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Learning to Communicate", "Vocabulary", "Foundations for Reading", "Phonological Awareness and the Alphabet"],
    standards: {
      "letter-names": "LDC-12d; LDC-12g · knowing the names of letters",
      "first-sounds": "LDC-11l; LDC-12i · hearing the first sound in a word",
      "rhyme-time": "LDC-11k; LDC-11h · hearing and making words that rhyme",
      "clap-the-parts": "LDC-11j; LDC-11g · clapping the beats and parts of words",
      "listen-to-a-story": "LDC-9t; LDC-9n; LDC-8l · listening to a short story and answering questions about it",
      "word-meanings": "LDC-7p; LDC-7l · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Using the Senses", "Living Things", "Weather and the Physical World", "Scientific Exploration"],
    standards: {
      "five-senses": "CD-1i; CD-15j · using the senses to learn about the world",
      "living-or-not": "CD-14g; CD-14k · noticing what living things are like",
      "animals-and-babies": "CD-14g · describing animals, how they look and act",
      "weather-and-sky": "CD-14o; CD-14h · weather, the sun and moon, and the seasons",
      "plants-grow": "CD-14m; CD-14e · what plants need to live and grow",
      "sink-or-float": "CD-15r; CD-14i · predicting and testing what materials sink or float",
    },
  },
  social: {
    bigIdeas: ["Social Connections", "Developing a Sense of Self", "Getting Along with Others", "Learning About Feelings"],
    standards: {
      "my-family": "CD-6h; CD-6k · family members and family routines",
      feelings: "ESD-6m; ESD-6q; ESD-7m · naming feelings and noticing how others feel",
      "community-helpers": "CD-6j; CD-6m · the roles of community helpers",
      "places-around-me": "CD-9b; CD-9f · the places where we live and play",
      "taking-turns": "ESD-4p; ESD-5q; CD-9j · sharing, taking turns and following rules",
      "first-next-last": "CD-9c; CD-9g · noticing what changes over time, first and later",
      "caring-for-our-world": "CD-14q; CD-14j · helping to care for the environment",
    },
  },
});
