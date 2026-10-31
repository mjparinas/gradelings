import { preKCourses } from "../prek";

// Pennsylvania pre-K, the year for four-year-olds in Pre-K Counts, Head Start and other early learning programs. It
// follows the Pennsylvania Learning Standards for Early Childhood, Pre-Kindergarten (2024); the shared Pre-K units cite
// their standards by their own codes, which start with the standard area, for example "2.1 PK.A.2.1"
// (docs/research/pennsylvania/prek/).
export const courses = preKCourses("us-pa", {
  math: {
    bigIdeas: ["Numbers and Operations", "Algebraic Concepts", "Geometry", "Measurement, Data, and Probability"],
    standards: {
      "count-to-5": "2.1 PK.A.2.1; 2.1 PK.A.2.2; 2.1 PK.A.2.3 · seeing and counting small groups",
      "find-the-number": "2.1 PK.A.1.1; 2.1 PK.A.1.3 · naming numerals and matching them to sets",
      "more-or-fewer": "2.1 PK.A.3.2 · comparing groups as greater, less or equal",
      shapes: "2.3 PK.A.1.1; 2.3 PK.A.1.2 · naming shapes and their attributes",
      patterns: "2.4 PK.A.1.5 · sorting and ordering by one attribute, the first step to seeing what repeats (pre-K has no pattern standard)",
      "big-and-small": "2.4 PK.A.1.7; 2.4 PK.A.1.1 · comparing measurable attributes",
      "sort-it": "2.4 PK.A.4.1 · classifying objects into categories",
    },
  },
  language: {
    bigIdeas: ["Foundational Skills", "Reading Literature", "Reading Informational Text", "Speaking and Listening"],
    standards: {
      "letter-names": "1.1 PK.B.2 · recognizing and naming upper and lower case letters",
      "first-sounds": "1.1 PK.C.4; 1.1 PK.C.2 · hearing the first sound in a word",
      "rhyme-time": "1.1 PK.C.1 · recognizing rhyming words",
      "clap-the-parts": "1.1 PK.C.3 · counting syllables in spoken words",
      "listen-to-a-story": "1.3 PK.B.1; 1.3 PK.C.3 · listening to a story and answering questions about it",
      "word-meanings": "1.2 PK.J.1; 1.3 PK.I.3 · new vocabulary and words that mean similar things",
    },
  },
  science: {
    bigIdeas: ["Life Science", "Physical Science", "Earth and Space Science", "Environmental Literacy and Sustainability"],
    standards: {
      "five-senses": "3.1 PK.A.8; 3.2 PK.A.6 · using the five senses to gather information",
      "living-or-not": "3.1 PK.A.1 · sorting living and non-living things",
      "animals-and-babies": "3.1 PK.A.14; 3.1 PK.A.2 · how people and animals change as they grow",
      "weather-and-sky": "3.3 PK.A.1; 3.3 PK.A.2 · the seasons and the weather",
      "plants-grow": "3.1 PK.A.13; 3.1 PK.A.3 · how living things grow and what they need",
      "sink-or-float": "3.2 PK.A.2; 3.2 PK.A.7 · describing objects by their properties and predicting results",
    },
  },
  social: {
    bigIdeas: ["Civics and Government", "Economics", "Geography", "History", "Social and Emotional Development"],
    standards: {
      "my-family": "16.2 PK.B.5; 5.2 PK.A.4 · families and responsibilities at home",
      feelings: "16.1 PK.A.1; 16.1 PK.A.4; 16.2 PK.A.8 · recognizing and naming feelings and showing empathy",
      "community-helpers": "5.3 PK.C.1; 5.3 PK.C.3 · the work community workers do",
      "places-around-me": "7.1 PK.B.2; 7.2 PK.A.2; 7.1 PK.A.1 · position words, familiar places and simple maps",
      "taking-turns": "16.2 PK.A.9; 16.2 PK.D.2; 5.1 PK.A.1 · sharing, taking turns, solving conflicts and classroom rules",
      "first-next-last": "8.1 PK.A.2; 8.1 PK.A.1 · the daily routine and past, present and future",
      "caring-for-our-world": "3.4 PK.D.3; 3.4 PK.D.5 · handling litter and recycling",
    },
  },
});
