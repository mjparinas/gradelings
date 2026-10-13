import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { SOURCE } from "./sources";

// California social studies, Kindergarten to Grade 3 (History–Social Science Content Standards): learning and working
// now and long ago, a child's place in time and space, people who make a difference, and continuity and change in
// the local community. Copies of Washington and Oregon units leave out their state's places and Tribes and add
// California items. California Indian content is light and in the present tense, and names nations as they name
// themselves; nothing sacred or ceremonial.

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

// ---------------------------------------------------------------------------------------------------------------
// Grade 3: the local region, California Indian nations, local history and government

const REGION_3: Q[] = [
  [
    "Low land between hills or mountains is a…",
    "valley",
    ["peak", "coast", "island"],
    "Rivers often run through valleys.",
  ],
  [
    "Land beside the ocean is the…",
    "coast",
    ["desert", "valley", "plateau"],
    "California has a long coast.",
  ],
  [
    "A dry place with little rain is a…",
    "desert",
    ["rainforest", "swamp", "lake"],
    "The Mojave is a desert.",
  ],
  [
    "The Sierra Nevada is a range of…",
    "mountains",
    ["lakes", "deserts", "islands"],
    "It runs along eastern California.",
  ],
  [
    "The Central Valley is known for…",
    "farms that grow much of the nation's food",
    ["snowy peaks all year", "tall redwood forests", "sand dunes"],
    "Flat land and rivers help crops grow.",
  ],
  [
    "A body of water partly closed in by land is a…",
    "bay",
    ["river", "pond", "canyon"],
    "San Francisco Bay is one.",
  ],
  [
    "Which ocean is on California's coast?",
    "the Pacific Ocean",
    ["the Atlantic Ocean", "the Indian Ocean", "the Arctic Ocean"],
    "It is west of California.",
  ],
  [
    "Which is a natural feature?",
    "a river",
    ["a bridge", "a highway", "a shopping center"],
    "People didn't build it.",
  ],
  [
    "Which is a human-made feature?",
    "a dam",
    ["a mountain", "a lake made by a glacier", "a canyon"],
    "People built it.",
  ],
  [
    "People in a valley built canals to bring water to crops. They…",
    "changed the land to meet their needs",
    ["left the land as it was", "stopped farming", "moved to the desert"],
    "A canal is a human change.",
  ],
  [
    "Why did many towns start near rivers?",
    "Rivers gave water and a way to move goods",
    [
      "Rivers are always dry",
      "Rivers keep people away",
      "There is no soil near rivers",
    ],
    "Water is a key resource.",
  ],
  [
    "A map key, or legend, tells you…",
    "what the map symbols mean",
    ["the time", "the weather tomorrow", "who drew the map"],
    "Look in the box on the map.",
  ],
  [
    "On a map, the compass rose shows…",
    "directions",
    ["temperature", "population", "elevation only"],
    "N, E, S and W.",
  ],
  [
    "Look at a table of rainfall. Town A gets 5 inches a year and Town B gets 40. Which is drier?",
    "Town A",
    ["Town B", "They are the same", "You can't tell"],
    "Less rain means drier.",
  ],
  [
    "Which resource do people in the Central Valley use most to grow crops?",
    "water from rivers and wells",
    ["snow from the beach", "sand from deserts", "salt water"],
    "Crops need fresh water.",
  ],
  [
    "Which is a way people use forests?",
    "for lumber to build houses",
    ["for salt", "for gold coins", "for ocean waves"],
    "Wood comes from trees.",
  ],
  [
    "Why do people build bridges?",
    "To cross rivers and bays",
    ["To stop rain", "To grow food", "To make rivers bigger"],
    "Bridges connect places.",
  ],
  [
    "A photo shows tall buildings and busy streets. It is likely a…",
    "city",
    ["desert", "farm", "forest"],
    "Cities have many people.",
  ],
  [
    "Lake Tahoe is high in the…",
    "Sierra Nevada",
    ["Central Valley", "Mojave Desert", "Pacific Ocean"],
    "It is a mountain lake.",
  ],
  [
    "Death Valley is one of the hottest places on Earth. It is a…",
    "desert",
    ["rainforest", "glacier", "bay"],
    "It gets very little rain.",
  ],
  [
    "Building a freeway through hills is an example of…",
    "people changing the environment",
    ["a natural event", "a weather change", "erosion"],
    "People moved earth to build it.",
    true,
  ],
  [
    "Why might a community be built on a hill near the coast?",
    "to stay safe from flooding and have a view of the sea",
    [
      "because hills have more rain than oceans",
      "to be far from all water",
      "because valleys are illegal",
    ],
    "Think about water and safety.",
    true,
  ],
  [
    "A graph shows a town's population grew from 2 000 to 20 000. The town has…",
    "grown much bigger",
    ["shrunk", "stayed the same", "disappeared"],
    "20 000 is ten times 2 000.",
    true,
  ],
  [
    "Which change to the land can harm wildlife habitats?",
    "draining a wetland to build homes",
    ["planting native trees", "cleaning a creek", "making a park"],
    "Wetlands are home to many animals.",
    true,
  ],
  [
    "An aqueduct is built to…",
    "carry water a long way",
    ["hold cars", "grow rice", "make electricity from wind"],
    "Aqua means water.",
    true,
  ],
  [
    "Which tool shows the land's shape: hills, valleys and mountains?",
    "a physical map",
    ["a calendar", "a bus schedule", "a menu"],
    "Physical maps show landforms.",
    true,
  ],
];

const FIRST_PEOPLES_3: Q[] = [
  [
    "California Indian nations have lived in California for…",
    "thousands of years",
    ["about fifty years", "only since 1900", "one hundred years"],
    "Their history here is very long.",
  ],
  [
    "Is there just one California Indian nation?",
    "No, there are many different nations",
    ["Yes, just one", "No, only two", "Yes, but only in the north"],
    "Each nation has its own language and ways.",
  ],
  [
    "Many California Indian nations…",
    "are living communities today",
    ["only lived long ago", "all live in one city", "speak one language"],
    "They are part of California now.",
  ],
  [
    "How did the land shape how nations lived long ago?",
    "People used the plants and animals near them",
    [
      "Everyone ate the same food",
      "No one used local resources",
      "They bought food in stores",
    ],
    "Coast, valley and desert nations used what was near.",
  ],
  [
    "Acorns were an important food for many California nations. They come from…",
    "oak trees",
    ["palm trees", "cactus", "seaweed"],
    "Acorns were ground into meal.",
  ],
  [
    "The Chumash, of the central coast, build plank canoes called…",
    "tomols",
    ["kayaks", "rafts", "steamboats"],
    "Tomols carry people across the sea to the islands.",
  ],
  [
    "Many nations near the coast fished and gathered…",
    "shellfish",
    ["corn", "wheat", "potatoes"],
    "The ocean gave food.",
  ],
  [
    "Some nations in the desert, like the Cahuilla, used plants such as…",
    "mesquite beans and palm fruit",
    ["seaweed", "redwood bark only", "apples"],
    "Desert plants gave food.",
  ],
  [
    "Pomo weavers are known for their…",
    "baskets",
    ["skyscrapers", "steel tools", "glass windows"],
    "Basket weaving is a living art.",
  ],
  [
    "People trade to get things they don't have. Long ago, nations traded…",
    "goods like shell beads, salt and obsidian",
    ["phones", "plastic toys", "paper money"],
    "Shell beads were valued.",
  ],
  [
    "Obsidian is a black, glassy rock used long ago to make…",
    "sharp tools",
    ["clothes", "paint", "bread"],
    "It breaks into sharp edges.",
  ],
  [
    "Who leads many California Indian nations today?",
    "an elected tribal council and chair",
    ["the US president alone", "the mayor of a city", "no one"],
    "Nations choose their leaders.",
  ],
  [
    "A tribal constitution is…",
    "a written plan for a nation's government",
    ["a story about animals", "a map", "a song"],
    "Like the US Constitution, it sets up a government.",
  ],
  [
    "When settlers came, many California Indian people lost…",
    "their land and many lives",
    ["nothing at all", "only their pets", "their cars"],
    "Settlement caused great harm.",
  ],
  [
    "Many nations today work to keep their languages alive by…",
    "teaching them in classes and camps",
    ["forgetting them", "never speaking", "only writing in English"],
    "Language programs teach young people.",
  ],
  [
    "Long ago, homes were built from…",
    "local materials such as wood, bark and tule reeds",
    ["bricks shipped from far away", "steel beams", "plastic"],
    "People used what grew nearby.",
  ],
  [
    "Tule is a tall reed that grows in…",
    "marshes and lakes",
    ["deserts", "mountaintops", "the open ocean"],
    "It grows where there is water.",
  ],
  [
    "Which question would help you learn about a nation in your area?",
    "What is the nation's name for itself?",
    [
      "What car does it drive?",
      "What is its favorite TV show?",
      "How many stores does it own?",
    ],
    "Start with how people name themselves.",
  ],
  [
    "Many nations tell stories that teach lessons about…",
    "how to live with the land and each other",
    ["video games", "outer space travel", "skyscrapers"],
    "Stories pass on knowledge.",
  ],
  [
    "Why did coastal and desert nations eat different foods?",
    "Different plants and animals lived in each place",
    [
      "They lived in the same place",
      "Food was delivered",
      "They never ate fish",
    ],
    "Geography shapes food.",
    true,
  ],
  [
    "The Ohlone live around San Francisco Bay and…",
    "are working to restore their lands and culture",
    ["live only in museums", "all moved away", "never lived there"],
    "Ohlone people are active today.",
    true,
  ],
  [
    "The Yurok live along the Klamath River, where salmon…",
    "have been an important food for a very long time",
    ["have never lived", "only live in lakes", "are a kind of tree"],
    "Rivers and salmon matter to the Yurok.",
    true,
  ],
  [
    "How did settlers' arrival change the land?",
    "Ranches, farms and towns replaced places nations used for food",
    ["Nothing changed", "More oaks grew everywhere", "Rivers got wider"],
    "Land use changed quickly.",
    true,
  ],
  [
    "What does it mean that a tribe is sovereign?",
    "It has the right to govern itself",
    ["It is part of a city", "It has no rules", "It is a club"],
    "Sovereign nations make their own laws.",
    true,
  ],
  [
    "Some nations today run businesses, schools and health clinics. These help…",
    "support their communities",
    ["close their communities", "end their languages", "move away"],
    "Nations provide services for members.",
    true,
  ],
  [
    "Which is a good primary source about a nation's history?",
    "an elder's spoken story recorded today",
    ["a cartoon movie", "a made-up comic", "a guess"],
    "Oral history comes from people who know it.",
    true,
  ],
];

const LOCAL_HISTORY_3: Q[] = [
  [
    "An explorer is a person who…",
    "travels to learn about new places",
    ["stays home", "only sells food", "builds cars"],
    "Explorers make maps of new lands.",
  ],
  [
    "Juan Rodríguez Cabrillo sailed along the California coast in…",
    "1542",
    ["1942", "1776", "2002"],
    "He sailed for Spain.",
  ],
  [
    "A settler is someone who…",
    "moves to a place to live there",
    ["visits for one day", "only reads about it", "never moves"],
    "Settlers build homes.",
  ],
  [
    "Many California towns began near…",
    "missions, forts, ports, rivers or railroads",
    ["airports only", "shopping malls", "freeways"],
    "Old towns grew where people gathered.",
  ],
  [
    "Why did many towns grow near railroads?",
    "Trains brought people and goods",
    ["Trains scared people away", "Tracks made rain", "Railroads grew food"],
    "Trains connected towns.",
  ],
  [
    "The Gold Rush brought many newcomers to California in…",
    "1849",
    ["1949", "1700", "2010"],
    "They were called forty-niners.",
  ],
  [
    "Many early towns grew because of…",
    "farming, mining, fishing or trade",
    ["video games", "space travel", "online shopping"],
    "Jobs brought people.",
  ],
  [
    "A historical society or museum helps us learn about…",
    "our community's past",
    ["tomorrow's weather", "math facts", "outer space"],
    "They keep old photos and objects.",
  ],
  [
    "Which is a primary source about your town long ago?",
    "an old photo of Main Street",
    ["a movie made last year about dragons", "a video game", "a cartoon"],
    "Primary sources come from the time.",
  ],
  [
    "A street named Mission Street might tell you that…",
    "there was a mission nearby long ago",
    ["it is brand new", "it has no history", "fish live there"],
    "Names can hold history.",
  ],
  [
    "A town's founders are the people who…",
    "started the town",
    ["visit it today", "will live there later", "drew a cartoon of it"],
    "Founders begin something.",
  ],
  [
    "Long ago, families came to California from…",
    "many places around the world",
    ["only one country", "nowhere", "the Moon"],
    "California has always welcomed newcomers.",
  ],
  [
    "What is the same about your town now and long ago?",
    "People still need homes, food and work",
    ["Everyone rides horses", "There are no schools", "There is no water"],
    "Needs stay the same.",
  ],
  [
    "Many farmers in the Central Valley came from…",
    "Mexico, Asia, Europe and other states",
    ["Antarctica", "the Moon", "only one town"],
    "Farm work drew people from far away.",
  ],
  [
    "A timeline helps you…",
    "put events in order",
    ["measure rain", "find north", "add numbers"],
    "Earliest to latest.",
  ],
  [
    "Which is a secondary source?",
    "a book written today about the town's history",
    ["a letter from 1890", "an old diary", "a photo from 1900"],
    "Secondary sources are written later.",
  ],
  [
    "Chinese immigrants helped build California by…",
    "working on railroads, farms and in mines",
    ["sailing to the Moon", "building airplanes in 1850", "closing schools"],
    "Many came in the 1850s and 1860s.",
  ],
  [
    "Many people still live in the same town where their families…",
    "have lived for many years",
    ["have never been", "only visit online", "can't go"],
    "Communities have long-time families.",
  ],
  [
    "How can you learn about your town's history?",
    "Talk to older neighbors and visit the library",
    ["Watch any cartoon", "Guess", "Ask a pet"],
    "People and records hold history.",
  ],
  [
    "Long ago, a ranch was a large piece of land for…",
    "raising cattle",
    ["building ships", "making cars", "mining salt only"],
    "Cattle grazed on open land.",
    true,
  ],
  [
    "Why might a fishing town grow near a bay?",
    "Boats can dock safely and fish are nearby",
    [
      "Bays have no water",
      "Fish only live in deserts",
      "Bays are always frozen",
    ],
    "A bay is a safe harbor.",
    true,
  ],
  [
    "Which change happened as towns grew?",
    "Dirt roads became paved streets",
    [
      "Schools disappeared",
      "People stopped working",
      "Houses got smaller each year",
    ],
    "Growth brings new roads.",
    true,
  ],
  [
    "How did early settlers influence your town's economy today?",
    "Some farms and businesses they started still run",
    [
      "They have no effect",
      "They banned all work",
      "They moved every business away",
    ],
    "Old businesses can last a long time.",
    true,
  ],
  [
    "When explorers and settlers came, California Indian nations already…",
    "lived on and cared for the land",
    ["were not there", "lived in big cities with cars", "had moved away"],
    "Nations were already home here.",
    true,
  ],
  [
    "An oral history is…",
    "a person telling what they remember",
    ["a math test", "a road sign", "a weather map"],
    "It is spoken history.",
    true,
  ],
  [
    "A plaque on an old building tells…",
    "who built it and when",
    ["what is for lunch", "the score of a game", "today's weather"],
    "Plaques mark history.",
    true,
  ],
];

const GOVERNMENT_3: Q[] = [
  [
    "Why do we have laws?",
    "To keep people safe and treat them fairly",
    ["To make life harder", "So leaders can have fun", "To stop all games"],
    "Laws protect people.",
  ],
  [
    "The US Constitution is…",
    "the plan for our nation's government",
    ["a storybook", "a city map", "a song"],
    'It begins, "We the People."',
  ],
  [
    "The three branches of government are legislative, executive and…",
    "judicial",
    ["military", "school", "business"],
    "Judicial means courts.",
  ],
  [
    "The legislative branch…",
    "makes laws",
    ["enforces laws only", "decides court cases", "runs schools"],
    "Legislators write laws.",
  ],
  [
    "The executive branch…",
    "carries out laws",
    ["writes all laws", "decides court cases", "runs the weather"],
    "The president, governor or mayor lead it.",
  ],
  [
    "The judicial branch…",
    "decides what laws mean in court cases",
    ["collects trash", "makes all laws", "builds roads"],
    "Judges work in courts.",
  ],
  [
    "Who leads many cities?",
    "a mayor",
    ["a king", "a principal", "a president"],
    "Mayors lead city governments.",
  ],
  [
    "A city council…",
    "makes local laws",
    ["teaches classes", "runs the army", "flies planes"],
    "Council members vote on city rules.",
  ],
  [
    "Who leads California's state government?",
    "the governor",
    ["the mayor", "the president", "the principal"],
    "The governor works in Sacramento.",
  ],
  [
    "Who leads the United States government?",
    "the president",
    ["the governor", "the mayor", "a judge"],
    "The president works in Washington, D.C.",
  ],
  [
    "A city law that sets the speed limit near schools is a…",
    "local law",
    ["national law", "school rule", "family rule"],
    "Cities make local laws.",
  ],
  [
    "Local taxes help pay for…",
    "parks, libraries, police and firefighters",
    ["toys for each family", "vacations", "private cars"],
    "Taxes pay for things we share.",
  ],
  [
    "Which is a way citizens take part in local government?",
    "Speak at a city council meeting",
    ["Ignore all rules", "Litter", "Hide"],
    "Citizens can share ideas.",
  ],
  [
    "Adults choose leaders by…",
    "voting",
    ["flipping coins", "arm wrestling", "drawing pictures"],
    "Voting lets people decide.",
  ],
  [
    "Which is a public virtue, or good citizen trait?",
    "honesty",
    ["selfishness", "rudeness", "laziness"],
    "Good citizens are honest.",
  ],
  [
    "A county is…",
    "a part of a state with its own government",
    ["a kind of city park", "a country", "a school"],
    "California has 58 counties.",
  ],
  [
    "California, the other states and tribal nations each have…",
    "their own governments",
    ["no laws", "the same mayor", "one shared city hall"],
    "Each makes laws for its people.",
  ],
  [
    "Who decides if someone broke a law?",
    "a judge or jury",
    ["a store clerk", "a bus driver", "a librarian"],
    "Courts settle cases.",
  ],
  [
    "Which is a national landmark?",
    "the White House",
    ["your backyard", "a grocery store", "a playground"],
    "The president lives there.",
  ],
  [
    "The state capitol building is where…",
    "state lawmakers meet",
    ["sports games happen", "movies are made", "trains are kept"],
    "California's is in Sacramento.",
  ],
  [
    "Why do we need different levels of government?",
    "Some problems are local and some are national",
    [
      "So there are fewer rules",
      "Because one level is enough",
      "To confuse people",
    ],
    "Each level handles different jobs.",
    true,
  ],
  [
    "A tribal government can…",
    "make laws for its own lands and people",
    [
      "make laws for all of California",
      "choose the president",
      "run every city",
    ],
    "Tribes are sovereign.",
    true,
  ],
  [
    "The US Constitution was written in…",
    "1787",
    ["1987", "1492", "1849"],
    "It was written in Philadelphia.",
    true,
  ],
  [
    "Which branch can say a law goes against the Constitution?",
    "the judicial branch",
    ["the legislative branch", "a city park", "a school board only"],
    "Courts interpret laws.",
    true,
  ],
  [
    "A school board…",
    "makes decisions about local public schools",
    ["runs the state", "makes national laws", "picks the governor"],
    "Voters elect school board members.",
    true,
  ],
  [
    "Why is voting important?",
    "It lets people choose leaders and laws",
    ["It is only for fun", "It ends all laws", "It is a test"],
    "Every vote is a voice.",
    true,
  ],
];

// ---------------------------------------------------------------------------------------------------------------
// Copies of Washington and Oregon units, with California items

const K = (id: string) => from(SOURCE, id);

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
];

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

export const SOCIAL_3: Unit[] = [
  copyOf(
    K("wa-g3-money-and-voting"),
    {
      id: "ca-g3-money-and-voting",
      title: "Money, Taxes & Voting",
      emoji: "🏦",
      blurb: "Resources, choices and taking part",
      parentNote:
        "Natural, human and capital resources, what is made locally and elsewhere, trade-offs and opportunity cost, how taxes pay for services, and how citizens vote and take part.",
      standards: [
        "3.5.1; 3.5.2; 3.5.3; 3.4.2",
        "how local producers use resources, goods made near and far, trade-offs, and how citizens take part in government",
      ],
    },
    [
      [
        "Grapes grown in a California valley and sold nearby are made…",
        "locally",
        ["in another country", "on the Moon", "nowhere"],
        "Local means nearby.",
      ],
      [
        "A phone made in another country and sold here is…",
        "made elsewhere and traded",
        ["grown on a farm", "made locally", "a service"],
        "Many goods come from far away.",
      ],
      [
        "Doing your best in school now can help you later get…",
        "a job you want",
        ["fewer choices", "less pay", "no skills"],
        "Learning builds skills.",
      ],
    ],
  ),
  copyOf(
    K("wa-g3-culture"),
    {
      id: "ca-g3-culture",
      title: "Culture & Traditions",
      emoji: "🎉",
      blurb: "Many people, one community",
      parentNote:
        "Culture, diversity and unity in a community, the traditions newcomers bring, and national symbols and mottoes that tie people together.",
      standards: [
        "3.3.1; 3.4.3",
        "the people who settled and continue to settle the community, and landmarks and symbols that express American ideals",
      ],
    },
    [
      [
        "Diego's family came to California from Mexico. He shares a family recipe. He is sharing his…",
        "culture",
        ["homework", "address", "bike"],
        "Food is part of culture.",
      ],
      [
        "Many people from Mexico, the Philippines, China and Vietnam live in California. This shows its…",
        "diversity",
        ["weather", "mountains", "size"],
        "Diversity means many kinds of people.",
      ],
    ],
  ),
  copyOf(
    K("or-g3-changemakers"),
    {
      id: "ca-g3-changemakers",
      title: "Changemakers & Allies",
      emoji: "✊",
      blurb: "People who took risks for freedom",
      parentNote:
        "Americans who took risks to secure freedoms, majority rule with respect for others, and using sources to learn about them.",
      standards: [
        "3.4.6",
        "the lives of American heroes who took risks to secure our freedoms",
      ],
    },
    [
      [
        "Martin Luther King Jr. led peaceful marches for…",
        "equal rights",
        ["longer school days", "more taxes", "bigger cars"],
        "He believed in nonviolence.",
      ],
      [
        "Harriet Tubman risked her life to lead people…",
        "out of slavery to freedom",
        ["across the ocean", "to the Moon", "into the army"],
        "She made many trips north.",
      ],
      [
        "Benjamin Franklin helped write the…",
        "Declaration of Independence",
        ["first cookbook", "rules of baseball", "California flag"],
        "He signed it in 1776.",
      ],
    ],
  ),
  bankUnit({
    id: "ca-g3-our-region",
    title: "Our Region's Land",
    emoji: "🏔️",
    blurb: "Landforms, resources and changes",
    parentNote:
      "Deserts, mountains, valleys, coasts, rivers and bays in California, reading maps and tables, and how people use the region's resources and change the land with farms, dams, canals and freeways.",
    standards: [
      "3.1.1; 3.1.2",
      "the geographic features of the local region and how people have used its resources and changed the environment",
    ],
    items: REGION_3,
  }),
  bankUnit({
    id: "ca-g3-first-peoples",
    title: "First Peoples of Our Region",
    emoji: "🧺",
    blurb: "California Indian nations, long ago and today",
    parentNote:
      "California Indian nations such as the Chumash, Pomo, Cahuilla, Ohlone and Yurok: how the land shaped how they lived, trade, tribal governments and constitutions, what settlers' arrival meant for them, and nations today. Light, in the present tense, and with nothing sacred or ceremonial.",
    standards: [
      "3.2.2; 3.2.3; 3.2.4",
      "how geography shaped how local Indian nations lived, their economies and governments, and their interaction with settlers",
    ],
    items: FIRST_PEOPLES_3,
  }),
  bankUnit({
    id: "ca-g3-local-history",
    title: "How Our Community Began",
    emoji: "🏘️",
    blurb: "Explorers, settlers and change",
    parentNote:
      "The explorers and settlers who came to California, why towns started where they did, the economies settlers built, primary and secondary sources, and how communities change over time.",
    standards: [
      "3.3.1; 3.3.2; 3.3.3",
      "explorers, newcomers and settlers, the economies settlers established, and why the community was founded and how it changed",
    ],
    items: LOCAL_HISTORY_3,
  }),
  bankUnit({
    id: "ca-g3-government",
    title: "Rules, Laws & Government",
    emoji: "⚖️",
    blurb: "Three branches and local leaders",
    parentNote:
      "Why we have rules, laws and the Constitution, the three branches of government with a focus on cities and counties, and how California, the other states and tribal nations each govern.",
    standards: [
      "3.4.1; 3.4.4; 3.4.5",
      "reasons for rules, laws and the Constitution, the three branches of government with an emphasis on local government, and the governments of states and sovereign American Indian tribes",
    ],
    items: GOVERNMENT_3,
  }),
];
