import type { Unit } from "../../types";
import { SCIENCE_COPIES as CALIFORNIA_3 } from "../../california/units/science-g3";
import { SCIENCE_COPIES as CALIFORNIA_4 } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// West Virginia Grade 4 science: copies of California's fossil and earth-hazards units without their California
// places, with West Virginia examples added. West Virginia teaches fossils in Grade 4 with rock layers (S.4.10, S.4.11).

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(CALIFORNIA_3, "ca-g3-fossils"),
    {
      id: "wv-g4-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as West Virginia's state fossil, Jefferson's ground sloth, and the fern fossils in its coal country.",
      standards: ["S.4.11; S.4.10", "fossils as evidence of organisms and environments of long ago, and what rock layers and fossils show about landscape change"],
    },
    [
      ["Fossils of sea animals are found in rocks far from the sea. What does that tell us?", "a sea once covered the land", ["the sea is there now", "fish lived on mountains", "it rained fish"], "Fossils show past environments."],
      ["Bones of a giant ground sloth were found in a West Virginia cave long ago. The bones are a…", "fossil", ["bird", "flower", "tree"], "It is West Virginia's state fossil."],
      ["Jefferson's ground sloth is named after the president who wrote about its bones. Who was he?", "Thomas Jefferson", ["Abraham Lincoln", "George Washington", "John Adams"], "He was also a scientist."],
      ["Fern fossils in West Virginia's coal country show the land was once…", "a warm, swampy forest", ["a frozen desert", "the deep ocean", "a glacier"], "Coal formed from plants of ancient swamps."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["West Virginia's state gem is fossil coral. Coral fossils far from any ocean tell us…", "the place was once a warm sea", ["coral can walk", "it was always dry land", "coral lives in deserts"], "Coral grows in warm, shallow seas.", true],
    ],
  ),
  copyOf(
    from(CALIFORNIA_4, "ca-g4-earth-hazards"),
    {
      id: "wv-g4-earth-hazards",
      title: "Quakes, Floods & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and comparing ways to reduce harm from hazards such as the floods, landslides and winter storms West Virginia knows well.",
      standards: ["S.4.13; S.4.15", "patterns of Earth's features on maps, and comparing solutions to a problem such as reducing the harm of natural hazards"],
    },
    [
      ["A flood warning on the radio helps people near a river…", "move to high ground in time", ["stop the rain", "cool the air", "make the river smaller"], "Warnings save lives."],
      ["During a tornado warning, the safest place in a house is…", "a basement or inside room", ["next to a window", "on the roof", "in the car outside"], "Stay low and away from glass."],
      ["Floodwalls along the Ohio River in towns like Huntington and Parkersburg help…", "hold back flood water", ["make tornadoes", "start earthquakes", "melt snow"], "They were built after big floods in the 1930s."],
      ["Heavy rain soaking a steep hillside can cause a…", "landslide", ["volcano", "tsunami", "sandstorm"], "Wet soil can slide downhill."],
      ["Building on high ground away from a creek helps keep homes safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in West Virginia", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Wetlands along rivers can reduce flooding because they…", "soak up extra water", ["make more rain", "stop all rivers", "freeze in summer"], "Wetlands act like sponges.", true],
    ],
  ),
];
