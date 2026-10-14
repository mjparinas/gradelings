import type { Unit } from "../../types";
import { G8 as WASHINGTON_8 } from "../../washington/units/social-59-g8";
import { UNITS as NEW_YORK_8 } from "../../new-york/units/social-g8";
import { copyOf, from } from "./kit";

// Minnesota copies of New York's units on the United States since 1900. Each keeps the original's questions, leaves
// out the ones about New York or Tribes, and adds Minnesota items. Their own `mn-` ids keep Minnesota progress apart
// from the originals.
export const UNITS: Unit[] = [
  copyOf(
    from(NEW_YORK_8, "ny-g8-world-war-i"),
    {
      id: "mn-g7-world-war-i",
      title: "World War I",
      emoji: "🪖",
      blurb: "Causes, trenches and the peace",
      parentNote: "The causes of World War I, why the United States entered in 1917, trench warfare, limits on civil liberties at home, and the debate over the peace and the League of Nations.",
      standards: ["7.4.21.2; 7.2.7.1", "the changing role of the United States in the world, and the costs of decisions made in wartime"],
    },
    [
      ["During World War I, Minnesota farms helped the war effort by growing more…", "wheat", ["cotton", "rice", "oranges"], "For flour."],
      ["About how many Minnesotans served in World War I?", "More than 100,000", ["About 10", "About 500", "Nobody"], "A big share of young men.", true],
    ],
  ),
  copyOf(
    from(NEW_YORK_8, "ny-g8-great-depression"),
    {
      id: "mn-g7-great-depression",
      title: "Depression & New Deal",
      emoji: "📉",
      blurb: "The crash, the Dust Bowl and the New Deal",
      parentNote: "The causes of the crash and the Great Depression, the Dust Bowl, how families and farmers coped, and Franklin Roosevelt's New Deal and its lasting programs.",
      standards: ["7.4.20.2; 7.2.8.1", "questions about the Great Depression from historical sources, and how scarce goods were shared"],
    },
    [
      ["During the Great Depression, crop prices fell so low that many Minnesota farmers…", "lost their farms", ["became rich", "moved to the moon", "had too much money"], "Hard times on farms."],
      ["The Civilian Conservation Corps put young men to work in Minnesota's…", "state parks and forests", ["oil fields", "gold mines", "cotton fields"], "Trails, cabins and trees."],
    ],
  ),
  copyOf(
    from(NEW_YORK_8, "ny-g8-world-war-ii"),
    {
      id: "mn-g7-world-war-ii",
      title: "World War II",
      emoji: "✈️",
      blurb: "Pearl Harbor, D-Day and the home front",
      parentNote: "The road to war and the rise of fascism, the US entry after Pearl Harbor, D-Day and the Pacific, the Holocaust, the home front including the forced removal of Japanese Americans, and the war's results.",
      standards: ["7.4.18.3; 7.2.7.1", "connections between World War II, fascism and the Holocaust, and decisions made in wartime"],
    },
    [
      ["During World War II, iron ore from Minnesota's Iron Range was made into steel for…", "ships, tanks and planes", ["bread", "cotton shirts", "paper money"], "War needed metal."],
      ["During World War II, a Military Intelligence Service Language School at Fort Snelling trained…", "Japanese American soldiers as translators", ["pilots only", "farmers", "ship builders"], "Language was a weapon.", true],
    ],
  ),
  copyOf(
    from(NEW_YORK_8, "ny-g8-cold-war"),
    {
      id: "mn-g7-cold-war",
      title: "The Cold War",
      emoji: "🚀",
      blurb: "Containment, Korea, Vietnam and the space race",
      parentNote: "The rivalry between the United States and the Soviet Union, containment from the Truman Doctrine to Vietnam, the Cuban Missile Crisis, the space race and the end of the Cold War, from more than one perspective.",
      standards: ["7.4.19.2; 7.4.21.3", "different perspectives on the Cold War, and technological change since the mid-20th century"],
    },
    [
      ["Minnesota's Hubert Humphrey served as vice president during the…", "Vietnam War years", ["Revolutionary War", "Civil War", "War of 1812"], "With President Johnson.", true],
      ["Supercomputers built in Minnesota during the Cold War were used for…", "science and defense calculations", ["baking bread", "farming only", "making movies"], "Fast machines."],
    ],
  ),
  copyOf(
    from(NEW_YORK_8, "ny-g8-civil-rights"),
    {
      id: "mn-g7-civil-rights",
      title: "Civil Rights",
      emoji: "✊",
      blurb: "From Brown v. Board to equal rights for many groups",
      parentNote: "The Long Civil Rights Movement from Brown v. Board of Education to the Voting Rights Act, its leaders and methods, and the movements it inspired, including the women's movement and the American Indian Movement, founded in Minneapolis in 1968.",
      standards: ["7.4.18.4; 7.5.25.2; 7.5.24.1", "the Long Civil Rights Movement, the American Indian Movement and the women's rights movement, and groups that fought injustice"],
    },
    [
      ["In 1948, Minnesota's Hubert Humphrey gave a famous speech urging his party to support…", "civil rights", ["slavery", "more taxes on farms", "leaving the Union"], "\"Walk forthrightly into the bright sunshine of human rights.\""],
      ["The American Indian Movement was founded in 1968 in…", "Minneapolis", ["Duluth", "Chicago", "Denver"], "In Minnesota's largest city."],
      ["The American Indian Movement worked for…", "Native rights and fair treatment", ["closing schools", "ending voting", "more mining"], "Rights and sovereignty.", true],
    ],
  ),
  copyOf(
    from(WASHINGTON_8, "wa-g8-civil-war"),
    {
      id: "mn-g7-civil-war",
      title: "The Civil War",
      emoji: "⚔️",
      blurb: "Slavery, secession and war",
      parentNote: "Practices the causes of the Civil War, the Union and the Confederacy, key battles and leaders, emancipation, and the war's impact on different groups of people, including Minnesota's soldiers.",
      standards: ["7.4.18.1", "the Civil War and its impact on different groups"],
    },
    [
      ["When the Civil War began in 1861, Minnesota was the first state to…", "offer volunteer soldiers to the Union", ["join the Confederacy", "stay neutral", "free all enslaved people"], "Governor Ramsey's offer."],
      ["The 1st Minnesota Volunteer Infantry made a famous charge at the Battle of…", "Gettysburg", ["Yorktown", "Saratoga", "Lexington"], "July 1863.", true],
    ]
  ),
];
