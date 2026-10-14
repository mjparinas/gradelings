import type { Unit } from "../../types";
import { SCIENCE_9 as texasScience9 } from "../../texas/units/science-9";
import { SCIENCE_9 as washingtonScience9 } from "../../washington/units/science-9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Alabama Biology (BIO.9): Alabama's biodiversity and the ecosystem services it gives the state.
const BIODIVERSITY: Q[] = [
  ["Alabama has more kinds of freshwater fish, mussels, snails and crayfish than almost any other state. What helps explain this?", "Many rivers and streams, a warm climate and no glaciers in the past", ["Alabama has no rivers", "All its species were brought by people", "It is covered in ice for part of the year"], "Think about water, climate and history."],
  ["The Mobile-Tensaw Delta, a huge area of rivers and swamps, is sometimes nicknamed…", "America's Amazon", ["the Grand Canyon of the South", "the Great Desert", "the Arctic of Alabama"], "It is compared with a famous rainforest river."],
  ["Wetlands in the Mobile-Tensaw Delta soak up floodwater. This ecosystem service is…", "flood control", ["making coal", "making rock", "producing oil"], "Wetlands act like sponges."],
  ["Freshwater mussels in Alabama's rivers help people by…", "filtering the water as they feed", ["eating all the fish", "making the river saltier", "blocking the current"], "Mussels pump water through their gills."],
  ["Oysters in Mobile Bay give people food and also…", "filter the water", ["make the water warmer", "make sand", "stop the tides"], "Oyster reefs clean the water they live in."],
  ["The longleaf pine is Alabama's state tree. Longleaf pine forests stay healthy when they have…", "regular low fires", ["no sunlight", "flooding all year", "a thick layer of ice"], "Fire clears out plants that would crowd the pines."],
  ["Forests cover about two-thirds of Alabama. One ecosystem service they give is…", "wood and storing carbon", ["making the soil salty", "raising sea level", "creating fossil fuels this year"], "Trees grow wood and take in carbon dioxide."],
  ["Bees and other pollinators help Alabama farms by…", "carrying pollen so crops make fruit and seeds", ["eating the crops", "keeping rain away", "making soil out of rock"], "Many crops need pollen moved between flowers."],
  ["Fishing, hunting, birdwatching and paddling on Alabama's rivers are examples of…", "cultural ecosystem services", ["genetic mutations", "nonliving factors", "fossil fuels"], "These are benefits for recreation and enjoyment."],
  ["Salt marshes along Alabama's coast help protect homes because they…", "slow down storm waves and surge", ["make hurricanes stronger", "raise the sea level", "stop all rain"], "Marsh plants break up waves."],
  ["The Alabama red-bellied turtle is the state reptile. It lives mainly in…", "the Mobile-Tensaw Delta and nearby waters", ["the deserts of Alabama", "mountain snowfields", "the open ocean far from land"], "It is a freshwater turtle of the delta."],
  ["The Cahaba lily grows in rocky, fast-flowing shoals. If a dam turned its river into a still lake, the lily would most likely…", "lose its habitat", ["grow faster", "move to the desert", "become a tree"], "It needs moving water over rocks."],
  ["Many snail and mussel species in some Alabama rivers disappeared after dams were built. This shows that…", "changing a habitat can lead to extinction", ["dams always add species", "snails prefer still lakes", "species never depend on habitat"], "These animals needed fast, flowing water."],
  ["Kudzu is a vine from Asia that grows over trees across the South. It is an example of…", "an invasive species", ["a native keystone species", "a decomposer", "a fossil"], "It came from somewhere else and spreads fast."],
  ["Why can an invasive species reduce biodiversity?", "It can crowd out or eat native species", ["It always adds new food for everyone", "It cleans the water", "It makes native species grow faster"], "Natives may not be able to compete."],
  ["Red-cockaded woodpeckers carve nest holes in living old pines. Cutting down old pine forests would…", "remove the woodpeckers' nesting habitat", ["give them more nests", "have no effect", "turn them into ducks"], "They need big, living pines."],
  ["Which statement best describes biodiversity?", "The variety of species, genes and ecosystems in an area", ["The number of people in a state", "The total weight of the rocks", "Only the number of trees"], "Bio means life; diversity means variety."],
  ["A river with many kinds of fish and mussels is hit by a drought. Compared with a river with few species, it will likely…", "recover better, because some species can handle the change", ["recover worse, because more species is always weaker", "never change", "turn into an ocean"], "Variety gives an ecosystem more ways to cope.", true],
  ["Alabama's caves are home to rare animals such as the Alabama cavefish, which lives in only one cave. This makes the species…", "very easy to lose if that cave is harmed", ["impossible to harm", "common everywhere", "a plant"], "A tiny range means one threat can wipe it out.", true],
  ["Decomposers in Alabama's forest soils provide which supporting service?", "Recycling nutrients back into the soil", ["Making sunlight", "Stopping the water cycle", "Producing oxygen from rocks"], "They break down dead leaves and wood.", true],
  ["Clean rivers supply drinking water to Alabama cities. Protecting the forests and wetlands upstream helps because they…", "filter pollutants before the water reaches the city", ["make the river saltier", "add more sediment", "warm the water for drinking"], "Plants and soil trap pollution.", true],
  ["A county plans to drain a wetland to build homes. Which ecosystem service would most likely be lost?", "Natural flood control and water filtering", ["Coal formation", "Earthquake protection", "Making new rock"], "Think about what wetlands do with water.", true],
  ["Prescribed burns in longleaf pine forests are an example of…", "managing an ecosystem to keep it healthy", ["an invasive species", "a chemical reaction in cells", "a density-independent birth"], "People set careful fires on purpose.", true],
  ["Commercial fishing for shrimp and oysters in Alabama's coastal waters is an example of a…", "provisioning ecosystem service", ["regulating service only", "nonliving factor", "genetic drift"], "Provisioning services give us goods such as food.", true],
  ["Why do scientists say Alabama's biodiversity has value for the future?", "Species can provide food, medicines and ecosystem services we may need", ["Species never change", "Biodiversity has no effect on people", "Only one species matters in each ecosystem"], "Losing species can mean losing options.", true],
];

/** Alabama's own Grade 9 science units (`al-` ids). */
export const UNITS: Unit[] = [
  bankUnit({
    id: "al-g9-alabama-biodiversity",
    title: "Alabama's Biodiversity",
    emoji: "🐢",
    blurb: "Alabama's rivers, delta, forests and coast, and the services their living things give us.",
    parentNote: "Your child explains how Alabama's many species, from river mussels to longleaf pine forests, give the state ecosystem services such as clean water, flood control, food and recreation.",
    standards: ["BIO.9", "how the biodiversity of Alabama contributes to ecosystem services in the state"],
    items: BIODIVERSITY,
  }),
  copyOf(
    from(washingtonScience9, "wa-g9-ecosystems"),
    {
      id: "al-g9-populations",
      title: "Populations & Stability",
      emoji: "📈",
      blurb: "Limiting factors, carrying capacity, succession and how ecosystems recover.",
      parentNote: "Your child explains how density-dependent and density-independent factors affect population growth and why some ecosystems recover well after a disturbance.",
      standards: ["BIO.6; BIO.8", "interactions among organisms, populations and communities, and factors that limit population growth"],
    },
    [
      ["Disease spreads faster when a population is crowded. Disease is a…", "density-dependent factor", ["density-independent factor", "nonliving factor only", "producer"], "Its effect grows as the population gets denser."],
      ["A hurricane destroys part of a coastal forest whatever the number of animals living there. The hurricane is a…", "density-independent factor", ["density-dependent factor", "keystone species", "decomposer"], "Its effect doesn't depend on crowding."],
      ["After a wildfire, grasses grow first, then shrubs, then trees. This is…", "secondary succession", ["primary succession", "extinction", "mutation"], "Soil was still there after the fire."],
      ["Competition for food gets stronger as a population grows. Competition is a…", "density-dependent factor", ["density-independent factor", "type of weather", "producer"], "More individuals means more competition.", true],
    ],
  ),
  copyOf(
    from(texasScience9, "tx-b-ecosystems"),
    {
      id: "al-g9-ecosystem-stability",
      title: "Ecosystem Stability",
      emoji: "🌲",
      blurb: "Relationships among organisms, succession, and how ecosystems recover from disturbance.",
      parentNote: "Your child explains how the relationships in an ecosystem and ecological succession make it resilient and help it recover after a disturbance.",
      standards: ["BIO.6; BIO.10", "interactions among organisms in an ecosystem, and succession and recovery from disturbance"],
    },
    [
      ["After a hurricane flattens part of a coastal pine forest, grasses and shrubs return first, then young pines. This is…", "secondary succession", ["primary succession", "speciation", "mutation"], "The soil was left behind."],
      ["A longleaf pine forest that burns lightly every few years and quickly regrows shows…", "resilience", ["extinction", "primary succession", "an invasive species"], "Resilience is the ability to recover."],
      ["An ecosystem with many species usually recovers from a disturbance…", "better than one with few species", ["worse than one with few species", "never", "only if all predators are removed"], "Variety gives more ways to cope.", true],
    ],
  ),
];
