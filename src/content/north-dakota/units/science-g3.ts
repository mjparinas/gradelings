import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// North Dakota Grade 3 science: copies of California's fossil and weather-and-climate units without their California
// places, with North Dakota examples added (dinosaur fossils in the Badlands, petrified wood, glacier rocks, blizzards and
// thunderstorms).

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "nd-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the Triceratops and other dinosaur fossils found in southwestern North Dakota, the state fossil (petrified wood) and sea fossils from when an ocean covered the land.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Triceratops fossils have been found in the rocks of southwestern North Dakota. This shows that long ago…", "dinosaurs lived there", ["the land was always a city", "it was the bottom of a glacier", "dinosaurs still live there"], "Fossils are clues about life long ago."],
      ["North Dakota's state fossil is wood that slowly turned to stone, called…", "petrified wood", ["amber", "coal dust", "a seashell"], "Minerals filled in the wood over a very long time."],
      ["Fossils of sharks and sea reptiles are found in North Dakota rocks. This tells us the land was once…", "covered by a shallow sea", ["a desert of ice", "on the moon", "a volcano"], "Sea animals lived where the water was."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["A fossil leaf print shows us the… of a plant that lived long ago.", "shape", ["smell", "sound", "color of its flowers"], "The mud kept the leaf's outline."],
      ["Mammoth bones have been found in North Dakota. Mammoths were hairy animals that lived in the…", "Ice Age", ["time of the first cars", "present day", "deep ocean"], "Thick fur kept them warm."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Palm leaf fossils found in North Dakota tell us the climate there was once…", "much warmer", ["much colder", "exactly the same", "always snowy"], "Palms grow in warm places.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "nd-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including North Dakota's very cold winters and blizzards, hot summers, thunderstorms and spring floods.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Bismarck usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In North Dakota, the hottest days usually come in…", "summer", ["midwinter", "late fall", "early spring"], "July is usually the warmest month."],
      ["North Dakota has hot summers, very cold winters and little rain in many places. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["A winter storm with strong winds and blowing snow that makes it hard to see is a…", "blizzard", ["monsoon", "drought", "heat wave"], "Blowing snow can hide the road."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["In spring, rivers like the Red River can rise and spill over their banks because…", "lots of snow melts at once", ["the sun is cold", "fish move upstream", "the wind stops"], "Melting snow runs into the rivers."],
      ["Hot summer afternoons on the prairie often bring thunderstorms with lightning and…", "hail", ["snow drifts", "frost", "icebergs"], "Hail is balls of ice that fall in storms."],
      ["A town's average January temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["North Dakota is far from any ocean. Why does that give it colder winters than a place by the sea?", "land cools off faster than water does", ["oceans make snow", "the sun is farther away", "it is closer to the moon"], "Ocean water keeps coastal places milder.", true],
    ],
  ),
];
