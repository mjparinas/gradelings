import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Montana Grade 2 social studies: the twelve Tribal Nations of Montana and their people today (SS.H.2.2), the seven
// reservations on a map of Montana (SS.G.2.1), the people who help govern Tribal communities (SS.CG.2.1), and oral
// histories as a source (SS.H.2.3). Questions speak of living communities, in the present tense, and never treat the
// Nations as one.

const TRIBAL_NATIONS: Q[] = [
  ["How many Tribal Nations are in Montana today?", "twelve", ["two", "fifty"], "Each one has its own history and government."],
  ["Land that a Tribal Nation governs is called a…", "reservation", ["state park", "county fair"], "Montana has seven of them."],
  ["How many Indian reservations are in Montana?", "seven", ["one", "forty"], "Some reservations are home to more than one Nation."],
  ["The Blackfeet Reservation sits right next to which national park?", "Glacier National Park", ["a park by the ocean", "a park in a desert"], "It is in the mountains of northwest Montana."],
  ["The Crow Reservation is in which part of Montana?", "the south", ["the far northwest", "the northeast corner"], "It reaches the Wyoming border."],
  ["The Flathead Reservation is near which big lake?", "Flathead Lake", ["Lake Superior", "the Great Salt Lake"], "The lake shares the reservation's name."],
  ["The Fort Peck Reservation is in which part of Montana?", "the northeast", ["the southwest", "the far west"], "The Missouri River runs along its south edge."],
  ["On a map, the edge of a reservation is shown with a…", "border line", ["compass rose", "scale bar"], "Lines show where one place ends and another starts."],
  ["Many Tribal Nations in Montana are led by an elected…", "tribal council", ["king", "school principal"], "Tribal members vote for council members."],
  ["A tribal council helps its Nation by…", "making laws and decisions for the community", ["running the whole country", "choosing the weather"], "It is like a city council for the Nation."],
  ["Tribal governments run services like…", "health clinics, police and schools", ["the US Army", "the Moon landing"], "They help the people who live there."],
  ["Each Tribal Nation in Montana has its own…", "history, language and government", ["copy of the same story", "ocean"], "The Nations are not all the same."],
  ["People from Montana's Tribal Nations work today as…", "teachers, nurses, ranchers and lawmakers", ["only in the past", "only on television"], "Tribal people are part of modern life everywhere."],
  ["Montana has tribal colleges, run by Tribal Nations, where people…", "study for jobs and learn their Nation's language", ["only play sports", "only buy groceries"], "Salish Kootenai College is one of them."],
  ["An oral history is a story of the past that is…", "told out loud and passed down", ["only written in a textbook", "made up yesterday"], "Oral means spoken."],
  ["An elder telling children about their family long ago is sharing…", "an oral history", ["a weather report", "a recipe card"], "Elders keep and share a Nation's history."],
  ["A photograph from 100 years ago is a kind of historical…", "source", ["map key", "holiday"], "Sources help us learn about the past."],
  ["A good way to learn a Tribal Nation's history is to listen to…", "people from that Nation", ["someone who has never met them", "a cartoon"], "People tell their own history best."],
  ["Montana's Indian Education for All law means every student learns about…", "Montana's Tribal Nations", ["only other countries", "only dinosaurs"], "It is part of the Montana Constitution."],
  ["Many Tribal Nations in Montana teach their languages in…", "schools and language classes", ["no places at all", "outer space"], "Young people learn from fluent speakers."],
  ["Lame Deer is the main town of which reservation?", "Northern Cheyenne", ["Blackfeet", "Fort Peck"], "It is next to the Crow Reservation.", true],
  ["Browning is the main town of which reservation?", "Blackfeet", ["Crow", "Flathead"], "It is east of Glacier National Park.", true],
  ["The Flathead Reservation is home to the Salish, the Pend d'Oreille and the…", "Kootenai", ["Crow", "Cree"], "Together they are the Confederated Salish and Kootenai Tribes.", true],
  ["The Fort Peck Reservation is home to the Assiniboine and the…", "Sioux", ["Kootenai", "Crow"], "Two Nations share this reservation.", true],
  ["Rocky Boy's Reservation, near Havre, is home to the Chippewa and the…", "Cree", ["Salish", "Northern Cheyenne"], "It is named for Chief Stone Child, whose name was turned into English as Rocky Boy.", true],
  ["Fort Belknap is home to the Gros Ventre (A'aninin) and the…", "Assiniboine (Nakoda)", ["Crow (Apsáalooke)", "Kootenai (Ksanka)"], "Two Nations share Fort Belknap.", true],
  ["The Little Shell Chippewa Tribe was recognized by the United States in 2019. Does it have a reservation?", "no, its people live in many towns", ["yes, the biggest one", "yes, in the ocean"], "It is the twelfth Tribal Nation in Montana.", true],
  ["Why might two people tell the same event in different ways?", "they saw it from different sides", ["one of them is always lying", "stories never change"], "Point of view shapes a story.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "mt-g2-montana-tribes",
    title: "Tribal Nations of Montana",
    emoji: "🏞️",
    blurb: "Twelve Nations, seven reservations and their people today",
    parentNote:
      "The twelve Tribal Nations of Montana and the seven reservations on a map, tribal councils and the services Tribal governments run, Tribal people in modern life, and oral histories as a way to learn about the past.",
    standards: ["SS.H.2.2; SS.G.2.1; SS.CG.2.1; SS.H.2.3", "the twelve Tribal Nations of Montana, reservations on a map, Tribal governments, and oral histories"],
    items: TRIBAL_NATIONS,
  }),
];
