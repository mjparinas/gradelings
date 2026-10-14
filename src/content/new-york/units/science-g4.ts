import type { Unit } from "../../types";
import { SCIENCE_4 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

// New York copies of Washington science units built around Pacific Northwest places. Each keeps the original's
// questions, leaves out the ones about Washington, Oregon or California, and adds New York items: the Finger Lakes,
// Niagara Falls, Letchworth's gorge, Hurricane Sandy's storm surge and New York's hydropower and offshore wind. Their
// own `ny-` ids keep New York progress apart from the originals.
export const UNITS: Unit[] = [
  copyOf(
    from(SCIENCE_4, "wa-g4-rocks-erosion"),
    {
      id: "ny-g4-rocks-erosion",
      title: "Rocks, Layers & Erosion",
      emoji: "🪨",
      blurb: "Rock layers tell stories. Water, ice and wind reshape land.",
      parentNote:
        "Practices reading rock layers and fossils as clues to how a landscape changed, and how weathering and erosion by water, ice, wind and plants shape the land, with New York's Finger Lakes, Niagara Falls and Letchworth gorge as examples.",
      standards: [
        "4-ESS1-1; 4-ESS2-1",
        "rock layers and fossils show landscape change, and weathering and erosion shape the land",
      ],
    },
    [
      ["The Finger Lakes formed when huge glaciers…", "carved deep valleys that filled with water", ["erupted lava", "were dug by people", "fell from space"], "Moving ice scrapes the land."],
      ["Water at Niagara Falls slowly wears away the rock. This is…", "erosion", ["an eruption", "an earthquake", "photosynthesis"], "Moving water carries rock away."],
      ["The deep gorge at Letchworth State Park was carved by…", "a river over a very long time", ["one big earthquake", "a meteor", "wind in one day"], "Water cuts rock slowly."],
      ["A gorge wall in New York has sea shells in its bottom layers. The bottom layers are…", "older", ["younger", "the same age as the top", "made last"], "Layers pile up over time."],
      ["Big boulders sit in New York fields far from where they formed. They were moved by…", "glaciers", ["birds", "raindrops", "volcanoes"], "Ice sheets carried them.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_4, "wa-g4-earth-hazards"),
    {
      id: "ny-g4-earth-hazards",
      title: "Maps & Natural Hazards",
      emoji: "🌊",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and comparing solutions that reduce the impacts of earthquakes, eruptions, floods and storm surges, such as the dunes and sea walls that protect New York's coast.",
      standards: [
        "4-ESS2-2; 4-ESS3-2",
        "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards",
      ],
    },
    [
      ["Hurricane Sandy in 2012 pushed ocean water onto land in New York City. This is called…", "a storm surge", ["a drought", "an eruption", "a landslide"], "Wind pushes the sea onto the shore."],
      ["Which helps protect a coastal neighborhood from a storm surge?", "Sand dunes and sea walls", ["Cutting down beach grass", "Building on the beach", "Digging holes in the dunes"], "Barriers hold back water."],
      ["On a map, the Adirondack Mountains are in…", "northern New York", ["Long Island", "New York City", "the Atlantic Ocean"], "They are near Lake Champlain.", true],
      ["On a map of the Atlantic Ocean floor, a long underwater mountain range runs down the…", "middle of the ocean", ["edge of every beach", "top of Long Island", "bottom of a lake"], "It is the Mid-Atlantic Ridge.", true],
      ["Before a big hurricane, families should…", "make a plan and follow evacuation orders", ["go to the beach to watch the waves", "open all the windows", "ignore the forecast"], "Be ready and stay safe."],
      ["Earthquakes in New York are…", "rare and usually small", ["huge and happen every day", "as common as rainstorms", "caused by snow"], "New York is far from a plate edge.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_4, "wa-g4-energy-resources"),
    {
      id: "ny-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like moving water, wind, sunlight, oil and gas, and how using them affects the environment, with examples from New York's hydropower at Niagara Falls and wind farms off Long Island.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Power plants at Niagara Falls make electricity from…", "falling water", ["burning coal", "sunlight", "oil"], "This is hydropower."],
      ["Wind turbines are being built in the ocean off Long Island because…", "ocean winds are strong and steady", ["the ocean is hot", "fish turn them", "there is oil there"], "Wind turns the blades."],
      ["Solar panels on New York rooftops make electricity from…", "sunlight", ["wind", "coal", "snow"], "Solar means sun."],
      ["Which is a renewable resource used in New York?", "Moving water at dams", ["Coal", "Oil", "Natural gas"], "It will not run out.", true],
    ],
  ),
];
