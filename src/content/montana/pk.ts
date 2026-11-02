import { preKCourses } from "../prek";

// Montana pre-K, the year before Kindergarten. It follows the Montana Early Learning Standards (Montana Office of Public
// Instruction), numbered by domain (`Std 3.5`, Language and Literacy; `Std 4.10`, numbers). Their benchmarks and indicators carry
// no codes, so units cite the standards (docs/research/montana/prek/).
export const courses = preKCourses("us-mt", {
  math: {
    bigIdeas: ["Numbers and Counting", "Measurement", "Data", "Patterns and Shapes"],
    standards: {
      "count-to-5": "Std 4.10 · counting small groups and knowing how many",
      "find-the-number": "Std 4.10 · knowing the written numbers",
      "more-or-fewer": "Std 4.10; Std 4.12 · comparing groups as more, fewer or the same",
      shapes: "Std 4.14 · naming and sorting shapes",
      patterns: "Std 4.13 · copying and extending patterns",
      "big-and-small": "Std 4.11 · comparing size, length and weight",
      "sort-it": "Std 4.12 · sorting and comparing objects",
    },
  },
  language: {
    bigIdeas: ["Listening and Understanding", "Communicating", "Reading and Print", "Writing"],
    standards: {
      "letter-names": "Std 3.8 · knowing letters and the sounds they make",
      "first-sounds": "Std 3.8 · hearing the first sound in a word",
      "rhyme-time": "Std 3.5 · hearing the sounds and rhythms of words, including rhymes",
      "clap-the-parts": "Std 3.5 · clapping the syllables in words",
      "listen-to-a-story": "Std 3.1 · listening to a short story and answering questions about it",
      "word-meanings": "Std 3.2 · using new words for a variety of purposes",
    },
  },
  science: {
    bigIdeas: ["Scientific Inquiry", "Living Things", "Physical World", "Earth and Environment"],
    standards: {
      "five-senses": "Std 4.15 · exploring and observing with the senses",
      "living-or-not": "Std 4.16 · telling living things from things that are not alive",
      "animals-and-babies": "Std 4.16 · animals and what they need to live",
      "weather-and-sky": "Std 4.18 · noticing weather and the sky",
      "plants-grow": "Std 4.16 · caring for plants and watching them grow",
      "sink-or-float": "Std 4.17 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Family and Community", "Self and Relationships", "Time and Place", "Our Environment"],
    standards: {
      "my-family": "Std 1.2 · knowing about myself and my family",
      feelings: "Std 1.7 · naming feelings in myself and others",
      "community-helpers": "Std 1.3 · how people live and work in the community",
      "places-around-me": "Std 4.21 · places and what makes each one special",
      "taking-turns": "Std 1.9 · taking turns, sharing and getting along with friends",
      "first-next-last": "Std 4.20 · past, present and future: first, next and last",
      "caring-for-our-world": "Std 4.22 · caring for our surroundings and the natural world",
    },
  },
});
