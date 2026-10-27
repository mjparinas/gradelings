import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Dakota Grade 3 social studies: South Dakota and American geography (3.SS.2), from the state's cities, rivers and
// landforms and its reservations to the regions of the United States.

const PLACES: Q[] = [
  ["The capital of South Dakota is…", "Pierre", ["Sioux Falls", "Rapid City", "Deadwood"], "It sits on the Missouri River."],
  ["South Dakota's largest city, in the southeast corner of the state, is…", "Sioux Falls", ["Pierre", "Rapid City", "Aberdeen"], "It is named for waterfalls on the Big Sioux River."],
  ["The mountains in western South Dakota covered with dark pine trees are the…", "Black Hills", ["Appalachian Mountains", "Badlands", "Coteau des Prairies"], "From far away the pines look black."],
  ["The highest point in South Dakota is…", "Black Elk Peak", ["Bear Butte", "Mount Rushmore", "Spearfish Canyon"], "It is in the Black Hills."],
  ["Land of steep, striped hills and deep gullies with little grass is the…", "Badlands", ["Black Hills", "James River Valley", "Great Lakes"], "Wind and water carved the soft rock."],
  ["The longest river in South Dakota, which splits the state into East River and West River, is the…", "Missouri River", ["James River", "Big Sioux River", "Hudson River"], "It flows south through the middle of the state."],
  ["A river that runs along South Dakota's eastern edge, through Sioux Falls, is the…", "Big Sioux River", ["Missouri River", "Ohio River", "Cheyenne River"], "It is named for the Dakota people."],
  ["A long river that flows through the James River Valley in eastern South Dakota is the…", "James River", ["Ohio River", "Hudson River", "White River"], "It flows south into the Missouri."],
  ["A lone mountain rising from the plains near Sturgis is…", "Bear Butte", ["Black Elk Peak", "the Grand Canyon", "Mount Rushmore"], "A butte is a hill with steep sides."],
  ["A deep, narrow valley with steep cliffs in the northern Black Hills is…", "Spearfish Canyon", ["the Badlands", "Lake Oahe", "the Great Plains"], "A creek runs through it."],
  ["The biggest river system in the United States, flowing south to the Gulf of Mexico, is the…", "Mississippi River", ["James River", "Big Sioux River", "Hudson River"], "The Missouri flows into it."],
  ["Five huge lakes on the border between the United States and its northern neighbor are the…", "Great Lakes", ["Black Hills", "prairie potholes", "Badlands"], "They hold a lot of fresh water."],
  ["An old, worn-down mountain range in the eastern United States is the…", "Appalachian Mountains", ["Black Hills", "Rocky Mountains", "Badlands"], "They run from north to south."],
  ["Our nation's capital is…", "Washington, D.C.", ["New York City", "Philadelphia", "Pierre"], "Congress meets there."],
  ["The largest city in the United States is…", "New York City", ["Philadelphia", "Sioux Falls", "Pierre"], "The Statue of Liberty stands in its harbor."],
  ["The Declaration of Independence was signed in…", "Philadelphia", ["New York City", "Pierre", "Rapid City"], "The Liberty Bell is there."],
  ["South Dakota is part of a flat, grassy region of the United States called the…", "Great Plains", ["West Coast", "New England", "Pacific Northwest"], "It stretches from north to south across the middle of the country."],
  ["South Dakota is also part of the region called the…", "Midwest", ["Southwest", "New England", "West Coast"], "It is in the middle of the country.", true],
  ["How many states are in the United States?", "50", ["13", "48", "100"], "There are 50 stars on the flag.", true],
  ["Pine Ridge, Rosebud and Cheyenne River are three of South Dakota's…", "reservations", ["rivers", "cities", "mountains"], "Tribal Nations govern their own reservations.", true],
  ["How many Tribal Nations have reservations in South Dakota?", "9", ["2", "50", "100"], "The Oceti Sakowin Oyate are their peoples.", true],
  ["Which two states are not connected to the other 48?", "Alaska and Hawaii", ["Iowa and Ohio", "Texas and Utah", "Maine and Georgia"], "One is far north, one is in the ocean.", true],
  ["The six New England states are in the…", "northeast", ["southwest", "middle", "far west"], "They are near the Atlantic Ocean.", true],
  ["Which direction would you travel from Sioux Falls to reach Rapid City?", "west", ["east", "north", "south"], "The Black Hills are on the west side.", true],
  ["Water that falls over a cliff, like Niagara Falls, is a…", "waterfall", ["canyon", "butte", "bay"], "Niagara Falls is between two of the Great Lakes.", true],
  ["Land along the edge of an ocean is a…", "coastline", ["prairie", "butte", "canyon"], "The United States has coastlines on two oceans and the Gulf.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "sd-g3-south-dakota-places",
    title: "South Dakota & the Nation on the Map",
    emoji: "🗺️",
    blurb: "Our cities, rivers and hills, and the regions of America",
    parentNote:
      "Finding South Dakota's cities (Pierre, Sioux Falls and Rapid City), landforms and rivers (the Black Hills, Black Elk Peak, the Badlands, Bear Butte, Spearfish Canyon and the Missouri, James and Big Sioux Rivers) and its reservations on a map, and America's physical features and regions, from the Great Lakes and the Mississippi River to New England and the Great Plains.",
    standards: ["3.SS.2", "American and South Dakota geography: physical features, regions, cities, reservations and South Dakota's landforms"],
    items: PLACES,
  }),
];
