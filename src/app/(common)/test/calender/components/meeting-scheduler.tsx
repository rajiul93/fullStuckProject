"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarClock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchSchedulerData } from "@/lib/meeting-scheduler/client";
import {
  buildBookingFromSlots,
  formatTimeRange12h,
  toggleConsecutiveSlot,
} from "@/lib/meeting-scheduler/slot-utils";
import type { BookingSelection } from "@/lib/meeting-scheduler/types";
import { BookingSummary } from "./booking-summary";
import { DateStrip } from "./date-strip";
import { StatusLegend } from "./status-legend";
import { TimeSlotPanel } from "./time-slot-panel";

export function MeetingScheduler() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["meeting-scheduler"],
    queryFn: fetchSchedulerData,
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const firstAvailable = data?.days.find((d) => d.status === "available");
  const activeDate = selectedDate ?? firstAvailable?.date ?? null;
  const activeDay = data?.days.find((d) => d.date === activeDate);

  const bookingSelection: BookingSelection | null = useMemo(() => {
    if (!data || !activeDate || !activeDay || selectedSlots.length === 0) {
      return null;
    }

    return buildBookingFromSlots(
      selectedSlots,
      activeDay,
      activeDate,
      data.config.slotIntervalMinutes
    );
  }, [data, activeDate, activeDay, selectedSlots]);

  function handleDateSelect(date: string) {
    setSelectedDate(date);
    setSelectedSlots([]);
  }

  function handleToggleSlot(slotStart: string) {
    if (!activeDay || !data) return;

    const { slots, error } = toggleConsecutiveSlot(
      selectedSlots,
      slotStart,
      activeDay,
      data.config.slotIntervalMinutes,
      data.config.maxConsecutiveSlots
    );

    if (error) toast.info(error);
    setSelectedSlots(slots);
  }

  function handleClearSlots() {
    setSelectedSlots([]);
  }

  function handleConfirmBooking() {
    if (!bookingSelection) return;
    toast.success("Meeting booked successfully!", {
      description: `${bookingSelection.durationLabel} on ${bookingSelection.date}`,
    });
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center sm:min-h-[480px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-700 sm:p-8">
        Failed to load scheduler. Please try again.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-5 text-center sm:mb-8">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 sm:mb-4 sm:h-14 sm:w-14">
          <CalendarClock className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Schedule a Meeting
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 sm:mt-2">
          Select up to {data.config.maxConsecutiveSlots} consecutive time slots
        </p>
      </div>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <CardHeader className="border-b border-slate-100 bg-slate-50/80 px-4 py-4 sm:px-6 sm:pb-6">
          <CardTitle className="text-base text-slate-900 sm:text-lg">
            Meeting Scheduler
          </CardTitle>
          <StatusLegend className="mt-3 sm:mt-4" />
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-5 border-b border-slate-100 p-4 sm:space-y-6 sm:p-6 lg:border-b-0 lg:border-r">
              <DateStrip
                days={data.days}
                selectedDate={activeDate}
                onSelectDate={handleDateSelect}
              />

              <TimeSlotPanel
                day={activeDay}
                config={data.config}
                selectedSlots={selectedSlots}
                onToggleSlot={handleToggleSlot}
              />
            </div>

            <div className="hidden p-4 sm:p-6 lg:block">
              <BookingSummary
                selection={bookingSelection}
                onConfirm={handleConfirmBooking}
                onClear={handleClearSlots}
                slotIntervalMinutes={data.config.slotIntervalMinutes}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile booking summary — inline when no selection, sticky bar when ready */}
      <div className="mt-4 lg:hidden">
        {!bookingSelection ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500">
            Select a date and consecutive time slots to continue
          </div>
        ) : null}
      </div>

      {bookingSelection && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm lg:hidden">
          <div className="mx-auto w-full max-w-6xl">
            <p className="truncate text-sm font-semibold text-slate-900">
              {formatTimeRange12h(bookingSelection.startTime, bookingSelection.endTime)}
            </p>
            <p className="truncate text-xs text-slate-500">{bookingSelection.durationLabel}</p>
            <div className="mt-3 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClearSlots}
                className="flex-1"
              >
                Clear
              </Button>
              <Button
                type="button"
                onClick={handleConfirmBooking}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer so sticky bar doesn't cover content on mobile */}
      {bookingSelection && <div className="h-28 lg:hidden" aria-hidden />}
    </div>
  );
}
