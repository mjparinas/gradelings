import { formatMoney } from "@/content/money";
import { placeLabel } from "@/content/placeLabel";
import { hashSeed, shuffle, withSeed } from "@/content/random";
import type { ChoiceQuestion, Question } from "@/content/types";
import { Disclosure } from "../Disclosure";
import { TryChoices } from "./TryChoices";
import { Blocks, Coin, QuestionVisual, Shape, WithBlanks } from "../visuals";

// A static, read-only preview of a question for the public curriculum pages,
// with the answer tucked away until a parent asks to see it. The real, interactive version lives in /play/.

export function answerText(q: Question): string {
  switch (q.kind) {
    case "choice": {
      const c = q.choices.find((x) => x.id === q.answer);
      return c ? [c.emoji, c.label].filter(Boolean).join(" ") : q.answer;
    }
    case "build":
      return `${q.target}`;
    case "coins":
      return formatMoney(q.target);
    case "order":
      return q.items.map((i) => i.label).join(" → ");
    case "sort":
      return q.bins.map((b) => `${b.emoji} ${b.label}: ${q.items.filter((i) => i.bin === b.id).map((i) => i.label).join(", ")}`).join(" · ");
    case "input":
      return `${q.answer}${q.suffix ? ` ${q.suffix}` : ""}`;
    case "shade":
      return `${q.target} of ${q.parts} parts shaded`;
    case "place":
      return placeLabel(q, q.target);
  }
}

const chip = "inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-line bg-white px-3 py-1.5 font-read text-lg";

function ChoiceContent({ c, q }: { c: ChoiceQuestion["choices"][number]; q: ChoiceQuestion }) {
  return (
    <>
      {c.emoji && <span className="text-2xl">{c.emoji}</span>}
      {c.shape && <Shape shape={c.shape} size={44} />}
      {c.coin && <Coin cents={c.coin} scale={0.6} currency={q.currency} />}
      {!c.coin && <span>{c.label}</span>}
    </>
  );
}

function Body({ q, seed }: { q: Question; seed: number }) {
  switch (q.kind) {
    case "choice":
      return (
        <ul className="flex flex-wrap gap-2" aria-label="Choices">
          {q.choices.map((c) => (
            <li key={c.id} className={chip}>
              <ChoiceContent c={c} q={q} />
            </li>
          ))}
        </ul>
      );
    case "build":
      return <p className="font-read text-ink-soft">Build it with tens rods{q.hundreds ? ", hundreds flats" : ""} and ones cubes.</p>;
    case "coins":
      return (
        <div className="flex flex-wrap items-center gap-2" aria-label="Coins to choose from">
          {q.coins.map((c, i) => (
            <Coin key={i} cents={c} scale={0.6} currency={q.currency} />
          ))}
        </div>
      );
    case "order":
      return (
        <ul className="flex flex-wrap gap-2">
          {withSeed(seed, () => shuffle(q.items)).map((i) => (
            <li key={i.id} className={chip}>
              {i.emoji && <span className="text-2xl">{i.emoji}</span>}
              {i.label}
            </li>
          ))}
        </ul>
      );
    case "sort":
      return (
        <div className="flex flex-col gap-2">
          <p className="font-read text-ink-soft">Sort into: {q.bins.map((b) => `${b.emoji} ${b.label}`).join(" · ")}</p>
          <ul className="flex flex-wrap gap-2">
            {q.items.map((i) => (
              <li key={i.id} className={chip}>
                <span className="text-2xl">{i.emoji}</span>
                {i.label}
              </li>
            ))}
          </ul>
        </div>
      );
    case "input":
      return (
        <p className="flex items-center gap-2 font-read text-lg text-ink-soft">
          <span className="inline-block h-11 w-24 rounded-xl border-2 border-dashed border-line bg-white">
            <span className="sr-only">answer box</span>
          </span>
          {q.suffix}
        </p>
      );
    case "shade":
      return <p className="font-read text-ink-soft">Tap the parts to shade them, in a bar or circle cut into {q.parts} equal parts.</p>;
    case "place":
      return <p className="font-read text-ink-soft">Slide the marker along a number line from {placeLabel(q, q.min)} to {placeLabel(q, q.max)}.</p>;
  }
}

/**
 * `tryIt`: on a unit's page, a tap-to-answer question can be answered right there (`TryChoices`), with the app
 * link after it. Elsewhere (worksheets) the answer stays behind "Show answer".
 */
export function SampleQuestion({ q, n, seedText, className = "", tryIt }: { q: Question; n: number; seedText: string; className?: string; tryIt?: { play: string; playLabel: string } }) {
  return (
    <li className={`card flex flex-col gap-3 p-4 sm:p-5 ${className}`}>
      <p className="text-sm font-bold text-ink-soft">Question {n}</p>
      <p className="font-read text-xl font-bold">
        <WithBlanks text={q.prompt} />
      </p>
      {q.visual && (
        <div className="flex justify-center overflow-x-auto rounded-2xl bg-paper p-3" tabIndex={0}>
          <QuestionVisual visual={q.visual} />
        </div>
      )}
      {tryIt && q.kind === "choice" ? (
        <TryChoices
          choices={q.choices.map((c) => ({ id: c.id, content: <ChoiceContent c={c} q={q} /> }))}
          answer={q.answer}
          answerLabel={answerText(q)}
          hint={q.hint}
          play={tryIt.play}
          playLabel={tryIt.playLabel}
        />
      ) : (
        <>
          <Body q={q} seed={hashSeed(seedText)} />
          <Answer q={q} />
        </>
      )}
    </li>
  );
}

function Answer({ q }: { q: Question }) {
  return (
    <Disclosure className="rounded-xl bg-good-soft px-3 py-2" titleClassName="font-semibold text-good-dark" title="Show answer">
      <p className="mt-1 font-read text-lg font-bold">{answerText(q)}</p>
      {q.kind === "build" && (
        <div className="my-2">
          <Blocks hundreds={Math.floor(q.target / 100)} tens={Math.floor((q.target % 100) / 10)} ones={q.target % 10} size={10} />
        </div>
      )}
      <p className="font-read text-sm text-ink-soft">Hint: {q.hint}</p>
    </Disclosure>
  );
}
