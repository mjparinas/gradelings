import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { OWN_SOCIAL_2 as WASHINGTON } from "../../washington/units/social-k4-g2";
import { OWN_SOCIAL_2 as OREGON } from "../../oregon/units/social-k3";

// California social studies, Grade 2 (History–Social Science Content Standards). Copies of Washington and Oregon
// units leave out their state's places and Tribes and add California items. California Indian content is light
// and in the present tense, and names nations as they name themselves; nothing sacred or ceremonial.

// ---------------------------------------------------------------------------------------------------------------
// Grade 2

const DIFFERENCE_2: Q[] = [
  [
    "Cesar Chavez worked to get fair pay and safe work for…",
    "farm workers",
    ["astronauts", "bankers", "sports stars"],
    "He was a farm worker himself.",
  ],
  [
    "Dolores Huerta helped farm workers by…",
    "organizing them to ask for fair treatment",
    ["building rockets", "painting portraits", "writing cookbooks"],
    "She worked with Cesar Chavez.",
  ],
  [
    "Rosa Parks became famous for…",
    "refusing to give up her bus seat",
    [
      "flying around the world",
      "inventing a light bulb",
      "climbing a mountain",
    ],
    "She stood up for fairness by sitting down.",
  ],
  [
    "Harriet Tubman helped people escape slavery on the…",
    "Underground Railroad",
    ["Pony Express", "Golden Gate Bridge", "Oregon Trail"],
    "It was a secret network, not a real train.",
  ],
  [
    "Jackie Robinson was the first Black player in modern…",
    "Major League Baseball",
    ["space travel", "the navy", "Congress"],
    "He played for the Brooklyn Dodgers.",
  ],
  [
    "Sally Ride was the first American woman to…",
    "travel into space",
    ["become president", "swim an ocean", "climb Everest"],
    "She was an astronaut.",
  ],
  [
    "Marie Curie was a scientist who…",
    "studied radioactivity and won two Nobel Prizes",
    ["invented the telephone", "built the first car", "drew maps of the sea"],
    "She worked in France.",
  ],
  [
    "George Washington Carver found many uses for…",
    "peanuts and sweet potatoes",
    ["gold", "oil", "plastic"],
    "He helped farmers grow healthier soil.",
  ],
  [
    "Thomas Edison is known for working on the…",
    "light bulb",
    ["airplane", "computer", "rocket"],
    "He had a lab full of inventions.",
  ],
  [
    "Helen Keller could not see or hear, but she…",
    "learned to read, write and speak out for others",
    ["never went to school", "stayed home all her life", "became a pilot"],
    "Her teacher was Anne Sullivan.",
  ],
  [
    "A hero is someone who…",
    "helps others, often by taking a risk",
    ["is always famous", "never makes mistakes", "is the richest"],
    "Heroes can be ordinary people.",
  ],
  [
    "Which is a way a kid can make a difference?",
    "Collect food for a food bank",
    ["Litter at the park", "Tease a classmate", "Waste water"],
    "Small actions help.",
  ],
  [
    "Sylvia Mendez and her family went to court in California so that…",
    "Mexican American children could attend any public school",
    ["schools could close", "kids could skip math", "schools would be smaller"],
    "The case was Mendez v. Westminster (1947).",
  ],
  [
    "Fred Korematsu is remembered for standing up for…",
    "the rights of Japanese Americans",
    ["more holidays", "faster trains", "bigger farms"],
    "He went to court during World War II.",
  ],
  [
    "John Muir worked to protect…",
    "wild places like Yosemite",
    ["big cities", "gold mines", "railroads"],
    "He helped start national parks.",
  ],
  [
    "Amelia Earhart was a famous…",
    "pilot",
    ["chef", "farmer", "doctor"],
    "She flew across the Atlantic alone.",
  ],
  [
    "Which word describes a person who keeps trying?",
    "determined",
    ["lazy", "careless", "unkind"],
    "They don't give up.",
  ],
  [
    "Why do we learn about heroes from long ago?",
    "Their actions still help us today",
    ["They were all kings", "They never had problems", "It is just for fun"],
    "Their choices changed lives.",
  ],
  [
    "Jane Addams opened a house in Chicago to help…",
    "families who had just moved to the city",
    ["horses", "astronauts", "movie stars"],
    "It was called Hull House.",
    true,
  ],
  [
    "Ellen Ochoa was the first Latina astronaut. She later…",
    "led NASA's Johnson Space Center",
    ["became a farmer", "sailed around the world", "wrote the Constitution"],
    "She grew up in California.",
    true,
  ],
  [
    "Dr. Charles Drew found ways to store…",
    "blood for transfusions",
    ["gold", "wheat", "electricity"],
    "His work saved soldiers' lives.",
    true,
  ],
  [
    "Mae Jemison was the first Black woman to…",
    "travel into space",
    ["win an election", "build a bridge", "drive a train"],
    "She flew in 1992.",
    true,
  ],
  [
    "Louis Braille made a way for blind people to…",
    "read with their fingertips",
    ["see colors", "fly planes", "hear music"],
    "Braille uses raised dots.",
    true,
  ],
  [
    "Which trait did Rosa Parks show?",
    "courage",
    ["greed", "laziness", "rudeness"],
    "It took bravery to say no.",
    true,
  ],
  [
    "Grandpa volunteers at the library every week. He is…",
    "helping his community",
    ["breaking a rule", "earning a prize", "wasting time"],
    "Volunteers make a difference.",
    true,
  ],
  [
    "Which question helps you learn about a hero?",
    "What problem did they help solve?",
    [
      "What was their shoe size?",
      "What color was their car?",
      "Did they like pizza?",
    ],
    "Ask about their actions.",
    true,
  ],
];

// Copies of Washington's and Oregon's Grade 2 units, with California items. They come from that state's own grade
// file, which this grade's download already carries.
const K = (id: string) => from([...WASHINGTON, ...OREGON], id);

export const SOCIAL_2: Unit[] = [
  copyOf(
    K("wa-g2-reading-maps"),
    {
      id: "ca-g2-reading-maps",
      title: "Reading Maps",
      emoji: "🗺️",
      blurb: "Grids, keys and directions",
      parentNote:
        "Map titles, keys, compass directions and letter-number grids to find places in a neighborhood.",
      standards: [
        "2.2.1",
        "locating places on a letter-number grid and reading map features",
      ],
    },
    [
      [
        "On a grid map, the library is in square C2. Find it by going to column…",
        "C, then row 2",
        ["2, then row C", "A, then row 1", "any square"],
        "Letter first, then number.",
      ],
      [
        "A map of Sacramento would show…",
        "its streets and parks",
        ["the whole world", "the Moon", "only oceans"],
        "City maps show streets.",
      ],
    ],
  ),
  copyOf(
    K("wa-g2-who-runs-our-town"),
    {
      id: "ca-g2-who-runs-our-town",
      title: "Who Runs Our Community?",
      emoji: "🏛️",
      blurb: "Leaders, laws and fairness",
      parentNote:
        "How communities and countries make laws, carry them out and decide whether they were broken: mayors, councils, judges and the people who elect them.",
      standards: [
        "2.3.1",
        "how the United States and other countries make laws, carry out laws, decide whether laws were broken and punish wrongdoers",
      ],
    },
    [
      [
        "Who leads the government of California?",
        "the governor",
        ["the mayor of each town", "a judge", "the principal"],
        "The governor works in Sacramento.",
      ],
      [
        "Many countries have a group that makes laws, like the US Congress. It is a…",
        "legislature",
        ["school", "store", "team"],
        "Legislatures write laws.",
      ],
      [
        "A judge decides…",
        "whether a law was broken",
        ["what to cook", "where to build a park", "who wins a race"],
        "Judges work in courts.",
      ],
      [
        "In Mexico and the United States, people choose leaders by…",
        "voting in elections",
        ["drawing names", "waiting for a king", "a coin toss"],
        "Both are democracies.",
      ],
    ],
  ),
  copyOf(
    K("wa-g2-making-trading"),
    {
      id: "ca-g2-making-trading",
      title: "Making & Trading",
      emoji: "🧺",
      blurb: "From farm to table",
      parentNote:
        "How food is grown, processed, shipped and sold long ago and today, the work of farmers, processors, distributors and grocers, and why people trade.",
      standards: [
        "2.4.1; 2.4.2",
        "food production and consumption long ago and today, and how buyers and sellers depend on each other",
      ],
    },
    [
      [
        "Many strawberries are grown in California. To reach stores in other states, they travel by…",
        "truck, train or plane",
        ["horse and buggy", "bicycle only", "sailboat only"],
        "Fresh food must move fast.",
      ],
      [
        "Who takes food from farms to stores?",
        "a distributor",
        ["a librarian", "a dentist", "a firefighter"],
        "Distributors move goods.",
      ],
      [
        "Who turns tomatoes into tomato sauce?",
        "a processor",
        ["a farmer's dog", "a mail carrier", "a teacher"],
        "Processors change raw foods.",
      ],
      [
        "Long ago, many families got food by…",
        "growing it themselves",
        ["ordering online", "using delivery apps", "buying frozen meals"],
        "Most families farmed.",
      ],
      [
        "Which is a good grown in the Central Valley?",
        "almonds",
        ["salmon from rivers in Alaska", "maple syrup", "bananas"],
        "Almond orchards cover the valley.",
      ],
    ],
  ),
  copyOf(
    K("or-g2-work-and-money"),
    {
      id: "ca-g2-work-and-money",
      title: "Work, Saving & Resources",
      emoji: "🪙",
      blurb: "Producers, consumers and scarcity",
      parentNote:
        "Producers and consumers, wants and needs, saving, and how limited resources affect what people make and buy.",
      standards: [
        "2.4.2; 2.4.3",
        "the roles of buyers and sellers, and how limits on resources affect production and consumption",
      ],
    },
    [
      [
        "During a drought, there is less water for farms. Farmers may…",
        "grow fewer crops",
        ["grow twice as many crops", "use ocean water", "stop needing water"],
        "Scarce water limits crops.",
      ],
      [
        "Water used to grow almonds is a…",
        "natural resource",
        ["service", "want", "tax"],
        "It comes from nature.",
      ],
    ],
  ),
  copyOf(
    K("or-g2-citizens-and-leaders"),
    {
      id: "ca-g2-citizens-and-leaders",
      title: "Citizens & Leaders",
      emoji: "🗳️",
      blurb: "Voting, leaders and solving problems",
      parentNote:
        "Who can vote, how communities choose leaders, and how groups and nations work out problems, from classmates to countries.",
      standards: [
        "2.3.1; 2.3.2",
        "how people choose leaders and make laws, and how groups and nations work to resolve problems",
      ],
    },
    [
      [
        "How old must you be to vote in the United States?",
        "18",
        ["10", "12", "30"],
        "Citizens 18 and older can vote.",
      ],
      [
        "Two countries disagree about fishing. A peaceful way to solve it is to…",
        "talk and make an agreement",
        ["ignore it forever", "build a wall in the ocean", "stop eating"],
        "Countries make deals.",
      ],
      [
        "Countries trade so they can…",
        "get goods they don't make",
        ["stop working", "lose money", "have fewer goods"],
        "Trade helps both sides.",
      ],
    ],
  ),
  bankUnit({
    id: "ca-g2-difference-makers",
    title: "People Who Made a Difference",
    emoji: "🌟",
    blurb: "Heroes long ago and today",
    parentNote:
      "People from long ago and the recent past, in California and beyond, whose courage, ideas and hard work made life better: Cesar Chavez, Dolores Huerta, Rosa Parks, Harriet Tubman, Sally Ride, John Muir, Sylvia Mendez and others.",
    standards: [
      "2.5",
      "how heroes from long ago and the recent past have made a difference in others' lives",
    ],
    items: DIFFERENCE_2,
  }),
];
