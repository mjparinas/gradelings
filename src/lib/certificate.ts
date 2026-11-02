// Printable certificates for the fridge. Practice milestones only, never a report-card mark.

export interface CertificateText {
  heading: string;
  line: string;
  /** Always printed at the bottom. */
  note: string;
}

export const CERTIFICATE_NOTE = "A practice milestone from Gradelings. Your child's teacher decides report-card marks.";

/** A certificate for finishing a school year: "Maya finished Grade 4". */
export function gradeCertificate(name: string, finished: string): CertificateText {
  return { heading: "Certificate of Achievement", line: `${name} finished ${finished}!`, note: CERTIFICATE_NOTE };
}

/** A certificate for a unit that grew to a new level. `levelWord` is the kid word, such as "Tree" or "Star". */
export function unitCertificate(name: string, unit: string, levelWord: string): CertificateText {
  return { heading: "Certificate of Achievement", line: `${name} grew into a ${levelWord} in ${unit}!`, note: CERTIFICATE_NOTE };
}

/** "November 2, 2026", in the reader's own locale. */
export function certificateDate(t: number, locale = "en-CA"): string {
  return new Date(t).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}
