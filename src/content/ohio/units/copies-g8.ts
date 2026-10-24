import type { Unit } from "../../types";
import { SCIENCE_7 as TEXAS_SCIENCE_7 } from "../../texas/units/science-7";
import { SCIENCE_8 as WASHINGTON_SCIENCE_8 } from "../../washington/units/science-68";
import { course as BC_SCIENCE_7 } from "../../grades/g7/science";
import { course as BC_SCIENCE_8 } from "../../grades/g8/science";
import { from, localCopy } from "./kit";

// Ohio copies of Grade 8 units that fit Ohio except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(BC_SCIENCE_8.units, "plate-tectonics"), "oh-g8-plate-tectonics", ["8.ESS.2; 8.ESS.3", "Earth's crust consists of major and minor tectonic plates that move, building up and wearing down the surface"], [
    ["Ohio sits in the middle of the North American Plate, so large earthquakes in Ohio are…", "rare", ["daily", "impossible to measure"], "Most big quakes happen at plate edges."],
    ["Where two plates pull apart under the ocean, new crust forms at a…", "mid-ocean ridge", ["trench", "delta"], "Magma rises and cools."],
    ["Where an ocean plate sinks under another plate, it forms a deep…", "trench", ["ridge", "plateau"], "This is a subduction zone."],
    ["The Appalachian Mountains, east of Ohio, formed long ago when…", "plates collided", ["glaciers melted", "rivers dried up"], "Collisions push up mountains."],
    ["Matching fossils on continents that are now far apart are evidence that…", "the continents were once joined", ["fossils swim across oceans", "the continents never moved"], "This supports plate tectonics."],
    ["Earth's plates move about as fast as…", "your fingernails grow", ["a car on a highway", "a running deer"], "A few centimeters a year."],
  ], { parentNote: "How Earth's crust is broken into moving plates, what happens where plates meet (mountains, earthquakes, volcanoes and trenches), and the evidence for plate movement." }),
  localCopy(from(BC_SCIENCE_7.units, "restless-earth"), "oh-g8-restless-earth", ["8.ESS.3", "earthquakes, volcanoes and mountain building are constructive and destructive processes"], [
    ["Mountain building and volcanoes that add new land are… processes.", "constructive", ["destructive", "magnetic"], "They build up the surface."],
    ["Weathering and erosion that wear land down are… processes.", "destructive", ["constructive", "magnetic"], "They break down the surface."],
    ["Small earthquakes sometimes shake Ohio. Scientists measure them with a…", "seismograph", ["barometer", "thermometer"], "It records ground shaking."],
    ["Glaciers that covered Ohio scraped up rock and dropped it far away. This shows…", "erosion and deposition", ["a volcanic eruption", "a plate collision"], "Ice moves material."],
    ["Lava that cools at Earth's surface forms… rock.", "igneous", ["sedimentary", "metamorphic"], "Igneous rock forms from melted rock."],
    ["Why are there no active volcanoes in Ohio?", "Ohio is far from a plate boundary or hot spot", ["Ohio is too cold", "Ohio has too many lakes"], "Volcanoes form at boundaries and hot spots."],
  ], { parentNote: "Earthquakes, volcanoes and mountain building as constructive and destructive forces, how rock layers record Earth's long history, and how scientists study them." }),
  localCopy(from(WASHINGTON_SCIENCE_8, "wa-g8-earth-history"), "oh-g8-earth-history", ["8.ESS.4", "evidence of the dynamic changes of Earth's surface through time is found in the geologic record"], [
    ["Many rocks near Cincinnati are full of fossils of…", "ancient sea animals", ["dinosaurs", "modern fish"], "A shallow sea covered Ohio long ago."],
    ["In undisturbed rock layers, the oldest layer is usually at the…", "bottom", ["top", "middle"], "This is the law of superposition."],
    ["Ohio's flat Lake Plains and western farmland were shaped by…", "glaciers during the Ice Age", ["volcanoes", "ocean waves today"], "Ice sheets flattened the land."],
    ["Ohio's state fossil, the trilobite Isotelus, lived about 450 million years ago in…", "a shallow sea", ["a desert", "a glacier"], "Its fossils are found in Ohio rock."],
    ["Rock and gravel left behind by melting glaciers is called…", "till", ["lava", "coral"], "Till covers much of Ohio."],
    ["Index fossils help geologists…", "match the ages of rock layers in different places", ["find gold", "predict the weather"], "They lived for a short time over a wide area."],
  ]),
  localCopy(from(TEXAS_SCIENCE_7, "tx-g7-plate-tectonics"), "oh-g8-plate-boundaries", ["8.ESS.2", "Earth's crust is made of tectonic plates that move"], [
    ["Mount Everest is still rising because…", "two plates are pushing together", ["it is a volcano", "glaciers lift it"], "India is pushing into Asia."],
    ["Iceland sits where two plates are…", "pulling apart", ["sliding past each other", "not moving at all"], "It lies on the Mid-Atlantic Ridge."],
    ["Fossils of the same reptile in South America and Africa support the idea of…", "continental drift", ["a single giant ocean", "fossils moving by wind"], "The continents were once joined."],
    ["Earth's plates move because of heat flowing in the…", "mantle", ["atmosphere", "oceans"], "Hot rock slowly circulates."],
    ["Hawaii's volcanoes formed over a…", "hot spot", ["plate boundary trench", "glacier"], "The plate moves over a plume of magma."],
    ["Ohio is far from any plate boundary, so its earthquakes are usually…", "small", ["huge and daily", "volcanic"], "Big quakes happen at plate edges."],
  ], { parentNote: "Practises the evidence that Earth has changed over time (fossils, matching continents, the order of rock layers) and how plate tectonics causes ocean basins, earthquakes, mountain building and volcanic eruptions, including hot spots." }),
];
