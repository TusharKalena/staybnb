import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { useRef, useState } from "react";

import { formatPrice } from "@/lib/format";
import type { NearbyStay } from "@/types/listing";

import { Section } from "./Section";

const arrowButton =
  "grid size-8 cursor-pointer place-items-center rounded-full border border-input bg-background transition-opacity disabled:cursor-not-allowed disabled:opacity-30";

/** Horizontal carousel of other listings with "1 / 3" paging, like the reference. */
export function NearbyStays({ stays, currency }: { stays: NearbyStay[]; currency: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(3);

  const syncPage = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    setPageCount(Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth)));
    setPage(Math.round(track.scrollLeft / track.clientWidth));
  };

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  };

  return (
    <Section className="border-b-0 py-12">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">More stays nearby</h2>
        <div className="flex items-center gap-3 text-sm">
          <span aria-live="polite">
            {page + 1} / {pageCount}
          </span>
          <button
            type="button"
            aria-label="Previous stays"
            disabled={page === 0}
            onClick={() => scrollByPage(-1)}
            className={arrowButton}
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next stays"
            disabled={page >= pageCount - 1}
            onClick={() => scrollByPage(1)}
            className={arrowButton}
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
      <ul
        ref={trackRef}
        onScroll={syncPage}
        className="grid snap-x snap-mandatory auto-cols-[calc((100%-1rem)/2)] grid-flow-col gap-4 overflow-x-auto [scrollbar-width:none] md:auto-cols-[calc((100%-2rem)/3)] lg:auto-cols-[calc((100%-4.5rem)/4)] lg:gap-6"
      >
        {stays.map((stay) => (
          <li key={stay.title} className="snap-start">
            <div className="relative">
              <img
                src={stay.photo}
                alt=""
                width={296}
                height={296}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <button
                type="button"
                aria-label={`Save ${stay.title}`}
                className="absolute right-3 top-3 cursor-pointer text-white drop-shadow"
              >
                <Heart aria-hidden="true" className="size-6 fill-black/50" />
              </button>
            </div>
            <h3 className="mt-3 line-clamp-1 text-sm font-semibold">{stay.title}</h3>
            <p className="mt-1 flex items-center justify-between gap-2 text-sm">
              <span>
                <span className="font-semibold">{formatPrice(stay.price, currency)}</span> for 5
                nights
              </span>
              <span className="flex items-center gap-1">
                <Star aria-hidden="true" className="size-3 fill-current" />
                {stay.rating.toFixed(stay.rating % 1 === 0 ? 1 : 2)}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
