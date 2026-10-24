import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Maryland Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with Maryland examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "md-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the shark teeth and sea shells found at Maryland's Calvert Cliffs.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Shark teeth are found in the Calvert Cliffs. What does that tell us?", "a sea once covered the land", ["sharks walked there", "it rained teeth", "the land was a desert"], "Fossils show past environments."],
      ["Maryland's state fossil, Ecphora, is a kind of…", "sea snail shell", ["bird", "flower", "tree"], "It lived in a warm sea long ago."],
      ["Maryland's state dinosaur is…", "Astrodon", ["Tyrannosaurus", "a woolly mammoth", "a saber-toothed cat"], "It was a huge, long-necked plant eater."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Fossil whale bones near the Bay show the area was once…", "under the ocean", ["a volcano", "a frozen desert", "outer space"], "Whales live in the sea."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Coral fossils far from any ocean tell us…", "the place was once a warm sea", ["coral can walk", "it was always dry land", "coral lives in deserts"], "Coral grows in warm, shallow seas.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "md-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Maryland's hot, humid summers, snowier western mountains and late-summer hurricanes.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Maryland usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["Hurricanes most often reach Maryland in…", "late summer and early fall", ["midwinter", "early spring", "never"], "Hurricanes form over warm ocean water."],
      ["Maryland has hot, humid summers and cool winters. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["Which part of Maryland usually gets the most snow?", "the western mountains", ["the Eastern Shore", "Ocean City", "Annapolis"], "Higher, colder places get more snow."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which is usually colder in January, Oakland in the mountains or Ocean City by the sea?", "Oakland", ["Ocean City", "they are always the same", "neither has winter"], "Mountains are colder; the ocean keeps the coast milder."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do Maryland farmers plant corn in spring, not winter?", "the ground is cold in winter", ["corn needs snow", "spring is darker", "there is no rain in spring"], "Crops need warm soil.", true],
    ],
  ),
];
