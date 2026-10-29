import { preKCourses } from "../prek";

// Ontario Junior Kindergarten, the first year of the two-year Kindergarten Curriculum (2026). It works on the same
// expectations as Kindergarten, so the shared Pre-K units cite them by code (docs/research/ontario/prek/).
export const courses = preKCourses("ca-on", {
  math: {
    bigIdeas: ["Number Sense and Operations", "Patterns and Relationships", "Data Literacy and Probability", "Geometric and Spatial Reasoning", "Measurement"],
    standards: {
      "count-to-5": "A6.4; A6.8 · seeing and counting small groups to 5",
      "find-the-number": "A6.3 · recognizing the written numbers",
      "more-or-fewer": "A6.6 · comparing groups as more, fewer or the same",
      shapes: "A9.1 · naming and comparing common shapes",
      patterns: "A7.1; A7.4 · copying and extending repeating patterns",
      "big-and-small": "A10.2 · comparing size, length and mass",
      "sort-it": "A8.1 · sorting objects by one attribute",
    },
  },
  language: {
    bigIdeas: ["Oral and Non-Verbal Communication", "Foundations for Reading and Writing", "Understanding and Responding to Texts"],
    standards: {
      "letter-names": "A2.1 · naming capital letters",
      "first-sounds": "A2.3 · hearing the first sound in a word",
      "rhyme-time": "A2.3 · hearing words that rhyme",
      "clap-the-parts": "A2.3 · clapping the parts of spoken words",
      "listen-to-a-story": "A1.1; A3.3 · listening to a short story and answering questions about it",
      "word-meanings": "A1.3 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Investigation and Engineering Design", "Exploring Environments", "Respect and Care for Nature"],
    standards: {
      "five-senses": "B12.2 · observing with the five senses",
      "living-or-not": "B13.2 · sorting living and non-living things",
      "animals-and-babies": "B13.2; D23.1 · animals, their homes and their young",
      "weather-and-sky": "B13.1 · describing weather, day and night",
      "plants-grow": "B13.1 · what plants need and how they grow from seeds",
      "sink-or-float": "B12.2 · predicting and observing what sinks, floats and moves",
    },
  },
  social: {
    bigIdeas: ["Social Skills", "Self-Regulation", "Identity and Self-Image", "People and Communities", "Respect and Care for Nature"],
    standards: {
      "my-family": "D19.2; C16.3 · knowing about myself, my family and staying healthy",
      feelings: "C15.5; C16.5 · naming feelings and responding to others' feelings",
      "community-helpers": "D22.1 · people in the community and what they do",
      "places-around-me": "D22.2 · places and buildings in the community and what they are for",
      "taking-turns": "C14.2; C14.3 · taking turns and making friends",
      "first-next-last": "C15.1 · daily routines in order",
      "caring-for-our-world": "D23.3 · caring for and respecting the environment",
    },
  },
});
