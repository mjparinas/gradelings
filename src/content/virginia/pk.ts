import { preKCourses } from "../prek";

// Virginia pre-K, the Virginia Preschool Initiative year for four-year-olds in public schools and community programs.
// It follows Virginia's Early Learning and Development Standards (2021); the shared Pre-K units cite their Later
// Preschool (44-60 months) indicators, for example "CD3.1w" (docs/research/virginia/prek/).
export const courses = preKCourses("us-va", {
  math: {
    bigIdeas: ["Counting and Quantities", "Number Relationships", "Geometric Thinking", "Sorting and Patterning", "Measuring"],
    standards: {
      "count-to-5": "CD3.1w; CD3.1u · seeing and counting small groups",
      "find-the-number": "CD3.1y · matching numerals to quantities",
      "more-or-fewer": "CD3.1z · comparing groups as more, fewer or the same",
      shapes: "CD3.3t; CD3.3u · naming squares, rectangles and triangles",
      patterns: "CD3.4l; CD3.4n · copying and extending repeating patterns",
      "big-and-small": "CD3.5h; CD3.5g · comparing size, height, length and weight",
      "sort-it": "CD3.5j · sorting and ordering objects by what they share",
    },
  },
  language: {
    bigIdeas: ["Communication", "Stories and Texts", "Sounds of Language", "Letters and Print"],
    standards: {
      "letter-names": "CLLD2.4h · knowing the names of letters",
      "first-sounds": "CLLD2.3l; CLLD2.4g · hearing the first sound in a word",
      "rhyme-time": "CLLD2.3i · hearing and making words that rhyme",
      "clap-the-parts": "CLLD2.3k · clapping the syllables in words",
      "listen-to-a-story": "CLLD2.2p; CLLD2.2s · listening to a short story and answering questions about it",
      "word-meanings": "CLLD2.2t; CLLD1.1ac · growing vocabulary through word groups and opposites",
    },
  },
  science: {
    bigIdeas: ["The Natural and Physical World", "Testing Questions and Ideas"],
    standards: {
      "five-senses": "CD1.1j; CD1.1k · observing and describing the world",
      "living-or-not": "CD1.1j · sorting what we observe, such as living and not living",
      "animals-and-babies": "CD1.1k; CD1.2n · learning about animals from what we see and from books",
      "weather-and-sky": "CD1.1j; CD1.1l · noticing and describing the weather and the sky",
      "plants-grow": "CD1.2o; CD1.2p · growing plants and seeing what happens",
      "sink-or-float": "CD1.2o; CD1.2p · testing what sinks and floats",
    },
  },
  social: {
    bigIdeas: ["People, Community and Culture", "Positive Self-Concept", "Emotional Competence", "Interacting with Others"],
    standards: {
      "my-family": "CD2.3j; CD2.2g · family, culture and traditions",
      feelings: "SED2.1j; SED2.2l · naming feelings and saying why others feel them",
      "community-helpers": "CD2.1n · the roles of people in the community",
      "places-around-me": "CD2.1o; CD3.3v · places in the wider world and where things are",
      "taking-turns": "SED3.4d; CD2.2h · taking turns, sharing and solving conflicts",
      "first-next-last": "CD3.5n · time words like before, after and later",
      "caring-for-our-world": "CD2.2h; CD1.1k · helping the group and caring for the natural world",
    },
  },
});
