import type { AgeBand, GradeId, SubjectId } from "@/content/types";

export interface GameProps {
  grade: GradeId;
  band: AgeBand;
  /** The child's turned-on subjects (Word Bridge reads which French). */
  subjects?: readonly SubjectId[];
  /** Report the score whenever it changes. */
  onScore: (score: number) => void;
  onLevel: (level: number) => void;
  /** Out of lives (or finished). */
  onOver: () => void;
}

export { GAMES, type GameInfo } from "@/lib/arcade";
