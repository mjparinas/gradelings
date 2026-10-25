import type { Unit } from "../../types";
import { SCIENCE_7 as WASHINGTON_SCIENCE_7 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Oklahoma copies of Grade 7 units that fit Oklahoma except for a few questions naming another state's places, with
// Oklahoma examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_7, "wa-g7-resources"), "ok-g7-resources", ["7.ESS3.1", "why Earth's mineral, energy and groundwater resources are unevenly distributed"], [
    ["Oklahoma has large amounts of oil and natural gas because…", "ancient seas left buried remains that became oil and gas", ["oil rains down each year", "people pour it into the ground"], "Geologic processes made the deposits."],
    ["The Ogallala Aquifer under the Oklahoma Panhandle is a store of…", "groundwater", ["oil", "gold"], "Farmers pump it for crops."],
    ["Groundwater in the Ogallala Aquifer is being used faster than…", "it is refilled", ["it evaporates from the sun", "it is made by plants"], "It refills very slowly."],
    ["Gypsum, used in drywall, is mined in western Oklahoma because…", "thick gypsum layers formed there as ancient seas dried up", ["it grows on trees", "it falls from the sky"], "Evaporating seas leave minerals behind."],
  ]),
  localCopy(from(WASHINGTON_SCIENCE_7, "wa-g7-biodiversity"), "ok-g7-biodiversity", ["7.LS2.5", "evaluating competing design solutions for maintaining biodiversity and ecosystem services"], [
    ["Prescribed burns on Oklahoma prairies help biodiversity by…", "keeping trees from crowding out grasses and wildflowers", ["killing all animals", "making the soil useless"], "Prairies evolved with fire."],
    ["The Tallgrass Prairie Preserve in Osage County protects…", "one of the largest remaining tallgrass prairies", ["a coral reef", "a glacier"], "Bison graze there today."],
    ["Planting milkweed in Oklahoma helps…", "monarch butterflies on their migration", ["stop the rain", "remove all insects"], "Monarchs lay eggs on milkweed."],
    ["Healthy wetlands along Oklahoma rivers provide services such as…", "filtering water and reducing floods", ["making oil", "creating earthquakes"], "These are ecosystem services."],
    ["Two plans protect lesser prairie-chickens: fencing off a small area, or managing large grasslands with ranchers. Which helps more birds?", "managing large grasslands with ranchers", ["fencing a small area", "neither plan"], "The birds need big open spaces."],
    ["Bees and other pollinators on Oklahoma farms provide an ecosystem service by…", "pollinating crops", ["eating the crops", "pumping water"], "Many crops need pollinators."],
  ], { title: "Biodiversity & Ecosystems", blurb: "Healthy ecosystems and protecting the variety of life.", parentNote: "Practises why biodiversity and ecosystem services matter, and how to evaluate solutions that protect ecosystems, with Oklahoma examples like prescribed burns on the tallgrass prairie, wetlands and milkweed for monarchs." }),
];
