import type { GradeId, Unit } from "../../types";
import { SCIENCE_6 as OREGON_6 } from "../../oregon/units/science-68";
import { SCIENCE_2 } from "../../washington/units/science-k2";
import {
  SCIENCE_3,
  SCIENCE_4,
  SCIENCE_5,
} from "../../washington/units/science-35";
import {
  SCIENCE_6,
  SCIENCE_7,
  SCIENCE_8,
} from "../../washington/units/science-68";
import { SCIENCE_9 } from "../../washington/units/science-9";
import { copyOf, from } from "./kit";

// California copies of Washington and Oregon science units built around Pacific Northwest places. Each keeps the
// original's questions, leaves out the ones about Washington, Oregon or Puget Sound, and adds California items: the
// Sierra Nevada, the Central Valley, the San Andreas Fault, kelp forests and the La Brea Tar Pits. Their own `ca-` ids
// keep California progress apart from the originals.

const G2 = [
  copyOf(
    from(SCIENCE_2, "wa-g2-habitats"),
    {
      id: "ca-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Forests, oceans, deserts and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from California's redwood forests, kelp forests and deserts to grasslands and the Arctic.",
      standards: [
        "2-LS4-1",
        "comparing the variety of plants and animals in different habitats",
      ],
    },
    [
      [
        "Tall coast redwood trees grow in…",
        "foggy forests near the coast",
        ["dry sand dunes", "the open ocean", "icy tundra"],
        "Fog gives them water.",
      ],
      [
        "Sea otters float and eat in…",
        "kelp forests in the ocean",
        ["desert sand", "tall pine trees", "a farm field"],
        "Kelp is a big seaweed.",
      ],
      [
        "A desert tortoise lives in the…",
        "Mojave Desert",
        ["kelp forest", "rainforest", "Arctic"],
        "It is hot and dry there.",
      ],
      [
        "Which plant grows in California's deserts?",
        "Joshua tree",
        ["Water lily", "Kelp", "Moss on a log"],
        "It can live with little water.",
      ],
      [
        "Which habitat has salt water and tides?",
        "A tide pool by the ocean",
        ["A mountain lake", "A desert", "A redwood forest"],
        "Tides come from the ocean.",
        true,
      ],
      [
        "Why do many kinds of fish live in a kelp forest?",
        "Kelp gives food and hiding places",
        ["Kelp is dry", "There is no water", "Kelp makes snow"],
        "Shelter and food bring life.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_2, "wa-g2-land-water"),
    {
      id: "ca-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Mountains, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using California places like the Sierra Nevada, the Central Valley, Lake Tahoe and San Francisco Bay.",
      standards: [
        "2-ESS2-2; 2-ESS2-3",
        "modeling the shapes and kinds of land and water in an area",
      ],
    },
    [
      [
        "Mount Whitney in California is a very tall…",
        "mountain",
        ["lake", "river", "plain"],
        "It is the tallest peak in the lower 48 states.",
      ],
      [
        "The Sierra Nevada is a long row of…",
        "mountains",
        ["oceans", "lakes", "deserts"],
        "A row of mountains is a range.",
      ],
      [
        "The Central Valley is low, flat land between…",
        "mountains",
        ["two oceans", "two deserts", "two islands"],
        "A valley sits between higher land.",
      ],
      [
        "Lake Tahoe is a big lake with…",
        "fresh water",
        ["salt water", "only ice", "no water"],
        "Most lakes are fresh.",
      ],
      [
        "San Francisco Bay is part of the ocean that reaches into the land. It is a…",
        "bay",
        ["mountain", "desert", "pond"],
        "A bay is partly closed in by land.",
      ],
      [
        "Which holds salt water?",
        "The Pacific Ocean",
        ["Lake Tahoe", "A mountain stream", "A rain puddle"],
        "Oceans are salty.",
        true,
      ],
      [
        "On a map, the Sacramento River is drawn as a…",
        "blue line",
        ["brown triangle", "green square", "red dot"],
        "Rivers are long and blue on maps.",
        true,
      ],
    ],
  ),
];

const G3 = [
  copyOf(
    from(SCIENCE_3, "wa-g3-fossils"),
    {
      id: "ca-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as sea fossils found on dry land and Ice Age fossils from the La Brea Tar Pits in Los Angeles.",
      standards: [
        "3-LS4-1",
        "fossils as evidence of organisms and environments of long ago",
      ],
    },
    [
      [
        "Many Ice Age fossils have been found in the La Brea Tar Pits in…",
        "Los Angeles",
        ["the Moon", "the ocean floor", "Antarctica"],
        "It is a city in Southern California.",
      ],
      [
        "California's state fossil is the saber-toothed cat. It lived during…",
        "the Ice Age",
        ["last year", "the age of the internet", "next century"],
        "Long, long ago.",
        true,
      ],
      [
        "Animals got stuck in sticky tar long ago. Today the tar holds…",
        "their bones as fossils",
        ["live animals", "new rocks only", "nothing at all"],
        "The tar kept the bones safe.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_3, "wa-g3-weather-climate"),
    {
      id: "ca-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including California's dry summers and rainy winters, Sierra Nevada snow and desert heat.",
      standards: [
        "3-ESS2-1; 3-ESS2-2",
        "weather patterns by season and climates in different regions of the world",
      ],
    },
    [
      [
        "In much of California, most rain falls in…",
        "winter",
        ["summer", "only July", "never"],
        "Summers are dry.",
      ],
      [
        "California summers near the coast are usually…",
        "dry",
        ["very snowy", "rainy every day", "frozen"],
        "Little rain falls in summer.",
      ],
      [
        "Which season brings the most snow to the Sierra Nevada?",
        "Winter",
        ["Summer", "Late summer", "Early fall heat"],
        "Cold months.",
      ],
      [
        "Which part of California is hottest and driest in summer?",
        "The desert",
        ["The foggy coast", "A snowy mountaintop", "A redwood forest"],
        "Deserts get little rain.",
      ],
      [
        "Land east of the Sierra Nevada is drier because…",
        "mountains block rain clouds",
        [
          "it is closer to the ocean",
          "it is near the equator",
          "it has no air",
        ],
        "Clouds drop rain on the west side.",
        true,
      ],
      [
        "Summer fog near San Francisco comes from…",
        "cool ocean air",
        ["volcanoes", "snowstorms", "the desert"],
        "The ocean is cold there.",
        true,
      ],
    ],
  ),
];

const G4 = [
  copyOf(
    from(SCIENCE_4, "wa-g4-earth-hazards"),
    {
      id: "ca-g4-earth-hazards",
      title: "Quakes, Volcanoes & Maps",
      emoji: "🌋",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and comparing solutions that reduce the impacts of earthquakes, eruptions, landslides and tsunamis, using California's faults and volcanoes as examples.",
      standards: [
        "4-ESS2-2; 4-ESS3-2",
        "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards",
      ],
    },
    [
      [
        "Why does California have many earthquakes?",
        "Two plates slide past each other there",
        [
          "It is in the middle of a plate",
          "It is very sunny",
          "It has deserts",
        ],
        "The San Andreas Fault.",
      ],
      [
        "The San Andreas Fault is a…",
        "crack where two plates meet",
        ["river", "volcano", "lake"],
        "Plates slide along it.",
      ],
      [
        "Mount Shasta and Lassen Peak in Northern California are…",
        "volcanoes",
        ["deserts", "lakes", "islands"],
        "Lassen Peak erupted about 100 years ago.",
      ],
      [
        "During an earthquake, you should…",
        "drop, cover and hold on",
        ["run outside right away", "stand by a window", "ride an elevator"],
        "Get under a sturdy table.",
      ],
      [
        "Builders make buildings safer in earthquakes by…",
        "making them bend without breaking",
        [
          "using only glass",
          "building them taller and thinner",
          "skipping the base",
        ],
        "Flexible frames help.",
        true,
      ],
      [
        "A big earthquake shook San Francisco in…",
        "1906",
        ["1492", "2025", "1776"],
        "Fires burned after the shaking.",
        true,
      ],
      [
        "Earthquakes on a world map often line up along…",
        "plate edges",
        ["the equator only", "the middle of every desert", "the North Pole"],
        "Plates meet in long lines.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_4, "wa-g4-energy-resources"),
    {
      id: "ca-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like moving water, wind, sunlight, heat inside Earth, oil and gas, and how using them affects the environment, with examples from California's solar farms, wind farms and geothermal plants.",
      standards: [
        "4-ESS3-1",
        "energy and fuels come from natural resources, and their use affects the environment",
      ],
    },
    [
      [
        "Large solar farms in California's deserts make electricity from…",
        "sunlight",
        ["coal", "candles", "ocean salt"],
        "Deserts get lots of sun.",
      ],
      [
        "Wind turbines in windy mountain passes turn because of…",
        "moving air",
        ["sunlight only", "oil", "snow"],
        "Wind is moving air.",
      ],
      [
        "Geothermal power plants in California use…",
        "heat from inside Earth",
        ["moonlight", "ice", "sand"],
        "Geo means Earth.",
      ],
      [
        "Dams on Sierra Nevada rivers can make electricity from…",
        "moving water",
        ["burning trees", "batteries only", "volcanoes"],
        "This is hydropower.",
        true,
      ],
      [
        "Which energy resource will not run out?",
        "Sunlight",
        ["Oil", "Natural gas", "Coal"],
        "It is renewable.",
        true,
      ],
    ],
  ),
];

const G5 = [
  copyOf(
    from(SCIENCE_5, "wa-g5-sun-stars"),
    {
      id: "ca-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and patterns of shadows, day length and the stars we see in different seasons.",
      standards: [
        "5-ESS1-1; 5-ESS1-2",
        "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars",
      ],
    },
    [
      [
        "Days in California are longest in…",
        "June",
        ["December", "January", "February"],
        "Summer solstice.",
      ],
      [
        "Days in California are shortest in…",
        "December",
        ["June", "July", "August"],
        "Winter solstice.",
      ],
      [
        "At noon in summer, your shadow is…",
        "short",
        ["very long", "gone forever", "in front of the sun"],
        "The sun is high.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_5, "wa-g5-earth-water"),
    {
      id: "ca-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's geosphere, hydrosphere, atmosphere and biosphere interact, how much of Earth's water is salty or frozen, and how communities protect water, from Sierra Nevada snow to San Francisco Bay.",
      standards: [
        "5-ESS2-1; 5-ESS2-2; 5-ESS3-1",
        "Earth's systems interact, where Earth's water is, and how communities protect resources",
      ],
    },
    [
      [
        "Which is a way communities protect San Francisco Bay?",
        "Keep pollution out of storm drains",
        ["Dump oil in drains", "Pour paint in streams", "Litter on beaches"],
        "Storm drains lead to the bay.",
      ],
      [
        "Melting snow from the Sierra Nevada fills…",
        "rivers and reservoirs",
        ["the desert sand", "the clouds only", "volcanoes"],
        "Snow is stored water.",
      ],
      [
        "A family saves water during a drought by…",
        "taking shorter showers",
        [
          "watering the sidewalk",
          "leaving taps running",
          "filling a pool every day",
        ],
        "Use less water.",
        true,
      ],
      [
        "Which part of Earth's systems is the snowpack on a mountain?",
        "Hydrosphere",
        ["Geosphere", "Biosphere", "Atmosphere"],
        "Frozen water is still water.",
        true,
      ],
    ],
  ),
];

const G6 = [
  copyOf(
    from(SCIENCE_6, "wa-g6-weather"),
    {
      id: "ca-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, including the Sierra Nevada's rain shadow and the atmospheric rivers that bring California's winter storms.",
      standards: [
        "MS-ESS2-4; MS-ESS2-5",
        "the water cycle driven by sunlight and gravity, and how air masses cause weather changes",
      ],
    },
    [
      [
        "Which way do most storms move across California?",
        "From the Pacific Ocean eastward",
        [
          "From the desert to the ocean",
          "Straight down",
          "From south to north only",
        ],
        "Westerly winds.",
      ],
      [
        "An atmospheric river is…",
        "a long band of moist air that brings heavy rain or snow",
        [
          "a river in the sky made of ice",
          "a dry wind",
          "an underground stream",
        ],
        "It carries water vapor from the ocean.",
      ],
      [
        "Why is the west side of the Sierra Nevada wetter than the east side?",
        "Moist ocean air rises, cools and rains on the west side",
        [
          "The east side is closer to the ocean",
          "The sun never shines in the west",
          "Wind only blows east to west",
        ],
        "A rain shadow.",
        true,
      ],
      [
        "Hot, dry Santa Ana winds blow toward the coast from…",
        "the deserts inland",
        ["the ocean", "the North Pole", "a lake"],
        "Desert air is dry.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_6, "wa-g6-climate"),
    {
      id: "ca-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, oceans, mountains and winds shape regional climate, such as California's mild coast and dry deserts, and the evidence for and causes of rising global temperatures.",
      standards: [
        "MS-ESS2-6; MS-ESS3-5",
        "what shapes regional climate, and the causes of rising global temperatures",
      ],
    },
    [
      [
        "Coastal cities like San Diego have mild winters because…",
        "the ocean keeps temperatures steady",
        [
          "they are high in the mountains",
          "they are near the equator",
          "there is no wind",
        ],
        "Water changes temperature slowly.",
      ],
      [
        "Smaller snowpack in the Sierra Nevada means…",
        "less water in rivers in summer",
        ["more water in summer", "no change in rivers", "rivers flow uphill"],
        "Snowmelt feeds rivers.",
      ],
      [
        "The desert east of the Sierra Nevada is dry mainly because of…",
        "the mountains' rain shadow",
        ["being closer to the ocean", "glaciers", "the equator"],
        "Mountains block moist air.",
        true,
      ],
      [
        "A cold ocean current along California's coast makes summers there…",
        "cool and foggy",
        ["hot and humid", "snowy", "stormy every day"],
        "Cold water cools the air.",
        true,
      ],
      [
        "Longer, hotter dry seasons in California raise the risk of…",
        "wildfires",
        ["blizzards", "icebergs", "monsoon floods"],
        "Dry plants burn easily.",
        true,
      ],
    ],
  ),
  copyOf(
    from(OREGON_6, "or-g6-growth"),
    {
      id: "ca-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and how asexual and sexual reproduction differ. California places these middle school standards in 6th grade.",
      standards: [
        "MS-LS1-4; MS-LS1-5; MS-LS3-2",
        "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction",
      ],
    },
    [
      [
        "Almond trees in California's Central Valley are pollinated mainly by…",
        "bees",
        ["fish", "earthworms", "bats only"],
        "Bees carry pollen from flower to flower.",
      ],
      [
        "Monarch butterflies gather in coastal California groves in winter. This behavior helps them…",
        "survive the cold months",
        ["make new flowers", "grow gills", "turn into caterpillars"],
        "Clustering keeps them safe.",
        true,
      ],
    ],
  ),
];

const G7 = [
  copyOf(
    from(SCIENCE_7, "wa-g7-resources"),
    {
      id: "ca-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists map and forecast hazards like earthquakes, tsunamis, floods and wildfires, with California examples.",
      standards: [
        "MS-ESS3-1; MS-ESS3-2",
        "the uneven distribution of Earth's resources, and forecasting natural hazards",
      ],
    },
    [
      [
        "California's earthquake early warning system…",
        "warns people seconds before strong shaking arrives",
        ["stops earthquakes", "measures rain", "predicts quakes years ahead"],
        "Early warning.",
      ],
      [
        "Tsunami hazard maps for the California coast show…",
        "areas that could flood and routes to high ground",
        [
          "where volcanoes are",
          "where it never rains",
          "the best surfing spots",
        ],
        "Planning for safety.",
      ],
      [
        "Gold was found in the Sierra Nevada foothills because…",
        "geologic processes concentrated it there",
        [
          "people planted it",
          "it fell as rain",
          "it is everywhere in equal amounts",
        ],
        "Minerals form in certain places.",
      ],
      [
        "Pumping too much groundwater in the Central Valley has made some land…",
        "sink",
        ["float", "turn into a volcano", "freeze"],
        "Empty spaces underground squeeze shut.",
        true,
      ],
      [
        "Fire scientists forecast wildfire danger using…",
        "wind, temperature, humidity and how dry plants are",
        ["moon phases only", "the color of the sky", "how many birds sing"],
        "Hot, dry and windy is risky.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_7, "wa-g7-biodiversity"),
    {
      id: "ca-g7-biodiversity",
      title: "Biodiversity & Kelp Forests",
      emoji: "🦦",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect ecosystems such as California's kelp forests, wetlands and redwood forests.",
      standards: [
        "MS-LS2-5",
        "evaluating solutions that maintain biodiversity and ecosystem services",
      ],
    },
    [
      [
        "Sea otters help kelp forests by eating…",
        "sea urchins that eat kelp",
        ["kelp", "sharks", "whales"],
        "Fewer urchins, more kelp.",
      ],
      [
        "A kelp forest provides…",
        "food and shelter for many sea animals",
        ["oil", "fresh drinking water", "sand for beaches only"],
        "Underwater habitat.",
      ],
      [
        "Coastal wetlands help people by…",
        "filtering water and softening storm waves",
        ["making the ocean saltier", "causing floods", "removing all fish"],
        "An ecosystem service.",
      ],
      [
        "The California condor was saved from extinction by…",
        "breeding in zoos and releasing birds to the wild",
        ["moving them to the Arctic", "feeding them plastic", "doing nothing"],
        "A recovery program.",
        true,
      ],
      [
        "Which solution best protects a kelp forest?",
        "A marine protected area with limits on fishing",
        [
          "Dumping more runoff",
          "Removing all sea otters",
          "Building more seawalls",
        ],
        "Protect the whole system.",
        true,
      ],
    ],
  ),
];

const G8 = [
  copyOf(
    from(SCIENCE_8, "wa-g8-space"),
    {
      id: "ca-g8-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices modeling the Earth-sun-moon system (phases, eclipses and seasons), the role of gravity in the solar system and galaxy, and the scale of objects in the solar system.",
      standards: [
        "MS-ESS1-1; MS-ESS1-2; MS-ESS1-3",
        "the Earth-sun-moon system, gravity in the solar system, and its scale",
      ],
    },
    [
      [
        "In June, California has long days because…",
        "the Northern Hemisphere tilts toward the sun",
        [
          "the sun is bigger",
          "Earth is closest to the sun",
          "the moon is full",
        ],
        "Tilt toward the sun.",
      ],
      [
        "In December, the sun at noon in California is…",
        "lower in the sky than in June",
        ["straight overhead", "higher than in June", "below the horizon"],
        "Tilt away from the sun.",
        true,
      ],
    ],
  ),
];

const G9 = [
  copyOf(
    from(SCIENCE_9, "wa-g9-ecosystems"),
    {
      id: "ca-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and evaluating solutions to human impacts, using California's chaparral, kelp forests and salmon rivers as examples.",
      standards: [
        "HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7",
        "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity",
      ],
    },
    [
      [
        "Chaparral shrubs sprouting again after a wildfire are an example of…",
        "succession",
        ["extinction", "photosynthesis only", "erosion only"],
        "Communities rebuild over time.",
      ],
      [
        "Which solution to help Central Valley salmon is backed by evidence?",
        "Restoring river habitat and removing fish barriers",
        [
          "Adding more barriers that block fish",
          "Draining wetlands",
          "Paving river banks",
        ],
        "Give salmon habitat back.",
        true,
      ],
      [
        "Invasive quagga mussels in California lakes harm ecosystems by…",
        "eating plankton that native animals need",
        [
          "adding biodiversity",
          "pollinating plants",
          "making the water saltier",
        ],
        "Non-native competitors.",
        true,
      ],
      [
        "When sea otters disappear, sea urchins can wipe out kelp. This shows…",
        "how one species can keep an ecosystem stable",
        [
          "that kelp needs no animals",
          "that urchins are producers",
          "that otters eat kelp",
        ],
        "A keystone species.",
        true,
      ],
    ],
  ),
];

export const OWN_SCIENCE: Partial<Record<GradeId, Unit[]>> = {
  "2": G2,
  "3": G3,
  "4": G4,
  "5": G5,
  "6": G6,
  "7": G7,
  "8": G8,
  "9": G9,
};
