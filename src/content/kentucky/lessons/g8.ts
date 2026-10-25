import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kentucky's own Grade 8 units, attached in ../g8.ts so they ship in Kentucky's download.
export const LESSONS: GradeLessons = {
  "science/ky-g8-growth": lesson(
    ["Asexual reproduction needs one parent; sexual reproduction needs two and creates variation.", "Behaviours like nest building and feeding young help offspring survive.", "Genes and the environment both affect growth: the same plants grow differently in sun and shade."],
    "Two identical plants grow in sun and in shade and end up different heights. Why?",
    ["Their genes are the same.", "So the difference comes from where they grew."],
    "the environment",
  ),
  "science/ky-g8-earth-history": lesson(
    ["Rock layers and fossils order Earth's 4.6-billion-year history; lower layers are older.", "Fossils of corals in Kentucky's limestone show warm, shallow seas covered the area long ago.", "Similar bone structures show that living things share ancestors."],
    "In undisturbed rock layers, which layer is oldest?",
    ["Layers pile up over time.", "The first layer laid down is at the bottom."],
    "the bottom layer",
  ),
  "science/ky-g8-resources": lesson(
    ["Coal, oil, minerals and fresh water are spread unevenly because of past geologic processes.", "Using resources has costs: mining and burning coal change land, water and air.", "Scientists map hazards like floods and earthquakes to help warn people early."],
    "Why does eastern Kentucky have coal while other places don't?",
    ["Coal formed from ancient swamp plants.", "Only some places had those swamps millions of years ago."],
    "ancient swamps there turned into coal",
  ),
  "science/ky-g8-biodiversity": lesson(
    ["Biodiversity is the variety of life in an area.", "Ecosystem services include clean water, food and flood control.", "Protecting caves, wetlands and forests keeps habitat for many species."],
    "How do wetlands help people?",
    ["Wetland plants trap dirt.", "They also soak up floodwater."],
    "by filtering water and holding back floods",
  ),
  "social/ky-g8-kentucky-and-the-nation": lesson(
    ["Kentucky became the 15th state in 1792.", "Henry Clay, the “Great Compromiser”, worked out deals between North and South.", "In the Civil War, Kentucky was a border state that stayed in the Union, though divided."],
    "Why was Henry Clay called the Great Compromiser?",
    ["A compromise means each side gives a little.", "He helped the North and South agree."],
    "he worked out deals between North and South",
  ),
  "social/ky-g8-kentucky-economy": lesson(
    ["Early Kentucky grew hemp and raised livestock to sell to southern markets.", "Steamboats, canals, roads and railroads carried goods faster and farther.", "Much of Kentucky's farm work was done by enslaved people."],
    "How did steamboats help Kentucky farmers?",
    ["Before them, boats struggled to go upstream.", "Steam power moved goods both ways on rivers."],
    "they carried goods up and down rivers quickly",
  ),
  // Borrowed units Kentucky teaches in a different grade from the one their lesson was written for.
  "social/ca-g5-westward": lesson(
    ["Between 1789 and 1850, many immigrants came from Ireland and Germany.", "Settlers moved west on trails to find land and opportunity. California became a state in 1850.", "American Indian nations lost the most: land and lives."],
    "Who lost the most when settlers moved west?",
    ["Settlers took land where people already lived.", "Those people were American Indian nations."],
    "American Indian nations",
  ),
};
