import { preKCourses } from "../prek";

// Prince Edward Island Pre-K, the year before Kindergarten. The province's four- and five-year-olds attend Early Years Centres,
// which follow the PEI Early Learning Framework (Department of Education and Early Childhood Development). It has twelve learning
// goals in four areas; units cite the goal by name (docs/research/prince-edward-island/prek/).
export const courses = preKCourses("ca-pe", {
  math: {
    bigIdeas: ["Problem Solving and Numeracy"],
    standards: {
      "count-to-5": "Problem Solving and Numeracy · counting small groups of objects",
      "find-the-number": "Problem Solving and Numeracy · recognizing the written numbers",
      "more-or-fewer": "Problem Solving and Numeracy · comparing groups as more, fewer or the same",
      shapes: "Problem Solving and Numeracy · naming and sorting shapes",
      patterns: "Problem Solving and Numeracy · copying and extending simple patterns",
      "big-and-small": "Problem Solving and Numeracy · comparing size, length and weight",
      "sort-it": "Problem Solving and Numeracy · sorting objects into groups",
    },
  },
  language: {
    bigIdeas: ["Language and Literacies", "Symbols and Representation", "Creativity and the Arts"],
    standards: {
      "letter-names": "Symbols and Representation; Language and Literacies · knowing the names of letters and their sounds",
      "first-sounds": "Language and Literacies · hearing the first sound in a word",
      "rhyme-time": "Language and Literacies · hearing and making words that rhyme",
      "clap-the-parts": "Language and Literacies · clapping the syllables in words",
      "listen-to-a-story": "Language and Literacies · listening to a short story, answering questions and retelling it",
      "word-meanings": "Language and Literacies · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Curious Investigation", "Reason, Logic, and Scientific Inquiry"],
    standards: {
      "five-senses": "Curious Investigation · observing with the senses",
      "living-or-not": "Curious Investigation · telling living things from things that are not alive",
      "animals-and-babies": "Curious Investigation · observing animals and what they need to live",
      "weather-and-sky": "Curious Investigation · noticing weather and how it changes",
      "plants-grow": "Curious Investigation · caring for plants and watching them grow",
      "sink-or-float": "Reason, Logic, and Scientific Inquiry · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Well-Being", "Social and Personal Responsibility"],
    standards: {
      "my-family": "A Sense of Identity and Self-Concept; Culture and Heritage · knowing about myself and my family",
      feelings: "Emotional Health and Belonging · naming feelings in myself and others",
      "community-helpers": "Emotional Health and Belonging · belonging to a community and the people in it",
      "places-around-me": "Culture and Heritage · the families and communities I belong to",
      "taking-turns": "Self Regulation and Self-Discipline · taking turns, sharing and following rules",
      "first-next-last": "Self Regulation and Self-Discipline · following a series of steps in order: first, next and last",
      "caring-for-our-world": "Environmental Awareness and Care of the Earth · caring for our surroundings",
    },
  },
});
