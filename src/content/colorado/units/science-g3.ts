import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Colorado Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with Colorado examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "co-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the dinosaurs, sea animals and fossil insects found in Colorado rocks.",
      standards: ["LS2.3.4.a", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Fossils of sea animals are found in Colorado rocks. What does that tell us?", "a sea once covered the land", ["the sea is there now", "fish lived on mountains", "it rained fish"], "Fossils show past environments."],
      ["The Stegosaurus is Colorado's state…", "fossil", ["bird", "flower", "tree"], "Its bones were found in Colorado rocks."],
      ["At Florissant, fossil tree stumps and insects show the land was once…", "a forest beside a lake", ["a frozen desert", "the bottom of an ocean", "a dry beach"], "Ash from volcanoes buried the forest."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Mammoth bones found near Snowmass show Colorado was once…", "much colder", ["a rainforest", "under lava", "a desert"], "Mammoths lived in the Ice Age."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Coral fossils far from any ocean tell us…", "the place was once a warm sea", ["coral can walk", "it was always dry land", "coral lives in deserts"], "Coral grows in warm, shallow seas.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "co-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Colorado's sunny days, summer thunderstorms and spring snowstorms.",
      standards: ["ESS3.3.3.a; ESS3.3.3.b", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In the mountains of Colorado, the most snow usually falls in…", "winter and spring", ["midsummer", "only in August", "never"], "Snow falls when it is below freezing."],
      ["On summer afternoons in Colorado, storms often bring thunder and…", "hail", ["hurricanes", "sandstorms only", "blizzards"], "Hailstones are balls of ice."],
      ["Colorado is dry and sunny on most days of the year. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["Places high in the mountains are usually… than places on the plains.", "colder", ["hotter", "wetter with rain only", "the same"], "Air gets cooler as you go higher."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which is colder on average, Leadville high in the mountains or Grand Junction in a low valley?", "Leadville", ["Grand Junction", "they are always the same", "neither has winter"], "Higher places are usually colder."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do farmers on Colorado's plains plant corn in spring, not winter?", "the ground is frozen in winter", ["corn needs snow", "spring is darker", "there is no rain in spring"], "Crops need warm soil.", true],
    ],
  ),
];
