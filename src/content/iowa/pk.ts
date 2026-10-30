import { preKCourses } from "../prek";

// Iowa preschool, the Statewide Voluntary Preschool Program year for four-year-olds in school districts and community
// partners. It follows the Iowa Early Learning Standards (4th edition, 2026); the shared Pre-K units cite their
// indicators for about 4 to 5 years, for example "7.2.X" (docs/research/iowa/prek/).
export const courses = preKCourses("us-ia", {
  math: {
    bigIdeas: ["Number Sense", "Patterns", "Measurement", "Spatial Relationships and Shapes", "Data Analysis"],
    standards: {
      "count-to-5": "7.2.X; 7.2.W · seeing and counting small groups",
      "find-the-number": "7.2.BB · recognizing the written numbers",
      "more-or-fewer": "7.2.CC; 7.2.AA · comparing groups as more, fewer or the same",
      shapes: "7.1.W · naming and describing circles, squares, triangles and rectangles",
      patterns: "7.3.J.b; 7.3.J.c · copying and extending repeating patterns",
      "big-and-small": "7.4.I; 7.4.H · comparing size, height, length and weight",
      "sort-it": "7.5.J; 7.1.W · sorting and organizing objects by what they share",
    },
  },
  language: {
    bigIdeas: ["Receptive and Expressive Language", "Understanding Stories", "Phonological Awareness", "Emergent Writing and Print"],
    standards: {
      "letter-names": "6.5.Q · knowing the names of letters",
      "first-sounds": "6.4.S; 6.4.T · hearing the first sound in a word",
      "rhyme-time": "6.4.U · hearing words that rhyme",
      "clap-the-parts": "6.4.R · clapping the syllables in words",
      "listen-to-a-story": "6.3.S; 6.3.U · listening to a short story and answering questions about it",
      "word-meanings": "6.1.R.a; 6.1.S · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Investigating", "Patterns in Living and Nonliving Things", "Explaining and Sharing Ideas"],
    standards: {
      "five-senses": "8.1.M; 8.1.N · using the five senses to observe",
      "living-or-not": "8.2.M; 8.2.K · telling living things from things that are not alive",
      "animals-and-babies": "8.2.K · how living things are alike and different",
      "weather-and-sky": "8.1.O · noticing patterns in the weather and the sky",
      "plants-grow": "8.2.M; 8.1.O · watching plants grow and change",
      "sink-or-float": "8.1.L; 8.1.N · testing materials to find out what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Self and Community", "People and the Environment", "Time and History", "Emotions and Relationships"],
    standards: {
      "my-family": "4.3.P; 4.1.O · family and community",
      feelings: "1.3.U; 1.3.T · naming feelings in yourself and others",
      "community-helpers": "4.2.P · the jobs people do in the community",
      "places-around-me": "4.2.Q; 4.2.O · places around us and words for where things are",
      "taking-turns": "1.4.W; 1.4.X; 4.1.P · taking turns, playing together and following rules",
      "first-next-last": "4.3.Q · putting familiar events in order",
      "caring-for-our-world": "4.1.O; 4.2.O · caring for family, community and the world around us",
    },
  },
});
