import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Washington, DC Grade 3 science: copies of California's fossil and weather-and-climate units without their California
// places, with DC examples added (the dinosaur bone dug up on Capitol Hill in 1898, the dinosaur halls of the National
// Museum of Natural History, DC's hot, humid summers, cherry blossoms and winter snowstorms).

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "dc-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, with a Washington, DC example: the dinosaur bone workers dug up near First and F Streets SE in 1898, which gave the District its official dinosaur, Capitalsaurus.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["In 1898, workers digging a sewer on Capitol Hill found a bone from a…", "dinosaur", ["whale", "camel", "car"], "The District later named it Capitalsaurus."],
      ["A dinosaur bone under a city street tells us that long ago dinosaurs…", "lived where DC is now", ["drove cars", "lived on the moon", "never lived anywhere"], "Fossils show who lived in a place."],
      ["At the National Museum of Natural History, people can see fossil…", "dinosaur skeletons", ["cell phones", "toy trains", "paintings of today"], "Fossils help scientists rebuild animals of long ago."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Fish fossils in a dry valley tell us the valley once held a…", "lake", ["volcano", "glacier", "city"], "Lakes filled some valleys long ago."],
      ["Granite formed from melted rock deep underground. Why does it almost never hold fossils?", "living things can't be saved in melted rock", ["granite is too young", "fossils melt in the sun", "granite is soft"], "Fossils form in layers of mud and sand.", true],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils far from any ocean tell us…", "the place was once covered by sea", ["sea animals can walk", "it was always dry land", "fish live in deserts"], "Environments change over very long times.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "dc-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Washington, DC's four seasons: hot, humid summers with thunderstorms, cherry blossoms in spring, colorful fall leaves and winters with some snow.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Washington, DC usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["Washington, DC's cherry trees usually bloom in…", "spring", ["summer", "fall", "winter"], "Warmer days in March and April open the blossoms."],
      ["Washington, DC has hot, humid summers and fairly cool winters most years. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["On hot, sticky summer afternoons in DC, the weather often brings…", "thunderstorms", ["blizzards", "sandstorms", "frost"], "Warm, moist air rises and forms storm clouds."],
      ["In Washington, DC, the leaves turn red, orange and yellow in…", "fall", ["summer", "winter", "early spring"], "Cooler days and longer nights change the leaves."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["A thermometer outside a DC school reads 95°F in July. That is a measure of…", "temperature", ["rainfall", "wind direction", "snow depth"], "Thermometers measure how hot or cold it is."],
      ["A city's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do DC schools and families plan for snow days, even though big snowstorms don't come every winter?", "some winters bring heavy snow", ["it snows every day", "it never snows", "snow falls in July"], "People plan for the climate where they live.", true],
    ],
  ),
];
