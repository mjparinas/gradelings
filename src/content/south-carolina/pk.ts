import { preKCourses } from "../prek";

// South Carolina 4K, the full-day pre-K year for four-year-olds (CERDEP) in public schools and approved community
// programs. It follows the South Carolina Early Learning Standards (2017); the shared Pre-K units cite their Older
// Preschoolers indicators, for example "MTE-1z" (docs/research/south-carolina/prek/).
export const courses = preKCourses("us-sc", {
  math: {
    bigIdeas: ["Number Sense", "Algebraic Thinking", "Geometry and Spatial Understanding", "Measurement and Data"],
    standards: {
      "count-to-5": "MTE-1z; MTE-1u · seeing and counting small groups",
      "find-the-number": "MTE-1v; MTE-1w · recognizing the written numbers",
      "more-or-fewer": "MTE-1q; MTE-1r · comparing groups as more, fewer or the same",
      shapes: "MTE-4o; MTE-4n · naming circles, squares, triangles and other shapes",
      patterns: "MTE-3i · copying and extending repeating patterns",
      "big-and-small": "MTE-5l; MTE-5m; MTE-5k · comparing size, height, length and weight",
      "sort-it": "MTE-3h · sorting objects by color, size, shape or quantity",
    },
  },
  language: {
    bigIdeas: ["Learning to Communicate", "Vocabulary", "Foundations for Reading", "Phonological Awareness and the Alphabet"],
    standards: {
      "letter-names": "LDC-12g · knowing the names of letters",
      "first-sounds": "LDC-11n; LDC-12i · hearing the first sound in a word",
      "rhyme-time": "LDC-11m; LDC-11k · hearing and making words that rhyme",
      "clap-the-parts": "LDC-11l · clapping the beats and parts of words",
      "listen-to-a-story": "LDC-10t; LDC-10u; LDC-8o · listening to a short story and answering questions about it",
      "word-meanings": "LDC-7q; LDC-7r · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Thinking and Reasoning", "Living Things", "Weather and the Physical World", "Scientific Exploration"],
    standards: {
      "five-senses": "CD-1m; CD-10l · learning about the world through the senses",
      "living-or-not": "CD-10k; CD-11p · classifying things from nature by what they are like",
      "animals-and-babies": "CD-10m; CD-10n · what animals need and caring for living things",
      "weather-and-sky": "CD-10o · weather, the sun and moon, and the seasons",
      "plants-grow": "CD-10m · what plants need to live and grow",
      "sink-or-float": "CD-11r; CD-10p · predicting and testing what materials sink or float",
    },
  },
  social: {
    bigIdeas: ["Social Connections", "Developing a Sense of Self", "Learning about Feelings", "Getting Along with Others"],
    standards: {
      "my-family": "CD-6k; CD-8g · family members and different kinds of families",
      feelings: "ESD-6q; ESD-6r; ESD-7n · naming feelings and understanding how others feel",
      "community-helpers": "CD-6m · the roles of community helpers",
      "places-around-me": "CD-9f · the places where we live and play",
      "taking-turns": "ESD-4p; ESD-5r; CD-9j · sharing, taking turns and following rules",
      "first-next-last": "CD-9g · changes over time in ourselves and our families",
      "caring-for-our-world": "CD-10q · helping to care for the environment",
    },
  },
});
