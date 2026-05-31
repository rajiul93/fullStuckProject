"use client";

import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

dayjs.extend(customParseFormat);

const DATE_FORMAT = "YYYY-MM-DD";

type BuildDatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function BuildDatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
}: BuildDatePickerProps) {
  const [open, setOpen] = useState(false);

  const selectedDate = value
    ? dayjs(value, DATE_FORMAT, true).toDate()
    : undefined;

  const isValidDate =
    !!value && dayjs(value, DATE_FORMAT, true).isValid();

  function handleSelect(date: Date | undefined) {
    if (!date) return;
    onChange(dayjs(date).format(DATE_FORMAT));
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-9 w-full justify-start bg-white px-3 text-left font-normal text-black hover:bg-gray-50",
            !isValidDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          {isValidDate ? value : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto bg-white p-0 text-black"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          defaultMonth={selectedDate ?? new Date()}
          captionLayout="dropdown"
          startMonth={new Date(1800, 0)}
          endMonth={new Date()}
          disabled={{ after: new Date() }}
          className="rounded-md border-0 bg-white text-black [--cell-size:2rem]"
          classNames={{
            dropdown_root: "border-input bg-white text-black",
            weekday: "text-gray-600",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
