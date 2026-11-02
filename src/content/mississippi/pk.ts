import { preKCourses } from "../prek";

// Mississippi pre-K, the year before Kindergarten. It follows the Mississippi Early Learning Standards for Classrooms Serving
// Four-Year-Old Children (Department of Education, 2013), cited by strand and number (`RF 2`, foundational reading skills;
// `CC 4`, counting objects) (docs/research/mississippi/prek/).
export const courses = preKCourses("us-ms", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Measurement and Data", "Geometry"],
    standards: {
      "count-to-5": "CC 4; CC 3 · counting objects and matching numerals to quantities",
      "find-the-number": "CC 2; CC 3 · recognizing and naming numerals and what they mean",
      "more-or-fewer": "CC 5 · comparing groups with words like more, less and the same",
      shapes: "G 1; G 2 · naming shapes and spotting them around me",
      patterns: "OA 3 · copying and extending simple patterns",
      "big-and-small": "MD 1; MD 2 · comparing length, weight and size",
      "sort-it": "MD 3 · sorting and grouping objects",
    },
  },
  language: {
    bigIdeas: ["Reading", "Writing", "Speaking and Listening", "Language"],
    standards: {
      "letter-names": "RF 1 · knowing letters and how print works",
      "first-sounds": "RF 2 · hearing the first sound in a word",
      "rhyme-time": "RF 2 · hearing and making words that rhyme",
      "clap-the-parts": "RF 2 · clapping the syllables in words",
      "listen-to-a-story": "RL 2; RL 3 · listening to a story and retelling what happened",
      "word-meanings": "L 5; L 4 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Method and Inquiry", "Physical Science", "Life Science", "Earth Science"],
    standards: {
      "five-senses": "SI 7; SI 8 · using my five senses to explore the world",
      "living-or-not": "LS 4 · telling living things from things that are not alive",
      "animals-and-babies": "LS 1; LS 2 · animals, their babies and what they need",
      "weather-and-sky": "ES 1; ES 2 · noticing weather and the sun, moon and stars",
      "plants-grow": "LS 2; LS 3 · caring for plants and watching them grow",
      "sink-or-float": "PS 3; SI 4 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Family and Community", "Our World", "Social and Emotional Development"],
    standards: {
      "my-family": "FC 1; FC 4 · knowing about myself and my family",
      feelings: "ED 6; SD 3 · naming feelings in myself and others",
      "community-helpers": "FC 7 · the roles of people in a community",
      "places-around-me": "OW 2; FC 1 · places and features around me",
      "taking-turns": "SD 2; SD 6 · taking turns, sharing and solving problems with friends",
      "first-next-last": "FC 9; HE 1 · putting familiar events in order",
      "caring-for-our-world": "OW 5 · caring for the environment",
    },
  },
});
