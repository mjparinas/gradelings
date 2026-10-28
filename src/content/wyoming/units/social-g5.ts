import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Wyoming Grade 5 social studies: the trails, the Pony Express, the telegraph and the railroad that crossed Wyoming,
// how one technology grew into the next (SS5.4.2), how small changes led to big ones (SS5.4.1), and how the people who
// came changed the human features of the land (SS5.5.3). The Shoshone, Arapaho, Lakota and Cheyenne appear as nations
// whose lands the trails crossed, kept in the present tense where they are today. The rest of the grade (exploration,
// the colonies, the Revolution and the Constitution) is practised with adopted units (see ../plan/social.ts).

const TRAILS: Q[] = [
  ["The low, wide crossing of the Rocky Mountains that wagons used in Wyoming is called…", "South Pass", ["Grand Pass", "Snake Gate", "Glacier Gap"], "It let wagons cross the Continental Divide."],
  ["The trail that carried families west through Wyoming toward the Pacific coast was the…", "Oregon Trail", ["Silk Road", "Appian Way", "Route 66"], "Hundreds of thousands of people used it in the 1840s to 1860s."],
  ["Travelers hoped to reach Independence Rock by July 4th so they would…", "cross the mountains before winter snow", ["see fireworks", "find gold there", "catch a train"], "Late wagons could be trapped by snow."],
  ["Travelers carved their names on Independence Rock, so people call it the…", "Register of the Desert", ["Rock of Kings", "Stone of Gold", "Wall of Rivers"], "Thousands of names are still there."],
  ["Fort Laramie began as a fur trading post and later became an army post where travelers could…", "rest, trade and fix wagons", ["catch a plane", "buy cars", "see movies"], "It sits near the North Platte River."],
  ["Jim Bridger, a mountain man and guide, built a trading post in southwest Wyoming called…", "Fort Bridger", ["Fort Knox", "Fort Sumter", "Fort Worth"], "Wagon trains stopped there for supplies."],
  ["Most pioneer families carried their things across Wyoming in…", "covered wagons pulled by oxen or mules", ["trucks", "trains", "hot air balloons"], "Many people walked beside the wagon."],
  ["Near Guernsey, you can still see deep grooves in the rock made by…", "thousands of wagon wheels", ["glaciers", "dinosaurs", "cars"], "They are called the wagon ruts."],
  ["The Pony Express carried mail across the West in 1860 and 1861 by…", "riders on fast horses changing at stations", ["steam trains", "airplanes", "boats on the river"], "A letter crossed the West in about ten days."],
  ["The Pony Express ended in 1861 because a faster way to send messages was finished. It was the…", "telegraph", ["telephone", "radio", "email"], "Messages traveled as electric signals on wires."],
  ["The telegraph sent messages in a code of dots and dashes called…", "Morse code", ["Braille", "sign language", "emoji"], "Samuel Morse helped invent it."],
  ["Which list shows how sending messages changed over time, oldest first?", "Pony Express, telegraph, telephone, email", ["email, telephone, telegraph, Pony Express", "telephone, Pony Express, email, telegraph", "telegraph, email, Pony Express, telephone"], "Each tool grew out of an older one."],
  ["The Union Pacific Railroad crossed southern Wyoming in…", "1867 and 1868", ["1776", "1920", "1990"], "It was part of the first railroad across the country."],
  ["Which Wyoming city began as a railroad town in 1867?", "Cheyenne", ["Jackson", "Cody", "Sheridan"], "It became the capital."],
  ["Laramie, Rawlins, Rock Springs and Evanston all grew up along the…", "railroad", ["Pacific Ocean", "Mississippi River", "Great Lakes"], "Towns grew where trains stopped."],
  ["Coal mines near Rock Springs supplied coal to…", "fuel the railroad's steam engines", ["heat ice rinks only", "make glass", "feed cattle"], "Steam engines burned coal."],
  ["The railroad helped Wyoming's ranchers by…", "shipping cattle to markets back East", ["growing grass", "building fences", "taming horses"], "Cattle could reach cities quickly."],
  ["The Homestead Act of 1862 offered families free land if they…", "lived on it and farmed it for five years", ["paid in gold", "moved to a city", "left after a year"], "Many homesteaders came to Wyoming."],
  ["Wagon trains, the Pony Express and the railroad all crossed lands that were home to…", "the Shoshone, Arapaho, Lakota and Cheyenne", ["no one at all", "only fur traders", "only soldiers"], "These nations lived here long before the trails."],
  ["Wagon trains and hunters killed so many bison that Plains nations…", "lost a main source of food and materials", ["got more food", "moved to the ocean", "stopped trading"], "One change led to many others."],
  ["Spanish settlers brought horses to North America. For Plains nations, horses…", "made hunting and travel much easier", ["were never used", "replaced tipis", "made trade harder"], "A small change can lead to big changes.", true],
  ["Wyoming became a territory in 1868, soon after the railroad came, because…", "more people had arrived along the line", ["gold was found in Cheyenne", "the trails had closed", "a volcano erupted"], "Cause and effect: the railroad brought settlers.", true],
  ["The Bozeman Trail cut through the Powder River country, a hunting ground of the Lakota, Cheyenne and Arapaho. Their resistance led the army to…", "close the trail in 1868", ["build a city there", "make it a highway", "open more forts"], "The Fort Laramie Treaty of 1868 closed it.", true],
  ["A traveler's diary from 1852 describing South Pass is a…", "primary source", ["secondary source", "fiction story", "weather forecast"], "It was written by someone who was there.", true],
  ["Why did so many trails cross Wyoming through the same places?", "rivers gave water and South Pass gave an easy crossing", ["the mountains were taller there", "there were no rivers", "it was the hottest route"], "Physical features shape where people travel.", true],
  ["Today, Interstate 80 crosses southern Wyoming close to the route of the…", "Union Pacific Railroad and the Overland Trail", ["Yellowstone River", "Pony Express only", "Bighorn Mountains"], "New roads often follow old routes.", true],
  ["How did the railroad change who lived in Wyoming?", "workers came from many countries to build it and mine coal", ["everyone moved away", "only soldiers lived there", "nothing changed"], "Rock Springs had dozens of nationalities.", true],
  ["Many pioneers pulled handcarts instead of wagons because handcarts were…", "cheaper", ["faster than trains", "pulled by horses", "made of iron"], "Families pushed and pulled them by hand.", true],
];

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "wy-g5-trails-west",
    title: "Trails West",
    emoji: "🐂",
    blurb: "Wagons, the Pony Express and the railroad",
    parentNote: "How the trails, the Pony Express, the telegraph and the Union Pacific Railroad crossed Wyoming: South Pass, Independence Rock, Fort Laramie and Fort Bridger, how messages went from horses to wires to phones, the railroad towns and coal mines, the Homestead Act, and how these changes affected the Shoshone, Arapaho, Lakota and Cheyenne whose lands they crossed.",
    standards: ["SS5.4.1; SS5.4.2; SS5.5.3", "how small changes lead to big changes, how one tool or technology grows into another, and the human features the trails and the railroad brought to Wyoming"],
    items: TRAILS,
  }),
];
