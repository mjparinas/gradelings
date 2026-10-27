import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Montana Grade 3 science: copies of California's fossil and weather-and-climate units without their California
// places, with Montana examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "mt-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the dinosaur bones, nests and eggs found in Montana rocks.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Fossils of sea animals are found in rocks far from the sea. What does that tell us?", "a sea once covered the land", ["the sea is there now", "fish lived on mountains", "it rained fish"], "Fossils show past environments."],
      ["Dinosaur nests and eggs found at Egg Mountain near Choteau are a kind of…", "fossil", ["bird", "flower", "tree"], "Fossils can be nests, eggs and tracks, not just bones."],
      ["Montana's state fossil is a duck-billed dinosaur that nested in groups. It is…", "Maiasaura", ["a woolly mammoth", "a shark tooth", "a sea star"], "Its name means good mother lizard."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["A mammoth skeleton found in Montana shows the area was once…", "much colder", ["a rainforest", "under lava", "a desert"], "Mammoths lived in the Ice Age."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Coral fossils far from any ocean tell us…", "the place was once a warm sea", ["coral can walk", "it was always dry land", "coral lives in deserts"], "Coral grows in warm, shallow seas.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "mt-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Montana's warm summers, snowy winters and chinook winds.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Helena usually get the most snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Montana, thunderstorms are most likely on…", "hot summer afternoons", ["cold winter nights", "snowy January mornings", "never"], "Warm, rising air builds storm clouds."],
      ["Montana has warm summers and cold, snowy winters. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["A warm, dry wind that rushes down the mountains and melts snow fast is a…", "chinook", ["hurricane", "monsoon", "sea breeze"], "Chinooks can warm Montana towns in hours."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which usually gets more snow, a mountain pass or a low valley town?", "a mountain pass", ["a low valley town", "they always get the same", "neither gets snow"], "Higher places are colder."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do Montana farmers plant spring wheat in spring, not winter?", "the ground is frozen in winter", ["wheat needs snow on top", "spring is darker", "there is no rain in spring"], "Crops need soil that has thawed.", true],
    ],
  ),
];
