import { preKCourses } from "../prek";

// Arizona preschool, the pre-K year for four-year-olds in district, Head Start and Quality First programs. It follows the
// Arizona Early Learning Standards (4th edition); the shared Pre-K units cite their indicators with the standard's name,
// for example "Math 1.4.a" (docs/research/arizona/prek/).
export const courses = preKCourses("us-az", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Measurement and Data", "Geometry"],
    standards: {
      "count-to-5": "Math 1.4.a; Math 1.4.d · seeing and counting small groups",
      "find-the-number": "Math 1.2.d; Math 1.4.e · recognizing the written numbers",
      "more-or-fewer": "Math 1.3.a · comparing groups as more, fewer or the same",
      shapes: "Math 4.1.a; Math 4.1.b · naming circles, squares, triangles and rectangles",
      patterns: "Math 2.2.c; Math 2.2.d · copying and extending repeating patterns",
      "big-and-small": "Math 3.3.a; Math 3.3.d · comparing size, height, length and weight",
      "sort-it": "Math 3.1.a · sorting objects by color, shape and size",
    },
  },
  language: {
    bigIdeas: ["Language", "Emergent Literacy", "Emergent Writing"],
    standards: {
      "letter-names": "Language 2.4.c · knowing the names of letters",
      "first-sounds": "Language 2.3.d; Language 2.4.e · hearing the first sound in a word",
      "rhyme-time": "Language 2.3.b; Language 2.3.c · hearing and making words that rhyme",
      "clap-the-parts": "Language 2.3.f · clapping the syllables in words",
      "listen-to-a-story": "Language 2.5.b; Language 2.5.c · listening to a short story and answering questions about it",
      "word-meanings": "Language 1.3.a; Language 1.3.c · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Exploration and Discovery", "Investigation", "Cause and Effect", "Sharing Scientific Ideas"],
    standards: {
      "five-senses": "Science 1.1.b; Science 1.1.a · using the senses to notice what things are like",
      "living-or-not": "Science 1.1.d · telling living things from things that are not alive",
      "animals-and-babies": "Science 1.1.c; Science 1.1.d · how animals grow and change and are like their parents",
      "weather-and-sky": "Science 1.1.c; Science 1.1.e · noticing changes in the weather and the sky",
      "plants-grow": "Science 1.1.c; Science 1.3.b · watching plants grow and what they need",
      "sink-or-float": "Science 1.2.b; Science 1.2.a · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Family", "Community", "History and Events", "Self-Awareness and Relationships"],
    standards: {
      "my-family": "Social Studies 1.1.a; Social Studies 1.1.b · knowing the people in a family",
      feelings: "Social Emotional 1.2.a; Social Emotional 1.2.b · naming feelings from faces and words",
      "community-helpers": "Social Studies 2.2.b; Social Studies 2.1.c · the people and jobs that help a community",
      "places-around-me": "Social Studies 2.3.a; Social Studies 2.3.b · places in the community and where they are",
      "taking-turns": "Social Emotional 2.2.c; Social Emotional 2.3.a; Social Studies 2.2.d · sharing, respecting others and solving problems kindly",
      "first-next-last": "Social Studies 3.1.c; Social Studies 3.1.a · time words like first, next and last",
      "caring-for-our-world": "Social Studies 2.3.d; Social Studies 2.3.c · taking care of the environment we share",
    },
  },
});
