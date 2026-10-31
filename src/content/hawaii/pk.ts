import { preKCourses } from "../prek";

// Hawaiʻi pre-K, the year before kindergarten in public pre-kindergarten classrooms and community preschools. It follows
// the Hawaiʻi Early Learning and Development Standards (HELDS, 2014); the shared Pre-K units cite the "48 months to
// kindergarten entry" indicators, for example "GK.KE.d" (docs/research/hawaii/prek/).
export const courses = preKCourses("us-hi", {
  math: {
    bigIdeas: ["Number Sense", "Patterns and Sorting", "Measurement", "Geometry and Spatial Sense"],
    standards: {
      "count-to-5": "GK.KE.d; GK.KE.e · seeing and counting small groups",
      "find-the-number": "GK.KE.c · recognizing the written numbers",
      "more-or-fewer": "GK.KE.g · comparing groups as more, fewer or the same",
      shapes: "GK.KE.l · naming circles, squares, triangles and rectangles",
      patterns: "GK.KE.f · copying and repeating simple patterns",
      "big-and-small": "GK.KE.h; GK.KE.i · comparing size, length and weight",
      "sort-it": "GK.KE.j · sorting objects by color, shape and size",
    },
  },
  language: {
    bigIdeas: ["Listening and Speaking", "Reading Comprehension", "Phonological Awareness", "Alphabet Knowledge"],
    standards: {
      "letter-names": "LA.KE.u · recognizing and naming letters",
      "first-sounds": "LA.KE.x · matching the first sound of spoken words",
      "rhyme-time": "LA.KE.v · hearing and making words that rhyme",
      "clap-the-parts": "LA.KE.w · clapping the syllables in words",
      "listen-to-a-story": "LA.KE.i; LA.KE.g · listening to a short story and answering questions about it",
      "word-meanings": "LA.KE.j · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Inquiry", "Physical Science", "Life Science", "Earth and Space Science"],
    standards: {
      "five-senses": "GK.KE.n · observing with the senses",
      "living-or-not": "GK.KE.t · telling living things from things that are not alive",
      "animals-and-babies": "GK.KE.v; GK.KE.u · how animals grow and look like their parents",
      "weather-and-sky": "GK.KE.w; GK.KE.x · noticing weather and the day and night sky",
      "plants-grow": "GK.KE.u · how plants grow through their life cycles",
      "sink-or-float": "GK.KE.o; GK.KE.r · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social and Emotional Development", "Self and Family", "Community and Culture", "Geography", "Government and Rules"],
    standards: {
      "my-family": "GK.KE.gg; SE.KE.k · knowing about myself and my family",
      feelings: "SE.KE.l; SE.KE.e · naming feelings in myself and others",
      "community-helpers": "GK.KE.ff · workers and their jobs in the community",
      "places-around-me": "GK.KE.aa; GK.KE.bb · maps and places around me",
      "taking-turns": "SE.KE.c; SE.KE.d · taking turns and sharing",
      "first-next-last": "SE.KE.f; GK.KE.z · daily routines in order",
      "caring-for-our-world": "PHM/GK.KE.q; SE.KE.h · taking care of our things and the places we share",
    },
  },
});
