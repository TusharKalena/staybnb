import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import type { KeyboardEvent } from "react";

import { cn } from "@/lib/utils";
import type { Photo } from "@/types/listing";

interface PhotoLightboxProps {
  photos: Photo[];
  /** Index of the photo being shown, or null when the viewer is closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  saved: boolean;
  onToggleSave: () => void;
}

const headerButton =
  "flex h-9 cursor-pointer items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors duration-200 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white";

const navButton =
  "absolute top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-neutral-900 shadow transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Full-screen photo viewer. Radix Dialog provides the focus trap, Escape to close,
 * background scroll lock and focus restoration to the element that opened it.
 */
export function PhotoLightbox({
  photos,
  index,
  onIndexChange,
  onClose,
  saved,
  onToggleSave,
}: PhotoLightboxProps) {
  const current = index ?? 0;
  const photo = photos[current];
  const prev = () => onIndexChange((current + photos.length - 1) % photos.length);
  const next = () => onIndexChange((current + 1) % photos.length);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  return (
    <DialogPrimitive.Root open={index !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          aria-describedby={undefined}
          onKeyDown={handleKeyDown}
          className="fixed inset-0 z-50 grid grid-rows-[64px_minmax(0,1fr)] bg-foreground text-white outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
        >
          <DialogPrimitive.Title className="sr-only">Photo gallery</DialogPrimitive.Title>

          <div className="flex items-center justify-between px-4 md:px-8">
            <DialogPrimitive.Close className={headerButton} aria-label="Close photo gallery">
              <X aria-hidden="true" className="size-5" />
            </DialogPrimitive.Close>
            <span className="text-sm" aria-live="polite">
              {current + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={onToggleSave}
              aria-pressed={saved}
              aria-label="Save to wishlist"
              className={headerButton}
            >
              <Heart aria-hidden="true" className={cn("size-4", saved && "fill-current")} />
              {saved ? "Saved" : "Save"}
            </button>
          </div>

          <div className="relative grid min-h-0 place-items-center px-14 pb-8 md:px-24">
            {photo && (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="max-h-full max-w-full object-contain animate-in fade-in-0 duration-300"
              />
            )}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className={cn(navButton, "left-2 md:left-8")}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className={cn(navButton, "right-2 md:right-8")}
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
