import { preKCourses } from "../prek";

// Vermont pre-K, the year before Kindergarten. It follows the Vermont Early Learning Standards (VELS, Vermont Agency of Education)
// for Older Preschoolers, 48 to 60 months, which give indicators by domain and element (`MA Number Sense and Quantity`, counting
// and comparing quantities; `LI Foundational Reading Skills`, letters and sounds) (docs/research/vermont/prek/).
export const courses = preKCourses("us-vt", {
  math: {
    bigIdeas: ["Number Sense and Quantity", "Measurement, Comparison and Classification", "Geometry and Spatial Sense"],
    standards: {
      "count-to-5": "MA Number Sense and Quantity · counting in order and counting a group of objects",
      "find-the-number": "MA Number Sense and Quantity · recognizing numerals and connecting them with quantities",
      "more-or-fewer": "MA Number Sense and Quantity; MA Number Relationships and Operations · comparing quantities and matching equal sets",
      shapes: "MA Geometry and Spatial Sense · naming shapes and their parts",
      patterns: "MA Measurement, Comparison, Classification, and Time · noticing how objects are alike and different",
      "big-and-small": "MA Measurement, Comparison, Classification, and Time · comparing length, weight and size",
      "sort-it": "MA Measurement, Comparison, Classification, and Time · sorting and grouping objects by their attributes",
    },
  },
  language: {
    bigIdeas: ["Language Development", "Literacy Development"],
    standards: {
      "letter-names": "LI Foundational Reading Skills; LI Writing · knowing letters and writing my name",
      "first-sounds": "LI Foundational Reading Skills · hearing the first sound in a word",
      "rhyme-time": "LI Foundational Reading Skills · hearing and making words that rhyme",
      "clap-the-parts": "LI Foundational Reading Skills · clapping the syllables in words",
      "listen-to-a-story": "LI Engagement with Literature and Informational Text; LA Receptive Language (Listening) · listening to a short story and talking about it",
      "word-meanings": "LA Expressive Language (Speaking) · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Inquiry", "Life Sciences", "Earth and Space Sciences", "Physical Sciences"],
    standards: {
      "five-senses": "SC Life Sciences · using my senses to gather information",
      "living-or-not": "SC Life Sciences · telling living things from things that are not alive",
      "animals-and-babies": "SC Life Sciences · how animals grow and change",
      "weather-and-sky": "SC Earth and Space Sciences · noticing the weather and how it changes",
      "plants-grow": "SC Life Sciences · how plants grow and change",
      "sink-or-float": "SC Physical Sciences; SC Inquiry · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social Studies", "Social and Emotional Learning", "Approaches to Learning"],
    standards: {
      "my-family": "SS Family and Community, Civics, Government and Society · belonging to a family and a community",
      feelings: "SE Emotions and Self-Regulation · naming and managing my feelings",
      "community-helpers": "SS Economics · the jobs people do in a community",
      "places-around-me": "SS Physical and Cultural Geography · the places around me",
      "taking-turns": "SE Relationships with Adults and Peers · taking turns and cooperating with others",
      "first-next-last": "SS History · past, present and future: first, next and last",
      "caring-for-our-world": "SS Physical and Cultural Geography · caring for our surroundings",
    },
  },
});
