import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Wyoming's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Wyoming examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/wy-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Running water moves the most.",
      "Glaciers scrape and carry rock. Roots growing in cracks can split rock.",
      "Over a very long time, erosion can carve deep canyons.",
      "Plants and their roots slow erosion on a hillside.",
    ],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    [
      "Roots hold soil in place.",
      "A bare hill has nothing to hold the soil.",
    ],
    "the bare hillside",
  ),
  "social/wy-g4-land": lesson(
    [
      "Wyoming has the Great Plains in the east, mountain ranges such as the Tetons and the Wind River Range, and wide basins between them.",
      "Gannett Peak, in the Wind River Range, is the highest point. Yellowstone, in the northwest, has geysers and hot springs.",
      "Map tools help: the compass rose shows directions, the legend explains symbols, and the scale shows distance.",
      "The North Platte, Green and Wind rivers carry snowmelt from the mountains across the dry basins.",
    ],
    "What is the highest mountain in Wyoming?",
    [
      "It is in the Wind River Range.",
      "It is higher than any peak in the Tetons.",
    ],
    "Gannett Peak",
  ),
  "social/wy-g4-first-peoples": lesson(
    [
      "The Eastern Shoshone and Northern Arapaho are nations who share the Wind River Reservation in central Wyoming today.",
      "Long ago, many families moved with the seasons to hunt bison, gather plants and find shelter for winter.",
      "Horses, which came to the Plains in the 1700s, made hunting and travel much easier.",
      "Chief Washakie of the Eastern Shoshone chose the Wind River valley in the Fort Bridger Treaty of 1868.",
    ],
    "Which two nations share the Wind River Reservation?",
    [
      "One nation is the Eastern Shoshone.",
      "The other came to Wind River in 1878.",
    ],
    "the Eastern Shoshone and the Northern Arapaho",
  ),
  "social/wy-g4-equality-state": lesson(
    [
      "Wyoming Territory was created in 1868, after the railroad brought new towns.",
      "In 1869, it became the first place in the country where women could vote and hold office.",
      "Wyoming became the 44th state in 1890, and it kept women's right to vote.",
      "That is why Wyoming is called the Equality State. Its motto is \"Equal Rights.\"",
    ],
    "Why is Wyoming called the Equality State?",
    [
      "Think about what happened in 1869.",
      "Women in Wyoming could vote before women anywhere else in the country.",
    ],
    "it was the first to let women vote",
  ),
  "social/wy-g4-working-wyoming": lesson(
    [
      "Fur trappers met to trade at rendezvous, and later the railroad brought coal mines and cattle ranches.",
      "Today Wyoming mines coal and trona, drills for oil and gas, raises cattle and sheep, and welcomes visitors to its parks.",
      "Wind farms make electricity from Wyoming's strong winds.",
      "Goods sold to other places are exports; goods brought in are imports.",
    ],
    "Wyoming sends coal by train to power plants in other states. Is that an import or an export?",
    [
      "The coal leaves Wyoming.",
      "Goods that go out are exports.",
    ],
    "an export",
  ),
  "social/wy-g4-governing-wyoming": lesson(
    [
      "Wyoming's government meets in the Capitol in Cheyenne.",
      "The Legislature makes laws, the governor carries them out, and the courts decide what laws mean.",
      "The Legislature has a 31-member Senate and a 62-member House of Representatives.",
      "The Eastern Shoshone and Northern Arapaho are sovereign nations with their own governments.",
    ],
    "Which part of Wyoming's government makes the state's laws?",
    [
      "It has a Senate and a House of Representatives.",
      "Its members are elected by voters.",
    ],
    "the Legislature",
  ),
  "social/wy-g4-timeline": lesson(
    [
      "A timeline puts events in order from earliest to latest.",
      "Earlier years are smaller numbers: 1834 comes before 1868.",
      "To find how many years apart two events are, subtract the earlier year from the later one.",
    ],
    "Wyoming Territory was created in 1868, and Wyoming became a state in 1890. How many years apart are they?",
    [
      "1890 − 1868 = 22.",
    ],
    "22",
  ),
  "social/wy-g4-people": lesson(
    [
      "People from Wyoming helped shape the state and the nation.",
      "Chief Washakie led the Eastern Shoshone, and Sacagawea guided Lewis and Clark.",
      "Esther Hobart Morris was one of the first women judges in the country.",
      "Nellie Tayloe Ross became the first woman governor in the United States in 1925.",
    ],
    "Who was the first woman to serve as a state governor?",
    [
      "She became Wyoming's governor in 1925.",
      "Her last name was Ross.",
    ],
    "Nellie Tayloe Ross",
  ),
};
