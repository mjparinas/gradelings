import { preKCourses } from "../prek";

// Alberta Pre-K. Alberta's school system has no Pre-K year for every child (Early Childhood Services offers
// Pre-Kindergarten to some children), so Pre-K units cite Flight: Alberta's Early Learning and Care Framework, which
// guides early learning before school. It has four holistic play-based goals, each with three facets; units cite
// "Goal: Facet" (docs/research/alberta/prek/).
export const courses = preKCourses("ca-ab", {
  math: {
    bigIdeas: ["Play and Playfulness", "Communication and Literacies"],
    standards: {
      "count-to-5": "Play and Playfulness: Playful Exploration and Problem Solving · counting small groups of objects",
      "find-the-number": "Communication and Literacies: Multimodal Literacies · recognizing the written numerals 1 to 10",
      "more-or-fewer": "Play and Playfulness: Playful Exploration and Problem Solving · comparing groups as more, fewer or the same",
      shapes: "Play and Playfulness: Playful Exploration and Problem Solving · naming circles, squares, triangles and rectangles",
      patterns: "Play and Playfulness: Playful Exploration and Problem Solving · copying and extending simple repeating patterns",
      "big-and-small": "Play and Playfulness: Playful Exploration and Problem Solving · comparing size, height, length and weight",
      "sort-it": "Play and Playfulness: Playful Exploration and Problem Solving · sorting and matching objects by colour, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Communication and Literacies"],
    standards: {
      "letter-names": "Communication and Literacies: Multimodal Literacies · knowing the names of capital letters",
      "first-sounds": "Communication and Literacies: Communicative Practices · hearing the first sound in a word",
      "rhyme-time": "Communication and Literacies: Communicative Practices · hearing words that rhyme",
      "clap-the-parts": "Communication and Literacies: Communicative Practices · clapping the rhythm of spoken words",
      "listen-to-a-story":
        "Communication and Literacies: Literate Identities With/In Communities · listening to a short story and answering questions about it",
      "word-meanings": "Communication and Literacies: Communicative Practices · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Play and Playfulness", "Diversity and Social Responsibility"],
    standards: {
      "five-senses": "Diversity and Social Responsibility: Sustainable Futures · bringing all the senses to exploring nature",
      "living-or-not": "Diversity and Social Responsibility: Sustainable Futures · telling living things from things that are not alive",
      "animals-and-babies": "Diversity and Social Responsibility: Sustainable Futures · where animals live and how they grow",
      "weather-and-sky": "Diversity and Social Responsibility: Sustainable Futures · noticing weather, day and night",
      "plants-grow": "Diversity and Social Responsibility: Sustainable Futures · what plants need and how they grow from seeds",
      "sink-or-float": "Play and Playfulness: Playful Exploration and Problem Solving · exploring what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Well-Being", "Diversity and Social Responsibility"],
    standards: {
      "my-family": "Well-Being: Belonging · knowing about myself and my family",
      feelings: "Well-Being: Emotional Health and Positive Identities · naming feelings and caring for others",
      "community-helpers": "Well-Being: Belonging · people in the community and what they do",
      "places-around-me": "Well-Being: Belonging · familiar places in the community",
      "taking-turns": "Diversity and Social Responsibility: Democratic Practices · taking turns, sharing and making fair rules",
      "first-next-last": "Well-Being: Physical Health · daily routines in order",
      "caring-for-our-world": "Diversity and Social Responsibility: Sustainable Futures · caring for the natural world",
    },
  },
});
