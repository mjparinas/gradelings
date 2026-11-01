import { preKCourses } from "../prek";

// Kansas pre-K, the year before Kindergarten. It follows the Kansas Early Learning Standards; the shared Pre-K units cite
// their statements for four-year-olds, for example "M.CC.p4.4" (counting) (docs/research/kansas/prek/).
export const courses = preKCourses("us-ks", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Measurement and Data", "Geometry"],
    standards: {
      "count-to-5": "M.CC.p4.4; M.CC.p4.7 · seeing and counting small groups",
      "find-the-number": "M.CC.p4.2 · recognizing the written numbers",
      "more-or-fewer": "M.CC.p4.6 · comparing groups as more, fewer or the same",
      shapes: "M.G.p4.1 · naming and sorting circles, squares, triangles and rectangles",
      patterns: "M.OA.p3.2 · copying and extending repeating patterns",
      "big-and-small": "M.MD.p4.1; M.MD.p4.2 · comparing size, length and weight",
      "sort-it": "M.MD.p4.3 · sorting objects into groups",
    },
  },
  language: {
    bigIdeas: ["Speaking and Listening", "Language", "Literature", "Foundational Reading Skills", "Writing"],
    standards: {
      "letter-names": "CL.F.p4.1 · knowing the names of letters",
      "first-sounds": "CL.F.p4.2; CL.F.p4.3 · hearing the first sound in a word",
      "rhyme-time": "CL.F.p4.2 · hearing and making words that rhyme",
      "clap-the-parts": "CL.F.p4.2 · clapping the syllables in words",
      "listen-to-a-story": "CL.L.p4.1; CL.L.p4.2 · listening to a short story and answering questions about it",
      "word-meanings": "CL.LS.p4.3; CL.LS.p4.4 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Inquiry", "Movement and Simple Machines", "Living Things", "Environment and Climate", "Habitats and Human Impact"],
    standards: {
      "five-senses": "S.SI.p4.1 · observing with the senses",
      "living-or-not": "S.LT.p4.1 · telling living things from things that are not alive",
      "animals-and-babies": "S.LT.p4.2; S.HHI.p4.1 · animals and what they need to live",
      "weather-and-sky": "S.EC.p4.1 · noticing weather and how it changes",
      "plants-grow": "S.LT.p4.2; S.EC.p4.2 · caring for plants and watching them grow",
      "sink-or-float": "S.MS.p4.1; S.SI.p4.3 · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Community", "Economics", "Geography", "History", "Social-Emotional Development"],
    standards: {
      "my-family": "SED.PD.p4.3; SED.PD.p4.4 · knowing about myself and my family",
      feelings: "SED.PD.p4.1; SED.PD.p4.2 · naming feelings in myself and others",
      "community-helpers": "SS.C.p4.1 · how people live and work in the community",
      "places-around-me": "SS.G.p4.5; SS.G.p4.6 · places in the community and simple maps",
      "taking-turns": "SED.SD.p4.5; SED.SD.p4.6 · taking turns, sharing and following rules",
      "first-next-last": "SS.H.p4.9 · past, present and future",
      "caring-for-our-world": "SS.G.p3.6 · caring for our environment",
    },
  },
});
