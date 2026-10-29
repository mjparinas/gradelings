import { preKCourses } from "../prek";

// Manitoba Pre-K. Manitoba has no school year before Kindergarten, so Pre-K units cite Early Returns: Manitoba's Early
// Learning and Child Care Curriculum Framework for Preschool Centres and Nursery Schools. It has no outcomes; units cite
// the area of development and the play area they practise, "Cognitive development; Numeracy" (docs/research/manitoba/prek/).
export const courses = preKCourses("ca-mb", {
  math: {
    bigIdeas: ["Cognitive development", "Numeracy", "Block and construction"],
    standards: {
      "count-to-5": "Cognitive development; Numeracy · counting small groups of objects",
      "find-the-number": "Cognitive development; Numeracy · recognizing the written numerals 1 to 10",
      "more-or-fewer": "Cognitive development; Numeracy · comparing groups as more, fewer or the same",
      shapes: "Cognitive development; Block and construction · naming circles, squares, triangles and rectangles",
      patterns: "Cognitive development; Numeracy · copying and extending simple repeating patterns",
      "big-and-small": "Cognitive development; Block and construction · comparing size, height, length and weight",
      "sort-it": "Cognitive development; Numeracy · sorting objects by colour, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Cognitive development", "Literacy"],
    standards: {
      "letter-names": "Cognitive development; Literacy · knowing the names of capital letters",
      "first-sounds": "Cognitive development; Literacy · hearing the first sound in a word",
      "rhyme-time": "Cognitive development; Literacy · hearing words that rhyme",
      "clap-the-parts": "Cognitive development; Literacy · clapping the parts of spoken words",
      "listen-to-a-story": "Cognitive development; Literacy · listening to a short story and answering questions about it",
      "word-meanings": "Cognitive development; Literacy · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Cognitive development", "Science, water and sand"],
    standards: {
      "five-senses": "Cognitive development; Science, water and sand · exploring the world with the five senses",
      "living-or-not": "Cognitive development; Science, water and sand · telling living things from things that are not alive",
      "animals-and-babies": "Cognitive development; Science, water and sand · where animals live and how they grow",
      "weather-and-sky": "Cognitive development; Science, water and sand · noticing weather, day and night",
      "plants-grow": "Cognitive development; Science, water and sand · what plants need and how they grow from seeds",
      "sink-or-float": "Cognitive development; Science, water and sand · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social development", "Emotional development", "Physical development"],
    standards: {
      "my-family": "Social development; Dramatic · knowing about myself and my family",
      feelings: "Emotional development · naming feelings in myself and others",
      "community-helpers": "Social development; Dramatic · people in the community and what they do",
      "places-around-me": "Social development; Dramatic · places in the community and what happens there",
      "taking-turns": "Social development · taking turns, sharing and making friends",
      "first-next-last": "Physical development · daily routines in order",
      "caring-for-our-world": "Social development; Science, water and sand · caring for the natural world",
    },
  },
});
