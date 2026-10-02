import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { formatPrice, pluralize } from "@/lib/format";

interface BookingOptions {
  pricePerNight: number;
  currency: string;
  maxGuests: number;
  initialRange?: DateRange;
}

/** Local-only booking state shared by the desktop card and the mobile booking sheet. */
export function useBooking({ pricePerNight, currency, maxGuests, initialRange }: BookingOptions) {
  const [range, setRangeState] = useState<DateRange | undefined>(initialRange);
  const [guests, setGuestsState] = useState(1);
  const [status, setStatus] = useState("");

  const nights =
    range?.from && range.to ? Math.max(0, differenceInCalendarDays(range.to, range.from)) : 0;
  const total = nights * pricePerNight;

  const setRange = (next: DateRange | undefined) => {
    setRangeState(next);
    setStatus("");
  };

  const setGuests = (next: number) => {
    setGuestsState(Math.min(maxGuests, Math.max(1, next)));
    setStatus("");
  };

  /** Returns false when dates are missing so the caller can open the date picker. */
  const reserve = (): boolean => {
    if (!nights) {
      setStatus("Please add check-in and checkout dates.");
      return false;
    }
    setStatus(
      `Reservation ready: ${pluralize(nights, "night")}, ${pluralize(guests, "guest")}, total ${formatPrice(total, currency)}.`,
    );
    return true;
  };

  return {
    range,
    setRange,
    guests,
    setGuests,
    maxGuests,
    nights,
    total,
    pricePerNight,
    currency,
    status,
    reserve,
  };
}

export type Booking = ReturnType<typeof useBooking>;
