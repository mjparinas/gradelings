import { preKCourses } from "../prek";

// South Dakota pre-K, the year before Kindergarten. It follows the goals of the South Dakota Early Learning Guidelines (Department
// of Social Services, 2023) for older preschoolers, 45 to 60+ months (`CD 4`, counting with understanding; `CLL 7`, listening
// for sounds and phonological awareness) (docs/research/south-dakota/prek/).
export const courses = preKCourses("us-sd", {
  math: {
    bigIdeas: ["Counting and Number Sense", "Patterns and Measurement", "Geometry and Spatial Sense", "Mathematical Thinking"],
    standards: {
      "count-to-5": "CD 4 · counting with understanding and telling how many",
      "find-the-number": "CD 4 · using numbers to tell how many",
      "more-or-fewer": "CD 4 · comparing groups as more, fewer or the same",
      shapes: "CD 5 · describing simple shapes and where things are",
      patterns: "CD 6 · creating simple patterns",
      "big-and-small": "CD 6 · comparing and measuring size, length and weight",
      "sort-it": "CD 6 · comparing, sorting and grouping objects",
    },
  },
  language: {
    bigIdeas: ["Communication and Language", "Reading", "Writing"],
    standards: {
      "letter-names": "CLL 8 · knowing letters and the alphabet",
      "first-sounds": "CLL 7 · hearing the first sound in a word",
      "rhyme-time": "CLL 7 · hearing and making words that rhyme",
      "clap-the-parts": "CLL 7 · clapping the syllables in words",
      "listen-to-a-story": "CLL 5 · listening to a story and talking about it",
      "word-meanings": "CLL 3 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Observing and Describing", "Investigating"],
    standards: {
      "five-senses": "CD 1 · using my senses to discover the world",
      "living-or-not": "CD 8 · telling living things from things that are not alive",
      "animals-and-babies": "CD 8 · observing animals and what they need to live",
      "weather-and-sky": "CD 9 · noticing weather and how it changes",
      "plants-grow": "CD 8; CD 9 · caring for plants and watching them grow",
      "sink-or-float": "CD 9 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Relationships and Belonging", "Feelings and Self", "Family and Community"],
    standards: {
      "my-family": "SDED 1; CD 11 · knowing about myself and my family",
      feelings: "SDED 5; SDED 6 · naming feelings in myself and others",
      "community-helpers": "CD 10 · the roles of people in a community",
      "places-around-me": "CD 10 · the families and communities I belong to",
      "taking-turns": "SDED 3; SDED 4 · taking turns, sharing and following rules",
      "first-next-last": "CD 2 · remembering and putting events in order",
      "caring-for-our-world": "AL 2 · actively seeking to understand the world around them and caring for it",
    },
  },
});
