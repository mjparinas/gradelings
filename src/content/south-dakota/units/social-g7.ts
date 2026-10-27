import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Dakota Grade 7 social studies: Native American peoples of North America before Europeans arrived, centered on
// the Oceti Sakowin Oyate and the other Nations of South Dakota (7.SS.3), and South Dakota's geography: its landforms,
// lakes, rivers, regions, landmarks and the nine reservations of the Oceti Sakowin Oyate today (7.SS.2).

const OCETI_SAKOWIN: Q[] = [
  ["Oceti Sakowin means the Seven Council Fires, the seven related groups of the…", "Dakota, Nakota and Lakota peoples", ["Aztec and Maya", "Mandan and Hidatsa", "Ancestral Pueblo"], "Oyate means the people or nation."],
  ["The Lakota, the westernmost of the Oceti Sakowin, are also called the…", "Titunwan (Teton)", ["Ihanktonwan (Yankton)", "Sisseton", "Hopewell"], "Titunwan means dwellers on the prairie."],
  ["The Ihanktonwan (Yankton) and Ihanktonwana (Yanktonai) are usually grouped as the…", "Nakota", ["Lakota", "Arikara", "Inca"], "They lived between the Dakota and the Lakota."],
  ["In the Oceti Sakowin, kinship means that…", "relatives have duties to care for and respect one another", ["only parents raise children", "families never share", "people live alone"], "Kinship ties hold the community together."],
  ["Before horses arrived, people on the plains moved their belongings using dogs pulling a frame of poles called a…", "travois", ["wagon", "sled with runners", "canoe"], "Later, horses pulled bigger travois."],
  ["Horses spread to the northern plains in the 1700s. This changed Lakota life by…", "making bison hunting and travel faster", ["ending trade", "stopping all farming everywhere", "making people stay in one place"], "Horses could carry far more than dogs."],
  ["The Sahnish (Arikara) and Mandan lived in villages of round…", "earth lodges", ["stone pyramids", "cliff houses", "longhouses of bark"], "They farmed corn, beans and squash along the Missouri."],
  ["A wacipi, or powwow, held by many communities today, is a public gathering with…", "singing, drumming and dancing", ["only car races", "a rodeo only", "silence"], "Many families travel to take part."],
  ["Lakota winter counts recorded history by…", "drawing one picture for each year's most important event", ["writing long books", "carving faces on mountains", "building towers"], "Keepers explained what each picture meant."],
  ["Today, the Lakota, Dakota and Nakota languages are…", "spoken and taught in schools and communities", ["no longer spoken anywhere", "written only in Latin", "the same as English"], "Many programs teach young people the language."],
  ["The Ancestral Pueblo people of the Southwest built homes of stone and adobe, some in…", "cliffs", ["ice", "trees", "boats"], "They farmed in a dry land."],
  ["The Hopewell people of the Ohio River valley are known for building large…", "earthen mounds", ["stone pyramids", "steel bridges", "ships"], "They traded over long distances."],
  ["The Aztec built their capital, Tenochtitlan, on an island in a lake in…", "Mexico", ["Peru", "South Dakota", "Egypt"], "Today Mexico City stands there."],
  ["The Maya of Central America developed a calendar and a system of…", "writing", ["railroads", "steam engines", "printing presses"], "They carved writing into stone."],
  ["The Inca built a huge empire with stone roads in the…", "Andes Mountains", ["Black Hills", "Appalachian Mountains", "Great Plains"], "Machu Picchu is an Inca city."],
  ["Many scientists think the first people came to the Americas across a land bridge from…", "Asia", ["Europe", "Africa", "Australia"], "The bridge connected Siberia and Alaska during the Ice Age."],
  ["Indigenous means…", "the first people to live in a place", ["people who just arrived", "people who live in cities", "people from Europe"], "Indigenous peoples have lived here for thousands of years."],
  ["Which word describes life in the countryside, on farms and ranches?", "rural", ["urban", "suburban", "indigenous"], "Much of South Dakota is rural.", true],
  ["A town of homes just outside a big city is…", "suburban", ["rural", "urban", "indigenous"], "Sub means near or under.", true],
  ["Which Nations lived on the plains near the Black Hills before Europeans arrived, along with the Lakota?", "the Cheyenne, Crow and Arapaho", ["the Aztec and Inca", "the Maya", "the Hopewell"], "The Black Hills were important to many Nations.", true],
  ["How did the lives of the Lakota and the Sahnish (Arikara) differ?", "the Lakota followed the bison; the Arikara farmed in villages", ["only the Arikara used bison", "the Lakota lived in cliff houses", "they lived on different continents"], "Compare where they lived and how they got food.", true],
  ["Why did plains Nations trade with the earth lodge villages on the Missouri?", "to exchange bison goods for corn and other crops", ["to buy steamboats", "to sell gold", "to get iron tools from China"], "Each group had what the other needed.", true],
  ["The Black Hills are called He Sapa in Lakota. For many Lakota people they are…", "deeply important to their history and identity", ["a place they never knew", "only a gold mine", "a new city"], "The Black Hills are central to Lakota history.", true],
  ["Why is it wrong to say that all Native American Nations lived the same way?", "each Nation had its own language, land and way of life", ["they all lived in tipis", "they all lived by the ocean", "they all farmed corn"], "There are hundreds of distinct Nations.", true],
  ["Which statement about the Oceti Sakowin today is true?", "their Nations govern their own reservations in South Dakota", ["they live only in the past", "they have no governments", "they all moved to Europe"], "These Nations are living communities.", true],
];

const GEOGRAPHY: Q[] = [
  ["The highest point in South Dakota, in the Black Hills, is…", "Black Elk Peak", ["Bear Butte", "Mount Rushmore", "Thunder Butte"], "It is about 7,240 feet high."],
  ["The largest lake in South Dakota, formed behind a dam near Pierre, is…", "Lake Oahe", ["Lake Francis Case", "Lewis and Clark Lake", "Big Stone Lake"], "It stretches north into North Dakota."],
  ["Lewis and Clark Lake on the Missouri River is near the city of…", "Yankton", ["Rapid City", "Aberdeen", "Deadwood"], "It sits behind Gavins Point Dam."],
  ["Lake Francis Case is a reservoir behind Fort Randall Dam on the…", "Missouri River", ["James River", "Belle Fourche River", "White River"], "There are four big dams on the Missouri in South Dakota."],
  ["Which river flows through the Badlands and gets its name from its pale, chalky water?", "White River", ["Big Sioux River", "James River", "Belle Fourche River"], "Clay and sand color the water."],
  ["The Cheyenne and Belle Fourche Rivers flow around the northern and southern sides of the…", "Black Hills", ["Coteau des Prairies", "James River Valley", "Great Lakes"], "Both drain into the Missouri."],
  ["A national park in the southern Black Hills known for its huge, maze-like cave is…", "Wind Cave National Park", ["Badlands National Park", "Custer State Park", "Mount Rushmore"], "Air blows in and out of the cave's entrance."],
  ["A state park known for its large herd of bison and its Needles Highway is…", "Custer State Park", ["Wind Cave National Park", "Badlands National Park", "Homestake Mine"], "Each fall cowboys round up the herd."],
  ["A huge carving in progress in the Black Hills shows the Lakota leader…", "Crazy Horse", ["Sitting Bull", "Red Cloud", "Black Elk"], "Work began on it in 1948."],
  ["The old gold mine at Lead that is now a science laboratory deep underground is the…", "Homestake Mine", ["Wind Cave", "Badlands Mine", "Pierre Mine"], "Scientists study tiny particles there."],
  ["The land east of the Missouri that glaciers covered and flattened is called the…", "Drift Prairie", ["Black Hills", "Badlands", "Missouri Plateau"], "Glacial drift is the rock and soil glaciers leave behind."],
  ["The rolling land in the southeast corner of South Dakota, cut by streams, is the…", "Dissected Till Plains", ["Badlands", "Black Hills", "Coteau des Prairies"], "Streams have cut into the glacial till."],
  ["South Dakota's nine Tribal Nations are peoples of the…", "Oceti Sakowin Oyate", ["Aztec Empire", "Inca Empire", "Hopewell"], "They are the Dakota, Nakota and Lakota."],
  ["The Pine Ridge Reservation is the home of the…", "Oglala Sioux Tribe", ["Yankton Sioux Tribe", "Flandreau Santee Sioux Tribe", "Crow Creek Sioux Tribe"], "Oglala is one of the seven Lakota bands."],
  ["The Rosebud Reservation is the home of the…", "Rosebud Sioux Tribe (Sicangu Lakota)", ["Oglala Sioux Tribe", "Standing Rock Sioux Tribe", "Sisseton Wahpeton Oyate"], "Sicangu means burnt thighs."],
  ["The reservation that crosses the border into North Dakota is…", "Standing Rock", ["Pine Ridge", "Lower Brule", "Flandreau"], "It is home to Lakota and Dakota people."],
  ["The Sisseton Wahpeton Oyate's reservation is in the… corner of South Dakota.", "northeast", ["southwest", "Black Hills", "southeast"], "It is called Lake Traverse."],
  ["Which two reservations lie across the Missouri River from each other near Chamberlain?", "Crow Creek and Lower Brule", ["Pine Ridge and Rosebud", "Standing Rock and Cheyenne River", "Yankton and Flandreau"], "The river runs between them.", true],
  ["St. Louis grew because it is where two great rivers meet: the Missouri and the…", "Mississippi", ["Ohio", "Hudson", "Columbia"], "The Missouri flows into the Mississippi just above St. Louis.", true],
  ["Minneapolis, the nearest big city to eastern South Dakota, is in…", "Minnesota", ["Iowa", "Nebraska", "Wisconsin"], "It is on the Mississippi River.", true],
  ["Compared with New England, South Dakota has…", "drier land, fewer trees and colder winters", ["a long ocean coast", "more big cities", "warmer winters"], "South Dakota is far from any ocean.", true],
  ["Why were four large dams built on the Missouri River in South Dakota?", "for flood control, electricity and water storage", ["to find gold", "to make the river saltier", "to stop steamboats"], "They were built from the 1940s to the 1960s.", true],
  ["The dams on the Missouri flooded river bottomland where many…", "Tribal communities had their homes and farms", ["cities had skyscrapers", "gold mines were", "deserts were"], "Several reservations lost good land and towns.", true],
  ["The Traverse Gap in the far northeast is a continental divide: water to its north flows toward…", "Hudson Bay", ["the Gulf of Mexico", "the Pacific Ocean", "Lake Oahe"], "Water to its south flows to the Mississippi.", true],
  ["South Dakota's State Capitol in Pierre is near the geographic center of the state, beside the…", "Missouri River", ["Big Sioux River", "Black Hills", "Badlands"], "Pierre is in the middle of the state.", true],
];

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "sd-g7-oceti-sakowin",
    title: "Peoples Before Contact",
    emoji: "🌄",
    blurb: "The Oceti Sakowin and the Nations of North America",
    parentNote:
      "Native American peoples of North America before Europeans arrived: the Ancestral Pueblo, Hopewell, Aztec, Maya and Inca, the land bridge, and the Nations of South Dakota, especially the Oceti Sakowin Oyate (the Dakota, Nakota and Lakota) and the Sahnish (Arikara), with kinship, travel, trade, winter counts and the wacipi, and the reminder that these Nations are living communities today.",
    standards: ["7.SS.3", "Native American peoples of North America before Europeans arrived, including the Oceti Sakowin Oyate and South Dakota's Nations"],
    items: OCETI_SAKOWIN,
  }),
  bankUnit({
    id: "sd-g7-south-dakota-geography",
    title: "South Dakota's Land & Lakes",
    emoji: "🏞️",
    blurb: "Landforms, rivers, landmarks and reservations",
    parentNote:
      "South Dakota's geography: Black Elk Peak, the Black Hills and their rivers, the Missouri River's lakes (Oahe, Francis Case and Lewis and Clark), the Drift Prairie and Dissected Till Plains, landmarks such as Wind Cave, Custer State Park, the Crazy Horse Memorial and the Homestake Mine, the nine reservations of the Oceti Sakowin Oyate, and how the state compares with other regions.",
    standards: ["7.SS.2", "the geographic features, regions, cities, landmarks and reservations of South Dakota, and America's regions compared with South Dakota"],
    items: GEOGRAPHY,
  }),
];
