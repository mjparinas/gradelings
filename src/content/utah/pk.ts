import { preKCourses } from "../prek";

// Utah pre-K, the year before Kindergarten. It follows the Utah Core State Standards for Early Learning, Ages 3 to 5, from
// the Utah State Board of Education: the standards for four-year-olds in mathematics (`Math 4.1.4`), English language arts
// (`P4.R.2.a`), science (`Sci 3-4.1.1`, one band for ages 3 and 4), social studies (`SS 4.7.2`) and learning and life skills
// (`LLP 4.5.2`) (docs/research/utah/prek/).
export const courses = preKCourses("us-ut", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Measurement and Data", "Geometry"],
    standards: {
      "count-to-5": "Math 4.1.5; Math 4.1.6 · counting small groups and knowing how many",
      "find-the-number": "Math 4.1.4 · naming written numerals",
      "more-or-fewer": "Math 4.1.7; Math 4.3.4 · comparing groups as more, fewer or the same",
      shapes: "Math 4.4.2 · naming basic shapes",
      patterns: "Math 4.2.5 · copying and extending simple patterns",
      "big-and-small": "Math 4.3.1; Math 4.3.2 · describing and comparing size, length and weight",
      "sort-it": "Math 4.3.3 · sorting objects by color, size and shape",
    },
  },
  language: {
    bigIdeas: ["Speaking and Listening", "Reading", "Writing"],
    standards: {
      "letter-names": "P4.R.3.a · knowing letter names and sounds",
      "first-sounds": "P4.R.2.c · hearing the first sound in a word",
      "rhyme-time": "P4.R.2.a · hearing rhyming words",
      "clap-the-parts": "P4.R.2.b · clapping the syllables in words",
      "listen-to-a-story": "P4.R.5; P4.R.6-7 · answering questions about a story and retelling it",
      "word-meanings": "P4.R.8 · asking about and learning new words",
    },
  },
  science: {
    bigIdeas: ["Weather", "Light", "Living Things", "Matter and Motion"],
    standards: {
      "five-senses": "Sci 3-4.2.1 · investigating with the five senses",
      "living-or-not": "Sci 3-4.3.2 · living things and the places they live",
      "animals-and-babies": "Sci 3-4.3.3 · how animals and their young survive",
      "weather-and-sky": "Sci 3-4.1.1 · observing and describing the weather",
      "plants-grow": "Sci 3-4.2.3; Sci 3-4.3.1 · what plants need to grow",
      "sink-or-float": "Sci 3-4.4.1 · classifying materials by what they are like",
    },
  },
  social: {
    bigIdeas: ["Culture and Community", "Change over Time", "People, Places and Environments", "Civic Life and Economics"],
    standards: {
      "my-family": "SS 4.4.1; SS 4.1.1 · knowing who I am and how I am like others",
      feelings: "LLP 4.5.2 · knowing that feelings can change",
      "community-helpers": "SS 4.7.2 · jobs people do in the community",
      "places-around-me": "SS 4.3.1 · people and places around me",
      "taking-turns": "SS 4.5.1 · sharing, taking turns and getting along",
      "first-next-last": "SS 4.2.1 · noticing how things change over time",
      "caring-for-our-world": "SS 4.3.3 · caring for home, school and the environment",
    },
  },
});
