import { preKCourses } from "../prek";

// Washington, DC pre-K, the year before Kindergarten. It follows the District of Columbia Early Learning Standards (OSSE, 2019),
// cited by standard number (`S15`, numbers and counting; `S11`, sounds of English) (docs/research/washington-dc/prek/).
export const courses = preKCourses("us-dc", {
  math: {
    bigIdeas: ["Numbers and Quantities", "Patterns and Operations", "Size and Measurement", "Shapes and Space"],
    standards: {
      "count-to-5": "S15 · counting objects and telling how many",
      "find-the-number": "S15 · knowing numbers and what they stand for",
      "more-or-fewer": "S15 · comparing quantities as more, fewer or the same",
      shapes: "S17; S18 · naming shapes and where things are in space",
      patterns: "S14 · noticing, copying and making simple patterns",
      "big-and-small": "S16 · comparing size, height, weight and length",
      "sort-it": "S14 · sorting and grouping objects by what they are like",
    },
  },
  language: {
    bigIdeas: ["Language", "Books and Print", "Sounds in Language", "Writing"],
    standards: {
      "letter-names": "S9; S12 · knowing letters and how print works",
      "first-sounds": "S11 · hearing the sounds in words",
      "rhyme-time": "S11 · hearing and making words that rhyme",
      "clap-the-parts": "S11 · clapping the syllables in words",
      "listen-to-a-story": "S10; S5 · listening to a story and talking about it",
      "word-meanings": "S6; S7 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Inquiry", "Physical Science", "Life Science", "Earth Science"],
    standards: {
      "five-senses": "S20 · using my senses to explore and ask questions",
      "living-or-not": "S19 · telling living things from things that are not alive",
      "animals-and-babies": "S19 · animals, their babies and what they need",
      "weather-and-sky": "S21 · noticing weather and the sun, moon and stars",
      "plants-grow": "S19 · caring for plants and watching them grow",
      "sink-or-float": "S20 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social Studies", "Approaches to Learning", "Social and Emotional Development"],
    standards: {
      "my-family": "S23 · knowing about myself and my family",
      feelings: "S29; S30 · naming and managing feelings",
      "community-helpers": "S23; S24 · the people and rules in a community",
      "places-around-me": "S24 · places, maps and the world around me",
      "taking-turns": "S33; S34 · taking turns and getting along with friends",
      "first-next-last": "S25 · remembering and putting events in order",
      "caring-for-our-world": "S24; S1 · exploring and caring for the world around me",
    },
  },
});
