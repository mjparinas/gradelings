import { preKCourses } from "../prek";

// Delaware pre-K, the year before Kindergarten. It follows the Delaware Early Learning Foundations: Preschool (Department of
// Education, 2010), cited by code (`MA34`, using one-to-one correspondence when counting; `LL53`, recognizing letter sounds)
// (docs/research/delaware/prek/).
export const courses = preKCourses("us-de", {
  math: {
    bigIdeas: ["Number and Operations", "Geometry and Spatial Sense", "Patterns", "Measurement and Data"],
    standards: {
      "count-to-5": "MA34; MA36 · counting objects one by one and telling how many",
      "find-the-number": "MA33; MA37 · recognizing numbers and using them in everyday life",
      "more-or-fewer": "MA35 · using words to compare numbers of objects",
      shapes: "MA40; MA43 · naming shapes and describing where things are",
      patterns: "MA44 · recognizing, copying and extending simple patterns",
      "big-and-small": "MA50 · comparing and sorting by length, size and weight",
      "sort-it": "MA47 · sorting and matching objects by color, size and shape",
    },
  },
  language: {
    bigIdeas: ["Receptive Communication", "Expressive Communication", "Reading", "Writing"],
    standards: {
      "letter-names": "LL51; LL54 · naming letters of the alphabet",
      "first-sounds": "LL53 · hearing the sounds in words",
      "rhyme-time": "LL39 · playing with language such as rhyming",
      "clap-the-parts": "LL61 · hearing syllables in words",
      "listen-to-a-story": "LL32; LL35 · listening to a story and answering questions",
      "word-meanings": "LL36; LL48 · growing vocabulary and finding patterns in words",
    },
  },
  science: {
    bigIdeas: ["Scientific Thinking", "Scientific Knowledge: Living Things", "Scientific Knowledge: Physical World and Environment"],
    standards: {
      "five-senses": "SC31; SC32 · using my senses to explore the world",
      "living-or-not": "SC40 · telling living things from things that are not alive",
      "animals-and-babies": "SC41 · how animals grow, change and what they need",
      "weather-and-sky": "SC47; SC49 · noticing weather, seasons and the sun, moon and stars",
      "plants-grow": "SC41; SC42 · caring for plants and watching them grow",
      "sink-or-float": "SC36; SC46 · predicting and testing what happens to objects",
    },
  },
  social: {
    bigIdeas: ["My Family, My Community, My World", "Social Emotional Development", "Approaches to Learning"],
    standards: {
      "my-family": "MM31; MM32 · belonging to a family and its culture",
      feelings: "SE38; SE39 · naming feelings in myself and others",
      "community-helpers": "MM45 · the people in a community and what they do",
      "places-around-me": "MM40; MM41 · where I live and where things are",
      "taking-turns": "SE54; SE51 · taking turns and using kind words",
      "first-next-last": "MM36; AL40 · my daily routine and putting events in order",
      "caring-for-our-world": "MM44 · how people and the natural world depend on each other",
    },
  },
});
