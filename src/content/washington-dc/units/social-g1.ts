import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Washington, DC Grade 1 social studies, "Our Community, Our City" (the DC Social Studies Standards, 2023): the roles of
// current leaders, including the president and the mayor of Washington, DC (1.9), the symbols, songs and holidays that
// unify people (1.10), how voting and elections choose the president and the mayor (1.12), and the political features
// on a map, from neighborhoods and wards to the District, the United States and North America (1.17).

const LEADERS: Q[] = [
  ["Who leads the whole United States?", "the president", ["the mayor", "the principal", "a coach"], "The president works in the White House."],
  ["Who leads the city of Washington, DC?", "the mayor", ["the president", "a librarian", "a pilot"], "The mayor runs the city's government."],
  ["Where does the president live and work?", "the White House", ["the zoo", "a library", "a school"], "It is a big white house on Pennsylvania Avenue."],
  ["How do people choose the mayor of DC?", "they vote", ["they draw a name", "they race", "they flip a coin"], "Grown-ups vote in an election."],
  ["How do people choose the president?", "they vote", ["they pick the tallest", "they play a game", "they draw straws"], "Voting happens in an election."],
  ["An election is when people…", "vote to choose a leader", ["eat lunch", "go on a trip", "plant trees"], "Each voter gets one vote."],
  ["A good leader is…", "fair and listens", ["bossy and mean", "always late", "never helps"], "Good leaders care about everyone."],
  ["The mayor helps the city by…", "making sure streets get fixed", ["teaching your class", "flying planes", "baking bread"], "The mayor looks after city services."],
  ["The president's helper who is elected too is the…", "vice president", ["janitor", "mail carrier", "chef"], "Vice means next in line."],
  ["Washington, DC is split into 8 parts called…", "wards", ["oceans", "planets", "chapters"], "Each ward has its own Council member."],
  ["How many wards does Washington, DC have?", "8", ["2", "50", "100"], "Count the parts of the city on a map."],
  ["Washington, DC is in the country called the…", "United States", ["North Pole", "Pacific Ocean", "Moon"], "It is our country's capital."],
  ["The United States is on the continent of…", "North America", ["Africa", "Asia", "Europe"], "Mexico is on it too."],
  ["Which is the biggest?", "North America", ["Washington, DC", "your ward", "your street"], "A continent holds many countries."],
  ["Which is the smallest?", "your neighborhood", ["Washington, DC", "the United States", "North America"], "It is the place right around your home."],
  ["The DC flag has three red stars and two red…", "bars", ["moons", "fish", "hearts"], "The bars go across the flag."],
  ["The national anthem of the United States is…", "\"The Star-Spangled Banner\"", ["\"Happy Birthday\"", "\"Twinkle, Twinkle\"", "\"Old MacDonald\""], "We stand for it at games."],
  ["On the Fourth of July we celebrate the…", "birthday of our country", ["first day of school", "end of winter", "first snow"], "It is Independence Day."],
  ["DC's official bird is the wood…", "thrush", ["penguin", "parrot", "ostrich"], "It sings a flute-like song in the woods."],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird."],
  ["Lots of grown-ups vote. The leader with the most votes…", "wins", ["loses", "goes home", "starts over"], "Most votes means most people chose them."],
  ["When people vote, every vote counts…", "the same", ["more for tall people", "more for kids", "not at all"], "That is fair.", true],
  ["DC's flower is the American Beauty…", "rose", ["cactus", "tulip", "seaweed"], "It is a deep red flower.", true],
  ["DC's tree has bright red leaves in fall. It is the scarlet…", "oak", ["palm", "banana", "cactus"], "Scarlet means bright red.", true],
  ["Every April 16, DC remembers the day enslaved people in DC were…", "freed", ["born", "elected", "sent to school"], "It is DC Emancipation Day.", true],
  ["The group that makes DC's laws with the mayor is the DC…", "Council", ["Zoo", "Library", "Orchestra"], "It has 13 members.", true],
  ["On Martin Luther King Jr. Day we remember a leader who worked for…", "fair laws for all", ["faster cars", "more homework", "bigger houses"], "He spoke out peacefully.", true],
  ["The Capitol building is where Congress…", "makes the country's laws", ["keeps animals", "sells food", "trains pilots"], "It has a big white dome.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "dc-g1-leaders-and-symbols",
    title: "Leaders, Votes & Symbols",
    emoji: "🗳️",
    blurb: "The president, the mayor, voting and DC's wards",
    parentNote: "The leaders children hear about (the president of the United States and the mayor of Washington, DC) and what they do, how voting and elections choose them, the symbols, songs and holidays that bring people together (the flags, the national anthem, the Fourth of July and DC Emancipation Day), and the places on a map from a neighborhood and a ward to the District, the United States and North America.",
    standards: ["1.9; 1.10; 1.12; 1.17", "the roles of the president and the mayor, how voting chooses them, symbols and holidays that unify people, and the wards, the District, the country and the continent on a map"],
    items: LEADERS,
  }),
];
