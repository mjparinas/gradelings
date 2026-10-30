import { preKCourses } from "../prek";

// Ohio preschool, the year before kindergarten in public preschool, Head Start and Step Up To Quality programs. It
// follows Ohio's Early Learning and Development Standards (2022); the shared Pre-K units cite their progression steps
// with the domain, for example "Math 1.c.4" (docs/research/ohio/prek/).
export const courses = preKCourses("us-oh", {
  math: {
    bigIdeas: ["Number Sense", "Number Relationships and Operations", "Measurement and Data", "Geometry"],
    standards: {
      "count-to-5": "Math 1.c.4; Math 1.b.5 · seeing and counting small groups",
      "find-the-number": "Math 1.d.4; Math 1.d.3 · recognizing the written numbers",
      "more-or-fewer": "Math 2.a.5 · comparing groups as more, fewer or the same",
      shapes: "Math 4.a.6; Math 4.a.4 · naming circles, squares, triangles and rectangles",
      patterns: "Math 3.c.3 · copying and extending repeating patterns",
      "big-and-small": "Math 3.a.4; Math 3.a.5 · comparing size, height, length and weight",
      "sort-it": "Math 3.b.4 · sorting objects by color, size and shape",
    },
  },
  language: {
    bigIdeas: ["Language and Communication", "Phonological Awareness", "Print Awareness", "Emergent Writing"],
    standards: {
      "letter-names": "Language 3.b.6 · knowing the names of letters",
      "first-sounds": "Language 2.b.8; Language 2.b.9 · hearing the first sound in a word",
      "rhyme-time": "Language 2.c.6; Language 2.c.7 · hearing and repeating words that rhyme",
      "clap-the-parts": "Language 2.a.8 · clapping the syllables in words",
      "listen-to-a-story": "Language 1.e.4; Language 1.e.5 · listening to a short story and answering questions about it",
      "word-meanings": "Language 1.b.6; Language 1.b.5 · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Science Inquiry and Application", "Cause and Effect"],
    standards: {
      "five-senses": "Science 1.a.1; Science 1.a.3 · exploring with the senses",
      "living-or-not": "Science 1.a.5 · comparing things, such as living and not living",
      "animals-and-babies": "Science 1.a.4; Science 1.a.5 · asking questions about animals and comparing them",
      "weather-and-sky": "Science 1.a.4; Science 1.b.6 · noticing the weather and the sky and explaining what happens",
      "plants-grow": "Science 1.b.4; Science 1.b.5 · what makes plants grow",
      "sink-or-float": "Science 1.a.5; Science 1.b.5 · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["People, Communities and their Environment", "Self-Awareness", "Social Awareness", "Relationship Skills"],
    standards: {
      "my-family": "Social Studies 1.a.4; Social Studies 1.a.5 · family routines and traditions",
      feelings: "Social-Emotional 1.b.4; Social-Emotional 3.a.2 · naming your own feelings and how others feel",
      "community-helpers": "Social-Emotional 4.a.5; Social Studies 1.b.4 · trusted adults who help, and what people need",
      "places-around-me": "Social Studies 1.c.2; Social Studies 1.c.6 · familiar places at home and school",
      "taking-turns": "Social-Emotional 4.c.4; Social-Emotional 4.b.4; Social Studies 1.c.5 · playing together, solving conflicts and following rules",
      "first-next-last": "Cognitive 1.a.5 · retelling a sequence of events in order",
      "caring-for-our-world": "Social Studies 1.d.4; Social Studies 1.d.5 · caring for the environment and its resources",
    },
  },
});
