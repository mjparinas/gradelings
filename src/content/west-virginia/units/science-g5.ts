import type { Unit } from "../../types";
import { SCIENCE_COPIES as CALIFORNIA_4 } from "../../california/units/science-g4";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// West Virginia Grade 5 science: copies of California's energy-resources, sun-and-stars and Earth's-systems units
// without their California places, with West Virginia examples added. West Virginia teaches energy resources in Grade 5
// (S.5.11).

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(CALIFORNIA_4, "ca-g4-energy-resources"),
    {
      id: "wv-g5-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, natural gas, wind, sunlight and moving water, and how using them affects the environment, with West Virginia examples such as coal mines, gas wells and ridge-top wind turbines.",
      standards: ["S.5.11", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Wind turbines on West Virginia's mountain ridges make electricity from wind. Wind is a…", "renewable resource", ["fossil fuel", "kind of rock", "kind of coal"], "Wind will not run out."],
      ["Coal mined in West Virginia is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from plants that lived long ago."],
      ["Natural gas from deep layers of shale rock in West Virginia is a…", "fossil fuel", ["renewable resource", "kind of sunlight", "kind of wood"], "Like coal, it formed from living things long ago."],
      ["Dams on rivers can use falling water to…", "spin turbines that make electricity", ["make snow", "grow corn", "light candles"], "Moving water is a source of energy."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["After a coal mine closes, planting grass and trees on the land helps…", "stop erosion and bring back wildlife", ["make more coal", "dry up the rivers", "cause landslides"], "This is called reclamation.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "wv-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from West Virginia.",
      standards: ["S.5.13; S.5.14", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["In West Virginia, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["In Charleston, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["At noon in West Virginia, where does the sun appear in the sky?", "toward the south", ["toward the north", "straight down", "under the ground"], "West Virginia is north of the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["Why can you see more stars in the forests of Pocahontas County than in a big city?", "there is less light from buildings and streets", ["the stars are closer there", "there is no moon there", "the trees make stars"], "City lights hide faint stars.", true],
      ["Why do we see different constellations in winter and summer?", "Earth moves around the sun", ["the stars move away", "the moon blocks them", "stars sleep in summer"], "We face different parts of space.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "wv-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water and land, using West Virginia examples like the Ohio, Kanawha and Greenbrier rivers.",
      standards: ["S.5.8; S.5.9; S.5.10", "where Earth's water is, how communities protect resources, and how Earth's systems interact"],
    },
    [
      ["Many West Virginia towns get their drinking water from…", "rivers, lakes and wells", ["the ocean", "a glacier", "the desert"], "Fresh water is cleaned before it reaches homes."],
      ["Rain washes soil from a bare hillside into the Greenbrier River. That shows the… and the hydrosphere interacting.", "geosphere", ["atmosphere only", "sun", "moon"], "The geosphere is rock and soil."],
      ["Planting strips of trees and grass beside streams helps…", "keep soil and fertilizer out of the water", ["make the water salty", "stop all rain", "dry up the stream"], "Plant roots hold soil in place."],
      ["Trees on a riverbank take in water and give off water vapor. That links the biosphere and the…", "atmosphere", ["Moon", "core", "sun"], "The atmosphere is the air."],
      ["Wind wearing away bare soil shows the atmosphere changing the…", "geosphere", ["biosphere only", "ocean floor", "Moon"], "Moving air can carry soil away."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["Why is it important to keep trash out of the Kanawha River?", "it flows into other waters and harms life", ["trash helps fish", "rivers clean everything", "it makes the river longer"], "The Kanawha flows into the Ohio River.", true],
    ],
  ),
];
