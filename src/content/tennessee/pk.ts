import { preKCourses } from "../prek";

// Tennessee pre-K, the Voluntary Pre-K year for four-year-olds in public schools and community programs. It follows
// the Tennessee Early Learning Developmental Standards (2018); the shared Pre-K units cite their standards for
// four-year-olds by their own codes (docs/research/tennessee/prek/).
export const courses = preKCourses("us-tn", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Measurement and Data", "Geometry"],
    standards: {
      "count-to-5": "PK.CC.B.5.a; PK.CC.B.4.a; PK.CC.B.4.b · seeing and counting small groups",
      "find-the-number": "PK.CC.A.4 · naming the numerals 0 to 10",
      "more-or-fewer": "PK.CC.C.6 · comparing groups as more, less or equal",
      shapes: "PK.G.A.2; PK.G.A.4 · naming two-dimensional shapes",
      patterns: "PK.MD.C.4 · sorting by attributes, the first step to seeing what repeats (the 2018 standards have no pattern standard)",
      "big-and-small": "PK.MD.A.1; PK.MD.A.2 · comparing size, height, length and weight",
      "sort-it": "PK.MD.C.4 · sorting objects into groups",
    },
  },
  language: {
    bigIdeas: ["Print Concepts", "Phonological Awareness", "Vocabulary Acquisition", "Reading Literature"],
    standards: {
      "letter-names": "PK.FL.PC.1.d · recognizing uppercase and lowercase letters",
      "first-sounds": "PK.FL.PA.2.e; PK.FL.PWR.3.a · hearing the first sound in a word",
      "rhyme-time": "PK.FL.PA.2.a · hearing rhyming words",
      "clap-the-parts": "PK.FL.PA.2.b · saying and clapping the syllables in words",
      "listen-to-a-story": "PK.RL.KID.1; PK.RL.KID.3 · listening to a story and answering questions about it",
      "word-meanings": "PK.FL.VA.7b.1; PK.FL.VA.7b.2 · sorting words into groups and knowing common verbs and adjectives",
    },
  },
  science: {
    bigIdeas: ["Physical Science", "Life Science", "Earth Science", "Engineering, Technology and Science"],
    standards: {
      "five-senses": "PK.LS1.01c; PK.ETS1.01a · the five senses",
      "living-or-not": "PK.LS1.01b · telling living things from non-living things",
      "animals-and-babies": "PK.LS1.01a; PK.ESS3.01a · what living things are like and where they live",
      "weather-and-sky": "PK.ESS2.01b · weather and the seasons",
      "plants-grow": "PK.LS1.01a; PK.ESS3.01a · what plants are like and where they grow",
      "sink-or-float": "PK.PS1.01a; PK.ETS1.01c · predicting and describing what objects do",
    },
  },
  social: {
    bigIdeas: ["Culture", "Economics", "Geography", "Government and Civics", "History"],
    standards: {
      "my-family": "PK.01; PK.02 · home, family and family customs",
      feelings: "PK.SL.PKI.6 · expressing thoughts and feelings in words",
      "community-helpers": "PK.06; PK.14 · jobs and roles at home, in school and in the community",
      "places-around-me": "PK.08; PK.09 · direction words and what a map shows",
      "taking-turns": "PK.15; PK.AL.CB.13; PK.AL.CB.14 · rules, playing together and solving problems with others",
      "first-next-last": "PK.17 · words about time",
      "caring-for-our-world": "PK.04; PK.ESS3.01c · meeting needs and using the Earth's water and materials",
    },
  },
});
