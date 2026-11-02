import { preKCourses } from "../prek";

// Wyoming pre-K, the year before Kindergarten. It follows the Wyoming Early Learning Standards (Department of Education, 2022),
// cited by standard (`MATH 1`, number sense; `LIT 2`, phonological skills) (docs/research/wyoming/prek/).
export const courses = preKCourses("us-wy", {
  math: {
    bigIdeas: ["Numbers and Quantities", "Patterns and Operations", "Size and Measurement", "Shapes and Space"],
    standards: {
      "count-to-5": "MATH 1 · counting objects and telling how many",
      "find-the-number": "MATH 1 · knowing numbers and what they stand for",
      "more-or-fewer": "MATH 1 · comparing quantities as more, fewer or the same",
      shapes: "MATH 3 · naming shapes and where things are in space",
      patterns: "MATH 4 · noticing, copying and making simple patterns",
      "big-and-small": "MATH 2 · comparing size, capacity and length",
      "sort-it": "MATH 4 · sorting and grouping objects by what they are like",
    },
  },
  language: {
    bigIdeas: ["Language", "Books and Print", "Sounds in Language", "Writing"],
    standards: {
      "letter-names": "LIT 4 · knowing letters and how print works",
      "first-sounds": "LIT 2 · hearing the sounds in words",
      "rhyme-time": "LIT 2 · hearing and making words that rhyme",
      "clap-the-parts": "LIT 2 · clapping the syllables in words",
      "listen-to-a-story": "LIT 1; COM 1 · listening to a story and talking about it",
      "word-meanings": "COM 2 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Inquiry", "Physical Science", "Life Science", "Earth Science"],
    standards: {
      "five-senses": "SCI 1 · using my senses to explore and ask questions",
      "living-or-not": "SCI 1 · telling living things from things that are not alive",
      "animals-and-babies": "SCI 1 · animals, their babies and what they need",
      "weather-and-sky": "SCI 1 · noticing weather and the sun, moon and stars",
      "plants-grow": "SCI 1 · caring for plants and watching them grow",
      "sink-or-float": "SCI 2; SCI 1 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social Studies", "Approaches to Learning", "Social and Emotional Development"],
    standards: {
      "my-family": "CFC 1; EMO 1 · knowing about myself and my family",
      feelings: "EMO 2 · naming and managing feelings",
      "community-helpers": "CFC 1 · the people and rules in a community",
      "places-around-me": "CFC 1 · places and the world around me",
      "taking-turns": "SOC 2; SOC 3 · taking turns and getting along with friends",
      "first-next-last": "ATL 2 · remembering and putting events in order",
      "caring-for-our-world": "ATL 1; CFC 1 · exploring and caring for the world around me",
    },
  },
});
