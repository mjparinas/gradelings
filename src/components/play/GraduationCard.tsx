"use client";

import { useEffect, useState } from "react";
import { gradeLabel } from "@/lib/gradeLabel";
import { graduatedFrom, rememberGrade } from "@/lib/graduation";
import { celebrate } from "@/lib/juice";
import { sounds } from "@/lib/sound";
import { useActiveProfile } from "@/lib/store";
import { Companion } from "./Companion";

/** "You finished Grade 4!": shown once, on the first visit after a parent moves the child up a grade. */
export function GraduationCard() {
  const profile = useActiveProfile();
  const [from, setFrom] = useState(() => (profile ? graduatedFrom(profile.id, profile.grade) : null));
  useEffect(() => {
    if (!from) return;
    sounds.complete();
    celebrate(["🎓", "⭐"], "cannons");
  }, [from]);
  if (!profile || !from) return null;
  const done = () => {
    rememberGrade(profile.id, profile.grade);
    setFrom(null);
  };
  return (
    <section className="card flex flex-col items-center gap-3 border-2 border-[#f0bd2a] bg-[#fff8e6] p-4 text-center animate-pop-in" aria-label="Graduation" data-testid="graduation-card">
      <div className="relative">
        <Companion mood="cheer" size={110} />
        <span aria-hidden="true" className="absolute -top-3 left-1/2 -translate-x-1/2 text-5xl">🎓</span>
      </div>
      <h2 className="text-2xl font-bold">You finished {gradeLabel(from, profile.framework)}!</h2>
      <p className="font-read text-lg">Welcome to {gradeLabel(profile.grade, profile.framework)}, {profile.name}. New adventures are waiting!</p>
      <button type="button" className="btn btn-good min-h-14 px-8 text-xl" onClick={done}>
        Let&apos;s go!
      </button>
    </section>
  );
}
