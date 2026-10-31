import { preKCourses } from "../prek";

// Wisconsin 4K, the four-year-old kindergarten year most school districts offer, often with community partners. It
// follows the Wisconsin Model Early Learning Standards (4th edition); the shared Pre-K units cite their performance
// standards with the domain, for example "V.B.EL.1" (docs/research/wisconsin/prek/). The standards have no social
// studies domain, so the social units cite social and emotional development and the closest mathematical thinking.
export const courses = preKCourses("us-wi", {
  math: {
    bigIdeas: ["Numbers and Counting", "Number Operations and Relationships", "Shapes and Spatial Relationships", "Comparing, Patterning and Measuring"],
    standards: {
      "count-to-5": "V.B.EL.1 · seeing and counting small groups",
      "find-the-number": "V.B.EL.1 · recognizing the written numbers",
      "more-or-fewer": "V.B.EL.2 · comparing groups as more, fewer or the same",
      shapes: "V.B.EL.3 · naming and describing shapes",
      patterns: "V.B.EL.4 · copying and extending repeating patterns",
      "big-and-small": "V.B.EL.4; V.B.EL.5 · comparing size, height, length and weight",
      "sort-it": "V.B.EL.4; V.B.EL.6 · sorting and grouping objects by what they share",
    },
  },
  language: {
    bigIdeas: ["Listening and Understanding", "Speaking and Communicating", "Early Literacy"],
    standards: {
      "letter-names": "III.C.EL.2 · knowing the names of letters",
      "first-sounds": "III.C.EL.1; III.C.EL.2 · hearing the first sound in a word",
      "rhyme-time": "III.C.EL.1 · hearing and making words that rhyme",
      "clap-the-parts": "III.C.EL.1 · clapping the syllables in words",
      "listen-to-a-story": "III.C.EL.3; III.A.EL.1 · listening to a short story and answering questions about it",
      "word-meanings": "III.B.EL.2b; III.A.EL.1 · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Exploration and Thinking", "Scientific Thinking"],
    standards: {
      "five-senses": "V.A.EL.1; V.C.EL.1 · using the senses to observe",
      "living-or-not": "V.C.EL.1; V.C.EL.2 · observing and comparing things, such as living and not living",
      "animals-and-babies": "V.C.EL.1 · observing animals and how they grow",
      "weather-and-sky": "V.C.EL.1; V.C.EL.3 · watching the weather and the sky and predicting what comes next",
      "plants-grow": "V.C.EL.3; V.C.EL.4 · predicting and watching how plants grow",
      "sink-or-float": "V.C.EL.3; V.C.EL.4 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Emotional Development", "Self-Concept", "Social Competence", "Family and Culture"],
    standards: {
      "my-family": "IV.C.EL.2; II.B.EL.2 · learning within a family and its culture",
      feelings: "II.A.EL.1; II.A.EL.2 · naming feelings and responding to others' feelings",
      "community-helpers": "II.C.EL.2; IV.C.EL.1 · getting to know people and practices in the community",
      "places-around-me": "V.B.EL.3 · words for where things are",
      "taking-turns": "II.C.EL.4; II.C.EL.3 · sharing, following rules and solving conflicts",
      "first-next-last": "V.B.EL.5 · putting time and events in order",
      "caring-for-our-world": "II.C.EL.3 · caring for shared things and following expectations",
    },
  },
});
