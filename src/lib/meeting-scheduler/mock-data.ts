import dayjs from "dayjs";
import {
  generateTimeSegments,
  getNext14Days,
} from "./slot-utils";
import type {
  BreakConfig,
  DaySchedule,
  MeetingDuration,
  SchedulerConfig,
  SchedulerResponse,
  SlotStatus,
  TimeSlot,
} from "./types";

const DEFAULT_BREAKS: BreakConfig[] = [
  { type: "breakfast", label: "Breakfast Break", start: "09:00", end: "09:30" },
  { type: "lunch", label: "Lunch Break", start: "13:00", end: "14:00" },
  { type: "tea-prayer", label: "Tea / Prayer Break", start: "16:00", end: "16:30" },
];

const DEFAULT_DURATIONS: MeetingDuration[] = [
  { id: "1h", label: "1 Hour", hours: 1 },
  { id: "2h", label: "2 Hours", hours: 2 },
  { id: "3h", label: "3 Hours", hours: 3 },
  { id: "custom-90", label: "90 Minutes (Admin)", hours: 1.5 },
];

export const DEFAULT_SCHEDULER_CONFIG: SchedulerConfig = {
  officeStart: "08:00",
  officeEnd: "20:00",
  slotIntervalMinutes: 30,
  maxConsecutiveSlots: 4,
  durations: DEFAULT_DURATIONS,
  breaks: DEFAULT_BREAKS,
};

function overlaps(start: string, end: string, bStart: string, bEnd: string) {
  return start < bEnd && end > bStart;
}

function buildSlotsForDay(
  config: SchedulerConfig,
  overrides: Partial<Record<string, SlotStatus | "break">> = {}
): TimeSlot[] {
  const segments = generateTimeSegments(config);

  return segments.map(({ start, end }) => {
    const override = overrides[start];
    const breakMatch = config.breaks.find((b) =>
      overlaps(start, end, b.start, b.end)
    );

    if (override === "break" || (!override && breakMatch)) {
      return {
        start,
        end,
        status: "break" as const,
        breakType: breakMatch?.type,
        label: breakMatch?.label ?? "Break",
      };
    }

    if (override === "disabled") {
      return { start, end, status: "disabled" as const, label: "Disabled" };
    }

    if (override === "booked") {
      return { start, end, status: "booked" as const, label: "Booked" };
    }

    if (override === "available" || !override) {
      return { start, end, status: "available" as const };
    }

    return { start, end, status: override };
  });
}

/** Simulates backend-controlled schedule for the next 14 days. */
export function buildMockSchedulerData(): SchedulerResponse {
  const config = DEFAULT_SCHEDULER_CONFIG;
  const dates = getNext14Days(dayjs().startOf("day"));

  const days: DaySchedule[] = dates.map((date, index) => {
    const dayOfWeek = dayjs(date).day();

    if (index === 3) {
      return { date, status: "holiday", slots: buildSlotsForDay(config) };
    }

    if (index === 5 || dayOfWeek === 0) {
      return { date, status: "unavailable", slots: buildSlotsForDay(config) };
    }

    const slotOverrides: Partial<Record<string, SlotStatus | "break">> = {
      "08:00": "available",
      "08:30": "disabled",
      "09:30": "available",
      "10:00": "booked",
      "10:30": "booked",
      "11:00": "available",
      "14:00": "available",
      "15:00": "disabled",
      "17:00": "booked",
      "17:30": "booked",
    };

    if (index % 2 === 0) {
      slotOverrides["12:00"] = "booked";
      slotOverrides["12:30"] = "booked";
    }

    return {
      date,
      status: "available",
      slots: buildSlotsForDay(config, slotOverrides),
    };
  });

  return { config, days };
}
