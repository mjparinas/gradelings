import type { Framework } from "@/content/frameworks";
import type { AgeBand, GradeId, SubjectId } from "@/content/types";

export type Country = Framework["country"];

export interface GameProps {
  grade: GradeId;
  band: AgeBand;
  /** The child's turned-on subjects (Word Bridge reads which French). */
  subjects?: readonly SubjectId[];
  /** The country of the child's curriculum: Map Dash, Coin Shop, Memory Match and Timeline Snap use its places, money and history. Canada when left out. */
  country?: Country;
  /** Report the score whenever it changes. */
  onScore: (score: number) => void;
  onLevel: (level: number) => void;
  /** Out of lives (or finished). */
  onOver: () => void;
}

export { GAMES, type GameInfo } from "@/lib/arcade";
