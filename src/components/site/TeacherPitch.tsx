import { APP_NAME } from "@/lib/brand";
import { TEACHER_SIGNUP } from "./teachers";
import { AppLink } from "./AppLink";

/**
 * A short persuasion strip for framework/grade teacher pages: keeps the “assign in minutes”
 * peak when the hub demo is not on the page, without another full carousel.
 */
export function TeacherPitch({ gradeLabel }: { gradeLabel?: string }) {
  const what = gradeLabel ? `Assign ${gradeLabel} units` : "Assign units";
  return (
    <aside
      aria-labelledby="teacher-pitch"
      className="mt-6 flex flex-col gap-3 rounded-2xl border-2 border-[#4f8ef7]/35 bg-[#e8f1ff]/60 p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <h2 id="teacher-pitch" className="text-xl font-bold">
          {what} in minutes
        </h2>
        <p className="mt-1 font-read text-ink-soft">
          Classes are free for now. Students sign in with a join code — no email or password. {APP_NAME} shows practice, not a report-card mark.
        </p>
      </div>
      <AppLink href={TEACHER_SIGNUP} className="btn btn-good min-h-12 shrink-0 px-6 text-lg">
        Create a free teacher account
      </AppLink>
    </aside>
  );
}
