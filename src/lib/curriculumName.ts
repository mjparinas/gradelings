/**
 * "the Ontario Curriculum", "Wisconsin's academic standards", "the New Jersey Student Learning Standards".
 * A framework's `curriculumName` already carries its own "the" where it needs one (many US states do, and a possessive
 * never does), so typing "the ${f.curriculumName}" in copy gave "the the New Jersey …" and "the Wisconsin's …".
 * Use this wherever the name sits in a sentence; `Capital` is for the start of one.
 */
export function theCurriculum(name: string): string {
  if (/^the\s/i.test(name) || /^\S+['’]s\s/.test(name)) return name;
  return `the ${name}`;
}

export const theCurriculumCapital = (name: string): string => {
  const s = theCurriculum(name);
  return s.charAt(0).toUpperCase() + s.slice(1);
};
