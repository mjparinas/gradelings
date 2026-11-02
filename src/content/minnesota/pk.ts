import { preKCourses } from "../prek";

// Minnesota pre-K, the year before Kindergarten. It follows the 4-5 years column of Minnesota's Early Childhood Indicators of Progress
// (ECIPs, the state's early learning standards), which give indicators by component (`M1.10`, saying numbers to 20;
// `LLC5.12`, playing with rhymes and first sounds) (docs/research/minnesota/prek/).
export const courses = preKCourses("us-mn", {
  math: {
    bigIdeas: ["Counting and Number Sense", "Patterns and Measurement", "Geometry and Spatial Sense", "Data and Sorting"],
    standards: {
      "count-to-5": "M2.3; M3.6 · counting sets one by one and giving the right number",
      "find-the-number": "M1.13; M4.6 · reading numbers and matching numerals to number words",
      "more-or-fewer": "M3.5; M6.7 · comparing groups as more, fewer or the same",
      shapes: "M10.7; M10.8 · naming shapes and describing what makes them",
      patterns: "M9.9; M9.10 · describing and extending simple patterns",
      "big-and-small": "M8.10; M8.11 · comparing and ordering by size and length",
      "sort-it": "M13.8; M13.9 · sorting objects by an attribute",
    },
  },
  language: {
    bigIdeas: ["Listening and Speaking", "Reading", "Writing"],
    standards: {
      "letter-names": "LLC6.5; LLC9.10 · naming letters and writing my own name",
      "first-sounds": "LLC5.12 · matching first sounds in words",
      "rhyme-time": "LLC5.12 · playing with rhymes",
      "clap-the-parts": "LLC5.11 · listening to the sounds in words and their parts",
      "listen-to-a-story": "LLC4.10; LLC8.10 · listening to a story and retelling it",
      "word-meanings": "LLC3.12; LLC8.12 · learning new words and what they mean",
    },
  },
  science: {
    bigIdeas: ["Exploring", "Discovering", "Explaining"],
    standards: {
      "five-senses": "ST1.7 · describing what I notice and how things are alike and different",
      "living-or-not": "ST1.7 · comparing living things and things that are not alive",
      "animals-and-babies": "ST5.10 · talking about the animals I observe",
      "weather-and-sky": "ST1.8 · noticing weather and wondering what will happen",
      "plants-grow": "ST2.11; ST5.9 · watching plants grow and describing what I did",
      "sink-or-float": "ST3.16; ST4.9 · predicting what sinks and floats and saying why",
    },
  },
  social: {
    bigIdeas: ["Self and Belonging", "Social Systems", "Social and Emotional Growth"],
    standards: {
      "my-family": "Soc1.11; Soc1.12 · belonging to a family and a community",
      feelings: "SE6.9; SE6.10 · naming my feelings and noticing others' feelings",
      "community-helpers": "Soc2.8 · helping and the people who help in a community",
      "places-around-me": "Soc6.6 · using words for the places around me",
      "taking-turns": "SE8.13; Soc2.7 · taking turns and following shared rules",
      "first-next-last": "Soc3.13 · putting familiar events in order",
      "caring-for-our-world": "Soc5.5 · caring for our surroundings",
    },
  },
});
