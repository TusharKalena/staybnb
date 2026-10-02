import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/Container";
import type { Booking } from "@/hooks/use-booking";
import { formatPrice, pluralize } from "@/lib/format";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
];

interface SectionNavProps {
  booking: Booking;
  rating: number;
  reviewCount: number;
}

/**
 * Bar that replaces the header once the photos scroll away. Tabs jump to sections; the
 * price and Reserve button appear once the booking card itself is out of view.
 */
export function SectionNav({ booking, rating, reviewCount }: SectionNavProps) {
  const [visible, setVisible] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [active, setActive] = useState("photos");

  useEffect(() => {
    const photos = document.getElementById("photos");
    const card = document.getElementById("booking");
    const observers: IntersectionObserver[] = [];

    if (photos) {
      const observer = new IntersectionObserver(([entry]) => setVisible(!entry!.isIntersecting));
      observer.observe(photos);
      observers.push(observer);
    }
    if (card) {
      const observer = new IntersectionObserver(([entry]) =>
        setShowPrice(entry!.boundingClientRect.bottom < 0),
      );
      observer.observe(card);
      observers.push(observer);
    }

    const sections = LINKS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const spy = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );
    sections.forEach((section) => spy.observe(section));
    observers.push(spy);

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const handleReserve = () => {
    if (booking.reserve()) return;
    document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 top-0 z-40 hidden border-b border-border bg-background md:block",
        !visible && "invisible",
      )}
    >
      <Container className="flex h-[78px] items-center justify-between">
        <nav aria-label="Listing sections" className="flex h-full gap-6">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              tabIndex={visible ? 0 : -1}
              className={cn(
                "flex h-full items-center border-b-4 border-transparent text-sm font-semibold",
                active === id && "border-foreground",
              )}
            >
              {label}
            </a>
          ))}
        </nav>
        {showPrice && (
          <div className="hidden items-center gap-6 lg:flex">
            <div className="text-right">
              <p>
                <span className="font-bold">
                  {formatPrice(
                    booking.nights > 0 ? booking.total : booking.pricePerNight,
                    booking.currency,
                  )}
                </span>{" "}
                <span className="text-sm">
                  {booking.nights > 0 ? `for ${pluralize(booking.nights, "night")}` : "night"}
                </span>
              </p>
              <p className="flex items-center justify-end gap-1 text-xs">
                <Star aria-hidden="true" className="size-2.5 fill-current" />
                {rating} · {reviewCount} reviews
              </p>
            </div>
            <button
              type="button"
              tabIndex={visible ? 0 : -1}
              onClick={handleReserve}
              className="h-12 cursor-pointer rounded-lg bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90"
            >
              Reserve
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
