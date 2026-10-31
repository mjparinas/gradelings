import { preKCourses } from "../prek";

// Arkansas pre-K, the Arkansas Better Chance pre-K year for four-year-olds in schools and community programs. It follows
// the Arkansas Child Development and Early Learning Standards (Pre-K 3 and Pre-K 4); the shared Pre-K units cite their
// goals, for example "MT1.1" (docs/research/arkansas/prek/).
export const courses = preKCourses("us-ar", {
  math: {
    bigIdeas: ["Number Concepts and Operations", "Algebraic Thinking", "Measurement and Comparison", "Geometry and Spatial Sense"],
    standards: {
      "count-to-5": "MT1.1 · seeing and counting small groups",
      "find-the-number": "MT1.1 · recognizing the written numbers",
      "more-or-fewer": "MT1.1; MT1.2 · comparing groups as more, fewer or the same",
      shapes: "MT4.1 · naming circles, squares, triangles and rectangles",
      patterns: "MT2.1 · copying and extending repeating patterns",
      "big-and-small": "MT3.1 · comparing size, height, length and weight",
      "sort-it": "MT2.1 · sorting objects by color, shape and size",
    },
  },
  language: {
    bigIdeas: ["Receptive and Expressive Language", "Phonological Awareness", "Books, Print and Letters", "Understanding Stories"],
    standards: {
      "letter-names": "EL3.2 · knowing the names of letters",
      "first-sounds": "EL2.1; EL3.2 · hearing the first sound in a word",
      "rhyme-time": "EL2.1 · hearing and making words that rhyme",
      "clap-the-parts": "EL2.1 · clapping the syllables in words",
      "listen-to-a-story": "EL1.2; LD1.1 · listening to a short story and answering questions about it",
      "word-meanings": "LD2.1 · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Scientific Practices", "Science Concepts", "Living Things, the Earth and Materials"],
    standards: {
      "five-senses": "ST1.1 · using the senses to observe and collect information",
      "living-or-not": "ST3.1 · the characteristics of living things",
      "animals-and-babies": "ST3.1 · how animals grow and are like their parents",
      "weather-and-sky": "ST3.1; ST2.1 · the weather, the sky and the earth's environment",
      "plants-grow": "ST3.1 · how plants grow and what they need",
      "sink-or-float": "ST1.1; ST3.1 · testing what objects and materials sink or float",
    },
  },
  social: {
    bigIdeas: ["Family, Community and Culture", "History and Geography", "Emotional Expression", "Relationships with Others"],
    standards: {
      "my-family": "SS1.1; SE3.1 · being part of a family",
      feelings: "SE2.1; SE2.2 · naming your own feelings and noticing others' feelings",
      "community-helpers": "SS1.1 · the people who help in a community",
      "places-around-me": "SS2.2 · simple maps, places and where things are",
      "taking-turns": "SE1.2 · playing with others, sharing and taking turns",
      "first-next-last": "SS2.1 · putting events in order and noticing change over time",
      "caring-for-our-world": "SS2.2; SS1.1 · caring for the places we share",
    },
  },
});
