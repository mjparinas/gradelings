"use client";

import { useEffect, useState } from "react";
import { disablePush, enablePush, pushStatus, pushSupported, savedTarget } from "@/lib/pushClient";
import { useProfiles } from "@/lib/store";
import { Choice, Panel } from "./common";

/**
 * Account > Notifications on this device. A grown-up picks who they are for: this grown-up (a weekly summary, and a
 * reminder after a few quiet days) or one child who uses this device (homework waiting). Children never see the
 * browser's permission prompt: it appears here, in the parent area. Shown only when the server has notifications on.
 */
export function NotificationsPanel() {
  const profiles = useProfiles();
  const [available, setAvailable] = useState(false);
  const [value, setValue] = useState(() => savedTarget());
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    void pushStatus().then((s) => setAvailable(s.enabled));
  }, []);
  if (!available) return null;

  async function pick(v: string) {
    setError("");
    setBusy(true);
    try {
      if (v === "") {
        await disablePush();
        setValue("");
        return;
      }
      const message = await enablePush(v === "parent" ? { kind: "parent" } : { kind: "child", profileId: v });
      if (message) setError(message);
      else setValue(v);
    } finally {
      setBusy(false);
    }
  }
  const kids = profiles.filter((p) => !p.deleted);
  return (
    <Panel title="Notifications on this device">
      <Choice
        label="Send notifications to"
        value={value}
        options={[
          { value: "", label: "Nobody" },
          { value: "parent", label: "A grown-up" },
          ...kids.map((p) => ({ value: p.id, label: p.name })),
        ]}
        onChange={(v) => !busy && void pick(v)}
        help={
          pushSupported()
            ? "A grown-up gets a note when the weekly summary is ready and when practice has been quiet for a few days. A child gets a note when homework from their teacher is waiting. Never more than a few a week, and never anything about how they did."
            : "This browser can't show notifications. On an iPhone or iPad, add Gradelings to the Home Screen first."
        }
      />
      {error && <p className="mt-1 text-sm text-nudge-dark">{error}</p>}
    </Panel>
  );
}
