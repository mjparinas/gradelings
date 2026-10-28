import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// North Dakota Grade 2 social studies, my community: how the land affects people and people affect the land (G.K_2.2),
// the services local government provides (C.K_2.3), producers and consumers (E.K_2.2) and changes in the community over
// time (H.K_2.4), through North Dakota's cities, small towns, farms and ranches, and reservations.

const COMMUNITIES: Q[] = [
  ["A community where many people live close together, like Fargo, is a…", "city", ["farm", "forest", "desert"], "Cities have many homes and stores."],
  ["A small community with a few stores, a school and a post office is a…", "town", ["city", "country", "continent"], "North Dakota has many small towns."],
  ["Land outside of towns, with farms and ranches, is called…", "rural", ["urban", "underwater", "outer space"], "Rural means in the country."],
  ["The biggest city in North Dakota is…", "Fargo", ["Bismarck", "Minot", "Williston"], "It is on the Red River."],
  ["North Dakota's capital, where state leaders work, is…", "Bismarck", ["Fargo", "Grand Forks", "Dickinson"], "It is on the Missouri River."],
  ["Many North Dakota farms grow…", "wheat", ["bananas", "coconuts", "coffee"], "Wheat is used to make bread and pasta."],
  ["On a ranch, families raise…", "cattle", ["sharks", "penguins", "camels"], "Ranches have big pastures."],
  ["Some American Indian nations in North Dakota have their own lands, called…", "reservations", ["oceans", "islands", "deserts"], "Tribal governments lead there."],
  ["People who make or grow things to sell are…", "producers", ["consumers", "voters", "visitors"], "A farmer who grows wheat is a producer."],
  ["People who buy and use goods and services are…", "consumers", ["producers", "mayors", "pilots"], "When you buy a book, you are a consumer."],
  ["A haircut or a doctor's checkup is a…", "service", ["good", "tool", "toy"], "A service is work done for you."],
  ["Bread, boots and bikes are…", "goods", ["services", "jobs", "rules"], "Goods are things you can touch."],
  ["Who keeps the streets clear of snow in many towns?", "town or city workers", ["the school cook", "the dentist", "a pilot"], "Snowplows are a city service."],
  ["A library, a park and a fire department are services paid for by…", "the community's government", ["one family", "a toy store", "nobody"], "Taxes pay for them."],
  ["Farmers plant shelterbelts, rows of trees, to block the…", "wind", ["sun", "rain", "moon"], "The prairie can be very windy."],
  ["Many towns in North Dakota grew up next to…", "the railroad", ["the ocean", "volcanoes", "glaciers"], "Trains carried grain and people."],
  ["Tall buildings beside railroad tracks that store grain are…", "grain elevators", ["lighthouses", "castles", "skyscrapers"], "You can see them from far away."],
  ["Why do many North Dakotans have snow tires and block heaters for their cars?", "winters are very cold and snowy", ["it is always hot", "there are no roads", "cars float"], "Where we live affects how we live."],
  ["People build dams on rivers to store water and make…", "electricity", ["snow", "rocks", "wind"], "The Garrison Dam is on the Missouri River."],
  ["Planting trees and picking up litter are ways people…", "take care of the land", ["harm the land", "make floods", "stop the rain"], "People affect the environment."],
  ["Long ago, Fargo was a small town. Today it is a city. This shows communities…", "change over time", ["never change", "move away", "disappear"], "Communities grow."],
  ["A rural family may drive a long way to get to a…", "big store or hospital", ["front yard", "kitchen", "backyard"], "Towns can be far apart.", true],
  ["Why do towns build dikes along rivers like the Red River?", "to keep spring floods out", ["to make waves", "to grow fish", "to block the sun"], "Melting snow can make rivers rise.", true],
  ["A farmer sells wheat to a mill. The mill makes flour and sells it to a bakery. Who is the producer of the flour?", "the mill", ["the bakery's customer", "the snowplow driver", "the mail carrier"], "The mill makes the flour.", true],
  ["Why do city leaders ask people to vote on building a new park?", "the community decides together", ["parks are secret", "only one person pays", "voting is a game"], "Citizens help make choices.", true],
  ["When an oil company hires many workers in a small town, the town often…", "grows quickly", ["shrinks", "disappears", "moves"], "New jobs bring new people.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "nd-g2-communities",
    title: "North Dakota Communities",
    emoji: "🏘️",
    blurb: "Cities, towns, farms, ranches and the services we share",
    parentNote: "North Dakota's communities: cities like Fargo and Bismarck, small towns that grew up by the railroad, farms, ranches and reservations; goods and services, producers and consumers; services like snowplows, parks and libraries; how the land and weather shape how people live; and how communities change.",
    standards: ["G.K_2.2; C.K_2.3; E.K_2.2; H.K_2.4", "how the land affects people, local government services, producers and consumers, and changes in the community"],
    items: COMMUNITIES,
  }),
];
