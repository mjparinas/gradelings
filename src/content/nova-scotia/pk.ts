import { preKCourses } from "../prek";

// Nova Scotia Pre-primary, the free school year for four-year-olds. It follows Capable, Confident, and Curious: Nova
// Scotia's Early Learning Curriculum Framework, whose four learning goals have numbered learning objectives; the shared
// Pre-K units cite them as "Goal N" (docs/research/nova-scotia/prek/).
export const courses = preKCourses("ca-ns", {
  math: {
    bigIdeas: ["Discovery and Invention", "Language and Communication: understanding how symbols and patterns work"],
    standards: {
      "count-to-5": "Discovery and Invention 2 · counting small groups to find out how many",
      "find-the-number": "Language and Communication 4 · recognizing the written numbers",
      "more-or-fewer": "Discovery and Invention 2 · comparing groups as more, fewer or the same",
      shapes: "Language and Communication 4 · naming circles, squares, triangles and rectangles",
      patterns: "Language and Communication 4 · copying and extending repeating patterns",
      "big-and-small": "Discovery and Invention 2 · comparing size, height, length and weight",
      "sort-it": "Discovery and Invention 2 · sorting objects by colour, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Language and Communication"],
    standards: {
      "letter-names": "Language and Communication 4 · knowing the names of capital letters",
      "first-sounds": "Language and Communication 4 · hearing the first sound in a word",
      "rhyme-time": "Language and Communication 1 · hearing words that rhyme",
      "clap-the-parts": "Language and Communication 1 · clapping the parts of spoken words",
      "listen-to-a-story": "Language and Communication 2 · listening to a short story and answering questions about it",
      "word-meanings": "Language and Communication 1 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Discovery and Invention", "Personal and Social Responsibility: respect for the environment"],
    standards: {
      "five-senses": "Discovery and Invention 2 · exploring the world with the five senses",
      "living-or-not": "Discovery and Invention 2 · telling living things from things that are not alive",
      "animals-and-babies": "Discovery and Invention 1 · where animals live, their babies and their body parts",
      "weather-and-sky": "Discovery and Invention 2 · noticing weather, day and night",
      "plants-grow": "Personal and Social Responsibility 5 · what plants need and how they grow from seeds",
      "sink-or-float": "Discovery and Invention 2 · predicting and testing what sinks, floats and moves",
    },
  },
  social: {
    bigIdeas: ["Well-being", "Personal and Social Responsibility"],
    standards: {
      "my-family": "Well-being 4; Well-being 3 · knowing about myself, my family and staying healthy",
      feelings: "Well-being 2; Well-being 5 · naming feelings and noticing how others feel",
      "community-helpers": "Personal and Social Responsibility 2 · people who help in the community",
      "places-around-me": "Personal and Social Responsibility 2 · places in the community and what happens there",
      "taking-turns": "Personal and Social Responsibility 1; Personal and Social Responsibility 4 · sharing, taking turns and being fair",
      "first-next-last": "Well-being 3 · daily routines in order",
      "caring-for-our-world": "Personal and Social Responsibility 5 · caring for the environment and living things",
    },
  },
});
