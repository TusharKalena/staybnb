import { useId, useState } from "react";

import { Section } from "./Section";

/** Listing description: first paragraph always visible, the rest behind "Show more". */
export function Description({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const moreId = useId();
  const [intro, ...rest] = paragraphs;

  return (
    <Section>
      <p className="mb-6 rounded-xl bg-muted px-4 py-3 text-sm">
        {showOriginal
          ? "Showing the original text."
          : "Some info has been automatically translated."}{" "}
        <button
          type="button"
          onClick={() => setShowOriginal((value) => !value)}
          className="cursor-pointer font-semibold underline"
        >
          {showOriginal ? "Show translation" : "Show original"}
        </button>
      </p>
      <div className="flex max-w-[650px] flex-col gap-4 leading-6">
        <p>{intro}</p>
        {rest.length > 0 && (
          <div id={moreId} hidden={!expanded} className="flex flex-col gap-4">
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
      {rest.length > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={moreId}
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 cursor-pointer rounded font-semibold underline focus-visible:outline-2 focus-visible:outline-foreground"
        >
          {expanded ? "Show less ‹" : "Show more ›"}
        </button>
      )}
    </Section>
  );
}
