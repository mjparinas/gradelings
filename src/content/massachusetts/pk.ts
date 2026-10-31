import { preKCourses } from "../prek";

// Massachusetts pre-K, the preschool year for four-year-olds in public schools, Head Start and community programs. The
// Massachusetts Curriculum Frameworks set pre-K standards in every subject; the shared Pre-K units cite them by their
// own codes, and the social-emotional guidelines of the Guidelines for Preschool and Kindergarten Learning Experiences
// (2019) for feelings (docs/research/massachusetts/prek/).
export const courses = preKCourses("us-ma", {
  math: {
    bigIdeas: ["Counting and Cardinality", "Operations and Algebraic Thinking", "Measurement and Data", "Geometry"],
    standards: {
      "count-to-5": "PK.CC.C.4; PK.CC.B.3 · counting objects with one-to-one correspondence",
      "find-the-number": "PK.CC.A.2 · recognizing and naming the numerals 0 to 10",
      "more-or-fewer": "PK.CC.C.5 · comparing groups as more, less or equal",
      shapes: "PK.G.A.2 · naming two-dimensional shapes",
      patterns: "PK.MD.B.3 · sorting by more than one attribute, the first step to seeing what repeats (pre-K has no pattern standard)",
      "big-and-small": "PK.MD.A.1; PK.MD.A.2 · comparing length and weight",
      "sort-it": "PK.MD.B.3 · sorting and classifying objects",
    },
  },
  language: {
    bigIdeas: ["Reading Literature", "Foundational Skills", "Speaking and Listening", "Vocabulary"],
    standards: {
      "letter-names": "RF.P.1.d · recognizing and naming uppercase letters",
      "first-sounds": "RF.P.2.c; RF.P.3.a · hearing the first sound in a word",
      "rhyme-time": "RF.P.2.a · recognizing and producing rhyming words",
      "clap-the-parts": "RF.P.2.b; RL.P.5 · clapping the parts of spoken language",
      "listen-to-a-story": "RL.P.1; RL.P.2 · listening to a story and answering questions about it",
      "word-meanings": "L.P.5.a; L.P.4.a · sorting words into groups and words that mean the same",
    },
  },
  science: {
    bigIdeas: ["Earth and Space Sciences", "Life Science", "Physical Science"],
    standards: {
      "five-senses": "PreK-LS1-2(MA); PreK-LS1-3(MA) · the five senses",
      "living-or-not": "PreK-LS2-1(MA) · what makes living things different from non-living things",
      "animals-and-babies": "PreK-LS3-1(MA); PreK-LS1-1(MA) · young animals and their parents",
      "weather-and-sky": "PreK-ESS2-5(MA); PreK-ESS1-1(MA) · weather, the seasons and the sky",
      "plants-grow": "PreK-LS2-2(MA); PreK-LS3-1(MA) · how plants meet their needs and grow",
      "sink-or-float": "PreK-PS1-2(MA); PreK-PS1-3(MA) · comparing objects and the materials they are made of",
    },
  },
  social: {
    bigIdeas: ["Civics", "Geography", "History", "Economics", "Social and Emotional Development"],
    standards: {
      "my-family": "PreK.T3.3; SEL6 · traditions of families and respect for others",
      feelings: "SEL1; SEL5 · recognizing and expressing emotions and showing empathy",
      "community-helpers": "PreK.T4.1; PreK.T4.3 · the work people do and the goods and services they provide",
      "places-around-me": "PreK.T2.1; PreK.T2.2 · location words and what a map can show",
      "taking-turns": "PreK.T1.2; SEL9; APL 5 · following rules, managing conflict and cooperating",
      "first-next-last": "PreK.T3.1; PreK.T3.2 · recalling events in order and the passage of time",
      "caring-for-our-world": "PreK.T1.3; PreK-ESS3-2(MA) · taking on responsibilities and people's impact on the environment",
    },
  },
});
