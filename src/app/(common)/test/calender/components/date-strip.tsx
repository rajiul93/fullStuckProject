"use client";

import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { formatDisplayDate } from "@/lib/meeting-scheduler/slot-utils";
import type { DaySchedule } from "@/lib/meeting-scheduler/types";
import { getDateStatusStyles } from "./status-legend";

type DateStripProps = {
  days: DaySchedule[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
};

export function DateStrip({ days, selectedDate, onSelectDate }: DateStripProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900">Select a Date</h3>
        <span className="shrink-0 text-xs text-slate-500">Next 14 days</span>
      </div>
      <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-2 [-webkit-overflow-scrolling:touch] sm:mx-0 sm:px-0">
        {days.map((day) => {
          const isSelected = selectedDate === day.date;
          const isSelectable = day.status === "available";
          const isToday = dayjs(day.date).isSame(dayjs(), "day");

          return (
            <button
              key={day.date}
              type="button"
              disabled={!isSelectable}
              onClick={() => isSelectable && onSelectDate(day.date)}
              className={cn(
                "flex min-h-[5.25rem] min-w-[4.25rem] shrink-0 snap-start flex-col items-center justify-center rounded-xl border px-2.5 py-2.5 transition-all duration-200 sm:min-w-[4.5rem] sm:px-3 sm:py-3",
                getDateStatusStyles(day.status, isSelected)
              )}
            >
              <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">
                {dayjs(day.date).format("ddd")}
              </span>
              <span className="mt-0.5 text-base font-bold sm:mt-1 sm:text-lg">
                {dayjs(day.date).format("D")}
              </span>
              <span className="mt-0.5 text-[10px] opacity-70">
                {dayjs(day.date).format("MMM")}
              </span>
              {isToday && (
                <span className="mt-1 rounded-full bg-indigo-100 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-700">
                  Today
                </span>
              )}
              {day.status === "holiday" && (
                <span className="mt-1 text-[9px] font-medium">Holiday</span>
              )}
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <p className="text-xs text-slate-600 sm:text-sm">{formatDisplayDate(selectedDate)}</p>
      )}
    </div>
  );
}
