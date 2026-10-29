import { preKCourses } from "../prek";

// Washington Pre-K for four-year-olds (ECEAP, Head Start, transitional kindergarten and preschool). They follow the
// Washington State Early Learning and Development Guidelines, which have no codes: the shared Pre-K units cite an area
// and topic from its Ages 4 to 5 Years section (docs/research/washington/prek/).
export const courses = preKCourses("us-wa", {
  math: {
    bigIdeas: ["Learning about my world: Math", "Learning about my world: Knowledge (cognition)"],
    standards: {
      "count-to-5": "Learning about my world: Math · counting small groups and seeing how many",
      "find-the-number": "Learning about my world: Math · recognizing the written numbers",
      "more-or-fewer": "Learning about my world: Math · comparing groups as more, fewer or the same",
      shapes: "Learning about my world: Math · matching and naming circles, squares and triangles",
      patterns: "Learning about my world: Math · copying and extending repeating patterns",
      "big-and-small": "Learning about my world: Math · comparing size, height and weight",
      "sort-it": "Learning about my world: Knowledge (cognition) · grouping objects that go together",
    },
  },
  language: {
    bigIdeas: ["Communicating: Speaking and listening", "Communicating: Reading"],
    standards: {
      "letter-names": "Communicating (literacy): Reading · knowing the names of capital letters",
      "first-sounds": "Communicating (literacy): Reading · hearing the first sound in a word",
      "rhyme-time": "Communicating (literacy): Reading · hearing words that rhyme",
      "clap-the-parts": "Communicating (literacy): Reading · clapping the parts of spoken words",
      "listen-to-a-story": "Communicating (literacy): Reading · listening to a short story and answering questions about it",
      "word-meanings": "Communicating (literacy): Speaking and listening (language development) · growing vocabulary through opposites and word groups",
    },
  },
  science: {
    bigIdeas: ["Learning about my world: Science", "Touching, seeing, hearing and moving around"],
    standards: {
      "five-senses": "Touching, seeing, hearing and moving around: Using the senses (sensorimotor skills) · exploring with the five senses",
      "living-or-not": "Learning about my world: Science · what living things need to grow and live",
      "animals-and-babies": "Learning about my world: Science · animals, their homes and their young",
      "weather-and-sky": "Learning about my world: Science · talking about weather, seasons and where the sun is",
      "plants-grow": "Learning about my world: Science · what plants need and how they grow from seeds",
      "sink-or-float": "Learning about my world: Science · predicting and testing what sinks, floats and moves",
    },
  },
  social: {
    bigIdeas: ["About me and my family and culture", "Building relationships", "Learning about my world: Social Studies"],
    standards: {
      "my-family": "About me and my family and culture: Family and culture; Growing up healthy: Daily living skills (personal health and hygiene) · knowing about myself, my family and staying healthy",
      feelings: "About me and my family and culture: Self management · naming feelings and calming down",
      "community-helpers": "Learning about my world: Social Studies · people who help in the community",
      "places-around-me": "Learning about my world: Social Studies · places in the community and what happens there",
      "taking-turns": "Building relationships: Interactions with peers · sharing and taking turns",
      "first-next-last": "Learning about my world: Knowledge (cognition) · predicting what comes next in the day",
      "caring-for-our-world": "Learning about my world: Science · helping take care of the environment",
    },
  },
});
