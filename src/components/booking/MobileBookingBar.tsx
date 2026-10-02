import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Star, X } from "lucide-react";

import type { Booking } from "@/hooks/use-booking";
import { formatPrice } from "@/lib/format";

import { BookingForm } from "./BookingForm";
import { PriceSummary } from "./PriceSummary";

interface MobileBookingBarProps {
  booking: Booking;
  rating: number;
  reviewCount: number;
}

/** Fixed bottom bar below the lg breakpoint; Reserve opens the booking form in a bottom sheet. */
export function MobileBookingBar({ booking, rating, reviewCount }: MobileBookingBarProps) {
  const price = formatPrice(booking.pricePerNight, booking.currency);

  return (
    <DialogPrimitive.Root>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background lg:hidden">
        <div className="mx-auto flex h-[74px] max-w-[1168px] items-center justify-between px-5 sm:px-6">
          <div>
            <p>
              <span className="text-lg font-bold underline">{price}</span>{" "}
              <span className="text-sm">/ night</span>
            </p>
            <p className="flex items-center gap-1 text-xs">
              <Star aria-hidden="true" className="size-3 fill-current" />
              {rating}
              <span aria-hidden="true">·</span>
              <span className="text-muted-foreground underline">{reviewCount} reviews</span>
            </p>
          </div>
          <DialogPrimitive.Trigger className="h-12 cursor-pointer rounded-lg bg-primary px-7 text-base font-bold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
            Reserve
          </DialogPrimitive.Trigger>
        </div>
      </div>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 lg:hidden" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-50 max-h-[90dvh] overflow-y-auto rounded-t-2xl bg-background p-6 outline-none data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom lg:hidden"
        >
          <div className="mb-4 flex items-center justify-between">
            <DialogPrimitive.Title className="text-lg font-semibold">
              Reserve your stay
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Close"
              className="grid size-8 cursor-pointer place-items-center rounded-full hover:bg-muted focus-visible:outline-2 focus-visible:outline-foreground"
            >
              <X aria-hidden="true" className="size-4" />
            </DialogPrimitive.Close>
          </div>
          <PriceSummary
            pricePerNight={booking.pricePerNight}
            nights={booking.nights}
            total={booking.total}
            currency={booking.currency}
            rating={rating}
            reviewCount={reviewCount}
          />
          <BookingForm booking={booking} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
