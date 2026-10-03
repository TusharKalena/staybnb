import { Flag } from "lucide-react";

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
      <div className="sticky top-28 space-y-3">
        {/* Promo banner */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3">
            {/* Leaf / discount icon */}
            <span aria-hidden="true" className="text-xl">🍃</span>
            <p className="text-sm leading-snug">
              Get 10% off your next stay.{" "}
              <a
                href="#"
                className="underline underline-offset-2 font-medium hover:text-foreground/70 transition-colors duration-150"
              >
                Terms apply
              </a>
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg border border-border bg-background px-4 py-1.5 text-sm font-semibold transition-colors duration-150 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Claim
          </button>
        </div>

        {/* Main booking card */}
        <div className="rounded-xl border border-border p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
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

        {/* Report this listing */}
        <div className="flex justify-center pt-1">
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors duration-150"
          >
            <Flag aria-hidden="true" className="size-4" />
            Report this listing
          </a>
        </div>
      </div>
    </aside>
  );
}
