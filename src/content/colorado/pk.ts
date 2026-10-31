import { preKCourses } from "../prek";

// Colorado pre-K, the preschool year before kindergarten (Universal Preschool, UPK Colorado). The Colorado Academic
// Standards start at preschool, so the shared Pre-K units cite their preschool evidence outcomes and indicators by CDE
// code, for example "P.CC.B.2" or "PK.C.1.c" (docs/research/colorado/prek/).
export const courses = preKCourses("us-co", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Measurement and Data", "Geometry"],
    standards: {
      "count-to-5": "P.CC.B.2; P.CC.C.4 · seeing and counting small groups to 5",
      "find-the-number": "P.CC.E.9 · matching groups to the written numbers 0 to 5",
      "more-or-fewer": "P.CC.D.7 · comparing groups as more, fewer or the same",
      shapes: "P.G.A.2 · naming circles, squares, triangles and rectangles",
      patterns: "P.OA.B.4; P.OA.B.5 · copying and finishing simple patterns",
      "big-and-small": "P.MD.A.1; P.MD.A.2 · comparing size, height, length and weight",
      "sort-it": "P.G.A.3 · sorting shapes and objects",
    },
  },
  language: {
    bigIdeas: ["Oral Expression and Listening", "Reading for All Purposes", "Writing and Composition"],
    standards: {
      "letter-names": "PK.2.4.a; PK.2.4.d · knowing letters of the alphabet",
      "first-sounds": "PK.2.4.c · hearing the first sound in familiar words",
      "rhyme-time": "PK.2.2.d · hearing patterns of sounds and rhymes",
      "clap-the-parts": "PK.2.2.b · clapping the syllables in words",
      "listen-to-a-story": "PK.2.1.c; PK.2.1.f · listening to a short story and answering questions about it",
      "word-meanings": "PK.1.1.b; PK.1.2.c · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Physical Science", "Life Science", "Earth and Space Science"],
    standards: {
      "five-senses": "PS1.PK.1.a · exploring objects and materials with the senses",
      "living-or-not": "LS2.PK.1.f · telling living things from things that are not alive",
      "animals-and-babies": "LS2.PK.2.d; LS2.PK.1.c · animals, their homes and how they grow",
      "weather-and-sky": "ESS3.PK.2.c; ESS3.PK.2.d · noticing weather, day and night",
      "plants-grow": "LS2.PK.2.a; LS2.PK.2.d · what plants need and how they grow",
      "sink-or-float": "PS1.PK.2.d; PS1.PK.1.b · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["History", "Geography", "Economics", "Civics", "Personal Financial Literacy"],
    standards: {
      "my-family": "PK.C.1.a; PK.H.1.b · knowing about myself and my family",
      feelings: "PK.C.1.c · naming feelings and what causes them",
      "community-helpers": "PK.E.1.b; PK.PF.1.b · people's work and how they earn money",
      "places-around-me": "PK.G.1.b · home, school, neighborhood and community",
      "taking-turns": "PK.C.1.d; PK.C.2.e · taking turns, getting along and following rules",
      "first-next-last": "PK.H.1.a · past, present and future",
      "caring-for-our-world": "LS2.PK.1.c; PK.C.2.c · caring for living things and the places we share",
    },
  },
});
