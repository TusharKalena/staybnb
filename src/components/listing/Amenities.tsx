import { useId, useState } from "react";

import type { Amenity } from "@/types/listing";

import { Section } from "./Section";

interface AmenitiesProps {
  amenities: Amenity[];
  featuredCount: number;
  total: number;
}

export function Amenities({ amenities, featuredCount, total }: AmenitiesProps) {
  const [showAll, setShowAll] = useState(false);
  const listId = useId();
  const visible = showAll ? amenities : amenities.slice(0, featuredCount);

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
        <button
          type="button"
          aria-expanded={showAll}
          aria-controls={listId}
          onClick={() => setShowAll((value) => !value)}
          className="mt-7 h-12 cursor-pointer rounded-lg border border-foreground px-6 text-sm font-medium transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          {showAll ? "Show fewer amenities" : `Show all ${total} amenities`}
        </button>
      )}
    </Section>
  );
}
