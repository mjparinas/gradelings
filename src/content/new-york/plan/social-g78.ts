import type { Entry } from "../kit";

// New York social studies, Grades 7 and 8: History of the United States and New York. The units New York uses from
// other frameworks: California's and Washington's US history units that name none of those states' places and carry no
// Tribal items (new-york.test.ts samples every question). Copies with New York items, and New York's own units on
// New York's role and on the 20th century, are in ../units/social-g7.ts, social-g8.ts and social-g78-*.ts.
export const PLAN_SOCIAL_G78: Record<string, Entry[]> = {
  "7/social": [
    [
      "ca-g5-colonial-economy",
      "adopt",
      "7.2c; 7.2e",
      "how land, climate and labor shaped the colonies' economies, and the growth of slavery and the Atlantic slave trade",
    ],
    [
      "ca-g5-road-to-revolution",
      "adopt",
      "7.3a; 7.3b",
      "the French and Indian War, the British taxes that followed and the colonists' protests",
    ],
    [
      "ca-g5-revolution",
      "adopt",
      "7.3c; 7.3d",
      "the Declaration of Independence and the battles, allies and people that decided the American Revolution",
    ],
    [
      "ca-g5-constitution",
      "adopt",
      "7.4a; 7.4b; 7.4c",
      "the weaknesses of the Articles of Confederation, the compromises of 1787 and the Constitution's plan of government",
    ],
    [
      "ca-g8-founding-ideals",
      "adopt",
      "7.3c; 7.4c; 7.5a; 7.5b",
      "Enlightenment ideas in the Declaration, the debate over ratification and the principles of the Constitution",
    ],
    [
      "wa-g8-bill-of-rights",
      "adopt",
      "7.5b; 7.5c",
      "the rights the Bill of Rights protects and how amendments have changed the Constitution",
    ],
    [
      "ca-g8-new-nation",
      "adopt",
      "7.5d; 7.6b",
      "the first presidents and parties, judicial review, the Louisiana Purchase, the War of 1812 and the Monroe Doctrine",
    ],
    [
      "ca-g8-industry-reform",
      "adopt",
      "7.7a; 7.7c; 7.8a",
      "early factories, canals and railroads, and the reform movements for schools, abolition and women's rights",
    ],
  ],
  "8/social": [
    [
      "or-g8-reconstruction",
      "adopt",
      "8.1a; 8.1b; 8.1c",
      "plans for Reconstruction, the 13th, 14th and 15th Amendments, and how the rights of African Americans were attacked and rolled back",
    ],
    [
      "ca-g8-industrial-america",
      "adopt",
      "8.2a; 8.2c; 8.2d; 8.3a",
      "industry, big business, new immigrants, workers and unions, and federal policy toward Plains nations after the Civil War",
    ],
  ],
};
