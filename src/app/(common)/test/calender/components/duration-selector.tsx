"use client";

import { cn } from "@/lib/utils";
import type { MeetingDuration } from "@/lib/meeting-scheduler/types";

type DurationSelectorProps = {
  durations: MeetingDuration[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function DurationSelector({
  durations,
  selectedId,
  onSelect,
}: DurationSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-900">Meeting Duration</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {durations.map((duration) => {
          const selected = selectedId === duration.id;
          return (
            <button
              key={duration.id}
              type="button"
              onClick={() => onSelect(duration.id)}
              className={cn(
                "rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-200",
                selected
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:shadow-sm"
              )}
            >
              {duration.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
