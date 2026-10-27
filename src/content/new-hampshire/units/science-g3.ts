import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// New Hampshire Grade 3 science: copies of California's fossil and weather-and-climate units without their California
// places, with New Hampshire examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "nh-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, and why fossils are rare in New Hampshire, where most rock is granite or rock changed by heat and pressure, and where Ice Age glaciers once covered the land.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Granite, New Hampshire's state rock, formed from melted rock deep underground. Why does it almost never hold fossils?", "living things can't be saved in melted rock", ["granite is too young", "fossils melt in the sun", "granite is soft"], "Fossils form in layers of mud and sand."],
      ["Long ago, thick sheets of ice covered all of New Hampshire. They were…", "glaciers", ["volcanoes", "coral reefs", "deserts"], "The Ice Age ended about 12,000 years ago."],
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
      id: "nh-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including New Hampshire's four seasons, its snowy winters and nor'easters, its colorful fall and the wild weather on top of Mount Washington.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Concord usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In New Hampshire, the leaves turn red, orange and yellow in…", "fall", ["summer", "winter", "early spring"], "Cooler days and longer nights change the leaves."],
      ["New Hampshire has warm summers and cold, snowy winters most years. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["A big storm that blows in from the ocean with strong winds from the northeast is called a…", "nor'easter", ["monsoon", "heat wave", "dust devil"], "It is named for the direction of its winds."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which is usually colder, the top of Mount Washington or a town in the valley below?", "the top of Mount Washington", ["the town in the valley", "they are always the same", "neither has winter"], "It gets colder the higher you go."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do New Hampshire families put snow tires on their cars in late fall?", "winters bring snow and ice", ["it is hot all year", "it never snows", "roads melt in winter"], "People plan for the climate where they live.", true],
    ],
  ),
];
