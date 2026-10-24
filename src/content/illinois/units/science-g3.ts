import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Illinois Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with Illinois examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "il-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the sea animals and coal-swamp plants found in Illinois rocks.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Fossils of sea animals are found in Illinois rocks. What does that tell us?", "a sea once covered the land", ["the sea is there now", "fish lived on mountains", "it rained fish"], "Fossils show past environments."],
      ["The Tully monster is Illinois's state…", "fossil", ["bird", "flower", "tree"], "It lived in shallow water long ago."],
      ["Fossil ferns in Illinois coal show the land was once a…", "warm swamp", ["frozen desert", "high mountain", "dry beach"], "Coal formed from swamp plants."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["A woolly mammoth tooth found in Illinois shows it was once…", "much colder", ["a rainforest", "under lava", "a desert"], "Mammoths lived in the Ice Age."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Coral fossils far from any ocean tell us…", "the place was once a warm sea", ["coral can walk", "it was always dry land", "coral lives in deserts"], "Coral grows in warm, shallow seas.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "il-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Illinois's hot summers, cold winters and spring storms.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Chicago usually get the most snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Illinois, tornadoes happen most often in…", "spring", ["midwinter", "late fall", "never"], "Warm and cold air meet in spring."],
      ["Illinois has hot summers and cold winters. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["Wind off Lake Michigan can bring extra snow called…", "lake-effect snow", ["desert snow", "sand snow", "ocean ice"], "Cold air picks up moisture from the lake."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which is colder on average, Rockford in the north or Cairo in the south?", "Rockford", ["Cairo", "they are always the same", "neither has winter"], "Places farther north are usually colder."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do farmers in Illinois plant corn in spring, not winter?", "the ground is frozen in winter", ["corn needs snow", "spring is darker", "there is no rain in spring"], "Crops need warm soil.", true],
    ],
  ),
];
