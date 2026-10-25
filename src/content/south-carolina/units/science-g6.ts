import type { Unit } from "../../types";
import { SCIENCE_COPIES as californiaScienceG6 } from "../../california/units/science-g6";
import { UNITS as newYorkScienceG7 } from "../../new-york/units/science-g7";
import { SCIENCE_COPIES as oregonCopies } from "../../oregon/units/science-copies";
import { course as BC_8 } from "../../grades/g8/science";
import { copyOf, from } from "./kit";

/** South Carolina's own Grade 6 science units (`sc-` ids): copies of other states' units without their places, plus South Carolina items. */
export const UNITS: Unit[] = [
  // A copy of ca-g6-weather without its questions about other states' places.
  copyOf(
    from(californiaScienceG6, "ca-g6-weather"),
    {
      id: "sc-g6-weather",
      title: "Weather Systems",
      emoji: "⛈️",
      blurb: "How the sun drives the water cycle, and how air masses make the weather.",
      parentNote:
        "Practices how the sun's energy and gravity move water through the water cycle, and how air masses and fronts bring changes in weather, including South Carolina's thunderstorms and hurricanes.",
      standards: ["6-ESS2-4; 6-ESS2-5", "the water cycle driven by the sun and gravity, and how air masses and fronts change the weather"],
    },
    [
      ["Warm, moist air from the Atlantic meets a cold front over South Carolina. What often forms?", "Thunderstorms", ["Clear, calm skies for days", "A blizzard", "A heat wave"], "Rising warm air and a front make storms."],
      ["A hurricane watch for the South Carolina coast means…", "hurricane conditions are possible, so get ready", ["the hurricane has ended", "it will snow", "the storm is already over the beach"], "A watch means be ready."],
      ["Hurricanes that reach South Carolina get their energy from…", "warm ocean water", ["cold mountain air", "snow", "dry desert sand"], "Warm water is a hurricane's fuel."],
      ["A hurricane weakens after it moves inland over South Carolina because…", "it loses its supply of warm ocean water", ["land is colder than space", "mountains add energy", "it gains more moisture"], "No more warm water to feed it.", true],
      ["Air pressure is falling fast and the wind is picking up. The forecast should be…", "a storm is likely coming", ["clear and calm", "no change", "a long dry spell"], "Falling pressure often brings storms.", true],
    ],
  ),
  // A copy of ca-g6-climate without its questions about other states' places.
  copyOf(
    from(californiaScienceG6, "ca-g6-climate"),
    {
      id: "sc-g6-climate",
      title: "Climate Patterns",
      emoji: "🌡️",
      blurb: "How uneven heating, Earth's spin and the oceans shape climate.",
      parentNote:
        "Practices how unequal heating and the rotation of the Earth cause patterns of winds and ocean currents that shape climate, with examples from South Carolina and the Gulf Stream.",
      standards: ["6-ESS2-6", "how unequal heating and Earth's rotation shape winds, ocean currents and climate"],
    },
    [
      ["The Gulf Stream is a warm ocean current flowing past South Carolina. It helps make the coast's winters…", "milder", ["colder", "snowier", "drier than a desert"], "Warm water warms the air above it."],
      ["Summers across South Carolina are hot and humid mostly because of…", "warm, moist air from the ocean to the south and east", ["cold air from the Arctic", "dry desert winds", "snow on the mountains"], "Air picks up moisture over warm water."],
      ["The mountains in the Upstate are usually cooler than the coast because…", "air gets cooler as you go higher", ["they are closer to the sun", "they are near the ocean", "they have more sand"], "Higher places are cooler."],
      ["Places closer to the equator are usually warmer because…", "they get more direct sunlight all year", ["they are closer to the sun", "they have more mountains", "they have no oceans"], "The sun's rays hit them more directly."],
      ["Winds and ocean currents curve instead of moving in straight lines because…", "Earth spins", ["the Moon pushes them", "mountains are magnetic", "the ocean is salty"], "Earth's rotation bends their paths.", true],
    ],
  ),
  // A copy of BC's Grade 8 plate tectonics with South Carolina items.
  copyOf(from(BC_8.units, "plate-tectonics"), {
    id: "sc-g6-plate-tectonics",
    title: "Plate Tectonics",
    emoji: "🌋",
    blurb: "Moving plates, quakes and volcanoes",
    parentNote:
      "Practices the evidence that Earth's plates move (fossils, rocks, the shapes of continents and the seafloor), what happens at plate boundaries, and how scientists forecast earthquakes and volcanoes to keep people safe.",
    standards: ["6-ESS2-3; 6-ESS3-2", "fossils, rocks, continents and the seafloor as evidence of moving plates, and forecasting earthquakes and volcanoes"],
  }, [
    ["South Carolina is far from the edge of the North American Plate, so strong earthquakes there are…", "rare", ["daily", "impossible to feel", "caused by hurricanes"], "Most big quakes happen at plate edges."],
    ["The Atlantic Ocean off South Carolina is slowly getting wider because…", "plates are moving apart at the Mid-Atlantic Ridge", ["the ocean is filling with rain", "the Moon pulls the coast", "rivers push the land"], "New seafloor forms at the ridge."],
    ["The shapes of Africa and South America fit together like puzzle pieces. This is evidence that…", "the continents were once joined", ["the oceans are shrinking", "Earth is flat", "volcanoes made them"], "The plates have moved them apart."],
    ["Scientists put sensors near faults and volcanoes so they can…", "warn people sooner and keep them safe", ["stop earthquakes", "make volcanoes erupt", "move the plates"], "Forecasts help people prepare.", true],
  ]),
  // A copy of ny-g7-earth-surface without its questions about other states' places.
  copyOf(from(newYorkScienceG7, "ny-g7-earth-surface"), {
    id: "sc-g6-earth-surface",
    title: "Earth's Changing Surface",
    emoji: "🌍",
    blurb: "How plate movement, weathering and erosion shape Earth's surface.",
    parentNote: "Practices how moving plates build mountains, how weathering and erosion wear them down, and how these processes work at different speeds, with South Carolina examples.",
    standards: ["6-ESS2-2", "how geoscience processes change Earth's surface at different speeds and sizes"],
  }, [
    ["The Blue Ridge Mountains in the Upstate formed long ago when…", "plates of Earth's crust pushed together", ["a river dug them out", "the wind piled up sand", "a glacier melted"], "Colliding plates push rock upward."],
    ["Over millions of years, rain and rivers have made old mountains like the Blue Ridge…", "lower and rounder", ["taller and sharper", "hotter", "younger"], "Weathering and erosion wear land down."],
    ["The fall line in South Carolina is where rivers drop from hard rock onto softer coastal plain land. Rivers there form…", "rapids and small waterfalls", ["glaciers", "volcanoes", "deserts"], "Hard rock wears away more slowly than soft sand."],
    ["A strong earthquake shook Charleston in 1886. Earthquakes happen when…", "rocks along a fault suddenly slip", ["the Moon pulls on rivers", "it rains for many days", "waves hit the beach"], "Stress builds up, then the rock moves."],
    ["A hurricane cuts a new inlet through a barrier island in one night. Compared with mountain building, this change is…", "much faster", ["much slower", "exactly as slow", "impossible"], "Different processes work at different speeds.", true],
  ]),
  // A copy of or-g8-earth-history without its questions about other states' places.
  copyOf(from(oregonCopies["8"] ?? [], "or-g8-earth-history"), {
    id: "sc-g6-earth-history",
    title: "Earth's History & Fossils",
    emoji: "🦴",
    blurb: "Rock layers and fossils as a record of Earth's history.",
    parentNote: "Practices using rock layers and fossils to put events in Earth's long history in order on the geologic time scale.",
    standards: ["6-ESS1-4", "using rock layers to organize Earth's 4.6-billion-year history"],
  }, [
    ["South Carolina's state fossil is the Columbian mammoth. Its fossils are found in layers that are…", "young compared with dinosaur fossils", ["older than the first fish", "older than Earth", "from the future"], "Mammoths lived in the last Ice Age."],
    ["Fossil shark teeth are common in South Carolina. They show that much of the state was once…", "under the sea", ["covered in ice sheets", "on the moon", "a desert all the time"], "Sharks live in the sea."],
    ["A fossil found in a lower rock layer is usually…", "older than one in a layer above it", ["younger than one above it", "the same age as all fossils", "not a real fossil"], "Lower layers formed first."],
    ["Scientists use index fossils to…", "match the ages of rock layers in different places", ["measure rainfall", "find gold", "predict the weather"], "Some living things lived only for a short, known time.", true],
    ["Earth's history is about 4.6 billion years long. Humans have been around for…", "a tiny part of it", ["most of it", "all of it", "exactly half of it"], "People are very recent.", true],
  ]),
];
