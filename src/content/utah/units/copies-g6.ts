import type { Unit } from "../../types";
import { SCIENCE_6, SCIENCE_8 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Utah copies of science units that fit Utah's Grade 6 except for a few questions naming another state's places, with
// Utah examples added. Utah teaches space systems (from Grade 8) in Grade 6.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(SCIENCE_8, "wa-g8-space"), "ut-g6-space", ["6.1.1; 6.1.2; 6.1.3", "models of the Sun-Earth-Moon system, gravity in the solar system, and the scale of objects in it"], [
    ["In June, Utah has long days because…", "the Northern Hemisphere tilts toward the Sun", ["Earth is closest to the Sun then", "the Moon blocks less sunlight"], "Seasons come from Earth's tilt."],
    ["Far from city lights in Utah's dark-sky parks, you can see a band of stars. It is…", "the Milky Way, our galaxy", ["the Andromeda galaxy", "the asteroid belt"], "We see our own galaxy edge-on."],
    ["Seen from Utah, a full Moon rises in the east at about…", "sunset", ["noon", "sunrise"], "A full Moon is on the opposite side of Earth from the Sun."],
    ["In October 2023, people in southern Utah saw a ring of sunlight around the Moon. That was an…", "annular solar eclipse", ["lunar eclipse", "ordinary full Moon"], "The Moon passed in front of the Sun.", true],
  ]),
  localCopy(from(SCIENCE_6, "wa-g6-weather"), "ut-g6-weather", ["6.3.1; 6.3.2", "the water cycle, and how air masses and fronts change the weather"], [
    ["Most weather systems move across Utah from the…", "west to east", ["east to west", "south to north"], "The prevailing winds blow from the west."],
    ["Air rising over the Wasatch Mountains cools and…", "drops snow or rain", ["gets warmer", "stops moving"], "Cool air holds less water vapour."],
    ["The Great Salt Lake can add extra snow to storms near Salt Lake City. This is called…", "lake-effect snow", ["a heat wave", "a drought"], "Cold air picks up moisture over the warmer lake.", true],
    ["In winter, cold air can be trapped in Utah's valleys under a layer of warmer air. This is called an…", "inversion", ["eclipse", "earthquake"], "It can trap smog in the valleys too.", true],
  ], {
    parentNote: "Practises how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, including snow over the Wasatch Mountains and winter inversions in Utah's valleys.",
  }),
  localCopy(from(SCIENCE_6, "wa-g6-climate"), "ut-g6-climate", ["6.3.3; 6.3.4", "how sunlight, oceans, latitude and mountains shape climates, and evidence that Earth's average temperature is rising"], [
    ["Utah's mountain snowpack matters because melting snow…", "supplies much of the state's water", ["keeps summer cool forever", "stops the rain"], "Snow melts into rivers and reservoirs."],
    ["A smaller snowpack in Utah's mountains means…", "less water in rivers in summer", ["more water in the Great Salt Lake", "more snow next spring"], "Less snow means less meltwater."],
    ["Utah is dry partly because mountain ranges to its west…", "take moisture out of air coming from the Pacific Ocean", ["block the sun", "pull in ocean water"], "Air drops its rain before it reaches Utah."],
    ["As Utah's winters warm, more of the water that falls in the mountains comes as…", "rain instead of snow", ["hail every day", "sand"], "Warmer air turns snow to rain.", true],
  ]),
];
