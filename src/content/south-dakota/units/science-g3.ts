import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// South Dakota Grade 3 science: copies of California's fossil and weather-and-climate units without their California
// places, with South Dakota examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "sd-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the sea fossils and mammal fossils of the Badlands and the mammoths at the Mammoth Site in Hot Springs.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Fossils of sea animals are found in western South Dakota. This shows the land there was once…", "under a shallow sea", ["an ice sheet", "a volcano", "a city"], "Long ago a sea covered the middle of North America."],
      ["At the Mammoth Site in Hot Springs, scientists dig up the bones of…", "mammoths", ["whales", "sharks", "penguins"], "Mammoths were huge, hairy relatives of elephants."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["A fossil leaf print shows us the… of a plant that lived long ago.", "shape", ["smell", "sound", "color of its flowers"], "The mud kept the leaf's outline."],
      ["Fossils of old horses and camels are found in the Badlands. This shows those animals once…", "lived in South Dakota", ["lived only in the ocean", "could fly", "were plants"], "Fossils tell us who lived in a place."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils far from any ocean tell us…", "the place was once covered by sea", ["sea animals can walk", "it was always dry land", "fish live in deserts"], "Environments change over very long times.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "sd-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including South Dakota's four seasons, winter blizzards, summer thunderstorms and the tornadoes that sometimes cross the plains.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Sioux Falls usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In South Dakota, the hottest days usually come in…", "summer", ["midwinter", "late fall", "early spring"], "July is usually the warmest month."],
      ["South Dakota has hot summers, cold winters and big changes in weather. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["A winter storm with strong winds and blowing snow that makes it hard to see is a…", "blizzard", ["monsoon", "drought", "heat wave"], "Blizzards often sweep across the plains."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["In late spring and summer, a spinning column of wind that reaches down from a thunderstorm is a…", "tornado", ["blizzard", "hurricane", "sandstorm"], "Tornadoes form in strong thunderstorms."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why are summers in South Dakota hotter and winters colder than in a town on the ocean?", "it is far from the ocean, which keeps coasts milder", ["the sun is closer there", "it never rains there", "it has more trees"], "The ocean warms and cools slowly.", true],
    ],
  ),
];
