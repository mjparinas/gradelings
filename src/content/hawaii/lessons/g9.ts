import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Hawaiʻi's Grade 9 units that the shared lesson files don't cover. A copy of another
// state's unit carries the original's lesson (with Hawaiʻi examples where the original named its own state) under its
// own id, and a unit borrowed from another grade carries the lesson it has there. Lessons are written in Canadian
// spelling, like every lesson file; US families see them in US spelling.
export const LESSONS: GradeLessons = {
  "math/ca-g8-similar-distance": lesson(
    ["Rotations, reflections and translations keep size and shape; a dilation changes size only.", "Figures are similar if one can be turned into the other with these moves.", "To find the distance between two points, draw a right triangle and use a² + b² = c²."],
    "What is the distance between (1, 2) and (4, 6)?",
    ["Horizontal leg: 4 − 1 = 3. Vertical leg: 6 − 2 = 4.", "3² + 4² = 9 + 16 = 25.", "√25 = 5."],
    "5",
  ),
  "math/pythagorean-theorem": lesson(
    ["It works for right triangles only.", "The two shorter sides (legs) are a and b. The longest side, across from the right angle, is c.", "a² + b² = c²."],
    "A right triangle has legs 6 cm and 8 cm. How long is the longest side?",
    ["6² + 8² = 36 + 64 = 100.", "c = √100 = 10."],
    "10 cm",
  ),
  "science/hi-g9-ecosystems": lesson(
    [
      "A population levels off at carrying capacity on a logistic growth curve.",
      "About 10% of energy passes up each trophic level.",
      "After disturbances like wildfire, succession rebuilds the community; stable ecosystems recover.",
    ],
    "Shrubs sprout again after a wildfire. What is this an example of?",
    [
      "The community is rebuilding over time.",
      "Gradual change in a community is succession.",
    ],
    "succession",
  ),
  "social/hi-g9-annexation": lesson(
    [
      "Long-term causes of the 1893 overthrow: sugar's ties to the US market, the Reciprocity Treaty and the 1887 Bayonet Constitution.",
      "The Blount Report found the overthrow wrong and dependent on US help; the Morgan Report found US officials acted properly.",
      "A treaty of annexation failed after the Kūʻē Petitions, so Congress annexed Hawaiʻi in 1898 by joint resolution, which critics say was not legal.",
      "The 1900 Organic Act made Hawaiʻi a territory, and the 1993 Apology Resolution acknowledged the US role in the overthrow.",
    ],
    "Why do some argue that Hawaiʻi's annexation was not legal?",
    [
      "A treaty needs two-thirds of the Senate, and the treaty failed.",
      "Congress used a joint resolution instead, which critics say can't take over another country.",
    ],
    "it was done by joint resolution instead of a treaty",
  ),
  "social/hi-g9-economics": lesson(
    [
      "When price rises, quantity demanded falls and quantity supplied rises.",
      "A poor harvest cuts supply and raises the price.",
      "Command economies are run by government, market economies by buyers and sellers; most countries, including the US, are mixed.",
    ],
    "A poor Kona coffee harvest would most likely do what to the price?",
    [
      "A poor harvest means less coffee to sell.",
      "Less supply pushes the price up.",
    ],
    "raise it",
  ),
  "social/hi-g9-modern-hawaii": lesson(
    [
      "Sugar and pineapple declined; tourism, carried by jet travel, and the military became the economy's mainstays.",
      "Tourism brings jobs but also high housing costs and pressure on the land.",
      "The Hawaiian Renaissance of the 1970s revived language, hula, music and voyaging, and led to action on Kahoʻolawe.",
      "The 1978 Constitutional Convention made Hawaiian an official language and created the Office of Hawaiian Affairs.",
    ],
    "Which 1976 voyage became a symbol of the Hawaiian Renaissance?",
    [
      "It sailed to Tahiti using only traditional wayfinding.",
      "The canoe was named for a star.",
    ],
    "Hōkūleʻa's voyage to Tahiti",
  ),
  "social/hi-g9-plantation-era": lesson(
    [
      "After annexation, US law shaped who could come: Chinese exclusion applied, and plantations recruited from the Philippines.",
      "Early strikes were split by ethnic group; the 1946 sugar strike united every group under the ILWU and won.",
      "Ditches moved windward stream water to dry plantation fields, harming streams, loʻi kalo and reefs.",
    ],
    "Why did the 1946 sugar strike succeed when earlier strikes failed?",
    [
      "Earlier strikes were organised by one ethnic group at a time.",
      "In 1946, workers of every group struck together in one union.",
    ],
    "workers of every ethnic group united",
  ),
  "social/hi-g9-us-government": lesson(
    [
      "Separation of powers splits government into three branches: Article I Congress, Article II the president, Article III the courts.",
      "A president serves 4 years. The House impeaches and the Senate holds the trial.",
      "Unlike a parliamentary system, the US elects its president separately from Congress.",
    ],
    "Which article of the US Constitution sets up the federal courts?",
    [
      "Article I is Congress; Article II the president.",
      "Article III sets up the courts.",
    ],
    "Article III",
  ),
  "social/hi-g9-war-statehood": lesson(
    [
      "Japan attacked Pearl Harbor on December 7, 1941, and Hawaiʻi was under martial law until October 1944.",
      "On the West Coast about 120,000 Japanese Americans were removed; in Hawaiʻi far fewer were interned, mostly community leaders.",
      "Veterans of the 100th Battalion and 442nd, with labour unions, led the Democratic Revolution of 1954.",
      "Hawaiʻi became the 50th state on August 21, 1959.",
    ],
    "Why were far fewer Japanese Americans interned in Hawaiʻi than on the West Coast?",
    [
      "Japanese Americans were about a third of Hawaiʻi's people.",
      "Removing them would have shut down the islands' economy.",
    ],
    "the islands depended on their work",
  ),
};
