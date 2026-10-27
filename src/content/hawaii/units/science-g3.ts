import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Hawaiʻi Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with Hawaiʻi examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "hi-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the bones of flightless birds found in Hawaiʻi's lava tubes and sinkholes, and fossil coral reefs now above the sea.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Bones found in Hawaiʻi's caves show that big geese that could not fly once lived on the islands. These remains are…", "fossils", ["minerals", "seeds", "clouds"], "Fossils are the remains of things that lived long ago."],
      ["Fossil coral found on land above the sea on Oʻahu shows that the land was once…", "underwater", ["a glacier", "a desert", "a volcano top"], "Coral grows only in the sea."],
      ["Few dinosaur fossils are found in Hawaiʻi because the islands are…", "too young and made of lava", ["too cold", "too small to see", "covered in ice"], "The islands formed long after the dinosaurs."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Bird bones in a Kauaʻi sinkhole show that some birds that lived there long ago are now…", "extinct", ["much bigger", "living on the moon", "all fish"], "Many native birds have disappeared."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils found high above today's shoreline tell us…", "the sea level or the land has changed", ["sea animals can walk", "it was always dry land", "fish live in trees"], "Environments change over very long times.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "hi-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Hawaiʻi's warm tropical climate, its wetter winters and drier summers, rainy windward sides and dry leeward sides, and snow on the highest summits.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In Hawaiʻi, the wetter season, when more storms bring rain, is usually…", "winter", ["summer", "every day the same", "never"], "Hawaiians named two seasons: hoʻoilo and kau."],
      ["Hawaiʻi is warm all year. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["Hilo, on the windward side of Hawaiʻi Island, gets much more rain than Kona on the…", "leeward side", ["windward side", "ocean floor", "moon"], "Mountains block the rain clouds."],
      ["Snow sometimes falls in winter on the summit of…", "Maunakea", ["Waikīkī Beach", "Diamond Head", "Hanauma Bay"], "It is more than 13,000 feet high."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["The steady winds that cool Hawaiʻi most days are the…", "trade winds", ["monsoons", "blizzards", "tornadoes"], "They blow from the northeast."],
      ["A town's average August temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why is it cooler on Haleakalā's summit than at the beach?", "air is colder higher up", ["the summit is closer to the moon", "the beach has more snow", "it rains sand"], "Temperature drops as you go up.", true],
    ],
  ),
];
