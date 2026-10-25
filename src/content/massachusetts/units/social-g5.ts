import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Massachusetts Grade 5 social studies, Massachusetts's part in the nation's story: sites in Boston before and during
// the Revolution (5.T2.2), Shays' Rebellion (5.T2.9), the New England textile mills (5.T4.4) and the state-by-state
// abolition of slavery in the North and Massachusetts abolitionists (5.T5.1, 5.T5.3).

const BOSTON: Q[] = [
  ["Which Boston building was a meeting place where colonists protested British taxes?", "Faneuil Hall", ["the White House", "Independence Hall", "the Alamo"], "It is called the Cradle of Liberty."],
  ["The meeting that led to the Boston Tea Party was held at the…", "Old South Meeting House", ["Old North Church", "State House dome", "Plymouth Rock"], "Thousands gathered there in December 1773."],
  ["Lanterns that signaled the British route in 1775 hung in the…", "Old North Church", ["Old South Meeting House", "Faneuil Hall", "Harvard Hall"], "It is in Boston's North End."],
  ["The Boston Massacre took place near the…", "Old State House", ["Bunker Hill Monument", "Boston Common", "Charles River"], "A circle of stones marks the spot."],
  ["The Freedom Trail in Boston connects…", "16 historic sites from the Revolution era", ["the city's subway stops", "all of New England's beaches", "Boston and New York"], "A red line on the sidewalk shows the way."],
  ["The Battle of Bunker Hill was fought in…", "Charlestown", ["Concord", "Plymouth", "Salem"], "A tall granite monument stands there now."],
  ["After the Revolution, many Massachusetts farmers were angry because…", "they could not pay high taxes and debts", ["they were not allowed to farm", "the British came back", "they had too much money"], "Courts were taking their farms."],
  ["Shays' Rebellion (1786–1787) was led by…", "Daniel Shays, a former Revolutionary War soldier", ["King George III", "John Hancock", "George Washington"], "Farmers in western Massachusetts closed courts."],
  ["Shays' Rebellion showed that the national government under the Articles of Confederation was…", "too weak", ["too strong", "run by a king", "perfect"], "It could not raise an army to help."],
  ["Shays' Rebellion helped lead to the…", "Constitutional Convention of 1787", ["Boston Tea Party", "War of 1812", "Civil War"], "Leaders decided to write a stronger plan of government."],
  ["In the early 1800s, Lowell, Massachusetts, became famous for…", "textile mills", ["gold mines", "oil wells", "cotton fields"], "Mills spun cotton into cloth."],
  ["What powered the early Lowell mills?", "falling water from the Merrimack River", ["solar panels", "nuclear power", "wind turbines"], "Canals carried the water to the wheels."],
  ["Many of the first Lowell mill workers were…", "young women from New England farms", ["kings and queens", "astronauts", "retired soldiers"], "They were called mill girls."],
  ["The cotton used in New England mills was grown mostly by…", "enslaved people in the South", ["robots", "mill girls in Lowell", "farmers in England"], "Northern mills depended on Southern slavery."],
  ["Which Massachusetts cities also grew with textile mills?", "Lawrence and Fall River", ["Provincetown and Nantucket", "Plymouth and Concord", "Salem and Marblehead"], "They were built near rivers."],
  ["Slavery ended in Massachusetts in the…", "1780s, through court cases", ["1860s, after the Civil War", "1620s", "1950s"], "Elizabeth Freeman and Quock Walker won their freedom."],
  ["Northern states ended slavery…", "one at a time over many years", ["all on the same day", "never", "before the colonies began"], "Vermont, Pennsylvania and Massachusetts were among the first."],
  ["William Lloyd Garrison published an antislavery newspaper in Boston called…", "The Liberator", ["The New York Times", "Poor Richard's Almanack", "The Federalist"], "It first appeared in 1831.", true],
  ["Frederick Douglass, who had escaped slavery, gave his first big antislavery speech in…", "Nantucket", ["Atlanta", "Richmond", "New Orleans"], "He lived in New Bedford, Massachusetts.", true],
  ["People who worked to end slavery were called…", "abolitionists", ["loyalists", "redcoats", "pilgrims"], "To abolish means to end.", true],
  ["The Underground Railroad was…", "a network of people who helped enslaved people escape to freedom", ["a subway under Boston", "a real train line", "a mining tunnel"], "It had no tracks.", true],
  ["Why did mill owners build factories near rivers?", "the moving water turned machines", ["rivers kept workers cool", "boats were the only roads", "fish were sold there"], "Water power was the energy of the day.", true],
  ["Why were the mill girls' working days hard?", "they worked 12 or more hours in loud, dusty rooms", ["they worked one hour a day", "they had no machines", "they worked outdoors in snow"], "Some went on strike for better conditions.", true],
  ["Which Massachusetts man led the Patriots' secret Sons of Liberty?", "Samuel Adams", ["Daniel Shays", "Frederick Douglass", "Horace Mann"], "He was John Adams's cousin.", true],
  ["After Shays' Rebellion, George Washington and others worried that…", "the new nation could fall apart", ["Massachusetts would become a kingdom", "the British had won", "farmers were too rich"], "They wanted a stronger national government.", true],
];

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "ma-g5-massachusetts-in-the-nation",
    title: "Massachusetts & the New Nation",
    emoji: "🧵",
    blurb: "Boston sites, Shays' Rebellion, mills and abolition",
    parentNote: "Revolution-era sites in Boston along the Freedom Trail, Shays' Rebellion and why it led to the Constitutional Convention, the Lowell textile mills and the mill workers, the link between Northern mills and Southern slavery, and the end of slavery in Massachusetts and the abolitionists who worked against it.",
    standards: ["5.T2.2; 5.T2.9; 5.T4.4; 5.T5.1; 5.T5.3", "historic sites in Boston, Shays' Rebellion, New England's textile mills, and the abolition of slavery in the North"],
    items: BOSTON,
  }),
];
