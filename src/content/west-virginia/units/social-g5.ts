import type { Unit } from "../../types";
import type { Q } from "../own";
import { timelineUnit, type Dated } from "./kit";

// West Virginia Grade 5 social studies, alongside United States history from the Civil War to 1900: how West Virginia
// became a state. The economic, social and political history of western Virginia from primary sources (SS.5.26), the
// events that led to statehood in order (SS.5.27), and the moral, ethical and legal tensions behind the new state and
// how they were resolved (SS.5.28).

const EVENTS: readonly Dated[] = [
  ["John Brown raids the federal armory at Harpers Ferry", 1859],
  ["Virginia's convention votes to leave the Union", 1861],
  ["Union troops win at Philippi, an early land battle of the Civil War", 1861],
  ["The Second Wheeling Convention forms the Restored Government of Virginia", 1861],
  ["President Lincoln signs the bill to make West Virginia a state", 1862],
  ["Voters approve the Willey Amendment to end slavery gradually", 1863],
  ["West Virginia becomes the 35th state", 1863],
  ["West Virginia ends slavery in the state", 1865],
  ["The capital moves from Wheeling to Charleston", 1870],
  ["The Supreme Court rules that Berkeley and Jefferson counties belong to West Virginia", 1871],
  ["West Virginia adopts the constitution it still uses", 1872],
  ["Charleston becomes the state's permanent capital", 1885],
];

const ITEMS: Q[] = [
  ["Before 1863, the land of West Virginia was part of…", "Virginia", ["Maryland", "Ohio"], "It was called western Virginia."],
  ["Many western Virginians felt the state government in Richmond…", "favored the eastern part of the state", ["favored the western part", "had no power at all"], "The east had more lawmakers and paid lower taxes on enslaved people."],
  ["Compared with eastern Virginia, western Virginia had…", "far fewer enslaved people", ["more plantations", "more cotton farms"], "Steep hills meant small farms."],
  ["Western Virginians wanted the state to spend more on…", "roads, canals and schools in the west", ["eastern plantations", "a navy"], "Travel over the mountains was hard."],
  ["Most delegates from the western counties voted… leaving the Union in 1861.", "against", ["for", "nothing about"], "Many western Virginians stayed loyal to the Union."],
  ["The Wheeling Conventions met in 1861 because many western Virginians…", "did not want to leave the Union", ["wanted to join the Confederacy", "wanted to join Ohio"], "They met in Wheeling, in the Northern Panhandle."],
  ["Francis H. Pierpont led the…", "Restored Government of Virginia", ["Confederate army", "Supreme Court"], "It was a Union government for Virginia, based in Wheeling."],
  ["The US Constitution says a new state cannot be made from part of a state without…", "the consent of that state's legislature", ["a war", "a vote of other countries"], "This made West Virginia's statehood a legal puzzle."],
  ["Who gave Virginia's consent to the new state of West Virginia?", "the Restored Government in Wheeling", ["the Confederate government in Richmond", "the king of England"], "It said it was Virginia's loyal government."],
  ["Congress required West Virginia to agree to end slavery gradually in the…", "Willey Amendment", ["Bill of Rights", "Missouri Compromise"], "It was named for Senator Waitman Willey."],
  ["West Virginia's first governor was…", "Arthur I. Boreman", ["Francis H. Pierpont", "Abraham Lincoln"], "He took office on June 20, 1863."],
  ["West Virginia's first capital was…", "Wheeling", ["Charleston", "Harpers Ferry"], "The capital moved several times before staying in Charleston."],
  ["One name first suggested for the new state was…", "Kanawha", ["New Ohio", "Appalachia City"], "Delegates chose West Virginia instead."],
  ["During the Civil War, western Virginians…", "fought on both sides", ["all joined the Union", "all joined the Confederacy"], "Some families were divided."],
  ["Thomas 'Stonewall' Jackson, a Confederate general, was born in…", "Clarksburg", ["Wheeling", "Huntington"], "Many from western Virginia fought for the Confederacy."],
  ["A letter written by a soldier in 1861 is a…", "primary source", ["secondary source", "work of fiction"], "It was made at the time by someone who was there."],
  ["A textbook chapter about statehood written today is a…", "secondary source", ["primary source", "diary"], "It explains events from later on."],
  ["Some people asked whether creating West Virginia was legal because…", "Virginia's government in Richmond never agreed", ["Lincoln was not president", "there was no Congress"], "Lincoln decided the new state helped the Union.", true],
  ["Why did Congress tie statehood to ending slavery?", "many in Congress would not admit a new slave state", ["slavery was already over everywhere", "the Confederacy asked for it"], "The Willey Amendment settled it.", true],
  ["How was the fight over Berkeley and Jefferson counties settled?", "the Supreme Court ruled for West Virginia in 1871", ["the two counties became their own state", "they were split in half"], "Virginia had sued to get them back.", true],
  ["Why did western Virginia's rivers tie it to Ohio and Pennsylvania more than to eastern Virginia?", "its rivers flow west and north toward the Ohio River", ["its rivers flow to Richmond", "it had no rivers"], "Trade followed the rivers.", true],
];

export const SOCIAL_5: Unit[] = [
  timelineUnit({
    id: "wv-g5-becoming-west-virginia",
    title: "Becoming West Virginia",
    emoji: "⭐",
    blurb: "From John Brown's raid to the 35th state",
    parentNote:
      "How West Virginia became a state: the differences between western and eastern Virginia, Virginia's vote to secede, the Wheeling Conventions and the Restored Government, the legal question of Virginia's consent, the Willey Amendment, statehood on June 20, 1863, and the capital's moves, using primary sources and putting events in order.",
    standards: ["SS.5.26; SS.5.27; SS.5.28", "western Virginia's history from primary sources, the events that led to West Virginia statehood in order, and the moral, ethical and legal tensions that created the new state"],
    events: EVENTS,
    items: ITEMS,
  }),
];
