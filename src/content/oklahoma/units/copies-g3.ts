import type { Unit } from "../../types";
import { SCIENCE_3 as WASHINGTON_SCIENCE_3 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Oklahoma copies of Grade 3 units that fit Oklahoma except for a few questions naming another state's places, with
// Oklahoma examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_3, "wa-g3-weather-climate"), "ok-g3-weather-climate", ["3.ESS2.1; 3.ESS2.2", "weather data in tables and graphs for each season, and climates in different regions of the world"], [
    ["Tornadoes in Oklahoma happen most often in…", "spring", ["winter", "every day of the year"], "Warm and cold air meet in spring."],
    ["Western Oklahoma usually gets… rain than eastern Oklahoma.", "less", ["more", "the same"], "The west is drier."],
    ["Oklahoma summers are usually…", "hot", ["freezing", "snowy"], "Temperatures often pass 90 degrees."],
    ["A graph of rain each month in Oklahoma City shows the wettest months are in…", "spring", ["January", "December"], "May and June are often the wettest."],
    ["The usual weather of the Oklahoma Panhandle over many years, with dry, windy plains, is its…", "climate", ["forecast", "weather today"], "Climate is the long-term pattern."],
    ["A table shows Oklahoma City's average high in July is about 94°F and in January about 49°F. Which month is warmer?", "July", ["January", "they are the same"], "Compare the two numbers."],
  ], { parentNote: "Practises reading weather data for different seasons and comparing climates around the world, from Oklahoma's hot summers and spring storms to rainforests, deserts and polar regions." }),
  localCopy(from(WASHINGTON_SCIENCE_3, "wa-g3-fossils"), "ok-g3-fossils", ["3.LS4.1", "fossils as evidence of organisms and the environments they lived in long ago"], [
    ["Fossils of sea animals found in Oklahoma show that the land…", "was once covered by a sea", ["was always a desert", "never changed"], "Fossils are clues to the past."],
    ["Oklahoma's state fossil is a dinosaur called…", "Saurophaganax", ["T. rex", "Triceratops"], "It was found in the Panhandle."],
    ["Dinosaur tracks in the Oklahoma Panhandle show that dinosaurs…", "walked there long ago", ["live there today", "were made of stone"], "Tracks are trace fossils."],
    ["A fossil shell found in a field tells us…", "an animal with a shell lived there long ago", ["it rained yesterday", "people made it"], "Shells last a long time."],
  ]),
];
