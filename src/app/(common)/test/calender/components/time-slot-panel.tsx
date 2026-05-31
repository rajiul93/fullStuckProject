"use client";

import { cn } from "@/lib/utils";
import {
  canAddSlotToSelection,
  formatTime12h,
  formatTimeRange12h,
} from "@/lib/meeting-scheduler/slot-utils";
import type { DaySchedule, SchedulerConfig, TimeSlot } from "@/lib/meeting-scheduler/types";
import { getSlotStatusStyles } from "./status-legend";

type TimeSlotPanelProps = {
  day: DaySchedule | undefined;
  config: SchedulerConfig;
  selectedSlots: string[];
  onToggleSlot: (slotStart: string) => void;
};

function groupSlotsByHour(slots: TimeSlot[]): TimeSlot[][] {
  const groups = new Map<string, TimeSlot[]>();

  for (const slot of slots) {
    const hourKey = slot.start.slice(0, 2);
    const group = groups.get(hourKey) ?? [];
    group.push(slot);
    groups.set(hourKey, group);
  }

  return Array.from(groups.values());
}

export function TimeSlotPanel({
  day,
  config,
  selectedSlots,
  onToggleSlot,
}: TimeSlotPanelProps) {
  if (!day) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
        Select an available date to view time slots
      </div>
    );
  }

  if (day.status === "holiday") {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="font-medium text-amber-900">Holiday</p>
        <p className="mt-1 text-sm text-amber-700">No meetings can be scheduled on this date.</p>
      </div>
    );
  }

  if (day.status === "unavailable") {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="font-medium text-slate-700">Unavailable</p>
        <p className="mt-1 text-sm text-slate-500">This date is not open for booking.</p>
      </div>
    );
  }

  const hourlyGroups = groupSlotsByHour(day.slots);
  const maxSlots = config.maxConsecutiveSlots;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <h3 className="text-sm font-semibold text-slate-900">Select Time Slots</h3>
        <span className="text-xs text-slate-500">
          {formatTime12h(config.officeStart)} – {formatTime12h(config.officeEnd)}
        </span>
      </div>

      {selectedSlots.length > 0 && (
        <p className="text-xs font-medium text-indigo-900">
          {selectedSlots.length}/{maxSlots} consecutive slots selected
        </p>
      )}

      <div className="max-h-[min(50vh,420px)] space-y-2 overflow-y-auto pr-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:max-h-[420px] sm:space-y-3 [&::-webkit-scrollbar]:hidden">
        {hourlyGroups.map((group) => (
          <div key={group[0].start} className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
            {group.map((slot) => {
              const isSelected = selectedSlots.includes(slot.start);
              const isAvailable = slot.status === "available";
              const canAdd =
                isAvailable &&
                canAddSlotToSelection(
                  selectedSlots,
                  slot.start,
                  config.slotIntervalMinutes,
                  maxSlots
                );
              const isClickable = isAvailable && (isSelected || canAdd);

              return (
                <button
                  key={`${slot.start}-${slot.end}`}
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onToggleSlot(slot.start)}
                  title={slot.label ?? slot.status}
                  className={cn(
                    "min-h-[3.25rem] rounded-xl border px-3 py-2.5 text-left text-xs transition-all duration-200 sm:min-h-0 sm:py-3 sm:text-sm",
                    getSlotStatusStyles(slot.status, isSelected),
                    isClickable && "cursor-pointer active:scale-[0.98]",
                    isAvailable &&
                      !isSelected &&
                      !canAdd &&
                      selectedSlots.length > 0 &&
                      "opacity-50"
                  )}
                >
                  <span className="block font-semibold">
                    {formatTimeRange12h(slot.start, slot.end)}
                  </span>
                  {slot.status === "break" && slot.label && (
                    <span className="mt-0.5 block text-xs opacity-80">{slot.label}</span>
                  )}
                  {isSelected && (
                    <span className="mt-0.5 block text-xs font-medium opacity-90">
                      Selected
                    </span>
                  )}
                  {isAvailable && !isSelected && canAdd && selectedSlots.length > 0 && (
                    <span className="mt-0.5 block text-xs opacity-70">Click to add</span>
                  )}
                  {isAvailable &&
                    !isSelected &&
                    !canAdd &&
                    selectedSlots.length >= maxSlots && (
                      <span className="mt-0.5 block text-xs text-amber-700">Max slots reached</span>
                    )}
                  {isAvailable && !isSelected && !canAdd && selectedSlots.length === 0 && (
                    <span className="mt-0.5 block text-xs opacity-70">Click to start</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
