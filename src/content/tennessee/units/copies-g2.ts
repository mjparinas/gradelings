import type { Unit } from "../../types";
import { SCIENCE_2 as TEXAS_UNITS_SCIENCE_2_SCIENCE_2 } from "../../texas/units/science-2";
import { SCIENCE_2 as WASHINGTON_UNITS_SCIENCE_K2_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// Tennessee copies of Grade 2 units that fit Tennessee except for a few questions naming another state's places, with
// Tennessee examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_K2_SCIENCE_2, "wa-g2-land-water"), "tn-g2-land-water", ["2.ESS2.3", "modelling the shapes and kinds of land and water in an area"], [
      ["The Great Smoky Mountains in East Tennessee are an example of…", "mountains", ["a plain", "an ocean"], "They are high and rocky."],
      ["The Mississippi River on Tennessee's western edge is a…", "river", ["lake", "mountain"], "It flows to the Gulf of Mexico."],
      ["Many lakes in Tennessee, like the ones behind TVA dams, were made by…", "people building dams", ["glaciers", "volcanoes"], "Dams hold back river water."],
      ["West Tennessee near Memphis is mostly…", "flat land", ["tall mountains", "deep canyons"], "It is a plain."],
    ], { parentNote: "Practises naming kinds of land and bodies of water and showing them on a simple map, using Tennessee places like the Great Smoky Mountains, the Mississippi River and the lakes behind TVA dams." }),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_K2_SCIENCE_2, "wa-g2-earth-changes"), "tn-g2-earth-changes", ["2.LS2.2; 2.ESS1.1; 2.ESS2.1; 2.ESS2.2", "Earth events happen quickly or slowly, and ways to stop wind and water from changing land"], [
      ["A flood on a Tennessee river can change the land in…", "a few days", ["millions of years", "one second"], "Floods are fast changes."],
      ["Over a very long time, wind and water wore the Smoky Mountains down so they are…", "rounder and lower than long ago", ["taller every year", "made of ice"], "Erosion is slow."],
      ["A rockslide on a mountain road is a…", "fast change", ["slow change", "weather pattern"], "It happens in minutes."],
      ["Caves in Tennessee formed as water slowly…", "dissolved rock", ["froze the ground", "pushed up mountains"], "Tennessee has thousands of caves."],
    ], {}),
  localCopy(from(TEXAS_UNITS_SCIENCE_2_SCIENCE_2, "tx-g2-food-chains"), "tn-g2-food-chains", ["2.LS2.1", "food chains of producers and consumers, and how animals depend on other living things"], [
      ["A red-tailed hawk that eats mice is a…", "predator", ["producer", "plant"], "It hunts other animals."],
      ["In a Tennessee forest, an oak tree is a…", "producer", ["consumer", "predator"], "It makes its own food from sunlight."],
      ["A raccoon eats berries and fish, so it is a…", "consumer", ["producer", "rock"], "It eats other living things."],
      ["Grass → rabbit → fox. What does the rabbit eat?", "grass", ["fox", "nothing"], "Follow the arrow."],
    ], {}),
];
