import type { SchedulerResponse } from "@/lib/meeting-scheduler/types";

export async function fetchSchedulerData(): Promise<SchedulerResponse> {
  const response = await fetch("/api/meeting-scheduler");
  if (!response.ok) throw new Error("Failed to load scheduler data");
  return response.json();
}
