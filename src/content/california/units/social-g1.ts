import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { OWN_SOCIAL_1 as WASHINGTON } from "../../washington/units/social-k4-g1";

// California social studies, Grade 1 (History–Social Science Content Standards). Copies of Washington and Oregon
// units leave out their state's places and Tribes and add California items. California Indian content is light
// and in the present tense, and names nations as they name themselves; nothing sacred or ceremonial.

// ---------------------------------------------------------------------------------------------------------------
// Grade 1 (prompts of 80 characters or fewer, at most 4 choices)

const SYMBOLS_1: Q[] = [
  [
    "What do we say to promise loyalty to the flag?",
    "the Pledge of Allegiance",
    ["the ABCs", "a weather report", "a nursery rhyme"],
    "We say it at school.",
  ],
  [
    "Which song is about our country?",
    "My Country, 'Tis of Thee",
    ["Twinkle, Twinkle", "Old MacDonald", "The Wheels on the Bus"],
    "It sings of liberty.",
  ],
  [
    "Which bird is a symbol of the United States?",
    "the bald eagle",
    ["the pigeon", "the penguin", "the flamingo"],
    "It is strong and free.",
  ],
  [
    "The Statue of Liberty was a gift from…",
    "France",
    ["Japan", "Mexico", "Canada"],
    "It came by ship in pieces.",
  ],
  [
    "The Statue of Liberty welcomes people who…",
    "come to live in America",
    ["sail to the Moon", "fly kites", "catch fish"],
    "Many newcomers saw her first.",
  ],
  [
    "The Liberty Bell is in…",
    "Philadelphia",
    ["Sacramento", "Los Angeles", "Chicago"],
    "It is near Independence Hall.",
  ],
  [
    "Which paper says the colonies were free from Britain?",
    "the Declaration of Independence",
    ["a grocery list", "a menu", "a comic book"],
    "It was signed in 1776.",
  ],
  [
    "Which paper sets up our country's government?",
    "the Constitution",
    ["a library card", "a postcard", "a map key"],
    'It begins, "We the People."',
  ],
  [
    "Independence Day is on…",
    "July 4",
    ["January 1", "October 31", "February 14"],
    "Many towns have fireworks.",
  ],
  [
    "Memorial Day honors people who…",
    "died serving our country",
    ["planted gardens", "won races", "baked bread"],
    "We remember them in May.",
  ],
  [
    "Who was the first President of the United States?",
    "George Washington",
    ["Abraham Lincoln", "Cesar Chavez", "Ben Franklin"],
    "Presidents' Day remembers him.",
  ],
  [
    "Abraham Lincoln is remembered for…",
    "helping end slavery",
    ["inventing the car", "flying a plane", "writing the ABCs"],
    "He was the 16th president.",
  ],
  [
    "Martin Luther King Jr. worked so that all people…",
    "would be treated fairly",
    ["would wear hats", "would live in cities", "would like the same food"],
    "He spoke about a dream.",
  ],
  [
    "Which landmark has four presidents' faces?",
    "Mount Rushmore",
    ["the Golden Gate Bridge", "the Liberty Bell", "the White House"],
    "Faces are carved in rock.",
  ],
  [
    "Which famous bridge is in San Francisco?",
    "the Golden Gate Bridge",
    ["the London Bridge", "the Brooklyn Bridge", "a rope bridge"],
    "It is painted orange-red.",
  ],
  [
    "The flag has 13 stripes for…",
    "the first 13 colonies",
    ["13 presidents", "13 rivers", "13 months"],
    "The colonies became states.",
  ],
  [
    "Our class votes on a game, and the most votes win. This is…",
    "voting",
    ["guessing", "shouting", "hiding"],
    "Each person gets one vote.",
  ],
  [
    "When everyone votes on a rule, that is…",
    "a direct democracy",
    ["a king's rule", "a lucky draw", "no rule"],
    "Everyone takes part.",
  ],
  [
    "When we choose leaders to make rules for us, they are…",
    "representatives",
    ["strangers", "pets", "cooks"],
    "They speak for many people.",
  ],
  [
    "Why do we follow rules made by voting?",
    "Everyone had a fair say",
    ["The loudest kid chose", "It's a secret", "There are no rules"],
    "Voting is fair.",
  ],
  [
    "Each student gets how many votes?",
    "one",
    ["ten", "none", "as many as they want"],
    "One person, one vote.",
  ],
  [
    "Which holiday is about giving thanks?",
    "Thanksgiving",
    ["Flag Day", "Labor Day", "Earth Day"],
    "Families share a meal.",
    true,
  ],
  [
    "Labor Day honors…",
    "workers",
    ["babies", "pets", "trees"],
    "It is in September.",
    true,
  ],
  [
    "As an old story goes, who sewed the first US flag?",
    "Betsy Ross",
    ["Sacagawea", "Rosa Parks", "Amelia Earhart"],
    "She was a seamstress.",
    true,
  ],
  [
    'The words "E pluribus unum" are found on…',
    "our money",
    ["street signs", "cereal boxes", "maps"],
    "Look at a coin.",
    true,
  ],
  [
    '"E pluribus unum" means…',
    "out of many, one",
    ["stop and go", "good morning", "the end"],
    "Many states make one country.",
    true,
  ],
  [
    "Why do people celebrate national holidays?",
    "To remember people and events",
    ["To stay up late", "To skip lunch", "To forget history"],
    "Holidays help us remember.",
    true,
  ],
];

const LONG_AGO_1: Q[] = [
  [
    "Long ago, many schools had only…",
    "one room",
    ["ten floors", "a gym and a pool", "computers in every room"],
    "Every grade learned together.",
  ],
  [
    "Long ago, children wrote on small…",
    "slates",
    ["tablets with screens", "laptops", "whiteboards"],
    "A slate is a small chalkboard.",
  ],
  [
    "How did many children get to school long ago?",
    "They walked",
    ["They took a plane", "They rode an e-scooter", "They took a subway"],
    "Some walked a long way.",
  ],
  [
    "Long ago, many towns had a well for…",
    "water",
    ["movies", "phones", "games"],
    "There were no pipes to every house.",
  ],
  [
    "Long ago, people lit their homes with…",
    "candles and oil lamps",
    ["light bulbs", "phone lights", "neon signs"],
    "There was no electricity.",
  ],
  [
    "Long ago, people traveled across land in…",
    "wagons pulled by horses",
    ["cars", "jets", "electric buses"],
    "Horses did the pulling.",
  ],
  [
    "Long ago, people crossed oceans on…",
    "sailing ships",
    ["airplanes", "rockets", "speedboats"],
    "Wind filled the sails.",
  ],
  [
    "Which is a way to travel today?",
    "a car",
    ["a covered wagon", "a stagecoach", "a horse and buggy"],
    "Cars came later.",
  ],
  [
    "Steam trains carried people across the country after…",
    "railroads were built",
    ["airports opened", "cars were made", "rockets launched"],
    "Tracks crossed the land.",
  ],
  [
    "Which is faster?",
    "an airplane",
    ["a horse", "a sailboat", "walking"],
    "Planes fly very fast.",
  ],
  [
    "Long ago, a stagecoach carried…",
    "people and mail",
    ["only toys", "airplanes", "boats"],
    "Horses pulled it from town to town.",
  ],
  [
    "Long ago, many children helped at home by…",
    "doing farm chores",
    ["using a dishwasher", "playing video games", "ordering food online"],
    "Families needed help.",
  ],
  [
    "Long ago, families got news from…",
    "newspapers and letters",
    ["phones", "television", "the internet"],
    "News came on paper.",
  ],
  [
    "Which school item is from long ago?",
    "a school bell rung by hand",
    ["a laptop", "a smartboard", "an e-reader"],
    "A teacher rang it.",
  ],
  [
    "What is the same about school long ago and today?",
    "Children learn to read",
    ["Kids use slates", "There is one room", "There are no books"],
    "Some things stay the same.",
  ],
  [
    "What has changed about getting water?",
    "Today water comes from a tap",
    [
      "Today we use a well",
      "Water is not needed",
      "Wells are in every kitchen",
    ],
    "Pipes bring water now.",
  ],
  [
    "Long ago, people kept food cold with…",
    "ice",
    ["a refrigerator", "a freezer", "an air conditioner"],
    "Ice was cut from lakes.",
  ],
  [
    "Long ago, many people made their own…",
    "clothes",
    ["phones", "cars", "TVs"],
    "They sewed by hand.",
  ],
  [
    "Who can tell you about school long ago?",
    "a grandparent",
    ["a baby", "a puppy", "a robot toy"],
    "Older people remember.",
  ],
  [
    "A photo from long ago shows a horse on Main Street. What has changed?",
    "Cars drive there now",
    ["Horses fly", "Main Street is gone", "Nothing"],
    "Look at how people travel.",
  ],
  [
    "Which came first?",
    "the horse and wagon",
    ["the car", "the airplane", "the electric car"],
    "Wagons came long before cars.",
  ],
  [
    "Which came last?",
    "the airplane",
    ["the sailing ship", "the wagon", "the steam train"],
    "Planes are newer.",
    true,
  ],
  [
    "Why did people build roads and railroads?",
    "To travel and trade faster",
    ["To slow down", "To stop farming", "To hide"],
    "Goods could move more quickly.",
    true,
  ],
  [
    "Long ago, a mail carrier on horseback rode for the…",
    "Pony Express",
    ["Space Station", "school bus", "fire truck"],
    "Riders carried letters west.",
    true,
  ],
  [
    "Some old schools had a wood stove. It was used to…",
    "keep the room warm",
    ["cook dinner", "play music", "wash clothes"],
    "Winters were cold.",
    true,
  ],
  [
    "Which is a reason transportation changed?",
    "People invented new machines",
    ["Horses disappeared", "Roads vanished", "People stopped moving"],
    "Inventions made travel faster.",
    true,
  ],
];

// Grade 1: models, pictures and maps (1.2.2).

const MODELS_1: Q[] = [
  ["A model of a house is small, but you can see its…", "front, back and sides", ["smell", "sounds", "people inside talking"], "You can turn a model around."],
  ["A photo of your school shows…", "only the side facing the camera", ["every side at once", "the inside of every room", "the whole town"], "A picture is flat."],
  ["A globe is a model of…", "the Earth", ["a ball game", "the Moon", "a school"], "It is round like Earth."],
  ["Which can you turn around to see the back of a building?", "a model", ["a photo", "a drawing", "a postcard"], "Models have three dimensions."],
  ["Which shows how tall the hills are by its shape?", "a clay model of the land", ["a flat map", "a list of names", "a word card"], "You can feel the bumps."],
  ["Which shows real colors and details like windows?", "a photo", ["a map key", "a compass rose", "a list"], "Photos show what eyes see."],
  ["A map shows a place as if you look from…", "above", ["below", "inside a box", "the side"], "Like a bird looking down."],
  ["A model is…", "a small copy of a real thing", ["a giant building", "a kind of song", "a map key"], "Toy cars are models."],
  ["Which is flat?", "a picture of a park", ["a model of a park", "a globe", "a block tower"], "Pictures are on paper."],
  ["Which is three-dimensional (3D)?", "a model of a bridge", ["a photo of a bridge", "a drawing of a bridge", "a map of a bridge"], "3D things have height."],
  ["You want to know how far apart two towns are. Use a…", "map", ["photo of a cat", "song", "storybook"], "Maps show where places are."],
  ["You want to see what the inside of a fire truck looks like. Use a…", "photo of its inside", ["map of the town", "globe", "calendar"], "A photo shows details."],
  ["A model of your classroom can show where…", "the desks and door are", ["your friends' names", "the weather", "the lunch menu"], "It shows where things sit."],
  ["A globe shows Earth's shape better than a flat map because it is…", "round", ["flat", "small", "blue"], "Earth is round too."],
  ["On a model of a town, the tiny blocks stand for…", "buildings", ["clouds", "people's names", "songs"], "Small things stand for big ones."],
  ["A picture shows one moment. A model shows…", "a shape you can see from all sides", ["sounds", "the future", "only one side"], "Walk around a model."],
  ["Which would help you build a real birdhouse?", "a model of the birdhouse", ["a picture of a bird", "a map of the state", "a song about birds"], "You can see each side."],
  ["A map key tells what the map's…", "symbols mean", ["people think", "colors smell like", "pages weigh"], "Symbols are small pictures."],
  ["A model mountain made of clay shows the…", "height and slopes", ["name of the mountain", "animals' sounds", "weather today"], "Shape shows height."],
  ["A photo from an airplane looking down is a lot like a…", "map", ["song", "calendar", "clock"], "Both look from above."],
  ["Which is easier to carry in your pocket?", "a folded map", ["a big model of a city", "a globe", "a sand table"], "Maps are flat.", true],
  ["Why might a picture not show a back door?", "the camera saw only the front", ["doors are invisible", "pictures show everything", "backs are secret"], "A photo has one view.", true],
  ["Which tells you more about the shape of a statue?", "a small model of it", ["a photo of its front", "a map of the park", "its name tag"], "Models show all sides.", true],
  ["A globe and a world map both show…", "land and water on Earth", ["only one city", "today's weather", "your house inside"], "Both show the whole world.", true],
  ["Which shows the most of a big city at once?", "a map", ["a model of one house", "a photo of one door", "a toy car"], "Maps can show large places.", true],
];

// Copies of Washington's Grade 1 units, with California items. They come from that state's own grade
// file, which this grade's download already carries.
const K = (id: string) => from([...WASHINGTON], id);

export const SOCIAL_1: Unit[] = [
  copyOf(
    K("wa-g1-continents-oceans"),
    {
      id: "ca-g1-continents-oceans",
      title: "Continents & Oceans",
      emoji: "🌍",
      blurb: "Our place on the globe",
      parentNote:
        "Finding the local community, California, the United States, the seven continents and the four main oceans on maps and globes.",
      standards: [
        "1.2.1",
        "locating the local community, California, the United States, the continents and the oceans on maps and globes",
      ],
    },
    [
      [
        "Which ocean is next to California?",
        "the Pacific Ocean",
        ["the Atlantic Ocean", "the Indian Ocean", "the Arctic Ocean"],
        "It is west of California.",
      ],
      [
        "California is a state in which country?",
        "the United States",
        ["Mexico", "Canada", "Brazil"],
        "It is one of 50 states.",
      ],
      [
        "Which country is south of California?",
        "Mexico",
        ["Canada", "China", "Peru"],
        "Look below California on the map.",
      ],
      [
        "Which big river runs through California's Central Valley?",
        "the Sacramento River",
        ["the Nile", "the Amazon", "the Thames"],
        "It flows to San Francisco Bay.",
      ],
      [
        "Which is a city in California?",
        "Los Angeles",
        ["London", "Tokyo", "Cairo"],
        "It is in southern California.",
      ],
    ],
  ),
  copyOf(
    K("wa-g1-families-near-far"),
    {
      id: "ca-g1-families-near-far",
      title: "Families Near & Far",
      emoji: "🏡",
      blurb: "Then and now, here and there",
      parentNote:
        "How families live, work and celebrate across generations and around the world, and how American Indians and immigrants help shape California's culture.",
      standards: [
        "1.4.3; 1.5.2; 1.5.3",
        "comparing earlier generations, how American Indians and immigrants help define California's culture, and the customs of varied cultures",
      ],
    },
    [
      [
        "Many families in California speak…",
        "more than one language",
        ["no language", "only one word", "only sign language"],
        "California has many languages.",
      ],
      [
        "Bananas don't grow in most of California. How do we get them?",
        "They are shipped from other countries",
        [
          "They grow on our oak trees",
          "We make them in school",
          "They fall from the sky",
        ],
        "Trucks and ships bring them.",
      ],
      [
        "Many California Indian families today keep traditions like…",
        "basket weaving and their languages",
        ["only TV", "forgetting the past", "nothing at all"],
        "Traditions are passed on.",
      ],
    ],
  ),
  bankUnit({
    id: "ca-g1-american-symbols",
    title: "Symbols, Holidays & Voting",
    emoji: "🗽",
    blurb: "Pledge, landmarks, holidays and votes",
    parentNote:
      "The Pledge of Allegiance, songs about American ideals, national holidays and the people they honor, landmarks and documents such as the Statue of Liberty and the Constitution, and making rules by voting.",
    standards: [
      "1.1.1; 1.3.1; 1.3.2; 1.3.3",
      "making rules by voting, the Pledge and patriotic songs, national holidays, and American symbols, landmarks and documents",
    ],
    items: SYMBOLS_1,
  }),
  bankUnit({
    id: "ca-g1-long-ago",
    title: "School & Travel Long Ago",
    emoji: "🐴",
    blurb: "Then and now",
    parentNote:
      "How schools and communities worked in the past, and how people traveled by wagon, stagecoach, sailing ship and steam train before cars and airplanes.",
    standards: [
      "1.4.1; 1.4.2",
      "the structure of schools and communities in the past and transportation methods of earlier days",
    ],
    items: LONG_AGO_1,
  }),
  bankUnit({
    id: "ca-g1-models-and-maps",
    title: "Models, Pictures & Maps",
    emoji: "🏠",
    blurb: "What a model shows that a picture can't",
    parentNote:
      "Comparing a three-dimensional model (and a globe) with a picture or a map of the same place: what each one shows and when to use it.",
    standards: [
      "1.2.2",
      "comparing what a three-dimensional model shows with what a picture of the same place shows",
    ],
    items: MODELS_1,
  }),
];
