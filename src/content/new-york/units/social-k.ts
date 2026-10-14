import type { Unit } from "../../types";
import { SOCIAL_K as CALIFORNIA } from "../../california/units/social-k";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// New York's own Kindergarten social units (`ny-` ids), from the NYS K-12 Social Studies Framework ("Self and
// Others"). Prompts are 80 characters or fewer with at most 4 choices.

const SYMBOLS: Q[] = [
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the robin", "the parrot", "the duck"], "It has a white head."],
  ["What colors are on the United States flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Look for the stars and stripes."],
  ["How many stars are on the United States flag?", "50", ["13", "10", "100"], "There is one star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "president", "holiday"], "There are 50 of them."],
  ["The Statue of Liberty holds up a…", "torch", ["flag", "book bag", "umbrella"], "It lights the way."],
  ["The Statue of Liberty stands in which city?", "New York City", ["Albany", "Buffalo", "Boston"], "It is in New York Harbor."],
  ["The Statue of Liberty is a symbol of…", "freedom", ["winter", "sports", "farming"], "Liberty is another word for it."],
  ["The Liberty Bell is famous for its…", "crack", ["bright color", "loud siren", "wheels"], "It has a long line down its side."],
  ["What do we say to show respect for the flag?", "the Pledge of Allegiance", ["a riddle", "a grocery list", "a tongue twister"], "We stand and put a hand over our heart."],
  ["During the Pledge of Allegiance, where does your right hand go?", "over your heart", ["on your head", "in your pocket", "up high"], "Put it on the left side of your chest."],
  ["Which song is the national anthem of the United States?", "The Star-Spangled Banner", ["Happy Birthday", "Twinkle, Twinkle", "The Wheels on the Bus"], "It is sung before many big games."],
  ["Which holiday is the birthday of the United States?", "Independence Day", ["Thanksgiving", "Labor Day", "New Year's Day"], "It is on the Fourth of July."],
  ["Independence Day is in which month?", "July", ["January", "October", "December"], "It is on the Fourth of July."],
  ["Many people watch fireworks on…", "the Fourth of July", ["Valentine's Day", "Labor Day", "Arbor Day"], "It is a summer holiday."],
  ["Thanksgiving is a day to…", "be thankful and share a meal", ["go back to school", "plant a garden", "wear a costume"], "Families often eat together."],
  ["Thanksgiving is in which month?", "November", ["March", "June", "August"], "It is in the fall."],
  ["Veterans Day honors people who…", "served in the military", ["drive buses", "grow food", "build houses"], "They served to protect our country."],
  ["Martin Luther King Jr. Day honors a leader who worked for…", "fairness for all people", ["faster cars", "bigger cities", "more rain"], "He spoke about his dream."],
  ["Presidents' Day honors…", "leaders of our country", ["school principals", "famous athletes", "farmers"], "George Washington was one of them."],
  ["Who was the first president of the United States?", "George Washington", ["Abraham Lincoln", "Martin Luther King Jr.", "Benjamin Franklin"], "His face is on the one-dollar bill."],
  ["Labor Day honors people who…", "work", ["sleep", "travel", "paint"], "Labor is another word for work."],
  ["Which is a symbol of our country?", "the flag", ["a pizza", "a bicycle", "a pencil"], "It flies outside many schools."],
  ["Why do we have symbols like the flag?", "they help us feel part of one country", ["they tell time", "they keep us warm", "they help plants grow"], "Symbols stand for something."],
  ["The White House is the home of the…", "president", ["mayor", "teacher", "doctor"], "The leader of the country lives there."],
  ["Families celebrate different holidays. This is…", "something to respect", ["something to tease", "a mistake", "against the rules"], "Each family has its own traditions."],
  ["Which is a holiday some families celebrate with lights?", "Diwali", ["Labor Day", "Arbor Day", "Flag Day"], "It is called the festival of lights."],
  ["Lunar New Year is a holiday when families often…", "share a big meal together", ["go to the dentist", "pay bills", "start school"], "Many families visit each other."],
  ["Flag Day is in which month?", "June", ["February", "September", "November"], "It is in early summer, on June 14."],
  ["Which helps us remember important days?", "holidays", ["shoes", "cereal", "toys"], "They come every year on the calendar."],
  ["The Pledge of Allegiance is a promise to be loyal to…", "our country", ["a sports team", "a store", "a game"], "We say it to the flag."],
];

const WEATHER_NEW_YORK: Q[] = [
  ["In winter in New York, what might fall from the sky?", "snow", ["leaves only", "sand", "apples"], "It is cold and white."],
  ["Which season has the hottest days in New York?", "summer", ["winter", "fall", "spring"], "School is out and it is time to swim."],
  ["In fall, many trees in New York…", "drop their leaves", ["grow new leaves", "turn into snow", "grow fruit in snow"], "The leaves turn red and orange first."],
  ["It is snowy. What do people use to clear the sidewalk?", "a shovel", ["a beach ball", "a fan", "a kite"], "You scoop the snow with it."],
  ["People who live near a lake might enjoy…", "boating and fishing", ["skiing on sand", "climbing a desert", "riding camels"], "Think about the water."],
  ["Spring rain helps…", "plants grow", ["snow fall", "leaves drop", "rivers freeze"], "Flowers need water."],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-k-symbols-holidays",
    title: "Symbols & Holidays",
    emoji: "🗽",
    blurb: "The flag, the eagle and special days",
    parentNote:
      "American symbols such as the flag, the bald eagle and the Statue of Liberty, the Pledge of Allegiance, national holidays, and the different holidays families celebrate.",
    standards: [
      "K.3a; K.3b",
      "American symbols, holidays and celebrations, and the different traditions families and groups celebrate",
    ],
    items: SYMBOLS,
  }),
  copyOf(
    from(CALIFORNIA, "ca-k-weather-and-me"),
    {
      id: "ny-k-weather-and-me",
      title: "Weather, Land & Me",
      emoji: "🌦️",
      blurb: "Seasons, weather and the land around us",
      parentNote:
        "How the seasons and weather change what people wear and do, land and water features, and places near and far.",
      standards: [
        "K.7a; K.6c",
        "how climate, seasons and physical features affect how people live, and land and water on a map or globe",
      ],
    },
    WEATHER_NEW_YORK,
  ),
];
