import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Vermont Grade 7 social studies, the United States and Vermont from Reconstruction to the civil rights movement:
// Vermont's part in that story, from farms emptying after the Civil War and the stoneworkers and mill hands who came to
// Barre and Winooski (D2.His.1.6-8, D2.Geo.8.6-8), the 1927 flood, the Depression and the Civilian Conservation Corps
// (D2.His.14.6-8, D2.Geo.9.6-8), women's suffrage and Vermont's leaders (D2.His.3.6-8, D2.Civ.14.6-8), to skiing, the
// interstates and Act 250 (D2.Geo.11.6-8, D2.Civ.13.6-8). The national story is practised with adopted units (see
// ../plan/social.ts).

const MODERN: Q[] = [
  ["After the Civil War, many Vermont hill farms were left empty because families…", "moved west or to cities for better land and jobs", ["moved to the moon", "were not allowed to farm", "all became sailors"], "Rocky hillsides were hard to farm."],
  ["In the late 1800s, stone carvers from Italy and Scotland came to Barre to work in its…", "granite sheds and quarries", ["gold mines", "rice fields", "oil wells"], "Barre became the granite center of the country."],
  ["Many Barre stoneworkers became sick from breathing…", "granite dust", ["sea air", "smoke from volcanoes", "pollen"], "The lung disease is called silicosis."],
  ["In 1900, Italian immigrant workers in Barre built a hall where they met to talk about…", "workers' rights and politics", ["sports only", "ship schedules", "the weather"], "It is now called the Old Labor Hall."],
  ["Many French Canadian families came to work in the woolen mills of…", "Winooski", ["Rutland's marble quarries only", "Montpelier's State House", "Bennington's monument"], "The mills were beside the Winooski River falls."],
  ["As fewer sheep were raised, most Vermont farmers turned to…", "dairy farming", ["cotton farming", "cattle ranching on the plains", "growing oranges"], "Trains carried Vermont milk and butter to Boston and New York."],
  ["Into the 1960s, Vermont had more of these than people:", "dairy cows", ["horses", "sheep", "moose"], "Dairy was the heart of Vermont farming."],
  ["In November 1927, heavy rain caused Vermont's worst natural disaster, the…", "Great Flood", ["Great Fire", "Great Drought", "Great Earthquake"], "Rivers washed away bridges, roads and homes."],
  ["After the 1927 flood, workers in the 1930s built dams near Waterbury and East Barre to…", "control future floods", ["make the rivers saltier", "stop people from fishing", "drain Lake Champlain"], "Flood-control dams hold back high water."],
  ["During the Great Depression, young men in the Civilian Conservation Corps built Vermont's…", "state parks, trails and flood-control dams", ["first railroads", "ocean ports", "colonial forts"], "The CCC was part of the New Deal."],
  ["CCC workers cut some of the first ski trails on…", "Mount Mansfield", ["Mount Everest", "the Long Island coast", "Lake Champlain's islands"], "Stowe became a famous ski town."],
  ["In 1936, Vermont was one of only two states that voted against President Franklin Roosevelt. The other was…", "Maine", ["New Hampshire", "New York", "Massachusetts"], "People said, \"As Maine goes, so goes Vermont.\""],
  ["Vermont's governor refused to call lawmakers back in 1920 to approve the 19th Amendment, which gave women…", "the right to vote", ["the right to own land", "free college", "jobs in the mills"], "Vermont approved it in 1921, after it was already law."],
  ["In 1954, Consuelo Northrop Bailey of Vermont became the first woman in the country elected…", "lieutenant governor", ["President", "Chief Justice", "mayor of New York"], "She took office in 1955."],
  ["George Aiken served Vermont as governor and then as a US senator for 34 years. He was known for…", "speaking plainly and working with both parties", ["never voting", "living abroad", "running a ship company"], "He was a Republican who often worked across party lines."],
  ["In 1940, Stowe opened one of the first chairlifts in the country. Skiing helped Vermont's economy grow through…", "tourism", ["oil drilling", "gold mining", "cotton farming"], "Visitors came in winter as well as summer."],
  ["Interstates 89 and 91, built in the 1960s and 1970s, made it easier for…", "visitors and new residents to reach Vermont", ["ships to sail to Montpelier", "farmers to grow cotton", "trains to fly"], "Vermont's population grew after they opened."],
  ["In 1968, Vermont passed a law banning…", "billboards along its roads", ["skiing", "dairy farming", "town meetings"], "Vermonters wanted to protect the views of the countryside."],
  ["In 1970, Vermont passed Act 250, which requires big building projects to…", "get a permit that considers the effects on land, water and towns", ["be built on mountaintops", "pay no taxes", "be finished in a day"], "It was a response to fast growth after the interstates."],
  ["The 1938 hurricane that crossed New England knocked down millions of…", "trees in Vermont's forests", ["houses in Florida", "bridges in California", "castles in Europe"], "Loggers spent years clearing the damage."],
  ["Why did Vermont's dairy farms grow bigger and fewer during the 1900s?", "new machines and milk rules favored larger farms", ["cows stopped giving milk", "the state banned small farms", "milk was no longer sold"], "Technology changed farming.", true],
  ["Why did granite workers in Barre form unions?", "to push for safer work, fair pay and shorter hours", ["to stop all work forever", "to move the quarries", "to sell the town"], "Workers joined together to have a stronger voice.", true],
  ["After the 1927 flood washed out railroads and roads, many Vermonters relied more on…", "cars and new highways", ["canals", "horse-drawn ships", "airships"], "The flood sped up the change to roads.", true],
  ["A historian who wants to know how the 1927 flood felt to Vermonters would get the best primary source from…", "a diary or letter written by someone who lived through it", ["a movie made in 2020", "a modern textbook summary", "a weather app"], "Primary sources come from the time.", true],
  ["Why was Act 250 called a response to growth?", "new roads brought fast building that worried many Vermonters", ["no one was building anything", "the population was falling fast", "the state wanted more billboards"], "Laws answer public problems.", true],
  ["Comparing Vermont in 1870 and in 1970, which changed the most?", "how people traveled and earned a living", ["the location of the Green Mountains", "the shape of Lake Champlain", "the name of the state"], "Physical features change slowly; ways of life change faster.", true],
];

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "vt-g7-modern-vermont",
    title: "Vermont, 1865 to 1970",
    emoji: "🚂",
    blurb: "Stoneworkers, floods, ski trails and Act 250",
    parentNote: "Vermont from the Civil War to 1970: empty hill farms and the move to dairy, Italian and Scottish stoneworkers in Barre and French Canadian mill workers in Winooski, silicosis and unions, the 1927 flood and the 1938 hurricane, the Depression and the Civilian Conservation Corps, women's suffrage and leaders such as Consuelo Northrop Bailey and George Aiken, skiing and the interstates, the billboard ban and Act 250.",
    standards: ["D2.His.1.6-8; D2.His.14.6-8; D2.Geo.9.6-8; D2.Civ.13.6-8", "the context of events, causes and effects, how catastrophic events affect settlement, and how policies address public problems"],
    items: MODERN,
  }),
];
