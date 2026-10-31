import { preKCourses } from "../prek";

// Indiana pre-K, the year before kindergarten in schools, Head Start and On My Way Pre-K programs. It follows the
// Indiana Early Learning Standards (2023); the shared Pre-K units cite their older-preschool indicators, for example
// "M1.1.o.e" (docs/research/indiana/prek/).
export const courses = preKCourses("us-in", {
  math: {
    bigIdeas: ["Numeracy", "Computation and Algebraic Thinking", "Data Analysis", "Geometry", "Measurement"],
    standards: {
      "count-to-5": "M1.1.o.e; M1.1.o.b · seeing and counting small groups",
      "find-the-number": "M1.2.o.b; M1.2.o.a · recognizing the written numbers",
      "more-or-fewer": "M1.3.o.a; M1.3.o.c · comparing groups as more, fewer or the same",
      shapes: "M4.2.o.a; M4.2.o.b · naming and telling apart circles, squares, triangles and rectangles",
      patterns: "M2.2.o.a · copying and extending repeating patterns",
      "big-and-small": "M5.2.o.a · comparing size, height, length and weight",
      "sort-it": "M3.1.o.b; M3.1.o.a · sorting objects in more than one way",
    },
  },
  language: {
    bigIdeas: ["Communication Process", "Early Reading", "Early Writing"],
    standards: {
      "letter-names": "ELA.2.1.b · knowing the names of letters",
      "first-sounds": "ELA.2.2.h; ELA.2.2.a · hearing the first sound in a word",
      "rhyme-time": "ELA.2.2.b; ELA.2.2.d · hearing and making words that rhyme",
      "clap-the-parts": "ELA.2.2.f · clapping the syllables in words",
      "listen-to-a-story": "ELA.2.4.b; ELA.2.4.d · listening to a short story and answering questions about it",
      "word-meanings": "ELA.1.2.a; ELA.1.1.e · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["Physical Science", "Earth and Space Science", "Life Science", "Scientific Inquiry and Method"],
    standards: {
      "five-senses": "SC1.1.o.a · using the senses to observe",
      "living-or-not": "SC3.1.o.b; SC3.1.o.a · telling living things from things that are not alive",
      "animals-and-babies": "SC3.1.yo.a; SC3.1.o.c · animals, their body parts and how they grow",
      "weather-and-sky": "SC2.1.o.a; SC2.1.yo.a · how the weather and the seasons change",
      "plants-grow": "SC3.2.o.c · what plants and animals need to live and grow",
      "sink-or-float": "SC1.2.o.a; SC5.1.o.b · testing objects to find out what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Self", "History and Events", "Geography", "Economics", "Citizenship", "Student Wellbeing"],
    standards: {
      "my-family": "SS1.1.o.c; SW1.1.o.a · family, community and culture",
      feelings: "SW1.2.o.a; SW1.2.o.d · naming your own feelings and others' feelings",
      "community-helpers": "SS2.3.o.a; SS4.1.o.b · community helpers and the work they do",
      "places-around-me": "SS3.2.o.a; SS3.1.o.a · places in the community and where things are",
      "taking-turns": "SS5.1.o.a; SS5.1.o.d; SW3.1.o.a · working together, following rules and solving problems kindly",
      "first-next-last": "SS2.2.o.a; SS2.1.o.a · time words like before, after, first and last",
      "caring-for-our-world": "SS5.1.o.f · caring for the community we share",
    },
  },
});
