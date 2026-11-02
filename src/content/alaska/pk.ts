import { preKCourses } from "../prek";

// Alaska pre-K, the year before Kindergarten. It follows the goals of the State of Alaska Early Learning Guidelines (Department of
// Education & Early Development, 2020) for preschoolers, 36 to 60+ months (`Goal 34`, numbers and counting; `Goal 51`,
// appreciation and enjoyment of reading) (docs/research/alaska/prek/).
export const courses = preKCourses("us-ak", {
  math: {
    bigIdeas: ["Counting and Number Sense", "Measurement", "Sorting and Classifying", "Space and Shape"],
    standards: {
      "count-to-5": "Goal 34 · knowing numbers and counting",
      "find-the-number": "Goal 34 · knowing numbers and counting",
      "more-or-fewer": "Goal 34 · comparing groups as more, fewer or the same",
      shapes: "Goal 41 · shapes and where things are",
      patterns: "Goal 36 · noticing and copying simple patterns",
      "big-and-small": "Goal 35 · comparing size, length and weight",
      "sort-it": "Goal 36 · sorting and organizing objects",
    },
  },
  language: {
    bigIdeas: ["Listening and Speaking", "Reading", "Writing"],
    standards: {
      "letter-names": "Goal 51 · knowing the names of letters and their sounds",
      "first-sounds": "Goal 51 · hearing the first sound in a word",
      "rhyme-time": "Goal 51 · hearing and making words that rhyme",
      "clap-the-parts": "Goal 51 · clapping the syllables in words",
      "listen-to-a-story": "Goal 49; Goal 51 · listening to a short story and enjoying reading",
      "word-meanings": "Goal 50 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Observing and Describing", "Predicting and Experimenting"],
    standards: {
      "five-senses": "Goal 37 · observing with the senses",
      "living-or-not": "Goal 39 · telling living things from things that are not alive",
      "animals-and-babies": "Goal 39 · observing animals and what they need to live",
      "weather-and-sky": "Goal 39 · noticing weather and how it changes",
      "plants-grow": "Goal 39 · caring for plants and watching them grow",
      "sink-or-float": "Goal 38 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Relationships and Belonging", "Feelings and Self", "Community"],
    standards: {
      "my-family": "Goal 16; Goal 21 · knowing about myself and my family",
      feelings: "Goal 20; Goal 14 · naming feelings in myself and others",
      "community-helpers": "Goal 22 · the people in a community and their roles",
      "places-around-me": "Goal 42 · the places around me",
      "taking-turns": "Goal 12; Goal 18 · taking turns, sharing and following rules",
      "first-next-last": "Goal 40 · past, present and future: first, next and last",
      "caring-for-our-world": "Goal 44 · caring for our surroundings",
    },
  },
});
