import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Iowa Grade 1 social studies, Places Near and Far: finding the local community, county and state capital on a map
// (SS.1.12), why people choose to live in different communities (SS.1.11) and how they show belonging (SS.1.10), and
// the history of festivals that celebrate the cultures of Iowa (SS.1.18, SS.1.15).

const PLACES: Q[] = [
  ["Iowa's capital city is…", "Des Moines", ["Chicago", "Omaha", "Denver"], "The State Capitol has a gold dome."],
  ["The Iowa State Capitol has a dome made of…", "gold", ["ice", "glass bottles", "wood"], "It shines in the sun."],
  ["Iowa is split into 99 parts called…", "counties", ["oceans", "planets", "islands"], "Each county has a county seat."],
  ["How many counties does Iowa have?", "99", ["50", "10", "12"], "It is almost 100."],
  ["The town that is the center of a county's government is the…", "county seat", ["county fair", "farm", "river"], "County leaders work there."],
  ["Your town or city is your local…", "community", ["planet", "ocean", "country"], "It is the place where you live."],
  ["The big river on Iowa's east side is the…", "Mississippi River", ["Nile River", "Amazon River", "Missouri River"], "Barges carry grain on it."],
  ["The big river on Iowa's west side is the…", "Missouri River", ["Mississippi River", "Hudson River", "Rio Grande"], "It forms the border with Nebraska."],
  ["On a map of Iowa, a star often shows the…", "state capital", ["biggest farm", "tallest tree", "coldest lake"], "Look for the star at Des Moines."],
  ["Iowa is in the middle part of the United States called the…", "Midwest", ["Far North", "Pacific Coast", "Deep South"], "It is far from the oceans."],
  ["Many people live in a city because it has…", "jobs, stores and schools close by", ["no roads", "no people", "no houses"], "Cities have many services."],
  ["Many people live in the country because they want…", "farms and open space", ["tall buildings", "subways", "crowds"], "Most of Iowa is farmland."],
  ["A family might move to a town to be near…", "a new job or family", ["the moon", "a volcano", "the ocean floor"], "People move for many reasons."],
  ["Which is a small town and not a city?", "a place with a few stores and one school", ["a place with many tall towers", "a place with a big airport", "a place with a subway"], "Small towns have fewer people."],
  ["People show they belong in a community when they…", "help a neighbor", ["litter", "break rules", "stay away from everyone"], "Helping shows you care."],
  ["Saying the Pledge of Allegiance is a way to show…", "citizenship", ["anger", "hunger", "sleepiness"], "It shows we are part of our country."],
  ["Volunteering at a food bank is a way to…", "help your community", ["make a mess", "skip school", "waste food"], "Volunteers give their time."],
  ["Cedar Rapids, Davenport and Sioux City are Iowa…", "cities", ["rivers", "lakes", "counties"], "They are some of Iowa's bigger places."],
  ["Which state is Iowa's neighbor?", "Illinois", ["Florida", "Texas", "Maine"], "It is across the Mississippi River."],
  ["A map key tells you what the map's…", "symbols mean", ["paper weighs", "author ate", "colors smell"], "It is also called a legend."],
  ["Iowa has many farms because its soil is…", "rich and dark", ["all sand", "all rock", "all ice"], "Good soil grows good crops."],
  ["The compass rose on a map shows…", "north, south, east and west", ["the time", "the weather", "the score"], "N points to north."],
  ["Iowa's largest city is…", "Des Moines", ["Ames", "Dubuque", "Ottumwa"], "It is also the capital.", true],
  ["Iowa City was Iowa's capital before…", "Des Moines", ["Chicago", "Dubuque", "Boston"], "The Old Capitol still stands in Iowa City.", true],
  ["Dubuque is a city beside which river?", "the Mississippi River", ["the Missouri River", "the Nile River", "the Snake River"], "It is in eastern Iowa.", true],
  ["Sioux City is a city beside which river?", "the Missouri River", ["the Mississippi River", "the Ohio River", "the Hudson River"], "It is in western Iowa.", true],
  ["Lakes in northwest Iowa, like Spirit Lake and Okoboji, bring people who want to…", "swim, fish and boat", ["ski on mountains", "surf ocean waves", "see volcanoes"], "Many families visit in summer.", true],
  ["A county has leaders called the…", "board of supervisors", ["school band", "ball team", "bus crew"], "Iowa voters choose them.", true],
];

const FESTIVALS: Q[] = [
  ["Tulip Time in Pella celebrates the town's…", "Dutch settlers", ["Chinese settlers", "space travel", "dinosaurs"], "People wear wooden shoes."],
  ["At Tulip Time, many dancers wear…", "wooden shoes", ["ice skates", "flippers", "boots with wheels"], "They are called klompen."],
  ["Tulips are flowers that came to Pella with settlers from…", "the Netherlands", ["Mexico", "Japan", "Egypt"], "The Netherlands is famous for tulips."],
  ["Nordic Fest in Decorah celebrates people whose families came from…", "Norway", ["Brazil", "India", "Kenya"], "Norway is a Nordic country."],
  ["The Iowa State Fair is held every summer in…", "Des Moines", ["Paris", "London", "Tokyo"], "Families come from all over the state."],
  ["At the Iowa State Fair, farm families show off their…", "animals and crops", ["rocket ships", "ocean boats", "snow forts"], "Ribbons go to the best."],
  ["A famous State Fair butter sculpture is a…", "cow", ["whale", "dragon", "robot"], "It is made from real butter."],
  ["A festival is a time when a community…", "celebrates together", ["stays home alone", "goes to sleep", "stops talking"], "Festivals often have music and food."],
  ["Many festivals in Iowa began when settlers wanted to…", "remember their home country", ["forget their families", "stop cooking", "move away"], "Traditions keep memories alive."],
  ["A tradition is something people…", "do again and again over time", ["do only once by mistake", "never do", "buy at a store"], "Families pass traditions down."],
  ["Grandparents teach children old songs. This passes on…", "traditions", ["homework", "weather", "traffic"], "Traditions go from old to young."],
  ["County fairs in Iowa happen in the…", "summer", ["middle of winter", "night only", "rain only"], "School is out then."],
  ["4-H clubs help children learn about…", "farm animals and projects", ["outer space only", "ocean fishing", "skiing"], "Many 4-H kids show at fairs."],
  ["The Amana Colonies were started by settlers from…", "Germany", ["Peru", "China", "Australia"], "They lived and worked together."],
  ["Dancing, music, food and costumes at a festival show a group's…", "culture", ["weather", "math", "traffic"], "Culture is a people's way of life."],
  ["Czech Village in Cedar Rapids remembers settlers from…", "Czech lands in Europe", ["South America", "Antarctica", "Hawaii"], "Many came in the 1800s."],
  ["Being kind to people with different traditions shows…", "respect", ["anger", "fear", "selfishness"], "Respect is part of being a good citizen."],
  ["Many Iowans celebrate the Fourth of July with…", "parades and fireworks", ["snowball fights", "Halloween costumes", "egg hunts"], "It is our country's birthday."],
  ["A powwow is a celebration of…", "Native American culture", ["the moon landing", "winter sports", "the ocean"], "There is drumming, dancing and singing."],
  ["Every August, the Meskwaki Nation near Tama holds a…", "powwow", ["snow festival", "car race", "rodeo on ice"], "Visitors are welcome to watch."],
  ["Festivals bring people together and help visitors…", "learn about a culture", ["forget a culture", "stay home", "fight"], "Visitors share food and music."],
  ["Which food might you taste at a Dutch festival in Pella?", "Dutch letters, a pastry", ["sushi", "tacos", "kimchi"], "The pastry is shaped like an S."],
  ["Hispanic Heritage Month events in Iowa celebrate people with roots in…", "Mexico and Latin America", ["Norway", "Japan", "Egypt"], "There is music, dance and food."],
  ["Lunar New Year events in Iowa celebrate…", "Asian cultures", ["Dutch tulips", "Norse sailors", "the State Fair"], "There are lion dances and red lanterns."],
  ["Tulip Time began in Pella in…", "1935", ["1492", "1776", "2020"], "It has been held for many years since.", true],
  ["Why do people still hold old festivals today?", "to keep traditions alive", ["because they must", "to forget the past", "to stop learning"], "Traditions connect us to the past.", true],
  ["Nordic Fest happens every July in which Iowa town?", "Decorah", ["Pella", "Sioux City", "Ames"], "It is in northeast Iowa.", true],
  ["The Iowa State Fair has been held since…", "1854", ["1999", "2010", "1620"], "It is one of the oldest fairs in the country.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "ia-g1-iowa-places",
    title: "Iowa on the Map",
    emoji: "🗺️",
    blurb: "Our community, our county and Des Moines",
    parentNote: "Finding the local community, the county and the state capital, Des Moines, on a map of Iowa, its 99 counties and their county seats, the Mississippi and Missouri rivers, cities and small towns, why people choose to live in a city, a town or on a farm, and how people show belonging in a community.",
    standards: ["SS.1.12; SS.1.11; SS.1.10", "finding the community, county and state capital on a map, why people choose where to live, and how people show belonging"],
    items: PLACES,
  }),
  bankUnit({
    id: "ia-g1-iowa-festivals",
    title: "Iowa Festivals",
    emoji: "🌷",
    blurb: "Tulip Time, Nordic Fest and the State Fair",
    parentNote: "Where some of Iowa's festivals come from: Tulip Time in Pella for its Dutch settlers, Nordic Fest in Decorah, Czech Village in Cedar Rapids, the Amana Colonies, the Meskwaki powwow near Tama, Hispanic Heritage Month and Lunar New Year events, and the Iowa State Fair, and how festivals keep traditions alive and help people respect each other's cultures.",
    standards: ["SS.1.18; SS.1.15", "the origins of festivals that celebrate the cultures of Iowa, and the different beliefs, traditions and customs in a community"],
    items: FESTIVALS,
  }),
];
