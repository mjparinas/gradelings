import type { Unit } from "../../types";
import { bankUnit } from "../own";

// North Carolina's own Grade 8 science unit: North Carolina's river basins, estuaries and safe drinking water.

export const SCIENCE_8: Unit[] = [
  bankUnit({
    id: "nc-g8-nc-water",
    title: "North Carolina's Water",
    emoji: "💧",
    blurb: "River basins, estuaries and safe drinking water.",
    parentNote:
      "Practices how Earth's water is distributed, North Carolina's 17 river basins and its large estuaries (the Albemarle–Pamlico Sound), and how scientists judge whether water is safe to drink (pH, dissolved oxygen, bacteria, sediment and chemicals such as PFAS in the Cape Fear River).",
    standards: ["ESS.8.2.1; ESS.8.3.1; ESS.8.3.2", "water distribution, river basins and estuaries, the safety of North Carolina's water, and monitoring water quality"],
    items: [
      ["Most of Earth's water is…", "salt water in the oceans", ["fresh water in lakes", "water vapor in clouds"], "About 97% is in the oceans."],
      ["Most of Earth's fresh water is frozen in…", "glaciers and ice caps", ["rivers", "puddles"], "Only a little is in lakes and rivers."],
      ["A river basin, or watershed, is…", "all the land that drains into one river", ["a bathtub", "the bottom of the ocean"], "Rain flows downhill to the river."],
      ["How many river basins does North Carolina have?", "17", ["2", "100"], "The Cape Fear and Neuse are two."],
      ["An estuary is a place where…", "fresh river water mixes with salty ocean water", ["only fresh water collects", "lava meets the sea"], "The water is brackish."],
      ["North Carolina's largest estuary system is the…", "Albemarle–Pamlico Sound", ["Gulf of Mexico", "Great Lakes"], "It is one of the largest in the nation."],
      ["Estuaries are important nurseries for…", "young fish, shrimp and crabs", ["mountain bears", "desert lizards"], "Calm, food-rich water protects them."],
      ["Water stored underground in rock and soil is…", "groundwater", ["runoff", "humidity"], "Wells pump it up."],
      ["An underground layer of rock that holds water is an…", "aquifer", ["estuary", "atmosphere"], "Much of the Coastal Plain uses aquifers."],
      ["Potable water is water that is…", "safe to drink", ["salty", "frozen"], "Treatment plants make water potable."],
      ["Dissolved oxygen is important in water because…", "fish and other animals need it to breathe", ["it makes water salty", "it colors the water"], "Low oxygen can cause fish kills."],
      ["E. coli bacteria in water are a sign of…", "pollution from human or animal waste", ["clean mountain springs", "too much oxygen"], "Swimming may be closed."],
      ["Water with a pH of 7 is…", "neutral", ["very acidic", "very basic"], "Most fish live near pH 6.5 to 8.", true],
      ["Turbidity measures…", "how cloudy the water is", ["how hot the water is", "how deep the water is"], "Sediment makes water cloudy.", true],
      ["PFAS chemicals found in the Cape Fear River are a concern because they…", "don't break down easily and may harm health", ["make water sweet", "come only from rain"], "They are called “forever chemicals.”", true],
      ["Too much fertilizer washing into a river can cause…", "algae blooms that use up oxygen", ["clearer water", "more fish right away"], "This is called eutrophication.", true],
      ["Runoff from hog and poultry farms is a water concern in eastern North Carolina because it can carry…", "nutrients and bacteria into rivers", ["only clean rainwater", "fresh snow"], "Heavy storms make it worse.", true],
      ["Why can heavy rain make water less safe for a few days?", "runoff carries soil, bacteria and chemicals into rivers", ["rain kills all bacteria", "rain makes water salty"], "Officials test water after storms.", true],
      ["Which river basins drain into the Albemarle–Pamlico Sound?", "the Chowan, Roanoke, Tar-Pamlico and Neuse", ["the French Broad and Little Tennessee", "the Mississippi and Ohio"], "Some begin in Virginia.", true],
      ["Rivers in western North Carolina, like the French Broad, flow…", "west toward the Mississippi River", ["east to the Atlantic", "north to Canada"], "They cross the Eastern Continental Divide.", true],
      ["Salinity in an estuary is usually…", "lowest near the river and highest near the ocean", ["the same everywhere", "highest near the river"], "Salt water comes from the sea.", true],
      ["A water sample with low dissolved oxygen, high bacteria and high turbidity is most likely…", "unsafe to drink without treatment", ["perfectly safe", "pure spring water"], "Look at all the factors.", true],
      ["Wetlands help water quality by…", "filtering pollutants and slowing floodwater", ["adding pollution", "speeding up floods"], "They act like sponges.", true],
      ["Saltwater intrusion into coastal wells happens when…", "too much groundwater is pumped or sea levels rise", ["it rains too much inland", "rivers freeze"], "Salty water moves into aquifers.", true],
      ["Why do water treatment plants add a small amount of chlorine?", "to kill harmful germs", ["to add flavor", "to make water salty"], "It disinfects drinking water.", true],
    ],
  }),
];
