"use client";

import { cn } from "@/lib/utils";
import type { SlotStatus } from "@/lib/meeting-scheduler/types";

const LEGEND_ITEMS: {
  label: string;
  status: SlotStatus | "holiday" | "unavailable";
  className: string;
}[] = [
  { label: "Available", status: "available", className: "bg-emerald-500" },
  { label: "Unavailable", status: "unavailable", className: "bg-slate-300" },
  { label: "Holiday", status: "holiday", className: "bg-amber-400" },
  { label: "Break", status: "break", className: "bg-orange-400" },
  { label: "Disabled", status: "disabled", className: "bg-slate-400" },
  { label: "Booked", status: "booked", className: "bg-rose-400" },
];

export function StatusLegend({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-3 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-4", className)}>
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-xs text-slate-600">
          <span className={cn("h-2.5 w-2.5 rounded-full", item.className)} />
          {item.label}
        </div>
      ))}
    </div>
  );
}

export function getSlotStatusStyles(status: SlotStatus, selected = false) {
  if (selected) {
    return "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-200";
  }

  switch (status) {
    case "available":
      return "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-100 hover:shadow-sm";
    case "break":
      return "border-orange-200 bg-orange-50 text-orange-800 cursor-not-allowed";
    case "booked":
      return "border-rose-200 bg-rose-50 text-rose-700 cursor-not-allowed line-through opacity-70";
    case "disabled":
      return "border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed opacity-60";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

export function getDateStatusStyles(
  status: "available" | "unavailable" | "holiday",
  selected = false
) {
  if (selected) {
    return "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-200 sm:scale-[1.02]";
  }

  switch (status) {
    case "available":
      return "border-slate-200 bg-white text-slate-900 hover:border-indigo-300 hover:shadow-md";
    case "holiday":
      return "border-amber-200 bg-amber-50 text-amber-800 cursor-not-allowed opacity-80";
    case "unavailable":
      return "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-70";
  }
}
