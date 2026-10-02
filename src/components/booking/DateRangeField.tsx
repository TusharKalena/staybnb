import { format, startOfToday } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangeFieldProps {
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DateButtonProps {
  label: string;
  date: Date | undefined;
  expanded: boolean;
  onClick: () => void;
  className?: string;
}

function DateButton({ label, date, expanded, onClick, className }: DateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={expanded}
      aria-label={`${label}: ${date ? format(date, "d MMMM yyyy") : "add date"}`}
      className={cn(
        "cursor-pointer p-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground",
        className,
      )}
    >
      <span className="block text-[10px] font-bold uppercase">{label}</span>
      <span className={cn("text-xs", !date && "text-muted-foreground")}>
        {date ? format(date, "d/M/yyyy") : "Add date"}
      </span>
    </button>
  );
}

export function DateRangeField({ range, onRangeChange, open, onOpenChange }: DateRangeFieldProps) {
  const handleSelect = (next: DateRange | undefined) => {
    onRangeChange(next);
    if (next?.from && next.to && next.from.getTime() !== next.to.getTime()) onOpenChange(false);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverAnchor asChild>
        <div className="grid grid-cols-2 divide-x divide-input" role="group" aria-label="Dates">
          <DateButton
            label="Check-in"
            date={range?.from}
            expanded={open}
            onClick={() => onOpenChange(true)}
            className="rounded-tl-lg"
          />
          <DateButton
            label="Checkout"
            date={range?.to}
            expanded={open}
            onClick={() => onOpenChange(true)}
            className="rounded-tr-lg"
          />
        </div>
      </PopoverAnchor>
      <PopoverContent align="end" aria-label="Choose dates" className="w-auto rounded-xl p-2">
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          disabled={{ before: startOfToday() }}
          autoFocus
        />
        <div className="flex justify-end gap-2 px-2 pb-1">
          <button
            type="button"
            onClick={() => onRangeChange(undefined)}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold underline hover:bg-muted"
          >
            Clear dates
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-lg bg-foreground px-4 py-1.5 text-sm font-semibold text-background hover:bg-foreground/85"
          >
            Close
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
