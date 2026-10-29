import { preKCourses } from "../prek";

// NWT Junior Kindergarten, the free school year for four-year-olds. It follows the NWT Junior Kindergarten /
// Kindergarten Curriculum, A Holistic Approach to Children's Early Learning (2017), whose eleven General Competencies
// have numbered Integrated Curricular Outcomes; the shared Pre-K units cite them ("11.4") (docs/research/northwest-territories/prek/).
export const courses = preKCourses("ca-nt", {
  math: {
    bigIdeas: ["Applied Literacies: Mathematics", "Problem Solving and Decision-Making"],
    standards: {
      "count-to-5": "11.2; 11.3 · seeing and counting small groups to 5",
      "find-the-number": "11.4 · matching the numerals 1 to 10 to how many",
      "more-or-fewer": "11.6 · comparing groups as more, fewer or the same",
      shapes: "11.11 · naming circles, squares, triangles and rectangles",
      patterns: "11.8 · copying and extending repeating patterns",
      "big-and-small": "11.10 · comparing size, height, length and weight",
      "sort-it": "9.14; 11.12 · sorting objects by colour, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Applied Literacies: Reading and Writing", "Conversation and Communication"],
    standards: {
      "letter-names": "10.15 · knowing the names of capital letters",
      "first-sounds": "10.12; 10.14 · hearing the first sound in a word",
      "rhyme-time": "10.19 · hearing words that rhyme",
      "clap-the-parts": "10.12; 10.19 · clapping the parts of spoken words",
      "listen-to-a-story": "6.4; 10.6 · listening to a short story and answering questions about it",
      "word-meanings": "10.18 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Problem Solving and Decision-Making", "Relationship with the Land", "Healthy Living"],
    standards: {
      "five-senses": "9.8 · exploring the world with the five senses",
      "living-or-not": "9.14 · sorting living things from things that are not alive",
      "animals-and-babies": "5.5 · how animals grow and change",
      "weather-and-sky": "3.17; 2.20 · noticing weather and dressing for it",
      "plants-grow": "5.5; 3.3 · what plants need and how they grow from seeds",
      "sink-or-float": "9.8 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Sense of Identity", "Citizenship", "Self-Regulation", "Collaboration and Teamwork", "Relationship with the Land"],
    standards: {
      "my-family": "1.5; 2.2 · knowing about myself, my family and staying healthy",
      feelings: "5.2; 5.16 · naming feelings in myself and others",
      "community-helpers": "4.3; 4.14 · community helpers and the work people do",
      "places-around-me": "1.9 · familiar places in the community",
      "taking-turns": "7.8; 4.1 · taking turns, sharing and following rules",
      "first-next-last": "5.7; 5.8 · daily routines and events in order",
      "caring-for-our-world": "3.1 · caring for the land and the environment",
    },
  },
});
