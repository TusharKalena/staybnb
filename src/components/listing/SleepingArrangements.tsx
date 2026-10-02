import type { SleepingArea } from "@/types/listing";

import { Section } from "./Section";

export function SleepingArrangements({ areas }: { areas: SleepingArea[] }) {
  return (
    <Section title="Where you'll sleep">
      <ul className="flex flex-wrap gap-4">
        {areas.map((area) => (
          <li
            key={area.name}
            className="w-full max-w-[300px] overflow-hidden rounded-xl border border-border"
          >
            <img
              src={area.photo.src}
              alt={area.photo.alt}
              width={area.photo.width}
              height={area.photo.height}
              loading="lazy"
              className="h-[200px] w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{area.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{area.beds}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
