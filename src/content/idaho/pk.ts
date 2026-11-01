import { preKCourses } from "../prek";

// Idaho pre-K, the year before Kindergarten. It follows the Idaho Early Learning eGuidelines; the shared Pre-K units cite
// their goals, for example "G.39" (understanding numbers) (docs/research/idaho/prek/).
export const courses = preKCourses("us-id", {
  math: {
    bigIdeas: ["Numbers and Number Sense", "Measurement", "Patterns and Relations"],
    standards: {
      "count-to-5": "G.39 · counting and understanding small numbers",
      "find-the-number": "G.39 · recognizing numbers and what they stand for",
      "more-or-fewer": "G.39 · comparing groups as more, fewer or the same",
      shapes: "G.41 · noticing how shapes are alike and different",
      patterns: "G.41 · copying and extending repeating patterns",
      "big-and-small": "G.40 · comparing size, height, length and weight",
      "sort-it": "G.41 · sorting objects into groups by what they share",
    },
  },
  language: {
    bigIdeas: ["Listening and Understanding", "Speaking and Vocabulary", "Phonological Awareness", "Letters and Print"],
    standards: {
      "letter-names": "G.57 · knowing the names of letters",
      "first-sounds": "G.56 · hearing the first sound in a word",
      "rhyme-time": "G.56 · hearing and making words that rhyme",
      "clap-the-parts": "G.56 · clapping the syllables in words",
      "listen-to-a-story": "G.59 · listening to a short story and answering questions about it",
      "word-meanings": "G.51; G.52 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Exploring the Natural World", "Asking Questions and Predicting"],
    standards: {
      "five-senses": "G.42 · observing with the senses",
      "living-or-not": "G.42 · telling living things from things that are not alive",
      "animals-and-babies": "G.42 · animals and what they need to live",
      "weather-and-sky": "G.42 · noticing weather and how it changes",
      "plants-grow": "G.42; G.43 · caring for plants and watching them grow",
      "sink-or-float": "G.43 · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social Skills", "Self-Regulation", "People, Places and Community", "Rights and Responsibilities"],
    standards: {
      "my-family": "G.44 · knowing about myself and my family",
      feelings: "G.38 · naming feelings in myself and others",
      "community-helpers": "G.44 · how people live and work in the community",
      "places-around-me": "G.44 · places in the community and simple maps",
      "taking-turns": "G.31; G.45 · taking turns, sharing and following rules",
      "first-next-last": "G.44 · past, present and future",
      "caring-for-our-world": "G.45 · caring for our environment",
    },
  },
});
