import { preKCourses } from "../prek";

// Maryland pre-K, the year before Kindergarten. It follows MSDE's Prekindergarten standards: the mathematics standards
// (`PK.NOS.B.5`), English language arts (`RF.PK.2.a`), social studies (`G.1.b`) and the science indicators for four-year-olds
// (`2.E.2`), with the Social Foundations indicators (`P4.1.2.1.2`) for feelings, friends and turns (docs/research/maryland/prek/).
export const courses = preKCourses("us-md", {
  math: {
    bigIdeas: ["Number and Operations in Base Ten (Number Names and the Count Sequence)", "Counting to Tell the Number of Objects", "Algebraic Thinking and Patterns", "Geometry and Measurement"],
    standards: {
      "count-to-5": "PK.NOS.B.5; PK.NOS.B.8 · counting small groups and seeing how many",
      "find-the-number": "PK.NOS.A.4 · recognizing written numerals",
      "more-or-fewer": "PK.NOS.C.9 · comparing groups as more, fewer or the same",
      shapes: "PK.GR.B.3; PK.GR.B.4 · matching and naming shapes",
      patterns: "PK.AT.B.3 · copying and extending repeating patterns",
      "big-and-small": "PK.GR.A.1; PK.GR.A.2 · describing and comparing size, height, length and weight",
      "sort-it": "PK.DS.A.1 · sorting objects into categories",
    },
  },
  language: {
    bigIdeas: ["Reading: Literature and Informational Text", "Foundational Skills", "Speaking and Listening", "Language"],
    standards: {
      "letter-names": "RF.PK.1.d · naming upper- and lowercase letters",
      "first-sounds": "RF.PK.2.e · hearing the first sound in a word",
      "rhyme-time": "RF.PK.2.a · recognizing rhyming words",
      "clap-the-parts": "RF.PK.2.c · counting and clapping the syllables in spoken words",
      "listen-to-a-story": "RL.PK.1; RL.PK.2 · answering questions about a story and retelling it",
      "word-meanings": "L.PK.5.a; L.PK.4 · sorting words into groups and finding out what words mean",
    },
  },
  science: {
    bigIdeas: ["Skills and Processes", "Earth/Space Science", "Life Science", "Chemistry"],
    standards: {
      "five-senses": "1.A.1 · asking questions and observing carefully",
      "living-or-not": "2.A.1 · observing familiar plants and animals",
      "animals-and-babies": "2.C.1 · comparing animals and their offspring",
      "weather-and-sky": "2.E.2 · describing the weather",
      "plants-grow": "2.A.1 · observing plants and how they change",
      "sink-or-float": "3.A.1; 1.D.1 · describing the properties of objects",
    },
  },
  social: {
    bigIdeas: ["Civics", "Geography", "Economics", "History"],
    standards: {
      "my-family": "P4.1.2.3.1 · how I am like and different from others",
      feelings: "P4.1.2.1.2 · naming feelings in myself and others",
      "community-helpers": "E.4.a · jobs in the community",
      "places-around-me": "G.1.b · where my school is and what is near",
      "taking-turns": "P4.2.1.2.2; C.3.b · taking turns and following rules at home and school",
      "first-next-last": "H.1.b · daily and weekly schedules in order",
      "caring-for-our-world": "G.2.b · how people care for and change their surroundings",
    },
  },
});
