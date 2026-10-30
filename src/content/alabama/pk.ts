import { preKCourses } from "../prek";

// Alabama pre-K, the First Class Pre-K year for four-year-olds. It follows the Alabama Standards for Early Learning and
// Development (ASELD, revised 2023); the shared Pre-K units cite the older-preschooler (48 to 60 months) indicators as
// "domain.indicator" (docs/research/alabama/prek/).
export const courses = preKCourses("us-al", {
  math: {
    bigIdeas: ["Number Relationships", "Counting and Number Sense", "Sets and Patterns", "Shapes", "Measurement and Time"],
    standards: {
      "count-to-5": "MAT.1aOP-3; MAT.1bOP-5 · seeing and counting small groups to 5",
      "find-the-number": "MAT.1aOP-4 · recognizing the written numbers",
      "more-or-fewer": "MAT.1aOP-2 · comparing groups as more, fewer or the same",
      shapes: "MAT.3bOP-1 · naming circles, squares, triangles and rectangles",
      patterns: "MAT.2cOP-2 · copying and extending repeating patterns",
      "big-and-small": "MAT.4aOP-1; MAT.4aOP-3 · comparing size, height, length and weight",
      "sort-it": "MAT.2bOP-1; MAT.2bOP-4 · sorting objects by color, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Receptive and Expressive Language", "Comprehension", "Phonological Awareness", "Alphabet Knowledge"],
    standards: {
      "letter-names": "LLT.2cOP-1 · knowing the names of letters",
      "first-sounds": "LLT.2bOP-3 · hearing the first sound in a word",
      "rhyme-time": "LLT.2bOP-2 · hearing and making words that rhyme",
      "clap-the-parts": "LLT.2bOP-4 · clapping the syllables in words",
      "listen-to-a-story": "LLT.1aOP-2; LLT.2aOP-5 · listening to a short story and answering questions about it",
      "word-meanings": "LLT.1bOP-3 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Inquiry", "Biological Science", "Physical Science", "Earth and Space Science"],
    standards: {
      "five-senses": "SEK.1aOP-1 · observing with the five senses",
      "living-or-not": "SEK.1bOP-1 · telling living things from things that are not alive",
      "animals-and-babies": "SEK.1bOP-4; SEK.1eOP-4 · where animals live and how they grow",
      "weather-and-sky": "SEK.1dOP-3; SEK.1dOP-4 · noticing weather, the sun, the moon and the stars",
      "plants-grow": "SEK.1bOP-2; SEK.1bOP-4 · what plants need and how they grow",
      "sink-or-float": "SEK.1aOP-4; SEK.1aOP-3 · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social-Emotional Development", "Family and Community", "Economics", "History", "Environment and Ecology"],
    standards: {
      "my-family": "SST.1aOP-2; SST.1aOP-3 · knowing about myself and my family",
      feelings: "SED.2aOP-1; SED.2aOP-4 · naming feelings in myself and others",
      "community-helpers": "SST.2aOP-2 · community helpers and the work they do",
      "places-around-me": "SST.2bOP-1; SST.1bOP-1 · places and groups around me",
      "taking-turns": "SED.3bOP-4; SST.1bOP-3 · taking turns, sharing and following rules",
      "first-next-last": "SST.2cOP-1; SST.2cOP-4 · daily routines in order",
      "caring-for-our-world": "SEK.1eOP-2; SEK.1eOP-3 · caring for our environment",
    },
  },
});
