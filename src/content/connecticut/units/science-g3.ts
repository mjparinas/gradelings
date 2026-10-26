import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Connecticut Grade 3 science: copies of California's fossil and weather-and-climate units without their California
// places, with Connecticut examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "ct-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the dinosaur tracks found in Connecticut rocks.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Fossils of sea animals are found in rocks far from the sea. What does that tell us?", "a sea once covered the land", ["the sea is there now", "fish lived on mountains", "it rained fish"], "Fossils show past environments."],
      ["Dinosaur footprints at Dinosaur State Park in Rocky Hill are a kind of…", "fossil", ["bird", "flower", "tree"], "Fossils can be tracks, not just bones."],
      ["Dinosaur tracks pressed into mud in Connecticut show the land was once…", "muddy ground near lakes", ["a frozen desert", "the deep ocean", "a glacier"], "Footprints form in soft mud."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["A mastodon skeleton found in Connecticut shows the area was once…", "much colder", ["a rainforest", "under lava", "a desert"], "Mastodons lived in the Ice Age."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Coral fossils far from any ocean tell us…", "the place was once a warm sea", ["coral can walk", "it was always dry land", "coral lives in deserts"], "Coral grows in warm, shallow seas.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "ct-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Connecticut's warm summers, snowy winters and coastal storms.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Hartford usually get the most snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Connecticut, hurricanes are most likely in…", "late summer and early fall", ["midwinter", "early spring", "never"], "Hurricanes form over warm ocean water."],
      ["Connecticut has warm summers and cold, snowy winters. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["A strong winter storm with wind from the northeast is called a…", "nor'easter", ["desert storm", "sandstorm", "monsoon"], "It can bring heavy snow to New England."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which usually gets more snow, the hills of Norfolk or the shore at New Haven?", "the hills of Norfolk", ["the shore at New Haven", "they always get the same", "neither gets snow"], "Higher, inland places are colder."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do farmers in Connecticut plant corn in spring, not winter?", "the ground is frozen in winter", ["corn needs snow", "spring is darker", "there is no rain in spring"], "Crops need warm soil.", true],
    ],
  ),
];
