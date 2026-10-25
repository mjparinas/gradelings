import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Iowa Grade 8 social studies, U.S. History and Civics: how Iowa became a state (SS.8.24), how Iowa's government is
// organized under its constitution compared with the US Constitution (SS.8.17), and Iowa's part in the struggle over
// slavery and the Civil War (SS.8.29, SS.8.32, SS.8.33). The rest of the course is practised with adopted units (see
// ../plan/social.ts).

const IOWA_AND_NATION: Q[] = [
  ["The land that is now Iowa became part of the United States through the…", "Louisiana Purchase of 1803", ["Treaty of Paris of 1783", "Mexican Cession of 1848", "Gadsden Purchase"], "The United States bought it from France."],
  ["Before it was its own territory, Iowa was part of the Michigan Territory and then the…", "Wisconsin Territory", ["Oregon Territory", "Texas Republic", "Northwest Territory of Canada"], "Iowa Territory was split off in 1838."],
  ["The first governor of the Iowa Territory was…", "Robert Lucas", ["Ansel Briggs", "Samuel Kirkwood", "Herbert Hoover"], "He had been governor of Ohio."],
  ["In the Honey War of 1839, Iowa and Missouri argued over…", "the border between them", ["a beehive contest", "railroad tracks", "the state capital"], "Trees with honey stood in the disputed strip."],
  ["Iowa voters rejected the first state constitution in 1844 mainly because…", "Congress wanted a much smaller state", ["it banned farming", "it had no governor", "it made Iowa a slave state"], "They wanted the Missouri River as the western border."],
  ["Iowa became the 29th state on December 28, 1846, when the bill was signed by President…", "James K. Polk", ["Abraham Lincoln", "Thomas Jefferson", "George Washington"], "He was President during the war with Mexico."],
  ["Iowa entered the Union as a free state soon after which slave state joined?", "Florida", ["Missouri", "Texas", "Kentucky"], "Free and slave states were often admitted in pairs."],
  ["Iowa's first state governor was…", "Ansel Briggs", ["Robert Lucas", "Samuel Kirkwood", "Kim Reynolds"], "He took office in 1846."],
  ["Iowa's current constitution, adopted in 1857, also moved the capital to…", "Des Moines", ["Iowa City", "Burlington", "Dubuque"], "Des Moines was closer to the center of the state."],
  ["Like the US Constitution, Iowa's constitution divides power among…", "three branches", ["two kings", "four councils", "one ruler"], "Legislative, executive and judicial."],
  ["Iowa's legislature, made up of a Senate and a House of Representatives, is called the…", "General Assembly", ["Congress", "Parliament", "City Council"], "It meets in the Capitol in Des Moines."],
  ["The Iowa Senate has 50 members, and the Iowa House has…", "100 members", ["50 members", "435 members", "99 members"], "House districts are half the size of Senate districts."],
  ["Unlike the US Constitution, which puts the Bill of Rights in amendments, Iowa's constitution begins with…", "a Bill of Rights in Article I", ["the governor's powers", "a list of counties", "tax rates"], "Rights come first in Iowa's constitution."],
  ["Iowa Supreme Court justices are chosen by…", "the governor from a list made by a nominating commission", ["a coin toss", "the President", "the State Fair"], "Voters later decide whether each justice stays."],
  ["In Iowa, voters decide in retention elections whether…", "judges keep their jobs", ["the state keeps its name", "schools stay open", "counties merge"], "Judges don't run against opponents."],
  ["The governor of Iowa serves a term of…", "four years", ["two years", "six years", "life"], "Iowa has no term limit for governor."],
  ["About how many Iowans served in the Union army during the Civil War?", "76,000", ["760", "7,600", "7.6 million"], "That was a large share of Iowa's men."],
  ["Iowa's Civil War governor, who raised regiments for the Union, was…", "Samuel Kirkwood", ["Robert Lucas", "Ansel Briggs", "Jefferson Davis"], "He was elected in 1859."],
  ["During the war, Annie Wittenmyer of Keokuk organized…", "special kitchens to feed sick and wounded soldiers", ["a navy", "the first railroad", "a gold rush"], "She also helped start homes for soldiers' orphans."],
  ["In Tabor, Grinnell and Salem, some Iowans helped freedom seekers escape slavery on the…", "Underground Railroad", ["Pony Express", "Erie Canal", "Oregon Trail"], "They hid people on the way to Canada."],
  ["In 1859, Josiah Grinnell sheltered the abolitionist John Brown and freedom seekers in…", "Grinnell, Iowa", ["Richmond, Virginia", "Boston, Massachusetts", "St. Louis, Missouri"], "The town is named for Grinnell."],
  ["The 1st Iowa African Infantry was a regiment of…", "Black soldiers who fought for the Union", ["Confederate soldiers", "sailors", "doctors only"], "It later became the 60th U.S. regiment."],
  ["Iowa was a free state, but many white Iowans before the war still supported laws that…", "kept Black people from voting or settling freely", ["gave everyone equal rights", "banned all farming", "welcomed everyone"], "Iowa's early laws restricted Black residents."],
  ["After the war, in 1868, Iowa changed its constitution to let…", "Black men vote", ["women vote", "children vote", "no one vote"], "Iowa did this before the Fifteenth Amendment."],
  ["The Dred Scott decision of 1857 tried to preserve slavery by ruling that…", "Black Americans could not be citizens", ["slavery was illegal everywhere", "Iowa was a slave state", "all enslaved people were free"], "It angered many people in free states like Iowa.", true],
  ["Grenville Dodge of Council Bluffs was a Union general who later…", "helped build the transcontinental railroad", ["became President", "founded the State Fair", "wrote the Constitution"], "Council Bluffs became an eastern start of the Union Pacific.", true],
  ["Why did Iowa's fertile land and rivers make it important to the Union during the war?", "it supplied food, horses and soldiers", ["it built warships", "it mined gold", "it was the capital"], "Farms fed the armies.", true],
  ["How is choosing Iowa's judges different from choosing federal judges?", "federal judges are appointed by the President and confirmed by the Senate", ["both are chosen by coin toss", "Iowa judges serve no terms", "federal judges are elected by voters"], "Iowa uses a commission and retention votes.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "ia-g8-iowa-and-the-nation",
    title: "Iowa & the Nation",
    emoji: "🎖️",
    blurb: "Statehood, Iowa's constitution and the Civil War",
    parentNote: "How Iowa became a state (the Louisiana Purchase, the Iowa Territory, the Honey War, the rejected 1844 constitution and statehood in 1846 as a free state), how Iowa's government works under its 1857 constitution compared with the US Constitution, and Iowa's part in the struggle over slavery and the Civil War: the Underground Railroad in Tabor, Grinnell and Salem, about 76,000 Union soldiers, the 1st Iowa African Infantry, Annie Wittenmyer and the vote for Black men in 1868.",
    standards: ["SS.8.24; SS.8.17; SS.8.29; SS.8.32; SS.8.33", "the factors behind Iowa's statehood, the structure of government under the US and Iowa constitutions, and Iowa's part in the struggle over slavery and the Civil War"],
    items: IOWA_AND_NATION,
  }),
];
