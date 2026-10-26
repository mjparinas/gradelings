import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Iowa Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with Iowa examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "ia-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the coral and shell fossils from the warm seas that once covered Iowa and the mammoths of the Ice Age.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Coral and shell fossils found in Iowa rock show the land was once…", "under a warm, shallow sea", ["a frozen desert", "a volcano", "a mountain top"], "Sea animals lived where farms are now."],
      ["After a big flood in 1993, water washed away soil near Coralville Lake and uncovered…", "fossils of an ancient sea floor", ["dinosaur eggs", "a buried city", "gold coins"], "It is called the Devonian Fossil Gorge."],
      ["Mammoth bones found in Iowa show the land was once…", "colder, during the Ice Age", ["a rainforest", "under lava", "the bottom of a deep ocean"], "Mammoths had thick fur for the cold."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Crinoids are sea animals shaped like flowers on a stem. Finding them in Iowa rock tells us…", "a sea was there long ago", ["flowers grew in the ocean today", "Iowa is under water now", "crinoids live on farms"], "Iowa has some of the best crinoid fossils in the world."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils far from any ocean tell us…", "the place was once covered by sea", ["sea animals can walk", "it was always dry land", "fish live in deserts"], "Environments change over very long times.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "ia-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Iowa's four seasons, with hot, humid summers and cold, snowy winters.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Des Moines usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Iowa, the hottest days usually come in…", "summer", ["midwinter", "late fall", "early spring"], "July is often hot and humid."],
      ["Iowa has hot summers, cold winters and four clear seasons. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["In Iowa, thunderstorms and tornadoes happen most often in…", "spring and summer", ["the middle of winter", "only in December", "never"], "Warm, moist air helps storms grow."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which usually has colder winters, northern Iowa or southern Iowa?", "northern Iowa", ["southern Iowa", "they are always the same", "neither has winter"], "Places farther north are usually colder."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do Iowa farmers plant corn in spring and harvest it in fall?", "corn needs the warm months to grow", ["corn grows best in snow", "it rains only in winter", "the soil is frozen in summer"], "Crops fit the climate's seasons.", true],
    ],
  ),
];
