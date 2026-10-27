import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Rhode Island Grade 9 social studies, high school Civics: the history of voting rights in the United States, from
// Rhode Island's charter and the Dorr Rebellion to the amendments and the Voting Rights Act (SSHS.CVC.6.3), plus a
// copy of Maine's United States government unit without its state's items, with Rhode Island items added. The rest of
// the course (foundations, elections, citizens and civic action, dissent and human rights) is practised with adopted
// units (see ../plan/social.ts).

const VOTING: Q[] = [
  ["Under its royal charter, Rhode Island let only men who owned land vote, so by 1840 most men…", "could not vote", ["voted twice", "had to vote every week", "voted for a king"], "Owning land was the rule for voting."],
  ["The Dorr Rebellion of 1841 and 1842 was a fight over…", "who had the right to vote", ["the price of tea", "the Erie Canal", "a border with Canada"], "Many working men were left out."],
  ["Thomas Wilson Dorr led a movement to…", "let more men vote", ["bring back a king", "close the State House", "end public schools"], "His followers wrote the People's Constitution."],
  ["After the Dorr Rebellion, Rhode Island adopted a new constitution in…", "1843", ["1663", "1776", "1920"], "It replaced the royal charter."],
  ["Which amendment said the right to vote cannot be denied because of race?", "the 15th Amendment", ["the 1st Amendment", "the 19th Amendment", "the 26th Amendment"], "It was ratified in 1870, after the Civil War."],
  ["Which amendment gave women the right to vote across the country?", "the 19th Amendment", ["the 13th Amendment", "the 15th Amendment", "the 24th Amendment"], "It was ratified in 1920."],
  ["Which amendment lowered the voting age to 18?", "the 26th Amendment", ["the 19th Amendment", "the 2nd Amendment", "the 15th Amendment"], "It was ratified in 1971, during the Vietnam War."],
  ["Which amendment ended poll taxes in federal elections?", "the 24th Amendment", ["the 19th Amendment", "the 10th Amendment", "the 26th Amendment"], "It was ratified in 1964."],
  ["A poll tax was a fee that people had to pay in order to…", "vote", ["drive", "go to school", "own a dog"], "It kept many poor voters from the polls."],
  ["The Voting Rights Act of 1965 banned…", "literacy tests used to keep people from voting", ["all elections", "voting by women", "secret ballots"], "It enforced the 15th Amendment."],
  ["The march from Selma to Montgomery in 1965 called for…", "voting rights for Black Americans", ["lower taxes on tea", "a new state flag", "the end of the Senate"], "Marchers crossed the Edmund Pettus Bridge."],
  ["The Seneca Falls Convention of 1848 is known for starting the movement for…", "women's rights, including the vote", ["the Revolution", "the Louisiana Purchase", "the railroad"], "It met in New York."],
  ["Susan B. Anthony was arrested in 1872 for…", "voting when women were not allowed to", ["stealing a horse", "starting a war", "printing money"], "She worked for women's suffrage for decades."],
  ["Suffrage means…", "the right to vote", ["the right to own land", "a type of tax", "a court case"], "Suffragists fought for it."],
  ["The 17th Amendment let voters choose their US senators directly instead of…", "state legislatures", ["the President", "the Supreme Court", "governors"], "It was ratified in 1913."],
  ["The Indian Citizenship Act of 1924 made Native Americans born in the United States…", "citizens", ["soldiers", "governors", "senators"], "Some states still blocked their votes for years."],
  ["Rhode Island's Elizabeth Buffum Chace led the state's campaign for…", "women's right to vote", ["a new capital", "lower taxes", "a bigger navy"], "She also worked to end slavery."],
  ["Voters who are not able to go to the polls on Election Day can often use…", "a mail ballot", ["a phone call to the President", "a letter to a newspaper", "a school vote"], "Rules for mail voting vary by state."],
  ["In the United States, who decides most rules for registering to vote?", "the states", ["the President alone", "other countries", "political parties"], "The Constitution limits what the rules can be."],
  ["The Dorr Rebellion led to the Supreme Court case Luther v. Borden (1849), which said deciding which state government was legitimate was a question for…", "Congress and the President, not the courts", ["the King of England", "the voters of Massachusetts", "the United Nations"], "The Court called it a political question.", true],
  ["Rhode Island's 1843 constitution let Black men vote again but kept a property rule for…", "men born in other countries", ["men born in Rhode Island", "all landowners", "veterans"], "Many Irish immigrants could not vote.", true],
  ["In 1888 Rhode Island's Bourn Amendment removed the property rule for voting by…", "naturalized citizens", ["women", "children", "senators"], "It ended a rule that kept many immigrants from voting.", true],
  ["In Shelby County v. Holder (2013), the Supreme Court ended the formula deciding which places needed approval before changing voting rules, from the…", "Voting Rights Act", ["Bill of Rights", "Articles of Confederation", "Homestead Act"], "Those places had to get federal approval first.", true],
  ["The 23rd Amendment gave electoral votes for President to…", "Washington, D.C.", ["Puerto Rico", "every city", "Canada"], "The capital is not a state.", true],
  ["Which change widened voting the most for young people?", "lowering the voting age from 21 to 18", ["ending the secret ballot", "adding a poll tax", "a literacy test"], "Many said if you can be drafted, you should vote.", true],
  ["Why did Dorr's supporters say the People's Constitution was legal?", "the people have the right to form their own government", ["the king approved it", "the Supreme Court wrote it", "it had no voters"], "They pointed to ideas in the Declaration of Independence.", true],
];

const NATION_EXTRA: Q[] = [
  ["After the 2020 census, Rhode Island has how many seats in the US House of Representatives?", "2", ["1", "38", "75"], "Seats are divided by population after each census."],
  ["Rhode Island has how many electoral votes for President?", "4", ["2", "38", "75"], "Its House seats plus its two senators."],
  ["Like every state, Rhode Island sends how many senators to the US Senate?", "2", ["4", "38", "75"], "Each state has equal votes in the Senate.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "ri-g9-voting-rights",
    title: "Who Gets to Vote",
    emoji: "🗳️",
    blurb: "From the Dorr Rebellion to the Voting Rights Act",
    parentNote: "The history of voting rights: Rhode Island's landowner rule under its royal charter, the Dorr Rebellion and the 1843 constitution, the 15th, 17th, 19th, 23rd, 24th and 26th Amendments, Seneca Falls and Rhode Island suffragists, poll taxes and literacy tests, Selma and the Voting Rights Act, and recent court cases.",
    standards: ["SSHS.CVC.6.3", "the history of voting rights in the United States"],
    items: VOTING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "ri-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one, with Rhode Island's seats in Congress.",
      standards: ["SSHS.CVC.3.4; SSHS.CVC.4.1; SSHS.CVC.4.2; SSHS.CVC.4.3; SSHS.CVC.4.4", "civil rights and civil liberties, checks and balances, and the roles and powers of the legislative, executive and judicial branches"],
    },
    NATION_EXTRA,
  ),
];
