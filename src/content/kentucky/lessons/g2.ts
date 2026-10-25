import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kentucky's own Grade 2 units, attached in ../g2.ts so they ship in Kentucky's download.
export const LESSONS: GradeLessons = {
  "science/ky-g2-habitats": lesson(
    ["A habitat is a place where a living thing lives and finds what it needs.", "Each habitat has its own life: catfish in rivers, black bears in mountain forests.", "Forests and wetlands are home to many more kinds of living things than dry places."],
    "Which animal lives in a pond: a frog or a camel?",
    ["A camel lives in a dry desert.", "A frog needs water."],
    "a frog",
  ),
  "science/ky-g2-land-water": lesson(
    ["Landforms are shapes of the land: mountains, valleys, hills and plains.", "Bodies of water include rivers, lakes and oceans.", "Maps show where land and water are. Blue usually means water."],
    "Low land between mountains is a…?",
    ["Mountains are high.", "The low land between them is a valley."],
    "valley",
  ),
  "science/ky-g2-earth-changes": lesson(
    ["Some changes to land are fast, like floods and landslides.", "Some are slow, like water wearing away rock over many years.", "Plant roots and rock walls help slow these changes down."],
    "Water carves a canyon over many years. Fast or slow?",
    ["Many years is a long time.", "That is a slow change."],
    "slow",
  ),
  "social/ky-g2-north-america": lesson(
    ["North America has three big countries: Canada, the United States and Mexico.", "Kentucky is in the United States, between big rivers and the Appalachian Mountains.", "Many towns grew beside rivers and springs, where people found water and could travel."],
    "Why did many early towns grow beside rivers?",
    ["People need water.", "Boats could carry people and goods."],
    "for water and travel",
  ),
  "social/ky-g2-kentucky-resources": lesson(
    ["Natural resources come from nature: soil, water, trees and coal.", "Human resources are people who work, like farmers. Capital resources are tools, like tractors.", "Renewable resources, like trees, can grow back. Coal cannot."],
    "Is a tractor a natural, human or capital resource?",
    ["It is a tool people made.", "Tools used to make things are capital resources."],
    "a capital resource",
  ),
  "social/ky-g2-kentucky-laws": lesson(
    ["A new law starts as a bill in the General Assembly.", "If lawmakers pass it, the governor signs it or vetoes it.", "Laws change over time as needs and ideas change."],
    "What is a bill?",
    ["It is not a law yet.", "Lawmakers vote on it."],
    "an idea for a new law",
  ),
};
