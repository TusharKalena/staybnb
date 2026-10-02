import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title?: string;
  className?: string;
  children: ReactNode;
}

/** A divider-separated block of the main column, optionally with an h2 heading. */
export function Section({ id, title, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 border-b border-border py-8", className)}>
      {title && <h2 className="mb-6 text-xl font-semibold">{title}</h2>}
      {children}
    </section>
  );
}
