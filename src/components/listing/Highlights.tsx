import type { Highlight } from "@/types/listing";

import { Section } from "./Section";

export function Highlights({ items }: { items: Highlight[] }) {
  return (
    <Section>
      <ul className="space-y-6">
        {items.map(({ icon: Icon, title, description }) => (
          <li key={title} className="grid grid-cols-[32px_1fr] gap-3">
            <Icon aria-hidden="true" className="mt-0.5 size-5" />
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
