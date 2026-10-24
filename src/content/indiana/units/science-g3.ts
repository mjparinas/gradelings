import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Indiana Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with Indiana examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "in-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the coral fossils at the Falls of the Ohio and the mastodon bones found in Indiana.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Coral fossils cover the rocks at the Falls of the Ohio. What does that tell us?", "a warm sea once covered the land", ["the sea is there now", "coral lives in rivers today", "it rained coral"], "Coral grows in warm, shallow seas."],
      ["Indiana limestone is full of tiny shells. The shells came from…", "sea animals that lived long ago", ["birds", "people", "trees"], "Shells piled up on an ancient sea floor."],
      ["Fossil ferns in Indiana coal show the land was once a…", "warm swamp", ["frozen desert", "high mountain", "dry beach"], "Coal formed from swamp plants."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Mastodon bones dug up in Indiana show that long ago it was…", "much colder", ["a rainforest", "under lava", "a desert"], "Mastodons lived near the end of the Ice Age."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Fish fossils found far from any ocean tell us…", "the place was once under water", ["fish can walk", "it was always dry land", "fish live in rocks"], "Fossils show past environments.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "in-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Indiana's hot summers, cold winters and spring storms.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does South Bend usually get the most snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Indiana, tornadoes happen most often in…", "spring", ["midwinter", "late fall", "never"], "Warm and cold air meet in spring."],
      ["Indiana has hot summers and cold winters. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["Wind off Lake Michigan can bring extra snow to northern Indiana called…", "lake-effect snow", ["desert snow", "sand snow", "ocean ice"], "Cold air picks up moisture from the lake."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which is colder on average, South Bend in the north or Evansville in the south?", "South Bend", ["Evansville", "they are always the same", "neither has winter"], "Places farther north are usually colder."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do Indiana farmers plant corn in spring, not winter?", "the ground is frozen in winter", ["corn needs snow", "spring is darker", "there is no rain in spring"], "Crops need warm soil.", true],
    ],
  ),
];
