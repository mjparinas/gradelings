// Spanish number words, for the Spanish course and Word Bridge.

const ONES = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
const TENS = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const HUNDREDS = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

/** A number from 0 to 1000 in words: 21 is "veintiuno", 35 "treinta y cinco", 100 "cien", 115 "ciento quince". */
export function numberWord(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 1000) throw new Error(`numberWord: ${n}`);
  if (n === 1000) return "mil";
  if (n === 100) return "cien";
  if (n >= 100) {
    const rest = n % 100;
    return rest ? `${HUNDREDS[Math.floor(n / 100)]} ${numberWord(rest)}` : HUNDREDS[n / 100];
  }
  if (n < 30) return ONES[n];
  return n % 10 ? `${TENS[Math.floor(n / 10)]} y ${ONES[n % 10]}` : TENS[n / 10];
}

/** The number words from 0 to 100. */
export const NUMBERS: string[] = Array.from({ length: 101 }, (_, n) => numberWord(n));
