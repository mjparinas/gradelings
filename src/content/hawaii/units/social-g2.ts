import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Hawaiʻi Grade 2 social studies: school, community and national leaders and their responsibilities (SS.2.1.6.1) and
// the public goods and services government provides (SS.2.3.11.3), plus copies of California's difference makers
// (SS.2.1.7.2, SS.2.1.18.3), family journeys (SS.2.2.17.2, SS.2.2.18.3) and making and trading (SS.2.3.10.1,
// SS.2.4.16.2) units without their California places, with Hawaiʻi items added.

const LEADERS: Q[] = [
  ["The leader of a school is the…", "principal", ["mayor", "governor", "President"], "The principal helps the whole school run well."],
  ["The leader of the whole state of Hawaiʻi is the…", "governor", ["principal", "mayor", "President"], "Voters in Hawaiʻi choose the governor."],
  ["The leader of the whole United States is the…", "President", ["governor", "mayor", "principal"], "The President works in Washington, D.C."],
  ["Hawaiʻi is divided into counties. Each county is led by a…", "mayor", ["President", "principal", "coach"], "Honolulu, Maui, Kauaʻi and Hawaiʻi counties each have one."],
  ["Hawaiʻi's state capital, where the governor works, is…", "Honolulu", ["Hilo", "Kailua", "Līhuʻe"], "It is on the island of Oʻahu."],
  ["The people who make the laws for the whole state of Hawaiʻi are called the…", "state legislature", ["school board", "lifeguards", "fire department"], "They meet at the State Capitol in Honolulu."],
  ["Who chooses the governor of Hawaiʻi?", "the voters of Hawaiʻi", ["the President", "the principal", "one family"], "Adults vote in elections."],
  ["A good leader…", "listens and helps the group", ["only helps themselves", "never shares", "breaks the rules"], "Leaders have responsibilities."],
  ["One responsibility of a mayor is to…", "help the county run safely", ["teach a 2nd grade class", "fly airplanes", "grow all the food"], "Mayors look after roads, parks and more."],
  ["A public library is a service the government gives so everyone can…", "borrow books for free", ["buy toys", "sell cars", "eat lunch"], "Libraries are for everyone."],
  ["Fire departments, police and lifeguards are public services that keep people…", "safe", ["hungry", "lost", "bored"], "They help everyone in the community."],
  ["Public parks and beach parks are paid for with…", "taxes", ["birthday money", "seashells", "stickers"], "Taxes are money people pay to the government."],
  ["Taxes help pay for public schools, roads and…", "parks", ["video games", "candy", "private toys"], "Public things are for everyone."],
  ["The government builds and fixes roads so people can…", "travel safely", ["swim faster", "grow taller", "sleep longer"], "Roads connect towns."],
  ["The flag of Hawaiʻi has eight stripes, one for each of the eight…", "main islands", ["states", "presidents", "volcanoes"], "The stripes are white, red and blue."],
  ["On the flag of Hawaiʻi, the small flag in the corner is the…", "British Union Jack", ["American flag", "flag of France", "flag of Japan"], "It remembers Hawaiʻi's early friendship with Britain."],
  ["Hawaiʻi's state motto is about…", "the life of the land", ["fast cars", "tall buildings", "snowy winters"], "It is \"Ua Mau ke Ea o ka ʻĀina i ka Pono.\""],
  ["A student council at school is a group of students who…", "help make decisions for the school", ["drive the buses", "cook lunch", "grade tests"], "Classmates choose them by voting."],
  ["The President, the governor and the mayor all make sure people…", "follow the laws", ["eat breakfast", "go to sleep early", "wear hats"], "Leaders carry out the laws.", true],
  ["Hawaiʻi became the 50th state of the United States in…", "1959", ["1776", "1900", "2001"], "That is why Hawaiʻi's star was the last one added.", true],
  ["Hawaiʻi's two United States senators work in…", "Washington, D.C.", ["Hilo", "Kona", "Lānaʻi City"], "They help make the nation's laws.", true],
  ["Clean water from the tap, brought by the county's water department, is a…", "public service", ["toy", "private secret", "kind of weather"], "Many people share it.", true],
  ["If a park's playground is broken, a good first step is to…", "tell a leader who can fix it", ["break it more", "ignore it", "blame a friend"], "Leaders and citizens solve problems together.", true],
  ["Kamehameha I is remembered as the leader who…", "united the Hawaiian Islands under one rule", ["invented the airplane", "was the first President", "built the first school bus"], "June 11 is Kamehameha Day.", true],
  ["Before Hawaiʻi was a state, it was a kingdom led by…", "kings and queens", ["presidents", "principals", "mayors"], "Queen Liliʻuokalani was its last ruling queen.", true],
];

const DIFFERENCE_EXTRA: Q[] = [
  ["Duke Kahanamoku, a champion swimmer from Hawaiʻi, shared the Hawaiian sport of… with the world.", "surfing", ["skiing", "baseball", "hockey"], "He won Olympic medals in swimming too."],
  ["Bernice Pauahi Bishop left her lands to start schools for…", "Hawaiian children", ["sailors only", "farm animals", "grown-ups only"], "Kamehameha Schools came from her gift."],
  ["Queen Liliʻuokalani, Hawaiʻi's last ruling queen, also wrote the famous song…", "Aloha ʻOe", ["Happy Birthday", "Jingle Bells", "Yankee Doodle"], "She wrote many songs."],
  ["Patsy Mink from Hawaiʻi was the first woman of color elected to…", "the United States Congress", ["the moon", "a baseball team", "a cooking show"], "She worked so girls had fair chances in school sports."],
  ["Ellison Onizuka, who grew up in Kona, was the first Asian American…", "astronaut", ["king", "surfer", "pilot of a canoe"], "He flew on the space shuttle."],
  ["Eddie Aikau was a brave lifeguard at Waimea Bay who…", "saved hundreds of swimmers", ["built a bridge", "invented a phone", "wrote a dictionary"], "People still say \"Eddie would go.\"", true],
  ["Daniel Inouye was a World War II hero who later served Hawaiʻi for many years as a…", "United States senator", ["lifeguard", "chef", "train driver"], "He worked in Washington, D.C.", true],
];

const JOURNEYS_EXTRA: Q[] = [
  ["The first people to live in Hawaiʻi came from other Pacific islands by…", "voyaging canoe", ["airplane", "train", "car"], "They sailed thousands of miles."],
  ["Long ago, many families came to Hawaiʻi from Japan, China and the Philippines to work on…", "sugar plantations", ["space stations", "snowy farms", "subways"], "Workers grew and cut sugarcane."],
  ["Today, most people who move to Hawaiʻi arrive by…", "airplane", ["covered wagon", "train", "bus"], "Hawaiʻi is far out in the ocean."],
  ["To find the Philippines on a world map, look in…", "Asia", ["Europe", "Africa", "South America"], "It is a country of many islands."],
  ["A family moves to Hilo to be near their grandparents. Why did they move?", "to be near family", ["to find gold", "to escape the snow", "to visit the moon"], "Families move for many reasons.", true],
  ["Families who came to Hawaiʻi long ago brought foods like rice, noodles and…", "sweet bread", ["snow cones only", "nothing at all", "plastic"], "Many Hawaiʻi foods mix many cultures.", true],
];

const TRADING_EXTRA: Q[] = [
  ["Farmers in Kona, on Hawaiʻi Island, grow a famous crop sold all over the world. It is…", "coffee", ["wheat", "apples", "corn"], "It grows on the slopes of the volcanoes."],
  ["Most of the food sold in Hawaiʻi's stores reaches the islands by…", "ship", ["canoe", "bicycle", "train"], "Big ships bring it across the ocean."],
  ["Fishing boats sell their catch at the fish auction in…", "Honolulu", ["the mountains", "the desert", "the forest"], "Buyers bid on fresh fish early in the morning."],
  ["Macadamia nuts grown in Hawaiʻi are sold in other places. This shows that…", "people in different places trade", ["no one eats nuts", "trade is not allowed", "nuts grow in stores"], "Buyers and sellers depend on each other."],
  ["Long ago in Hawaiʻi, families near the shore traded fish with families up the valley for…", "kalo, or taro", ["phones", "plastic toys", "airplanes"], "Both sides got what they needed.", true],
  ["Bananas, papayas and pineapples grown on a Hawaiʻi farm are goods that are produced…", "locally", ["on the moon", "in the ocean", "nowhere"], "Local means close to home.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "hi-g2-leaders",
    title: "Leaders & Helpers",
    emoji: "🏛️",
    blurb: "Who leads our school, county, state and country",
    parentNote: "The leaders of a school, a county, the state and the nation (principal, mayor, governor, legislature and President) and their responsibilities, the public services taxes pay for (libraries, parks, roads, fire, police and lifeguards), Hawaiʻi's flag and motto, and how Hawaiʻi went from a kingdom to the 50th state.",
    standards: ["SS.2.1.6.1; SS.2.3.11.3", "school, community and national leaders and their responsibilities, and the public goods and services government provides"],
    items: LEADERS,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-difference-makers"),
    {
      id: "hi-g2-difference-makers",
      title: "People Who Made a Difference",
      emoji: "🌟",
      blurb: "Heroes long ago and today",
      parentNote:
        "People from long ago and the recent past whose courage, ideas and hard work made life better, such as Rosa Parks, Harriet Tubman and Sally Ride, and people from Hawaiʻi like Duke Kahanamoku, Bernice Pauahi Bishop, Queen Liliʻuokalani, Patsy Mink, Ellison Onizuka and Eddie Aikau.",
      standards: ["SS.2.1.7.2; SS.2.1.18.3", "how historical figures show shared democratic values, and how significant people have shaped communities"],
    },
    DIFFERENCE_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-family-journeys"),
    {
      id: "hi-g2-family-journeys",
      title: "Family Journeys",
      emoji: "🧳",
      blurb: "Where families came from, and why",
      parentNote:
        "Finding on a world map where a family's ancestors lived, how families traveled long ago and today (from voyaging canoes and plantation-era ships to airplanes), putting those journeys in order, and the reasons people move.",
      standards: ["SS.2.2.17.2; SS.2.2.18.3", "timelines that put historical events in order, and different perspectives on historical events"],
    },
    JOURNEYS_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-making-trading"),
    {
      id: "hi-g2-making-trading",
      title: "Making & Trading",
      emoji: "🧺",
      blurb: "From farm to table",
      parentNote:
        "How food is grown, processed, shipped and sold long ago and today, the work of farmers, fishers, processors, distributors and grocers, and why people trade, with Hawaiʻi examples like Kona coffee, macadamia nuts, the Honolulu fish auction and the food ships bring to the islands.",
      standards: ["SS.2.3.10.1; SS.2.4.16.2", "goods produced locally and globally, and how people rely on local and global resources"],
    },
    TRADING_EXTRA,
  ),
];
