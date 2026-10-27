import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Hawaiʻi Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Hawaiʻi examples added (coral reefs, rain forests, the alpine summits, sandy shores and streams, volcanoes,
// valleys and bays).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "hi-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Reefs, rain forests, shores and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Hawaiʻi's coral reefs, rain forests, sandy shores and high mountain slopes to deserts and the Arctic.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Parrotfish, sea turtles and colorful corals live on a…", "coral reef", ["sand dune", "mountain top", "glacier"], "Reefs grow in warm, shallow ocean water."],
      ["The ʻōhiʻa lehua tree with red flowers and the ʻapapane bird live in Hawaiʻi's…", "rain forests", ["coral reefs", "deserts", "ice caps"], "These forests are wet and green."],
      ["Ghost crabs dig holes in the sand on the…", "beach", ["mountain top", "rain forest canopy", "lava tube"], "They come out at night."],
      ["The silversword, a silvery plant with sharp leaves, grows high on Haleakalā where it is…", "dry, sunny and cold at night", ["underwater", "hot and swampy", "dark all the time"], "Only tough plants live up there."],
      ["Which animal is built for life in the ocean?", "the green sea turtle", ["the nēnē", "the pueo owl", "the honeybee"], "Its flippers are made for swimming."],
      ["ʻOʻopu, small fish that can climb waterfalls, live in Hawaiʻi's…", "streams", ["deserts", "coral reefs only", "volcano craters"], "They hold on with a sucker on their belly."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rain forest or coral reef", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why does the windward side of an island have more plants than the leeward side?", "it gets more rain", ["it gets less sun", "it has more sand", "it is always night"], "Plants need water.", true],
      ["Hawaiian monk seals rest on beaches and hunt in the…", "ocean", ["rain forest", "mountains", "streams"], "They are found only in Hawaiʻi.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "hi-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Islands, volcanoes, valleys, bays and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Hawaiʻi places like its volcanoes and valleys, its streams and waterfalls, and the bays and ocean around the islands.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Land with water all around it, like Oʻahu or Maui, is an…", "island", ["ocean", "river", "valley"], "Hawaiʻi is made of islands."],
      ["A mountain that can send out lava, like Kīlauea, is a…", "volcano", ["valley", "lake", "river"], "Lava comes from deep inside the Earth."],
      ["Low land between mountains, like Waipiʻo on Hawaiʻi Island, is a…", "valley", ["peak", "island", "lake"], "Streams often flow through valleys."],
      ["Fresh water flowing down from the mountains to the ocean in a narrow channel is a…", "stream", ["glacier", "bay", "volcano"], "Hawaiʻi has many streams on its wet sides."],
      ["Part of the ocean that curves into the land, like Hanauma Bay, is a…", "bay", ["mountain", "valley", "desert"], "Bays have calmer water."],
      ["Water falling over a steep cliff is a…", "waterfall", ["lake", "volcano", "beach"], "ʻAkaka Falls is one."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["On a map of Hawaiʻi, the islands are surrounded by the…", "Pacific Ocean", ["Atlantic Ocean", "Arctic Ocean", "Indian Ocean"], "It is the biggest ocean.", true],
    ],
  ),
];
