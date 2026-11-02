import { preKCourses } from "../prek";

// New Mexico pre-K, the year before Kindergarten. It follows the New Mexico Early Learning Standards (Early Childhood
// Education and Care Department, 2026), which cover birth to kindergarten and are numbered by domain, section and letter
// (`2.2.D`, rhyming and word play; `5.1.A`, numbers and counting) (docs/research/new-mexico/prek/).
export const courses = preKCourses("us-nm", {
  math: {
    bigIdeas: ["Number and Counting", "Shapes and Space", "Measurement", "Sorting and Patterns"],
    standards: {
      "count-to-5": "5.1.A · counting small groups and knowing how many",
      "find-the-number": "5.1.A · recognizing the written numbers",
      "more-or-fewer": "5.1.A; 5.1.E · comparing groups as more, fewer or the same",
      shapes: "5.1.B · naming basic shapes",
      patterns: "5.1.E · copying and extending patterns",
      "big-and-small": "5.1.D · comparing size, length and weight",
      "sort-it": "5.1.E · sorting and comparing objects",
    },
  },
  language: {
    bigIdeas: ["Listening and Communicating", "Foundational Literacy", "Foundational Reading", "Foundational Writing"],
    standards: {
      "letter-names": "2.2.E · knowing the names of letters",
      "first-sounds": "2.2.F · hearing the first sound in a word",
      "rhyme-time": "2.2.D · hearing and making words that rhyme",
      "clap-the-parts": "2.2.C · clapping the syllables in words",
      "listen-to-a-story": "2.3.B · listening to a short story and answering questions about it",
      "word-meanings": "2.1.D · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Investigating the Physical and Natural Worlds", "Using Senses and Tools", "Cause and Effect"],
    standards: {
      "five-senses": "5.2.C · using senses and tools to investigate",
      "living-or-not": "5.2.A · telling living things from things that are not alive",
      "animals-and-babies": "5.2.A · animals and what they need to live",
      "weather-and-sky": "5.2.A · noticing weather and how it changes",
      "plants-grow": "5.2.A · caring for plants and watching them grow",
      "sink-or-float": "5.2.D; 5.2.C · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Approaches to Learning", "Self and Identity", "Community and Belonging", "Relationships with Other Children"],
    standards: {
      "my-family": "4.2.A · knowing about myself, my family and where I belong",
      feelings: "4.1.B · naming feelings and showing them",
      "community-helpers": "4.2.C · knowing about the community and the people in it",
      "places-around-me": "4.2.C · places in the community",
      "taking-turns": "4.4.C · taking turns, sharing and working together",
      "first-next-last": "1.3.A · remembering and following steps: first, next and last",
      "caring-for-our-world": "4.2.D · rights and responsibilities, including caring for shared spaces",
    },
  },
});
