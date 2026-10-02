import { Heart, Share } from "lucide-react";

import { useShare } from "@/hooks/use-share";
import { cn } from "@/lib/utils";

interface ShareSaveActionsProps {
  saved: boolean;
  onToggleSave: () => void;
}

const actionClass =
  "flex h-9 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm font-semibold underline transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-foreground sm:px-3";

export function ShareSaveActions({ saved, onToggleSave }: ShareSaveActionsProps) {
  const { share, copied } = useShare();

  return (
    <div className="flex shrink-0">
      <button
        type="button"
        onClick={share}
        aria-label={copied ? "Link copied" : "Share"}
        className={actionClass}
      >
        <Share aria-hidden="true" className="size-4" />
        <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
      </button>
      <button
        type="button"
        onClick={onToggleSave}
        aria-pressed={saved}
        aria-label="Save to wishlist"
        className={actionClass}
      >
        <Heart
          aria-hidden="true"
          className={cn("size-4 transition-colors", saved && "fill-primary text-primary")}
        />
        <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
