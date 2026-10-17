"use client";

import { useState } from "react";
import { cleanRewardName, readReward, rewardProgress, REWARD_COINS, REWARD_IDEAS, REWARD_NAME_MAX } from "@/lib/familyReward";
import { defaultChildSettings, newId, type Profile } from "@/lib/model";
import { useSay } from "@/lib/say";
import { useDerived, useStore } from "@/lib/store";

/** A reward a parent promises for coins earned, such as "500 coins = movie night". Given by the parent, outside the app. */
export function RewardGoal({ p }: { p: Profile }) {
  const d = useDerived(p.id);
  const stored = useStore((s) => s.settings[p.id]);
  const update = useStore((s) => s.updateSettings);
  const say = useSay();
  const s = stored ?? defaultChildSettings(p.id, false, p.grade);
  const reward = readReward(s);
  const progress = reward ? rewardProgress(reward, d.coinsEarned) : undefined;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [coins, setCoins] = useState<number>(REWARD_COINS[2]);
  const clean = cleanRewardName(name);
  const save = () => {
    if (!clean) return;
    update(p.id, { reward: { id: newId(), name: clean, coins, startCoins: d.coinsEarned, setAt: Date.now() } });
    setOpen(false);
    setName("");
  };
  return (
    <div className="mt-4 rounded-xl bg-paper p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">🎁 Reward for {p.name}</p>
        {reward ? (
          <button type="button" className="btn btn-soft min-h-11 px-4 text-sm" onClick={() => update(p.id, { reward: undefined })}>
            {progress?.met ? "Mark as given" : "Remove"}
          </button>
        ) : (
          !open && (
            <button type="button" className="btn btn-soft min-h-11 px-4 text-sm" onClick={() => setOpen(true)}>
              Set a reward
            </button>
          )
        )}
      </div>
      {reward && progress ? (
        <p className="mt-1 text-sm text-ink-soft" role="status">
          {progress.met
            ? say(`${p.name} earned ${progress.goal} coins for “${reward.name}”. Give the reward, then mark it as given.`)
            : say(`“${reward.name}”: ${progress.earned} of ${progress.goal} coins earned so far.`)}
        </p>
      ) : (
        !open && <p className="mt-1 text-sm text-ink-soft">{say("Promise something small for the coins they earn by learning, like a movie night. You give it yourself; the app never charges or spends their coins.")}</p>
      )}
      {open && (
        <div className="mt-3 flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm font-semibold">
            What will you give?
            <input
              type="text"
              value={name}
              maxLength={REWARD_NAME_MAX}
              onChange={(e) => setName(e.target.value)}
              placeholder="Movie night"
              className="min-h-11 rounded-xl border-2 border-line bg-white px-3 font-normal"
            />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Ideas">
            {REWARD_IDEAS.map((idea) => (
              <button key={idea} type="button" className="min-h-11 rounded-lg border-2 border-line bg-white px-3 text-sm font-semibold" onClick={() => setName(idea)}>
                {idea}
              </button>
            ))}
          </div>
          <div role="radiogroup" aria-label="Coins to earn" className="flex flex-wrap gap-2">
            {REWARD_COINS.map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={coins === n}
                onClick={() => setCoins(n)}
                className={`min-h-11 rounded-lg border-2 px-3 text-sm font-semibold ${coins === n ? "border-good-dark bg-good text-[#0f172a]" : "border-line bg-white"}`}
              >
                🪙 {n}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn btn-primary min-h-11 px-4 text-sm" disabled={!clean} onClick={save}>
              Save reward
            </button>
            <button type="button" className="btn btn-soft min-h-11 px-4 text-sm" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
