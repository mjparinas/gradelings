import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Kansas Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with Kansas examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "ks-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the sea reptiles and flying reptiles found in the chalk of western Kansas.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Kansas has a state marine fossil, the Tylosaurus, a giant reptile that swam in an ancient…", "sea", ["desert", "volcano", "glacier"], "A shallow sea once covered Kansas."],
      ["Sea fossils in the chalk of western Kansas show the land was once…", "under the sea", ["a frozen desert", "a rainforest canopy", "a volcano"], "Sea animals lived where wheat fields are now."],
      ["Pteranodon, the Kansas state flying fossil, was a reptile that…", "flew over the ancient sea", ["dug tunnels", "lived in trees", "swam in rivers"], "Its long wings held it up in the air."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Monument Rocks in western Kansas are made of chalk, which formed from tiny…", "sea creatures' shells", ["tree leaves", "volcano ash", "ice crystals"], "The shells piled up on the sea floor."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils far from any ocean tell us…", "the place was once covered by sea", ["sea animals can walk", "it was always dry land", "fish live in deserts"], "Environments change over very long times.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "ks-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Kansas's hot summers, cold winters, spring storms and a west that gets less rain than the east.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Kansas usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Kansas, the hottest days usually come in…", "summer", ["midwinter", "late fall", "early spring"], "July is often over 90 degrees."],
      ["Western Kansas gets less rain than eastern Kansas most years. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["In Kansas, thunderstorms and tornadoes happen most often in…", "spring and early summer", ["midwinter", "only in fall", "never"], "Warm, wet air meets cooler, dry air then."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which usually gets more rain in a year, Pittsburg in the east or Garden City in the west?", "Pittsburg", ["Garden City", "they always get the same", "neither gets rain"], "Rain in Kansas drops off from east to west."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do many farmers in western Kansas water their crops?", "the climate is dry", ["crops need snow", "it rains every day", "the soil is frozen"], "Crops need more water than the rain gives there.", true],
    ],
  ),
];
