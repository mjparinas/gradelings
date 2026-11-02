import { preKCourses } from "../prek";

// Louisiana pre-K, the year before Kindergarten. It follows Louisiana's Birth to Five Early Learning & Development Standards
// (Department of Education, 2013) for 4-year-olds, cited by standard (`CM 1`, understanding numbers; `LL 6`, units of sound in
// language) (docs/research/louisiana/prek/).
export const courses = preKCourses("us-la", {
  math: {
    bigIdeas: ["Numbers and Quantities", "Patterns and Operations", "Size and Measurement", "Shapes and Space"],
    standards: {
      "count-to-5": "CM 1 · counting objects and telling how many",
      "find-the-number": "CM 1 · knowing numbers and what they stand for",
      "more-or-fewer": "CM 1 · comparing quantities as more, fewer or the same",
      shapes: "CM 4 · naming shapes and where things are in space",
      patterns: "CM 2 · noticing, copying and making simple patterns",
      "big-and-small": "CM 3 · comparing size, capacity and area",
      "sort-it": "CM 2; CM 3 · sorting and grouping objects by what they are like",
    },
  },
  language: {
    bigIdeas: ["Language", "Books and Print", "Sounds in Language", "Writing"],
    standards: {
      "letter-names": "LL 5 · knowing letters and how print works",
      "first-sounds": "LL 6 · hearing the sounds in words",
      "rhyme-time": "LL 6 · hearing and making words that rhyme",
      "clap-the-parts": "LL 6 · clapping the syllables in words",
      "listen-to-a-story": "LL 4 · listening to a story and talking about it",
      "word-meanings": "LL 2 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Inquiry", "Physical Science", "Life Science", "Earth Science"],
    standards: {
      "five-senses": "CS 1 · using my senses to explore and ask questions",
      "living-or-not": "CS 3 · telling living things from things that are not alive",
      "animals-and-babies": "CS 3 · animals, their babies and what they need",
      "weather-and-sky": "CS 4 · noticing weather and the sun, moon and stars",
      "plants-grow": "CS 3 · caring for plants and watching them grow",
      "sink-or-float": "CS 2; CS 1 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social Studies", "Approaches to Learning", "Social and Emotional Development"],
    standards: {
      "my-family": "CSS 4; SE 2 · knowing about myself and my family",
      feelings: "SE 4; SE 3 · naming and managing feelings",
      "community-helpers": "CSS 5 · the people and rules in a community",
      "places-around-me": "CSS 3 · places, maps and landforms around me",
      "taking-turns": "SE 1; SE 5 · taking turns and getting along with friends",
      "first-next-last": "CSS 1 · remembering and putting events in order",
      "caring-for-our-world": "AL 1; CSS 5 · exploring and caring for the world around me",
    },
  },
});
