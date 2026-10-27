import { lesson, type GradeLessons } from "../../lessons";

// Lessons for West Virginia's Grade 8 units that the shared lesson files don't cover: West Virginia's own units, and
// units West Virginia teaches in a different grade from the one their shared lesson is written for (copied word for word).
export const LESSONS: GradeLessons = {
  "science/wv-g8-growth": lesson(
    [
      "Animal behaviors, like birdsong, and plant parts, like bright flowers, help living things reproduce.",
      "Growth depends on genes and on the environment, like water, light and food.",
      "Asexual reproduction makes copies of one parent; sexual reproduction mixes genes from two.",
    ],
    "A potato piece grows into a new plant. What kind of reproduction is that?",
    [
      "Only one parent is involved.",
      "So the new plant is a copy: asexual reproduction.",
    ],
    "asexual reproduction",
  ),
  "science/wv-g8-earth-history": lesson(
    [
      "In undisturbed rock layers, the oldest layers are at the bottom.",
      "The fossil record shows that life has changed over time.",
      "Similar bones in different animals are evidence of common ancestry.",
    ],
    "Which rock layer is youngest: the top or the bottom?",
    [
      "Layers stack up over time.",
      "The top layer formed last.",
    ],
    "the top layer",
  ),
  "social/wv-g8-wv-government": lesson(
    [
      "West Virginia's Legislature has a 34-member Senate and a 100-member House of Delegates.",
      "The governor carries out laws, and the Supreme Court of Appeals decides what they mean.",
      "Taxes on sales, income, property and resources taken from the ground pay for state and local services.",
    ],
    "A tax on coal and gas taken out of the ground is called…",
    [
      "The resource is 'severed' from the land.",
      "It is a severance tax.",
    ],
    "a severance tax",
  ),
  "social/wv-g8-wv-economy": lesson(
    [
      "West Virginia's coal and natural gas are sold across the country and around the world.",
      "Absentee ownership means owners from outside the state, so profits can leave the state.",
      "Today health care, tourism, chemicals and other industries matter too, and planning for college or training opens careers.",
    ],
    "A company from another state owns West Virginia land and its coal. What is that called?",
    [
      "The owners are absent from the state.",
      "It is absentee ownership.",
    ],
    "absentee ownership",
  ),
  "social/wv-g8-wv-geography": lesson(
    [
      "Most of West Virginia is the Appalachian Plateau; the east is the Valley and Ridge.",
      "The New and Gauley rivers form the Kanawha; the Monongahela flows north to Pittsburgh.",
      "Cities grew at river meeting places, railroad ends and roads, like Charleston, Huntington and Wheeling.",
    ],
    "Which two rivers meet to form the Kanawha River?",
    [
      "They join at Gauley Bridge.",
      "They are the New River and the Gauley River.",
    ],
    "the New and the Gauley",
  ),
  "social/wv-g8-early-west-virginia": lesson(
    [
      "The Adena people built Grave Creek Mound more than 2,000 years ago.",
      "The Shawnee and other Native nations hunted and lived here, and they are living nations today.",
      "Settlers came from Pennsylvania and eastern Virginia; the Battle of Point Pleasant was fought in 1774.",
    ],
    "Who built Grave Creek Mound in Moundsville?",
    [
      "It is more than 2,000 years old.",
      "It was built by the Adena people.",
    ],
    "the Adena people",
  ),
  "social/wv-g8-civil-war-statehood": lesson(
    [
      "After Virginia seceded in 1861, the Wheeling Conventions formed a Union government for Virginia.",
      "That government gave Virginia's consent to the new state, and Congress required the Willey Amendment.",
      "West Virginia became the 35th state on June 20, 1863.",
    ],
    "Why did Congress require the Willey Amendment?",
    [
      "Many in Congress would not admit a new slave state.",
      "The amendment ended slavery gradually.",
    ],
    "to end slavery gradually in the new state",
  ),
  "social/wv-g8-industry-and-labor": lesson(
    [
      "Railroads opened the coalfields and forests in the late 1800s.",
      "Miners lived in company towns and were often paid in scrip.",
      "Miners fought to join the union, from Paint Creek and Cabin Creek to Matewan and Blair Mountain.",
    ],
    "What was scrip?",
    [
      "Coal companies paid miners with it.",
      "It could be spent only at the company store.",
    ],
    "company money spent only at the company store",
  ),
  "social/wv-g8-modern-west-virginia": lesson(
    [
      "The New Deal built Arthurdale, and World War II grew the chemical and steel industries.",
      "Machines in the mines meant fewer jobs, and many people moved away for work.",
      "Highways, the internet and cell phones have reduced the state's isolation, and festivals keep its cultures alive.",
    ],
    "Why did many West Virginians move away after World War II?",
    [
      "Machines did more of the mining work.",
      "People moved to find jobs.",
    ],
    "to find jobs",
  ),
};
