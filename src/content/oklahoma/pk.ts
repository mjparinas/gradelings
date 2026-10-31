import { preKCourses } from "../prek";

// Oklahoma pre-K, the free public pre-K year for four-year-olds in nearly every school district. The Oklahoma Academic
// Standards include pre-kindergarten standards in every subject; the shared Pre-K units cite them by their own codes
// (docs/research/oklahoma/prek/).
export const courses = preKCourses("us-ok", {
  math: {
    bigIdeas: ["Numbers & Operations", "Algebraic Reasoning & Algebra", "Geometry & Measurement", "Data & Probability"],
    standards: {
      "count-to-5": "PK.N.2.4; PK.N.2.2; PK.N.2.3 · counting small groups",
      "find-the-number": "PK.N.1.2 · recognizing and naming the numerals 0 to 10",
      "more-or-fewer": "PK.N.3.1 · comparing sets as same, more or fewer",
      shapes: "PK.GM.1.1 · identifying circles, squares, rectangles and triangles",
      patterns: "PK.A.1.2 · recognizing, copying and extending repeating patterns",
      "big-and-small": "PK.GM.2.1; PK.GM.2.2 · describing and comparing measurable attributes",
      "sort-it": "PK.A.1.1; PK.GM.2.3 · sorting objects by color, size and shape",
    },
  },
  language: {
    bigIdeas: ["Listening and Speaking", "Reading and Writing Foundations", "Critical Reading and Writing", "Vocabulary"],
    standards: {
      "letter-names": "PK.2.PWS.2 · naming uppercase and lowercase letters",
      "first-sounds": "PK.2.PA.4; PK.2.PWS.3 · hearing the first sound in words",
      "rhyme-time": "PK.2.PA.2 · recognizing spoken words that rhyme",
      "clap-the-parts": "PK.2.PA.3 · recognizing syllables in spoken words",
      "listen-to-a-story": "PK.3.R.2; PK.2.R · answering questions about a story and retelling it",
      "word-meanings": "PK.4.R.1; PK.4.R.3 · sorting words into categories and learning new words",
    },
  },
  science: {
    bigIdeas: ["Science Exploration"],
    standards: {
      "five-senses": "PK.S.2 · observing the physical and natural world",
      "living-or-not": "PK.S.3 · noticing similarities and differences among plants, animals and objects",
      "animals-and-babies": "PK.S.3 · noticing similarities and differences among animals",
      "weather-and-sky": "PK.S.2; PK.S.4 · observing and talking about the natural world",
      "plants-grow": "PK.S.3; PK.S.6 · noticing what plants are like and investigating how they grow",
      "sink-or-float": "PK.S.6; PK.S.5 · investigating questions about objects",
    },
  },
  social: {
    bigIdeas: ["Citizenship", "History", "Geography", "Economics"],
    standards: {
      "my-family": "PK.3.4 · customs and traditions in families",
      feelings: "PK.1.2 · respecting the dignity of others in the class (the standards have no social and emotional strand)",
      "community-helpers": "PK.4.2; PK.4.4 · how people's work meets needs",
      "places-around-me": "PK.3.2; PK.3.1 · direction words and what a map is",
      "taking-turns": "PK.1.1 · rules, responsibilities and working together",
      "first-next-last": "PK.2.3 · words about time, such as before and after",
      "caring-for-our-world": "PK.4.3; PK.1.1 · how people use resources and take responsibility",
    },
  },
});
