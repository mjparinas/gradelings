import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Vermont Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with Vermont examples added (the Champlain Sea whale, the Chazy reef on Isle La Motte, Mount Mansfield's weather).

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "vt-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, with Vermont's own fossils: the white whale found near Charlotte, from a time after the Ice Age when salty water filled the Champlain Valley, and the ancient reef on Isle La Motte.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["In 1849, workers building a railroad near Charlotte, Vermont, dug up the bones of a…", "whale", ["dinosaur", "camel", "lion"], "It is Vermont's state fossil."],
      ["A whale fossil far from today's ocean tells us that long ago the Champlain Valley was…", "filled with salty sea water", ["a hot desert", "covered in lava", "always dry land"], "After the Ice Age, the sea flowed in for a while."],
      ["Long ago, thick sheets of ice covered all of Vermont. They were…", "glaciers", ["volcanoes", "coral reefs", "deserts"], "The Ice Age ended about 12,000 years ago."],
      ["On Isle La Motte in Lake Champlain, rocks hold fossils of a very old…", "reef", ["forest fire", "city", "volcano"], "Sea creatures built it when a warm sea covered the land."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Fish fossils in a dry valley tell us the valley once held a…", "lake", ["volcano", "glacier", "city"], "Lakes filled some valleys long ago."],
      ["Granite formed from melted rock deep underground. Why does it almost never hold fossils?", "living things can't be saved in melted rock", ["granite is too young", "fossils melt in the sun", "granite is soft"], "Fossils form in layers of mud and sand.", true],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils far from any ocean tell us…", "the place was once covered by sea", ["sea animals can walk", "it was always dry land", "fish live in deserts"], "Environments change over very long times.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "vt-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Vermont's four seasons, its snowy winters and mud season, its colorful fall and the cold, windy weather on top of Mount Mansfield.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Burlington usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Vermont, the leaves turn red, orange and yellow in…", "fall", ["summer", "winter", "early spring"], "Cooler days and longer nights change the leaves."],
      ["Vermont has warm summers and cold, snowy winters most years. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["In early spring, melting snow and thawing ground turn Vermont's dirt roads soft. Vermonters call this…", "mud season", ["leaf season", "dry season", "monsoon season"], "The frozen ground thaws from the top down."],
      ["Maple sap runs best when nights are below freezing and days are…", "above freezing", ["very hot", "always freezing", "rainy all day"], "Sugaring season comes at the end of winter."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which is usually colder, the top of Mount Mansfield or a town in the valley below?", "the top of Mount Mansfield", ["the town in the valley", "they are always the same", "neither has winter"], "It gets colder the higher you go."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do many Vermont families put snow tires on their cars in late fall?", "winters bring snow and ice", ["it is hot all year", "it never snows", "roads melt in winter"], "People plan for the climate where they live.", true],
    ],
  ),
];
