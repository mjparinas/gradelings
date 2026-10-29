import { preKCourses } from "../prek";

// Yukon Early Kindergarten (K4), the optional school year for four-year-olds in most rural schools. It follows the BC
// curriculum, which for this year draws on the British Columbia Early Learning Framework (Early Kindergarten Policy,
// 2021), so the shared Pre-K units cite the same living inquiries and pathways as BC (docs/research/yukon/prek/).
export const courses = preKCourses("ca-yt", {
  math: {
    bigIdeas: [
      "Children construct meaning as they engage with materials, other children and adults, the environment, the community, and the world.",
      "Children develop knowledge and theories as they count, compare, sort and build with familiar objects.",
      "Children use multiple modes of expressive languages, including numbers and symbols, to communicate ideas.",
    ],
    standards: {
      "count-to-5": "Engagement with others, materials, and the world: Knowledge and theories · counting small groups of objects",
      "find-the-number": "Communication and literacies: Vocabulary, symbols, and written language · recognizing the written numerals 1 to 10",
      "more-or-fewer": "Engagement with others, materials, and the world: Knowledge and theories · comparing groups as more, fewer or the same",
      shapes: "Engagement with others, materials, and the world: Spaces, objects, and materials · naming circles, squares, triangles and rectangles",
      patterns: "Engagement with others, materials, and the world: Knowledge and theories · copying and extending simple repeating patterns",
      "big-and-small": "Engagement with others, materials, and the world: Spaces, objects, and materials · comparing size, height, length and weight",
      "sort-it": "Engagement with others, materials, and the world: Spaces, objects, and materials · sorting objects by colour, shape and kind",
    },
  },
  language: {
    bigIdeas: [
      "Children use multiple modes of expressive languages to communicate ideas, participate in relationships, and make meaning in their homes and communities.",
      "Children play with sounds and words, and notice letters and symbols in the world around them.",
      "Stories, songs and conversations with family and community build language and a love of books.",
    ],
    standards: {
      "letter-names": "Communication and literacies: Vocabulary, symbols, and written language · knowing the names of capital letters",
      "first-sounds": "Communication and literacies: Sound and word play · hearing the first sound in a word",
      "rhyme-time": "Communication and literacies: Sound and word play · hearing words that rhyme",
      "clap-the-parts": "Communication and literacies: Sound and word play · clapping the parts of spoken words",
      "listen-to-a-story": "Communication and literacies: Language and communication · listening to a short story and answering questions about it",
      "word-meanings": "Communication and literacies: Language and communication · growing vocabulary through opposites, word groups and everyday objects",
    },
  },
  science: {
    bigIdeas: [
      "Children develop knowledge and theories as they explore materials, living things and the land around them.",
      "Children notice daily and seasonal changes in weather, plants and animals.",
      "Children learn that humans and the natural world are connected and depend on one another.",
    ],
    standards: {
      "five-senses": "Engagement with others, materials, and the world: Knowledge and theories · exploring the world with the five senses",
      "living-or-not":
        "Engagement with others, materials, and the world: Reconnection to land and place · telling living things from things that are not alive",
      "animals-and-babies":
        "Engagement with others, materials, and the world: Reconnection to land and place · where animals live, their babies and their body parts",
      "weather-and-sky": "Engagement with others, materials, and the world: Knowledge and theories · noticing weather, day and night",
      "plants-grow": "Engagement with others, materials, and the world: Reconnection to land and place · what plants need and how they grow from seeds",
      "sink-or-float": "Engagement with others, materials, and the world: Spaces, objects, and materials · how objects move, sink and float",
    },
  },
  social: {
    bigIdeas: [
      "Nurturing a sense of well-being and belonging supports children as they learn about and investigate the world around them.",
      "A positive personal and cultural identity is the awareness, understanding, and appreciation of all the facets that contribute to a healthy sense of oneself.",
      "Children learn about their families and communities, the people who help them, and how to care for one another and the world.",
    ],
    standards: {
      "my-family": "Identities, social responsibility, and diversity: Individual differences · knowing about myself, my family and growing up",
      feelings: "Well-being and belonging: Emotions, thoughts, and views · naming feelings and ways to calm down",
      "community-helpers": "Engagement with others, materials, and the world: Local community connections · people who help in the community",
      "places-around-me": "Engagement with others, materials, and the world: Local community connections · places in the community and what happens there",
      "taking-turns": "Identities, social responsibility, and diversity: Democratic practices · sharing, taking turns and following simple rules",
      "first-next-last": "Well-being and belonging: Nourishment, sleep, and physical activity · daily routines in order, and then and now",
      "caring-for-our-world":
        "Identities, social responsibility, and diversity: Interrelationship of humans and their natural environments · caring for the environment and living things",
    },
  },
});
