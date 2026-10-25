import type { Unit } from "../../types";
import { COPIES_2 as ARIZONA_COPIES_2 } from "../../arizona/units/copies-g2";
import { SOCIAL_3 as CALIFORNIA_SOCIAL_3 } from "../../california/units/social-g3";
import { UNITS as MINNESOTA_SCIENCE_4 } from "../../minnesota/units/science-g4";
import { UNITS as MINNESOTA_SOCIAL_8 } from "../../minnesota/units/social-g8";
import { UNITS as NEW_YORK_SOCIAL_1 } from "../../new-york/units/social-g1";
import { UNITS as NEW_YORK_SOCIAL_5 } from "../../new-york/units/social-g5";
import { SCIENCE_4 as TEXAS_SCIENCE_4 } from "../../texas/units/science-4";
import { SCIENCE_6 as TEXAS_SCIENCE_6 } from "../../texas/units/science-6";
import { SOCIAL_K as TEXAS_SOCIAL_K } from "../../texas/units/social-gk";
import { SOCIAL_3 as TEXAS_SOCIAL_3 } from "../../texas/units/social-g3";
import { G6 as WASHINGTON_SOCIAL_6 } from "../../washington/units/social-59-g6";
import { from, localCopy } from "./kit";

// Virginia copies of units that fit Virginia except for the questions naming another state's places (or, for
// California's government unit, about Tribes): those questions are left out and Virginia items fill each set.

export const COPIES_K: Unit[] = [
  localCopy(from(TEXAS_SOCIAL_K, "tx-k-where-is-it"), "va-k-near-far", ["K.6", "positional words such as near and far, over and under, and left and right"], [
    ["Which tells you the most about where Virginia is?", "a map of the United States", ["a picture of a cat", "a song"], "Maps show where places are."],
    ["Which is bigger, a map of your school or of Virginia?", "a map of Virginia", ["a map of your school", "they are the same"], "Virginia holds many schools."],
    ["The bird is above the tree. Where is the tree?", "below the bird", ["above the bird", "in the bird's nest"], "Above and below are opposites."],
  ], { parentNote: "Using positional words (near and far, over and under, above and below, left and right, in front of and behind) and simple maps." }),
];

export const COPIES_1: Unit[] = [
  localCopy(from(NEW_YORK_SOCIAL_1, "ny-g1-american-symbols"), "va-g1-american-symbols", ["1.3", "the American flag, the Pledge of Allegiance and the national anthem, and Virginia's symbols"], [
    ["What do the 50 stars on the American flag stand for?", "the 50 states", ["50 presidents", "50 cities"], "One star for each state."],
    ["What do the 13 stripes on the flag stand for?", "the first 13 colonies", ["13 oceans", "13 holidays"], "Virginia was one of them."],
    ["Virginia's state bird is the…", "cardinal", ["robin", "eagle"], "A bright red bird."],
    ["Virginia's state flower is the…", "dogwood", ["rose", "sunflower"], "White blossoms in spring."],
    ["Where do Virginia's lawmakers meet?", "the State Capitol in Richmond", ["the White House", "a school gym"], "Thomas Jefferson designed it."],
    ["How do people show respect for the flag?", "stand and face it during the Pledge", ["sit on it", "let it touch the mud"], "Hand over the heart."],
  ], { parentNote: "American symbols and the people who shaped the nation, the meaning of the flag's stars and stripes, and Virginia's flag, State Capitol, cardinal and dogwood." }),
];

export const COPIES_2: Unit[] = [
  localCopy(from(ARIZONA_COPIES_2, "az-g2-difference-makers"), "va-g2-difference-makers", ["2.10", "the contributions of inventors, explorers and reformers in United States history"], [
    ["Benjamin Banneker helped survey the land for…", "Washington, D.C.", ["Richmond", "New Orleans"], "He was a mathematician and astronomer."],
    ["George Washington Carver found many uses for…", "peanuts", ["coal", "oil"], "He was a scientist and teacher."],
    ["The Wright brothers flew the first…", "airplane", ["rocket", "car"], "In 1903."],
    ["Neil Armstrong was the first person to…", "walk on the moon", ["fly across the ocean", "climb Mount Everest"], "In 1969."],
    ["Jonas Salk made a vaccine to prevent…", "polio", ["the flu", "colds"], "It saved many children."],
    ["Thurgood Marshall became the first African American…", "Supreme Court justice", ["president", "astronaut"], "He argued Brown v. Board."],
  ], {
    parentNote: "People from long ago and the recent past whose courage, ideas and hard work made life better, such as Benjamin Banneker, George Washington Carver, Sacagawea, Helen Keller, Jackie Robinson and Cesar Chavez.",
  }),
];

export const COPIES_3: Unit[] = [
  localCopy(from(CALIFORNIA_SOCIAL_3, "ca-g3-government"), "va-g3-government", ["3.9", "why we have government, the three branches, and national, state and local government"], [
    ["The Constitution of the United States sets up…", "the structure of our government", ["the school calendar", "the price of food"], "It is our plan of government."],
    ["Virginia's lawmakers meet in…", "Richmond", ["Norfolk", "Roanoke"], "Virginia's capital."],
    ["The leader of Virginia's executive branch is the…", "governor", ["mayor", "president"], "Elected by Virginians."],
    ["A county or city government takes care of…", "local roads, parks and libraries", ["the army", "printing money"], "Close to home."],
    ["Other countries have governments that are…", "both like and unlike ours", ["all exactly like ours", "never like ours"], "Some have kings, some elect leaders."],
  ], { parentNote: "Why we have rules, laws and the Constitution, the three branches of government, and what national, state and local governments do." }),
  localCopy(from(TEXAS_SOCIAL_3, "tx-g3-changemakers"), "va-g3-citizens", ["3.1", "the rights and responsibilities of citizens, and people who worked for change"], [
    ["A responsibility of a citizen is to…", "obey laws", ["break rules", "skip voting forever"], "Citizens follow the law."],
    ["Adult citizens have the right to…", "vote", ["drive without a license", "ignore laws"], "On Election Day."],
    ["Maggie L. Walker worked for change in Virginia by…", "starting a bank to help her community", ["building ships", "writing the Constitution"], "In Richmond."],
    ["Respecting the rights of others is part of being a…", "good citizen", ["bad neighbor", "lazy worker"], "Treat others fairly."],
  ], { parentNote: "The rights and responsibilities of citizens, and people who worked to make their communities and country fairer." }),
];

export const SCIENCE_COPIES_4: Unit[] = [
  localCopy(from(TEXAS_SCIENCE_4, "tx-g4-seasons-moon"), "va-g4-seasons-moon", ["4.6", "Earth's rotation and revolution, day and night, the seasons, and the phases of the moon"], [
    ["In Virginia, the days with the most hours of daylight come in…", "June", ["December", "March"], "It is near the start of summer."],
    ["Earth has seasons because…", "Earth's axis is tilted", ["Earth gets much closer to the sun in summer", "the moon blocks the sun"], "The tilt changes how directly sunlight hits us."],
    ["Day and night happen because Earth…", "spins on its axis", ["moves around the moon", "stops each evening"], "One spin takes about 24 hours."],
    ["One trip of Earth around the sun takes about…", "one year", ["one day", "one month"], "About 365 days."],
    ["The moon seems to change shape because…", "we see different amounts of its sunlit half", ["it really changes shape", "clouds cover parts of it"], "The moon makes no light of its own."],
    ["From one full moon to the next takes about…", "29 days", ["7 days", "365 days"], "About one month."],
  ], { parentNote: "How Earth's rotation causes day and night, how its tilt and revolution cause the seasons, and why the moon has phases." }),
];

export const SCIENCE_COPIES_5: Unit[] = [
  localCopy(from(MINNESOTA_SCIENCE_4, "mn-g4-energy-resources"), "va-g5-energy-resources", ["5.9", "renewable and nonrenewable energy resources and conserving them"], [
    ["Coal mined in southwest Virginia is a…", "nonrenewable resource", ["renewable resource", "kind of wind energy"], "It took millions of years to form."],
    ["Wind turbines off Virginia Beach make electricity from…", "wind", ["coal", "oil"], "A renewable resource."],
    ["Which helps save energy at home?", "turning off lights when you leave a room", ["leaving the TV on all night", "opening the fridge often"], "Small choices add up."],
    ["Solar panels turn sunlight into…", "electricity", ["coal", "water"], "Renewable energy from the sun."],
  ], { parentNote: "Practices where energy comes from (sunlight, wind, moving water, coal, oil and natural gas), which resources are renewable, how using them affects the environment, and ways to conserve energy." }),
];

export const SCIENCE_COPIES_6: Unit[] = [
  localCopy(from(TEXAS_SCIENCE_6, "tx-g6-seasons-tides"), "va-g6-seasons-tides", ["6.3", "how the sun, Earth and moon cause seasons, moon phases, eclipses and tides"], [
    ["A crabber on the Chesapeake Bay checks tide tables because tides…", "raise and lower the water level each day", ["change the color of the water", "only happen once a year"], "Two highs and two lows a day."],
    ["Tides are caused mainly by the pull of the…", "moon", ["wind", "other planets"], "Its gravity tugs on the oceans."],
    ["Spring tides, the biggest tides, happen when…", "the sun, Earth and moon line up", ["the moon is farthest away", "it is springtime only"], "At new and full moon."],
    ["A solar eclipse happens when the…", "moon passes between the sun and Earth", ["Earth passes between the sun and moon", "sun passes behind Earth"], "The moon's shadow falls on Earth."],
  ], { parentNote: "How the positions of the sun, Earth and moon cause seasons, moon phases, eclipses and tides." }),
];

export const SOCIAL_COPIES_8: Unit[] = [
  localCopy(from(WASHINGTON_SOCIAL_6, "wa-g6-world-maps"), "va-g8-world-maps", ["WG.1", "maps, globes and geographic tools for answering questions about places"], [
    ["Richmond is at about 37° N, 77° W. Which hemispheres is it in?", "Northern and Western", ["Southern and Eastern", "Northern and Eastern"], "North of the equator, west of the prime meridian."],
    ["GIS stands for…", "geographic information systems", ["global ice science", "great island study"], "Computer maps with layers of data."],
    ["A planner choosing where to build a new school might use GIS to…", "map where families live and where roads go", ["predict the weather in space", "count stars"], "Layers of data help decide."],
  ], { parentNote: "Using maps, globes, latitude and longitude, and geographic information systems (GIS) to answer questions and make decisions." }),
  localCopy(from(NEW_YORK_SOCIAL_5, "ny-g5-hemisphere-geography"), "va-g8-latin-america", ["WG.4", "the landforms, climates and resources of Latin America and the Caribbean"], [
    ["The Andes Mountains run along the west side of…", "South America", ["Africa", "Europe"], "The longest mountain chain on land."],
    ["The Amazon rainforest is mostly in…", "Brazil", ["Mexico", "Cuba"], "The largest rainforest in the world."],
    ["The Panama Canal is in…", "Central America", ["South America's far south", "the Caribbean islands"], "It joins two oceans."],
  ], { parentNote: "The physical geography of Latin America and the Caribbean: its mountains, rivers, rainforests, climates and resources." }),
  localCopy(from(MINNESOTA_SOCIAL_8, "mn-g8-population"), "va-g8-population", ["WG.12; WG.13; WG.15", "population growth, migration and the growth of cities"], [
    ["Moving from the countryside to cities is called…", "urbanization", ["immigration", "deforestation"], "Cities grow as people arrive."],
    ["A push factor is something that makes people…", "want to leave a place", ["want to move to a place", "stay forever"], "Like war or drought."],
    ["A pull factor is something that…", "draws people to a place", ["drives people away", "stops all travel"], "Like jobs or safety."],
    ["Many immigrants to Northern Virginia come for…", "jobs and family", ["deserts", "glaciers"], "A pull factor."],
  ], { parentNote: "How populations grow and change, why people migrate (push and pull factors), and how cities grow." }),
  localCopy(from(MINNESOTA_SOCIAL_8, "mn-g8-economies"), "va-g8-global-trade", ["WG.16", "trade and how the world's economies depend on one another"], [
    ["Virginia exports goods like soybeans, wood and coal to…", "countries around the world", ["only Richmond", "no one"], "Through the Port of Virginia."],
    ["Interdependence means countries…", "rely on each other for goods", ["make everything themselves", "never trade"], "Trade links the world."],
    ["A container ship carries…", "goods packed in large metal boxes", ["only passengers", "oil only"], "Containers move from ships to trucks and trains."],
  ], { parentNote: "How countries trade, why they depend on one another, and how a global economy links Virginia to the world." }),
];
