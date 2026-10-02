import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { Photo } from "@/types/listing";

interface PhotoGalleryProps {
  photos: Photo[];
  onOpen: (index: number) => void;
}

const roundIconButton =
  "absolute top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-input bg-background shadow-sm transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-foreground md:hidden";

/**
 * Desktop: 4-column mosaic (hero spans 2x2). Mobile: swipeable scroll-snap carousel
 * with counter, dots and arrow buttons.
 */
export function PhotoGallery({ photos, onOpen }: PhotoGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: index * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    setSlide(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div
      className="relative mt-4 md:mt-7"
      role="group"
      aria-roledescription="carousel"
      aria-label="Listing photos"
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:grid md:rounded-xl md:h-[480px] md:grid-cols-4 md:grid-rows-2 md:gap-2 md:overflow-hidden [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`Open photo ${i + 1} of ${photos.length}: ${photo.alt}`}
            className={cn(
              "group h-[300px] w-full shrink-0 cursor-pointer snap-center overflow-hidden bg-muted focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring md:h-auto",
              i === 0 && "md:col-span-2 md:row-span-2",
            )}
          >
            <img
              src={photo.src}
              alt=""
              width={photo.width}
              height={photo.height}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover transition-[filter] duration-300 group-hover:brightness-90"
            />
          </button>
        ))}
      </div>

      <span
        className="absolute right-3 top-3 rounded-full bg-foreground/70 px-3 py-1 text-xs font-semibold text-background md:hidden"
        aria-live="polite"
      >
        {slide + 1} / {photos.length}
      </span>

      {slide > 0 && (
        <button
          type="button"
          onClick={() => goTo(slide - 1)}
          aria-label="Previous photo"
          className={cn(roundIconButton, "left-3")}
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
      )}
      {slide < photos.length - 1 && (
        <button
          type="button"
          onClick={() => goTo(slide + 1)}
          aria-label="Next photo"
          className={cn(roundIconButton, "right-3")}
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      )}

      <div
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden"
        aria-hidden="true"
      >
        {photos.map((photo, i) => (
          <span
            key={photo.src}
            className={cn(
              "size-1.5 rounded-full transition-colors",
              i === slide ? "bg-background" : "bg-background/60",
            )}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => onOpen(0)}
        className="absolute bottom-3 right-3 flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-foreground bg-background px-4 text-sm font-semibold shadow transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        <Grid3X3 aria-hidden="true" className="size-4" />
        All photos
      </button>
    </div>
  );
}
