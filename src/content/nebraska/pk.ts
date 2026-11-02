import { preKCourses } from "../prek";

// Nebraska pre-K, the year before Kindergarten. It follows Nebraska's Early Learning Guidelines: Birth to Five Learning and
// Development (Nebraska Department of Education). The guidelines give standards by developmental domain (`LL.03`, phonological
// awareness; `M.01`, quantity and counting) and their indicators carry no codes, so units cite the standards
// (docs/research/nebraska/prek/). Nebraska's guidelines have no social studies domain, so those units cite the
// social-emotional standards (`SE.05`, a sense of belonging to family and community).
export const courses = preKCourses("us-ne", {
  math: {
    bigIdeas: ["Quantity, Counting and Numbers", "Shapes and Spatial Relationships", "Patterns and Measurement", "Classification and Data"],
    standards: {
      "count-to-5": "M.01 · counting small groups and knowing how many",
      "find-the-number": "M.01 · knowing the written numbers",
      "more-or-fewer": "M.01; M.04 · comparing groups as more, fewer or the same",
      shapes: "M.02 · naming and sorting shapes",
      patterns: "M.03 · copying and extending simple patterns",
      "big-and-small": "M.03 · comparing size, length and weight",
      "sort-it": "M.04 · sorting objects into groups",
    },
  },
  language: {
    bigIdeas: ["Vocabulary", "Communicating", "Phonological Awareness", "Reading and Writing"],
    standards: {
      "letter-names": "LL.04 · knowing letters and books",
      "first-sounds": "LL.03 · hearing the first sound in a word",
      "rhyme-time": "LL.03 · hearing and making rhymes",
      "clap-the-parts": "LL.03 · clapping the syllables in words",
      "listen-to-a-story": "LL.04 · listening to a short story and answering questions about it",
      "word-meanings": "LL.01 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Concepts", "Exploration and Investigation"],
    standards: {
      "five-senses": "S.02 · exploring and observing with the senses",
      "living-or-not": "S.01 · telling living things from things that are not alive",
      "animals-and-babies": "S.01 · animals and what they need to live",
      "weather-and-sky": "S.01 · noticing weather and how it changes",
      "plants-grow": "S.01; S.02 · caring for plants and watching them grow",
      "sink-or-float": "S.02 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Self-Awareness", "Managing Emotions", "Cooperation and Prosocial Behavior", "Relationships and Belonging"],
    standards: {
      "my-family": "SE.01; SE.05 · knowing about myself and my family",
      feelings: "SE.02 · naming feelings and managing them",
      "community-helpers": "SE.05 · belonging to a community and the people in it",
      "places-around-me": "SE.05 · places and groups I belong to",
      "taking-turns": "SE.03 · taking turns, sharing and cooperating",
      "first-next-last": "SE.03 · following routines: first, next and last",
      "caring-for-our-world": "SE.03 · caring for materials and our surroundings",
    },
  },
});
