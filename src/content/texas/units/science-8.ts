import type { Unit } from "../../types";
import { SCIENCE_6 as WA_6, SCIENCE_7 as WA_7 } from "../../washington/units/science-68";
import { bankUnit } from "../own";
import { copyOf, from } from "./kit";

// Texas Grade 8 science units: water's properties and acids and bases (8.6(C), 8.6(D)), stars, galaxies and the origin
// of the universe (8.9), and Texas copies of Washington's weather systems unit, with global winds and Gulf hurricanes
// (8.10), its climate unit, with Texas examples of what changes climate (8.11(A), 8.11(B)), and its biodiversity unit,
// with its Puget Sound questions left out and Texas food-web disruptions added (8.12(A), 8.12(C)).

export const SCIENCE_8: Unit[] = [
  bankUnit({
    id: "tx-g8-water-acids",
    title: "Water, Acids & Bases",
    emoji: "🧪",
    blurb: "Cohesion, adhesion and surface tension, and the pH scale.",
    parentNote:
      "Practices the properties of water (cohesion, adhesion and surface tension) and the everyday things they explain, and comparing acids and bases, including their pH relative to pure water.",
    standards: ["8.6(C); 8.6(D)", "cohesion, adhesion and surface tension in water, and the properties and pH of acids and bases"],
    items: [
      ["Water molecules sticking to each other is called…", "cohesion", ["adhesion", "evaporation", "density"], "Co = together."],
      ["Water molecules sticking to other surfaces is called…", "adhesion", ["cohesion", "condensation", "erosion"], "Ad = to something else."],
      ["Water forms round droplets on a waxed car because of…", "cohesion", ["adhesion", "gravity alone", "acidity"], "Molecules pull together."],
      ["A water strider can walk on a pond because of…", "surface tension", ["buoyancy only", "adhesion to its legs", "acidity"], "The surface acts like a skin."],
      ["Water climbing up a thin glass tube shows…", "adhesion", ["cohesion only", "density", "pH"], "Water sticks to glass."],
      ["Water moves up from roots to leaves partly because of…", "cohesion and adhesion", ["magnetism", "acidity", "surface tension only"], "Molecules pull each other up the stem."],
      ["Surface tension is caused by…", "cohesion among water molecules at the surface", ["air pushing down", "salt in water", "heat"], "Surface molecules hold tight."],
      ["A paper towel soaks up a spill because of…", "adhesion and cohesion", ["acidity", "magnetism", "density only"], "Water clings to fibers."],
      ["You can fill a glass slightly above the rim without spilling because of…", "surface tension", ["adhesion only", "pH", "evaporation"], "The surface bulges."],
      ["Pure water has a pH of…", "7", ["0", "14", "3"], "Neutral."],
      ["A substance with a pH below 7 is…", "acidic", ["basic", "neutral", "salty only"], "Below 7 = acid."],
      ["A substance with a pH above 7 is…", "basic", ["acidic", "neutral", "a metal"], "Above 7 = base."],
      ["Lemon juice tastes sour because it is…", "an acid", ["a base", "neutral", "a metal"], "Citric acid."],
      ["Soap feels slippery because it is…", "a base", ["an acid", "neutral", "a gas"], "Bases feel slippery."],
      ["Which is the most acidic?", "pH 2", ["pH 6", "pH 7", "pH 12"], "Lower number, stronger acid."],
      ["Which is the most basic?", "pH 13", ["pH 8", "pH 7", "pH 1"], "Higher number, stronger base."],
      ["Blue litmus paper turns red in…", "an acid", ["a base", "pure water", "oil"], "Acids turn litmus red."],
      ["Red litmus paper turns blue in…", "a base", ["an acid", "pure water", "vinegar"], "Bases turn litmus blue."],
      ["Vinegar has a pH of about…", "3", ["7", "10", "13"], "It is an acid."],
      ["Baking soda dissolved in water is…", "slightly basic", ["strongly acidic", "neutral", "a metal"], "pH a bit above 7."],
      ["An acid and a base react to form water and a salt. This is…", "neutralization", ["evaporation", "condensation", "photosynthesis"], "They cancel out.", true],
      ["Antacid tablets relieve heartburn because they are…", "bases that neutralize stomach acid", ["acids", "neutral salts only", "metals"], "Base vs. acid.", true],
      ["Lake water has pH 6. Compared with pure water it is…", "slightly acidic", ["strongly basic", "neutral", "strongly acidic"], "Just below 7.", true],
      ["Each step down the pH scale is ten times more acidic. pH 4 is how many times more acidic than pH 5?", "10", ["1", "2", "100"], "One step.", true],
      ["Why can water dissolve so many substances and support life?", "Its molecules attract other molecules strongly", ["It has no charge at all", "It is a metal", "It is a base"], "Water's polarity.", true],
      ["Ice floats on water. Which property of water does this show?", "Solid water is less dense than liquid water", ["Ice is an acid", "Water has no cohesion", "Ice is a base"], "Ice keeps lakes from freezing solid.", true],
    ],
  }),
  bankUnit({
    id: "tx-g8-universe",
    title: "Stars, Galaxies & the Universe",
    emoji: "🌌",
    blurb: "Star life cycles, the H-R diagram, kinds of galaxies, and the Big Bang.",
    parentNote:
      "Practices the life cycle of stars and classifying stars on the Hertzsprung-Russell diagram, spiral, elliptical and irregular galaxies and where our solar system sits in the Milky Way, and the evidence (such as galaxies moving apart and leftover radiation) for the Big Bang theory of the origin of the universe.",
    standards: ["8.9(A); 8.9(B); 8.9(C)", "star life cycles and the H-R diagram, kinds of galaxies, and evidence for the origin of the universe"],
    items: [
      ["Stars form inside clouds of gas and dust called…", "nebulae", ["galaxies", "black holes", "comets"], "Star nurseries."],
      ["Our Sun is a…", "main-sequence star", ["red giant", "white dwarf", "neutron star"], "It is in the middle of its life."],
      ["After the main sequence, a Sun-like star swells into a…", "red giant", ["black hole", "blue supergiant", "nebula only"], "It grows huge and cool."],
      ["A Sun-like star ends its life as a…", "white dwarf", ["black hole", "neutron star", "supernova"], "A small, hot leftover core."],
      ["A very massive star ends its life in a huge explosion called a…", "supernova", ["nebula", "white dwarf", "solar flare"], "Super bright."],
      ["After a supernova, the core may become a neutron star or a…", "black hole", ["red giant", "main-sequence star", "planet"], "If massive enough."],
      ["Which stars live the shortest lives?", "The most massive stars", ["The smallest stars", "Medium stars like the Sun", "All stars live the same time"], "They burn fuel fastest."],
      ["The Hertzsprung-Russell diagram compares stars' luminosity and…", "surface temperature", ["age only", "distance from Earth", "number of planets"], "Brightness vs. temperature."],
      ["On an H-R diagram, most stars lie along a band called the…", "main sequence", ["giant branch", "dwarf line", "Milky Way"], "Diagonal band."],
      ["The hottest stars glow…", "blue-white", ["red", "orange", "brown"], "Blue is hotter than red."],
      ["White dwarfs are hot but dim because they are…", "very small", ["very cold", "very far away always", "very large"], "Small surface, little light."],
      ["Red supergiants are cool but bright because they are…", "enormous", ["very small", "very hot", "very close"], "Huge surface area."],
      ["A galaxy with curved arms around a bright center is…", "spiral", ["elliptical", "irregular", "a nebula"], "Pinwheel shape."],
      ["A smooth, oval galaxy with mostly older stars is…", "elliptical", ["spiral", "irregular", "a comet"], "Egg-shaped."],
      ["A galaxy with no definite shape is…", "irregular", ["spiral", "elliptical", "barred spiral"], "Messy shape."],
      ["Our solar system is in the…", "Milky Way galaxy", ["Andromeda galaxy", "Oort cloud", "Kuiper belt"], "Our home galaxy."],
      ["The Milky Way is a…", "spiral galaxy", ["elliptical galaxy", "irregular galaxy", "nebula"], "We live on an arm."],
      ["Where is our solar system in the Milky Way?", "In a spiral arm, about halfway from the center", ["At the exact center", "Outside the galaxy", "In the central black hole"], "Out in an arm."],
      ["The Big Bang theory says the universe…", "began very hot and dense and has been expanding ever since", ["has always been the same size", "is shrinking", "began as a star"], "Expanding universe."],
      ["Light from distant galaxies is shifted toward red. This shows galaxies are…", "moving away from us", ["moving toward us", "standing still", "getting hotter"], "Redshift."],
      ["Faint microwave radiation coming from every direction in space is evidence of…", "the early, hot universe", ["nearby stars only", "Earth's atmosphere", "the Moon"], "Cosmic microwave background.", true],
      ["The universe is about how old, according to scientific evidence?", "About 13.8 billion years", ["About 6,000 years", "About 4.6 billion years", "About 1 million years"], "Older than Earth.", true],
      ["Elements heavier than iron are made mainly in…", "supernovas and star collisions", ["planets", "comets", "the Moon"], "Star explosions.", true],
      ["A light-year measures…", "distance", ["time", "brightness", "mass"], "How far light goes in a year.", true],
      ["Scientists revise theories about the universe when…", "new evidence is found", ["people vote", "a book says so", "they get bored"], "Science changes with evidence.", true],
      ["On an H-R diagram, the Sun is a ___ star of average temperature and brightness.", "yellow main-sequence", ["blue supergiant", "red dwarf", "white dwarf"], "Middle of the band.", true],
    ],
  }),
  copyOf(
    from(WA_6, "wa-g6-weather"),
    {
      id: "tx-g8-weather",
      title: "Weather, Winds & Hurricanes",
      emoji: "🌀",
      blurb: "How the Sun, oceans and air make weather, global winds, and how hurricanes form.",
      parentNote:
        "Practices how energy from the Sun, the oceans and the atmosphere interact to shape weather and climate, global wind patterns such as the trade winds and westerlies, the jet stream, and how warm ocean water and air masses produce tropical cyclones such as Gulf hurricanes.",
      standards: [
        "8.10(A); 8.10(B); 8.10(C)",
        "how the Sun, ocean and atmosphere shape weather, global winds, and how hurricanes form",
      ],
    },
    [
      ["Hurricanes that strike Texas form over…", "warm ocean water", ["cold land", "mountains", "frozen lakes"], "Sea surface above about 80 °F."],
      ["Hurricanes, typhoons and cyclones are all…", "tropical cyclones", ["tornadoes", "cold fronts", "blizzards"], "Different names in different oceans."],
      ["A hurricane weakens after landfall because it…", "loses its supply of warm, moist ocean air", ["gains more water", "gets hotter", "speeds up"], "No fuel over land.", true],
      ["In much of the United States, weather systems usually move from…", "west to east", ["east to west", "north to south only", "they never move"], "The westerlies.", true],
      ["Trade winds near the equator blow from the…", "east", ["west", "north pole", "ground up"], "They pushed sailing ships west.", true],
      ["Hurricane season in the Atlantic and the Gulf runs from June to…", "November", ["February", "April", "May"], "Warmest water is late summer.", true],
    ],
  ),
  copyOf(
    from(WA_6, "wa-g6-climate"),
    {
      id: "tx-g8-climate",
      title: "What Changes Climate",
      emoji: "🌡️",
      blurb: "Natural events and human activities that influence global climate.",
      parentNote:
        "Practices how natural events (volcanic eruptions, meteor impacts, changes in ocean currents) and human activities (greenhouse gases, deforestation, urbanization) can influence climate, using evidence such as temperature records and Texas examples like urban heat islands.",
      standards: ["8.11(A); 8.11(B)", "how natural events and human activities can influence global climate"],
    },
    [
      ["A huge volcanic eruption can cool global temperatures for a year or two because…", "ash and gases block some sunlight", ["lava heats the oceans", "it adds water", "it stops wind"], "Particles high in the air."],
      ["Big cities such as Houston and Dallas are often warmer than nearby countryside. This is…", "the urban heat island effect", ["a cold front", "an ice age", "ocean upwelling"], "Pavement and buildings hold heat."],
      ["Cutting down large forests can add to warming because…", "fewer trees take in carbon dioxide", ["trees make carbon dioxide only", "forests cool the Sun", "it adds more oxygen"], "Trees store carbon.", true],
      ["A large meteor impact long ago may have changed climate by…", "throwing dust into the air that blocked sunlight", ["heating the Sun", "adding new oceans", "moving the Moon"], "Like the impact at the end of the dinosaurs' time.", true],
      ["An abrupt change in ocean currents can change climate because currents…", "carry heat around the globe", ["make all the rain", "create volcanoes", "stop the wind"], "Moving heat.", true],
    ],
  ),
  copyOf(
    from(WA_7, "wa-g7-biodiversity"),
    {
      id: "tx-g8-biodiversity",
      title: "Food Web Disruptions & Biodiversity",
      emoji: "🦆",
      blurb: "How disruptions ripple through food webs, and why variety keeps ecosystems stable.",
      parentNote:
        "Practices how population changes, natural disasters and human actions disrupt the flow of energy in food webs, and how biodiversity makes an ecosystem more stable and its organisms healthier, with Texas examples such as Gulf Coast marshes, invasive species and coastal prairie.",
      standards: [
        "8.12(A); 8.12(C)",
        "how disruptions affect energy transfer in food webs, and how biodiversity supports stable, sustainable ecosystems",
      ],
    },
    [
      ["Zebra mussels spread into some Texas lakes and filter out huge amounts of plankton. Native fish that eat plankton…", "have less food", ["have more food", "are not affected", "turn into mussels"], "They compete for the same food."],
      ["A hurricane pushes salt water into a freshwater marsh on the Texas coast. Plants there die. Animals that eat those plants…", "lose a food source", ["gain more food", "stop needing food", "become producers"], "Energy starts with producers."],
      ["Feral hogs root up soil and eat many plants and small animals. This disrupts food webs by…", "taking food and habitat from native species", ["adding more producers", "making more sunlight", "cleaning the water"], "An invasive competitor."],
      ["If a disease wiped out most rabbits in an area, coyotes and hawks would…", "have less food and might decline", ["have more food", "switch to eating grass", "not change at all"], "Follow the energy."],
      ["A drought kills much of the grass on a prairie. The first animals affected are usually…", "herbivores that eat the grass", ["top predators only", "decomposers only", "fish in the ocean"], "One step from the producers."],
      ["An ecosystem with many kinds of species usually recovers from a disturbance…", "better than one with few species", ["worse than one with few species", "never", "only if all predators leave"], "More backups."],
      ["Why can a predator in a diverse ecosystem survive when one prey species declines?", "It can switch to other prey", ["It stops eating", "It becomes a producer", "It eats rocks"], "More choices of food."],
      ["A farm field planted with only one crop is at risk because…", "one pest or disease can destroy it all", ["it has too many species", "crops need no water", "pests avoid single crops"], "Low biodiversity."],
      ["Attwater's prairie chickens nearly disappeared when most Texas coastal prairie was plowed or built on. This shows that…", "losing habitat can push a species toward extinction", ["habitat does not matter", "prairie chickens live in cities", "plowing adds habitat"], "No home, no food.", true],
      ["Oyster reefs along the Gulf Coast filter water and shelter young fish. Losing them would…", "harm water quality and fish populations", ["make the water cleaner", "add more fish", "not change anything"], "An ecosystem service.", true],
      ["Removing a top predator can let herbivore numbers grow so large that they…", "overeat plants, harming the whole food web", ["help plants grow faster", "turn into predators", "make more sunlight"], "Energy flow gets out of balance.", true],
      ["Genetic variety within one species helps it survive because…", "some individuals may resist a new disease or change", ["all individuals are identical", "variety makes them weaker", "it stops reproduction"], "Diversity inside a species.", true],
    ],
  ),
];
