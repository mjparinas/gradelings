import type { Unit } from "../../types";
import { SCIENCE_4 as WASHINGTON_SCIENCE_4 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Oklahoma copies of Grade 4 units that fit Oklahoma except for a few questions naming another state's places, with
// Oklahoma examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_4, "wa-g4-rocks-erosion"), "ok-g4-rocks-erosion", ["4.ESS1.1; 4.ESS2.1", "patterns in rock layers and fossils show change, and water, ice, wind and plants weather and erode the land"], [
    ["Red rock canyons in western Oklahoma were carved over time by…", "water and wind", ["a volcano", "people with shovels"], "Weathering and erosion take a long time."],
    ["Rock layers in an Oklahoma road cut show that…", "older layers are usually at the bottom", ["the top is always oldest", "rocks never form layers"], "Layers stack over time."],
    ["Grass roots on the Oklahoma prairie help stop…", "erosion", ["rain", "sunlight"], "Roots hold the soil."],
    ["Water slowly dissolving rock made Alabaster Caverns and other Oklahoma…", "caves", ["volcanoes", "glaciers"], "Some rock dissolves slowly in water."],
  ]),
  localCopy(from(WASHINGTON_SCIENCE_4, "wa-g4-earth-hazards"), "ok-g4-earth-hazards", ["4.ESS2.2; 4.ESS3.2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"], [
    ["Many Oklahoma homes and schools have… to keep people safe in tornadoes.", "storm shelters", ["glass walls", "open roofs"], "Shelters are strong or underground."],
    ["Weather radar helps Oklahomans by…", "warning people before storms arrive", ["stopping all storms", "making tornadoes bigger"], "Early warnings save lives."],
    ["Oklahoma has had many small earthquakes, so engineers can make buildings safer with…", "strong frames that bend without breaking", ["thin glass walls", "sand foundations"], "Engineers design for shaking."],
    ["Levees and dams on Oklahoma rivers help reduce…", "flooding", ["sunshine", "wind"], "They hold back water."],
    ["Outdoor sirens in Oklahoma towns are tested so people know…", "when to take shelter from a tornado", ["when school starts", "when it will snow"], "Sirens are a warning system."],
    ["A map of where tornadoes touched down shows many in central Oklahoma. This map helps people…", "see a pattern and plan for safety", ["stop all tornadoes", "change the weather"], "Maps reveal patterns."],
  ], { parentNote: "Practises reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and comparing solutions that reduce the impacts of earthquakes, floods, tornadoes and other hazards, including Oklahoma's storm shelters and weather warnings." }),
  localCopy(from(WASHINGTON_SCIENCE_4, "wa-g4-energy-resources"), "ok-g4-energy-resources", ["4.ESS3.1", "energy and fuels come from renewable and nonrenewable resources, and their use affects the environment"], [
    ["Wind turbines on the plains of western Oklahoma make electricity from…", "wind", ["coal", "rain"], "Wind is renewable."],
    ["Oil and natural gas pumped from under Oklahoma are…", "nonrenewable resources", ["renewable resources", "made fresh every day"], "They took millions of years to form."],
    ["Dams on Oklahoma rivers, such as at Lake Eufaula, can make electricity from…", "moving water", ["burning wood", "moonlight"], "This is hydroelectric power."],
    ["Drilling for oil can affect the environment by…", "disturbing land and polluting water if not done carefully", ["making new forests", "cooling the planet"], "Every energy source has effects."],
  ], { parentNote: "Practises how energy and fuels come from natural resources like moving water, wind, sunlight, coal, oil and gas, and how using them affects the environment, including Oklahoma's oil wells, natural gas and wind farms." }),
];
