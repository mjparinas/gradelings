import type { Unit } from "../../types";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6, SCIENCE_7 as WASHINGTON_SCIENCE_7, SCIENCE_8 as WASHINGTON_SCIENCE_8 } from "../../washington/units/science-68";
import { worldMaps6 as OREGON_WORLD_MAPS } from "../../oregon/units/social-copies";
import { from, localCopy } from "./kit";

// Oklahoma copies of middle school units that fit Oklahoma's Grade 6 except for a few questions naming another state's
// places, with Oklahoma examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_6, "wa-g6-weather"), "ok-g6-weather", ["6.ESS2.4; 6.ESS2.5", "the water cycle driven by the sun and gravity, and how air masses and fronts change the weather"], [
    ["Severe storms in Oklahoma often form when warm, moist air from the Gulf of Mexico meets…", "cold, dry air", ["more warm, moist air", "ocean water"], "Fronts form where air masses meet."],
    ["A dryline, common in western Oklahoma, separates…", "moist air from dry air", ["day from night", "two oceans"], "Storms often form along it."],
    ["Water that evaporates from Oklahoma lakes can return as…", "rain", ["oil", "sand"], "This is part of the water cycle."],
    ["When a cold front passes over Oklahoma, temperatures usually…", "drop", ["rise", "stay the same"], "Cold air pushes in."],
  ], { parentNote: "Practises how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, including the drylines and fronts that bring Oklahoma's spring storms." }),
  localCopy(from(WASHINGTON_SCIENCE_6, "wa-g6-climate"), "ok-g6-climate", ["6.ESS2.6", "how unequal heating and Earth's rotation cause patterns of circulation that shape regional climates"], [
    ["Oklahoma has hotter summers than places on the coast because it is…", "far from the ocean", ["on a mountain top", "near the North Pole"], "Oceans keep temperatures milder."],
    ["Western Oklahoma is drier than eastern Oklahoma mainly because…", "less moist air from the Gulf of Mexico reaches it", ["it is closer to the ocean", "it has more trees"], "Moisture comes from the Gulf."],
    ["Winds that blow toward Oklahoma from the south often carry…", "warm, moist air", ["arctic ice", "desert sand only"], "The Gulf of Mexico is to the south."],
    ["Places near the equator are warmer than Oklahoma because they get…", "more direct sunlight", ["more wind", "less sunlight"], "Direct sunlight heats more."],
  ], { parentNote: "Practises how sunlight, oceans, latitude and mountains shape regional climates, and how human activity is raising Earth's average temperature, with Oklahoma examples like its hot summers and the dry west." }),
  localCopy(from(WASHINGTON_SCIENCE_7, "wa-g7-earth-surface"), "ok-g6-earth-surface", ["6.ESS2.1; 6.ESS2.2; 6.ESS2.3; 6.ESS3.2", "the rock cycle, processes that changed Earth's surface, plate tectonics evidence, and forecasting natural hazards"], [
    ["The Wichita Mountains are worn down and rounded because…", "they have been eroding for hundreds of millions of years", ["they formed last year", "they are made of ice"], "Old mountains are lower and rounder."],
    ["Granite in the Wichita Mountains formed from…", "cooled magma", ["seashells", "sand dunes"], "Granite is an igneous rock."],
    ["Oklahoma's limestone formed from…", "shells and sediment at the bottom of an ancient sea", ["lava", "ice"], "Limestone is a sedimentary rock."],
    ["Scientists study Oklahoma's earthquakes with… to find patterns.", "seismometers", ["telescopes", "thermometers"], "They record ground shaking."],
  ], { parentNote: "Practises plate tectonics and evidence from fossils, rocks and continent shapes, the rock cycle, how processes at different speeds shape Earth's surface, and forecasting hazards, with Oklahoma examples like the granite of the Wichita Mountains and its limestone." }),
  localCopy(from(WASHINGTON_SCIENCE_8, "wa-g8-earth-history"), "ok-g6-earth-history", ["6.ESS1.4", "using rock strata to build the geologic time scale and Earth's history"], [
    ["Rock layers in an Oklahoma canyon wall are usually oldest at the…", "bottom", ["top", "middle"], "Younger layers are laid on top."],
    ["Dinosaur fossils found in the Oklahoma Panhandle come from rock layers of the…", "Jurassic Period", ["present day", "last century"], "Dinosaurs lived in the Mesozoic Era."],
    ["Sea fossils in rock layers under Oklahoma show that…", "seas covered the area at times in the past", ["the area was always dry", "fossils move by themselves"], "Each layer records a past environment."],
    ["Geologists use the fossils in a layer to…", "estimate the layer's age", ["melt the rock", "change the layer's color"], "Index fossils help date rocks."],
  ]),
  localCopy(from(WASHINGTON_SCIENCE_6, "wa-g6-design"), "ok-g6-design", ["MS.ETS1.1; MS.ETS1.2; MS.ETS1.3; MS.ETS1.4", "defining design problems precisely, evaluating competing solutions, analyzing tests and improving a design"], [
    ["A team designs a storm shelter door for Oklahoma tornadoes. A criterion might be that it…", "stays shut in very strong winds", ["is painted red", "costs nothing"], "Criteria say what success looks like."],
    ["A constraint for a windbreak design on an Oklahoma farm might be…", "the money and land available", ["the color of the sky", "the farmer's favorite song"], "Constraints are limits."],
    ["Two designs for a wheat field irrigation system are tested. Engineers should choose by…", "comparing the test data against the criteria", ["picking the prettiest one", "guessing"], "Data helps decide."],
    ["After testing a model bridge for an Oklahoma creek, the team…", "improves the weakest part and tests again", ["stops forever", "throws out all the data"], "Design is a cycle."],
  ]),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(OREGON_WORLD_MAPS, "ok-g6-world-maps", ["6.C.1.1; 6.C.1.2", "geography as the why of where, and reading maps and other visual information"], [
    ["Oklahoma City is at about 35° N, 97° W. It is in which two hemispheres?", "Northern and Western", ["Southern and Eastern", "Northern and Eastern"], "North latitude and west longitude."],
    ["A map that shows where Oklahoma grows wheat is called a…", "thematic map", ["globe", "compass rose"], "A thematic map shows one topic."],
    ["On a map, 1 inch = 50 miles. Tulsa and Oklahoma City are about 2 inches apart. About how far is that?", "100 miles", ["25 miles", "52 miles"], "2 × 50 = 100."],
    ["Which ocean is closest to Oklahoma?", "the Atlantic Ocean, through the Gulf of Mexico", ["the Indian Ocean", "the Arctic Ocean"], "The Gulf of Mexico opens into the Atlantic."],
  ], { parentNote: "Practises continents and oceans, hemispheres, latitude and longitude, map scale and kinds of maps, with Oklahoma examples." }),
];
