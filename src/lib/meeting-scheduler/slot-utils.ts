import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { BookingSelection, DaySchedule, SchedulerConfig, TimeSlot } from "./types";

dayjs.extend(customParseFormat);

const TIME_FORMAT = "HH:mm";

export function parseTime(time: string) {
  return dayjs(time, TIME_FORMAT);
}

export function formatTime12h(time: string): string {
  return parseTime(time).format("h:mm A");
}

export function formatTimeRange12h(start: string, end: string): string {
  return `${formatTime12h(start)} – ${formatTime12h(end)}`;
}

export function addMinutes(time: string, minutes: number): string {
  return parseTime(time).add(minutes, "minute").format(TIME_FORMAT);
}

export function getSlotDurationMinutes(slot: TimeSlot): number {
  return parseTime(slot.end).diff(parseTime(slot.start), "minute");
}

export function generateTimeSegments(
  config: SchedulerConfig
): { start: string; end: string }[] {
  const segments: { start: string; end: string }[] = [];
  let cursor = parseTime(config.officeStart);
  const end = parseTime(config.officeEnd);

  while (cursor.isBefore(end)) {
    const segmentStart = cursor.format(TIME_FORMAT);
    const segmentEnd = cursor
      .add(config.slotIntervalMinutes, "minute")
      .format(TIME_FORMAT);
    segments.push({ start: segmentStart, end: segmentEnd });
    cursor = parseTime(segmentEnd);
  }

  return segments;
}

function slotCoversTime(slot: TimeSlot, time: string): boolean {
  const t = parseTime(time);
  return (
    (t.isSame(parseTime(slot.start)) || t.isAfter(parseTime(slot.start))) &&
    t.isBefore(parseTime(slot.end))
  );
}

function getSegmentSlot(day: DaySchedule, segmentStart: string): TimeSlot | undefined {
  return day.slots.find((slot) => slotCoversTime(slot, segmentStart));
}

function isSegmentBookable(slot: TimeSlot | undefined): boolean {
  return !!slot && slot.status === "available";
}

/** Returns consecutive segment starts needed for a booking. */
export function getRequiredSegmentStarts(
  startTime: string,
  durationHours: number,
  intervalMinutes: number
): string[] {
  const count = Math.ceil((durationHours * 60) / intervalMinutes);
  const starts: string[] = [];
  let cursor = startTime;

  for (let i = 0; i < count; i++) {
    starts.push(cursor);
    cursor = addMinutes(cursor, intervalMinutes);
  }

  return starts;
}

export function isStartTimeBookable(
  day: DaySchedule,
  startTime: string,
  durationHours: number,
  intervalMinutes: number,
  officeEnd = "20:00"
): boolean {
  if (day.status !== "available") return false;

  const segmentStarts = getRequiredSegmentStarts(
    startTime,
    durationHours,
    intervalMinutes
  );

  const lastStart = segmentStarts[segmentStarts.length - 1];
  const bookingEnd = addMinutes(lastStart, intervalMinutes);
  if (parseTime(bookingEnd).isAfter(parseTime(officeEnd))) return false;

  return segmentStarts.every((segmentStart) => {
    const slot = getSegmentSlot(day, segmentStart);
    return isSegmentBookable(slot);
  });
}

export function getBookingEndTime(
  startTime: string,
  durationHours: number
): string {
  return parseTime(startTime).add(durationHours, "hour").format(TIME_FORMAT);
}

export function getBookableStartTimes(
  day: DaySchedule,
  durationHours: number,
  intervalMinutes: number,
  officeEnd = "20:00"
): string[] {
  if (day.status !== "available") return [];

  const uniqueStarts = new Set<string>();
  for (const slot of day.slots) {
    if (slot.status !== "available") continue;
    uniqueStarts.add(slot.start);
  }

  return Array.from(uniqueStarts)
    .filter((start) =>
      isStartTimeBookable(
        day,
        start,
        durationHours,
        intervalMinutes,
        officeEnd
      )
    )
    .sort((a, b) => parseTime(a).valueOf() - parseTime(b).valueOf());
}

export const MAX_CONSECUTIVE_SLOTS = 4;

export function sortSlotStarts(starts: string[]): string[] {
  return [...starts].sort((a, b) => parseTime(a).valueOf() - parseTime(b).valueOf());
}

export function isAdjacentSlot(
  a: string,
  b: string,
  intervalMinutes: number
): boolean {
  return (
    addMinutes(a, intervalMinutes) === b ||
    addMinutes(b, intervalMinutes) === a
  );
}

export function areConsecutiveSlots(
  starts: string[],
  intervalMinutes: number
): boolean {
  if (starts.length <= 1) return true;
  const sorted = sortSlotStarts(starts);
  for (let i = 1; i < sorted.length; i++) {
    if (!isAdjacentSlot(sorted[i - 1], sorted[i], intervalMinutes)) {
      return false;
    }
  }
  return true;
}

/** Toggle a slot in a consecutive multi-slot selection (max 4 adjacent). */
export function toggleConsecutiveSlot(
  selected: string[],
  slotStart: string,
  day: DaySchedule,
  intervalMinutes: number,
  maxSlots = MAX_CONSECUTIVE_SLOTS
): { slots: string[]; error?: string } {
  const slot = day.slots.find((s) => s.start === slotStart);
  if (!slot || slot.status !== "available") {
    return { slots: selected };
  }

  const sorted = sortSlotStarts(selected);

  if (sorted.includes(slotStart)) {
    return { slots: sorted.filter((s) => s !== slotStart) };
  }

  if (sorted.length === 0) {
    return { slots: [slotStart] };
  }

  if (sorted.length >= maxSlots) {
    const first = sorted[0];
    const last = sorted[sorted.length - 1];

    if (isAdjacentSlot(slotStart, first, intervalMinutes)) {
      return {
        slots: sortSlotStarts([slotStart, ...sorted.slice(0, maxSlots - 1)]),
      };
    }
    if (isAdjacentSlot(slotStart, last, intervalMinutes)) {
      return {
        slots: sortSlotStarts([...sorted.slice(1), slotStart]),
      };
    }

    return {
      slots: [slotStart],
      error: `Maximum ${maxSlots} consecutive slots allowed`,
    };
  }

  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  if (isAdjacentSlot(slotStart, first, intervalMinutes)) {
    return { slots: sortSlotStarts([slotStart, ...sorted]) };
  }
  if (isAdjacentSlot(slotStart, last, intervalMinutes)) {
    return { slots: sortSlotStarts([...sorted, slotStart]) };
  }

  return { slots: [slotStart] };
}

export function canAddSlotToSelection(
  selected: string[],
  slotStart: string,
  intervalMinutes: number,
  maxSlots: number
): boolean {
  if (selected.includes(slotStart)) return true;
  if (selected.length === 0) return true;
  if (selected.length >= maxSlots) {
    const sorted = sortSlotStarts(selected);
    return (
      isAdjacentSlot(slotStart, sorted[0], intervalMinutes) ||
      isAdjacentSlot(slotStart, sorted[sorted.length - 1], intervalMinutes)
    );
  }
  const sorted = sortSlotStarts(selected);
  return (
    isAdjacentSlot(slotStart, sorted[0], intervalMinutes) ||
    isAdjacentSlot(slotStart, sorted[sorted.length - 1], intervalMinutes)
  );
}

export function buildBookingFromSlots(
  selectedStarts: string[],
  day: DaySchedule,
  date: string,
  intervalMinutes: number
): BookingSelection | null {
  if (selectedStarts.length === 0 || day.status !== "available") return null;

  const sorted = sortSlotStarts(selectedStarts);
  if (!areConsecutiveSlots(sorted, intervalMinutes)) return null;

  for (const start of sorted) {
    const slot = day.slots.find((s) => s.start === start);
    if (!slot || slot.status !== "available") return null;
  }

  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const lastSlot = day.slots.find((s) => s.start === last);
  const endTime = lastSlot?.end ?? addMinutes(last, intervalMinutes);
  const totalMinutes = sorted.length * intervalMinutes;

  return {
    date,
    startTime: first,
    endTime,
    durationHours: totalMinutes / 60,
    durationLabel: `${sorted.length} slot${sorted.length > 1 ? "s" : ""} (${totalMinutes} min)`,
    selectedSlots: sorted,
  };
}

export function getNext14Days(fromDate = dayjs()): string[] {
  return Array.from({ length: 14 }, (_, i) =>
    fromDate.add(i, "day").format("YYYY-MM-DD")
  );
}

export function formatDisplayDate(date: string): string {
  return dayjs(date).format("ddd, MMM D");
}

export function formatFullDate(date: string): string {
  return dayjs(date).format("dddd, MMMM D, YYYY");
}
