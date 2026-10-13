import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { OWN_SOCIAL_K as WASHINGTON } from "../../washington/units/social-k4-k";

// California social studies, Kindergarten (History–Social Science Content Standards). Copies of Washington and Oregon
// units leave out their state's places and Tribes and add California items. California Indian content is light
// and in the present tense, and names nations as they name themselves; nothing sacred or ceremonial.

// ---------------------------------------------------------------------------------------------------------------
// Kindergarten (prompts of 80 characters or fewer, at most 4 choices)

const SYMBOLS_K: Q[] = [
  [
    "Which bird is a symbol of the United States?",
    "the bald eagle",
    ["the robin", "the parrot", "the duck"],
    "It has a white head.",
  ],
  [
    "What colors are on the flag of the United States?",
    "red, white and blue",
    ["green and yellow", "pink and purple", "black and orange"],
    "Look for stars and stripes.",
  ],
  [
    "How many stars are on the United States flag?",
    "50",
    ["13", "10", "100"],
    "One star for each state.",
  ],
  [
    "The stripes on the United States flag stand for…",
    "the first 13 colonies",
    ["the 50 states", "the oceans", "the days of the week"],
    "There are 13 stripes.",
  ],
  [
    "Which animal is on the California state flag?",
    "a grizzly bear",
    ["a bald eagle", "a lion", "a horse"],
    "It is a big brown bear.",
  ],
  [
    "What is the California state flower?",
    "the California poppy",
    ["the rose", "the tulip", "the sunflower"],
    "It is a bright orange flower.",
  ],
  [
    "What color is the California poppy?",
    "orange",
    ["blue", "purple", "white"],
    "It looks like a little sun.",
  ],
  [
    "The Statue of Liberty holds up a…",
    "torch",
    ["flag", "book bag", "umbrella"],
    "It lights the way.",
  ],
  [
    "The Statue of Liberty stands for…",
    "freedom",
    ["winter", "sports", "food"],
    "Liberty means freedom.",
  ],
  [
    "Which bell is a symbol of freedom in our country?",
    "the Liberty Bell",
    ["a school bell", "a bicycle bell", "a doorbell"],
    "It has a big crack.",
  ],
  [
    "Where does the President of the United States live?",
    "the White House",
    ["a castle", "a tree house", "a boat"],
    "It is a big white building.",
  ],
  [
    "Which star is on the California state flag?",
    "a red star",
    ["a gold star", "a blue star", "no star"],
    "Look in the top corner.",
  ],
  [
    "What is California's nickname?",
    "the Golden State",
    ["the Snowy State", "the Ocean State", "the Tiny State"],
    "Gold and golden poppies!",
  ],
  [
    "What is the California state bird?",
    "the California quail",
    ["the bald eagle", "the penguin", "the owl"],
    "It has a curly feather on its head.",
  ],
  [
    "What do people say to show respect for the flag?",
    "the Pledge of Allegiance",
    ["a riddle", "a recipe", "a joke"],
    "We stand and say it together.",
  ],
  [
    "When we say the Pledge, we put a hand…",
    "over our heart",
    ["on our head", "in a pocket", "on a knee"],
    "Your heart is on the left side.",
  ],
  [
    "What is the California state tree?",
    "the redwood",
    ["the palm tree", "the apple tree", "the cactus"],
    "Redwoods are very, very tall.",
  ],
  [
    "Which is a symbol of our country?",
    "the flag",
    ["a pencil", "a sandwich", "a shoe"],
    "We see it at school.",
  ],
  [
    "Which is a symbol of California?",
    "the grizzly bear flag",
    ["a snowman", "a pumpkin", "a soccer ball"],
    "It is our state flag.",
  ],
  [
    "The words on the California flag say…",
    "California Republic",
    ["Happy Birthday", "Stop", "Welcome Home"],
    "Look under the bear.",
  ],
  [
    "A symbol is a picture that…",
    "stands for something",
    ["is always a toy", "makes noise", "is a kind of food"],
    "A heart can stand for love.",
  ],
  [
    "Which building has a big dome where laws are made?",
    "the Capitol",
    ["a barn", "a store", "a garage"],
    "Leaders meet there.",
    true,
  ],
  [
    "California's capital city is…",
    "Sacramento",
    ["New York", "Paris", "Chicago"],
    "Our state leaders work there.",
    true,
  ],
  [
    "Uncle Sam wears a tall hat with…",
    "stars and stripes",
    ["polka dots", "flowers", "pumpkins"],
    "He is a symbol of our country.",
    true,
  ],
  [
    "Why do we have a flag for our state?",
    "to show we are all part of California",
    ["to keep us warm", "to play a game", "to wipe a table"],
    "A flag brings people together.",
    true,
  ],
  [
    "The bald eagle is a symbol of our country. It is a…",
    "bird",
    ["fish", "bug", "cat"],
    "It has wings and feathers.",
    true,
  ],
];

const CALENDAR_K: Q[] = [
  [
    "How many days are in one week?",
    "7",
    ["5", "10", "12"],
    "Count Sunday to Saturday.",
  ],
  [
    "Which day comes after Monday?",
    "Tuesday",
    ["Sunday", "Friday", "Saturday"],
    "Monday, Tuesday, Wednesday…",
  ],
  [
    "Which day comes before Saturday?",
    "Friday",
    ["Sunday", "Monday", "Tuesday"],
    "Thursday, Friday, Saturday.",
  ],
  [
    "Which day comes after Sunday?",
    "Monday",
    ["Saturday", "Friday", "Wednesday"],
    "Sunday starts a new week.",
  ],
  [
    "How many months are in one year?",
    "12",
    ["7", "10", "30"],
    "January to December.",
  ],
  [
    "Which month comes first in the year?",
    "January",
    ["March", "June", "December"],
    "A new year starts in January.",
  ],
  [
    "Which month comes last in the year?",
    "December",
    ["January", "May", "August"],
    "Then a new year begins.",
  ],
  [
    "Which month comes after March?",
    "April",
    ["February", "June", "October"],
    "March, April, May.",
  ],
  [
    "Which month comes before July?",
    "June",
    ["August", "May", "January"],
    "June, July, August.",
  ],
  [
    "Today is Tuesday. What was yesterday?",
    "Monday",
    ["Wednesday", "Friday", "Sunday"],
    "Yesterday is the day before.",
  ],
  [
    "Today is Thursday. What is tomorrow?",
    "Friday",
    ["Wednesday", "Monday", "Saturday"],
    "Tomorrow is the day after.",
  ],
  [
    "Which do we use to see days and months?",
    "a calendar",
    ["a spoon", "a ball", "a crayon"],
    "It has boxes for each day.",
  ],
  [
    "Which comes first in a day?",
    "morning",
    ["night", "evening", "bedtime"],
    "The sun comes up.",
  ],
  [
    "You eat breakfast, then lunch, then…",
    "dinner",
    ["breakfast again", "a nap at dawn", "the alarm clock"],
    "Dinner is in the evening.",
  ],
  [
    "Which two days are often the weekend?",
    "Saturday and Sunday",
    ["Monday and Tuesday", "Wednesday and Thursday", "Tuesday and Friday"],
    "Many people rest then.",
  ],
  [
    "What day comes after Wednesday?",
    "Thursday",
    ["Tuesday", "Monday", "Sunday"],
    "Wednesday, Thursday, Friday.",
  ],
  [
    "Which month comes after November?",
    "December",
    ["October", "January", "September"],
    "November, then December.",
  ],
  [
    "Which happens first?",
    "You plant a seed.",
    ["The flower blooms.", "You pick the flower.", "The plant grows tall."],
    "First the seed goes in the soil.",
  ],
  [
    "Which happens last?",
    "You go to sleep.",
    ["You wake up.", "You eat lunch.", "You go to school."],
    "Sleep comes at night.",
  ],
  [
    "A week is longer than a…",
    "day",
    ["month", "year", "summer"],
    "A week has 7 days.",
  ],
  [
    "A year is longer than a…",
    "month",
    ["century", "lifetime", "decade"],
    "A year has 12 months.",
    true,
  ],
  [
    "Your birthday comes once every…",
    "year",
    ["day", "week", "hour"],
    "You turn one year older.",
    true,
  ],
  [
    "Which month has Independence Day, July 4?",
    "July",
    ["March", "October", "January"],
    "It is in summer.",
    true,
  ],
  [
    "Thanksgiving is in which month?",
    "November",
    ["April", "June", "February"],
    "It is in the fall.",
    true,
  ],
  [
    "Which word means the day after today?",
    "tomorrow",
    ["yesterday", "last week", "long ago"],
    "It has not happened yet.",
    true,
  ],
  [
    "Which word means a time before you were born?",
    "long ago",
    ["tomorrow", "next week", "tonight"],
    "Your grandparents remember it.",
    true,
  ],
];

const CITIZENS_K: Q[] = [
  [
    "Mateo finds a lost wallet. What is honest to do?",
    "Give it to a grown-up",
    ["Keep it", "Throw it away", "Hide it"],
    "Honest means telling the truth.",
  ],
  [
    "Ana broke a cup by mistake. What is honest?",
    "Tell a grown-up",
    ["Hide the pieces", "Blame her brother", "Say nothing"],
    "Telling the truth is brave.",
  ],
  [
    "Leo is scared to try the slide, but he tries. He shows…",
    "courage",
    ["anger", "laziness", "greed"],
    "Courage means being brave.",
  ],
  [
    "Mei keeps trying to tie her shoes. She shows…",
    "determination",
    ["boredom", "rudeness", "fear"],
    "She does not give up.",
  ],
  [
    "Priya feeds the class fish when it is her job. She is…",
    "responsible",
    ["silly", "unkind", "lost"],
    "She does her job.",
  ],
  [
    "Which is a way to be a good citizen at school?",
    "Help clean up",
    ["Push in line", "Grab toys", "Shout at friends"],
    "Good citizens help.",
  ],
  [
    "Which shows respect for our country?",
    "Standing for the Pledge",
    ["Running in the halls", "Tearing a flag", "Yelling during the Pledge"],
    "We stand quietly.",
  ],
  [
    "A good citizen follows…",
    "rules",
    ["no one", "only friends", "the cat"],
    "Rules keep us safe.",
  ],
  [
    "Why do we take turns?",
    "So everyone gets a chance",
    ["So games end fast", "To be the boss", "So no one plays"],
    "Taking turns is fair.",
  ],
  [
    "What happens if you break a class rule?",
    "There is a consequence",
    ["You get a prize", "Nothing ever", "You win"],
    "A consequence is what happens next.",
  ],
  [
    "A new kid sits alone. What can you do?",
    "Ask them to play",
    ["Laugh", "Walk away", "Take their snack"],
    "Include others.",
  ],
  [
    "Diego tells the truth even when it is hard. He is…",
    "honest",
    ["mean", "sleepy", "loud"],
    "Honest people tell the truth.",
  ],
  [
    "In a story, the ant works hard to save food. What does it teach?",
    "Plan ahead",
    ["Never work", "Eat it all now", "Hide from friends"],
    "The ant gets ready for winter.",
  ],
  [
    "In the story, the tortoise wins because he…",
    "keeps going",
    ["runs fastest", "takes a nap", "gives up"],
    "Slow and steady wins the race.",
  ],
  [
    "The boy who cried wolf told lies. What happened?",
    "No one believed him",
    ["He got a prize", "Everyone clapped", "The wolf left"],
    "Lies make people stop trusting.",
  ],
  [
    "Which is a kind thing to say?",
    "Good job!",
    ["You can't play.", "Go away.", "That's dumb."],
    "Kind words help.",
  ],
  [
    "Zara shares her crayons. She is…",
    "generous",
    ["selfish", "grumpy", "scared"],
    "Sharing is generous.",
  ],
  [
    "Which holiday remembers people who served our country?",
    "Veterans Day",
    ["Halloween", "Valentine's Day", "April Fools' Day"],
    "Veterans served in the military.",
  ],
  [
    "Martin Luther King Jr. Day honors a leader who worked for…",
    "fairness for all people",
    ["more homework", "faster cars", "bigger houses"],
    "He had a dream of fairness.",
  ],
  [
    "On Independence Day we celebrate our country's…",
    "birthday",
    ["first snow", "favorite food", "new school"],
    "July 4 is the nation's birthday.",
  ],
  [
    "Presidents' Day honors…",
    "leaders of our country",
    ["pets", "cooks", "toy makers"],
    "George Washington was the first president.",
  ],
  [
    "Which is a way to help your town?",
    "Pick up trash",
    ["Litter", "Break a swing", "Waste water"],
    "Keep places clean.",
    true,
  ],
  [
    "Omar keeps his promise to help his dad. He is…",
    "trustworthy",
    ["careless", "rude", "unfair"],
    "People can count on him.",
    true,
  ],
  [
    "Cesar Chavez Day honors a leader who helped…",
    "farm workers",
    ["astronauts", "kings", "pirates"],
    "He worked for fair treatment.",
    true,
  ],
  [
    "Why do we have holidays that honor people?",
    "To remember what they did",
    ["To skip all rules", "To forget the past", "To buy toys"],
    "We remember and say thank you.",
    true,
  ],
  [
    "Nia says sorry after she bumps a friend. She shows…",
    "responsibility",
    ["anger", "laziness", "fear"],
    "She owns her mistake.",
    true,
  ],
];

// Copies of Washington's Kindergarten units, with California items. They come from that state's own grade
// file, which this grade's download already carries.
const K = (id: string) => from([...WASHINGTON], id);

export const SOCIAL_K: Unit[] = [
  copyOf(
    K("wa-k-goods-services"),
    {
      id: "ca-k-goods-services",
      title: "Goods & Services",
      emoji: "🛒",
      blurb: "Things people make and jobs people do",
      parentNote:
        "Telling goods from services, the jobs behind them, and the helpers at school and in the community, with California foods like oranges and almonds.",
      standards: [
        "K.3",
        "matching simple descriptions of work with the names of jobs at school and in the community",
      ],
    },
    [
      [
        "Many oranges are grown in California. Oranges are a…",
        "good",
        ["service", "job", "tool"],
        "You can hold an orange.",
      ],
      [
        "A farmer in California grows almonds. The farmer is a…",
        "producer",
        ["consumer", "patient", "student"],
        "Producers make or grow things.",
      ],
      [
        "Who helps children cross the street near school?",
        "a crossing guard",
        ["a chef", "a pilot", "a baker"],
        "They hold a stop sign.",
      ],
    ],
  ),
  copyOf(
    K("wa-k-weather-and-me"),
    {
      id: "ca-k-weather-and-me",
      title: "Weather, Land & Me",
      emoji: "🌤️",
      blurb: "Near and far, land and water",
      parentNote:
        "Near and far, inside and outside, land and water on maps and globes, and dressing for the weather, with California's beaches, mountains and deserts.",
      standards: [
        "K.4.1; K.4.2",
        "relative location words and telling land from water on maps and globes",
      ],
    },
    [
      [
        "California is next to which ocean?",
        "the Pacific Ocean",
        ["a pond", "a river", "a lake"],
        "It is a very big ocean.",
      ],
      [
        "On a globe, which color shows water?",
        "blue",
        ["brown", "green", "yellow"],
        "Oceans are blue.",
      ],
      [
        "It is hot at the beach. What should you wear?",
        "a sun hat",
        ["a winter coat", "snow boots", "mittens"],
        "Keep the sun off.",
      ],
    ],
  ),
  bankUnit({
    id: "ca-k-symbols",
    title: "Flags & Symbols",
    emoji: "🇺🇸",
    blurb: "Our country's and our state's symbols",
    parentNote:
      "The national and California flags, the bald eagle, the Statue of Liberty, the Liberty Bell, the White House and California symbols such as the grizzly bear, the poppy and the redwood.",
    standards: [
      "K.2",
      "recognizing national and state symbols such as the flags, the bald eagle and the Statue of Liberty",
    ],
    items: SYMBOLS_K,
  }),
  bankUnit({
    id: "ca-k-calendar",
    title: "Days, Weeks & Months",
    emoji: "📅",
    blurb: "Putting time in order",
    parentNote:
      "Days of the week, months of the year, yesterday and tomorrow, and putting events in order on a calendar.",
    standards: [
      "K.5",
      "putting events in order using a calendar, with days, weeks and months in order",
    ],
    items: CALENDAR_K,
  }),
  bankUnit({
    id: "ca-k-good-citizens",
    title: "Good Citizens",
    emoji: "🤝",
    blurb: "Honesty, courage and holidays",
    parentNote:
      "Honesty, courage, determination and responsibility in daily life and in well-known stories, what happens when rules are broken, and the people honored by holidays such as Independence Day and Martin Luther King Jr. Day.",
    standards: [
      "K.1.2; K.1.3; K.6.1",
      "examples of honesty, courage and responsibility, lessons from stories of times past, and the people honored on holidays",
    ],
    items: CITIZENS_K,
  }),
];
