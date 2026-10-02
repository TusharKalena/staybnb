import { useState } from "react";

import type { Booking } from "@/hooks/use-booking";
import { formatPrice, pluralize } from "@/lib/format";

import { DateRangeField } from "./DateRangeField";
import { GuestSelector } from "./GuestSelector";

/** Dates, guests, Reserve and price breakdown. Used by the desktop card and the mobile sheet. */
export function BookingForm({ booking }: { booking: Booking }) {
  const [datesOpen, setDatesOpen] = useState(false);
  const { nights, total, pricePerNight, currency } = booking;

  const handleReserve = () => {
    if (!booking.reserve()) setDatesOpen(true);
  };

  return (
    <>
      <div className="rounded-lg border border-input">
        <DateRangeField
          range={booking.range}
          onRangeChange={booking.setRange}
          open={datesOpen}
          onOpenChange={setDatesOpen}
        />
        <GuestSelector
          guests={booking.guests}
          maxGuests={booking.maxGuests}
          onGuestsChange={booking.setGuests}
        />
      </div>

      <button
        type="button"
        onClick={handleReserve}
        className="mt-4 h-12 w-full cursor-pointer rounded-lg bg-primary text-base font-bold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        Reserve
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground" role="status">
        {booking.status || "You won't be charged yet"}
      </p>

      {nights > 0 && (
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="underline">
              {formatPrice(pricePerNight, currency)} x {pluralize(nights, "night")}
            </dt>
            <dd>{formatPrice(total, currency)}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-5 font-semibold">
            <dt>Total</dt>
            <dd>{formatPrice(total, currency)}</dd>
          </div>
        </dl>
      )}
    </>
  );
}
