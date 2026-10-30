import { preKCourses } from "../prek";

// New Jersey pre-K, the year of public preschool before kindergarten. It follows the New Jersey Preschool Teaching and
// Learning Standards (2014); the shared Pre-K units cite their preschool learning outcomes, for example "4.1.6" or
// "RF.PK.2a" (docs/research/new-jersey/prek/).
export const courses = preKCourses("us-nj", {
  math: {
    bigIdeas: ["Number and Counting", "Numerical Operations", "Measurement and Patterns", "Spatial and Geometric Sense"],
    standards: {
      "count-to-5": "4.1.4; 4.1.5 · seeing and counting small groups to 5",
      "find-the-number": "4.1.2 · recognizing the written numbers",
      "more-or-fewer": "4.1.6 · comparing groups as more, fewer or the same",
      shapes: "4.4.2 · naming circles, squares, triangles and rectangles",
      patterns: "4.3.1 · copying and extending repeating patterns",
      "big-and-small": "4.3.3; 4.3.2 · comparing size, height, length and weight",
      "sort-it": "4.3.1 · sorting objects by color, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Reading Literature", "Foundational Skills", "Speaking and Listening", "Vocabulary"],
    standards: {
      "letter-names": "RF.PK.1d · recognizing and naming letters",
      "first-sounds": "RF.PK.2c · hearing the first sound in a word",
      "rhyme-time": "RF.PK.2a · hearing and making words that rhyme",
      "clap-the-parts": "RF.PK.2b · clapping the syllables in words",
      "listen-to-a-story": "RL.PK.1; RL.PK.3 · listening to a short story and answering questions about it",
      "word-meanings": "L.PK.5a; L.PK.5b · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Inquiry Skills", "Physical Science", "Life Science", "Earth Science"],
    standards: {
      "five-senses": "5.1.2; 5.2.3 · observing with the senses",
      "living-or-not": "5.3.2 · telling living things from things that are not alive",
      "animals-and-babies": "5.3.1; 5.3.3 · animals, their homes and how they grow",
      "weather-and-sky": "5.4.3 · noticing and recording the weather",
      "plants-grow": "5.3.4; 5.4.2 · what plants need and how they grow",
      "sink-or-float": "5.2.1; 5.1.2 · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social/Emotional Development", "Self and Family", "Community", "Culture", "Caring for the Environment"],
    standards: {
      "my-family": "6.1.1; 6.1.2 · knowing about myself and my family",
      feelings: "0.3.1; 0.3.2 · naming feelings in myself and others",
      "community-helpers": "6.3.2 · community workers and what they do",
      "places-around-me": "6.3.1 · places in the neighborhood and community",
      "taking-turns": "0.5.4; 0.5.5 · taking turns and sharing",
      "first-next-last": "0.2.3; 6.2.1 · daily routines in order",
      "caring-for-our-world": "5.4.4 · caring for our environment",
    },
  },
});
