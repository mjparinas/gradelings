import { preKCourses } from "../prek";

// Nunavut pre-K, the year before Kindergarten. Nunavut publishes no learning outcomes before Kindergarten, so each unit cites the
// guiding principle it serves in the Nunavut Early Learning and Child Care Quality Framework (Department of Education, 2023):
// `GP 1` curious, capable and competent; `GP 2` the whole child; `GP 3` belonging and contributing; `GP 4` play, experiment and
// practise (docs/research/nunavut/prek/).
export const courses = preKCourses("ca-nu", {
  math: {
    bigIdeas: ["Numbers and Quantities", "Patterns and Operations", "Size and Measurement", "Shapes and Space"],
    standards: {
      "count-to-5": "GP 4 · counting objects and telling how many",
      "find-the-number": "GP 1 · knowing numbers and what they stand for",
      "more-or-fewer": "GP 4 · comparing quantities as more, fewer or the same",
      shapes: "GP 1 · naming shapes and where things are in space",
      patterns: "GP 4 · noticing, copying and making simple patterns",
      "big-and-small": "GP 1 · comparing size, height, weight and length",
      "sort-it": "GP 4 · sorting and grouping objects by what they are like",
    },
  },
  language: {
    bigIdeas: ["Language", "Books and Print", "Sounds in Language", "Writing"],
    standards: {
      "letter-names": "GP 1 · knowing letters and how print works",
      "first-sounds": "GP 4 · hearing the sounds in words",
      "rhyme-time": "GP 4 · hearing and making words that rhyme",
      "clap-the-parts": "GP 4 · clapping the syllables in words",
      "listen-to-a-story": "GP 1; GP 3 · listening to a story and talking about it",
      "word-meanings": "GP 1 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Inquiry", "Physical Science", "Life Science", "Earth Science"],
    standards: {
      "five-senses": "GP 1 · using my senses to explore and ask questions",
      "living-or-not": "GP 1 · telling living things from things that are not alive",
      "animals-and-babies": "GP 1 · animals, their babies and what they need",
      "weather-and-sky": "GP 1 · noticing weather and the sun, moon and stars",
      "plants-grow": "GP 1 · caring for plants and watching them grow",
      "sink-or-float": "GP 4; GP 1 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social Studies", "Approaches to Learning", "Social and Emotional Development"],
    standards: {
      "my-family": "GP 3 · knowing about myself and my family",
      feelings: "GP 2 · naming and managing feelings",
      "community-helpers": "GP 3 · the people and rules in a community",
      "places-around-me": "GP 3 · places, maps and the world around me",
      "taking-turns": "GP 3 · taking turns and getting along with friends",
      "first-next-last": "GP 4 · remembering and putting events in order",
      "caring-for-our-world": "GP 3; GP 1 · exploring and caring for the world around me",
    },
  },
});
