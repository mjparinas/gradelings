import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kentucky's own Grade 7 units, attached in ../g7.ts so they ship in Kentucky's download.
export const LESSONS: GradeLessons = {
  "language/ky-g7-story-analysis": lesson(
    ["Support an analysis with several pieces of evidence from the text.", "Trace how a theme develops across the story, and summarize without opinions.", "Notice how setting and characters shape the plot."],
    "What is a theme?",
    ["It isn't one event.", "It is the message the whole story builds."],
    "a central message about life that the story develops",
  ),
  "language/ky-g7-info-analysis": lesson(
    ["Many texts have two central ideas. Show how people, events and ideas affect each other.", "Word choice matters: a metaphor like “a lifeline” suggests something that saves.", "Transitions like consequently show cause and effect."],
    "Which transition shows a cause-and-effect relationship: consequently, similarly or meanwhile?",
    ["Cause and effect shows a result.", "Consequently means as a result."],
    "consequently",
  ),
  // Borrowed units Kentucky teaches in a different grade from the one their lesson was written for.
  "science/light-and-radiation": lesson(
    ["The electromagnetic spectrum, from longest to shortest wavelength: radio, microwave, infrared, visible light, ultraviolet, X-ray, gamma.", "Shorter wavelength means higher frequency and more energy.", "Light reflects off mirrors and bends (refracts) when it passes into a new material. Block UV with sunscreen and shade."],
    "Which has a longer wavelength: radio waves or X-rays?",
    ["Radio waves are at the long end of the spectrum.", "X-rays are near the short end."],
    "radio waves",
  ),
  "science/ca-g8-signals": lesson(
    ["Analog signals are smooth, changing waves. Digital signals are patterns of 0s and 1s.", "Copying an analog signal adds noise each time; digital copies stay the same.", "Digital storage has drawbacks, like files that old devices can no longer read."],
    "Why does a copy of a copy of a cassette tape sound worse?",
    ["Tape stores an analog wave.", "Each copy adds noise."],
    "noise is added with each copy",
  ),
  "social/ny-g5-economics": lesson(
    ["Every economy answers: what to produce, how to produce it, and for whom.", "Traditional economies follow custom; market economies let buyers and sellers decide prices.", "Needs are things you must have to live. Countries trade resources, like Venezuela's oil."],
    "In a market economy, who mostly decides prices?",
    ["Market means people buy and sell freely.", "So buyers and sellers decide."],
    "buyers and sellers",
  ),
};
