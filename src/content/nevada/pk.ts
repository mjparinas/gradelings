import { preKCourses } from "../prek";

// Nevada pre-K, the state-funded pre-K year for four-year-olds in school districts and community programs. It follows
// the Nevada Pre-Kindergarten Standards (revised 2023); the shared Pre-K units cite their indicators, for example
// "M.NQ.PK8" (docs/research/nevada/prek/).
export const courses = preKCourses("us-nv", {
  math: {
    bigIdeas: ["Numbers, Numerals and Quantity", "Patterns and Operations", "Measurement", "Geometry and Spatial Sense"],
    standards: {
      "count-to-5": "M.NQ.PK8; M.NQ.PK7 · seeing and counting small groups",
      "find-the-number": "M.NQ.PK12; M.NQ.PK13 · recognizing the written numbers",
      "more-or-fewer": "M.NQ.PK11 · comparing groups as more, fewer or the same",
      shapes: "M.GS.PK1; M.GS.PK3 · naming circles, squares, triangles and rectangles",
      patterns: "M.PO.PK2 · copying and extending repeating patterns",
      "big-and-small": "M.ME.PK1; M.ME.PK2 · comparing size, height, length and weight",
      "sort-it": "M.PO.PK1 · sorting objects by size and shape",
    },
  },
  language: {
    bigIdeas: ["Listening and Speaking", "Vocabulary", "Alphabet Knowledge and Phonological Awareness", "Comprehension"],
    standards: {
      "letter-names": "L.AK.PK2 · knowing the names of letters",
      "first-sounds": "L.PA.PK2; L.PA.PK3 · hearing the first sound in a word",
      "rhyme-time": "L.PA.PK1 · hearing and repeating words that rhyme",
      "clap-the-parts": "L.PA.PK4 · hearing the parts of short and long words",
      "listen-to-a-story": "L.C.PK1; L.C.PK2; L.RC.PK4 · listening to a short story and answering questions about it",
      "word-meanings": "L.V.PK4; L.V.PK5 · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Exploring and Observing", "Scientific Inquiry", "Analyzing and Concluding", "Communicating in Science"],
    standards: {
      "five-senses": "S.EO.PK1 · using the five senses to observe",
      "living-or-not": "S.EO.PK3 · grouping things by what they have in common, such as living or not living",
      "animals-and-babies": "S.SC.PK4; S.EO.PK3 · describing animals and noticing how young animals are like their parents",
      "weather-and-sky": "S.EO.PK4; S.SC.PK2 · watching the weather and the sky and predicting what comes next",
      "plants-grow": "S.SI.PK3; S.AC.PK2 · watching plants grow and what they need",
      "sink-or-float": "S.EO.PK4; S.SI.PK3 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Individual Development and Identity", "Civic Ideals and Practices", "Geography", "Time and Change"],
    standards: {
      "my-family": "SS.ID.PK2; SS.ID.PK4 · being part of a family and its traditions",
      feelings: "SS.ID.PK1; A.EL.PK3 · knowing yourself and naming feelings like proud and happy",
      "community-helpers": "SS.CI.PK7 · the roles of community helpers",
      "places-around-me": "SS.GH.PK2; SS.GH.PK1 · home, school and the community, and words for where things are",
      "taking-turns": "SS.CI.PK6; SS.CI.PK4; SS.CI.PK3 · working together, following group rules and solving problems kindly",
      "first-next-last": "SS.TC.PK1 · describing a sequence of events",
      "caring-for-our-world": "SS.GH.PK7 · taking care of the world around us",
    },
  },
});
