import { preKCourses } from "../prek";

// Florida Pre-K, the free Voluntary Prekindergarten (VPK) year for four-year-olds. It follows the Florida Early Learning
// and Developmental Standards for 4 Years Old to Kindergarten (2017); the shared Pre-K units cite their standards as
// "domain.component.standard" (docs/research/florida/prek/).
export const courses = preKCourses("us-fl", {
  math: {
    bigIdeas: ["Number Sense", "Number and Operations", "Patterns", "Geometry", "Spatial Relations", "Measurement and Data"],
    standards: {
      "count-to-5": "V.A.1; V.A.4 · seeing and counting small groups to 5",
      "find-the-number": "V.A.7 · recognizing the written numbers",
      "more-or-fewer": "V.A.6 · comparing groups as more, fewer or the same",
      shapes: "V.D.1 · naming circles, squares, triangles and rectangles",
      patterns: "V.C.1; V.C.2 · copying and extending repeating patterns",
      "big-and-small": "V.F.2; V.F.3 · comparing size, height, length and weight",
      "sort-it": "V.D.2 · sorting objects by color, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Listening and Understanding", "Vocabulary", "Emergent Reading"],
    standards: {
      "letter-names": "IV.F.3 · knowing the names of capital letters",
      "first-sounds": "IV.F.2 · hearing the first sound in a word",
      "rhyme-time": "IV.F.2 · hearing words that rhyme",
      "clap-the-parts": "IV.F.2 · clapping the parts of spoken words",
      "listen-to-a-story": "IV.A.1; IV.F.4 · listening to a short story and answering questions about it",
      "word-meanings": "IV.C.1 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Inquiry Through Exploration and Discovery", "Life Science", "Physical Science", "Earth and Space Science"],
    standards: {
      "five-senses": "VI.A.1 · observing with the five senses",
      "living-or-not": "VI.B.1 · telling living things from things that are not alive",
      "animals-and-babies": "VI.B.1 · where animals live and how they grow",
      "weather-and-sky": "VI.D.1 · noticing weather, day and night",
      "plants-grow": "VI.B.1 · what plants need and how they grow from seeds",
      "sink-or-float": "VI.C.1; VI.A.3 · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social and Emotional Development", "Culture", "Individuals and Groups", "Spaces, Places and Environments", "Time, Continuity and Change"],
    standards: {
      "my-family": "VII.B.1; VII.A.1 · knowing about myself and my family",
      feelings: "III.A.1; III.C.4 · naming feelings in myself and others",
      "community-helpers": "VII.C.2; VII.G.2 · people in the community and the work they do",
      "places-around-me": "VII.D.2 · places in the community and what happens there",
      "taking-turns": "III.C.2; VII.F.1 · taking turns, making friends and following rules",
      "first-next-last": "VII.E.1 · daily routines in order",
      "caring-for-our-world": "VII.D.6 · caring for our environment",
    },
  },
});
