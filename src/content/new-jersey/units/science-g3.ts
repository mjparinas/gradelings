import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// New Jersey Grade 3 science: copies of California's fossil and weather-and-climate units without their California
// places, with New Jersey examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "nj-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the shark teeth, sea shells and dinosaur bones found in New Jersey.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Fossil shark teeth are found in New Jersey streams. What does that tell us?", "a sea once covered the land", ["the sea is there now", "fish lived on mountains", "it rained fish"], "Fossils show past environments."],
      ["Hadrosaurus, found in Haddonfield, is New Jersey's state…", "dinosaur", ["bird", "flower", "tree"], "Its bones were dug up in 1858."],
      ["Dinosaur footprints in New Jersey rock show that long ago…", "dinosaurs walked there", ["it was always a city", "fish lived on mountains", "no animals lived there"], "Footprints in mud can harden into rock."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Mastodon bones found in northern New Jersey show it was once…", "much colder", ["a rainforest", "under lava", "a desert"], "Mastodons lived in the Ice Age."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Coral fossils far from any ocean tell us…", "the place was once a warm sea", ["coral can walk", "it was always dry land", "coral lives in deserts"], "Coral grows in warm, shallow seas.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "nj-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including New Jersey's hot summers, cold winters and storms from the ocean.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Newark usually get the most snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["Hurricanes most often reach New Jersey in…", "late summer and fall", ["midwinter", "early spring", "never"], "Warm ocean water feeds hurricanes."],
      ["New Jersey has hot summers and cold winters. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["A strong winter storm that blows in from the northeast along the coast is called a…", "nor'easter", ["desert storm", "sandstorm", "monsoon"], "Its winds come from the northeast."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which is colder on average, High Point in the north or Cape May in the south?", "High Point", ["Cape May", "they are always the same", "neither has winter"], "Places farther north and higher up are usually colder."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do farmers in New Jersey plant tomatoes in spring, not winter?", "the ground is frozen in winter", ["corn needs snow", "spring is darker", "there is no rain in spring"], "Crops need warm soil.", true],
    ],
  ),
];
