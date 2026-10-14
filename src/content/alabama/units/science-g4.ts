import type { Unit } from "../../types";
import { SCIENCE_COPIES as californiaScienceG4 } from "../../california/units/science-g4";
import { SCIENCE_4 as washingtonScience4 } from "../../washington/units/science-35";
import { SCIENCE_COPIES as oregonCopies } from "../../oregon/units/science-copies";
import { copyOf, from } from "./kit";

/** Alabama's own Grade 4 science units (`al-` ids): copies of other states' units without their places, plus Alabama items. */
export const UNITS: Unit[] = [
  copyOf(
    from(californiaScienceG4, "ca-g4-earth-hazards"),
    {
      id: "al-g4-earth-hazards",
      title: "Earth Maps & Hazards",
      emoji: "🌪️",
      blurb: "Patterns on maps of land and ocean, and ways to stay safe from natural hazards.",
      parentNote: "Your child reads maps to find patterns in Earth's features and compares solutions that protect people from natural hazards, such as Alabama's tornadoes and hurricanes.",
      standards: ["4.13; 4.15", "patterns of Earth's features on maps, and solutions that protect people from natural hazards"],
    },
    [
      ["In a tornado, the safest place in a house is…", "a small room on the lowest floor, away from windows", ["next to a big window", "outside on the porch", "in the attic"], "Get low and put walls between you and the storm."],
      ["Which hazard most often threatens Alabama's coast in late summer and fall?", "Hurricanes", ["Volcanoes", "Avalanches", "Blizzards"], "These storms form over warm ocean water."],
      ["Homes near the coast are built on stilts to protect them from…", "flooding from storm surge", ["earthquakes", "volcanoes", "snow"], "Storms can push sea water onto land."],
      ["Sirens and weather radios help protect people by…", "warning them to take shelter", ["stopping the storm", "making the wind weaker", "moving the clouds"], "A warning gives people time to act."],
      ["A map of the ocean floor shows a long chain of underwater mountains. This is a…", "mid-ocean ridge", ["coral reef", "beach", "river delta"], "Many ocean floors have ridges down the middle.", true],
      ["A safe room is built with strong walls bolted to the ground. It is designed to protect against…", "tornado winds", ["drought", "heat waves", "landslides far away"], "Strong winds can tear apart weak buildings.", true],
    ],
  ),
  copyOf(
    from(washingtonScience4, "wa-g4-energy-resources"),
    {
      id: "al-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Renewable and nonrenewable energy and how using it affects the environment.",
      parentNote: "Your child sorts energy resources as renewable or nonrenewable and describes how using each affects the environment, with Alabama examples such as coal and river dams.",
      standards: ["4.14", "how using renewable and nonrenewable energy resources affects the environment"],
    },
    [
      ["Coal is mined in parts of Alabama. Coal is a…", "nonrenewable resource", ["renewable resource", "kind of wind", "kind of sunlight"], "Coal took millions of years to form."],
      ["Dams on the Tennessee River in Alabama make electricity from moving water. This is…", "hydropower", ["solar power", "coal power", "wind power"], "Hydro means water."],
      ["Burning coal to make electricity can…", "release gases that pollute the air", ["make the air cleaner", "grow new coal", "cool the planet"], "Burning puts smoke and gases into the air."],
      ["A dam makes clean electricity, but it can also…", "change a river's habitat for fish", ["make the river saltier than the sea", "stop all rain", "create coal"], "A dam turns a flowing river into a lake."],
      ["Nuclear power plants make electricity without burning fuel, but they leave…", "used fuel that must be stored safely", ["smoke from coal", "nothing at all", "extra sunlight"], "The used fuel stays dangerous for a long time.", true],
      ["Natural gas is a fossil fuel. When it runs out, it…", "cannot be replaced in our lifetimes", ["grows back next year", "comes back with the rain", "refills every night"], "Fossil fuels formed over millions of years.", true],
    ],
  ),
  // A copy of or-g4-rocks-erosion without its questions about other states' places.
  copyOf(from(oregonCopies["4"] ?? [], "or-g4-rocks-erosion"), {
    id: "al-g4-rocks-erosion",
    title: "Rock Layers & Erosion",
    emoji: "🪨",
    blurb: "Evidence in rock layers and fossils, and erosion by water, ice and wind.",
    parentNote: "Your child reads rock layers and fossils as clues to the past and explains how water, ice and wind wear land away.",
    standards: ["4.11; 4.12", "evidence in rock layers and fossils, and erosion by water, ice and wind"],
  }, [
    ["In a stack of rock layers that hasn't been disturbed, which layer is usually oldest?", "The bottom layer", ["The top layer", "The middle layer", "They are all the same age"], "Layers pile up one on top of another."],
    ["A fossil seashell is found in rock on a hill far from the sea. What does it tell us?", "Water once covered that land", ["Seashells can walk", "The hill was always dry", "Someone dropped it yesterday"], "Sea animals live in water."],
    ["Which carries soil from Alabama farms into rivers during a storm?", "Running water", ["Sunlight", "Moonlight", "Snow on mountains in July"], "Think about rain flowing downhill."],
    ["Waves wearing away a sandy beach is an example of…", "erosion", ["melting", "evaporation", "condensation"], "Moving water carries sand away."],
    ["Wind blowing sand against a rock for many years slowly…", "wears the rock down", ["makes the rock grow", "turns the rock to ice", "makes the rock heavier"], "Tiny bits of sand rub like sandpaper.", true],
  ]),
];
