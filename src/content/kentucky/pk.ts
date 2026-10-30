import { preKCourses } from "../prek";

// Kentucky pre-K, the public preschool year for four-year-olds. It follows the Kentucky Early Childhood Standards for
// three- and four-year-olds; the benchmark numbers repeat in each domain, so the shared Pre-K units cite the domain and
// benchmark, for example "Mathematics 1.1" (docs/research/kentucky/prek/).
export const courses = preKCourses("us-ky", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Shapes and Position", "Comparing and Patterning", "Measurement"],
    standards: {
      "count-to-5": "Mathematics 1.1 · seeing and counting small groups to 5",
      "find-the-number": "Mathematics 1.1 · recognizing the written numbers",
      "more-or-fewer": "Mathematics 1.1; Mathematics 1.3 · comparing groups as more, fewer or the same",
      shapes: "Mathematics 1.2 · naming circles, squares, triangles and rectangles",
      patterns: "Mathematics 1.3 · copying and extending repeating patterns",
      "big-and-small": "Mathematics 1.4 · comparing size, height, length and weight",
      "sort-it": "Mathematics 1.3 · sorting objects by color, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Listening and Speaking", "Alphabet Knowledge", "Phonological Awareness", "Comprehension"],
    standards: {
      "letter-names": "Language and Early Literacy 3.3 · knowing the names of letters",
      "first-sounds": "Language and Early Literacy 3.4 · hearing the first sound in a word",
      "rhyme-time": "Language and Early Literacy 3.4 · hearing words that rhyme",
      "clap-the-parts": "Language and Early Literacy 3.4 · clapping the parts of spoken words",
      "listen-to-a-story": "Language and Early Literacy 3.5; Language and Early Literacy 3.6 · listening to a short story and answering questions about it",
      "word-meanings": "Language and Early Literacy 2.2 · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Observing and Comparing", "Using Tools to Explore", "The Scientific Process"],
    standards: {
      "five-senses": "Science 1.1 · observing with the senses",
      "living-or-not": "Science 1.1 · telling living things from things that are not alive",
      "animals-and-babies": "Science 1.1 · animals and how they grow",
      "weather-and-sky": "Science 1.1 · noticing weather and the sky",
      "plants-grow": "Science 1.1; Science 1.3 · what plants need and how they grow",
      "sink-or-float": "Science 1.3 · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Health/Mental Wellness", "Families and Community", "Past, Present and Future", "Places and Environments"],
    standards: {
      "my-family": "Social Studies 1.5; Health/Mental Wellness 1.4 · knowing about myself and my family",
      feelings: "Health/Mental Wellness 1.4; Health/Mental Wellness 1.5 · naming feelings and getting along",
      "community-helpers": "Social Studies 1.5; Social Studies 1.3 · people in the community and the work they do",
      "places-around-me": "Social Studies 1.2 · places and features around me",
      "taking-turns": "Health/Mental Wellness 1.2; Social Studies 1.4 · taking turns, sharing and following rules",
      "first-next-last": "Social Studies 1.1 · what happened before, now and next",
      "caring-for-our-world": "Social Studies 1.2; Science 1.1 · caring for our environment",
    },
  },
});
