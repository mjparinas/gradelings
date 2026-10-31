import { preKCourses } from "../prek";

// Georgia pre-K, the free Georgia's Pre-K Program for four-year-olds. It follows the Georgia Early Learning and
// Development Standards (GELDS); the shared Pre-K units cite their 48 to 60 months indicators, for example "CD-MA2.4b"
// (docs/research/georgia/prek/).
export const courses = preKCourses("us-ga", {
  math: {
    bigIdeas: ["Number and Quantity", "Measurement and Comparison", "Classification and Patterning", "Geometry and Spatial Reasoning"],
    standards: {
      "count-to-5": "CD-MA1.4e; CD-MA2.4e · seeing and counting small groups to 5",
      "find-the-number": "CD-MA1.4c · recognizing the written numbers",
      "more-or-fewer": "CD-MA1.4d · comparing groups as more, fewer or the same",
      shapes: "CD-MA6.4a · naming circles, squares, triangles and rectangles",
      patterns: "CD-MA4.4c · copying and extending repeating patterns",
      "big-and-small": "CD-MA3.4b · comparing size, height, length and weight",
      "sort-it": "CD-MA4.4b · sorting objects by color, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Receptive and Expressive Language", "Comprehension", "Phonological Awareness", "Print Concepts"],
    standards: {
      "letter-names": "CLL7.4a · recognizing and naming letters",
      "first-sounds": "CLL6.4c · hearing the first sound in a word",
      "rhyme-time": "CLL6.4b · hearing and making words that rhyme",
      "clap-the-parts": "CLL6.4e · clapping the syllables in words",
      "listen-to-a-story": "CLL5.4b; CLL5.4c · listening to a short story and answering questions about it",
      "word-meanings": "CLL2.4a; CLL4.4d · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Scientific Skills and Methods", "Earth and Space", "Life Science", "Physical Science"],
    standards: {
      "five-senses": "CD-SC1.4a · observing with the five senses",
      "living-or-not": "CD-SC3.4b · telling living things from things that are not alive",
      "animals-and-babies": "CD-SC3.4a · animals, their needs and how they grow",
      "weather-and-sky": "CD-SC2.4c; CD-SC2.4d · noticing weather, the sun, the moon and the stars",
      "plants-grow": "CD-SC3.4a · what plants need and how they grow",
      "sink-or-float": "CD-SC1.4d; CD-SC4.4c · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social and Emotional Development", "Family and Culture", "Community", "Economics", "History"],
    standards: {
      "my-family": "CD-SS1.4a; SED1.4b · knowing about myself and my family",
      feelings: "SED2.4b; SED5.4d · naming feelings in myself and others",
      "community-helpers": "CD-SS4.4b · people in the community and the work they do",
      "places-around-me": "CD-SS3.4a; CD-SS3.4b · places at home, school and in the community",
      "taking-turns": "SED5.4b; CD-SS2.4a · taking turns, playing together and following rules",
      "first-next-last": "CD-SS5.4a; SED3.4a · daily routines in order",
      "caring-for-our-world": "CD-SC5.4a · caring for our environment",
    },
  },
});
