import { preKCourses } from "../prek";

// Maine pre-K, the public pre-K year for four-year-olds that most school districts offer. It follows the Maine Early
// Learning and Development Standards; the shared Pre-K units cite their preschool statements, for example "CC.P.3"
// (docs/research/maine/prek/).
export const courses = preKCourses("us-me", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Geometry", "Measurement and Data"],
    standards: {
      "count-to-5": "CC.P.3; CC.P.5 · seeing and counting small groups",
      "find-the-number": "CC.P.2 · recognizing the written numbers",
      "more-or-fewer": "CC.P.8 · comparing groups as more, fewer or the same",
      shapes: "G.P.1 · naming and sorting circles, squares, triangles and rectangles",
      patterns: "MD.P.5 · copying and extending repeating patterns",
      "big-and-small": "MD.P.2 · comparing size, height, length and weight",
      "sort-it": "MD.P.1 · sorting objects by color, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Speaking and Listening", "Reading Literature", "Reading: Foundational Skills", "Language"],
    standards: {
      "letter-names": "RF.P.1 · knowing the names of letters",
      "first-sounds": "RF.P.2; RF.P.3 · hearing the first sound in a word",
      "rhyme-time": "RF.P.2 · hearing and making words that rhyme",
      "clap-the-parts": "RF.P.2 · clapping the syllables in words",
      "listen-to-a-story": "RL.P.1; RL.P.2 · listening to a short story and answering questions about it",
      "word-meanings": "LA.P.4 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Physical Science", "Earth Science", "Life Science"],
    standards: {
      "five-senses": "LS.P.1; PS.P.1 · observing with the senses",
      "living-or-not": "LS.P.1; LS.P.4 · telling living things from things that are not alive",
      "animals-and-babies": "LS.P.4; LS.P.2 · animals and what they need to live",
      "weather-and-sky": "ES.P.1; ES.P.3 · noticing weather and how it changes",
      "plants-grow": "LS.P.3; LS.P.1 · caring for plants and watching them grow",
      "sink-or-float": "PS.P.2; PS.P.3 · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social and Emotional Development", "Civics and Government", "Economics", "Geography", "History"],
    standards: {
      "my-family": "H.P.4; H.P.3 · knowing about myself and my family",
      feelings: "ED.P.22; ED.P.20 · naming feelings in myself and others",
      "community-helpers": "SSG.P.4 · how people live and work in the community",
      "places-around-me": "SSG.P.2; SSG.P.1 · places in the community and simple maps",
      "taking-turns": "SD.P.6; CG.P.1 · taking turns, sharing and following rules",
      "first-next-last": "H.P.1 · past, present and future",
      "caring-for-our-world": "CG.P.5; SSG.P.3 · caring for our environment",
    },
  },
});
