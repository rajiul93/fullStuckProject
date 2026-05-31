export type DateStatus = "available" | "unavailable" | "holiday";

export type SlotStatus = "available" | "disabled" | "break" | "booked";

export type BreakType = "breakfast" | "lunch" | "tea-prayer";

export type TimeSlot = {
  start: string;
  end: string;
  status: SlotStatus;
  breakType?: BreakType;
  label?: string;
};

export type DaySchedule = {
  date: string;
  status: DateStatus;
  slots: TimeSlot[];
};

export type MeetingDuration = {
  id: string;
  label: string;
  hours: number;
};

export type BreakConfig = {
  type: BreakType;
  label: string;
  start: string;
  end: string;
};

export type SchedulerConfig = {
  officeStart: string;
  officeEnd: string;
  slotIntervalMinutes: number;
  maxConsecutiveSlots: number;
  durations: MeetingDuration[];
  breaks: BreakConfig[];
};

export type SchedulerResponse = {
  config: SchedulerConfig;
  days: DaySchedule[];
};

export type BookingSelection = {
  date: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  durationLabel: string;
  selectedSlots: string[];
};
