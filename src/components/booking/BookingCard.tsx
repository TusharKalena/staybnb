import type { Booking } from "@/hooks/use-booking";

import { BookingForm } from "./BookingForm";
import { PriceSummary } from "./PriceSummary";

interface BookingCardProps {
  booking: Booking;
  rating: number;
  reviewCount: number;
}

/** Sticky right-column card, shown from the lg breakpoint up. */
export function BookingCard({ booking, rating, reviewCount }: BookingCardProps) {
  return (
    <aside id="booking" className="hidden lg:block" aria-label="Booking">
      <div className="sticky top-28 rounded-xl border border-border p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        <PriceSummary
          pricePerNight={booking.pricePerNight}
          nights={booking.nights}
          total={booking.total}
          currency={booking.currency}
          rating={rating}
          reviewCount={reviewCount}
        />
        <BookingForm booking={booking} />
      </div>
    </aside>
  );
}
