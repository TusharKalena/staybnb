import { Star } from "lucide-react";

import { pluralize } from "@/lib/format";
import type { Host } from "@/types/listing";

import { Section } from "./Section";

export function HostSummary({ host }: { host: Host }) {
  return (
    <Section className="flex items-center gap-4 py-6">
      <div className="relative shrink-0">
        <img
          src={host.avatar}
          alt=""
          width={48}
          height={48}
          className="size-12 rounded-full object-cover"
        />
        {host.isSuperhost && (
          <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
            <Star aria-hidden="true" className="size-2.5 fill-current" />
          </span>
        )}
      </div>
      <div>
        <h3 className="font-semibold">Hosted by {host.name}</h3>
        <p className="text-sm text-muted-foreground">
          {pluralize(host.yearsHosting, "year")} hosting
        </p>
      </div>
    </Section>
  );
}
