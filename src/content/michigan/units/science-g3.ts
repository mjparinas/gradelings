import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Michigan Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with Michigan examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "mi-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the coral in Petoskey stones and the mastodons of the Ice Age.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["A Petoskey stone is a fossil of an ancient…", "coral", ["bird", "tree", "fish"], "Coral lived in a warm sea that covered Michigan."],
      ["Michigan's state fossil is the…", "mastodon", ["T. rex", "shark", "fern"], "It looked a bit like an elephant."],
      ["Coral fossils in Michigan rocks show the land was once…", "a warm, shallow sea", ["a frozen desert", "a high mountain", "a volcano"], "Coral grows in warm, shallow water."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Mastodon bones found in Michigan show it was once…", "much colder", ["a rainforest", "under lava", "a desert"], "Mastodons lived in the Ice Age."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Coral fossils far from any ocean tell us…", "the place was once a warm sea", ["coral can walk", "it was always dry land", "coral lives in deserts"], "Coral grows in warm, shallow seas.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "mi-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Michigan's warm summers, snowy winters and lake-effect snow.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Michigan usually get the most snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Michigan, thunderstorms happen most often in…", "summer", ["midwinter", "late fall", "never"], "Warm, damp air builds storms."],
      ["Michigan has warm summers and cold, snowy winters. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["Wind off Lake Michigan can bring extra snow called…", "lake-effect snow", ["desert snow", "sand snow", "ocean ice"], "Cold air picks up moisture from the lake."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which is colder on average, Marquette in the Upper Peninsula or Detroit in the south?", "Marquette", ["Detroit", "they are always the same", "neither has winter"], "Places farther north are usually colder."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do Michigan farmers plant in spring, not winter?", "the ground is frozen in winter", ["seeds need snow", "spring is darker", "there is no rain in spring"], "Crops need warm soil.", true],
    ],
  ),
];
