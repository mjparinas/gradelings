import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Delaware Grade 3 science: copies of California's fossil and weather-and-climate units without their California
// places, with Delaware examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "de-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, and what the sea fossils found along the Chesapeake and Delaware Canal show about Delaware long ago.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Fossils of sea animals called belemnites are found along the Chesapeake and Delaware Canal. They show Delaware was once…", "covered by the sea", ["a desert", "under lava", "covered in ice"], "Belemnites were ocean animals related to squid."],
      ["Belemnite fossils are so common in Delaware that the belemnite is Delaware's state…", "fossil", ["bird", "flower", "song"], "A state can pick a fossil as a symbol."],
      ["Mammoth bones found in places that are warm today show the land was once…", "much colder", ["a rainforest", "under lava", "always the same"], "Mammoths lived in the Ice Age."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Fish fossils in a dry valley tell us the valley once held a…", "lake", ["volcano", "glacier", "city"], "Lakes filled some valleys long ago."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils far from any ocean tell us…", "the place was once covered by sea", ["sea animals can walk", "it was always dry land", "fish live in deserts"], "Environments change over very long times.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "de-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Delaware's four seasons, its nor'easters and hurricanes, its colorful fall and the milder weather near the ocean.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Dover usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Delaware, the leaves turn red, orange and yellow in…", "fall", ["summer", "winter", "early spring"], "Cooler days and longer nights change the leaves."],
      ["Delaware has hot, humid summers and cool winters most years. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["A big storm that blows in from the ocean with strong winds from the northeast is called a…", "nor'easter", ["monsoon", "heat wave", "dust devil"], "It is named for the direction of its winds."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["In late summer and fall, big storms from the tropics can bring heavy rain and wind to Delaware. They are…", "hurricanes", ["blizzards", "dust storms", "heat waves"], "They form over warm ocean water."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do Delaware beach towns plan for storms in late summer and fall?", "it is hurricane season", ["it never rains then", "the ocean freezes", "it snows every day"], "People plan for the climate where they live.", true],
    ],
  ),
];
