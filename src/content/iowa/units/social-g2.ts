import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Iowa Grade 2 social studies, Our State: the Native nations whose homelands are in Iowa, how the land shaped their
// lives, their removal and return, and their leaders past and present (SS.2.6 to SS.2.9); how Iowa's communities have
// changed and the people and events in its history (SS.2.10 to SS.2.13); the symbols, landmarks, regions and natural
// resources that make Iowa unique (SS.2.15 to SS.2.17); and a copy of California's unit on who runs a community without
// its California items, with Iowa's elected officials added (SS.2.14).

const NATIONS: Q[] = [
  ["Iowa is named for the Ioway people, who call themselves…", "Báxoje", ["Hawkeyes", "Pilgrims", "Vikings"], "Their name for themselves means gray snow."],
  ["Long before Iowa was a state, its land was the homeland of…", "many Native nations", ["no one at all", "only one family", "people from Europe"], "Native people have lived here for thousands of years."],
  ["The Meskwaki Nation's home in Iowa is the Meskwaki Settlement near…", "Tama", ["Davenport", "Sioux City", "Council Bluffs"], "It is in central Iowa."],
  ["The Meskwaki Settlement is land the Meskwaki people…", "bought themselves in 1857", ["were given by a king", "found empty", "rent each month"], "They saved money to buy it back."],
  ["Native nations often built villages near rivers because rivers gave them…", "water, fish and travel routes", ["snow all year", "gold coins", "tall buildings"], "Rivers were like roads."],
  ["Many Native families in Iowa grew corn, beans and…", "squash", ["bananas", "rice", "coffee"], "These three crops grow well together."],
  ["Some nations in western Iowa hunted bison on the…", "prairie", ["ocean", "glacier", "desert"], "Bison ate the tall prairie grass."],
  ["Wood from Iowa's forests was used for homes, tools and…", "canoes", ["cars", "trains", "airplanes"], "Canoes carried people on the rivers."],
  ["Black Hawk was a leader of the…", "Sauk people", ["Dutch settlers", "railroad", "State Fair"], "He fought to keep his people's homeland."],
  ["After the Black Hawk War in 1832, the United States took land along the…", "Mississippi River", ["Pacific Ocean", "Rio Grande", "Hudson River"], "It was called the Black Hawk Purchase."],
  ["In the 1840s, the United States government made the Sauk and Meskwaki people…", "leave Iowa for Kansas", ["build the Capitol", "start the State Fair", "move to Europe"], "This is called removal."],
  ["Removal was hard for Native families because they had to…", "leave their homes and land", ["go on vacation", "build new farms in Iowa", "stay at home"], "Many people suffered."],
  ["Some Meskwaki families came back to Iowa because it was…", "their homeland", ["a big city", "near the ocean", "a vacation spot"], "They bought land to stay."],
  ["Wapello and Poweshiek were leaders of the…", "Meskwaki people", ["Iowa Legislature", "railroad", "Dutch settlers"], "Iowa counties carry their names."],
  ["Keokuk was a Sauk leader. Today Keokuk is also the name of an Iowa…", "city and county", ["river", "mountain", "lake"], "The city is in southeast Iowa."],
  ["Mahaska, also called White Cloud, was a leader of the…", "Ioway people", ["Meskwaki people", "Dutch settlers", "Amana Colonies"], "Mahaska County is named for him."],
  ["Today the Meskwaki Nation has its own…", "government, school and police", ["army of ships", "king", "state flag only"], "It is a sovereign nation."],
  ["The Meskwaki Nation is led by an elected…", "tribal council", ["king", "mayor of Chicago", "school band"], "Members vote for the council."],
  ["During World War II, eight Meskwaki soldiers served as…", "code talkers", ["astronauts", "pilots of airships", "ship captains"], "They sent secret messages in their language."],
  ["Native people live in Iowa today in…", "cities, towns and the Meskwaki Settlement", ["only museums", "only the past", "only forests"], "Native communities are part of Iowa now."],
  ["Many Native families in Iowa today keep their language alive by…", "teaching it to children", ["forgetting it", "writing it on money", "selling it"], "Language connects generations."],
  ["Other nations with homelands in Iowa include the Ho-Chunk, the Dakota and the…", "Omaha", ["Aztec", "Inca", "Maya"], "The Omaha lived along the Missouri River."],
  ["How was life long ago for many Native families in Iowa different from today?", "they moved between summer villages and winter camps", ["they had cars", "they used phones", "they shopped online"], "Seasons changed where people lived."],
  ["Many Iowa places, like the Iowa River and Winneshiek County, have names that…", "come from Native nations and leaders", ["come from planets", "come from oceans", "were made up last year"], "Names remember the first peoples.", true],
  ["Today the Ioway people live mostly in Kansas, Nebraska and Oklahoma, because…", "they were moved away from Iowa", ["they chose the ocean", "Iowa had no rivers", "they never lived in Iowa"], "Removal moved many nations far away.", true],
  ["In 1856, Iowa's lawmakers passed a law that let the Meskwaki…", "buy land and live in Iowa", ["sell the Settlement", "build a railroad", "move to Kansas"], "The first land was 80 acres.", true],
  ["Why is the Meskwaki Nation called sovereign?", "it governs itself", ["it has no leaders", "it is run by a county", "it is a city"], "Sovereign means self-governing.", true],
  ["Comparing life long ago and today, Meskwaki families still…", "share traditions such as the powwow", ["live in the 1700s", "never use cars", "have no schools"], "Traditions continue today.", true],
];

const COMMUNITIES: Q[] = [
  ["Iowa became a state on December 28,…", "1846", ["1776", "1900", "2001"], "It was the 29th state."],
  ["Iowa was the United States' state number…", "29", ["1", "50", "13"], "Twenty-eight states came before it."],
  ["Iowa's first state capital was…", "Iowa City", ["Des Moines", "Ames", "Dubuque"], "The Old Capitol still stands there."],
  ["The capital moved from Iowa City to Des Moines in…", "1857", ["1492", "1999", "2020"], "Des Moines is near the middle of the state."],
  ["When railroads came to Iowa, many towns…", "grew bigger", ["disappeared at once", "moved to the moon", "stopped trading"], "Trains carried crops and people."],
  ["Long ago, most Iowans lived on farms. Today most Iowans live in…", "towns and cities", ["caves", "boats", "tents"], "Farms need fewer workers now."],
  ["Long ago, farmers used horses to pull plows. Today they use…", "tractors", ["camels", "sailboats", "kites"], "Machines made farm work faster."],
  ["Herbert Hoover, the 31st President, was born in…", "West Branch, Iowa", ["Paris", "New York City", "Chicago"], "He is the only President born in Iowa."],
  ["Grant Wood was an Iowa artist who painted…", "American Gothic", ["the Mona Lisa", "the flag", "a dinosaur"], "It shows a farmer and a woman by a house."],
  ["Norman Borlaug grew up on an Iowa farm and helped the world grow more…", "food", ["candy", "plastic", "snow"], "He won the Nobel Peace Prize."],
  ["George Washington Carver studied plants at…", "Iowa State", ["a pet shop", "the State Fair", "a zoo"], "He later became a famous scientist."],
  ["Carrie Chapman Catt, who grew up in Iowa, worked so that women could…", "vote", ["drive tractors", "fly planes", "play baseball"], "Women won the vote in 1920."],
  ["Peggy Whitson, an astronaut from Mount Ayr, Iowa, spent many days in…", "space", ["the ocean", "a cave", "the desert"], "She flew on the International Space Station."],
  ["In 2008, a huge flood hit Cedar Rapids when the Cedar River…", "rose over its banks", ["froze solid", "dried up", "turned to sand"], "People worked together to rebuild."],
  ["In August 2020, a storm called a derecho knocked down trees and…", "damaged farms and homes", ["made snow", "built bridges", "filled lakes"], "Its winds were as strong as a hurricane's."],
  ["After a flood or storm, neighbors often…", "help each other clean up", ["move away at once", "laugh at others", "do nothing"], "Communities pull together."],
  ["A town that changes from a few houses to many streets is…", "growing", ["shrinking", "frozen", "moving"], "More people means more homes."],
  ["Long ago, children in small Iowa towns often went to a…", "one-room school", ["big online school", "school on a boat", "space school"], "All grades learned together."],
  ["Long ago, people thought women should not vote. Today we think…", "everyone should be able to vote", ["no one should vote", "only kings should vote", "voting is silly"], "Ideas change over time."],
  ["How do we learn about Iowa long ago?", "old photos, letters and museums", ["video games only", "guessing", "TV cartoons"], "These are sources."],
  ["Many new families from Mexico, Bosnia, Myanmar and other places came to Iowa…", "in recent years", ["before dinosaurs", "never", "only in 1492"], "Iowa communities keep changing."],
  ["The Iowa caucuses are meetings where Iowans pick candidates for…", "President", ["school lunch", "state bird", "class pet"], "They happen every four years."],
  ["Buxton was a coal mining town where Black and white families…", "lived and worked side by side", ["never met", "built pyramids", "raised penguins"], "It grew in the early 1900s.", true],
  ["Why did Buxton become empty after the 1920s?", "the coal mines closed", ["a volcano erupted", "the ocean flooded it", "it moved to Mars"], "Towns change when jobs leave.", true],
  ["Before Iowa was a state, it was part of the Iowa…", "Territory", ["Ocean", "Kingdom", "Colony of Spain"], "It became a territory in 1838.", true],
  ["Amelia Bloomer of Council Bluffs is remembered for working for…", "women's rights", ["railroad tracks", "farm machines", "space travel"], "Bloomers, loose pants, were named for her.", true],
  ["How did life change when farm families got electricity?", "they had lights and machines at home", ["they had no light", "they stopped farming", "they moved to boats"], "Many farms got power in the 1930s and 1940s.", true],
  ["A view from the past that we see differently today is that…", "only some people should go to school", ["children should learn", "people should be kind", "families should eat"], "Today all children go to school.", true],
];

const UNIQUE: Q[] = [
  ["Iowa's nickname is the…", "Hawkeye State", ["Sunshine State", "Lone Star State", "Golden State"], "The Iowa Hawkeyes share the name."],
  ["Iowa's state bird is the eastern…", "goldfinch", ["bluebird", "cardinal", "robin"], "It is bright yellow in summer."],
  ["Iowa's state flower is the…", "wild prairie rose", ["tulip", "sunflower", "daisy"], "It grows along roads and prairies."],
  ["Iowa's state tree is the…", "oak", ["palm", "maple", "pine"], "Oaks are strong and live a long time."],
  ["Iowa's state rock looks plain outside but has crystals inside. It is the…", "geode", ["diamond", "marble", "brick"], "Many geodes are found near Keokuk."],
  ["Iowa's flag has red, white and…", "blue", ["green", "purple", "orange"], "The eagle sits on the white stripe."],
  ["Iowa's motto is \"Our liberties we prize and our rights we will…\"", "maintain", ["forget", "sell", "lose"], "The words are on the flag's ribbon."],
  ["The Field of Dreams, a baseball field from a famous movie, is near…", "Dyersville", ["Ames", "Pella", "Sioux City"], "It is in a cornfield."],
  ["The Loess Hills in western Iowa are made of fine dirt carried by…", "the wind", ["ocean waves", "volcanoes", "people"], "They are along the Missouri River."],
  ["Northeast Iowa has steep hills and bluffs because…", "glaciers did not flatten it", ["it is a desert", "it is on the ocean", "it has volcanoes"], "It is called the Driftless Area."],
  ["North central Iowa is very flat because long ago…", "glaciers smoothed the land", ["a volcano erupted", "the ocean dried", "people dug it"], "Ice sheets moved across it."],
  ["Spirit Lake and West Okoboji Lake in northwest Iowa are…", "natural lakes", ["oceans", "rivers", "mountains"], "They are called the Iowa Great Lakes."],
  ["Iowa's most important natural resource for farming is its…", "rich soil", ["gold", "oil", "ocean water"], "It is some of the best soil in the world."],
  ["Iowa grows more corn than…", "any other state", ["no other crop", "the moon", "any city"], "Corn feeds animals and makes fuel."],
  ["Corn can be made into a fuel for cars called…", "ethanol", ["coal", "seawater", "sand"], "Iowa makes more ethanol than any other state."],
  ["Tall wind turbines in Iowa turn wind into…", "electricity", ["rain", "corn", "water"], "Wind makes more than half of Iowa's electricity."],
  ["Long ago, much of Iowa was covered by…", "tall grass prairie", ["ice all year", "sand dunes", "jungle"], "Prairie grass can grow taller than a person."],
  ["Today very little prairie is left because most of it became…", "farmland", ["ocean", "desert", "glaciers"], "Plowing changed the land."],
  ["When heavy rain washes soil off a field, that is called…", "erosion", ["erupting", "freezing", "melting"], "Plants and roots help hold soil."],
  ["Fertilizer that washes from fields into rivers can…", "make the water unsafe", ["make the water cleaner", "turn water to ice", "make fish bigger"], "Farmers plant buffers to help."],
  ["Limestone dug from Iowa quarries is used to make…", "roads and buildings", ["clouds", "candy", "socks"], "It is a strong rock."],
  ["Compared with the flat north, southern Iowa has…", "rolling hills", ["tall mountains", "a beach", "a desert"], "The land rises and falls."],
  ["The highest point in Iowa is…", "Hawkeye Point", ["Mount Everest", "Pikes Peak", "the Capitol dome"], "It is on a farm in northwest Iowa."],
  ["Iowa's lowest point is where the Des Moines River meets the Mississippi near…", "Keokuk", ["Sioux City", "Decorah", "Ames"], "It is in the southeast corner."],
  ["Covered bridges are a famous landmark in…", "Madison County", ["Las Vegas", "the Arctic", "the Sahara"], "Several still stand near Winterset."],
  ["A good way to help Iowa's rivers stay clean is to…", "keep trash and soil out of them", ["dump oil in them", "pour paint in them", "throw cans in them"], "Clean water helps fish and people.", true],
  ["Why do wind farms fit well in Iowa?", "it has open land and strong winds", ["it has no wind", "it is under the ocean", "it has no land"], "Turbines need space and wind.", true],
  ["Draining wetlands for farms gave more cropland but meant fewer…", "homes for ducks and frogs", ["roads", "cities", "tractors"], "Using a resource has costs too.", true],
  ["The Iowa Great Lakes bring visitors, so towns nearby have many jobs in…", "tourism", ["deep sea fishing", "mining gold", "space travel"], "Visitors spend money at shops and hotels.", true],
];

const LEADERS_EXTRA: Q[] = [
  ["Who leads the government of Iowa?", "the governor", ["the mayor of each town", "a judge", "the principal"], "The governor works in Des Moines."],
  ["Iowa's state laws are made by the Iowa Senate and the Iowa…", "House of Representatives", ["Supreme Court", "school board", "State Fair"], "Together they are the General Assembly."],
  ["In an Iowa county, the leaders voters elect to run the county are the…", "board of supervisors", ["school band", "state fair judges", "bus drivers"], "Each county has one."],
  ["In most Iowa cities, voters elect a mayor and a…", "city council", ["king", "team captain", "class pet"], "The council votes on city rules.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "ia-g2-native-nations",
    title: "Iowa's Native Nations",
    emoji: "🌾",
    blurb: "The first peoples of Iowa, long ago and today",
    parentNote: "The Native nations whose homelands are in Iowa (the Ioway, Sauk, Meskwaki, Ho-Chunk, Dakota, Omaha and others): how rivers, prairie and forests shaped their lives, their removal in the 1830s and 1840s, the Meskwaki people's return and purchase of land near Tama in 1857, leaders such as Black Hawk, Keokuk, Wapello, Poweshiek and Mahaska, and the Meskwaki Nation's government, school and code talkers.",
    standards: ["SS.2.6; SS.2.7; SS.2.8; SS.2.9", "how the land shaped Native American cultures in Iowa, life then and now, removal and return, and Native leaders past and present"],
    items: NATIONS,
  }),
  bankUnit({
    id: "ia-g2-iowa-communities",
    title: "Iowa Then & Now",
    emoji: "🏘️",
    blurb: "How Iowa's towns and people have changed",
    parentNote: "How Iowa's communities have changed: statehood in 1846, the capital's move from Iowa City to Des Moines, railroads, farms and machines, Buxton, the 2008 flood and the 2020 derecho, and Iowans such as Herbert Hoover, Grant Wood, Norman Borlaug, George Washington Carver, Carrie Chapman Catt, Amelia Bloomer and Peggy Whitson.",
    standards: ["SS.2.10; SS.2.11; SS.2.12; SS.2.13", "how Iowa's communities have changed, perspectives past and present, the people of the community and state, and significant events in Iowa's history"],
    items: COMMUNITIES,
  }),
  bankUnit({
    id: "ia-g2-iowa-unique",
    title: "What Makes Iowa Iowa",
    emoji: "🌻",
    blurb: "Symbols, landmarks, land and resources",
    parentNote: "Iowa's symbols (the goldfinch, wild prairie rose, oak, geode, flag and motto), landmarks such as the Field of Dreams and the covered bridges of Madison County, its regions (the Loess Hills, the Driftless Area, the flat north and the rolling south), and its natural resources (soil, wind, water and limestone) and what using them costs, such as erosion and lost prairie and wetlands.",
    standards: ["SS.2.15; SS.2.16; SS.2.17", "Iowa's symbols and landmarks, comparing environments across Iowa, and Iowa's natural resources and the consequences of using them"],
    items: UNIQUE,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-who-runs-our-town"),
    {
      id: "ia-g2-who-runs-iowa",
      title: "Who Runs Our Community?",
      emoji: "🏛️",
      blurb: "Mayors, councils, the governor and lawmakers",
      parentNote: "The jobs of elected local and state officials in Iowa: mayors and city councils, county supervisors, the governor and the lawmakers of the General Assembly, judges, and the voters who choose them.",
      standards: ["SS.2.14", "the roles of elected local and state officials"],
    },
    LEADERS_EXTRA,
  ),
];
