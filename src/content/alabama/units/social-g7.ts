import type { Unit } from "../../types";
import { G6 as WASHINGTON_6 } from "../../washington/units/social-59-g6";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Alabama's own Grade 7 social studies units (`al-` ids), for World History and Geography: Geographic Principles and
// Ancient Civilizations: the Assyrians, Phoenicians and Persian Empire (7.11), and copies of Washington's world maps
// and world regions units without their Washington State questions (7.1, 7.2).

const SOUTHWEST: Q[] = [
  ["The Assyrian Empire grew up along which river in northern Mesopotamia?", "the Tigris", ["the Nile", "the Indus", "the Huang He"], "One of Mesopotamia's two rivers."],
  ["The Assyrians were best known for their…", "powerful army and iron weapons", ["peaceful farming only", "sea voyages to the Americas", "giant pyramids"], "A feared military."],
  ["The Assyrian capital with a famous royal library was…", "Nineveh", ["Athens", "Rome", "Memphis"], "King Ashurbanipal collected clay tablets there."],
  ["Ashurbanipal's library at Nineveh held thousands of…", "clay tablets written in cuneiform", ["printed books", "paper scrolls in Latin", "video recordings"], "Wedge-shaped writing."],
  ["The Assyrians kept control of conquered lands by…", "building roads and placing governors over provinces", ["giving every city independence", "having no army", "moving to Egypt"], "Roads moved soldiers and messengers."],
  ["The Phoenicians lived along the eastern coast of the…", "Mediterranean Sea", ["Atlantic Ocean", "Indian Ocean", "Caspian Sea"], "Present-day Lebanon."],
  ["The Phoenicians were famous as…", "sailors and traders", ["desert herders", "mountain miners", "pyramid builders"], "Their ships crossed the Mediterranean."],
  ["Phoenician city-states included Tyre, Sidon and…", "Byblos", ["Sparta", "Babylon", "Thebes"], "The word Bible comes from its name."],
  ["The Phoenicians made a valuable purple dye from…", "sea snails", ["grapes", "beetles", "clay"], "Purple became a royal color."],
  ["The Phoenicians' greatest gift to later peoples was…", "an alphabet of letters for sounds", ["the wheel", "the pyramid", "paper money"], "The Greeks borrowed it."],
  ["The Phoenician alphabet was the basis for the…", "Greek and Latin alphabets", ["Chinese characters", "Egyptian hieroglyphs", "cuneiform"], "The letters you are reading descend from it."],
  ["The Phoenicians founded the city of Carthage in…", "North Africa", ["Britain", "India", "China"], "Later Rome's great rival."],
  ["The Persian Empire was founded by…", "Cyrus the Great", ["Julius Caesar", "Hammurabi", "Alexander the Great"], "About 550 BCE."],
  ["Cyrus the Great was known for…", "respecting the customs and religions of conquered peoples", ["destroying every city he took", "banning all trade", "staying in one city"], "Tolerance helped him rule."],
  ["After conquering Babylon, Cyrus allowed the Jewish people to…", "return to Judah and rebuild their temple", ["become Persian soldiers only", "move to Egypt", "stop practicing their faith"], "An end to exile."],
  ["Darius I divided the Persian Empire into provinces called…", "satrapies", ["city-states", "dynasties", "colonies"], "Each was run by a satrap."],
  ["The Royal Road in Persia allowed…", "messengers to cross the empire quickly", ["ships to sail inland", "trains to run", "farmers to avoid taxes"], "About 1,600 miles long."],
  ["The Persians helped trade by using standard…", "coins", ["credit cards", "paper checks", "barcodes"], "Same money across the empire."],
  ["A grand Persian capital built by Darius I was…", "Persepolis", ["Nineveh", "Carthage", "Jerusalem"], "Its name means 'city of the Persians' in Greek."],
  ["The Persian Wars were fought between Persia and…", "the Greek city-states", ["Rome", "China", "Egypt"], "Marathon and Thermopylae."],
  ["The Persian Empire was conquered in the 330s BCE by…", "Alexander the Great", ["Cyrus the Great", "Julius Caesar", "Ashurbanipal"], "A king from Macedonia."],
  ["Which empire stretched from Egypt to the Indus River?", "the Persian Empire", ["the Assyrian Empire at its smallest", "the Phoenician city-states", "the Roman Republic"], "The largest empire of its time.", true],
  ["Why could the small Phoenician city-states become so influential?", "Their sea trade spread goods and ideas widely", ["They had the largest army", "They conquered Persia", "They built the pyramids"], "Trade, not conquest.", true],
  ["How did the Assyrian and Persian ways of ruling conquered peoples differ?", "The Assyrians ruled by fear; the Persians allowed local customs", ["Both allowed full independence", "The Persians ruled by fear; the Assyrians allowed local customs", "Neither had governors"], "Compare harshness and tolerance.", true],
  ["Why did an alphabet spread more easily than cuneiform?", "It used a few letters instead of hundreds of signs", ["It had no letters", "It was carved only in gold", "Only kings could read it"], "Easier to learn.", true],
  ["The Babylonian king who wrote a famous law code was…", "Hammurabi", ["Darius", "Cyrus", "Ashurbanipal"], "An eye for an eye.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "al-g7-southwest-asia",
    title: "Assyria, Phoenicia & Persia",
    emoji: "🏺",
    blurb: "Empires and traders of Southwest Asia",
    parentNote:
      "The Assyrian Empire and its army and library, the Phoenician traders and their alphabet, and the Persian Empire of Cyrus and Darius, with its satrapies, Royal Road and coins.",
    standards: ["7.11", "the development of the Assyrians, Phoenicians and Persian Empire"],
    items: SOUTHWEST,
  }),
  copyOf(
    from(WASHINGTON_6, "wa-g6-world-maps"),
    {
      id: "al-g7-world-maps",
      title: "World Maps & Globes",
      emoji: "🌐",
      blurb: "Latitude, longitude and map tools",
      parentNote: "Using maps, globes and other geographic tools: latitude and longitude, hemispheres, continents and oceans, map projections and scale.",
      standards: ["7.1", "describing the world in spatial terms with maps, globes and geographic tools"],
    },
    [
      ["Montgomery, Alabama, is at about 32° N, 86° W. Which hemispheres is it in?", "Northern and Western", ["Southern and Eastern", "Northern and Eastern", "Southern and Western"], "North of the Equator, west of the Prime Meridian."],
      ["GPS and satellite images are examples of…", "geospatial technologies", ["ancient artifacts", "primary sources from Rome", "weather myths"], "Tools that map Earth from data."],
      ["A map projection always distorts some…", "shape, size, distance or direction", ["colors only", "names only", "nothing at all"], "A round Earth on a flat page."],
    ],
  ),
  copyOf(
    from(WASHINGTON_6, "wa-g6-world-regions"),
    {
      id: "al-g7-world-regions",
      title: "World Regions",
      emoji: "🗺️",
      blurb: "Place, region and the environment",
      parentNote: "Location, place, region, movement and human-environment interaction, and how they shape the way people live in different parts of the world.",
      standards: ["7.2", "how location, place, region, movement and the environment shape life in an area"],
    },
    [
      ["Building dams on rivers is an example of…", "people changing the environment", ["the environment changing people", "movement of ideas", "a region's border"], "Human-environment interaction."],
      ["The spread of a religion along trade routes is an example of the theme of…", "movement", ["location", "place", "region"], "People, goods and ideas move."],
      ["A region is an area united by…", "shared features such as climate, language or landforms", ["one street", "a single building", "nothing in common"], "Common characteristics."],
    ],
  ),
];
