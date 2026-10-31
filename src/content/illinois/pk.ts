import { preKCourses } from "../prek";

// Illinois pre-K, the year before kindergarten in Preschool for All and other programs for four-year-olds. It follows the
// Illinois Early Learning and Development Standards (IELDS, 2013); the shared Pre-K units cite their preschool
// benchmarks, for example "6.A.ECb" (docs/research/illinois/prek/).
export const courses = preKCourses("us-il", {
  math: {
    bigIdeas: ["Number Sense", "Measurement", "Algebra and Patterns", "Geometry", "Data and Probability"],
    standards: {
      "count-to-5": "6.A.ECa; 6.A.ECb · seeing and counting small groups to 5",
      "find-the-number": "6.A.ECe · recognizing the written numbers",
      "more-or-fewer": "6.D.ECa; 6.D.ECb · comparing groups as more, fewer or the same",
      shapes: "9.A.ECa · naming circles, squares, triangles and rectangles",
      patterns: "8.A.ECb · copying and extending repeating patterns",
      "big-and-small": "7.A.ECa; 7.A.ECc · comparing size, height, length and weight",
      "sort-it": "8.A.ECa · sorting objects by color, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Listening and Speaking", "Reading Literature", "Foundational Skills", "Vocabulary"],
    standards: {
      "letter-names": "4.B.ECb · recognizing and naming letters",
      "first-sounds": "4.C.ECd · hearing the first sound in a word",
      "rhyme-time": "4.C.ECb · hearing words that rhyme",
      "clap-the-parts": "4.C.ECc · clapping the syllables in words",
      "listen-to-a-story": "2.B.ECa; 2.B.ECb · listening to a short story and answering questions about it",
      "word-meanings": "1.E.ECd; 1.E.ECe · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Inquiry and Design", "Life Science", "Physical Science", "Earth and Space Science"],
    standards: {
      "five-senses": "11.A.ECd · observing and describing what we notice",
      "living-or-not": "12.A.ECa · telling living things from things that are not alive",
      "animals-and-babies": "12.A.ECa; 12.B.ECa · animals, their needs and how they grow",
      "weather-and-sky": "12.F.ECa · noticing weather and seasons",
      "plants-grow": "12.B.ECa; 12.A.ECb · what plants need and how they grow",
      "sink-or-float": "12.C.ECa; 11.A.ECc · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social/Emotional Development", "Civics and Government", "Economics", "History", "Geography", "Social Systems"],
    standards: {
      "my-family": "18.B.ECa; 30.B.ECa · knowing about myself and my family",
      feelings: "30.A.ECa; 31.A.ECb · naming feelings in myself and others",
      "community-helpers": "15.A.ECa · common jobs and the work people do",
      "places-around-me": "17.A.ECa · places in familiar environments",
      "taking-turns": "31.C.ECa; 14.A.ECa · taking turns, sharing and following rules",
      "first-next-last": "16.A.ECa · remembering what happened first, next and last",
      "caring-for-our-world": "12.E.ECb · caring for our environment",
    },
  },
});
