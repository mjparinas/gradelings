import { preKCourses } from "../prek";

// New Hampshire pre-K, the preschool year in public school programs and child care for four-year-olds. It follows the
// New Hampshire Early Learning Standards, Birth through Age Five (2016); the shared Pre-K units cite their indicators
// for four- and five-year-olds with the domain, for example "Numeracy 1.1.7b" (docs/research/new-hampshire/prek/).
export const courses = preKCourses("us-nh", {
  math: {
    bigIdeas: ["Number Operations", "Geometry and Spatial Sense", "Measurements", "Patterns and Relationships", "Data Collection and Analysis"],
    standards: {
      "count-to-5": "Numeracy 1.1.7b; Numeracy 1.1.7c; Numeracy 1.1.7d · seeing and counting small groups",
      "find-the-number": "Numeracy 1.1.7i · recognizing the written numbers",
      "more-or-fewer": "Numeracy 1.1.7e · comparing groups to find which has more",
      shapes: "Numeracy 2.1.7b; Numeracy 2.1.7c · naming common shapes and their features",
      patterns: "Numeracy 4.1.7b · making simple patterns",
      "big-and-small": "Numeracy 3.1.7a; Numeracy 3.1.7b · comparing size, height, length and weight",
      "sort-it": "Numeracy 5.1.7a · sorting things into groups",
    },
  },
  language: {
    bigIdeas: ["Listening Comprehension", "Verbal Expressions", "Emergent Reading", "Emergent Writing"],
    standards: {
      "letter-names": "Language 6.1.7a · recognizing letters of the alphabet",
      "first-sounds": "Language 5.5.7c; Language 6.1.7b · hearing the first sound in a word",
      "rhyme-time": "Language 5.5.7a; Language 5.5.7b · hearing and playing with rhymes",
      "clap-the-parts": "Language 5.5.7b · playing with the sounds of spoken words",
      "listen-to-a-story": "Language 1.1.7a; Language 5.1.7c · listening to a short story and answering questions about it",
      "word-meanings": "Language 4.1.7a; Language 4.1.7b · growing vocabulary",
    },
  },
  science: {
    bigIdeas: ["Inquiry and Exploration", "Living Things", "Earth and Sky", "Force and Motion"],
    standards: {
      "five-senses": "Approaches 1.1.7b; Approaches 1.1.7a · observing the world with the senses",
      "living-or-not": "Cognition 2.1.7a · the properties of living things",
      "animals-and-babies": "Cognition 2.1.7a · what animals are like and what they need",
      "weather-and-sky": "Cognition 2.1.7b · weather, the seasons, the sun and the moon",
      "plants-grow": "Cognition 2.1.7a · what plants need to grow",
      "sink-or-float": "Cognition 2.1.7d; Approaches 1.2.7b · predicting and testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Self, Family, and Community", "Social Conventions", "Social Competence", "Emotional Competence"],
    standards: {
      "my-family": "Cognition 3.2.7b; Cognition 3.2.7c · being part of a family and noticing other families",
      feelings: "Social-Emotional 4.1.7a; Social-Emotional 3.2.7 · naming your own feelings and others' feelings",
      "community-helpers": "Cognition 3.2.7d; Cognition 3.2.7e · people and jobs in the community",
      "places-around-me": "Cognition 3.2.7d; Cognition 3.2.7a · places in the community and knowing where you live",
      "taking-turns": "Social-Emotional 3.1.7b; Cognition 3.1.7b; Cognition 3.1.7d · taking turns, following class rules and solving conflicts",
      "first-next-last": "Numeracy 6.1.7 · yesterday, today and tomorrow",
      "caring-for-our-world": "Cognition 2.1.7c; Cognition 3.1.7a · caring for the earth and the places we share",
    },
  },
});
