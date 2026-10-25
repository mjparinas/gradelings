import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Utah's Grade 3 units that the shared lesson files don't cover: Utah's own units, Utah copies of
// other states' units (the original's lesson with Utah examples), and units Utah teaches in a different grade from the
// original (the lesson they have there).
export const LESSONS: GradeLessons = {
  "science/ut-g3-weather-climate": lesson(
    ["Weather is what the air is like today. Climate is the usual weather over many years.", "Read weather data for patterns, like warm highs in summer.", "Climates differ: much of Utah is dry, while rainforests are wet all year."],
    "“Utah's mountains get lots of snow every winter.” Weather or climate?",
    ["It describes a pattern year after year."],
    "climate",
  ),
  "science/ut-g3-gravity": lesson(
    ["Gravity is a force that pulls objects toward each other.", "Earth's gravity pulls everything toward its centre, everywhere on Earth.", "That's why balls fall back down and water in Utah's rivers flows downhill."],
    "You throw a ball straight up. What happens next, and why?",
    ["Earth's gravity keeps pulling the ball toward Earth's centre."],
    "it comes back down because of gravity",
  ),
  "social/ut-g3-money-and-voting": lesson(
    ["Resources can be natural (land, water), human (workers' skills) or capital (tools and machines).", "A trade-off means giving up one thing to get another. Taxes pay for services like parks and roads.", "Citizens take part by voting and speaking up. Utah's voters elect the governor."],
    "A farmer uses a tractor. What kind of resource is the tractor?",
    ["It isn't from nature and it isn't a person.", "A tool or machine used to make things is capital."],
    "a capital resource",
  ),
  "social/ny-g5-governments": lesson(
    ["The US has three branches: legislative, executive and judicial.", "Mexico is divided into states, like the US. Canada's head of government is the prime minister.", "Groups like the OAS and UNICEF help countries work together and help children."],
    "Who is the head of government in Canada?",
    ["The US has a president.", "Canada's government is led by a prime minister."],
    "the prime minister",
  ),
};
