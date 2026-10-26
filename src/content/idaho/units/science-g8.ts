import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Idaho Grade 8 science: copies of California's weather, climate and growth units without their California places,
// with Idaho examples added (winter inversions in the Treasure Valley, mountain snow, Ice Age glaciers and Idaho
// potatoes).

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "id-g8-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and changing weather.",
      parentNote:
        "Practices how air masses move and meet at fronts and change the weather, with Idaho examples such as Pacific storms that bring mountain snow, cold fronts, and winter inversions that trap fog in the Treasure Valley.",
      standards: ["MS-ESS-2.5", "how the motions and meetings of air masses cause changes in weather"],
    },
    [
      ["Most of the winter storms that bring snow to Idaho's mountains come from the…", "Pacific Ocean", ["Sahara Desert", "Arctic ice cap", "Indian Ocean"], "Moist air comes from the ocean."],
      ["An air mass that forms over the frozen Arctic in winter is usually…", "cold and dry", ["warm and moist", "hot and humid", "salty"], "Air takes on the traits of where it forms."],
      ["When a cold front passes through Boise, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["As moist air rises over Idaho's mountains, it cools and…", "drops rain or snow", ["gets warmer", "turns into rock", "stops moving"], "Cool air holds less water vapor."],
      ["In winter, cold air can sit in the Treasure Valley under a layer of warmer air. This can trap…", "fog and smoggy air for days", ["a tornado", "a heat wave", "an earthquake"], "This is called an inversion."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Air that has crossed a mountain range and dropped its moisture leaves the land beyond…", "drier, in a rain shadow", ["wetter than the mountains", "covered in fog every day", "under a glacier"], "The air has little water left.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "id-g8-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, height above sea level, mountains and winds shape regional climate, how Earth's climate has changed over its history, such as the Ice Age glaciers in Idaho's mountains, and the causes of rising global temperatures.",
      standards: ["MS-ESS-2.6; MS-ESS-3.5", "what shapes regional climate, and the factors that change climate over Earth's history"],
    },
    [
      ["Why are Idaho's mountain tops colder than the valleys below them?", "air is colder at higher elevations", ["mountains are closer to the moon", "valleys get less sunlight", "snow makes heat"], "Temperature drops as you go higher."],
      ["Much of southern Idaho gets little rain partly because mountains to the west…", "catch the moisture before the air arrives", ["block all sunlight", "make the air wetter", "send ocean water inland"], "Air drops rain as it rises over mountains."],
      ["Ice Age glaciers once covered Idaho's high mountains. This shows Earth's climate…", "has changed over long periods of time", ["has never changed", "changes only on weekends", "is the same everywhere"], "Climate varies over Earth's history."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["As the climate warms, more of the winter precipitation in Idaho's mountains may fall as…", "rain instead of snow", ["sand instead of snow", "hail all year", "fog only"], "Warmer air means less snow.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "id-g8-growth",
      title: "Growing & Reproducing",
      emoji: "🥔",
      blurb: "Flowers, genes, potatoes and copies of parents.",
      parentNote:
        "Practices asexual versus sexual reproduction and what affects how living things grow, with Idaho examples like potatoes grown from seed pieces, dairy calves and pollinated flowers.",
      standards: ["MS-LS-3.2", "asexual reproduction makes identical offspring, and sexual reproduction makes offspring with genetic variation"],
    },
    [
      ["Idaho farmers plant pieces of potato, and each piece grows into a plant just like its parent. This is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["Bees moving pollen between flowers helps the flowers…", "make seeds", ["stay warm", "grow roots", "hide from deer"], "Pollination leads to seeds."],
      ["A calf on an Idaho dairy farm looks a bit different from both its parents because…", "it got a mix of genes from two parents", ["it has no genes", "it is a copy of one parent", "it chose its own traits"], "Sexual reproduction mixes genes."],
      ["Plants grown from pieces of one potato all have…", "the same genetic information", ["different genes from each other", "no genes", "genes from many parents"], "Asexual reproduction makes identical offspring."],
      ["A disease can spread through a whole field grown from pieces of one potato because…", "all the plants have the same genes, so none resist it", ["potatoes have no genes", "the field is too small", "diseases only harm wild plants"], "Genetic variation helps some survive.", true],
      ["Why do farmers plant seeds from plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
