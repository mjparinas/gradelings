import { preKCourses } from "../prek";

// New York Pre-K for four-year-olds. It follows the New York State Prekindergarten Learning Standards (2019); the
// shared Pre-K units cite them by code (docs/research/new-york/prek/).
export const courses = preKCourses("us-ny", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Measurement and Data", "Geometry"],
    standards: {
      "count-to-5": "PK.MATH.3a; PK.MATH.3b; PK.MATH.4a · counting small groups and seeing how many",
      "find-the-number": "PK.MATH.2 · matching written numerals to small groups",
      "more-or-fewer": "PK.MATH.6 · comparing groups as more, fewer or the same",
      shapes: "PK.MATH.13 · naming shapes whatever their size",
      patterns: "PK.MATH.9 · copying and extending simple patterns",
      "big-and-small": "PK.MATH.10 · comparing size, length and weight",
      "sort-it": "PK.MATH.11 · sorting objects and shapes into groups",
    },
  },
  language: {
    bigIdeas: ["Reading Foundations", "Reading", "Speaking and Listening", "Language"],
    standards: {
      "letter-names": "PK.ELAL.1 · knowing the names of capital letters",
      "first-sounds": "PK.ELAL.2 · hearing the first sound in a word",
      "rhyme-time": "PK.ELAL.2 · hearing words that rhyme",
      "clap-the-parts": "PK.ELAL.2 · clapping the parts of spoken words",
      "listen-to-a-story": "PK.ELAL.7 · answering questions about the characters and events in a story",
      "word-meanings": "PK.ELAL.28; PK.AC.4 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Physical Science", "Life Science", "Earth and Space Science", "Engineering Design"],
    standards: {
      "five-senses": "PK.PDH.1 · using the five senses to learn",
      "living-or-not": "PK.SCI.4 · telling living things from things that are not alive",
      "animals-and-babies": "PK.SCI.6 · how young animals are like their parents",
      "weather-and-sky": "PK.SCI.7; PK.SCI.8 · noticing weather, the sun and the moon",
      "plants-grow": "PK.SCI.4 · what plants need and how they grow from seeds",
      "sink-or-float": "PK.SCI.1; PK.SCI.2 · what objects are made of and how they move, sink and float",
    },
  },
  social: {
    bigIdeas: ["Self, Family and Community", "Civics and Rules", "Geography", "Change Over Time", "Economics"],
    standards: {
      "my-family": "PK.SOC.1; PK.PDH.7 · knowing about myself, my family and taking care of my body",
      feelings: "PK.SEL.1; PK.SEL.2 · naming feelings and calming down",
      "community-helpers": "PK.SOC.3 · roles and jobs of people in the community",
      "places-around-me": "PK.SOC.5 · places in the community and what happens there",
      "taking-turns": "PK.SEL.4; PK.SEL.5 · sharing, taking turns and solving problems kindly",
      "first-next-last": "PK.SEL.6; PK.SOC.6 · daily routines in order, and then and now",
      "caring-for-our-world": "PK.SOC.3 · taking care of shared places and the environment",
    },
  },
});
