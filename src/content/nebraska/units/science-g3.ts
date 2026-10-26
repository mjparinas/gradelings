import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Nebraska Grade 3 science: copies of California's fossil and weather-and-climate units without their California
// places, with Nebraska examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "neb-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the mammoths, rhinos and ancient sea life found in Nebraska's rocks.",
      standards: ["SC.3.7.2.b", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Nebraska's state fossil is the…", "mammoth", ["Tyrannosaurus", "shark", "trilobite"], "Mammoths were giant relatives of elephants."],
      ["At Ashfall Fossil Beds, rhinos and horses were buried long ago by…", "ash from a faraway volcano", ["snow", "ocean waves", "sand from the beach"], "The ash fell like a thick gray blanket."],
      ["Fossils of sea animals in Nebraska rocks show the land was once…", "under a shallow sea", ["a frozen desert", "a rainforest canopy", "a volcano"], "Sea animals lived where cornfields are now."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Mammoth fossils in Nebraska show that long ago, the land had…", "grasslands where giant animals grazed", ["no plants at all", "only ocean", "a city"], "Mammoths ate grass."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils far from any ocean tell us…", "the place was once covered by sea", ["sea animals can walk", "it was always dry land", "fish live in deserts"], "Environments change over very long times.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "neb-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Nebraska's hot summers, cold winters, spring storms and a west that gets less rain than the east.",
      standards: ["SC.3.12.4.a; SC.3.12.4.b", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Nebraska usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Nebraska, the hottest days usually come in…", "summer", ["midwinter", "late fall", "early spring"], "July is often near 90 degrees or more."],
      ["The Nebraska Panhandle gets less rain than eastern Nebraska most years. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["In Nebraska, thunderstorms and tornadoes happen most often in…", "spring and early summer", ["midwinter", "only in fall", "never"], "Warm, wet air meets cooler, dry air then."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which usually gets more rain in a year, Omaha in the east or Scottsbluff in the west?", "Omaha", ["Scottsbluff", "they always get the same", "neither gets rain"], "Rain in Nebraska drops off from east to west."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do many farmers in western Nebraska water their crops?", "the climate is dry", ["crops need snow", "it rains every day", "the soil is frozen"], "Crops need more water than the rain gives there.", true],
    ],
  ),
];
