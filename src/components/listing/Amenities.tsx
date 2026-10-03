import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useId } from "react";

import type { Amenity } from "@/types/listing";

import { Section } from "./Section";

interface AmenitiesProps {
  amenities: Amenity[];
  featuredCount: number;
  total: number;
}

export function Amenities({ amenities, featuredCount, total }: AmenitiesProps) {
  const listId = useId();
  const visible = amenities.slice(0, featuredCount);

  return (
    <Section id="amenities" title="What this place offers">
      <ul id={listId} className="grid grid-cols-2 gap-x-4 gap-y-5">
        {visible.map(({ icon: Icon, label, unavailable }) => (
          <li key={label} className="flex items-center gap-4">
            <Icon aria-hidden="true" className="size-5 shrink-0" />
            {unavailable ? (
              <span className="line-through">
                <span className="sr-only">Unavailable: </span>
                {label}
              </span>
            ) : (
              <span>{label}</span>
            )}
          </li>
        ))}
      </ul>

      {amenities.length > featuredCount && (
        <AmenitiesModal amenities={amenities} total={total} />
      )}
    </Section>
  );
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------

interface AmenitiesModalProps {
  amenities: Amenity[];
  total: number;
}

function AmenitiesModal({ amenities, total }: AmenitiesModalProps) {
  return (
    <DialogPrimitive.Root>
      {/* Trigger button */}
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="mt-7 h-12 cursor-pointer rounded-lg border border-foreground px-6 text-sm font-medium transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Show all {total} amenities
        </button>
      </DialogPrimitive.Trigger>

      {/* Portal keeps the modal on top of everything */}
      <DialogPrimitive.Portal>
        {/* Blurred backdrop */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-200" />

        {/* Centered panel */}
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 w-[min(90vw,680px)] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-2xl bg-background shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-5 shrink-0">
            <DialogPrimitive.Title className="text-lg font-semibold">
              What this place offers
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Close amenities"
              className="grid size-8 cursor-pointer place-items-center rounded-full transition-colors duration-150 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <X aria-hidden="true" className="size-4" />
            </DialogPrimitive.Close>
          </div>

          {/* Scrollable amenities list */}
          <div className="overflow-y-auto px-6 py-6">
            <ul className="divide-y divide-border">
              {amenities.map(({ icon: Icon, label, unavailable }) => (
                <li key={label} className="flex items-center gap-4 py-4">
                  <Icon
                    aria-hidden="true"
                    className={`size-6 shrink-0 ${unavailable ? "opacity-40" : ""}`}
                  />
                  {unavailable ? (
                    <span className="line-through text-muted-foreground">
                      <span className="sr-only">Unavailable: </span>
                      {label}
                    </span>
                  ) : (
                    <span className="text-[15px]">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
