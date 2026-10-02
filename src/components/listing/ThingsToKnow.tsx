import { ChevronRight } from "lucide-react";

import type { Policy } from "@/types/listing";

import { Section } from "./Section";

export function ThingsToKnow({ policies }: { policies: Policy[] }) {
  return (
    <Section id="things-to-know" title="Things to know" className="py-12">
      <div className="grid gap-8 md:grid-cols-3">
        {policies.map(({ icon: Icon, title, lines }) => (
          <div key={title}>
            <Icon aria-hidden="true" className="size-6" />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <ul className="mt-2 space-y-2">
              {lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-3 flex cursor-pointer items-center gap-1 font-semibold underline"
            >
              Learn more <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}
