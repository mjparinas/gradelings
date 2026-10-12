import "server-only";
import { query, run } from "./db";

// Records for the admin panel's System page: when scheduled jobs ran and how incoming webhooks went.
// Recording never breaks the job or webhook it describes: a failure here is only logged.

const DAY = 86_400_000;
const KEEP = 60 * DAY;

/** Runs a scheduled job and records its start, end and outcome. The job's own result or error is passed on. */
export async function trackJob(job: string, fn: () => Promise<Response>, now = Date.now): Promise<Response> {
  const started = now();
  let id: number | null = null;
  try {
    await run("DELETE FROM job_runs WHERE started_at < ?", [started - KEEP]);
    const rows = await query<{ id: number }>("INSERT INTO job_runs (job, started_at) VALUES (?, ?) RETURNING id", [job, started]);
    id = rows[0] ? Number(rows[0].id) : null;
  } catch (e) {
    console.error("[monitor] could not record job start", (e as Error).message);
  }
  const finish = async (ok: boolean, detail: string) => {
    if (id === null) return;
    await run("UPDATE job_runs SET finished_at = ?, ok = ?, detail = ? WHERE id = ?", [now(), ok ? 1 : 0, detail.slice(0, 1000), id]).catch((e: Error) =>
      console.error("[monitor] could not record job end", e.message),
    );
  };
  try {
    const res = await fn();
    await finish(res.ok, await res.clone().text().catch(() => ""));
    return res;
  } catch (e) {
    await finish(false, (e as Error).message);
    throw e;
  }
}

/** Records one incoming webhook: its event type, and the error when it was refused or failed. */
export async function recordWebhook(source: "stripe" | "resend", ok: boolean, type?: string | null, error?: string, at = Date.now()): Promise<void> {
  try {
    await run("INSERT INTO webhook_log (source, at, ok, type, error) VALUES (?, ?, ?, ?, ?)", [source, at, ok ? 1 : 0, type?.slice(0, 100) ?? null, error?.slice(0, 300) ?? null]);
    await run("DELETE FROM webhook_log WHERE at < ?", [at - KEEP]);
  } catch (e) {
    console.error("[monitor] could not record webhook", (e as Error).message);
  }
}

export interface JobRun {
  job: string;
  startedAt: number;
  finishedAt: number | null;
  ok: boolean | null;
  detail: string | null;
}

export async function recentJobRuns(job: string, limit = 10): Promise<JobRun[]> {
  const rows = await query<Record<string, unknown>>("SELECT job, started_at, finished_at, ok, detail FROM job_runs WHERE job = ? ORDER BY started_at DESC LIMIT ?", [job, limit]);
  return rows.map((r) => ({
    job: String(r.job),
    startedAt: Number(r.started_at),
    finishedAt: r.finished_at == null ? null : Number(r.finished_at),
    ok: r.ok == null ? null : Boolean(Number(r.ok)),
    detail: r.detail == null ? null : String(r.detail),
  }));
}

export interface WebhookSummary {
  lastAt: number | null;
  lastOkAt: number | null;
  received: number;
  failed: number;
  recentFailures: { at: number; type: string | null; error: string | null }[];
}

/** Webhooks from one source since a time. */
export async function webhookSummary(source: string, since: number): Promise<WebhookSummary> {
  const [counts, last, failures] = await Promise.all([
    query<{ n: number; bad: number }>("SELECT COUNT(*) AS n, SUM(CASE WHEN ok = 0 THEN 1 ELSE 0 END) AS bad FROM webhook_log WHERE source = ? AND at >= ?", [source, since]),
    query<{ last: number | null; last_ok: number | null }>("SELECT MAX(at) AS last, MAX(CASE WHEN ok = 1 THEN at END) AS last_ok FROM webhook_log WHERE source = ?", [source]),
    query<{ at: number; type: string | null; error: string | null }>("SELECT at, type, error FROM webhook_log WHERE source = ? AND ok = 0 AND at >= ? ORDER BY at DESC LIMIT 10", [source, since]),
  ]);
  return {
    lastAt: last[0]?.last == null ? null : Number(last[0].last),
    lastOkAt: last[0]?.last_ok == null ? null : Number(last[0].last_ok),
    received: Number(counts[0]?.n ?? 0),
    failed: Number(counts[0]?.bad ?? 0),
    recentFailures: failures.map((f) => ({ at: Number(f.at), type: f.type, error: f.error })),
  };
}
