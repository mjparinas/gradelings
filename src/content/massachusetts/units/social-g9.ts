import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Massachusetts Grade 9 social studies, Massachusetts's part in United States History I: the Revolution in Boston
// (USI.T1.4), the Lowell mills and New England industry (USI.T3.2), Massachusetts reformers and abolitionists (USI.T4.2),
// the Civil War (USI.T5.3), immigration and labor (USI.T6.4) and the campaign for women's suffrage (USI.T7.3).

const MA_HISTORY: Q[] = [
  ["The Sons of Liberty, led in Boston by Samuel Adams, organized…", "protests against British taxes, including the Boston Tea Party", ["the first Thanksgiving", "Shays' Rebellion", "the Lowell mills"], "They were a Patriot group."],
  ["The Suffolk Resolves of 1774 called on colonists to…", "boycott British goods and resist the Intolerable Acts", ["welcome British troops", "move to Canada", "pay the tea tax"], "Suffolk County includes Boston."],
  ["The Boston Associates were investors who built…", "the textile mills of Lowell", ["the Erie Canal", "the transcontinental railroad", "the Boston Massacre site"], "Francis Cabot Lowell's ideas started it."],
  ["The Lowell system hired young women and housed them in…", "company boardinghouses", ["castles", "army forts", "ships"], "Rules were strict, with curfews and church."],
  ["In 1836 Lowell mill workers went on strike to protest…", "higher boardinghouse charges and lower pay", ["a new holiday", "shorter hours", "free housing"], "They were among the first women to strike in the US."],
  ["Horace Mann, Massachusetts's first secretary of education, is known for…", "building free public schools and training teachers", ["inventing the telephone", "leading the Union army", "writing The Liberator"], "He called education the great equalizer."],
  ["Dorothea Dix of Massachusetts worked to improve…", "care for people with mental illness", ["railroads", "banking laws", "the Navy"], "She reported on conditions in jails and poorhouses."],
  ["Which Massachusetts abolitionist published The Liberator?", "William Lloyd Garrison", ["Horace Mann", "John Hancock", "Henry David Thoreau"], "It demanded an immediate end to slavery."],
  ["Frederick Douglass lived in New Bedford after escaping slavery and later wrote…", "a famous autobiography", ["the Massachusetts Constitution", "the Gettysburg Address", "the Monroe Doctrine"], "It was published in Boston in 1845."],
  ["Henry David Thoreau of Concord wrote an essay arguing for…", "civil disobedience against unjust laws", ["more taxes for war", "the return of a king", "building more mills"], "He went to jail rather than pay a tax supporting the Mexican War."],
  ["Lucy Stone of Massachusetts was a leader in the movement for…", "women's rights and suffrage", ["prohibition only", "westward expansion", "the gold rush"], "She kept her own name after marrying."],
  ["The 54th Massachusetts Infantry Regiment was one of the first Union regiments made up of…", "Black soldiers", ["British soldiers", "child soldiers", "sailors only"], "Its charge on Fort Wagner in 1863 became famous."],
  ["Who commanded the 54th Massachusetts?", "Colonel Robert Gould Shaw", ["General Robert E. Lee", "Paul Revere", "President Lincoln"], "A memorial to him and his men faces the State House."],
  ["The Fugitive Slave Act of 1850 angered many in Boston because it…", "forced Northerners to help return people who had escaped slavery", ["ended slavery", "gave women the vote", "closed the mills"], "Crowds tried to free Anthony Burns in 1854."],
  ["In the 1840s and 1850s, many immigrants came to Boston from…", "Ireland, fleeing famine", ["Japan, seeking gold", "Australia", "Antarctica"], "A potato blight caused the Great Famine."],
  ["Many Irish immigrants in Boston faced…", "discrimination in jobs and housing", ["free land grants", "royal titles", "no work at all ever"], "Some signs read “No Irish Need Apply.”"],
  ["The 1912 strike in Lawrence, Massachusetts, is known as the…", "Bread and Roses strike", ["Boston Tea Party", "Pullman Strike", "Haymarket Affair"], "Mill workers from many countries struck after a pay cut."],
  ["Why did immigrants from Italy, Portugal, Poland and other countries come to Massachusetts mill towns around 1900?", "to find work in factories", ["to farm cotton", "to mine gold", "to join the British army"], "Mills in Lawrence and Fall River needed workers."],
  ["W. E. B. Du Bois, born in Great Barrington, Massachusetts, helped found the…", "NAACP", ["Red Cross", "Republican Party", "American Federation of Labor"], "He was the first Black American to earn a doctorate from Harvard."],
  ["In which year did women in the United States win the right to vote through the 19th Amendment?", "1920", ["1776", "1865", "1965"], "Massachusetts suffragists had campaigned for decades."],
  ["Why did the Lowell mills begin to hire immigrants instead of farm women by the 1850s?", "owners could pay them less, and many farm women had left", ["immigrants owned the mills", "farm women were banned by law", "the mills closed"], "Irish immigrants filled many jobs.", true],
  ["How did railroads change New England industry in the 1800s?", "they moved raw materials and goods faster and farther", ["they ended trade", "they replaced all ships at once", "they only carried passengers"], "Boston became a rail hub.", true],
  ["The Transcendentalists of Concord, such as Ralph Waldo Emerson, believed in…", "self-reliance and the goodness of people and nature", ["obeying every law without question", "a king's divine right", "factory work above all"], "Emerson's essay is called Self-Reliance.", true],
  ["Why did abolitionists like Garrison see the Constitution of the 1850s as a problem?", "it allowed slavery to continue", ["it banned newspapers", "it had no amendments", "it was written in French"], "Garrison once burned a copy in protest.", true],
  ["What did the Bread and Roses strike show about workers in 1912?", "workers from many backgrounds could unite for better pay and conditions", ["immigrants never worked together", "unions were illegal everywhere", "mill owners raised wages first"], "Strikers spoke many languages.", true],
];

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "ma-g9-massachusetts-history",
    title: "Massachusetts in US History",
    emoji: "🏭",
    blurb: "Patriots, mills, reformers and immigrants",
    parentNote: "Massachusetts's part in United States History I: the Sons of Liberty and the Suffolk Resolves, the Lowell mills and the mill workers' strikes, reformers such as Horace Mann, Dorothea Dix and Lucy Stone, abolitionists, the 54th Massachusetts in the Civil War, Irish and later immigrants, the 1912 Bread and Roses strike and the campaign for women's suffrage.",
    standards: ["USI.T1.4; USI.T3.2; USI.T4.2; USI.T5.3; USI.T6.4; USI.T7.3", "Massachusetts in the Revolution, industry, reform, the Civil War, immigration and the suffrage campaign"],
    items: MA_HISTORY,
  }),
];
