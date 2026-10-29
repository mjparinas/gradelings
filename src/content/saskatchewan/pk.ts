import { preKCourses } from "../prek";

// Saskatchewan Prekindergarten, a school program for some three- and four-year-olds. It follows Essential Learning
// Experiences for Three-, Four- and Five-Year-Olds, whose experiences in four domains of holistic learning the shared
// Pre-K units cite as "Domain: Experience" (docs/research/saskatchewan/prek/).
export const courses = preKCourses("ca-sk", {
  math: {
    bigIdeas: ["Exploring Numeracy", "Recognizing Attributes and Characteristics", "Exploring Position and Direction"],
    standards: {
      "count-to-5": "Intellectual: Exploring Numeracy · counting small groups of objects",
      "find-the-number": "Intellectual: Exploring Numeracy · recognizing the written numerals 1 to 10",
      "more-or-fewer": "Intellectual: Exploring Numeracy · comparing groups as more, fewer or the same",
      shapes: "Intellectual: Recognizing Attributes and Characteristics · naming circles, squares, triangles and rectangles",
      patterns: "Intellectual: Recognizing Attributes and Characteristics · copying and extending simple repeating patterns",
      "big-and-small": "Intellectual: Recognizing Attributes and Characteristics · comparing size, height, length and weight",
      "sort-it": "Intellectual: Recognizing Attributes and Characteristics · sorting objects by colour, shape and kind",
    },
  },
  language: {
    bigIdeas: ["Language and Emerging Literacy"],
    standards: {
      "letter-names": "Language and Emerging Literacy: Exploring How Print Works · knowing the names of capital letters",
      "first-sounds": "Language and Emerging Literacy: Exploring Words · hearing the first sound in a word",
      "rhyme-time": "Language and Emerging Literacy: Exploring Words · hearing words that rhyme",
      "clap-the-parts": "Language and Emerging Literacy: Exploring Words · clapping the parts of spoken words",
      "listen-to-a-story":
        "Language and Emerging Literacy: Listening with Interest and Engagement During Brief Experiences with Spoken Language · listening to a short story and answering questions about it",
      "word-meanings": "Language and Emerging Literacy: Exploring Words · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Solving Problems", "Experiencing Heightened Sensory Awareness", "Appreciation of Beauty and Connection to the Natural World"],
    standards: {
      "five-senses": "Spiritual: Experiencing Heightened Sensory Awareness · exploring the world with the five senses",
      "living-or-not": "Intellectual: Recognizing Attributes and Characteristics · telling living things from things that are not alive",
      "animals-and-babies":
        "Spiritual: Developing an Appreciation of Beauty and Connection to the Natural and Man-Made World · where animals live and how they grow",
      "weather-and-sky": "Intellectual: Solving Problems · observing weather, day and night",
      "plants-grow":
        "Spiritual: Developing an Appreciation of Beauty and Connection to the Natural and Man-Made World · what plants need and how they grow from seeds",
      "sink-or-float": "Intellectual: Solving Problems · predicting and observing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["Social Emotional Development", "Physical Development", "Exploring Time"],
    standards: {
      "my-family": "Social Emotional: Developing Self-Awareness; Social Emotional: Developing a Sense of Belonging · knowing about myself and my family",
      feelings:
        "Social Emotional: Identifying and Regulating Emotions; Social Emotional: Taking the Perspective of Others and Showing Empathy · naming feelings in myself and others",
      "community-helpers": "Social Emotional: Developing a Sense of Belonging · people in the community and what they do",
      "places-around-me": "Intellectual: Exploring Position and Direction · places in the community and where they are",
      "taking-turns": "Social Emotional: Interacting with Others; Social Emotional: Resolving Conflicts · taking turns, sharing and working things out",
      "first-next-last": "Intellectual: Exploring Time · daily routines in order",
      "caring-for-our-world": "Spiritual: Developing an Appreciation of Beauty and Connection to the Natural and Man-Made World · caring for the natural world",
    },
  },
});
