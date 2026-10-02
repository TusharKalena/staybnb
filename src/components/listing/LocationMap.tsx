import { useId, useState } from "react";

import type { Location } from "@/types/listing";

import { Section } from "./Section";

const MAP_SPAN = 0.02;

/** "Where you'll be" with an OpenStreetMap embed centred on the listing's area. */
export function LocationMap({ location }: { location: Location }) {
  const [expanded, setExpanded] = useState(false);
  const moreId = useId();
  const { latitude: lat, longitude: lon } = location;
  const bbox = [lon - MAP_SPAN, lat - MAP_SPAN / 2, lon + MAP_SPAN, lat + MAP_SPAN / 2].join(",");
  const [intro, ...rest] = location.highlights;

  return (
    <Section id="location" title="Where you’ll be" className="py-12">
      <p className="mb-6">{location.name}</p>
      <iframe
        title={`Map of ${location.name}`}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`}
        loading="lazy"
        className="h-[320px] w-full rounded-xl border-0 sm:h-[480px]"
      />
      <p className="mt-6 text-sm text-muted-foreground">
        Exact location will be provided after booking.
      </p>
      <h3 className="mt-8 font-semibold">Neighbourhood highlights</h3>
      <div className="mt-2 flex max-w-[650px] flex-col gap-4 leading-6">
        <p>{intro}</p>
        <div id={moreId} hidden={!expanded} className="flex flex-col gap-4">
          {rest.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
      {rest.length > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={moreId}
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 cursor-pointer font-semibold underline"
        >
          {expanded ? "Show less ‹" : "Show more ›"}
        </button>
      )}
    </Section>
  );
}
