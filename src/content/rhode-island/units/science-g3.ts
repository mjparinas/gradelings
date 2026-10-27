import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Rhode Island Grade 3 science: copies of California's fossil and weather-and-climate units without their California
// places, with Rhode Island examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "ri-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the fern and tree fossils found in Rhode Island's ancient coal-swamp rocks and the boulders left behind by Ice Age glaciers.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Fossil ferns found in rocks near Narragansett Bay show the land was once a warm…", "swamp forest", ["ice sheet", "desert", "coral reef"], "Ferns grow in warm, wet places."],
      ["Long ago, giant sheets of ice called glaciers covered Rhode Island. When they melted, they left behind…", "rocks and boulders", ["palm trees", "volcanoes", "coral"], "Glaciers carry rocks and drop them when they melt."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["A fossil leaf print shows us the… of a plant that lived long ago.", "shape", ["smell", "sound", "color of its flowers"], "The mud kept the leaf's outline."],
      ["Mammoth teeth have been found on the sea floor off New England. This shows the land there was once…", "dry land above the sea", ["a rainforest", "under lava", "a coral reef"], "Sea level was much lower in the Ice Age."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils far from any ocean tell us…", "the place was once covered by sea", ["sea animals can walk", "it was always dry land", "fish live in deserts"], "Environments change over very long times.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "ri-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Rhode Island's four seasons, snowy nor'easters, summer sea breezes and the hurricanes that sometimes reach New England.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Providence usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Rhode Island, the hottest days usually come in…", "summer", ["midwinter", "late fall", "early spring"], "July is usually the warmest month."],
      ["Rhode Island has warm summers, cold winters and rain or snow all year. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["A big winter storm with strong winds from the northeast and lots of snow is called a…", "nor'easter", ["monsoon", "drought", "heat wave"], "The wind blows in from the northeast, off the ocean."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["In late summer and early fall, Rhode Island sometimes gets a strong storm from the tropics called a…", "hurricane", ["blizzard", "dust storm", "sandstorm"], "Hurricanes form over warm ocean water."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["On a hot summer day, why is it often cooler at the beach in Narragansett than inland?", "a breeze blows in off the cooler ocean", ["the sand is cold", "the sun is weaker there", "it always rains there"], "The ocean warms up more slowly than land.", true],
    ],
  ),
];
