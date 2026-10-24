import type { Unit } from "../../types";
import { SCIENCE_6 as WASHINGTON_UNITS_SCIENCE_68_SCIENCE_6 } from "../../washington/units/science-68";
import { SCIENCE_7 as WASHINGTON_UNITS_SCIENCE_68_SCIENCE_7 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Tennessee copies of Grade 6 units that fit Tennessee except for a few questions naming another state's places, with
// Tennessee examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_6, "wa-g6-climate"), "tn-g6-climate", ["6.ESS2.6; 6.ESS3.2", "what shapes regional climate, and the causes of rising global temperatures"], [
      ["Memphis and Knoxville have warm summers and mild winters. The climate there is…", "humid subtropical", ["polar", "desert"], "Warm and wet most of the year."],
      ["The Great Smoky Mountains are cooler than the valleys below because…", "air gets colder as you go higher", ["mountains are closer to the sun", "mountains have no air"], "Temperature drops with height."],
      ["Places near a big ocean usually have…", "milder winters and summers than places far inland", ["no seasons at all", "colder summers than the poles"], "Water heats and cools slowly."],
      ["Burning coal and gasoline adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium"], "It is a greenhouse gas."],
    ], {}),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_6, "wa-g6-weather"), "tn-g6-weather", ["6.ESS2.4; 6.ESS2.5; 6.ESS2.7", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"], [
      ["Warm, moist air that brings summer storms to Tennessee usually comes from…", "the Gulf of Mexico", ["the Arctic", "the Sahara"], "Air masses take on the traits of where they form."],
      ["When a cold front meets warm, humid air over Tennessee, it can cause…", "thunderstorms", ["clear, still air for weeks", "snow in July"], "Warm air is pushed up fast."],
      ["The Great Smoky Mountains get more rain than the valleys because…", "air cools as it rises and drops its water", ["mountains are closer to the sun", "valleys have no air"], "Rising air cools."],
      ["Fog often fills Tennessee valleys on cool mornings because…", "water vapor condenses near the ground", ["the sun is too hot", "wind blows smoke in"], "Cool air holds less water vapor."],
    ], { parentNote: "Practises how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, including how warm, moist air from the Gulf of Mexico brings storms to Tennessee." }),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_6, "wa-g6-design"), "tn-g6-design", ["6.ETS1.2", "defining design problems, evaluating and testing solutions, and improving designs"], [
      ["Which constraint might matter for a design used near the Mississippi River?", "flooding", ["deep snow all year", "volcanic ash"], "Think about the river."],
      ["Engineers designing a bridge over the Tennessee River test models to…", "find and fix weak points", ["skip the plan", "make it look nice only"], "Testing improves designs."],
      ["A criterion for a better cooler is that it…", "keeps ice frozen longer", ["is heavy", "is a bright color"], "Criteria say what success means."],
      ["Comparing two designs with data helps you…", "choose the one that best meets the criteria", ["guess", "ignore the results"], "Use evidence to decide."],
    ], {}),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_7, "wa-g7-biodiversity"), "tn-g6-biodiversity", ["6.LS2.5; 6.LS4.1; 6.ETS1.1", "evaluating solutions that maintain biodiversity and ecosystem services"], [
      ["Tennessee's rivers have one of the greatest varieties of freshwater mussels and fish in the country. This variety is called…", "biodiversity", ["erosion", "pollution"], "Bio means life."],
      ["The Great Smoky Mountains are called the salamander capital of the world because…", "they have many kinds of salamanders", ["salamanders were brought there", "no other animals live there"], "Variety of one kind of animal."],
      ["Dams can harm river mussels because they…", "change the water flow and habitat", ["make water cleaner", "add more fish"], "Mussels need flowing water."],
      ["Protecting a cave's bats helps people because bats…", "eat huge numbers of insects", ["make electricity", "grow crops"], "This is an ecosystem service."],
      ["The Great Smoky Mountains have many kinds of salamanders. Having many kinds of living things is called…", "biodiversity", ["erosion", "pollution"], "Bio means life."],
      ["Hellbenders, giant salamanders in Tennessee streams, need clean, cold water. Muddy runoff harms them because…", "it fills the spaces under rocks where they live", ["it makes the water too cold", "it adds more food"], "Habitat matters."],
      ["Planting native flowers helps bees and butterflies because…", "they evolved to feed on those plants", ["native plants have no flowers", "bees eat only plastic"], "Native species fit together."],
    ], { title: "Biodiversity & Ecosystems", blurb: "Why variety in life matters", parentNote: "Practises why biodiversity and ecosystem services matter, and how to evaluate solutions that protect ecosystems such as Tennessee's rivers, the Great Smoky Mountains and its caves." }),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_7, "wa-g7-resources"), "tn-g6-resources", ["6.ESS3.1", "uneven distribution of resources, forecasting natural hazards, and reducing human impact"], [
      ["A design to reduce plastic in the Tennessee River could be…", "trash traps on streams that feed it", ["dumping more trash", "draining the river"], "Stop trash before it reaches the river."],
      ["Most drinking water in Tennessee comes from…", "rivers, lakes and groundwater", ["the ocean", "glaciers"], "Freshwater is a small part of Earth's water."],
      ["Runoff from farms can carry… into Tennessee streams.", "fertilizer and soil", ["clean ice", "sand from the beach"], "Rain washes it off fields."],
      ["Planting trees along a creek helps by…", "holding soil and filtering runoff", ["heating the water", "adding trash"], "Roots work like a filter."],
    ], { parentNote: "Practises how Earth's geosphere, hydrosphere, atmosphere and biosphere interact, how much of Earth's water is salty or frozen, and how communities protect resources like Tennessee's rivers and lakes." }),
];
