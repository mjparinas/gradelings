import { lesson, type GradeLessons } from "../../lessons";

// Lessons for South Dakota's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with South Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/sd-g1-south-dakota": lesson(
    [
      "Pierre is the capital of South Dakota.",
      "The governor leads our state from the Capitol.",
      "Our motto is \"Under God the people rule.\"",
      "A prairie is flat, grassy land. A valley is low land.",
    ],
    "What is the capital of South Dakota?",
    [
      "State leaders meet in the Capitol there.",
      "It is on the Missouri River.",
    ],
    "Pierre",
  ),
  "social/sd-g1-first-peoples": lesson(
    [
      "The Lakota, Dakota and Nakota are the Oceti Sakowin.",
      "Many Lakota families followed the bison and lived in tipis.",
      "The Arikara farmed corn by the river and lived in earth lodges.",
      "These Nations live in South Dakota today.",
    ],
    "What did the Arikara grow by the river?",
    [
      "They farmed near the Missouri River.",
      "Corn, beans and squash grew well there.",
    ],
    "corn, beans and squash",
  ),
  "social/sd-g1-ancient-world": lesson(
    [
      "Egyptians wrote with hieroglyphs on papyrus.",
      "In Athens, citizens voted. That is democracy.",
      "Romans built roads and aqueducts that carried water.",
    ],
    "What did Romans build to carry water?",
    [
      "Water flowed gently downhill to cities.",
      "These bridges were aqueducts.",
    ],
    "aqueducts",
  ),
  "social/sd-g1-founding-stories": lesson(
    [
      "Columbus sailed across the ocean in 1492.",
      "The Pilgrims came on the Mayflower in 1620.",
      "The Declaration of Independence was signed in 1776.",
      "It says all people are created equal.",
    ],
    "When was the Declaration of Independence signed?",
    [
      "We celebrate it on the Fourth of July.",
      "It was signed in 1776.",
    ],
    "1776",
  ),
};
