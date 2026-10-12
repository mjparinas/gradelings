import type { Course } from "../types";
import { courses as alberta } from "../alberta/g8";
import { courses as manitoba } from "../manitoba/g8";
import { courses as newBrunswick } from "../new-brunswick/g8";
import { courses as novaScotia } from "../nova-scotia/g8";
import { courses as ontario } from "../ontario/g8";
import { courses as saskatchewan } from "../saskatchewan/g8";
import { peGrade } from "./kit";
import { peCanadianIdentity8, peCitizenship8, peDecadesOfChange8, peGeographicInfluences8, peOceansClimate8, peWaterOnEarth8 } from "./units/g8-science-social";

// Prince Edward Island Grade 8.
export const courses: Course[] = peGrade("8", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { science: { units: [peWaterOnEarth8, peOceansClimate8], order: ["pe-water-on-earth-8", "pe-oceans-climate-8", "viscosity-flow-8", "density-buoyancy-8", "pressure-pascal-8", "hydraulics-pneumatics-8", "fluids-society-8", "light-and-radiation", "light-behaviour-ab", "optics-vision-ab", "cells-and-life", "cells-diffusion-ab", "body-systems-ab", "mb-circulatory-8"] }, social: { units: [peCanadianIdentity8, peGeographicInfluences8, peDecadesOfChange8, peCitizenship8], order: ["pe-canadian-identity-8", "pe-geographic-influences-8", "mb-evidence-8", "pe-decades-of-change-8", "mb-perspectives-8", "pe-citizenship-8"] } });
