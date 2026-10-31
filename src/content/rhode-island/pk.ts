import { preKCourses } from "../prek";

// Rhode Island pre-K, the RI Pre-K year for four-year-olds in public schools, Head Start and community programs. It
// follows the Rhode Island Early Learning and Development Standards (2023 edition); the shared Pre-K units cite their
// learning goals, for example "M 1.a" (docs/research/rhode-island/prek/).
export const courses = preKCourses("us-ri", {
  math: {
    bigIdeas: ["Number Sense and Quantity", "Number Relationships", "Classification and Patterning", "Measurement", "Geometry and Spatial Sense"],
    standards: {
      "count-to-5": "M 1.a · counting and knowing how many",
      "find-the-number": "M 1.a · recognizing the written numbers",
      "more-or-fewer": "M 2.a · comparing groups as more, fewer or the same",
      shapes: "M 5.a · naming shapes and what they are like",
      patterns: "M 3.a · copying and extending repeating patterns",
      "big-and-small": "M 4.a · comparing size, height, length and weight",
      "sort-it": "M 3.a · sorting objects by what they share",
    },
  },
  language: {
    bigIdeas: ["Language Development", "Phonological Awareness", "Print Concepts", "Comprehension and Interest"],
    standards: {
      "letter-names": "L 2.a · knowing the names of letters",
      "first-sounds": "L 1.a; L 2.a · hearing the first sound in a word",
      "rhyme-time": "L 1.a · hearing words that rhyme",
      "clap-the-parts": "L 1.a · clapping the syllables in words",
      "listen-to-a-story": "L 3.a; LD 1.a · listening to a short story and answering questions about it",
      "word-meanings": "LD 2.a · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Scientific Practices", "Physical Science", "Earth and Space Science", "Life Science"],
    standards: {
      "five-senses": "S 1.a · observing and investigating the world",
      "living-or-not": "S 4.a · the characteristics of living things",
      "animals-and-babies": "S 4.a · the needs and life cycles of animals",
      "weather-and-sky": "S 3.a · weather and the features of earth and sky",
      "plants-grow": "S 4.a; S 3.a · what plants need to live and grow",
      "sink-or-float": "S 2.a; S 1.a · the properties of objects and materials",
    },
  },
  social: {
    bigIdeas: ["Civics and Government", "Economics", "History", "Geography", "Social and Emotional Development"],
    standards: {
      "my-family": "SS 3.b · being a member of a family and community",
      feelings: "SE 3.a; SE 2.a · naming and managing feelings",
      "community-helpers": "SS 2.a · jobs and occupations in the community",
      "places-around-me": "SS 4.a · location and the places where we live",
      "taking-turns": "SS 1.a; SE 1.b · rules, fairness and getting along with others",
      "first-next-last": "SS 3.a · the passage of time",
      "caring-for-our-world": "SS 1.a · caring for the community through personal responsibility",
    },
  },
});
