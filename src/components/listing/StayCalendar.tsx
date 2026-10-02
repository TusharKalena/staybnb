import { format, startOfToday } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import type { Booking } from "@/hooks/use-booking";
import { pluralize } from "@/lib/format";

import { Section } from "./Section";

/** Inline two-month calendar that edits the same range as the booking card. */
export function StayCalendar({ booking, place }: { booking: Booking; place: string }) {
  const { range, nights } = booking;
  const title = nights > 0 ? `${pluralize(nights, "night")} in ${place}` : "Select check-in date";
  const subtitle =
    range?.from && range.to
      ? `${format(range.from, "d MMM yyyy")} - ${format(range.to, "d MMM yyyy")}`
      : "Add your travel dates for exact pricing";

  return (
    <Section id="calendar">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <Calendar
        mode="range"
        numberOfMonths={2}
        defaultMonth={range?.from}
        selected={range}
        onSelect={booking.setRange}
        disabled={{ before: startOfToday() }}
        className="mt-4 w-full p-0 [--cell-size:2.75rem]"
        classNames={{ months: "relative flex flex-col gap-8 md:flex-row md:gap-12" }}
      />
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => booking.setRange(undefined)}
          className="cursor-pointer rounded-lg px-2 py-1 text-sm font-semibold underline hover:bg-muted"
        >
          Clear dates
        </button>
      </div>
    </Section>
  );
}
