"use client";

import { CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addMinutes,
  formatFullDate,
  formatTimeRange12h,
} from "@/lib/meeting-scheduler/slot-utils";
import type { BookingSelection } from "@/lib/meeting-scheduler/types";

type BookingSummaryProps = {
  selection: BookingSelection | null;
  onConfirm: () => void;
  onClear: () => void;
  slotIntervalMinutes?: number;
};

export function BookingSummary({
  selection,
  onConfirm,
  onClear,
  slotIntervalMinutes = 30,
}: BookingSummaryProps) {
  if (!selection) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
        Select a date and up to 4 consecutive time slots to continue
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6">
      <h3 className="text-sm font-semibold text-slate-900">Booking Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
          <div>
            <p className="font-medium text-slate-900">{formatFullDate(selection.date)}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
          <div>
            <p className="font-medium text-slate-900">
              {formatTimeRange12h(selection.startTime, selection.endTime)}
            </p>
            <p className="text-slate-500">{selection.durationLabel}</p>
          </div>
        </div>
        <div className="rounded-lg bg-white/80 p-3">
          <p className="mb-2 text-xs font-medium text-slate-700">Selected slots</p>
          <ul className="space-y-1">
            {selection.selectedSlots.map((start) => (
              <li key={start} className="text-xs text-slate-600">
                • {formatTimeRange12h(start, addMinutes(start, slotIntervalMinutes))}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onClear}
          className="w-full sm:flex-1"
        >
          Clear
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          className="w-full bg-indigo-600 hover:bg-indigo-700 sm:flex-1"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
