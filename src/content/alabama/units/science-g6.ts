import type { Unit } from "../../types";
import { SCIENCE_COPIES as californiaScienceG6 } from "../../california/units/science-g6";
import { UNITS as newYorkScienceG7 } from "../../new-york/units/science-g7";
import { SCIENCE_COPIES as oregonCopies } from "../../oregon/units/science-copies";
import { copyOf, from } from "./kit";

/** Alabama's own Grade 6 science units (`al-` ids): copies of other states' units without their places, plus Alabama items. */
export const UNITS: Unit[] = [
  copyOf(
    from(californiaScienceG6, "ca-g6-weather"),
    {
      id: "al-g6-weather",
      title: "Weather Systems",
      emoji: "⛈️",
      blurb: "How the sun drives the water cycle, and reading weather data to predict storms.",
      parentNote: "Your child explains how the sun's energy moves water through the water cycle and uses weather data to predict changes and severe weather, such as Alabama's tornadoes and hurricanes.",
      standards: ["6.8; 6.9", "how the sun drives the water cycle, and using data to predict weather and severe weather"],
    },
    [
      ["Warm, moist air from the Gulf meets a cold front over Alabama. What often forms?", "Thunderstorms, sometimes with tornadoes", ["Clear, calm skies for days", "A blizzard", "A heat wave"], "Rising warm air and a front make storms."],
      ["A tornado watch means…", "conditions are right for tornadoes to form", ["a tornado is on the ground nearby right now", "the storm has ended", "it will snow"], "A watch means be ready."],
      ["A tornado warning means…", "a tornado has been seen or shown on radar, so take shelter now", ["tornadoes might form later this week", "the weather will be sunny", "a hurricane is far out at sea"], "A warning means act now."],
      ["A hurricane weakens after it moves over land because…", "it loses its supply of warm ocean water", ["land is colder than space", "mountains add energy", "it gains more moisture"], "Warm water is a hurricane's fuel.", true],
      ["Air pressure is falling fast and the wind is picking up. The forecast should be…", "a storm is likely coming", ["clear and calm", "no change", "a long dry spell"], "Falling pressure often brings storms.", true],
    ],
  ),
  copyOf(
    from(californiaScienceG6, "ca-g6-climate"),
    {
      id: "al-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌡️",
      blurb: "How the sun, air, land and water shape climate, and how people affect Earth's systems.",
      parentNote: "Your child explains how the sun, air, land and water affect climate and how human activities affect Earth's systems, with examples from Alabama.",
      standards: ["6.10; 6.11", "how the sun, air, land and water affect climate, and how human activities affect Earth's systems"],
    },
    [
      ["Alabama's Gulf Coast has milder winters than north Alabama mainly because…", "the nearby warm ocean water keeps temperatures steadier", ["it is at a higher elevation", "it gets less sunlight", "it is farther from the equator"], "Water warms and cools slowly."],
      ["Warm, humid summers across Alabama come mostly from…", "moist air flowing in from the warm Gulf", ["cold air from the Arctic", "dry desert winds", "snow on the mountains"], "Air picks up moisture over warm water."],
      ["Places closer to the equator are usually warmer because…", "they get more direct sunlight all year", ["they are closer to the sun", "they have more mountains", "they have no oceans"], "The sun's rays hit them more directly."],
      ["Paving over fields and forests in a growing city can make the city…", "warmer, and send more rainwater rushing into streams", ["colder all year", "get more snow", "have cleaner rivers"], "Pavement soaks up heat and doesn't soak up rain.", true],
      ["As Earth's population grows, one way people lessen their impact on Earth's systems is…", "using energy and water more efficiently", ["burning more fuel", "draining more wetlands", "clearing more forests"], "Using less means taking less from Earth's systems.", true],
    ],
  ),
  // A copy of ny-g7-earth-surface without its questions about other states' places.
  copyOf(from(newYorkScienceG7, "ny-g7-earth-surface"), {
    id: "al-g6-earth-surface",
    title: "Earth's Changing Surface",
    emoji: "🌍",
    blurb: "How plate movement, weathering and erosion shape Earth's surface.",
    parentNote: "Your child explains how moving plates build mountains and how weathering and erosion wear them down over time.",
    standards: ["6.5; 6.6", "how plate movement, weathering and erosion shape Earth's surface"],
  }, [
    ["The Appalachian Mountains reach into northeast Alabama. Long ago they formed when…", "plates of Earth's crust pushed together", ["a river dug them out", "the wind piled up sand", "a glacier melted"], "Colliding plates push rock upward."],
    ["Over millions of years, rain and rivers have made old mountains like the Appalachians…", "lower and rounder", ["taller and sharper", "hotter", "younger"], "Weathering and erosion wear land down."],
    ["Breaking rock into smaller pieces without moving it is called…", "weathering", ["erosion", "deposition", "melting"], "Erosion moves the pieces; this step breaks them."],
    ["A river drops sand and mud where it slows down at its mouth. This is…", "deposition", ["weathering", "erosion", "subduction"], "The river lays down what it carried."],
    ["Caves in north Alabama limestone formed mainly when…", "slightly acidic water dissolved the rock", ["volcanoes erupted", "wind blew sand away", "ice froze the rock"], "Limestone dissolves slowly in acidic water.", true],
    ["Where two plates slide past each other, what is most likely?", "Earthquakes", ["A new ocean", "A sand dune", "A coral reef"], "Plates grinding sideways get stuck and slip.", true],
  ]),
  // A copy of or-g8-earth-history without its questions about other states' places.
  copyOf(from(oregonCopies["8"] ?? [], "or-g8-earth-history"), {
    id: "al-g6-earth-history",
    title: "Earth's History & Fossils",
    emoji: "🦴",
    blurb: "Rock layers and fossils as a record of Earth's history.",
    parentNote: "Your child uses rock layers and fossils to put events in Earth's long history in order.",
    standards: ["6.7", "rock layers and fossils as a record of Earth's history"],
  }, [
    ["Basilosaurus, Alabama's state fossil, was a…", "prehistoric whale", ["dinosaur that flew", "giant insect", "kind of fern"], "It lived in the sea."],
    ["Fossils of sea animals in Alabama rock show that much of the state was once…", "under the sea", ["covered in ice sheets", "on the moon", "a desert all the time"], "Sea animals live in the sea."],
    ["A fossil found in a lower rock layer is usually…", "older than one in a layer above it", ["younger than one above it", "the same age as all fossils", "not a real fossil"], "Lower layers formed first."],
    ["Which can become a fossil most easily?", "Hard parts like bones and shells", ["Soft parts like skin", "Breath", "Shadows"], "Hard parts last longer."],
    ["Scientists use index fossils to…", "match the ages of rock layers in different places", ["measure rainfall", "find gold", "predict the weather"], "Some living things lived only for a short, known time.", true],
    ["Earth's history is about 4.6 billion years long. Humans have been around for…", "a tiny part of it", ["most of it", "all of it", "exactly half of it"], "People are very recent.", true],
  ]),
];
