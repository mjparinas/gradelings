import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_3 } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Wyoming Grade 3 social studies, Wyoming communities: past and present settlement patterns, from the Indigenous Tribes
// of Wyoming to the trails, the railroad and today, and the groups people belong to (SS5.5.3, SS5.4.4); Wyoming's
// regions and how the environment shapes how people live (SS5.5.2, SS5.5.4); and needs, wants, money and voting
// (SS5.3.1, SS5.3.4, SS5.1.2) in a copy of California's unit without its California places. World maps and cultures are
// practised with adopted units (see ../plan/social.ts).

const MOVING: Q[] = [
  ["Moving from one place to another to live is called…", "migration", ["vacation", "erosion", "election"], "People migrate within a country or between countries."],
  ["Moving to a new country to live there is called…", "immigration", ["hibernation", "irrigation", "celebration"], "An immigrant comes from another country."],
  ["A push factor is a reason people…", "leave a place", ["move to a place", "stay home", "go on vacation"], "Something pushes them away."],
  ["A pull factor is a reason people…", "move to a place", ["leave a place", "stay asleep", "forget a place"], "Something attracts them."],
  ["Which is a push factor?", "a war or famine at home", ["good jobs nearby", "family already there", "cheap land nearby"], "Hard times make people leave."],
  ["Which is a pull factor?", "good jobs in a new town", ["a flood at home", "a war at home", "no food at home"], "Good things draw people in."],
  ["The Shoshone, Arapaho, Crow, Lakota and other Native nations lived on the land that is now Wyoming…", "long before settlers came", ["only after 1950", "only in cities", "only in winter"], "Their histories here go back thousands of years."],
  ["The Eastern Shoshone and the Northern Arapaho share a reservation in central Wyoming called the…", "Wind River Reservation", ["Yellowstone Reservation", "Great Plains Reservation", "Cheyenne Reservation"], "It is named for the Wind River."],
  ["In the 1840s to 1860s, thousands of families crossed Wyoming in covered wagons on the…", "Oregon, California and Mormon trails", ["subway", "interstate highway", "Panama Canal"], "The trails followed the North Platte and Sweetwater rivers."],
  ["Wagon trains crossed the Rocky Mountains at a wide, gentle pass in Wyoming called…", "South Pass", ["North Gate", "Mount Pass", "River Gap"], "Wagons could roll over it."],
  ["Travelers on the trails carved their names on a big rock near the Sweetwater River called…", "Independence Rock", ["Plymouth Rock", "Devils Rock", "Dinosaur Rock"], "They hoped to reach it by the Fourth of July."],
  ["When the Union Pacific Railroad was built across southern Wyoming in the 1860s, towns grew…", "along the tracks", ["on mountaintops", "under the ground", "only on islands"], "Cheyenne, Laramie and Rock Springs are railroad towns."],
  ["Coal mines near Rock Springs drew workers from many countries, such as…", "China, Italy, Greece and Finland", ["only Wyoming", "the moon", "Antarctica"], "The mines fueled the trains."],
  ["Many families from Mexico came to Wyoming to work in the sugar beet fields of the…", "Bighorn Basin", ["Pacific Ocean", "Arctic", "Sahara"], "Sugar beets grow in irrigated fields."],
  ["Homesteaders moved to Wyoming because the government offered…", "land to farm and ranch", ["free cars", "gold coins", "seaside houses"], "The Homestead Act gave families land if they lived on it and worked it."],
  ["Today, many people move to Wyoming for jobs in…", "energy, ranching and tourism", ["whaling", "rice farming", "coral diving"], "Jobs pull people to a place."],
  ["A person can belong to many groups at once, such as a family, a school, a team and a…", "Tribe or community", ["volcano", "glacier", "comet"], "Groups help give us identity."],
  ["People bring their foods, languages and holidays when they move. This makes a community more…", "diverse", ["empty", "frozen", "silent"], "Many cultures live side by side."],
  ["Why did so many trail families travel in spring?", "to cross the mountains before winter snow", ["to see the leaves change", "to go swimming", "to avoid summer"], "Snow in the mountains could trap wagons.", true],
  ["In 1878, the Northern Arapaho came to live on the Wind River Reservation, which the government had first set aside for the…", "Eastern Shoshone", ["Lakota", "Cheyenne", "Crow"], "The two nations share it today.", true],
  ["Why did the railroad bring more people to Wyoming than the wagon trails did?", "people came to stay and work, not just pass through", ["trains were slower", "the trails were closed by law", "no one rode trains"], "Trail families were headed farther west.", true],
  ["How did the gold rush at South Pass City in the 1860s change the area?", "people rushed in and a town grew quickly", ["the mountains moved", "the river dried up forever", "everyone left Wyoming"], "Gold was a pull factor.", true],
  ["A refugee is someone who…", "had to leave home to be safe", ["moves for a vacation", "never leaves home", "lives in space"], "War and danger push refugees to leave.", true],
  ["Where people settled in Wyoming often depended on water, because…", "people, crops and animals need it", ["water makes gold", "deserts are easy to farm", "towns float"], "Rivers and springs drew settlers.", true],
];

const REGIONS: Q[] = [
  ["Wyoming is shaped like a…", "rectangle", ["triangle", "circle", "star"], "Its borders are straight lines."],
  ["Which state borders Wyoming to the north?", "Montana", ["Colorado", "Utah", "Nebraska"], "Yellowstone reaches into it."],
  ["Which state borders Wyoming to the south?", "Colorado", ["Montana", "Idaho", "South Dakota"], "Cheyenne is close to that border."],
  ["The capital of Wyoming is…", "Cheyenne", ["Casper", "Laramie", "Sheridan"], "It is in the southeast corner of the state."],
  ["The eastern part of Wyoming is flat and grassy land called the…", "Great Plains", ["Great Lakes", "Gulf Coast", "Sonoran Desert"], "Cattle graze on the plains."],
  ["The Wind River Range, the Tetons and the Bighorns are parts of the…", "Rocky Mountains", ["Appalachian Mountains", "Andes", "Alps"], "The Rockies run through western Wyoming."],
  ["The highest point in Wyoming is Gannett Peak, in the…", "Wind River Range", ["Black Hills", "Red Desert", "Great Plains"], "It is about 13,800 feet high."],
  ["Low, wide areas of land between Wyoming's mountain ranges are called…", "basins", ["islands", "bays", "canyons only"], "The Bighorn Basin and the Powder River Basin are two."],
  ["Most of Yellowstone National Park is in the…", "northwest corner of Wyoming", ["southeast corner", "center of Texas", "Pacific Ocean"], "It was the first national park in the world."],
  ["The line along the top of the Rockies where rivers flow either east or west is called the…", "Continental Divide", ["Equator", "Prime Meridian", "Mason-Dixon Line"], "It crosses Wyoming from northwest to south."],
  ["Wyoming has the fewest people of any…", "state", ["country", "planet", "ocean"], "It is big, but not many people live there."],
  ["Much of Wyoming is dry, so many farmers water their fields with…", "irrigation ditches", ["seawater", "snow cones", "bottled water"], "Water comes from rivers and reservoirs."],
  ["Strong winds are common in Wyoming, so many farms and ranches plant rows of trees to…", "block the wind and snow", ["grow bananas", "make it rain", "scare the cattle"], "These are called windbreaks."],
  ["Ranchers in the mountains move their cattle and sheep to high pastures in…", "summer", ["winter", "only at night", "never"], "Grass grows on the mountains in summer."],
  ["Wyoming winters are cold and snowy, so people need…", "warm coats and heated homes", ["sandals all year", "no roofs", "fans only"], "People adjust to the climate."],
  ["Families in Wyoming's mountain towns often work in…", "tourism, skiing and parks", ["whaling", "rice farming", "fishing at sea"], "Visitors come for the mountains."],
  ["Towns in the Powder River Basin, such as Gillette, grew because of…", "coal mining", ["banana farms", "ocean ports", "volcano tours"], "The land has huge coal beds."],
  ["On a map, the compass rose shows…", "directions", ["the weather", "the population", "the time"], "N, S, E and W."],
  ["On a map, the legend or key explains…", "what the symbols mean", ["who drew the map", "how old the map is", "the price of the map"], "A star might stand for a capital."],
  ["A map's scale helps you find…", "how far apart places are", ["what people eat", "how warm it is", "what year it is"], "One inch might stand for 50 miles."],
  ["Why do fewer people live in Wyoming's high mountains than in its valleys and towns?", "the land is steep and winters are long", ["it is against the law", "there is no air", "it is under the ocean"], "Land and climate shape where people live.", true],
  ["Rivers on the east side of the Continental Divide in Wyoming, like the North Platte, flow toward the…", "Mississippi River", ["Pacific Ocean", "Arctic Ocean", "Great Salt Lake"], "The Green River on the west side flows toward the Pacific.", true],
  ["Wyoming's Red Desert is in a basin where rain that falls never reaches an ocean. It is the…", "Great Divide Basin", ["Bighorn Basin", "Powder River Basin", "Wind River Basin"], "The Continental Divide splits around it.", true],
  ["How does the dry climate of the basins help sheep and cattle ranching?", "the short grass is good grazing land", ["it grows rice", "it makes the animals swim", "it stops all plants"], "Ranching fits dry grassland.", true],
  ["Why are most of Wyoming's big towns along rivers, railroads or highways?", "water and travel helped them grow", ["they were dropped from the sky", "mountains moved them", "they are all new"], "People settle where they can live and trade.", true],
];

const MONEY_EXTRA: Q[] = [
  ["Wyoming does not collect a state income tax. Much of the state's money comes from…", "taxes on coal, oil and gas taken from the land", ["lemonade stands", "library fines only", "bake sales"], "Minerals help pay for Wyoming's schools."],
  ["In Wyoming, voters choose the members of the town or city…", "council", ["zoo", "rodeo", "orchestra"], "The council makes local rules."],
  ["A rancher saves money in a bank so she can buy a new tractor next year. She is…", "saving for a goal", ["spending it all now", "borrowing from a friend", "trading cattle for candy"], "Saving means keeping money for later.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "wy-g3-people-on-the-move",
    title: "People on the Move",
    emoji: "🧳",
    blurb: "Why people came to Wyoming, long ago and today",
    parentNote: "Migration and settlement in Wyoming: push and pull factors, the Native nations whose homelands are here and the Eastern Shoshone and Northern Arapaho on the Wind River Reservation, the Oregon, California and Mormon trails over South Pass and past Independence Rock, the Union Pacific railroad towns, miners from many countries in Rock Springs, homesteaders, sugar beet workers, today's newcomers, and the groups a person belongs to. Indigenous content is in the present tense and kept light.",
    standards: ["SS5.5.3; SS5.4.4; SS5.4.1", "past and present settlement patterns, including the Indigenous Tribes of Wyoming and the Oregon Trail, the groups a person belongs to, and how small changes led to big changes"],
    items: MOVING,
  }),
  bankUnit({
    id: "wy-g3-regions",
    title: "Wyoming's Regions",
    emoji: "🏔️",
    blurb: "Plains, mountains, basins and Yellowstone",
    parentNote: "Wyoming's regions (the Great Plains in the east, the Rocky Mountain ranges, the basins between them and the Yellowstone country), its neighbors and capital, the Continental Divide and the Great Divide Basin, reading maps, and how Wyoming's dry, windy, snowy climate shapes how people live and work, from irrigation and windbreaks to ranching, coal and tourism.",
    standards: ["SS5.5.2; SS5.5.4; SS5.5.1", "how physical features shape regions, how the environment influences people in Wyoming and how they adjust to it, and using maps"],
    items: REGIONS,
  }),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-money-and-voting"),
    {
      id: "wy-g3-money-and-voting",
      title: "Money, Taxes & Voting",
      emoji: "🏦",
      blurb: "Resources, choices and taking part",
      parentNote:
        "Natural, human and capital resources, needs and wants, saving and spending, trade-offs and opportunity cost, how taxes pay for services, and how citizens vote and take part, with Wyoming examples such as the mineral taxes that help pay for schools and voting for the town council.",
      standards: ["SS5.3.1; SS5.3.4; SS5.1.2", "needs, wants, scarcity and choice, money, saving and budgeting, and local and state political processes such as voting"],
    },
    MONEY_EXTRA,
  ),
];
