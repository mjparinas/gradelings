import { preKCourses } from "../prek";

// Michigan pre-K, the Great Start Readiness Program year for four-year-olds in schools and community programs. It
// follows Michigan's Early Childhood Standards of Quality for Birth to Kindergarten (2022); the shared Pre-K units cite
// their 3 to 5 years early learning expectations with the domain, for example "Mathematics 2b"
// (docs/research/michigan/prek/).
export const courses = preKCourses("us-mi", {
  math: {
    bigIdeas: ["Number and Quantity", "Shapes and Spatial Relationships", "Patterns and Ordering", "Measurement", "Sorting and Classifying"],
    standards: {
      "count-to-5": "Mathematics 2b; Mathematics 2a · seeing and counting small groups",
      "find-the-number": "Mathematics 1b; Mathematics 2a · recognizing the written numbers",
      "more-or-fewer": "Mathematics 2c · comparing groups as more, fewer or the same",
      shapes: "Mathematics 3b · naming circles, squares, triangles and rectangles",
      patterns: "Mathematics 4a · copying and extending repeating patterns",
      "big-and-small": "Mathematics 5b; Mathematics 4b · comparing size, height, length and weight",
      "sort-it": "Mathematics 6b; Mathematics 6a · sorting things into groups",
    },
  },
  language: {
    bigIdeas: ["Language and Vocabulary", "Letters and Sounds", "Sounds of Language", "Understanding Text"],
    standards: {
      "letter-names": "Language 5a · knowing the names of letters",
      "first-sounds": "Language 6b; Language 5b · hearing the first sound in a word",
      "rhyme-time": "Language 6a · hearing and playing with rhymes",
      "clap-the-parts": "Language 6b · clapping the syllables in words",
      "listen-to-a-story": "Language 7b · listening to a short story and answering questions about it",
      "word-meanings": "Language 2b · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Scientific Thinking", "Physical Science", "Earth Science", "Living and Non-Living Things"],
    standards: {
      "five-senses": "Science 1a; Science 1c · observing the world with the senses",
      "living-or-not": "Science 4c · telling living things from things that are not alive",
      "animals-and-babies": "Science 4a · animals and their life cycles",
      "weather-and-sky": "Science 3b; Science 3c · weather and the seasons",
      "plants-grow": "Science 4a · how plants grow and change",
      "sink-or-float": "Science 1b; Science 1d · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Self and Family", "Community", "Place and Time", "Social and Emotional Development"],
    standards: {
      "my-family": "Social Studies 1b; Social Studies 1d · being part of a family and its traditions",
      feelings: "Social-Emotional 2a; Social-Emotional 3a · naming your own feelings and others' feelings",
      "community-helpers": "Social Studies 2b; Social Studies 1c · how people in the community meet each other's needs",
      "places-around-me": "Social Studies 3b · words for places and where things are",
      "taking-turns": "Social-Emotional 4d; Social-Emotional 5a; Social Studies 2a · taking turns, being fair and solving conflicts",
      "first-next-last": "Social Studies 3c · the passage of time in daily life",
      "caring-for-our-world": "Social Studies 3a · caring for nature",
    },
  },
});
